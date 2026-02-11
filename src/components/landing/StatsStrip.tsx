export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="stat-item">
        <div className="stat-value">87%</div>
        <div className="stat-label">de correspondance</div>
      </div>
      <div className="stat-separator"></div>
      <div className="stat-item">
        <div className="stat-value">5</div>
        <div className="stat-label">langues</div>
      </div>
      <div className="stat-separator"></div>
      <div className="stat-item">
        <div className="stat-value">30s</div>
        <div className="stat-label">pour optimiser</div>
      </div>
      <div className="stat-separator"></div>
      <div className="stat-item">
        <div className="stat-value">0€</div>
        <div className="stat-label">sans abonnement</div>
      </div>
    </div>
  );
}
