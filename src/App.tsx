import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Industries } from './sections/Industries'
import { Impact } from './sections/Impact'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { Projects } from './sections/Projects'
import { Testimonials } from './sections/Testimonials'
import { Careers } from './sections/Careers'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Industries />
        <Impact />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  )
}
