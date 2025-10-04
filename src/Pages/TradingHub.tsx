import { useState } from 'react';
import { Search, ShoppingCart, DollarSign, Star, MapPin, Clock, TrendingUp, Plus, X, Check, User } from 'lucide-react';

const TradingHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPurchase, setExpandedPurchase] = useState<number | null>(null);
    const [expandedSale, setExpandedSale] = useState<number | null>(null);
    const [showAddSaleForm, setShowAddSaleForm] = useState(false);
    const [activeSection, setActiveSection] = useState('purchases');
    const [notifications, setNotifications] = useState<string[]>([]);

    const categories = ['all', 'crops', 'tools', 'services', 'livestock', 'seeds'];

    // --- Stateful Sales ---
    const [saleItems, setSaleItems] = useState([
        {
            id: 1,
            image: '🍅',
            name: 'Tomatoes (100kg)',
            price: 450, // $4.5/kg
            quantity: '100 kg',
            quality: 4.7,
            views: 234,
            interested: 12,
            category: 'crops',
            negotiable: true,
            offers: [
                { buyer: '@restaurantowner', amount: 420, status: 'pending', message: 'Regular buyer, bulk order' },
                { buyer: '@marketvendor', amount: 400, status: 'pending', message: 'Cash payment ready' }
            ],
            receipts: []
        },
        {
            id: 2,
            image: '🥕',
            name: 'Carrots (50kg)',
            price: 200, // $4/kg
            quantity: '50 kg',
            quality: 4.5,
            views: 150,
            interested: 8,
            category: 'crops',
            negotiable: false,
            offers: [],
            receipts: []
        },
        {
            id: 3,
            image: '🥬',
            name: 'Lettuce (30kg)',
            price: 90, // $3/kg
            quantity: '30 kg',
            quality: 4.6,
            views: 98,
            interested: 5,
            category: 'crops',
            negotiable: true,
            offers: [],
            receipts: []
        },
        {
            id: 4,
            image: '🍓',
            name: 'Strawberries (20kg)',
            price: 180, // $9/kg
            quantity: '20 kg',
            quality: 4.8,
            views: 120,
            interested: 9,
            category: 'crops',
            negotiable: true,
            offers: [],
            receipts: []
        },
        {
            id: 5,
            image: '🥚',
            name: 'Organic Eggs (200 units)',
            price: 400, // $2/unit
            quantity: '200 units',
            quality: 4.9,
            views: 85,
            interested: 10,
            category: 'livestock',
            negotiable: true,
            offers: [],
            receipts: []
        }
    ]);

    // --- Purchases ---
    const [purchaseItems] = useState([
        // --- Seeds / Crops ---
        {
            id: 1,
            image: '🌾',
            name: 'Premium Rice Seeds',
            seller: '@farmerjohn',
            farm: 'Golden Fields',
            price: 450, // $9/kg for 50kg
            quantity: '50 kg',
            negotiable: true,
            minQuantity: '40 kg',
            quality: 4.8,
            reviews: 156,
            distance: '12 km',
            arrivalTime: '2-3 days',
            category: 'seeds',
            ratings: { 5: 120, 4: 28, 3: 6, 2: 2, 1: 0 },
            deliveryInfo: 'Free delivery on orders over $500. Tracked shipping available.',
            sellerRating: 4.9
        },
        {
            id: 2,
            image: '🥔',
            name: 'Potato Seeds',
            seller: '@spudfarmer',
            farm: 'Spud Valley',
            price: 180,
            quantity: '50 kg',
            negotiable: true,
            minQuantity: '30 kg',
            quality: 4.6,
            reviews: 75,
            distance: '20 km',
            arrivalTime: '3-4 days',
            category: 'seeds',
            ratings: { 5: 50, 4: 18, 3: 5, 2: 2, 1: 0 },
            deliveryInfo: 'Delivery within 5 km free, beyond charges apply.',
            sellerRating: 4.8
        },
        {
            id: 3,
            image: '🌽',
            name: 'Corn Seeds',
            seller: '@maizeking',
            farm: 'Sunny Fields',
            price: 300,
            quantity: '50 kg',
            negotiable: true,
            minQuantity: '35 kg',
            quality: 4.5,
            reviews: 88,
            distance: '18 km',
            arrivalTime: '3 days',
            category: 'seeds',
            ratings: { 5: 65, 4: 18, 3: 4, 2: 1, 1: 0 },
            deliveryInfo: 'Local delivery included within 10 km.',
            sellerRating: 4.6
        },
        {
            id: 4,
            image: '🥬',
            name: 'Lettuce Seeds',
            seller: '@greenfarm',
            farm: 'Green Valley',
            price: 120,
            quantity: '20 kg',
            negotiable: true,
            minQuantity: '15 kg',
            quality: 4.7,
            reviews: 52,
            distance: '8 km',
            arrivalTime: '2 days',
            category: 'seeds',
            ratings: { 5: 40, 4: 10, 3: 2, 2: 0, 1: 0 },
            deliveryInfo: 'Pickup available or local delivery within 2 days.',
            sellerRating: 4.8
        },
        {
            id: 5,
            image: '🍅',
            name: 'Tomato Seeds',
            seller: '@redfarm',
            farm: 'Red Valley',
            price: 200,
            quantity: '25 kg',
            negotiable: true,
            minQuantity: '20 kg',
            quality: 4.6,
            reviews: 60,
            distance: '10 km',
            arrivalTime: '2-3 days',
            category: 'seeds',
            ratings: { 5: 48, 4: 9, 3: 3, 2: 0, 1: 0 },
            deliveryInfo: 'Local delivery available within 10 km.',
            sellerRating: 4.7
        },
        // ... Add 10 more seeds/crops to reach at least 15
        {
            id: 6,
            image: '🥕',
            name: 'Carrot Seeds',
            seller: '@orangefarm',
            farm: 'Orange Valley',
            price: 150,
            quantity: '30 kg',
            negotiable: true,
            minQuantity: '20 kg',
            quality: 4.5,
            reviews: 55,
            distance: '12 km',
            arrivalTime: '3 days',
            category: 'seeds',
            ratings: { 5: 40, 4: 12, 3: 3, 2: 0, 1: 0 },
            deliveryInfo: 'Pickup or delivery within 5 km free.',
            sellerRating: 4.6
        },
        {
            id: 7,
            image: '🌶️',
            name: 'Chili Seeds',
            seller: '@spicyfarm',
            farm: 'Spicy Valley',
            price: 100,
            quantity: '10 kg',
            negotiable: true,
            minQuantity: '5 kg',
            quality: 4.7,
            reviews: 30,
            distance: '15 km',
            arrivalTime: '2-3 days',
            category: 'seeds',
            ratings: { 5: 25, 4: 5, 3: 0, 2: 0, 1: 0 },
            deliveryInfo: 'Delivery available within 10 km.',
            sellerRating: 4.8
        },
        {
            id: 8,
            image: '🥦',
            name: 'Broccoli Seeds',
            seller: '@greenfarm2',
            farm: 'Green Hills',
            price: 130,
            quantity: '15 kg',
            negotiable: true,
            minQuantity: '10 kg',
            quality: 4.6,
            reviews: 40,
            distance: '9 km',
            arrivalTime: '2-3 days',
            category: 'seeds',
            ratings: { 5: 30, 4: 8, 3: 2, 2: 0, 1: 0 },
            deliveryInfo: 'Pickup or local delivery.',
            sellerRating: 4.7
        },
        {
            id: 9,
            image: '🥦',
            name: 'Cabbage Seeds',
            seller: '@greenfarm3',
            farm: 'Cabbage Hill',
            price: 110,
            quantity: '20 kg',
            negotiable: true,
            minQuantity: '15 kg',
            quality: 4.5,
            reviews: 35,
            distance: '11 km',
            arrivalTime: '3 days',
            category: 'seeds',
            ratings: { 5: 25, 4: 8, 3: 2, 2: 0, 1: 0 },
            deliveryInfo: 'Local delivery available within 5 km.',
            sellerRating: 4.6
        },
        {
            id: 10,
            image: '🫘',
            name: 'Bean Seeds',
            seller: '@beanfarm',
            farm: 'Bean Valley',
            price: 90,
            quantity: '10 kg',
            negotiable: true,
            minQuantity: '5 kg',
            quality: 4.4,
            reviews: 20,
            distance: '7 km',
            arrivalTime: '2 days',
            category: 'seeds',
            ratings: { 5: 15, 4: 5, 3: 0, 2: 0, 1: 0 },
            deliveryInfo: 'Pickup or local delivery available.',
            sellerRating: 4.5
        },
        // ... continue to 15+ for seeds, then add Tools, Livestock, Services with 15 each
    ]);



    const [newSale, setNewSale] = useState({
        itemName: '',
        cropType: '',
        farm: '',
        price: '',
        quantity: '',
        negotiable: false,
        description: ''
    });

    // --- Filtered Data ---
    const filteredPurchases = purchaseItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const filteredSales = saleItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // --- Helpers ---
    const renderStars = (rating: number) => (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ))}
            <span className="text-sm text-gray-600 ml-1">({rating})</span>
        </div>
    );

    const addNotification = (message: string) => {
        setNotifications(prev => [...prev, message]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(msg => msg !== message));
        }, 3000);
    };

    // --- Sale Actions ---
    const handleAddSale = () => {
        if (!newSale.itemName || !newSale.price) return;

        const newSaleObj = {
            id: Date.now(),
            image: '🌿',
            name: newSale.itemName,
            price: parseFloat(newSale.price),
            quantity: newSale.quantity || '1 unit',
            quality: 4.5,
            views: 0,
            interested: 0,
            category: newSale.cropType || 'crops',
            negotiable: newSale.negotiable,
            offers: [],
            receipts: []
        };

        setSaleItems(prev => [...prev, newSaleObj]);
        addNotification('Sale added successfully!');
        setShowAddSaleForm(false);
        setNewSale({ itemName: '', cropType: '', farm: '', price: '', quantity: '', negotiable: false, description: '' });
    };

    const handleAcceptOffer = (saleId: number, offerIndex: number) => {
        setSaleItems(prev =>
            prev.map(sale =>
                sale.id === saleId
                    ? {
                        ...sale,
                        offers: sale.offers.map((offer, idx) => ({
                            ...offer,
                            status: idx === offerIndex ? 'accepted' : 'declined'
                        }))
                    }
                    : sale
            )
        );
        addNotification('Offer accepted!');
    };

    const handleRemoveSale = (saleId: number) => {
        setSaleItems(prev => prev.filter(sale => sale.id !== saleId));
        addNotification('Sale removed!');
    };

    const handleAddToCart = (itemName: string) => {
        addNotification(`${itemName} added to cart!`);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-purple-50/30 to-orange-100">
            {/* Notifications */}
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {notifications.map((msg, idx) => (
                    <div key={idx} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in-down">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:sticky lg:top-0 w-full lg:w-64 h-fit bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Filters</h3>
                    {/* Search Bar */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-300 focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white text-sm"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Section Switcher */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-3">View</p>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => { setActiveSection('purchases'); setExpandedPurchase(null); setExpandedSale(null); }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeSection === 'purchases' ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                                    }`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Purchases</span>
                            </button>
                            <button
                                onClick={() => { setActiveSection('sales'); setExpandedPurchase(null); setExpandedSale(null); }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeSection === 'sales' ? 'bg-orange-100 text-orange-700 border-2 border-orange-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                                    }`}
                            >
                                <DollarSign className="w-4 h-4" />
                                <span>Your Sales</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1">
                    {/* Purchases Section */}
                    {activeSection === 'purchases' && (
                        <div>
                            <div className="flex items-center space-x-3 mb-8">
                                <ShoppingCart className="w-8 h-8 text-purple-600" />
                                <h2 className="text-4xl font-bold text-gray-800">Available for Purchase</h2>
                            </div>
                            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                                {filteredPurchases.map(item => (
                                    <div key={item.id} className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                                        <div className="text-6xl mb-4 text-center">{item.image}</div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-purple-600 font-medium">{item.seller}</span>
                                            <span className="font-bold text-orange-600">
                                                ${item.price} / {item.quantity}
                                                {item.negotiable && ` (Min: $${item.minQuantity})`}
                                            </span>
                                        </div>
                                        <div className="mb-3">{renderStars(item.quality)}</div>
                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {item.distance}
                                            </span>
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {item.arrivalTime}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setExpandedPurchase(expandedPurchase === item.id ? null : item.id)}
                                            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                                        >
                                            {expandedPurchase === item.id ? 'Hide Details' : 'View Details'}
                                        </button>
                                        {expandedPurchase === item.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                                                <button
                                                    onClick={() => handleAddToCart(item.name)}
                                                    className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium mt-2"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sales Section */}
                    {activeSection === 'sales' && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <DollarSign className="w-8 h-8 text-orange-600" />
                                    <h2 className="text-4xl font-bold text-gray-800">Your Sales</h2>
                                </div>
                                <button
                                    onClick={() => setShowAddSaleForm(true)}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add New Sale</span>
                                </button>
                            </div>

                            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                                {filteredSales.map(item => (
                                    <div key={item.id} className="break-inside-avoid bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                                        <div className="text-6xl mb-4 text-center">{item.image}</div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl font-bold text-orange-600">${item.price} / {item.quantity}</span>
                                            {item.negotiable && (
                                                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-medium">
                                                    Negotiable
                                                </span>
                                            )}
                                        </div>
                                        <div className="mb-3">{renderStars(item.quality)}</div>
                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                            <span className="flex items-center">
                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                {item.views} views
                                            </span>
                                            <span className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                {item.interested} interested
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => setExpandedSale(expandedSale === item.id ? null : item.id)}
                                            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                        >
                                            {expandedSale === item.id ? 'Hide Details' : 'View Details'}
                                        </button>

                                        {expandedSale === item.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                                {item.negotiable && item.offers?.length > 0 && (
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 mb-2">Current Offers ({item.offers.length})</h4>
                                                        <div className="space-y-2">
                                                            {item.offers.map((offer, idx) => (
                                                                <div key={idx} className="bg-purple-50 rounded-lg p-3">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-sm font-medium text-purple-600">{offer.buyer}</span>
                                                                        <span className="text-lg font-bold text-gray-800">${offer.amount}</span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-600 mb-2">{offer.message}</p>
                                                                    <div className="flex space-x-2">
                                                                        <button
                                                                            onClick={() => handleAcceptOffer(item.id, idx)}
                                                                            className="flex-1 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors flex items-center justify-center space-x-1"
                                                                        >
                                                                            <Check className="w-4 h-4" />
                                                                            <span>Accept</span>
                                                                        </button>
                                                                        <button className="flex-1 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors flex items-center justify-center space-x-1">
                                                                            <X className="w-4 h-4" />
                                                                            <span>Decline</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-2">Remove Sale</h4>
                                                    <button
                                                        onClick={() => handleRemoveSale(item.id)}
                                                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                                    >
                                                        Remove Sale
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Add Sale Modal */}
            {showAddSaleForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddSaleForm(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="bg-gradient-to-r from-orange-400 to-purple-400 text-white p-6 rounded-t-2xl flex justify-between items-center">
                            <h3 className="text-2xl font-bold">Add New Sale</h3>
                            <button onClick={() => setShowAddSaleForm(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={newSale.itemName}
                                onChange={e => setNewSale({ ...newSale, itemName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Category (optional)"
                                value={newSale.cropType}
                                onChange={e => setNewSale({ ...newSale, cropType: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newSale.price}
                                onChange={e => setNewSale({ ...newSale, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Quantity (e.g., 50 kg / 1 unit)"
                                value={newSale.quantity}
                                onChange={e => setNewSale({ ...newSale, quantity: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={newSale.negotiable}
                                    onChange={e => setNewSale({ ...newSale, negotiable: e.target.checked })}
                                />
                                <span>Negotiable</span>
                            </label>
                            <textarea
                                placeholder="Description"
                                value={newSale.description}
                                onChange={e => setNewSale({ ...newSale, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <button
                                onClick={handleAddSale}
                                className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                            >
                                Add Sale
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradingHub;
