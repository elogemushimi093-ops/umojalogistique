import { I18nProvider } from './lib/i18n'
import Site from './components/layout/Site'

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  )
}
