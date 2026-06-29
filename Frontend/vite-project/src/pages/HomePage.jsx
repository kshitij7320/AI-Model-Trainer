import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TrainerStudio from "../components/TrainerStudio";
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
        <TrainerStudio />
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
