import { navigation, services } from '../../data/site'
import { useI18n } from '../../lib/i18n'
import BrandLogo from '../ui/BrandLogo'
import LanguageSwitch from '../ui/LanguageSwitch'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <BrandLogo compact />
          <p>{t.footer.statement}</p>
        </div>
        <div className="footer-column">
          <h2>{t.footer.navigation}</h2>
          {navigation.map((item) => <a key={item.id} href={item.href}>{t.nav[item.id]}</a>)}
        </div>
        <div className="footer-column">
          <h2>{t.footer.services}</h2>
          {services.slice(0, 5).map((service) => <a key={service.number} href="#services">{t.services.items[service.id]}</a>)}
        </div>
        <div className="footer-column">
          <h2>{t.footer.contact}</h2>
          <a href="mailto:info11umojalogistique@gmail.com">info11umojalogistique@gmail.com</a>
          <a href="tel:+243893041363">+243 89 30 41 363</a>
          <a href="https://wa.me/27836316135" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t.footer.copyright.replace('{year}', String(year))}</p>
        <LanguageSwitch />
      </div>
    </footer>
  )
}
