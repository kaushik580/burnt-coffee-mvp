
const { useState, useEffect, useMemo } = React;

// --- 1. GENERATE 1000 MOCK PRODUCTS WITH UNIQUE NAMES AND REAL IMAGES ---
const categories = ['Electronics', 'Groceries', 'Fashion', 'Beauty', 'Pharmacy'];
const brands = {
    'Electronics': ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Asus', 'Bose', 'OnePlus', 'JBL'],
    'Groceries': ['Nandini', 'Amul', 'Aashirvaad', 'Tata', 'Fortune', 'Farmley', 'Haldirams', 'Nescafe'],
    'Fashion': ['Nike', 'Adidas', 'Puma', 'Levis', 'H&M', 'Zara', 'Polo', 'Wrogn'],
    'Beauty': ['Maybelline', 'Loreal', 'MAC', 'Lakme', 'Nykaa', 'Minimalist', 'Plum'],
    'Pharmacy': ['MuscleBlaze', 'Optimum Nutrition', 'Dabur', 'Himalaya', 'Revital', 'Zandu']
};
const productTypes = {
    'Electronics': ['Smartphone Pro', 'Laptop', 'Wireless Earbuds', 'Smartwatch Series X', 'Tablet Ultra', '4K Monitor', 'Bluetooth Speaker'],
    'Groceries': ['Full Cream Milk 1L', 'Select Atta 5kg', 'Basmati Rice 1kg', 'Premium Cashews 500g', 'Cold Pressed Oil 1L', 'Gold Filter Coffee 500g', 'Oats 1kg'],
    'Fashion': ['Air Sneakers', 'Cotton Crewneck T-Shirt', 'Denim Jacket', 'Slim Fit Jeans', 'Running Shoes', 'Sports Tracksuit'],
    'Beauty': ['SuperStay Matte Lipstick', 'Vitamin C Serum', 'Sunscreen SPF 50', 'Hydrating Moisturizer', 'Liquid Foundation', 'Purifying Face Wash'],
    'Pharmacy': ['Biozyme Whey 1kg', 'Chyawanprash 500g', 'Multivitamin (60 Tabs)', 'Ashwagandha Extract', 'Omega-3 Fish Oil Capsules']
};
const platforms = ['Amazon', 'Flipkart', 'Myntra', 'Zepto', 'Blinkit', 'Swiggy Instamart'];

const generateMockData = () => {
    const data = [];
    
    // Inject specific items to demo the Knapsack Optimizer (Mascot)
    data.push({ 
        id: 9998, name: "Nandini Full Cream Milk 1L", category: "Groceries", 
        price: 60, originalPrice: 65, platform: "Zepto", eta: "10 MINS", type: "qc", 
        imageUrl: "https://picsum.photos/seed/milk9998/200/200", fee: 35, rating: 4.5, reviews: 1200 
    });
    data.push({ 
        id: 9999, name: "Nandini Full Cream Milk 1L", category: "Groceries", 
        price: 62, originalPrice: 65, platform: "Blinkit", eta: "14 MINS", type: "qc", 
        imageUrl: "https://picsum.photos/seed/milk9999/200/200", fee: 0, rating: 4.7, reviews: 3400 
    });

    for(let i = 1; i <= 1000; i++) {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const brandList = brands[cat];
        const typeList = productTypes[cat];
        const brand = brandList[Math.floor(Math.random() * brandList.length)];
        const prod = typeList[Math.floor(Math.random() * typeList.length)];
        
        let platform = platforms[Math.floor(Math.random() * platforms.length)];
        let isQC = ['Zepto', 'Blinkit', 'Swiggy Instamart'].includes(platform);
        
        // Logical rules (e.g. Fashion is rarely on Quick Commerce)
        if (cat === 'Fashion' && isQC && Math.random() > 0.1) {
            platform = ['Amazon', 'Flipkart', 'Myntra'][Math.floor(Math.random() * 3)];
            isQC = false;
        }
        
        let basePrice = 500;
        if(cat === 'Electronics') basePrice = 5000 + Math.floor(Math.random() * 95000);
        if(cat === 'Groceries') basePrice = 40 + Math.floor(Math.random() * 800);
        if(cat === 'Fashion') basePrice = 800 + Math.floor(Math.random() * 4000);
        if(cat === 'Beauty') basePrice = 300 + Math.floor(Math.random() * 2000);
        if(cat === 'Pharmacy') basePrice = 200 + Math.floor(Math.random() * 3000);

        data.push({
            id: i,
            name: `${brand} ${prod}`,
            category: cat,
            price: basePrice,
            originalPrice: basePrice + Math.floor(basePrice * 0.15),
            platform: platform,
            eta: isQC ? `${Math.floor(Math.random() * 15) + 8} MINS` : `${Math.floor(Math.random() * 3) + 1} DAYS`,
            type: isQC ? 'qc' : 'ecom',
            // Using picsum seed to generate a consistent, unique, real photograph per product
            imageUrl: `https://picsum.photos/seed/burntcoffee${i}/200/200`,
            fee: isQC ? Math.floor(Math.random() * 40) + 10 : 0,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviews: Math.floor(Math.random() * 5000) + 10
        });
    }
    return data;
};
const ALL_PRODUCTS = generateMockData();

