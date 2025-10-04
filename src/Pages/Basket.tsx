import { useState } from 'react';
import { ShoppingCart, X, Package, Clock, User, Wifi } from 'lucide-react';

// Define types for our data structures
interface BasketItem {
  id: number;
  type: 'trading' | 'iot';
  name: string;
  seller: string;
  price: number;
  quantity: string;
  estimatedDelivery: string;
  orderDate: string;
  canCancel: boolean;
  icon: string;
}

const Basket = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([
    {
      id: 1,
      type: 'trading',
      name: 'Premium Rice Seeds',
      seller: '@farmerjohn',
      price: 450,
      quantity: '50kg',
      estimatedDelivery: '2-3 days',
      orderDate: '2024-10-04',
      canCancel: true,
      icon: '🌾'
    },
    {
      id: 2,
      type: 'iot',
      name: 'Advanced Soil pH Sensor',
      seller: 'AgriTech Solutions',
      price: 299,
      quantity: '1 unit',
      estimatedDelivery: '2-3 days',
      orderDate: '2024-10-03',
      canCancel: true,
      icon: '🧪'
    },
    {
      id: 3,
      type: 'trading',
      name: 'Organic Carrots',
      seller: '@greenfarms',
      price: 280,
      quantity: '50kg',
      estimatedDelivery: 'Same day',
      orderDate: '2024-10-04',
      canCancel: false,
      icon: '🥕'
    },
    {
      id: 4,
      type: 'iot',
      name: 'Smart Drip Irrigation Controller',
      seller: 'HydroFlow Systems',
      price: 549,
      quantity: '1 unit',
      estimatedDelivery: 'Same day',
      orderDate: '2024-10-04',
      canCancel: false,
      icon: '💧'
    },
    {
      id: 5,
      type: 'trading',
      name: 'Heavy Duty Tractor',
      seller: '@agrimachines',
      price: 15000,
      quantity: '1 unit',
      estimatedDelivery: '1 week',
      orderDate: '2024-10-01',
      canCancel: true,
      icon: '🚜'
    },
    {
      id: 6,
      type: 'iot',
      name: 'Livestock Activity Monitor',
      seller: 'FarmWatch Pro',
      price: 189,
      quantity: '5 units',
      estimatedDelivery: '3-5 days',
      orderDate: '2024-10-02',
      canCancel: true,
      icon: '🐄'
    },
    {
      id: 7,
      type: 'trading',
      name: 'Corn Harvest',
      seller: '@goldenfields',
      price: 1200,
      quantity: '1 ton',
      estimatedDelivery: '1-2 days',
      orderDate: '2024-10-03',
      canCancel: true,
      icon: '🌽'
    },
    {
      id: 8,
      type: 'iot',
      name: 'Climate Control System',
      seller: 'GreenhouseTech Pro',
      price: 899,
      quantity: '1 unit',
      estimatedDelivery: '2-3 days',
      orderDate: '2024-10-02',
      canCancel: true,
      icon: '🌡️'
    }
  ]);

  const handleCancelOrder = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setBasketItems(basketItems.filter(item => item.id !== id));
    }
  };

  const tradingItems = basketItems.filter(item => item.type === 'trading');
  const iotItems = basketItems.filter(item => item.type === 'iot');

  const totalTradingCost = tradingItems.reduce((sum, item) => sum + item.price, 0);
  const totalIoTCost = iotItems.reduce((sum, item) => sum + item.price, 0);
  const totalCost = totalTradingCost + totalIoTCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingCart className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-800">Your Basket</h1>
          </div>
          <p className="text-gray-600">Review your purchases and track deliveries</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center space-x-3 mb-2">
              <Package className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800">Trading Hub</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">{tradingItems.length}</p>
            <p className="text-sm text-gray-600">items</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">${totalTradingCost.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center space-x-3 mb-2">
              <Wifi className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">IoT Devices</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{iotItems.length}</p>
            <p className="text-sm text-gray-600">items</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">${totalIoTCost.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
            <div className="flex items-center space-x-3 mb-2">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-800">Total</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">{basketItems.length}</p>
            <p className="text-sm text-gray-600">items</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">${totalCost.toLocaleString()}</p>
          </div>
        </div>

        {/* Trading Hub Items */}
        {tradingItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">Trading Hub Orders</h2>
            </div>

            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
              {tradingItems.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{item.icon}</div>
                    {item.canCancel && (
                      <button
                        onClick={() => handleCancelOrder(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Cancel order"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-medium text-purple-600">{item.seller}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="w-4 h-4 mr-2" />
                      <span>{item.quantity}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">{item.estimatedDelivery}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Ordered: {item.orderDate}</span>
                    <span className="text-2xl font-bold text-purple-600">${item.price.toLocaleString()}</span>
                  </div>

                  {!item.canCancel && (
                    <div className="mt-3 bg-gray-100 rounded-lg p-2">
                      <p className="text-xs text-gray-600 text-center">
                        Order is being processed and cannot be cancelled
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* IoT Device Items */}
        {iotItems.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Wifi className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">IoT Device Orders</h2>
            </div>

            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
              {iotItems.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{item.icon}</div>
                    {item.canCancel && (
                      <button
                        onClick={() => handleCancelOrder(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Cancel order"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-medium text-green-600">{item.seller}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Package className="w-4 h-4 mr-2" />
                      <span>{item.quantity}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">{item.estimatedDelivery}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Ordered: {item.orderDate}</span>
                    <span className="text-2xl font-bold text-green-600">${item.price.toLocaleString()}</span>
                  </div>

                  {!item.canCancel && (
                    <div className="mt-3 bg-gray-100 rounded-lg p-2">
                      <p className="text-xs text-gray-600 text-center">
                        Order is being processed and cannot be cancelled
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {basketItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 border-2 border-gray-200 text-center">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your basket is empty</h3>
            <p className="text-gray-600">Start shopping to add items to your basket</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;