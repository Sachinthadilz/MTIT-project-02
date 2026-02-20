const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Loved by logical thinkers
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { body: "This is easily the fastest note app I've ever used. The minimalist design helps me formulate ideas without getting bogged down in formatting options.", author: "Sarah J.", role: "Software Engineer" },
                        { body: "I've transitioned all my daily journals here. The peace of mind knowing the backend uses strict JWT and isolated ownership is unparalleled.", author: "Michael T.", role: "Cybersecurity Analyst" },
                        { body: "Clean, dark mode by default, and blazingly fast. It just gets out of your way and lets you write. Exactly what a modern SaaS should be.", author: "Elena R.", role: "Product Manager" }
                    ].map((testimony, idx) => (
                        <div key={idx} className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
                            <p className="text-slate-300 mb-6 italic">"{testimony.body}"</p>
                            <div>
                                <h4 className="font-bold text-white">{testimony.author}</h4>
                                <span className="text-sm text-indigo-400">{testimony.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
