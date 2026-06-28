const features = [
  {
    title: "Smart Dataset Studio",
    description:
      "Version, label, and validate datasets with confidence checks before every run.",
  },
  {
    title: "Experiment Tracking",
    description:
      "Compare metrics, hyperparameters, and model snapshots through one timeline.",
  },
  {
    title: "Automated Deployment",
    description:
      "Promote winning experiments to production with one-click CI/CD integration.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features section-space">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Core Features</p>
          <h2>Everything your ML team needs to move from idea to inference.</h2>
        </div>

        <div className="features__grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
