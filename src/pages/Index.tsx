
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MobileAppSection from '@/components/MobileAppSection';
import CourseSection from '@/components/CourseSection';
import ExploreFeaturesSection from '@/components/ExploreFeaturesSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MobileAppSection />
      <CourseSection />
      <ExploreFeaturesSection />
      <FeaturesSection />
      <Footer />
      <ChatBot />
      <ThemeToggle />
    </div>
  );
};

export default Index;
