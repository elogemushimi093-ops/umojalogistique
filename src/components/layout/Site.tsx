import Navigation from './Navigation'
import HeroSection from '../sections/HeroSection'
import RoadFreightSection from '../sections/RoadFreightSection'
import NetworkSection from '../sections/NetworkSection'
import ServicesSection from '../sections/ServicesSection'
import AboutSection from '../sections/AboutSection'
import WhyUmojaSection from '../sections/WhyUmojaSection'
import VisionSection from '../sections/VisionSection'
import ContactSection from '../sections/ContactSection'
import Footer from './Footer'

export default function Site() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <RoadFreightSection />
        <NetworkSection />
        <ServicesSection />
        <AboutSection />
        <WhyUmojaSection />
        <VisionSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
