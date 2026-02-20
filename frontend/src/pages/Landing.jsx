import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FiEdit3, FiShield, FiCloud, FiChevronRight, FiCheckCircle } from 'react-icons/fi';

const Landing = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200">
                                What's new in v2.0
                            </span>
                        </div>
                        <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                            Brain dumps, made <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">beautiful.</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Capture your thoughts, organize your ideas, and access your notes from absolutely anywhere. The most secure, fast, and satisfying way to write things down.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            {user ? (
                                <Link
                                    to="/dashboard"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 transform hover:scale-105 flex items-center"
                                >
                                    Go to Dashboard <FiChevronRight className="ml-1" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 transform hover:scale-105 flex items-center"
                                    >
                                        Get started <FiChevronRight className="ml-1" />
                                    </Link>
                                    <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
                                        Sign in <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="bg-gray-50 py-24 sm:py-32 border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Write faster</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need, nothing you don't.
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            We've stripped away the clutter to give you a pure, uninterrupted writing experience wrapped in a highly secure ecosystem.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">

                            <div className="relative pl-16 group">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 group-hover:bg-indigo-500 transition-colors shadow-lg">
                                        <FiEdit3 className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Distraction-Free
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Clean typography and minimal UI ensures your focus remains entirely on your content.</dd>
                            </div>

                            <div className="relative pl-16 group">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 group-hover:bg-indigo-500 transition-colors shadow-lg">
                                        <FiCloud className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Sync Everywhere
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Your notes are instantly synced to the cloud, making them available on your phone, tablet or desktop.</dd>
                            </div>

                            <div className="relative pl-16 group">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 group-hover:bg-indigo-500 transition-colors shadow-lg">
                                        <FiShield className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Bank-Grade Security
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">With JWT authentication and strict object-level validation, your data belongs exclusively to you.</dd>
                            </div>

                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Ready to boost your productivity?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        Join thousands of users who have streamlined their workflow with our minimalist approach to note taking.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {user ? (
                            <Link
                                to="/dashboard"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Continue to Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/register"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Start for free today
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} NotesApp Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
