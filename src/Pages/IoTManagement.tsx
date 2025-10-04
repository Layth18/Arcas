import React, { useState } from 'react';
import { Wifi, Droplets, Thermometer, Wind, Sun, Power, ShoppingCart, Star, MapPin, Clock, ChevronDown, ChevronUp, Activity } from 'lucide-react';

// Define types for our data structures
interface DeviceReading {
  moisture?: number;
  temperature?: number;
  lastUpdate: string;
  waterFlow?: string;
  pressure?: string;
  status?: string;
  humidity?: number;
  windSpeed?: string;
  rainfall?: string;
  fanSpeed?: string;
  pH?: number;
  waterLevel?: string;
  consumption?: string;
  feedLevel?: string;
  lastDispense?: string;
  nextDispense?: string;
}

interface DeviceControls {
  hasManual: boolean;
  currentState?: 'on' | 'off' | 'auto';
}

interface IoTDevice {
  id: number;
  name: string;
  type: string;
  location: string;
  status: string;
  icon: React.ComponentType<any>;
  readings: DeviceReading;
  controls: DeviceControls;
}

interface DeviceSpecs {
  accuracy?: string;
  range?: string;
  connectivity?: string;
  battery?: string;
  waterproof?: string;
  zones?: string;
  scheduling?: string;
  flowRate?: string;
  warranty?: string;
  tracking?: string;
  alerts?: string;
  animals?: string;
  nutrients?: string;
  display?: string;
  reports?: string;
  resolution?: string;
  ai?: string;
  nightVision?: string;
  coverage?: string;
  capacity?: string;
  portions?: string;
  control?: string;
  automation?: string;
  spectrum?: string;
  efficiency?: string;
  lifespan?: string;
  plants?: string;
}

interface RecommendedDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  icon: string;
  specs: DeviceSpecs;
}

