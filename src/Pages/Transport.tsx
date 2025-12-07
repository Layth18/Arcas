export default function DelivererDashboard() {

  const destinations = [
    { id: 1, name: 'Mill A', address: 'Sfax North Industrial', distance: '12 km', status: 'active', eta: '15 min' },
    { id: 2, name: 'Storage B', address: 'Central District', distance: '8 km', status: 'pending', eta: '35 min' },
    { id: 3, name: 'Refinery C', address: 'Sfax South', distance: '15 km', status: 'pending', eta: '60 min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3e8] via-white to-[#f0efd9]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#858643] to-[#a0a052] bg-clip-text text-transparent mb-2">
                Today's Route
              </h1>
              <p className="text-gray-600">Track your delivery progress</p>
            </div>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <div className="w-2 h-2 bg-[#9ca855] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">En Route</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="lg:order-2">
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl" style={{ height: '600px' }}>
              {/* Mock Map */}
              <div className="w-full h-full bg-gradient-to-br from-[#f5f3e8] to-[#f0efd9] relative">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, #858643 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                {/* Current Location Marker */}
                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="w-6 h-6 bg-[#6b5234] rounded-full border-4 border-white shadow-2xl animate-pulse"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-[#7a6040] rounded-full animate-ping"></div>
                  </div>
                </div>
                
                {/* Destination Marker */}
                <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="w-6 h-6 bg-[#858643] rounded-full border-4 border-white shadow-2xl"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-[#858643] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold">
                        📍 Mill A
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Route Line with gradient */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6b5234" />
                      <stop offset="100%" stopColor="#858643" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 33% 25% Q 50% 40%, 75% 67%"
                    stroke="url(#routeGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="12,8"
                    className="animate-pulse"
                  />
                </svg>

                {/* Current Location Label */}
                <div className="absolute top-1/4 left-1/3 ml-8 mt-2">
                  <div className="bg-[#6b5234] text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    You are here
                  </div>
                </div>

                {/* Info Cards on Map */}
                <div className="absolute top-6 right-6 space-y-3">
                  {/* Distance Badge */}
                  <div className="bg-white/90 backdrop-blur-sm border-2 border-[#858643] px-5 py-3 rounded-xl shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-[#858643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div className="text-xs text-gray-600 font-semibold">Next Stop</div>
                    </div>
                    <div className="text-2xl font-bold text-[#858643]">12 km</div>
                  </div>

                  {/* ETA Badge */}
                  <div className="bg-white/90 backdrop-blur-sm border-2 border-[#6b5234] px-5 py-3 rounded-xl shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-[#6b5234]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-xs text-gray-600 font-semibold">ETA</div>
                    </div>
                    <div className="text-2xl font-bold text-[#6b5234]">15 min</div>
                  </div>
                </div>

                {/* Navigation hint */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-[#858643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium">Head north on Route 14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Destinations List */}
          <div className="lg:order-1 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#7a6040] to-[#8b7050] rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Delivery Stops</h2>
            </div>
            
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`bg-white/70 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  destination.status === 'active'
                    ? 'border-[#858643] bg-gradient-to-br from-[#858643]/5 to-[#a0a052]/5 scale-[1.02]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg ${
                      destination.status === 'active'
                        ? 'bg-gradient-to-br from-[#858643] to-[#a0a052] text-white'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg mb-1">{destination.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {destination.address}
                      </div>
                    </div>
                  </div>
                  {destination.status === 'active' && (
                    <div className="bg-gradient-to-r from-[#858643] to-[#a0a052] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg animate-pulse">
                      Active
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-[#858643]/10 to-[#a0a052]/10 rounded-lg border border-[#858643]/20">
                      <svg className="w-4 h-4 text-[#858643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Distance</div>
                      <div className="text-base font-bold text-[#858643]">{destination.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-[#9ca855]/10 to-[#b5c066]/10 rounded-lg border border-[#9ca855]/20">
                      <svg className="w-4 h-4 text-[#9ca855]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">ETA</div>
                      <div className="text-base font-bold text-[#9ca855]">{destination.eta}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-6 bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">Route Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="inline-block p-3 bg-gradient-to-br from-[#6b5234] to-[#7a6040] rounded-xl mb-2 group-hover:shadow-lg transition-shadow">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Total Distance</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6b5234] to-[#7a6040] bg-clip-text text-transparent">35 km</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="inline-block p-3 bg-gradient-to-br from-[#858643] to-[#a0a052] rounded-xl mb-2 group-hover:shadow-lg transition-shadow">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Total Stops</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#858643] to-[#a0a052] bg-clip-text text-transparent">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}