import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FiUser, FiMail, FiLock, FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { name, email, password, confirmPassword } = formData;
    const { register, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) navigate('/dashboard');
    }, [token, navigate]);

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Full Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: null }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsSubmitting(true);
        const success = await register({ name, email, password });
        setIsSubmitting(false);

        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 focus-visible:outline-none">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Create a new account
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline rounded transition-colors">
                        sign in to your existing account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
                    <form className="space-y-6" onSubmit={onSubmit} noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                    autoComplete="name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm rounded-md py-2 border transition-colors ${errors.name ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="mt-2 text-sm text-red-600" id="name-error" role="alert">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                    autoComplete="email"
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm rounded-md py-2 border transition-colors ${errors.email ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error" role="alert">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    minLength="6"
                                    autoComplete="new-password"
                                    aria-invalid={errors.password ? "true" : "false"}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm rounded-md py-2 border transition-colors ${errors.password ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-indigo-600 rounded transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-600" id="password-error" role="alert">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    required
                                    minLength="6"
                                    autoComplete="new-password"
                                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm rounded-md py-2 border transition-colors ${errors.confirmPassword ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400'
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-indigo-600 rounded transition-colors"
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600" id="confirmPassword-error" role="alert">{errors.confirmPassword}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </>
                                ) : (
                                    <>
                                        <FiUserPlus className="mr-2 mt-0.5" aria-hidden="true" /> Register
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
