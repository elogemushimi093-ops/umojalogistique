import { useI18n } from '../../lib/i18n'
import LineIcon from '../ui/LineIcon'

export default function RoadFreightSection() {
  const { t } = useI18n()

  return (
    <section id="road-freight" className="section road-section">
      <div className="container road-layout">
        <div className="section-heading road-copy">
          <p className="eyebrow"><span>—</span> {t.road.kicker}</p>
          <h2>{t.road.title}</h2>
          <p className="lead">{t.road.body}</p>
          <div className="road-points">
            {t.road.points.map((point, index) => (
              <div key={point}>
                <span>0{index + 1}</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="road-visual" aria-label={t.road.routeLabel}>
          <div className="road-visual__grid" />
          <div className="road-visual__header">
            <span>{t.road.roadFreight}</span>
            <span className="pulse-label"><i /> {t.road.current}</span>
          </div>
          <div className="road-visual__route">
            <div className="route-stop route-stop--jhb"><b>01</b><span>Johannesburg</span></div>
            <div className="route-stop route-stop--lub"><b>02</b><span>Lubumbashi</span></div>
            <div className="route-stop route-stop--kin"><b>03</b><span>Kinshasa</span></div>
            <div className="route-stop route-stop--eur"><b>04</b><span>Europe</span></div>
            <svg viewBox="0 0 660 340" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path d="M20 280C130 230 153 295 251 184C348 73 438 148 640 54" />
              <path className="route-progress" d="M20 280C130 230 153 295 251 184C348 73 438 148 640 54" />
            </svg>
          </div>
          <div className="road-visual__truck" aria-hidden="true">
            <div className="truck-trailer"><span>UMOJA</span></div>
            <div className="truck-cab" />
            <i /><i />
          </div>
          <div className="road-visual__footer">
            <LineIcon name="route" size={18} />
            <span>{t.road.networkLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
