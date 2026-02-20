import useAuth from '../hooks/useAuth';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Security from '../components/landing/Security';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';

const Landing = () => {
    const { user } = useAuth();

    return (
        <div className="bg-slate-900 min-h-screen text-slate-50 font-sans selection:bg-cyan-500/30">
            <Hero user={user} />
            <Features />
            <HowItWorks />
            <Security />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Landing;
