import { FiLock, FiCheckCircle } from 'react-icons/fi';

const Security = () => {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    {/* Left content */}
                    <div className="mb-16 lg:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6 border border-cyan-500/20">
                            <FiLock /> Enterprise-Grade Privacy
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-6">
                            Your data belongs to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">you alone.</span>
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            We built our entire backend architecture on the unwavering principle of privacy. With strict JSON Web Token validation and isolated MongoDB object ownership, not even our database administrators can read your notes.
                        </p>

                        <ul className="space-y-4 text-slate-300">
                            {[
                                "Bcrypt password hashing before it ever hits the database",
                                "Stateless JWT authentication preventing session hijacking",
                                "Isolated per-user document fetching (No data leaking)",
                                "Rate-limiting and Helmet security headers enabled"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <FiCheckCircle className="text-indigo-400 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right visual piece: A simulated code or data visual */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-2xl transform rotate-3 scale-105 opacity-50 blur-lg animate-pulse"></div>
                        <div className="glass-panel relative rounded-2xl p-6 sm:p-10">
                            <div className="flex items-center justify-between border-b border-slate-700/50 pb-4 mb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <span className="text-xs font-mono text-slate-500">auth_middleware.js</span>
                            </div>
                            <div className="font-mono text-sm sm:text-base space-y-2">
                                <div className="text-indigo-300"><span className="text-purple-400">const</span> token <span className="text-cyan-400">=</span> req.header(<span className="text-green-300">'Authoriz...'</span>);</div>
                                <div className="text-slate-400">if (<span className="text-cyan-400">!</span>token) <span className="text-purple-400">return</span> res.status(<span className="text-yellow-300">401</span>);</div>
                                <br />
                                <div className="text-slate-500">{'// Decoding cryptographically...'}</div>
                                <div className="text-indigo-300"><span className="text-purple-400">const</span> decoded <span className="text-cyan-400">=</span> jwt.verify(t, <span className="text-purple-400">process</span>.env.JWT);</div>
                                <div className="text-indigo-300">req.user <span className="text-cyan-400">=</span> <span className="text-purple-400">await</span> User.findById(decoded.id);</div>
                                <br />
                                <div className="text-green-400">{'// Access Granted: 200 OK'}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Security;
