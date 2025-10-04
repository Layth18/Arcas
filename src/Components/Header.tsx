import { useState } from "react";
import {
  Menu,
  X,
  User,
  ShoppingBasket,
  LogOut,
  Newspaper,
  BarChart3,
  HelpCircle,
  Cpu,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";


export default function HeaderWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // collapsed by default
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const navItems = [
    { icon: Newspaper, label: "News", path: "/news" },
    { icon: BarChart3, label: "Trading Hub", path: "/trading" },
    { icon: HelpCircle, label: "Asking Station", path: "/ask" },
    { icon: Cpu, label: "IoT Management", path: "/iot" },
  ];

  const menuItems = [
    { icon: User, label: "Account", path: "/account" },
    { icon: ShoppingBasket, label: "Basket", path: "/basket" },
    { icon: Settings, label: "Settings", path: "/news" },
    { icon: LogOut, label: "Sign Out", path: "/" },
  ];


  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setIsSidebarOpen(true), 1000);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoverTimeout(null);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 hidden md:flex flex-col bg-gradient-to-b from-[#F6F2E7] to-[#FFF8EE] border-r border-[#EDE6DB] shadow-lg transition-[width] duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? "w-72" : "w-20"
          }`}
        aria-hidden={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="flex items-center justify-center px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Logo circle */}
            <div className="flex items-center">
              <Logo className="h-10 w-10" />
            </div>

            {/* Text next to logo */}
            {isSidebarOpen && (
              <div className="flex flex-col">
                <div className="text-lg sm:text-xl font-extrabold text-[#3B2F2F] leading-none">
                  Iris<span className="ml-1 text-[#F29E4C]">Fields</span>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Navigation Items (top) */}
        <nav className="space-y-1 mt-4">
          {navItems.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              title={!isSidebarOpen ? label : undefined}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 hover:translate-x-1 hover:bg-[#F29E4C] hover:text-white ${!isSidebarOpen ? "justify-center" : "justify-start"
                }`}
            >
              <Icon size={18} />
              {isSidebarOpen && <span className="font-medium">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="mt-4 mb-2 border-t border-[#EDE6DB]"></div>

        {/* Bottom Menu Items */}
        <div className="mt-auto space-y-1 mb-4">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              title={!isSidebarOpen ? label : undefined}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 hover:translate-x-1 hover:bg-[#FFD166] ${!isSidebarOpen ? "justify-center" : "justify-start"
                }`}
            >
              <Icon size={18} />
              {isSidebarOpen && <span className="font-medium">{label}</span>}
            </button>
          ))}
        </div>
      </aside>


      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-white/30 shadow-sm md:ml-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2 rounded-md text-[#3B2F2F] hover:bg-[#F6F2E7] transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

              {/* Search (subtle) */}
              <div className="hidden sm:flex items-center bg-white/60 rounded-lg px-3 py-1 gap-2 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-4.35-4.35" stroke="#6B5F5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="5" stroke="#6B5F5F" strokeWidth="1.5" />
                </svg>
                <input
                  className="bg-transparent outline-none text-sm w-40"
                  placeholder="Search crops, news..."
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F6F2E7] transition-colors">
                <ShoppingBasket size={16} />
                <span className="text-sm">Basket</span>
              </button>

              <button className="p-2 rounded-full bg-white/60 shadow-sm hidden sm:inline-flex">
                <User size={16} />
              </button>

              <div className="text-sm font-medium text-[#3B2F2F]">Layth</div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />

          <div className="absolute right-0 top-0 h-full w-72 bg-[#F6F2E7] shadow-2xl p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold text-[#3B2F2F]">Menu</div>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-md hover:bg-white/60">
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-3">
              {navItems.map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F29E4C] hover:text-white transition-all">
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-6 border-t border-[#EDE6DB] pt-4 space-y-2">
              {menuItems.map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFD166] transition-all">
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}