const IoTManagement = () => {
  const [selectedFarm, setSelectedFarm] = useState('Sunset Valley Farm');
  const [expandedOwnDevice, setExpandedOwnDevice] = useState<number | null>(null);
  const [expandedRecommended, setExpandedRecommended] = useState<number | null>(null);
  const [deviceStates, setDeviceStates] = useState<Record<number, 'on' | 'off' | 'auto'>>({});

  const farms = ['Sunset Valley Farm', 'Green Acres', 'River Bend Farm'];

  const farmDevices: Record<string, IoTDevice[]> = {
    'Sunset Valley Farm': [
      {
        id: 1,
        name: 'Soil Moisture Sensor A',
        type: 'Sensor',
        location: 'Field Section A',
        status: 'active',
        icon: Droplets,
        readings: {
          moisture: 47,
          temperature: 21,
          lastUpdate: '2 min ago'
        },
        controls: {
          hasManual: false
        }
      },
      {
        id: 2,
        name: 'Smart Irrigation System',
        type: 'Irrigation',
        location: 'Main Field',
        status: 'active',
        icon: Droplets,
        readings: {
          waterFlow: '125 L/min',
          pressure: '2.3 bar',
          status: 'Running',
          lastUpdate: '1 min ago'
        },
        controls: {
          hasManual: true,
          currentState: 'on'
        }
      },
      {
        id: 3,
        name: 'Weather Station',
        type: 'Sensor',
        location: 'Central Field',
        status: 'active',
        icon: Sun,
        readings: {
          temperature: 28,
          humidity: 65,
          windSpeed: '12 km/h',
          rainfall: '0 mm',
          lastUpdate: '30 sec ago'
        },
        controls: {
          hasManual: false
        }
      }
    ],
    'Green Acres': [
      {
        id: 4,
        name: 'Temperature Monitor B',
        type: 'Sensor',
        location: 'Greenhouse',
        status: 'active',
        icon: Thermometer,
        readings: {
          temperature: 24,
          humidity: 78,
          lastUpdate: '3 min ago'
        },
        controls: {
          hasManual: false
        }
      },
      {
        id: 5,
        name: 'Automated Ventilation',
        type: 'Control',
        location: 'Greenhouse',
        status: 'active',
        icon: Wind,
        readings: {
          fanSpeed: '65%',
          temperature: 24,
          status: 'Auto Mode',
          lastUpdate: '1 min ago'
        },
        controls: {
          hasManual: true,
          currentState: 'auto'
        }
      },
      {
        id: 6,
        name: 'Soil pH Sensor',
        type: 'Sensor',
        location: 'Vegetable Plot',
        status: 'active',
        icon: Droplets,
        readings: {
          pH: 6.8,
          temperature: 19,
          lastUpdate: '5 min ago'
        },
        controls: {
          hasManual: false
        }
      }
    ],
    'River Bend Farm': [
      {
        id: 7,
        name: 'Livestock Water Monitor',
        type: 'Sensor',
        location: 'Barn Area',
        status: 'active',
        icon: Droplets,
        readings: {
          waterLevel: '82%',
          consumption: '45 L/day',
          lastUpdate: '10 min ago'
        },
        controls: {
          hasManual: false
        }
      },
      {
        id: 8,
        name: 'Feed Dispenser',
        type: 'Control',
        location: 'Livestock Barn',
        status: 'active',
        icon: Activity,
        readings: {
          feedLevel: '58%',
          lastDispense: '6:00 AM',
          nextDispense: '6:00 PM',
          lastUpdate: '15 min ago'
        },
        controls: {
          hasManual: true,
          currentState: 'auto'
        }
      },
      {
        id: 9,
        name: 'Pasture Moisture Sensor',
        type: 'Sensor',
        location: 'South Pasture',
        status: 'active',
        icon: Droplets,
        readings: {
          moisture: 62,
          temperature: 23,
          lastUpdate: '8 min ago'
        },
        controls: {
          hasManual: false
        }
      }
    ]
  };

  const farmRecommendations: Record<string, RecommendedDevice[]> = {
    'Sunset Valley Farm': [
      {
        id: 1,
        name: 'Advanced Soil pH Sensor',
        price: 299,
        rating: 4.8,
        reviews: 156,
        distance: '15 km',
        deliveryTime: '2-3 days',
        icon: '🧪',
        specs: {
          accuracy: '±0.1 pH',
          range: 'pH 3-10',
          connectivity: 'WiFi, Bluetooth',
          battery: '6 months',
          waterproof: 'IP68'
        }
      },
      {
        id: 2,
        name: 'Smart Drip Irrigation Controller',
        price: 549,
        rating: 4.9,
        reviews: 203,
        distance: '8 km',
        deliveryTime: 'Same day',
        icon: '💧',
        specs: {
          zones: '8 independent zones',
          connectivity: 'WiFi, Mobile App',
          scheduling: 'AI-powered optimization',
          flowRate: 'Up to 200 L/min',
          warranty: '3 years'
        }
      },
      {
        id: 3,
        name: 'Nutrient Level Analyzer',
        price: 425,
        rating: 4.7,
        reviews: 124,
        distance: '18 km',
        deliveryTime: '1-2 days',
        icon: '🌱',
        specs: {
          nutrients: 'N, P, K + micronutrients',
          accuracy: '±5%',
          connectivity: 'WiFi, Cloud sync',
          display: 'LCD touchscreen',
          reports: 'Auto-generated recommendations'
        }
      }
    ],
    'Green Acres': [
      {
        id: 4,
        name: 'Climate Control System',
        price: 899,
        rating: 4.9,
        reviews: 189,
        distance: '10 km',
        deliveryTime: '2-3 days',
        icon: '🌡️',
        specs: {
          control: 'Temperature, humidity, CO2',
          zones: '4 independent zones',
          connectivity: 'WiFi, Mobile App',
          automation: 'Full AI automation',
          warranty: '2 years'
        }
      },
      {
        id: 5,
        name: 'LED Grow Light System',
        price: 679,
        rating: 4.6,
        reviews: 145,
        distance: '12 km',
        deliveryTime: '3-5 days',
        icon: '💡',
        specs: {
          spectrum: 'Full spectrum, adjustable',
          coverage: '10 sq meters',
          efficiency: 'Energy-efficient LED',
          scheduling: 'Programmable sunrise/sunset',
          lifespan: '50,000 hours'
        }
      },
      {
        id: 6,
        name: 'Automated Watering System',
        price: 445,
        rating: 4.7,
        reviews: 167,
        distance: '15 km',
        deliveryTime: '1-2 days',
        icon: '🚿',
        specs: {
          capacity: '100 L reservoir',
          plants: 'Up to 50 plants',
          scheduling: 'Moisture-based auto watering',
          connectivity: 'WiFi, Cloud sync',
          warranty: '18 months'
        }
      }
    ],
    'River Bend Farm': [
      {
        id: 7,
        name: 'Livestock Activity Monitor',
        price: 189,
        rating: 4.6,
        reviews: 89,
        distance: '22 km',
        deliveryTime: '3-5 days',
        icon: '🐄',
        specs: {
          tracking: 'GPS + Activity sensors',
          battery: '12 months',
          waterproof: 'IP67',
          alerts: 'Health & behavior alerts',
          animals: 'Up to 50 animals'
        }
      },
      {
        id: 8,
        name: 'Automated Feed Dispenser',
        price: 679,
        rating: 4.5,
        reviews: 78,
        distance: '25 km',
        deliveryTime: '1 week',
        icon: '🍽️',
        specs: {
          capacity: '100 kg',
          scheduling: 'Programmable times',
          portions: 'Weight-based control',
          connectivity: 'WiFi, Mobile App',
          animals: 'Up to 30 animals'
        }
      },
      {
        id: 9,
        name: 'Pasture Fence Monitor',
        price: 349,
        rating: 4.8,
        reviews: 134,
        distance: '18 km',
        deliveryTime: '2-3 days',
        icon: '🚧',
        specs: {
          coverage: 'Up to 5 km fence line',
          alerts: 'Breach detection alerts',
          battery: '24 months',
          connectivity: 'WiFi, SMS alerts',
          warranty: '3 years'
        }
      }
    ]
  };

  const ownDevices = farmDevices[selectedFarm] || [];
  const recommendedDevices = farmRecommendations[selectedFarm] || [];

  const toggleDeviceState = (deviceId: number) => {
    const device = ownDevices.find(d => d.id === deviceId);
    if (!device || !device.controls.hasManual) return;

    setDeviceStates(prev => {
      const currentState = prev[deviceId] || device.controls.currentState || 'off';
      const newState = currentState === 'on' || currentState === 'auto' ? 'off' : 'on';
      return { ...prev, [deviceId]: newState };
    });
  };

  const getDeviceState = (deviceId: number) => {
    const device = ownDevices.find(d => d.id === deviceId);
    return deviceStates[deviceId] || device?.controls.currentState || 'off';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const formatReadingKey = (key: string): string => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const formatReadingValue = (key: string, value: any): string => {
    if (typeof value === 'number') {
      if (key.includes('temp') || key.includes('Temp')) return `${value}°C`;
      if (key.includes('moisture') || key.includes('Moisture')) return `${value}%`;
      if (key.includes('humidity') || key.includes('Humidity')) return `${value}%`;
      if (key === 'pH') return value.toString();
    }
    return value.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header with Farm Selection */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">IoT Management</h1>
          <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-green-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Farm:</label>
            <select
              value={selectedFarm}
              onChange={(e) => setSelectedFarm(e.target.value)}
              className="w-full md:w-auto px-6 py-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none bg-white text-gray-800 font-medium text-lg"
            >
              {farms.map((farm) => (
                <option key={farm} value={farm}>
                  {farm}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Own IoT Devices Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Wifi className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Your IoT Devices</h2>
          </div>

          <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
            {ownDevices.map((device) => {
              const DeviceIcon = device.icon;
              const state = getDeviceState(device.id);
              
              return (
                <div
                  key={device.id}
                  className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-3">
                        <DeviceIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{device.name}</h3>
                        <p className="text-sm text-gray-500">{device.type}</p>
                      </div>
                    </div>
                    <span className="flex items-center text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {device.location}
                    </p>
                  </div>

                  <button
                    onClick={() => setExpandedOwnDevice(expandedOwnDevice === device.id ? null : device.id)}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <span>{expandedOwnDevice === device.id ? 'Hide' : 'View'} Dashboard</span>
                    {expandedOwnDevice === device.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedOwnDevice === device.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">Live Readings</h4>
                      
                      {/* Display readings dynamically */}
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(device.readings).map(([key, value]) => {
                          if (key === 'lastUpdate') return null;
                          
                          const displayKey = formatReadingKey(key);
                          
                          return (
                            <div key={key} className="bg-green-50 rounded-lg p-3">
                              <p className="text-xs text-gray-600 mb-1">{displayKey}</p>
                              <p className="text-lg font-bold text-gray-800">
                                {formatReadingValue(key, value)}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {device.readings.lastUpdate}
                      </p>

                      {device.controls.hasManual && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Manual Control:</span>
                            <button
                              onClick={() => toggleDeviceState(device.id)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                state === 'on' || state === 'auto'
                                  ? 'bg-green-500 text-white hover:bg-green-600'
                                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                              }`}
                            >
                              <Power className="w-4 h-4" />
                              <span>{state === 'off' ? 'Turn On' : state === 'auto' ? 'Auto Mode' : 'Turn Off'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Recommended IoT Devices Section */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-800">Recommended Devices</h2>
          </div>

          <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
            {recommendedDevices.map((device) => (
              <div
                key={device.id}
                className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-4 text-center">{device.icon}</div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{device.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-orange-600">${device.price}</span>
                </div>

                <div className="mb-3">
                  {renderStars(device.rating)}
                  <span className="text-xs text-gray-500 ml-1">({device.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {device.distance}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {device.deliveryTime}
                  </span>
                </div>

                <button
                  onClick={() => setExpandedRecommended(expandedRecommended === device.id ? null : device.id)}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>{expandedRecommended === device.id ? 'Hide' : 'View'} Details</span>
                  {expandedRecommended === device.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {expandedRecommended === device.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Specifications</h4>
                    <div className="space-y-2">
                      {Object.entries(device.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-medium text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium mt-4 flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Basket</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IoTManagement;