import { services } from '../../data/site'
import { useI18n } from '../../lib/i18n'
import LineIcon from '../ui/LineIcon'

export default function ServicesSection() {
  const { t } = useI18n()

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow"><span>—</span> {t.services.kicker}</p>
          <h2>{t.services.title}</h2>
          <p className="lead">{t.services.body}</p>
        </div>
        <div className="services-list">
          {services.map((service) => (
            <article className={service.available ? 'service-row is-current' : 'service-row'} key={service.number}>
              <span className="service-row__number">{service.number}</span>
              <h3>{t.services.items[service.id]}</h3>
              <span className={service.available ? 'service-row__status is-current' : 'service-row__status'}>
                {service.available ? t.services.available : t.services.comingSoon}
              </span>
              <LineIcon name="arrow" size={19} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
