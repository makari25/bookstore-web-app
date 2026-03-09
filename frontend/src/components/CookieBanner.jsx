import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🍪</span>
          <div>
            <h3 className="font-bold text-gray-900">We use cookies!</h3>
            <p className="text-sm text-gray-500">We use cookies to ensure you get the best experience on our platform.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReject} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
            Reject
          </button>
          <button onClick={handleAccept} className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}