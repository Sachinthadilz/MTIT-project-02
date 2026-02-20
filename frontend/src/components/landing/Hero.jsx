import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiZap, FiLock } from 'react-icons/fi';

const Hero = ({ user }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
            {/* Animated Background Orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-medium text-cyan-300 border-cyan-500/30">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    Bank-Grade Security Encryption
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
                    Secure your thoughts.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                        Liberate your mind.
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed">
                    The ultra-fast, minimalist note-taking application engineered with zero-knowledge architecture and end-to-end encryption.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {user ? (
                        <Link to="/dashboard" className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-100 transition-all flex items-center shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
                            Go to Dashboard <FiArrowRight className="ml-2" />
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-lg font-bold text-lg hover:from-cyan-400 hover:to-indigo-400 transition-all flex items-center shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transform hover:-translate-y-1">
                                Start for free <FiArrowRight className="ml-2" />
                            </Link>
                            <Link to="/login" className="px-8 py-4 glass-panel text-white rounded-lg font-bold text-lg hover:bg-slate-800/60 transition-all flex items-center transform hover:-translate-y-1">
                                View Demo <FiLock className="ml-2" />
                            </Link>
                        </>
                    )}
                </div>

                {/* Micro features below CTA */}
                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2"><FiShield className="text-cyan-400" /> AES-256 Encryption</div>
                    <div className="flex items-center gap-2"><FiZap className="text-purple-400" /> Lightning Fast</div>
                    <div className="flex items-center gap-2"><FiLock className="text-indigo-400" /> Zero tracking</div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
