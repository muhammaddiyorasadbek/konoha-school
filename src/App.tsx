import { useEffect, useState } from "react";
import SakuraPetals from "./components/SakuraPetals";
import CursorGlow from "./components/CursorGlow";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Courses from "./components/Courses";
import Advantages from "./components/Advantages";
import InfoSection from "./components/InfoSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import FloatingCTA from "./components/FloatingCTA";
import WelcomePopup from "./components/WelcomePopup";
import PageLoader from "./components/PageLoader";
import TopProgress from "./components/TopProgress";
import useScrollReveal from "./hooks/useScrollReveal";
import { openPresentation } from "./utils/openInfo";
import AdminApp from "./admin/AdminApp";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultCourse, setDefaultCourse] = useState<string | undefined>();
  const [showAdmin, setShowAdmin] = useState(() => window.location.hash === "#admin");

  useScrollReveal();

  useEffect(() => {
    const onHash = () => setShowAdmin(window.location.hash === "#admin");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const openRegister = (course?: string) => {
    setDefaultCourse(course);
    setModalOpen(true);
  };

  const openInfo = () => openPresentation();

  const goAdmin = () => {
    window.location.hash = "#admin";
    setShowAdmin(true);
    window.scrollTo(0, 0);
  };

  const goSite = () => {
    window.location.hash = "";
    setShowAdmin(false);
  };

  if (showAdmin) {
    return <AdminApp onBackToSite={goSite} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PageLoader />
      <TopProgress />
      <SakuraPetals count={20} />
      <CursorGlow />
      <Header onRegister={() => openRegister()} onInfo={openInfo} onAdmin={goAdmin} />

      <main>
        <Hero onRegister={() => openRegister()} onInfo={openInfo} />
        <Marquee />
        <About />
        <Courses onRegister={(c) => openRegister(c)} />
        <Advantages />
        <InfoSection onOpen={openInfo} />
        <Contact />
      </main>

      <Footer onRegister={() => openRegister()} onInfo={openInfo} onAdmin={goAdmin} />
      <FloatingCTA onRegister={() => openRegister()} />
      <WelcomePopup onRegister={() => openRegister()} />
      <RegistrationModal
        open={modalOpen}
        defaultCourse={defaultCourse}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
