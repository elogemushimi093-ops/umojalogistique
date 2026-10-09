import { useI18n } from '../../lib/i18n'
import BrandLogo from '../ui/BrandLogo'

export default function AboutSection() {
  const { t } = useI18n()

  return (
    <section id="about" className="section about-section">
      <div className="container about-layout">
        <div className="about-mark">
          <div className="about-mark__frame" />
          <BrandLogo priority />
          <p>UMOJA<br />LOGISTIQUE</p>
        </div>
        <div className="section-heading">
          <p className="eyebrow"><span>—</span> {t.about.kicker}</p>
          <h2>{t.about.title}</h2>
          <p className="lead">{t.about.body}</p>
          <div className="about-statements">
            <article>
              <span>01</span>
              <h3>{t.about.missionTitle}</h3>
              <p>{t.about.mission}</p>
            </article>
            <article>
              <span>02</span>
              <h3>{t.about.visionTitle}</h3>
              <p>{t.about.vision}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
