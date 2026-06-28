const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    points: [
      "2 active workspaces",
      "Basic experiment tracking",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$89",
    period: "/month",
    points: ["Unlimited runs", "Advanced analytics", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    points: [
      "Dedicated infrastructure",
      "Private onboarding",
      "SLA and governance",
    ],
  },
];

const PricingSection = () => {
  return (
    <section className="pricing section-space">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Choose a plan that fits your training workload.</h2>
        </div>

        <div className="pricing__grid">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}
            >
              <h3>{plan.name}</h3>
              <p className="pricing-card__price">
                <span>{plan.price}</span>
                {plan.period}
              </p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button className="button" type="button">
                {plan.featured ? "Choose Pro" : "Get Started"}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
