import { Fragment } from "react";
import { getTranslations } from "next-intl/server";

export default async function StatsStrip() {
  const t = await getTranslations("StatsStrip");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
    <div className="stats-strip">
      {stats.map((stat, i) => (
        <Fragment key={i}>
          {i > 0 && <div className="stat-separator"></div>}
          <div className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
