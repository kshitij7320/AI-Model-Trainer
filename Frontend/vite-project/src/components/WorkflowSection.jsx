const steps = [
  {
    title: "Ingest and Prepare",
    detail: "Connect storage buckets, clean records, and auto-generate labels.",
  },
  {
    title: "Train and Evaluate",
    detail:
      "Run distributed jobs with live charts for loss, accuracy, and drift.",
  },
  {
    title: "Ship and Observe",
    detail:
      "Deploy with rollback safety and monitor model health in real-time.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="workflow section-space">
      <div className="container workflow__layout">
        <div className="section-heading">
          <p className="eyebrow">Workflow</p>
          <h2>
            Reduce training complexity with a streamlined three-step pipeline.
          </h2>
        </div>

        <div className="timeline" aria-label="Training workflow timeline">
          {steps.map((step, index) => (
            <article key={step.title} className="timeline__item">
              <span className="timeline__index">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