function App() {
    const [view, setView] = useState('login'); 
    const [darkMode, setDarkMode] = useState(false);
    const [location, setLocation] = useState(null);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Add-on options
    const [rainPackaging, setRainPackaging] = useState(false);
    const [greenDelivery, setGreenDelivery] = useState(false);

    const displayProducts = useMemo(() => {
        let res = ALL_PRODUCTS;
        if (search) {
            res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
        }
        if (location && location.tier !== 1) {
            res = res.filter(p => p.type !== 'qc'); // Lock out Q-Commerce for Tier 3
        }
        return res.slice(0, 200); // Render 200 for DOM performance, but search sweeps all 1000
    }, [search, location]);

    const addToCart = (item) => {
        setCart([...cart, item]);
        setIsCartOpen(true);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    // Knapsack / Fee Math
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const platformsInCart = [...new Set(cart.map(i => i.platform))];
    let totalFees = 0;
    platformsInCart.forEach(p => {
        const pItems = cart.filter(i => i.platform === p);
        const maxFee = Math.max(...pItems.map(i => i.fee));
        totalFees += maxFee;
    });
    
    let addOns = 0;
    if(rainPackaging) addOns += 15;
    if(greenDelivery) addOns += 0; 

    const total = subtotal + totalFees + addOns;

    // Mascot Optimizer Trigger
    const hasZeptoMilk = cart.some(i => i.id === 9998);
    const optimizeCart = () => {
        const newCart = cart.filter(i => i.id !== 9998); 
        newCart.push(ALL_PRODUCTS.find(i => i.id === 9999)); 
        setCart(newCart);
    };

    const checkout = () => {
        if(cart.length === 0) return alert("Cart is empty");
        alert(`Razorpay Escrow Locked for ₹${total.toLocaleString('en-IN')}!\n\nBurnie says: "Dispatching your orders simultaneously to ${platformsInCart.join(', ')}. You will receive multiple deliveries!\n\nAdd-ons applied: ${rainPackaging ? 'Rain Packaging, ' : ''}${greenDelivery ? 'Green Delivery' : ''}"`);
        setCart([]);
        setIsCartOpen(false);
    };

    // --- VIEWS ---
    if (view === 'login') {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-96 text-center transform transition-all hover:scale-105">
                    <div className="text-7xl mb-4">☕</div>
                    <h1 className="text-3xl font-black text-[#fc8019] mb-2 tracking-tight">BURNT COFFEE</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-semibold">The Omni-Platform Aggregator</p>
                    <form onSubmit={(e) => { e.preventDefault(); setView('geo'); }} className="flex flex-col gap-4">
                        <input type="text" required placeholder="Enter Mobile Number" className="border-2 p-3 rounded-lg font-bold text-center outline-none focus:border-[#fc8019] dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        <button type="submit" className="bg-[#fc8019] text-white font-black py-4 rounded-lg shadow-lg hover:bg-orange-600 transition tracking-wide">GET OTP</button>
                    </form>
                    <button onClick={() => setDarkMode(!darkMode)} className="mt-6 text-sm text-gray-400 underline">Toggle Theme</button>
                </div>
            </div>
        );
    }

    if (view === 'geo') {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} animate-fade-in`}>
                <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-[500px] text-center">
                    <div className="text-7xl mb-4 animate-bounce-slow">📍</div>
                    <h2 className="text-2xl font-black mb-4 dark:text-white">Burnie needs your location!</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 font-medium">To route your cart perfectly, we need to know if you are inside a Q-Commerce dark store radius.</p>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => { setLocation({ name: 'HSR Layout, Bengaluru', tier: 1 }); setView('app'); }} className="bg-green-500 text-white font-black py-4 rounded-lg shadow-lg hover:bg-green-600 transition">
                            SIMULATE TIER 1 CITY (Unlocks Zepto/Blinkit)
                        </button>
                        <button onClick={() => { setLocation({ name: 'Small Town, MP', tier: 3 }); setView('app'); }} className="bg-gray-600 text-white font-black py-4 rounded-lg shadow-lg hover:bg-gray-700 transition">
                            SIMULATE TIER 3 CITY (Amazon/Flipkart Only)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pb-20 ${darkMode ? 'dark' : ''}`} style={{fontFamily: 'Inter, sans-serif'}}>
            {/* Header: Amazon Style Dark Slate */}
            <header className="bg-[#232f3e] text-white sticky top-0 z-40 shadow-xl">
                <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">☕</span>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight leading-none text-[#fc8019]">BURNT COFFEE <span className="bg-white text-[#232f3e] text-[10px] px-1.5 py-0.5 rounded ml-1 font-black align-middle">OMNI</span></h1>
                            <div className="text-xs text-gray-300 mt-1 font-semibold flex items-center gap-1">📍 Deliver to: <span className="text-white">{location?.name}</span></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full md:max-w-3xl">
                        <div className="relative flex w-full shadow-inner">
                            <input 
                                type="text" 
                                placeholder="Search 1000+ items across all platforms..." 
                                className="w-full py-3 px-5 rounded-l-lg text-black focus:outline-none font-medium text-lg"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="bg-[#fc8019] hover:bg-orange-600 px-8 rounded-r-lg font-black transition text-xl">
                                🔍
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setDarkMode(!darkMode)} className="text-2xl hover:scale-110 transition">
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-[#fc8019] transition relative bg-white/10 p-2 rounded-lg">
                            <span className="text-3xl">🛒</span>
                            <div className="flex flex-col text-left hidden md:block">
                                <span className="text-[10px] font-bold text-gray-400 leading-none">Omni-Cart</span>
                                <span className="font-black leading-none">₹{total.toLocaleString('en-IN')}</span>
                            </div>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#fc8019] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-[#232f3e]">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 mt-8">
                {/* Categories */}
                <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
                    <div className="flex gap-3 overflow-x-auto hide-scroll pb-2">
                        {['All', 'Electronics', 'Groceries', 'Fashion', 'Beauty', 'Pharmacy'].map(cat => (
                            <button key={cat} onClick={()=>setSearch(cat==='All'?'':cat)} className="px-6 py-2 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-md font-bold text-gray-700 hover:border-[#fc8019] border-2 border-transparent transition uppercase tracking-wide text-xs">
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm font-bold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                        Total System SKUs: {ALL_PRODUCTS.length.toLocaleString('en-IN')}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/* Inject Specific Zepto Item first for demo if no search */}
                    {!search && location?.tier === 1 && (
                        <ProductCard item={ALL_PRODUCTS.find(i=>i.id===9998)} addToCart={addToCart} />
                    )}
                    {/* Render rest */}
                    {displayProducts.filter(i=>i.id!==9998).map(item => (
                        <ProductCard key={item.id} item={item} addToCart={addToCart} />
                    ))}
                </div>
            </main>

            {/* Omni-Cart Sidebar Overlay */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex justify-end backdrop-blur-sm transition-opacity">
                    <div className="w-full max-w-md bg-gray-50 dark:bg-gray-900 h-full flex flex-col shadow-2xl animate-slide-in">
                        
                        <div className="p-5 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex justify-between items-center shadow-sm z-10">
                            <h2 className="text-2xl font-black dark:text-white text-[#232f3e]">The Omni-Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-[#fc8019] text-3xl font-bold transition">&times;</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 relative">
                            {/* Mascot Optimizer Alert */}
                            {hasZeptoMilk && (
                                <div className="mb-6 bg-orange-50 border-2 border-[#fc8019] rounded-2xl p-5 shadow-lg relative overflow-hidden transform transition hover:scale-[1.02]">
                                    <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">☕</div>
                                    <div className="flex gap-4 relative z-10">
                                        <div className="text-4xl filter drop-shadow-md">☕</div>
                                        <div>
                                            <h4 className="font-black text-orange-900 mb-1 text-lg">Burnie Says:</h4>
                                            <p className="text-sm text-orange-800 leading-snug mb-4 font-medium">Zepto is surging due to rain! Let me move your Milk to <strong>Blinkit</strong> and save you <strong>₹35</strong> in platform fees!</p>
                                            <button onClick={optimizeCart} className="bg-[#fc8019] text-white px-5 py-2.5 rounded-xl font-black hover:bg-orange-600 shadow-md text-sm w-full uppercase tracking-wider transition">
                                                Optimize My Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
                                    <div className="text-8xl mb-6 opacity-50">🛒</div>
                                    <p className="font-bold text-lg">Your Omni-Cart is empty.</p>
                                    <button onClick={() => setIsCartOpen(false)} className="mt-6 text-[#fc8019] font-bold underline">Continue Shopping</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item, index) => (
                                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex gap-4 relative group">
                                            <button onClick={() => removeFromCart(index)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 font-bold">&times;</button>
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-4xl shrink-0 border dark:border-gray-600 overflow-hidden">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 pr-4">
                                                <h4 className="font-bold text-sm text-[#232f3e] dark:text-gray-100 leading-tight mb-1">{item.name}</h4>
                                                <div className="text-[11px] font-semibold text-gray-500 mb-2">Fulfillment: <span className="text-gray-800 dark:text-gray-300">{item.platform}</span></div>
                                                <div className="flex justify-between items-end">
                                                    <span className="font-black text-[#fc8019] text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                                                    <span className={`text-[10px] font-black px-2 py-1 rounded-md ${item.type === 'qc' ? 'bg-orange-100 text-[#fc8019]' : 'bg-blue-100 text-blue-700'}`}>
                                                        ETA: {item.eta}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Delivery Add-ons */}
                                    <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                        <h3 className="font-black text-sm mb-3 dark:text-white">Delivery Add-ons</h3>
                                        <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                            <input type="checkbox" checked={rainPackaging} onChange={()=>setRainPackaging(!rainPackaging)} className="w-5 h-5 rounded border-gray-300 text-[#fc8019] focus:ring-[#fc8019]" />
                                            <div className="flex-1 text-sm font-semibold dark:text-gray-300">Rain-proof Packaging</div>
                                            <div className="text-sm font-black text-gray-600 dark:text-gray-400">₹15</div>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" checked={greenDelivery} onChange={()=>setGreenDelivery(!greenDelivery)} className="w-5 h-5 rounded border-gray-300 text-[#fc8019] focus:ring-[#fc8019]" />
                                            <div className="flex-1 text-sm font-semibold dark:text-gray-300">Opt for Green Delivery 🌱</div>
                                            <div className="text-sm font-black text-green-600">FREE</div>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bill Details */}
                        {cart.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-t-3xl shadow-[0_-15px_30px_rgba(0,0,0,0.1)] border-t dark:border-gray-700 z-20">
                                <h3 className="font-black text-sm mb-4 dark:text-gray-300 uppercase tracking-wider text-gray-500">Routing & Bill Details</h3>
                                <div className="flex justify-between text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                    <span>Item Subtotal ({cart.length} items)</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                    <span>Add-ons</span>
                                    <span>₹{addOns.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                                    <span>Combined Platform & Surge Fees</span>
                                    <span className="text-red-500">+₹{totalFees.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-600 my-4"></div>
                                <div className="flex justify-between font-black text-2xl mb-6 dark:text-white text-[#232f3e]">
                                    <span>Total (INR)</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <button onClick={checkout} className="w-full bg-[#fc8019] hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                                    🔒 PAY ONCE (ESCROW)
                                </button>
                                <p className="text-[10px] text-center text-gray-400 mt-4 font-bold uppercase tracking-widest">Secured by Razorpay Route</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function ProductCard({ item, addToCart }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col relative group transform hover:-translate-y-1">
            {/* Badges: Swiggy Style */}
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black shadow-md z-10 ${item.type === 'qc' ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-[#fc8019] border border-orange-200' : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200'}`}>
                {item.type === 'qc' ? '⚡ ' : '🚚 '}{item.eta}
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-black text-gray-600 bg-white/95 px-2.5 py-1 rounded-md shadow-md backdrop-blur z-10 uppercase tracking-wide border border-gray-100">
                {item.platform}
            </div>

            <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{item.category}</div>
                <h3 className="font-black text-[#232f3e] dark:text-white text-sm leading-snug mb-3 line-clamp-2 h-10 group-hover:text-[#fc8019] transition-colors">{item.name}</h3>
                
                <div className="flex items-center gap-1.5 mb-4">
                    <span className="bg-green-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center shadow-sm">{item.rating} ★</span>
                    <span className="text-[10px] font-semibold text-gray-400">({item.reviews.toLocaleString('en-IN')})</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl font-black dark:text-white">₹{item.price.toLocaleString('en-IN')}</span>
                        {item.originalPrice > item.price && (
                            <span className="text-xs font-semibold text-gray-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                    </div>
                    <div className="h-5 mb-4">
                        {item.fee > 0 ? (
                            <span className="text-[10px] text-red-600 font-black bg-red-50 border border-red-100 px-1.5 py-0.5 rounded shadow-sm">+ ₹{item.fee} Surge</span>
                        ) : (
                            <span className="text-[10px] text-green-700 font-black bg-green-50 border border-green-100 px-1.5 py-0.5 rounded shadow-sm">FREE Delivery</span>
                        )}
                    </div>
                    
                    <button onClick={() => addToCart(item)} className="w-full py-3 rounded-xl font-black text-[#fc8019] bg-orange-50 border-2 border-[#fc8019] transition-all duration-200 hover:bg-[#fc8019] hover:text-white shadow-sm hover:shadow-md">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
