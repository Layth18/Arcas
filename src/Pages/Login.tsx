import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Login with:', phone);
        // Example: redirect to dashboard
        // navigate("/Farmer");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-50 flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#858643] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
            
            <div className="w-full max-w-sm relative z-10">
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    
                    {/* Logo + Title */}
                    <div className="mb-10 text-center">
                        <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
                            <Logo className="w-32 h-32 mx-auto drop-shadow-lg" />
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-[#858643] to-lime-600 bg-clip-text text-transparent mb-2">Glaion</h1>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#858643] to-lime-500 mx-auto rounded-full mb-4"></div>
                        <h2 className="text-2xl font-light text-gray-700">Welcome Back</h2>
                        <p className="text-sm text-gray-500 mt-2">Sign in to continue your journey</p>
                    </div>

                    {/* Input + Buttons */}
                    <div className="space-y-5">
                        {/* Phone input */}
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r from-[#858643] to-lime-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity ${isFocused ? 'opacity-40' : ''}`}></div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Phone number"
                                className="relative w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#858643] transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                        </div>

                        {/* Login button */}
                        <button
                            onClick={handleLogin}
                            className="relative w-full bg-gradient-to-r from-[#858643] to-lime-600 text-white py-4 rounded-xl font-semibold overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <span className="relative z-10">Login</span>
                        </button>

                        {/* OR line */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/70 text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Create Account button */}
                        <button
                            onClick={handleSignUp}
                            className="w-full border-2 border-[#858643] text-[#858643] py-4 rounded-xl font-semibold hover:bg-[#858643] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 bg-[#858643] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                Create Account
                            </span>
                        </button>
                    </div>

                    {/* Terms */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            By continuing, you agree to our 
                            <a href="#" className="text-[#858643] hover:underline ml-1">Terms</a> and 
                            <a href="#" className="text-[#858643] hover:underline ml-1">Privacy Policy</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
