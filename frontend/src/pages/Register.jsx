import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });
  const navigate = useNavigate();

  const validations = {
    length: data.password.length >= 8,
    uppercase: /[A-Z]/.test(data.password),
    number: /[0-9]/.test(data.password),
    match: data.password === data.confirmPassword && data.confirmPassword !== "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!validations.length || !validations.uppercase || !validations.number || !validations.match || !validations.email) {
      setStatus({ ...status, error: "Please meet all requirements first." });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });
    try {
      await api.post("/auth/register", data);
      setStatus({ loading: false, success: true, error: "" });
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || "Registration failed" });
    }
  };

  const ValidationItem = ({ met, text }) => (
    <div className={`flex items-center text-xs font-medium transition-colors ${met ? "text-green-600" : "text-gray-400"}`}>
      <span className={`mr-2 flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${met ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
        {met ? "✓" : ""}
      </span> {text}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50 items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Start your reading journey today</p>
        </div>

        {status.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center font-semibold animate-in slide-in-from-top duration-500">
            🎉 Account created successfully! Redirecting...
          </div>
        )}

        {status.error && !status.success && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center text-sm font-medium">
            {status.error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5 bg-white p-8 shadow-xl rounded-2xl border border-gray-100">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
            <input name="name" placeholder="John Doe" className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={handleChange} required />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email</label>
            <input name="email" type="email" placeholder="john@example.com" className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${data.email && !validations.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} onChange={handleChange} required />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
            <input name="password" type="password" placeholder="Create a strong password" className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={handleChange} required />
            
            <div className="mt-3 space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <ValidationItem met={validations.length} text="At least 8 characters" />
              <ValidationItem met={validations.uppercase} text="Contains an uppercase letter" />
              <ValidationItem met={validations.number} text="Contains a number" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Confirm Password</label>
            <input name="confirmPassword" type="password" placeholder="Confirm password" className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" onChange={handleChange} required />
            {data.confirmPassword && !validations.match && <p className="text-[11px] text-red-500 mt-2 font-medium">Passwords do not match</p>}
          </div>

          <button disabled={status.loading || status.success} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] disabled:opacity-50 mt-2">
            {status.loading ? "Creating Account..." : "Create Account"}
          </button>
          
          <p className="text-center text-sm text-gray-500 pt-2">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}