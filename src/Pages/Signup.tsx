import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const roles = [
    { 
      id: 'farmer', 
      label: 'Farmer', 
      path: '/Farmer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      desc: 'Manage crops and harvests'
    },
    { id: 'mill', label: 'Mill/Refinery Owner', path: '/Mill', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>), desc: 'Process and trade commodities' },
    { id: 'storage', label: 'Storage Owner', path: '/Mill', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>), desc: 'Warehouse and inventory management' },
    { id: 'transporter', label: 'Transporter', path: '/Transport', icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>), desc: 'Logistics and delivery services' }
  ];

  const handleConfirm = () => {
    if (!phone || !selectedRole) return;
    const dest = roles.find((r) => r.id === selectedRole)?.path;
    navigate(dest || '/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#858643] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          
          <div className="mb-10 text-center">
            <div className="inline-block mb-4 p-4 bg-gradient-to-br from-[#858643] to-lime-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#858643] to-lime-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join the Glaion network</p>
          </div>

          <div className="space-y-6">
            {/* Phone input */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#858643] transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm"
            />

            {/* Role header */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Select Your Role</h2>
              <p className="text-sm text-gray-500">Choose the option that best describes you</p>
            </div>

            {/* Role cards */}
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full py-5 px-5 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-4 group relative overflow-hidden ${
                    selectedRole === role.id
                      ? 'border-[#858643] bg-gradient-to-r from-[#858643] to-lime-600 text-white shadow-lg scale-105'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#858643] hover:shadow-md hover:scale-[1.02]'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    selectedRole === role.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {role.icon}
                  </div>

                  <div>
                    <div className="font-semibold">{role.label}</div>
                    <div className={`${selectedRole === role.id ? 'text-white/80' : 'text-gray-500'} text-sm`}>
                      {role.desc}
                    </div>
                  </div>

                  {selectedRole === role.id && (
                    <svg className="w-6 h-6 text-white ml-auto" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Continue button */}
            <button
              onClick={handleConfirm}
              disabled={!phone || !selectedRole}
              className="w-full bg-gradient-to-r from-[#858643] to-lime-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
