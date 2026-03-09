import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, welcomeName: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, welcomeName: "" });

    // Simulate network delay
    setTimeout(() => {
      const name = email.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      login(email); // Pass email to context to generate user
      
      setStatus({ loading: false, welcomeName: capitalizedName });
      setTimeout(() => navigate("/dashboard"), 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>
        <div className="text-white text-center z-10 p-12">
            <h2 className="text-5xl font-extrabold mb-4">Read. Learn. Grow.</h2>
            <p className="text-lg opacity-90">Join thousands of readers discovering their next favorite book.</p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          {status.welcomeName ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-700">
              <div className="text-7xl">👋</div>
              <h2 className="text-4xl font-black text-gray-900">Welcome, {status.welcomeName}!</h2>
              <div className="flex justify-center italic text-indigo-600 font-medium">
                <span className="animate-pulse">Entering dashboard...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In</h2>
                <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    className="mt-2 w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Forgot password?</a>
                  </div>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••" 
                    className="mt-2 w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    onChange={e => setPassword(e.target.value)} 
                  />
                </div>

                <button 
                  disabled={status.loading} 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                >
                  {status.loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="text-center text-sm text-gray-500 font-medium">
                  Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Sign Up</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}