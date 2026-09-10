import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Building2, ArrowRight, ShieldCheck, Sparkles, Database, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('analyst@propertyintel.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const success = await login(email, password, rememberMe);
      setIsLoading(false);

      if (success) {
        addToast('Authentication verified. Welcome to Property Intelligence.', 'success');
        navigate('/home');
      } else {
        setErrorMsg('Invalid credentials. Please verify email and password.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('An authentication service error occurred.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('analyst@propertyintel.com');
    setPassword('password123');
    setIsLoading(true);
    setTimeout(async () => {
      await login('analyst@propertyintel.com', 'password123', true);
      setIsLoading(false);
      addToast('Authenticated with Demo Analyst Access!', 'success');
      navigate('/home');
    }, 400);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addToast('Encrypted reset link sent to registered email.', 'info');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0E1726] font-sans selection:bg-[#4F46E5] selection:text-white overflow-hidden py-10 px-4">
      {/* 1. LIGHTENED LUXURY BACKGROUND ARCHITECTURE & SOFT AMBIENT GLOWS */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter saturate-110 brightness-[0.45] scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      {/* Lightened Navy & Soft Indigo Ambient Gradient Overlays */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 60%),
                       radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.18) 0%, transparent 60%),
                       linear-gradient(180deg, rgba(14, 23, 38, 0.75) 0%, rgba(14, 23, 38, 0.94) 100%)`,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. MAIN CONTAINER (FIXED HEIGHT 620px FOR IDENTICAL LAYOUT) */}
      <div className="relative z-10 w-full max-w-5xl lg:h-[620px] grid lg:grid-cols-12 gap-0 bg-white/[0.04] border border-white/15 rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden">
        
        {/* LEFT COLUMN: BRAND STORY & LIVE METRICS (7 Cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent h-full">
          {/* Top Logo Badge */}
          <div className="flex items-center justify-between">
            <Link to="/login" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-lg sm:text-xl tracking-wider uppercase text-white flex items-center gap-1.5">
                PROPERTY <span className="text-[#A78BFA] font-light">INTELLIGENCE</span>
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Platform
            </span>
          </div>

          {/* Editorial Headline */}
          <div className="my-auto py-4 space-y-3.5 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-gray-200 text-xs font-mono font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Institutional Real Estate Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Intelligence for <br />
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#F472B6] bg-clip-text text-transparent">
                High-Stakes Real Estate.
              </span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed">
              Connect public parcel records, tax assessments, DOB permits, ACRIS deeds, and air rights analytics across New York City in one unified intelligence dashboard.
            </p>

            {/* Live Metrics Widget */}
            <div className="pt-2 grid grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Database className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span className="text-[10px] font-mono uppercase">Parcels</span>
                </div>
                <span className="font-extrabold text-white text-sm sm:text-base font-mono">14.2M+</span>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span className="text-[10px] font-mono uppercase">Sync Rate</span>
                </div>
                <span className="font-extrabold text-white text-sm sm:text-base font-mono">99.98%</span>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase">Security</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-xs font-mono uppercase">SOC-2 Class</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-medium">
            <span>© 2026 Property Intelligence Inc.</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA]" /> Encrypted SSL Gateway
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM CARD (5 Cols - EXACT SAME HEIGHT & SPACING) */}
        <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-black/35 backdrop-blur-3xl h-full">
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-black text-white tracking-tight">Analyst Sign In</h2>
              <p className="text-xs text-gray-400 mt-1">
                Enter your enterprise credentials to access NYC parcel data.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="analyst@propertyintel.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-[#818CF8] focus:ring-4 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-[#818CF8] hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-[#818CF8] focus:ring-4 focus:ring-indigo-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 text-xs font-medium text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#4F46E5] focus:ring-[#4F46E5]"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              {/* Action Buttons with increased top gap */}
              <div className="pt-4 sm:pt-6 space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase text-white bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:opacity-95 shadow-xl shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>SIGN IN TO DASHBOARD</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant 1-Click Demo Analyst Access</span>
                </button>
              </div>
            </form>
          </div>

          <div className="text-center border-t border-white/10 pt-4 mt-4">
            <p className="text-xs text-gray-400">
              Don't have an enterprise account?{' '}
              <Link to="/signup" className="font-bold text-[#818CF8] hover:text-white hover:underline ml-1">
                CREATE ACCOUNT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
