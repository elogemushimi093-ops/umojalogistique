import { useI18n } from '../../lib/i18n'

export default function LanguageSwitch() {
  const { language, setLanguage } = useI18n()

  return (
    <div className="language-switch" aria-label="Language selector">
      <button
        className={language === 'en' ? 'is-active' : ''}
        type="button"
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        className={language === 'fr' ? 'is-active' : ''}
        type="button"
        aria-pressed={language === 'fr'}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
    </div>
  )
}
