export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">BookStore</h3>
          <p className="text-sm leading-relaxed">Curating the best stories for you since 2026. Read. Learn. Grow.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Newsletter</h4>
          <div className="flex mt-2">
            <input placeholder="Email address" className="bg-gray-800 px-4 py-3 rounded-l-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700" />
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-r-lg font-semibold transition-colors">
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-600">
        © 2026 BookStore. All rights reserved.
      </div>
    </footer>
  )
}