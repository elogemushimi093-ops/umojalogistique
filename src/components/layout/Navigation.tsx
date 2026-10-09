import { useEffect, useState } from 'react'
import { navigation } from '../../data/site'
import { useI18n } from '../../lib/i18n'
import BrandLogo from '../ui/BrandLogo'
import LanguageSwitch from '../ui/LanguageSwitch'
import LineIcon from '../ui/LineIcon'

export default function Navigation() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', isOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="brand-link" href="#home" aria-label="Umoja Logistique home" onClick={closeMenu}>
        <BrandLogo compact priority />
        <span className="brand-link__name">UMOJA<br />LOGISTIQUE</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a key={item.id} href={item.href}>
            {t.nav[item.id]}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitch />
        <a className="button button--small button--nav" href="#contact">
          {t.nav.contactUs} <LineIcon name="arrow" size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? t.nav.close : t.nav.menu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <LineIcon name={isOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div className={isOpen ? 'mobile-nav is-open' : 'mobile-nav'} aria-hidden={!isOpen}>
        <div className="mobile-nav__inner">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                tabIndex={isOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {t.nav[item.id]}
              </a>
            ))}
          </nav>
          <a className="button button--light" href="#contact" tabIndex={isOpen ? 0 : -1} onClick={closeMenu}>
            {t.nav.contactUs} <LineIcon name="arrow" />
          </a>
        </div>
      </div>
    </header>
  )
}
