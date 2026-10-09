import { pillarNumbers } from '../../data/site'
import { useI18n } from '../../lib/i18n'
import LineIcon from '../ui/LineIcon'

const icons = ['route', 'shield', 'visibility', 'network', 'check'] as const

export default function WhyUmojaSection() {
  const { t } = useI18n()

  return (
    <section className="section why-section">
      <div className="container">
        <div className="section-heading section-heading--center">
          <p className="eyebrow"><span>—</span> {t.why.kicker}</p>
          <h2>{t.why.title}</h2>
          <p className="lead">{t.why.body}</p>
        </div>
        <div className="pillars">
          {t.why.pillars.map((pillar, index) => (
            <article className="pillar" key={pillar.title}>
              <div className="pillar__top">
                <span>{pillarNumbers[index]}</span>
                <LineIcon name={icons[index]} size={22} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
