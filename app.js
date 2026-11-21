
const { useState, useEffect, useMemo } = React;

// --- SVG ICONS ---
const CoffeeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" /></svg>;
const MapPinIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const CartIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
const LightningIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
const TruckIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const ShieldIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const StarIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const XIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const ChevronLeftIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>;
const CheckCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

// --- REAL, RELIABLE IMAGES ---
const productTemplates = [
    { n: "Apple iPhone 15 Pro Max", c: "Electronics", p: 145000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", b: "Apple" },
    { n: "Nandini Full Cream Milk 1L", c: "Groceries", p: 60, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80", b: "Nandini" },
    { n: "Sony WH-1000XM5 Headphones", c: "Electronics", p: 25000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", b: "Sony" },
    { n: "Farmley Premium Whole Cashews", c: "Groceries", p: 450, img: "https://images.unsplash.com/photo-1599598425947-3300262b660f?w=800&q=80", b: "Farmley" },
    { n: "Nike Air Force 1 '07 Sneakers", c: "Fashion", p: 7495, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", b: "Nike" },
    { n: "MacBook Air M3 (16GB RAM)", c: "Electronics", p: 115000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", b: "Apple" },
    { n: "Aashirvaad Select Atta 5kg", c: "Groceries", p: 280, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", b: "Aashirvaad" },
    { n: "Maybelline SuperStay Matte Ink", c: "Beauty", p: 550, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80", b: "Maybelline" },
    { n: "MuscleBlaze Biozyme Whey Protein", c: "Pharmacy", p: 2400, img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80", b: "MuscleBlaze" },
    { n: "Atomic Habits (Hardcover)", c: "Books", p: 450, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80", b: "Penguin" },
    { n: "Pampers Active Baby Diapers (L)", c: "Groceries", p: 850, img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80", b: "Pampers" },
    { n: "Fossil Gen 6 Smartwatch", c: "Electronics", p: 14999, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", b: "Fossil" }
];
const platforms = ['Amazon', 'Flipkart', 'Myntra', 'Zepto', 'Blinkit', 'Swiggy Instamart'];

const generateMockData = () => {
    const data = [];
    
    // Inject specific Mascot triggers
    data.push({ id: 9998, name: "Nandini Full Cream Milk 1L", category: "Groceries", price: 60, originalPrice: 65, platform: "Zepto", eta: "10 MINS", type: "qc", imageUrl: productTemplates[1].img, fee: 35, rating: 4.5, reviews: 1200, brand: "Nandini", desc: "Fresh, unadulterated full cream milk sourced directly from local dairy farms." });
    data.push({ id: 9999, name: "Nandini Full Cream Milk 1L", category: "Groceries", price: 62, originalPrice: 65, platform: "Blinkit", eta: "14 MINS", type: "qc", imageUrl: productTemplates[1].img, fee: 0, rating: 4.7, reviews: 3400, brand: "Nandini", desc: "Fresh, unadulterated full cream milk sourced directly from local dairy farms." });

    for(let i = 1; i <= 1000; i++) {
        const t = productTemplates[i % productTemplates.length];
        let platform = platforms[Math.floor(Math.random() * platforms.length)];
        let isQC = ['Zepto', 'Blinkit', 'Swiggy Instamart'].includes(platform);
        
        // E-commerce logic constraints
        if (t.c === 'Fashion' && isQC) {
            platform = ['Amazon', 'Flipkart', 'Myntra'][Math.floor(Math.random() * 3)];
            isQC = false;
        }

        data.push({
            id: i,
            name: `${t.n} (Model-${Math.floor(Math.random()*9000)+1000})`,
            category: t.c,
            brand: t.b,
            price: t.p + Math.floor(Math.random()*(t.p*0.05)),
            originalPrice: t.p + Math.floor(t.p*0.15),
            platform: platform,
            eta: isQC ? `${Math.floor(Math.random() * 15) + 8} MINS` : `${Math.floor(Math.random() * 3) + 1} DAYS`,
            type: isQC ? 'qc' : 'ecom',
            imageUrl: t.img, 
            fee: isQC ? Math.floor(Math.random() * 40) + 10 : 0,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviews: Math.floor(Math.random() * 5000) + 10,
            desc: `High quality ${t.c.toLowerCase()} product manufactured by ${t.b}. Guaranteed authentic. Comes with standard manufacturer warranty and return policies. Sold by ${platform} Retail.`
        });
    }
    return data;
};
const ALL_PRODUCTS = generateMockData();

// EXTRACTED COMPONENTS TO PREVENT RE-MOUNTING ISSUES
const TopNav = ({ location, setView, search, setSearch, darkMode, setDarkMode, cartLength, setIsCartOpen }) => (
    <header className="bg-[#131921] text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Geo */}
            <div className="flex items-center gap-3 cursor-pointer hover:border border-transparent hover:border-white p-1 rounded transition" onClick={() => {setSearch(""); setView('home');}}>
                <CoffeeIcon className="w-10 h-10 text-[#fc8019]" />
                <div>
                    <h1 className="text-xl font-black tracking-tight leading-none text-[#fc8019]">BURNT COFFEE <span className="bg-white text-[#232f3e] text-[9px] px-1.5 py-0.5 rounded ml-1 font-black align-middle">OMNI</span></h1>
                    <div className="text-xs text-gray-300 mt-1 font-semibold flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> Deliver to: <span className="text-white font-bold">{location?.name}</span></div>
                </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 w-full md:max-w-4xl mx-4">
                <div className="flex w-full rounded-md overflow-hidden shadow-lg">
                    <select className="bg-gray-200 text-gray-700 px-3 py-3 border-r border-gray-300 text-sm font-medium outline-none hidden md:block cursor-pointer focus:bg-gray-300">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Groceries</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Search 1,000+ items across all platforms..." 
                        className="w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-[#fc8019] font-medium text-base border-none"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value); setView('home');}}
                    />
                    <button className="bg-[#febd69] hover:bg-[#f3a847] px-6 transition flex items-center justify-center">
                        <SearchIcon className="w-6 h-6 text-[#111]" />
                    </button>
                </div>
            </div>

            {/* Account & Cart */}
            <div className="flex items-center gap-6">
                <div className="hidden lg:block text-sm cursor-pointer hover:border border-transparent hover:border-white p-1 rounded transition">
                    <div className="text-xs font-normal text-gray-300">Hello, Urban Shopper</div>
                    <div className="font-bold">Accounts & Lists</div>
                </div>
                <button onClick={() => setIsCartOpen(true)} className="flex items-end gap-1 hover:border border-transparent hover:border-white p-1 rounded relative transition">
                    <div className="relative">
                        <CartIcon className="w-9 h-9" />
                        <span className="absolute -top-1 left-3 bg-[#fc8019] text-[#111] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                            {cartLength}
                        </span>
                    </div>
                    <span className="font-bold text-sm hidden md:inline mb-1">Cart</span>
                </button>
            </div>
        </div>
        {/* Sub-nav */}
        <div className="bg-[#232f3e] px-4 py-2 text-sm flex gap-4 overflow-x-auto hide-scroll text-gray-200 font-medium">
            <span className="font-bold text-white flex items-center gap-1 cursor-pointer">☰ All</span>
            {['Electronics', 'Groceries', 'Fashion', 'Beauty', 'Pharmacy'].map(c => (
                <span key={c} className="cursor-pointer hover:text-white transition" onClick={()=>{setSearch(c); setView('home');}}>{c}</span>
            ))}
        </div>
    </header>
);

const HeroBanner = () => (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 h-64 md:h-80 mb-6 flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Banner" />
        </div>
        <div className="relative z-10 px-4">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">The Omni-Cart Festival</h2>
            <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md">Shop 1,000+ products across Amazon, Flipkart, Zepto & Blinkit. Pay once. Save on surge fees.</p>
        </div>
    </div>
);

const ProductCard = ({ item, onSelect, onAdd }) => (
    <div onClick={() => onSelect(item)} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-200 border border-gray-200 flex flex-col relative group cursor-pointer p-4">
        <div className="h-44 w-full bg-white overflow-hidden relative mb-3 flex items-center justify-center p-2 rounded">
            <img src={item.imageUrl} alt={item.name} loading="lazy" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            <div className={`absolute top-0 left-0 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1 ${item.type==='qc'?'bg-orange-50 text-[#fc8019] border border-orange-200':'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                {item.type === 'qc' ? <LightningIcon className="w-3 h-3"/> : <TruckIcon className="w-3 h-3"/>}
                {item.eta}
            </div>
        </div>
        
        <div className="flex flex-col flex-1">
            <h3 className="font-medium text-[#007185] hover:text-[#c45500] text-sm leading-snug mb-1 line-clamp-2">{item.name}</h3>
            <div className="flex items-center gap-1 mb-2">
                <div className="flex text-yellow-500"><StarIcon className="w-3.5 h-3.5"/><StarIcon className="w-3.5 h-3.5"/><StarIcon className="w-3.5 h-3.5"/><StarIcon className="w-3.5 h-3.5"/></div>
                <span className="text-xs text-[#007185] hover:underline font-medium">{item.reviews.toLocaleString('en-IN')}</span>
            </div>

            <div className="mt-auto">
                <div className="flex items-baseline gap-1">
                    <span className="text-xs align-top font-medium">₹</span>
                    <span className="text-xl font-medium text-gray-900">{item.price.toLocaleString('en-IN')}</span>
                </div>
                {item.originalPrice > item.price && (
                    <div className="text-xs text-gray-500 mb-1 font-medium">M.R.P: <span className="line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span></div>
                )}
                
                <div className="mt-2 text-xs mb-3 font-medium text-gray-700">
                    {item.type === 'qc' ? (
                        <div>Get it in <span className="font-bold text-gray-900">{item.eta}</span> via <span className="font-bold text-[#007185]">{item.platform}</span></div>
                    ) : (
                        <div>Delivery <span className="font-bold text-gray-900">{item.eta}</span> via <span className="font-bold text-[#007185]">{item.platform}</span></div>
                    )}
                </div>
                
                <button onClick={(e) => { e.stopPropagation(); onAdd(item); }} className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 border border-[#fcd200] rounded-full font-medium transition shadow-sm text-sm">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);


function App() {
    const [view, setView] = useState('login'); // login, geo, home, product, confirmation
    const [location, setLocation] = useState(null);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [lastOrder, setLastOrder] = useState(null);
    
    const [rainPackaging, setRainPackaging] = useState(false);
    const [greenDelivery, setGreenDelivery] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Derived State
    const displayProducts = useMemo(() => {
        let res = ALL_PRODUCTS;
        if (search) res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
        if (location && location.tier !== 1) res = res.filter(p => p.type !== 'qc'); 
        return res.slice(0, 300); 
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

    // Math
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const platformsInCart = [...new Set(cart.map(i => i.platform))];
    let totalFees = 0;
    platformsInCart.forEach(p => {
        totalFees += Math.max(...cart.filter(i => i.platform === p).map(i => i.fee));
    });
    const addOns = rainPackaging ? 15 : 0;
    const total = subtotal + totalFees + addOns;

    // Mascot Optimizer
    const hasZeptoMilk = cart.some(i => i.id === 9998);
    const optimizeCart = () => {
        setCart([...cart.filter(i => i.id !== 9998), ALL_PRODUCTS.find(i => i.id === 9999)]);
    };

    const checkout = () => {
        if(cart.length === 0) return alert("Cart is empty");
        const orderId = `BCO-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const orderDetails = {
            id: orderId,
            items: [...cart],
            total: total,
            subtotal: subtotal,
            fees: totalFees,
            addOns: addOns,
            platforms: platformsInCart,
            date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            address: location?.name || "Default Address"
        };
        
        setLastOrder(orderDetails);
        setCart([]);
        setRainPackaging(false);
        setIsCartOpen(false);
        setView('confirmation');
    };

    // --- RENDERERS ---

    if (view === 'login') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 animate-fade-in">
                <div className="p-10 rounded-3xl shadow-2xl w-[400px] text-center bg-white transform transition-all hover:scale-105 border border-gray-100">
                    <CoffeeIcon className="w-24 h-24 mx-auto mb-6 text-[#fc8019]" />
                    <h1 className="text-3xl font-black text-[#fc8019] mb-2 tracking-tight">BURNT COFFEE</h1>
                    <p className="text-sm mb-8 font-semibold text-gray-500 uppercase tracking-widest">The Omni-Platform</p>
                    <form onSubmit={(e) => { e.preventDefault(); setView('geo'); }} className="flex flex-col gap-4">
                        <input type="text" required placeholder="Enter Mobile Number" className="border-2 p-4 rounded-xl font-bold text-center outline-none focus:border-[#fc8019] bg-white border-gray-200 text-lg transition-colors" />
                        <button type="submit" className="bg-[#fc8019] text-white font-black py-4 rounded-xl shadow-lg hover:bg-orange-600 transition hover:-translate-y-1">SECURE OTP LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }

    if (view === 'geo') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 animate-fade-in">
                <div className="p-10 rounded-3xl shadow-2xl w-[500px] text-center bg-white border border-gray-100">
                    <MapPinIcon className="w-24 h-24 mx-auto mb-6 text-[#fc8019] animate-bounce" />
                    <h2 className="text-3xl font-black mb-4">Establishing Geohash</h2>
                    <p className="text-sm mb-8 font-medium leading-relaxed text-gray-600">To dynamically route your Omni-Cart, we need to map your coordinates against active Q-Commerce dark store polygons.</p>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => { setLocation({ name: 'HSR Layout, Bengaluru', tier: 1 }); setView('home'); }} className="bg-green-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-700 transition hover:-translate-y-1">
                            SIMULATE TIER 1 CITY (Unlocks Quick-Commerce)
                        </button>
                        <button onClick={() => { setLocation({ name: 'Small Town, MP', tier: 3 }); setView('home'); }} className="bg-gray-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-gray-700 transition hover:-translate-y-1">
                            SIMULATE TIER 3 CITY (E-Commerce Only)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const CartOverlayComponent = () => (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-end backdrop-blur-sm transition-opacity animate-fade-in font-sans">
            <div className="w-full max-w-md bg-gray-50 h-full flex flex-col shadow-2xl animate-slide-in">
                <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm z-10">
                    <h2 className="text-xl font-bold text-[#232f3e] flex items-center gap-2"><CartIcon className="w-5 h-5"/> Omni-Cart Subtotal</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black text-3xl font-light transition">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                    {/* Mascot Optimizer Alert */}
                    {hasZeptoMilk && (
                        <div className="mb-4 bg-white border-l-4 border-[#fc8019] rounded-lg p-4 shadow-sm relative overflow-hidden transition-transform hover:scale-[1.02]">
                            <div className="flex gap-3 relative z-10 items-start">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0"><CoffeeIcon className="w-7 h-7 text-[#fc8019]" /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm mb-1">Burnie's Optimizer Alert</h4>
                                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">Zepto is surging due to rain! Let me move your Milk to <strong>Blinkit</strong> and save you <strong>₹35</strong>!</p>
                                    <button onClick={optimizeCart} className="bg-[#fc8019] text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 shadow-sm text-xs transition w-full">
                                        Optimize My Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
                            <CartIcon className="w-20 h-20 mb-4 opacity-30" />
                            <p className="font-medium text-lg text-gray-500">Your cart is empty.</p>
                            <button onClick={() => setIsCartOpen(false)} className="mt-4 text-[#007185] text-sm hover:underline font-bold">Continue Shopping</button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {cart.map((item, index) => (
                                <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex gap-4 relative group">
                                    <button onClick={() => removeFromCart(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 transition">&times;</button>
                                    <div className="w-20 h-20 bg-white flex items-center justify-center shrink-0 border border-gray-100 rounded-md overflow-hidden p-1">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 pr-4">
                                        <h4 className="font-medium text-sm text-gray-900 leading-tight mb-1 line-clamp-2">{item.name}</h4>
                                        <div className="text-[11px] font-semibold text-gray-500 mb-2">Fulfillment: <span className="text-[#007185]">{item.platform}</span></div>
                                        <div className="flex justify-between items-end">
                                            <span className="font-bold text-[#B12704] text-sm mb-1">₹{item.price.toLocaleString('en-IN')}</span>
                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${item.type === 'qc' ? 'bg-orange-100 text-[#fc8019]' : 'bg-blue-100 text-blue-700'}`}>
                                                {item.type === 'qc' ? <LightningIcon className="w-3 h-3"/> : <TruckIcon className="w-3 h-3"/>}
                                                {item.eta}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Delivery Add-ons */}
                            <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-bold text-sm mb-3 text-gray-800">Add-ons</h3>
                                <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                    <input type="checkbox" checked={rainPackaging} onChange={()=>setRainPackaging(!rainPackaging)} className="w-5 h-5 rounded text-[#007185] focus:ring-[#007185]" />
                                    <div className="flex-1 text-sm text-gray-700 font-medium">Rain-proof Packaging ☔</div>
                                    <div className="text-sm font-bold text-gray-600">₹15</div>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={greenDelivery} onChange={()=>setGreenDelivery(!greenDelivery)} className="w-5 h-5 rounded text-[#007185] focus:ring-[#007185]" />
                                    <div className="flex-1 text-sm text-gray-700 font-medium">Green Delivery 🌱</div>
                                    <div className="text-sm font-bold text-green-600">FREE</div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bill Details */}
                {cart.length > 0 && (
                    <div className="bg-white p-6 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] border-t z-20">
                        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                            <span>Items ({cart.length}):</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                            <span>Add-ons:</span>
                            <span>₹{addOns.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-700 mb-4">
                            <span>Combined Platform & Surge Fees</span>
                            <span className="text-red-500">+₹{totalFees.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="border-t-2 border-dashed border-gray-200 my-4"></div>
                        <div className="flex justify-between font-black text-2xl mb-6 text-[#B12704]">
                            <span>Order Total:</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        <button onClick={checkout} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-normal py-3.5 rounded-full shadow-sm border border-[#fcd200] text-sm flex items-center justify-center gap-2 transition hover:shadow-md">
                            <ShieldIcon className="w-5 h-5" /> Proceed to Checkout (Escrow)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    if (view === 'confirmation' && lastOrder) {
        return (
            <div className="min-h-screen pb-20 bg-[#eaeded] font-sans">
                <TopNav location={location} search={search} setSearch={setSearch} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} cartLength={cart.length} setIsCartOpen={setIsCartOpen} />
                <main className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
                    
                    {/* Success Banner */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-green-200 border-t-8 border-t-green-600 mb-6">
                        <div className="flex items-center gap-5 mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                                <CheckCircleIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order placed, thank you!</h1>
                                <p className="text-sm text-gray-600 mt-1 font-medium">Confirmation and distributed tracking links have been sent to your registered mobile number.</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-5 rounded-lg border border-gray-200">
                            <div className="mb-2 md:mb-0">
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Omni-Order Number</div>
                                <div className="text-sm font-bold text-[#007185] hover:underline cursor-pointer">{lastOrder.id}</div>
                            </div>
                            <div className="mb-2 md:mb-0">
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Amount</div>
                                <div className="text-sm font-bold text-gray-900">₹{lastOrder.total.toLocaleString('en-IN')} <span className="text-xs font-medium text-gray-500 ml-1">(Escrow Secured)</span></div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Order Date</div>
                                <div className="text-sm font-bold text-gray-900">{lastOrder.date}</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Distributed Logistics Breakdown */}
                        <div className="md:col-span-2 space-y-6">
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Distributed Logistics</h2>
                            
                            {lastOrder.platforms.map(platform => {
                                const platformItems = lastOrder.items.filter(i => i.platform === platform);
                                const isQC = ['Zepto', 'Blinkit', 'Swiggy Instamart'].includes(platform);
                                const maxEta = platformItems[0]?.eta;
                                
                                return (
                                    <div key={platform} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transform transition hover:shadow-md">
                                        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">Fulfillment by {platform}</h3>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">Status: <span className="text-green-600 font-bold">Dispatched to Partner API</span></p>
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm border ${isQC ? 'bg-orange-100 text-[#fc8019] border-orange-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                                                {isQC ? <LightningIcon className="w-3.5 h-3.5"/> : <TruckIcon className="w-3.5 h-3.5"/>}
                                                ETA: {maxEta}
                                            </span>
                                        </div>
                                        <div className="p-6 space-y-5">
                                            {platformItems.map((item, idx) => (
                                                <div key={idx} className="flex gap-5 items-start">
                                                    <div className="w-24 h-24 bg-white border border-gray-100 rounded-lg p-2 shrink-0 overflow-hidden shadow-sm">
                                                        <img src={item.imageUrl} className="w-full h-full object-contain" alt={item.name} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm text-[#007185] line-clamp-2 hover:underline cursor-pointer mb-1">{item.name}</div>
                                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Qty: 1</div>
                                                        <div className="flex gap-3 items-center">
                                                            <div className="text-[#B12704] font-bold text-base">₹{item.price.toLocaleString('en-IN')}</div>
                                                            {item.fee > 0 && <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100">+ ₹{item.fee} Surge</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Address & Payment Summary */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-[#eaeded] mb-2 select-none hidden md:block">.</h2> 
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-4 border-b pb-3 text-lg">Delivery Address</h3>
                                <p className="text-sm text-gray-900 font-bold mb-1">Default User Address</p>
                                <p className="text-sm text-gray-600 font-medium">{lastOrder.address}</p>
                                <p className="text-sm text-gray-600 font-medium">India, 560102</p>
                                <p className="text-sm text-gray-600 mt-3 font-medium pt-3 border-t border-gray-100">Phone: <span className="text-gray-900">+91 9999999999</span></p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-4 border-b pb-3 text-lg">Payment Summary</h3>
                                <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                                    <span>Item Subtotal:</span>
                                    <span>₹{lastOrder.subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                                    <span>Platform/Surge Fees:</span>
                                    <span>₹{lastOrder.fees.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-4 font-medium">
                                    <span>Delivery Add-ons:</span>
                                    <span>₹{lastOrder.addOns.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between font-black text-xl text-[#B12704] border-t pt-4">
                                    <span>Order Total:</span>
                                    <span>₹{lastOrder.total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            
                            <button onClick={() => setView('home')} className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-3.5 rounded-full shadow-sm border border-gray-300 text-sm transition mt-4">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (view === 'product' && selectedProduct) {
        return (
            <div className="min-h-screen pb-20 font-sans bg-white animate-fade-in">
                <TopNav location={location} search={search} setSearch={setSearch} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} cartLength={cart.length} setIsCartOpen={setIsCartOpen} />
                
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <div className="text-sm text-gray-500 mb-6 font-medium flex items-center gap-2">
                        <span className="cursor-pointer hover:underline" onClick={()=>setView('home')}>Home</span> <span className="mx-2">&rsaquo;</span> 
                        <span className="cursor-pointer hover:underline" onClick={()=>{setSearch(selectedProduct.category); setView('home');}}>{selectedProduct.category}</span> <span className="mx-2">&rsaquo;</span> 
                        <span className="text-gray-900 font-bold">{selectedProduct.name}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="w-full lg:w-2/5 flex flex-col gap-4">
                            <div className="border border-gray-200 rounded-xl p-6 flex items-center justify-center h-[500px] relative bg-white shadow-sm">
                                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-md text-xs font-black shadow-sm flex items-center gap-1.5 border ${selectedProduct.type === 'qc' ? 'bg-orange-50 text-[#fc8019] border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                    {selectedProduct.type === 'qc' ? <LightningIcon className="w-4 h-4"/> : <TruckIcon className="w-4 h-4"/>} 
                                    {selectedProduct.eta}
                                </div>
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="max-w-full max-h-full object-contain" />
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5">
                            <h1 className="text-3xl font-medium text-gray-900 leading-tight mb-2">{selectedProduct.name}</h1>
                            <a href="#" className="text-sm text-[#007185] hover:text-[#c45500] hover:underline mb-3 block font-medium">Visit the {selectedProduct.brand} Store</a>
                            
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-4">
                                <div className="flex text-yellow-500"><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/></div>
                                <span className="text-[#007185] text-sm hover:underline cursor-pointer font-medium">{selectedProduct.reviews.toLocaleString()} ratings</span>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[#cc0c39] text-3xl font-light">-{Math.round((1 - selectedProduct.price/selectedProduct.originalPrice)*100)}%</span>
                                    <span className="text-4xl font-medium text-gray-900"><span className="text-xl align-top">₹</span>{selectedProduct.price.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 font-medium">M.R.P.: <span className="line-through">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span></div>
                                <div className="text-sm font-bold mt-2 text-gray-800">Inclusive of all taxes</div>
                            </div>

                            <div className="border-t border-gray-200 pt-5 mt-5 text-sm text-gray-800 leading-relaxed font-medium">
                                <h3 className="font-bold mb-3 text-base">About this item</h3>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>{selectedProduct.desc}</li>
                                    <li>100% Authentic product sourced directly from verified sellers.</li>
                                    <li>Distributed fulfillment optimized by Burnt Coffee AI.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/5">
                            <div className="border border-gray-200 rounded-xl p-5 shadow-md bg-white sticky top-24">
                                <div className="text-3xl font-medium text-gray-900 mb-4">₹{selectedProduct.price.toLocaleString('en-IN')}</div>
                                
                                <div className="text-sm text-[#007185] hover:underline mb-4 cursor-pointer flex items-start gap-2 font-medium leading-snug">
                                    <MapPinIcon className="w-5 h-5 text-gray-800 shrink-0"/> Deliver to {location?.name} - 560102
                                </div>
                                
                                <div className="text-lg text-green-700 font-medium mb-4">In stock</div>
                                
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium"><span>Ships from</span> <span className="text-gray-900">{selectedProduct.platform}</span></div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium"><span>Sold by</span> <span className="text-[#007185] hover:underline cursor-pointer">{selectedProduct.platform} Retail</span></div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-2 border-t pt-2 border-dashed">
                                        <span>Delivery Fees</span> 
                                        <span className={selectedProduct.fee > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                                            {selectedProduct.fee > 0 ? `+ ₹${selectedProduct.fee} Surge` : 'FREE'}
                                        </span>
                                    </div>
                                </div>

                                <button onClick={() => addToCart(selectedProduct)} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-normal py-3 rounded-full mb-3 shadow-sm border border-[#fcd200] transition text-sm">
                                    Add to Omni-Cart
                                </button>
                                <button onClick={() => {addToCart(selectedProduct); setIsCartOpen(true);}} className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-gray-900 font-normal py-3 rounded-full shadow-sm border border-[#ff8f00] transition text-sm">
                                    Buy Now
                                </button>
                                <div className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5 font-medium uppercase tracking-wide"><ShieldIcon className="w-4 h-4"/> Secure Escrow</div>
                            </div>
                        </div>
                    </div>
                </div>
                {isCartOpen && <CartOverlayComponent />}
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-[#eaeded] font-sans animate-fade-in">
            <TopNav location={location} search={search} setSearch={setSearch} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} cartLength={cart.length} setIsCartOpen={setIsCartOpen} />
            {!search && <HeroBanner />}
            
            <main className="container mx-auto px-4 max-w-7xl">
                <div className="bg-white p-4 mb-4 flex justify-between items-center shadow-sm border border-gray-200 rounded-md">
                    <span className="font-bold text-gray-900">{search ? `Results for "${search}"` : "Recommended for you"}</span>
                    <span className="text-sm text-gray-500 font-medium">Showing {displayProducts.length} of {ALL_PRODUCTS.length} SKUs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {!search && location?.tier === 1 && (
                        <ProductCard item={ALL_PRODUCTS.find(i=>i.id===9998)} onSelect={()=>{setSelectedProduct(ALL_PRODUCTS.find(i=>i.id===9998)); setView('product');}} onAdd={addToCart} />
                    )}
                    {displayProducts.filter(i=>i.id!==9998).map(item => (
                        <ProductCard key={item.id} item={item} onSelect={()=>{setSelectedProduct(item); setView('product');}} onAdd={addToCart} />
                    ))}
                </div>
            </main>

            {isCartOpen && <CartOverlayComponent />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
