import { useI18n } from '../../lib/i18n'

export default function SceneFallback() {
  const { t } = useI18n()

  return (
    <div className="scene-fallback" role="img" aria-label={t.loading.fallback}>
      <div className="scene-fallback__orbit" />
      <div className="scene-fallback__sphere">
        <span />
        <span />
        <span />
      </div>
      <div className="scene-fallback__route" />
    </div>
  )
}
