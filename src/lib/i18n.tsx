import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { translations, type Language, type Translation } from '../data/translations'

const STORAGE_KEY = 'umoja-language'

type I18nValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Translation
}

const I18nContext = createContext<I18nValue | null>(null)

function getInitialLanguage(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'fr' ? 'fr' : 'en'
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const t = translations[language]

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.title = t.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', t.meta.description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', t.meta.title)
  }, [language, t])

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider.')
  }

  return context
}
