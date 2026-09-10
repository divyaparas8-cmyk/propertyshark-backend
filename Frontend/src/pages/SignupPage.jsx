import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const success = await signup(fullName, email, password, confirmPassword);
      setIsLoading(false);

      if (success) {
        addToast('Account created successfully! Welcome to Property Intelligence.', 'success');
        navigate('/home');
      } else {
        setErrorMsg('Failed to create account. Please try again.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('An error occurred during account creation.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F8FC]">
      {/* LEFT SIDE: Split-screen visual banner */}
      <div className="lg:w-1/2 relative bg-[#0A1020] min-h-[320px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background NYC architecture image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center filter saturate-110 brightness-90"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Dark Navy + subtle blue-purple gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(135deg, rgba(10, 16, 32, 0.88) 0%, rgba(17, 28, 53, 0.85) 55%, rgba(49, 46, 129, 0.8) 100%)`,
          }}
        />

        {/* Content over image overlay */}
        <div className="relative z-20">
          <Link to="/signup" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-widest text-white uppercase">
              PROPERTY <span className="text-[#A78BFA] font-light">INTELLIGENCE</span>
            </span>
          </Link>
        </div>

        <div className="relative z-20 my-auto py-12 max-w-lg">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#A78BFA] uppercase block mb-3">
            JOIN REAL ESTATE PROFESSIONALS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Research the property. <br />
            <span className="gradient-text-light">Understand the story.</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Create an account to gain unlimited access to public tax records, assessment histories, zoning analysis, DOB filings, and 311 complaint tracking.
          </p>
        </div>

        <div className="relative z-20 text-xs text-gray-400 font-medium">
          © 2026 Property Intelligence. Verified NYC Data Platform.
        </div>
      </div>

      {/* RIGHT SIDE: Clean Light Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl shadow-gray-200/50">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#111827] tracking-tight">Create your account</h2>
            <p className="text-sm text-[#667085] mt-1">
              Start researching NYC properties with complete public record context.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  className="w-full pl-10 pr-4 py-3 bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="s.jenkins@realtycapital.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#6D28D9] hover:opacity-95 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>CREATE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-xs text-[#667085]">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#2563EB] hover:text-[#4F46E5] hover:underline ml-1">
                LOGIN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
