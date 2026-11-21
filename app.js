
const { useState, useEffect, useMemo } = React;

// --- SVG ICONS (Completely replacing Emojis for an Enterprise look) ---
const CoffeeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" />
    </svg>
);
const MapPinIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);
const CartIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);
const LightningIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);
const TruckIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);
const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const ShieldIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// --- 1. GENERATE 1000 MOCK PRODUCTS WITH STATIC UNSPLASH CDNs ---
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

const baseItems = [
    { n: "iPhone 15 Pro Max", c: "Electronics", p: 145000, imgUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80" },
    { n: "Nandini Full Cream Milk 1L", c: "Groceries", p: 60, imgUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80" },
    { n: "Sony WH-1000XM5", c: "Electronics", p: 25000, imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
    { n: "Farmley Premium Cashews", c: "Groceries", p: 450, imgUrl: "https://images.unsplash.com/photo-1599598425947-3300262b660f?auto=format&fit=crop&w=400&q=80" },
    { n: "Nike Air Force 1 '07", c: "Fashion", p: 7495, imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
    { n: "MacBook Air M3 (16GB)", c: "Electronics", p: 115000, imgUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
    { n: "Aashirvaad Select Atta 5kg", c: "Groceries", p: 280, imgUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
    { n: "Maybelline SuperStay Matte", c: "Beauty", p: 550, imgUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80" },
    { n: "MuscleBlaze Biozyme Whey", c: "Pharmacy", p: 2400, imgUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80" },
    { n: "Atomic Habits (Hardcover)", c: "Books", p: 450, imgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80" },
    { n: "Pampers Active Baby (L)", c: "Groceries", p: 850, imgUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80" },
    { n: "Samsung Galaxy S24 Ultra", c: "Electronics", p: 129000, imgUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80" }
];
const platforms = ['Amazon', 'Flipkart', 'Myntra', 'Zepto', 'Blinkit', 'Swiggy Instamart'];

const generateMockData = () => {
    const data = [];
    const milkUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80";
    
    // Inject specific items to demo the Knapsack Optimizer (Mascot)
    data.push({ 
        id: 9998, name: "Nandini Full Cream Milk 1L", category: "Groceries", 
        price: 60, originalPrice: 65, platform: "Zepto", eta: "10 MINS", type: "qc", 
        imageUrl: milkUrl, fee: 35, rating: 4.5, reviews: 1200 
    });
    data.push({ 
        id: 9999, name: "Nandini Full Cream Milk 1L", category: "Groceries", 
        price: 62, originalPrice: 65, platform: "Blinkit", eta: "14 MINS", type: "qc", 
        imageUrl: milkUrl, fee: 0, rating: 4.7, reviews: 3400 
    });

    for(let i = 1; i <= 1000; i++) {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const brandList = brands[cat];
        const typeList = productTypes[cat];
        const brand = brandList[Math.floor(Math.random() * brandList.length)];
        const prod = typeList[Math.floor(Math.random() * typeList.length)];
        
        let platform = platforms[Math.floor(Math.random() * platforms.length)];
        let isQC = ['Zepto', 'Blinkit', 'Swiggy Instamart'].includes(platform);
        
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

        // Get matching static image based on category
        const imgObj = baseItems.find(b => b.c === cat) || baseItems[0];

        data.push({
            id: i,
            name: `${brand} ${prod}`,
            category: cat,
            price: basePrice,
            originalPrice: basePrice + Math.floor(basePrice * 0.15),
            platform: platform,
            eta: isQC ? `${Math.floor(Math.random() * 15) + 8} MINS` : `${Math.floor(Math.random() * 3) + 1} DAYS`,
            type: isQC ? 'qc' : 'ecom',
            imageUrl: imgObj.imgUrl, // Browser caches this, no rate limits!
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
            res = res.filter(p => p.type !== 'qc'); 
        }
        return res.slice(0, 300); // 300 max rendered to keep DOM fast
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
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} animate-fade-in`}>
                <div className={`p-10 rounded-2xl shadow-2xl w-96 text-center transform transition-all hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <CoffeeIcon className="w-20 h-20 mx-auto mb-6 text-[#fc8019]" />
                    <h1 className="text-3xl font-black text-[#fc8019] mb-2 tracking-tight">BURNT COFFEE</h1>
                    <p className={`text-sm mb-8 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>The Omni-Platform Aggregator</p>
                    <form onSubmit={(e) => { e.preventDefault(); setView('geo'); }} className="flex flex-col gap-4">
                        <input type="text" required placeholder="Enter Mobile Number" className={`border-2 p-3 rounded-lg font-bold text-center outline-none focus:border-[#fc8019] transition-colors ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} />
                        <button type="submit" className="bg-[#fc8019] text-white font-black py-4 rounded-lg shadow-lg hover:bg-orange-600 transition tracking-wide">SECURE OTP LOGIN</button>
                    </form>
                    <button onClick={() => setDarkMode(!darkMode)} className="mt-6 text-sm text-gray-400 underline font-medium">Toggle Theme</button>
                </div>
            </div>
        );
    }

    if (view === 'geo') {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} animate-fade-in`}>
                <div className={`p-10 rounded-2xl shadow-2xl w-[500px] text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <MapPinIcon className="w-20 h-20 mx-auto mb-6 text-[#fc8019] animate-bounce-slow" />
                    <h2 className="text-2xl font-black mb-4">Establishing Geohash...</h2>
                    <p className={`text-sm mb-8 font-medium leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>To dynamically route your Omni-Cart, we need to map your coordinates against active Q-Commerce dark store polygons.</p>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => { setLocation({ name: 'HSR Layout, Bengaluru', tier: 1 }); setView('app'); }} className="bg-green-600 text-white font-black py-4 rounded-lg shadow-lg hover:bg-green-700 transition">
                            SIMULATE TIER 1 CITY (Unlocks Quick-Commerce)
                        </button>
                        <button onClick={() => { setLocation({ name: 'Small Town, MP', tier: 3 }); setView('app'); }} className="bg-gray-600 text-white font-black py-4 rounded-lg shadow-lg hover:bg-gray-700 transition">
                            SIMULATE TIER 3 CITY (Large E-Commerce Only)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pb-20 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <header className="bg-[#232f3e] text-white sticky top-0 z-40 shadow-xl">
                <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <CoffeeIcon className="w-10 h-10 text-[#fc8019]" />
                        <div>
                            <h1 className="text-2xl font-black tracking-tight leading-none text-[#fc8019]">BURNT COFFEE <span className="bg-white text-[#232f3e] text-[10px] px-1.5 py-0.5 rounded ml-1 font-black align-middle">OMNI</span></h1>
                            <div className="text-xs text-gray-300 mt-1 font-semibold flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> Deliver to: <span className="text-white font-bold">{location?.name}</span></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full md:max-w-3xl">
                        <div className="relative flex w-full shadow-inner">
                            <input 
                                type="text" 
                                placeholder="Search 1,000+ items across all platforms..." 
                                className="w-full py-3 px-5 rounded-l-lg text-black focus:outline-none font-medium text-lg border-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="bg-[#fc8019] hover:bg-orange-600 px-8 rounded-r-lg font-black transition text-xl flex items-center justify-center">
                                <SearchIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setDarkMode(!darkMode)} className="text-sm font-bold bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600 transition flex items-center gap-2">
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 hover:text-[#fc8019] transition relative bg-white/10 p-2 rounded-lg">
                            <CartIcon className="w-8 h-8" />
                            <div className="flex flex-col text-left hidden md:flex">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {!search && location?.tier === 1 && (
                        <ProductCard item={ALL_PRODUCTS.find(i=>i.id===9998)} addToCart={addToCart} />
                    )}
                    {displayProducts.filter(i=>i.id!==9998).map(item => (
                        <ProductCard key={item.id} item={item} addToCart={addToCart} />
                    ))}
                </div>
            </main>

            {isCartOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex justify-end backdrop-blur-sm transition-opacity animate-fade-in">
                    <div className="w-full max-w-md bg-gray-50 dark:bg-gray-900 h-full flex flex-col shadow-2xl animate-slide-in">
                        
                        <div className="p-5 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex justify-between items-center shadow-sm z-10">
                            <h2 className="text-2xl font-black dark:text-white text-[#232f3e] flex items-center gap-2"><CartIcon className="w-6 h-6"/> The Omni-Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-[#fc8019] text-3xl font-bold transition">&times;</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 relative">
                            {hasZeptoMilk && (
                                <div className="mb-6 bg-orange-50 dark:bg-orange-900/30 border-2 border-[#fc8019] rounded-2xl p-5 shadow-lg relative overflow-hidden transform transition hover:scale-[1.02]">
                                    <CoffeeIcon className="absolute -right-4 -bottom-4 w-32 h-32 text-[#fc8019] opacity-10" />
                                    <div className="flex gap-4 relative z-10">
                                        <CoffeeIcon className="w-12 h-12 text-[#fc8019] filter drop-shadow-md" />
                                        <div>
                                            <h4 className="font-black text-orange-900 dark:text-orange-400 mb-1 text-lg">Burnie The Mascot Says:</h4>
                                            <p className="text-sm text-orange-800 dark:text-orange-200 leading-snug mb-4 font-medium">Zepto is surging due to rain! Let me move your Milk to <strong>Blinkit</strong> and save you <strong>₹35</strong> in platform fees!</p>
                                            <button onClick={optimizeCart} className="bg-[#fc8019] text-white px-5 py-2.5 rounded-xl font-black hover:bg-orange-600 shadow-md text-sm w-full uppercase tracking-wider transition">
                                                Optimize My Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
                                    <CartIcon className="w-24 h-24 mb-6 opacity-50" />
                                    <p className="font-bold text-lg">Your Omni-Cart is empty.</p>
                                    <button onClick={() => setIsCartOpen(false)} className="mt-6 text-[#fc8019] font-bold underline">Continue Shopping</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item, index) => (
                                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex gap-4 relative group">
                                            <button onClick={() => removeFromCart(index)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 font-bold text-lg">&times;</button>
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 border dark:border-gray-600 overflow-hidden">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 pr-4">
                                                <h4 className="font-bold text-sm text-[#232f3e] dark:text-gray-100 leading-tight mb-1">{item.name}</h4>
                                                <div className="text-[11px] font-semibold text-gray-500 mb-2">Fulfillment: <span className="text-gray-800 dark:text-gray-300">{item.platform}</span></div>
                                                <div className="flex justify-between items-end">
                                                    <span className="font-black text-[#fc8019] text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                                                    <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${item.type === 'qc' ? 'bg-orange-100 text-[#fc8019]' : 'bg-blue-100 text-blue-700'}`}>
                                                        {item.type === 'qc' ? <LightningIcon className="w-3 h-3"/> : <TruckIcon className="w-3 h-3"/>}
                                                        {item.eta}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Delivery Add-ons */}
                                    <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                        <h3 className="font-black text-sm mb-3 dark:text-white flex items-center gap-2">Delivery Add-ons</h3>
                                        <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                            <input type="checkbox" checked={rainPackaging} onChange={()=>setRainPackaging(!rainPackaging)} className="w-5 h-5 rounded border-gray-300 text-[#fc8019] focus:ring-[#fc8019]" />
                                            <div className="flex-1 text-sm font-semibold dark:text-gray-300">Rain-proof Packaging ☔</div>
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
                                    <ShieldIcon className="w-6 h-6" /> PAY ONCE (ESCROW)
                                </button>
                                <p className="text-[10px] text-center text-gray-400 mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-1">Secured by Razorpay Route</p>
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
            
            {/* Badges */}
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black shadow-md z-10 flex items-center gap-1 ${item.type === 'qc' ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-[#fc8019] border border-orange-200' : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200'}`}>
                {item.type === 'qc' ? <LightningIcon className="w-3 h-3"/> : <TruckIcon className="w-3 h-3"/>}
                {item.eta}
            </div>
            
            <div className="absolute top-3 right-3 text-[10px] font-black text-gray-600 bg-white/95 px-2.5 py-1 rounded-md shadow-md backdrop-blur z-10 uppercase tracking-wide border border-gray-100">
                {item.platform}
            </div>

            <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{item.category}</div>
                <h3 className="font-black text-[#232f3e] dark:text-white text-sm leading-snug mb-3 line-clamp-2 h-10 group-hover:text-[#fc8019] transition-colors">{item.name}</h3>
                
                <div className="flex items-center gap-1.5 mb-4">
                    <span className="bg-green-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">{item.rating} <StarIcon className="w-2.5 h-2.5" /></span>
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
                    
                    <button onClick={() => addToCart(item)} className="w-full py-3 rounded-xl font-black text-[#fc8019] bg-orange-50 border-2 border-[#fc8019] transition-all duration-200 hover:bg-[#fc8019] hover:text-white shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
