import { useEffect, useState } from 'react';

export default function Loading() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [skyColor, setSkyColor] = useState('#1e1e3f'); // night start

  useEffect(() => {
    // Animate sky gradient over 2s
    const keyframes = [
      '#1e1e3f', // night
      '#3b2f2f', // pre-dawn
      '#f1e4d2', // sunrise/morning
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= keyframes.length) {
        clearInterval(interval);
      } else {
        setSkyColor(keyframes[step]);
      }
    }, 700); // 2s total ~ 3 steps

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isAnimating) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-700"
      style={{ backgroundColor: skyColor }}
    >
      {/* Sun Container */}
      <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
        {/* Animated Sun */}
        <div
          className="absolute bottom-0"
          style={{ animation: 'sunRise 2s ease-out forwards' }}
        >
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#FFD166] via-[#F29E4C] to-[#F29E4C] shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-[#FFD166] opacity-40 blur-3xl scale-150"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="absolute top-1/3 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Iris<span className="text-[#F29E4C]">Fields</span>
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-[#F29E4C] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#F29E4C] rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-[#F29E4C] rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sunRise {
          0% { transform: translateY(100vh); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translateY(-50vh); opacity: 0; }
        }

        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
      `}</style>
    </div>
  );
}
