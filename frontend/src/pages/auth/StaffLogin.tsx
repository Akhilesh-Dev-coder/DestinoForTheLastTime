// src/pages/auth/StaffLogin.tsx

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        // ✅ Save real token and staff data
        localStorage.setItem("staffToken", data.token);
        localStorage.setItem("staff", JSON.stringify(data.staff));
        navigate("/staff/panel"); // ✅ Redirect to real staff panel
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg animate-pulse">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Staff Access Portal
          </h1>
          <p className="text-slate-300 mt-2">
            Staff login for travel information management
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 space-y-1 border-b border-white/10">
            <h2 className="text-2xl text-center text-blue-400 font-semibold">Staff Login</h2>
            <p className="text-center text-slate-300 text-sm">
              Enter your staff credentials to access the panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>Staff Email</span>
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter staff email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                <Lock className="h-4 w-4 text-blue-400" />
                <span>Staff Password</span>
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter staff password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors p-1 rounded"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-shake">
                <p className="text-red-400 text-sm text-center flex items-center justify-center space-x-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>{loading ? "Authenticating..." : "Access Staff Panel"}</span>
                {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
              </button>

              <div className="flex space-x-2 w-full">
                <button 
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 py-2 px-4 rounded-lg transition-all duration-200"
                >
                  ← User Login
                </button>
                <button 
                  type="button"
                  onClick={() => navigate("/admin-login")}
                  className="w-full bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Admin Login →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Optional: Remove demo credentials in production */}
        {/* 
        <div className="text-center text-slate-400 text-sm space-y-2">
          <p className="font-semibold">Demo Credentials:</p>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
            <p>📧 Email: <span className="text-blue-400 font-mono">staff@travel.com</span></p>
            <p>🔐 Password: <span className="text-purple-400 font-mono">staff123</span></p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default StaffLogin;