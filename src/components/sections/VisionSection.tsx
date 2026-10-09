import { useI18n } from '../../lib/i18n'
import LineIcon from '../ui/LineIcon'

export default function VisionSection() {
  const { t } = useI18n()

  return (
    <section className="section vision-section">
      <div className="vision-section__map" aria-hidden="true">
        <span className="map-orbit map-orbit--one" />
        <span className="map-orbit map-orbit--two" />
        <span className="map-node map-node--one" />
        <span className="map-node map-node--two" />
        <span className="map-node map-node--three" />
      </div>
      <div className="container vision-content">
        <p className="eyebrow eyebrow--light"><span>—</span> {t.vision.kicker}</p>
        <h2><span>{t.vision.titleLead}</span><strong>{t.vision.titleEmphasis}</strong></h2>
        <p className="lead">{t.vision.body}</p>
        <div className="vision-route">
          <LineIcon name="route" size={22} />
          <span>{t.vision.route}</span>
        </div>
        <p className="vision-statement">{t.vision.statement}</p>
      </div>
    </section>
  )
}
