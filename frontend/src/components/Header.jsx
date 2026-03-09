import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { logout, user } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          BookStore
        </Link>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Search books, authors..."
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative text-gray-500 hover:text-indigo-600 transition-colors text-xl">
            🔔
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-500 hover:text-indigo-600 transition-colors text-xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown Trigger */}
          <div className="relative group">
            <button className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md text-sm overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
              </div>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="px-4 py-2 border-b border-gray-50">
                 <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                 <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Profile Settings</Link>
              <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}