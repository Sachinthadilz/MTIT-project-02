import { FiFeather, FiLayers, FiRefreshCw } from 'react-icons/fi';

const features = [
    {
        name: 'Distraction-Free Interface',
        description: 'Strip away the visual clutter. Our bespoke editor ensures your focus remains purely on capturing your ideas.',
        icon: FiFeather,
    },
    {
        name: 'Structured Organization',
        description: 'Keep your thoughts neatly categorized. With robust labeling and immediate search, finding what you need is instantaneous.',
        icon: FiLayers,
    },
    {
        name: 'Real-time Synchronization',
        description: 'Edit on your phone, read on your desktop. Your data continuously synchronizes across all your devices securely.',
        icon: FiRefreshCw,
    },
];

const Features = () => {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Core Philosophy</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Designed for pure focused productivity
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
                        Everything you need to capture and organize your mind, engineered into a pristine, minimalist interface.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="glass-panel p-8 rounded-2xl transform transition duration-500 hover:scale-105 hover:bg-slate-800/60 group">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 mb-6 group-hover:bg-indigo-500/30 transition-colors">
                                <feature.icon className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.name}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
