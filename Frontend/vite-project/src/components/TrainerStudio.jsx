import { useMemo, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const initialAuthState = {
  name: "",
  email: "",
  password: "",
};

const initialPlanState = {
  modelType: "Transformer",
  datasetSize: "100000",
  objective: "maximize validation accuracy",
};

const TrainerStudio = () => {
  const [authForm, setAuthForm] = useState(initialAuthState);
  const [planForm, setPlanForm] = useState(initialPlanState);
  const [currentUser, setCurrentUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [planMessage, setPlanMessage] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  const canRegister = useMemo(
    () => authForm.name && authForm.email && authForm.password,
    [authForm],
  );

  const canLogin = useMemo(
    () => authForm.email && authForm.password,
    [authForm],
  );

  const canGeneratePlan = useMemo(
    () => planForm.modelType && planForm.datasetSize && planForm.objective,
    [planForm],
  );

  const request = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  };

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (event) => {
    const { name, value } = event.target;
    setPlanForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoadingAuth(true);
    setAuthMessage("");

    const result = await request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(authForm),
    });

    if (!result.ok) {
      setAuthMessage(result.data.message || "Registration failed.");
      setIsLoadingAuth(false);
      return;
    }

    setCurrentUser(result.data.user || null);
    setAuthMessage(result.data.message || "Registration successful.");
    setIsLoadingAuth(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoadingAuth(true);
    setAuthMessage("");

    const result = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: authForm.email,
        password: authForm.password,
      }),
    });

    if (!result.ok) {
      setAuthMessage(result.data.message || "Login failed.");
      setIsLoadingAuth(false);
      return;
    }

    setCurrentUser(result.data.user || null);
    setAuthMessage(result.data.message || "Login successful.");
    setIsLoadingAuth(false);
  };

  const handleLogout = async () => {
    setIsLoadingAuth(true);
    setAuthMessage("");

    const result = await request("/api/auth/logout", {
      method: "POST",
    });

    if (!result.ok) {
      setAuthMessage(result.data.message || "Logout failed.");
      setIsLoadingAuth(false);
      return;
    }

    setCurrentUser(null);
    setPlan(null);
    setAuthMessage(result.data.message || "Logout successful.");
    setIsLoadingAuth(false);
  };

  const handleGetMe = async () => {
    setIsLoadingAuth(true);
    setAuthMessage("");

    const result = await request("/api/auth/me");
    if (!result.ok) {
      setCurrentUser(null);
      setAuthMessage(result.data.message || "No active session.");
      setIsLoadingAuth(false);
      return;
    }

    setCurrentUser(result.data.user || null);
    setAuthMessage("Session restored.");
    setIsLoadingAuth(false);
  };

  const handleGeneratePlan = async (event) => {
    event.preventDefault();
    setIsLoadingPlan(true);
    setPlanMessage("");

    const result = await request("/api/ai/plan", {
      method: "POST",
      body: JSON.stringify({
        modelType: planForm.modelType,
        datasetSize: Number(planForm.datasetSize),
        objective: planForm.objective,
      }),
    });

    if (!result.ok) {
      setPlan(null);
      setPlanMessage(result.data.message || "Plan generation failed.");
      setIsLoadingPlan(false);
      return;
    }

    setPlan(result.data.plan || null);
    setPlanMessage("Plan generated successfully.");
    setIsLoadingPlan(false);
  };

  return (
    <section className="section-space studio" id="studio">
      <div className="container">
        <div className="studio__header">
          <p className="eyebrow">Next Step: Connect Frontend to Backend</p>
          <h2>Trainer Studio</h2>
          <p>
            Create an account, restore your session, and generate a personalized
            AI training plan using your live backend.
          </p>
        </div>

        <div className="studio__grid">
          <article className="studio-card">
            <h3>Authentication</h3>
            <form className="studio-form" onSubmit={handleLogin}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={authForm.name}
                onChange={handleAuthChange}
                placeholder="Ada Lovelace"
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={authForm.email}
                onChange={handleAuthChange}
                placeholder="ada@example.com"
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={authForm.password}
                onChange={handleAuthChange}
                placeholder="At least 8 characters"
              />

              <div className="studio-form__actions">
                <button
                  className="button"
                  type="button"
                  onClick={handleRegister}
                  disabled={!canRegister || isLoadingAuth}
                >
                  Register
                </button>
                <button
                  className="button button--ghost"
                  type="submit"
                  disabled={!canLogin || isLoadingAuth}
                >
                  Login
                </button>
              </div>

              <div className="studio-form__actions">
                <button
                  className="button button--ghost"
                  type="button"
                  onClick={handleGetMe}
                  disabled={isLoadingAuth}
                >
                  Check Session
                </button>
                <button
                  className="button button--ghost"
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoadingAuth}
                >
                  Logout
                </button>
              </div>

              {authMessage ? (
                <p className="studio-message">{authMessage}</p>
              ) : null}
            </form>

            <div className="studio-user" aria-live="polite">
              <h4>Current User</h4>
              {currentUser ? (
                <p>
                  {currentUser.name} ({currentUser.email})
                </p>
              ) : (
                <p>No authenticated user.</p>
              )}
            </div>
          </article>

          <article className="studio-card">
            <h3>AI Plan Generator</h3>
            <form className="studio-form" onSubmit={handleGeneratePlan}>
              <label htmlFor="modelType">Model Type</label>
              <input
                id="modelType"
                name="modelType"
                type="text"
                value={planForm.modelType}
                onChange={handlePlanChange}
              />

              <label htmlFor="datasetSize">Dataset Size</label>
              <input
                id="datasetSize"
                name="datasetSize"
                type="number"
                min="1"
                value={planForm.datasetSize}
                onChange={handlePlanChange}
              />

              <label htmlFor="objective">Objective</label>
              <input
                id="objective"
                name="objective"
                type="text"
                value={planForm.objective}
                onChange={handlePlanChange}
              />

              <button
                className="button"
                type="submit"
                disabled={!canGeneratePlan || isLoadingPlan}
              >
                Generate Plan
              </button>

              {planMessage ? (
                <p className="studio-message">{planMessage}</p>
              ) : null}
            </form>

            <div className="studio-plan" aria-live="polite">
              <h4>Generated Plan</h4>
              {plan ? (
                <>
                  <p>{plan.summary}</p>
                  <ul>
                    {(plan.recommendations || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>
                    Estimated Duration: {plan.estimatedDurationHours} hour(s)
                  </p>
                </>
              ) : (
                <p>No plan generated yet.</p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TrainerStudio;
