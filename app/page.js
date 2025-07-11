import Hero from '../components/Hero';
import Features from '../components/Features';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar /> {/* ✅ Navbar sabse top pe hona chahiye */}
      <main>
        <Hero />
        <Features />
        <Footer />
      </main>
    </>
  );
}
