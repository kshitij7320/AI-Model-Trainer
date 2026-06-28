import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import WorkflowSection from "../components/WorkflowSection";
import MetricsSection from "../components/MetricsSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <MetricsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
