const metrics = [
  { value: "42%", label: "Lower training cost" },
  { value: "5.8M", label: "Samples processed daily" },
  { value: "23 min", label: "Average deployment time" },
  { value: "370+", label: "Teams onboarded" },
];

const MetricsSection = () => {
  return (
    <section className="metrics section-space">
      <div className="container">
        <div className="metrics__grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <h3>{metric.value}</h3>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
