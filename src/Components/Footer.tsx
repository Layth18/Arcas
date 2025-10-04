import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Main Footer Content */}
          <div className="text-center">
            <p className="text-sm sm:text-base font-light tracking-wide">
              Designed by{' '}
              <span className="font-semibold text-[#F29E4C] hover:text-[#FFD166] transition-colors duration-200">
                Layth Khemakhem
              </span>
            </p>
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-gray-700"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
              © {currentYear} IrisFields. Made with{' '}
              <Heart size={14} className="text-[#F29E4C] fill-current" /> for farmers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}