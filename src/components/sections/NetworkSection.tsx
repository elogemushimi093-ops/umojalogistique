import { lazy, Suspense } from 'react'
import { useI18n } from '../../lib/i18n'
import SceneFallback from '../3d/SceneFallback'
import LineIcon from '../ui/LineIcon'

const NetworkScene = lazy(() => import('../3d/NetworkScene'))

export default function NetworkSection() {
  const { t } = useI18n()

  return (
    <section id="network" className="section network-section">
      <div className="container network-layout">
        <div className="network-copy">
          <p className="eyebrow eyebrow--light"><span>—</span> {t.network.kicker}</p>
          <h2>{t.network.title}</h2>
          <p className="lead">{t.network.body}</p>
          <div className="network-legend">
            <div><i className="legend-line legend-line--current" />{t.network.current}</div>
            <div><i className="legend-line legend-line--future" />{t.network.expansion}</div>
          </div>
          <p className="network-note">{t.network.futureNote}</p>
        </div>
        <div className="network-experience">
          <Suspense fallback={<SceneFallback />}>
            <NetworkScene />
          </Suspense>
          <div className="network-experience__caption">
            <LineIcon name="network" size={18} />
            <span>{t.network.hubs}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
