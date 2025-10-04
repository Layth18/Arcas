import { useState, useEffect } from 'react';
import { Users, Sprout, TrendingUp, ArrowRight } from 'lucide-react';
import LogoWhite from '../assets/LogoWhite';
import { useNavigate } from "react-router-dom";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

export default function Landing() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 relative overflow-hidden bg-gradient-to-b from-orange-600 via-orange-400 to-yellow-200">
        {/* Animated particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}

        {/* Animated wave overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path
                  d="M0 50 Q 25 30, 50 50 T 100 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.7"
                >
                  <animate
                    attributeName="d"
                    values="M0 50 Q 25 30, 50 50 T 100 50;M0 50 Q 25 70, 50 50 T 100 50;M0 50 Q 25 30, 50 50 T 100 50"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                </path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave)" />
          </svg>
        </div>

        {/* Logo + Stats */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 px-6 py-10">
          {/* Logo */}
          <LogoWhite className="transition duration-300 hover:drop-shadow-[0_0_5px_#ffffff] w-[clamp(6rem,30vw,30rem)] h-[clamp(6rem,30vw,30rem)]" />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-white mx-auto mb-2" />
              <div className="font-bold text-white select-none font-montserrat text-[clamp(1.25rem,3vw,2rem)]">
                12,450
              </div>
              <div className="text-white mt-1 select-none text-[clamp(0.75rem,2vw,1rem)]">Active Members</div>
            </div>
            <div>
              <Sprout className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-white mx-auto mb-2" />
              <div className="font-bold text-white select-none font-montserrat text-[clamp(1.25rem,3vw,2rem)]">
                3,280
              </div>
              <div className="text-white mt-1 select-none text-[clamp(0.75rem,2vw,1rem)]">Smart Farms</div>
            </div>
            <div>
              <TrendingUp className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)] text-white mx-auto mb-2" />
              <div className="font-bold text-white select-none font-montserrat text-[clamp(1.25rem,3vw,2rem)]">
                +42%
              </div>
              <div className="text-white mt-1 select-none text-[clamp(0.75rem,2vw,1rem)]">Yield Increase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-[#fff8f1]">
        <div className="max-w-md w-full flex flex-col items-center space-y-8">
          {/* Title */}
          <h1 className="font-bold text-orange-500 drop-shadow-lg hover:drop-shadow-[0_0_5px_#FFA500] font-montserrat text-center select-none text-[clamp(2.5rem,8vw,6rem)]">
            IrisFields
          </h1>

          {/* Main Content */}
          <div className="text-center space-y-4">
            <h2 className="font-bold text-stone-800 font-montserrat select-none text-[clamp(1.5rem,4vw,2.5rem)]">
              Join Us Today!
            </h2>
            <p className="text-stone-600 select-none text-[clamp(1rem,2vw,1.25rem)]">
              Connect, Trade, and Grow Smarter!
            </p>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-[clamp(0.6rem,2vw,1rem)] rounded-xl border-2 bg-white border-stone-300 focus:border-orange-500 focus:outline-none transition-all duration-300 text-[clamp(0.9rem,2vw,1rem)]"
            />
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-[clamp(0.6rem,2vw,1rem)] rounded-xl border-2 bg-white border-stone-300 focus:border-orange-500 focus:outline-none transition-all duration-300 text-[clamp(0.9rem,2vw,1rem)]"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={() => navigate("/news")}
            className="w-full bg-white hover:bg-stone-100 text-stone-800 font-bold py-[clamp(0.7rem,2vw,1rem)] px-6 rounded-xl transition-all duration-300 border-2 border-stone-300 hover:border-orange-500 shadow-md text-[clamp(0.9rem,2vw,1rem)]"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-[clamp(0.7rem,2vw,1rem)] px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl text-[clamp(0.9rem,2vw,1rem)]"
          >
            Sign Up
            <ArrowRight className="ml-2 w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
