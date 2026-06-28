const quickStats = [
  { label: "Active Models", value: "128+" },
  { label: "Avg. Training Speed", value: "3.4x" },
  { label: "Deployment Uptime", value: "99.97%" },
];

const HeroSection = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Training Platform</p>
          <h1>
            Build, tune, and deploy AI models from one powerful workspace.
          </h1>
          <p>
            AI Model Trainer gives teams a collaborative control center for
            dataset management, experiment tracking, and real-time performance
            monitoring.
          </p>

          <div className="hero__actions">
            <button className="button" type="button">
              Launch Dashboard
            </button>
            <button className="button button--ghost" type="button">
              View Live Demo
            </button>
          </div>

          <ul className="hero__stats" aria-label="Platform highlights">
            {quickStats.map((stat) => (
              <li key={stat.label} className="stat-card">
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__panel" role="presentation">
          <div className="hero__panel-header">
            <h2>Current Training Run</h2>
            <span className="status-badge">Running</span>
          </div>

          <div className="hero__panel-metrics">
            <div>
              <p>Model</p>
              <h3>Vision-XL v2.1</h3>
            </div>
            <div>
              <p>Epoch</p>
              <h3>38/50</h3>
            </div>
            <div>
              <p>GPU Utilization</p>
              <h3>91%</h3>
            </div>
            <div>
              <p>Loss</p>
              <h3>0.0142</h3>
            </div>
          </div>

          <div className="progress-stack" aria-label="Training progress">
            <p>Validation Accuracy</p>
            <div className="progress-bar">
              <span style={{ width: "94%" }} />
            </div>
            <small>94% complete</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
