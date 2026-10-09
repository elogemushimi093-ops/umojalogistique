import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useI18n } from '../../lib/i18n'
import SceneFallback from '../3d/SceneFallback'
import BrandLogo from '../ui/BrandLogo'
import LineIcon from '../ui/LineIcon'

const HeroScene = lazy(() => import('../3d/HeroScene'))

export default function HeroSection() {
  const { t } = useI18n()
  const content = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !content.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-reveal]',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.15 },
      )
    }, content)

    return () => context.revert()
  }, [t])

  return (
    <section id="home" className="hero">
      <div className="hero__scene-wrap">
        <Suspense fallback={<SceneFallback />}>
          <HeroScene />
        </Suspense>
      </div>
      <div ref={content} className="hero__content container">
        <div className="hero__topline" data-hero-reveal>
          <span className="status-dot" />
          <p>{t.hero.eyebrow}</p>
        </div>
        <div className="hero__logo" data-hero-reveal>
          <BrandLogo priority />
        </div>
        <h1 data-hero-reveal>
          <span>{t.hero.titleLead}</span>
          <strong>{t.hero.titleEmphasis}</strong>
        </h1>
        <p className="hero__statement" data-hero-reveal>{t.hero.statement}</p>
        <div className="hero__actions" data-hero-reveal>
          <a className="button button--light" href="#network">
            {t.hero.explore} <LineIcon name="arrow" />
          </a>
          <a className="text-link text-link--light" href="#contact">
            {t.hero.contact} <LineIcon name="arrow" size={17} />
          </a>
        </div>
      </div>
      <div className="hero__route" data-hero-reveal>
        <span>{t.hero.currentRoute}</span>
        <strong>{t.hero.route}</strong>
      </div>
      <a className="hero__scroll" href="#road-freight">
        <span>{t.hero.scroll}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
