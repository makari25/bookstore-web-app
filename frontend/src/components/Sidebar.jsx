import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const categories = [
  { name: "Best Sellers", icon: "🔥", id: "best-sellers" },
  { name: "New Arrivals", icon: "✨", id: "new-arrivals" },
  { name: "Fiction", icon: "🧚", id: "fiction" },
  { name: "Non-Fiction", icon: "🌍", id: "non-fiction" },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col h-screen sticky top-0 pt-24">
      <nav className="flex-1 space-y-1">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group"
          >
            <span className="text-lg opacity-70 group-hover:opacity-100">{c.icon}</span>
            <span className="font-medium">{c.name}</span>
          </a>
        ))}
      </nav>

      {/* Profile Card in Sidebar */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link to="/profile" className="block p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg overflow-hidden">
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : "👤"}
            </div>
            <div>
              <h4 className="font-bold text-sm">{user?.name || "Guest"}</h4>
              <p className="text-xs text-indigo-100 opacity-80">View Profile</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}