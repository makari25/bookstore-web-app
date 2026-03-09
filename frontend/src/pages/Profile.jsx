import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-8">My Profile</h2>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
              ) : (
                <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-3xl">👤</div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user?.name || "User Name"}</h3>
              <p className="text-gray-500">{user?.role || "Member"}</p>
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <p className="text-gray-800 font-medium mt-1">{user?.name}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <p className="text-gray-800 font-medium mt-1">{user?.email}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Since</label>
                <p className="text-gray-800 font-medium mt-1">{user?.joined || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <p className="text-gray-400 italic mt-1">Not added yet</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</label>
                <p className="text-gray-400 italic mt-1">No address saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <h4 className="text-3xl font-bold text-indigo-600">12</h4>
          <p className="text-gray-500 text-sm mt-1">Orders</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <h4 className="text-3xl font-bold text-indigo-600">3</h4>
          <p className="text-gray-500 text-sm mt-1">Wishlist</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <h4 className="text-3xl font-bold text-indigo-600">$240</h4>
          <p className="text-gray-500 text-sm mt-1">Total Spent</p>
        </div>
      </div>
    </div>
  );
}