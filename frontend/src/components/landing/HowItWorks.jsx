import { FiUserPlus, FiEdit, FiSmartphone } from 'react-icons/fi';

const steps = [
    {
        id: 1,
        title: 'Create an Account',
        description: 'Sign up in seconds. We require minimal information and never track your personal data.',
        icon: FiUserPlus,
    },
    {
        id: 2,
        title: 'Write & Organize',
        description: 'Drop your thoughts into our distraction-free editor. Organize with instant tags and folders.',
        icon: FiEdit,
    },
    {
        id: 3,
        title: 'Access Anywhere',
        description: 'Your encrypted notes sync instantaneously to all your devices, ready when inspiration strikes.',
        icon: FiSmartphone,
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-fade-in-up">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Simplicity at its core
                    </h2>
                    <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">
                        We removed the friction so you can focus on what matters: your ideas.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line for larger screens */}
                    <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-indigo-500/10 via-cyan-500/50 to-purple-500/10" aria-hidden="true"></div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 relative">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="z-10 bg-slate-900 p-2 rounded-full mb-6">
                                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transform transition hover:scale-110 hover:rotate-3">
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    <span className="text-indigo-400 mr-2">0{step.id}.</span>
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed max-w-sm px-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
