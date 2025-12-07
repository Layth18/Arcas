import { useState } from 'react';

export default function MillDashboard() {
  const [selectedFacility, setSelectedFacility] = useState('Mill A');

  const facilities = ['Mill A', 'Mill B', 'Refinery C'];
  
  const deliveries = [
    { id: 1, source: 'Field 12', amount: '2,400 kg', time: '2 hours', status: 'urgent' },
    { id: 2, source: 'Field 8', amount: '1,800 kg', time: '4 hours', status: 'normal' },
    { id: 3, source: 'Field 23', amount: '3,200 kg', time: '6 hours', status: 'normal' }
  ];

  const capacity = 68;
  const capacityColor = capacity > 80 ? 'from-[#6b5234] to-[#7a6040]' : capacity > 60 ? 'from-[#858643] to-[#a0a052]' : 'from-[#9ca855] to-[#b5c066]';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3e8] via-white to-[#f0efd9]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#858643] to-[#a0a052] bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">Monitor your facility operations</p>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <div className="w-2 h-2 bg-[#9ca855] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Online</span>
            </div>
          </div>
          
          {/* Facility Selector */}
          <div className="relative">
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full sm:w-auto px-6 py-3 bg-white/70 backdrop-blur-sm border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#858643] text-gray-900 font-medium shadow-sm hover:shadow-md transition-all appearance-none pr-12 cursor-pointer"
            >
              {facilities.map((facility) => (
                <option key={facility} value={facility}>{facility}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Capacity Section */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#858643] to-[#a0a052] rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Storage Capacity</h2>
            </div>
            
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Usage</div>
                <div className={`text-5xl font-bold bg-gradient-to-r ${capacityColor} bg-clip-text text-transparent`}>
                  {capacity}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">Available Space</div>
                <div className="text-2xl font-semibold text-gray-700">{100 - capacity}%</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner">
              <div
                className={`bg-gradient-to-r ${capacityColor} h-full transition-all duration-500 rounded-full relative overflow-hidden`}
                style={{ width: `${capacity}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-gray-600 font-medium">8,500 kg used</span>
              <span className="text-gray-600 font-medium">12,500 kg total</span>
            </div>
          </div>

          {/* Upcoming Deliveries */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#6b5234] to-[#7a6040] rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Deliveries</h2>
              </div>
              <div className="bg-[#858643]/10 text-[#6b5234] px-3 py-1 rounded-full text-sm font-semibold border border-[#858643]/20">
                {deliveries.length} pending
              </div>
            </div>
            
            <div className="space-y-3">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6 flex items-center justify-between hover:border-[#858643] hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Urgent indicator */}
                  {delivery.status === 'urgent' && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#7a6040]/10 blur-2xl rounded-full"></div>
                  )}
                  
                  <div className="flex items-center gap-4 flex-1 relative z-10">
                    <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg group-hover:from-[#858643]/10 group-hover:to-[#a0a052]/10 transition-all">
                      <svg className="w-6 h-6 text-gray-600 group-hover:text-[#858643] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-900 font-semibold mb-1 flex items-center gap-2">
                        {delivery.source}
                        {delivery.status === 'urgent' && (
                          <span className="bg-[#7a6040]/10 text-[#6b5234] text-xs px-2 py-0.5 rounded-full font-semibold border border-[#7a6040]/20">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{delivery.amount}</div>
                    </div>
                  </div>
                  
                  <div className="text-right relative z-10">
                    <div className="text-gray-500 text-sm mb-1 font-medium">ETA</div>
                    <div className="flex items-center gap-2 justify-end">
                      <svg className="w-5 h-5 text-[#858643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-xl text-[#858643] font-bold">{delivery.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl text-center group hover:shadow-2xl transition-all duration-300">
              <div className="inline-block p-3 bg-gradient-to-br from-[#9ca855] to-[#b5c066] rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-gray-500 text-sm mb-2 font-medium">Today's Total</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#858643] to-[#9ca855] bg-clip-text text-transparent">
                7,400 kg
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl text-center group hover:shadow-2xl transition-all duration-300">
              <div className="inline-block p-3 bg-gradient-to-br from-[#7a6040] to-[#8b7050] rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-gray-500 text-sm mb-2 font-medium">Pending</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#6b5234] to-[#7a6040] bg-clip-text text-transparent">
                3 deliveries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}