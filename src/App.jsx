import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Search from './components/Search';
import Pagination from './components/Pagination';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';

const sampleProducts = [
  {
    id: 1,
    name: 'Gaming Laptop Pro',
    price: '$1299',
    originalPrice: '$1499',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'electronics',
    vendor: 'Noon Tech',
    delivery: '24h express',
    rating: 4.8,
    reviews: 124,
    offer: 'Best Seller',
    inStock: true,
    description: 'High-performance gaming laptop with RTX 4070 graphics.'
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    price: '$29',
    originalPrice: '$39',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    category: 'clothes',
    vendor: 'Fashion Hub',
    delivery: '48h delivery',
    rating: 4.6,
    reviews: 89,
    offer: 'Hot Deal',
    inStock: true,
    description: 'Comfortable organic cotton t-shirt with modern fit.'
  },
  {
    id: 3,
    name: 'iPhone 15 Pro Max',
    price: '$1199',
    originalPrice: '$1299',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: 'electronics',
    vendor: 'Apple Store',
    delivery: '24h express',
    rating: 4.9,
    reviews: 256,
    offer: 'Free Shipping',
    inStock: true,
    description: 'Latest iPhone with titanium finish and A17 Pro chip.'
  },
  {
    id: 4,
    name: 'Designer Denim Jeans',
    price: '$79',
    originalPrice: '$99',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
    category: 'clothes',
    vendor: 'Style Closet',
    delivery: '48h delivery',
    rating: 4.4,
    reviews: 67,
    offer: 'New Arrival',
    inStock: true,
    description: 'Premium denim jeans with perfect fit and durability.'
  },
  {
    id: 5,
    name: 'Wireless Noise-Cancelling Headphones',
    price: '$199',
    originalPrice: '$249',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'electronics',
    vendor: 'Audio Zone',
    delivery: '24h express',
    rating: 4.7,
    reviews: 178,
    offer: 'Best Price',
    inStock: true,
    description: 'Premium wireless headphones with active noise cancellation.'
  },
  {
    id: 6,
    name: 'Performance Running Sneakers',
    price: '$129',
    originalPrice: '$159',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    category: 'clothes',
    vendor: 'Sportify',
    delivery: '48h delivery',
    rating: 4.5,
    reviews: 92,
    offer: 'Limited Stock',
    inStock: true,
    description: 'Lightweight running shoes with advanced cushioning.'
  },
  {
    id: 7,
    name: 'Smart Fitness Watch',
    price: '$299',
    originalPrice: '$349',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'electronics',
    vendor: 'Fit Gear',
    delivery: '24h express',
    rating: 4.6,
    reviews: 145,
    offer: 'Trending',
    inStock: true,
    description: 'Advanced fitness tracker with health monitoring.'
  },
  {
    id: 8,
    name: 'Leather Biker Jacket',
    price: '$189',
    originalPrice: '$229',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    category: 'clothes',
    vendor: 'Urban Wear',
    delivery: '48h delivery',
    rating: 4.8,
    reviews: 73,
    offer: 'Most Loved',
    inStock: false,
    description: 'Genuine leather jacket with vintage styling.'
  },
  {
    id: 9,
    name: 'Premium Wireless Earbuds',
    price: '$79',
    originalPrice: '$99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'accessories',
    vendor: 'Audio Pro',
    delivery: '24h express',
    rating: 4.7,
    reviews: 156,
    offer: 'Best Seller',
    inStock: true,
    description: 'High-quality wireless earbuds with noise cancellation.'
  },
  {
    id: 10,
    name: 'Leather Crossbody Bag',
    price: '$59',
    originalPrice: '$79',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
    category: 'accessories',
    vendor: 'Fashion Hub',
    delivery: '48h delivery',
    rating: 4.6,
    reviews: 98,
    offer: 'New Arrival',
    inStock: true,
    description: 'Elegant leather crossbody bag perfect for daily use.'
  },
  {
    id: 11,
    name: 'UV Protection Sunglasses',
    price: '$45',
    originalPrice: '$65',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    category: 'accessories',
    vendor: 'Style Closet',
    delivery: '24h express',
    rating: 4.5,
    reviews: 67,
    offer: 'Hot Deal',
    inStock: true,
    description: 'Premium UV protection sunglasses with modern design.'
  },
  {
    id: 12,
    name: 'Smart Home LED Bulbs',
    price: '$39',
    originalPrice: '$49',
    image: 'https://images.unsplash.com/photo-1565636192335-14c2b928cb9d?w=400&h=300&fit=crop',
    category: 'home',
    vendor: 'Smart Living',
    delivery: '48h delivery',
    rating: 4.8,
    reviews: 234,
    offer: 'Trending',
    inStock: true,
    description: 'WiFi-enabled smart LED bulbs with color control.'
  },
  {
    id: 13,
    name: 'Premium Memory Foam Pillow',
    price: '$49',
    originalPrice: '$69',
    image: 'https://images.unsplash.com/photo-1584622614875-e51df1bdc82f?w=400&h=300&fit=crop',
    category: 'home',
    vendor: 'Comfort Zone',
    delivery: '48h delivery',
    rating: 4.7,
    reviews: 312,
    offer: 'Best Price',
    inStock: true,
    description: 'Ergonomic memory foam pillow for better sleep.'
  },
  {
    id: 14,
    name: 'Portable Kitchen Blender',
    price: '$34',
    originalPrice: '$49',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c4722be?w=400&h=300&fit=crop',
    category: 'home',
    vendor: 'Kitchen Pro',
    delivery: '24h express',
    rating: 4.6,
    reviews: 189,
    offer: 'Limited Stock',
    inStock: true,
    description: 'Compact and powerful kitchen blender for smoothies.'
  },
  {
    id: 15,
    name: 'Organic Moisturizing Cream',
    price: '$24',
    originalPrice: '$34',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    category: 'beauty',
    vendor: 'Beauty Care',
    delivery: '24h express',
    rating: 4.8,
    reviews: 423,
    offer: 'Best Seller',
    inStock: true,
    description: 'Natural organic moisturizing cream for all skin types.'
  },
  {
    id: 16,
    name: 'Professional Hair Dryer',
    price: '$59',
    originalPrice: '$79',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    category: 'beauty',
    vendor: 'Hair Style',
    delivery: '48h delivery',
    rating: 4.7,
    reviews: 178,
    offer: 'Hot Deal',
    inStock: true,
    description: 'Professional-grade hair dryer with ionic technology.'
  },
  {
    id: 17,
    name: 'Luxury Face Serum',
    price: '$49',
    originalPrice: '$69',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop',
    category: 'beauty',
    vendor: 'Beauty Labs',
    delivery: '24h express',
    rating: 4.9,
    reviews: 567,
    offer: 'Premium',
    inStock: true,
    description: 'Premium anti-aging face serum with natural ingredients.'
  }
];

const categories = [
  { key: 'all', label: { en: 'All', ar: 'الكل' } },
  { key: 'electronics', label: { en: 'Electronics', ar: 'إلكترونيات' } },
  { key: 'clothes', label: { en: 'Clothes', ar: 'ملابس' } },
  { key: 'accessories', label: { en: 'Accessories', ar: 'إكسسوارات' } },
  { key: 'home', label: { en: 'Home', ar: 'المنزل' } },
  { key: 'beauty', label: { en: 'Beauty', ar: 'جمال' } }
];

const sortOptions = [
  { key: 'recommended', label: { en: 'Recommended', ar: 'الموصى به' } },
  { key: 'price-low', label: { en: 'Price: Low to High', ar: 'السعر: الأقل إلى الأعلى' } },
  { key: 'price-high', label: { en: 'Price: High to Low', ar: 'السعر: الأعلى إلى الأقل' } },
  { key: 'rating', label: { en: 'Top Rated', ar: 'الأعلى تقييماً' } }
];

const featureCards = [
  {
    id: 1,
    title: { en: 'Fast Delivery', ar: 'توصيل سريع' },
    description: { en: 'Delivered in under 24 hours with trusted couriers.', ar: 'توصيل خلال 24 ساعة مع شركاء موثوقين.' },
    image: 'https://images.unsplash.com/photo-1516233004941-0f31f1dce0e4?w=800&h=500&fit=crop'
  },
  {
    id: 2,
    title: { en: 'Daily Deals', ar: 'عروض يومية' },
    description: { en: 'Fresh offers selected for you every day.', ar: 'عروض جديدة مختارة لك كل يوم.' },
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=500&fit=crop'
  },
  {
    id: 3,
    title: { en: 'Trusted Brands', ar: 'أشهر العلامات' },
    description: { en: 'Premium products from reliable international brands.', ar: 'منتجات عالية الجودة من علامات تجارية موثوقة.' },
    image: 'https://images.unsplash.com/photo-1542838689-5c2af0ee56cd?w=800&h=500&fit=crop'
  },
  {
    id: 4,
    title: { en: 'Secure Payments', ar: 'دفع آمن' },
    description: { en: 'Choose your favorite bank and complete checkout safely.', ar: 'اختر البنك المفضل وأكمل الدفع بأمان.' },
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&h=500&fit=crop'
  }
];

// New data for enhanced home page
const heroSlides = [
  {
    id: 1,
    title: { en: 'Welcome to Market Store', ar: 'مرحباً بك في ماركت ستور' },
    subtitle: { en: 'Discover amazing deals on premium products', ar: 'اكتشف عروض مذهلة على منتجات عالية الجودة' },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    cta: { en: 'Shop Now', ar: 'تسوق الآن' }
  },
  {
    id: 2,
    title: { en: 'Flash Sale - 50% Off', ar: 'عرض سريع - خصم 50%' },
    subtitle: { en: 'Limited time offer on electronics', ar: 'عرض محدود الوقت على الإلكترونيات' },
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
    cta: { en: 'Grab Deal', ar: 'احصل على العرض' }
  },
  {
    id: 3,
    title: { en: 'New Arrivals', ar: 'الوافدون الجدد' },
    subtitle: { en: 'Latest fashion and beauty products', ar: 'أحدث منتجات الموضة والجمال' },
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop',
    cta: { en: 'Explore', ar: 'استكشف' }
  }
];

const quickCategories = [
  {
    id: 'electronics',
    name: { en: 'Electronics', ar: 'إلكترونيات' },
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
    count: 5
  },
  {
    id: 'clothes',
    name: { en: 'Fashion', ar: 'موضة' },
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop',
    count: 4
  },
  {
    id: 'home',
    name: { en: 'Home & Garden', ar: 'المنزل والحديقة' },
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    count: 3
  },
  {
    id: 'beauty',
    name: { en: 'Beauty', ar: 'جمال' },
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    count: 3
  },
  {
    id: 'accessories',
    name: { en: 'Accessories', ar: 'إكسسوارات' },
    icon: '👜',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop',
    count: 3
  }
];

const testimonials = [
  {
    id: 1,
    name: { en: 'Ahmed Hassan', ar: 'أحمد حسن' },
    rating: 5,
    comment: { en: 'Amazing service and fast delivery! Highly recommended.', ar: 'خدمة مذهلة وتوصيل سريع! أوصي بها بشدة.' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: { en: 'Sara Mohamed', ar: 'سارة محمد' },
    rating: 5,
    comment: { en: 'Great quality products at affordable prices.', ar: 'منتجات عالية الجودة بأسعار مناسبة.' },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: { en: 'Mohamed Ali', ar: 'محمد علي' },
    rating: 4,
    comment: { en: 'Excellent customer support and easy returns.', ar: 'دعم عملاء ممتاز وإرجاع سهل.' },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
];

const stats = [
  { label: { en: 'Happy Customers', ar: 'عملاء سعداء' }, value: '50K+', icon: '😊' },
  { label: { en: 'Products', ar: 'منتجات' }, value: '10K+', icon: '📦' },
  { label: { en: 'Cities Covered', ar: 'مدن مغطاة' }, value: '25+', icon: '🏙️' },
  { label: { en: 'Years Experience', ar: 'سنوات الخبرة' }, value: '5+', icon: '⭐' }
];

const translations = {
  en: {
    searchPlaceholder: 'Search products, brands or deals...',
    searchButton: 'Search',
    login: 'Login',
    logout: 'Logout',
    accountLists: 'Account & Lists',
    orders: 'Orders',
    cart: 'Cart',
    deliveringTo: 'Delivering to',
    all: 'All',
    freeDelivery: 'FREE delivery on first order',
    heroTitle: 'Shop the best deals with Market Store',
    heroSubtitle: 'Fast delivery, daily offers, and everything you need in one place.',
    paymentHeading: 'Choose Payment Method',
    paymentDescription: 'Select the option that suits you best.',
    visaTitle: 'Pay with Visa / Mastercard',
    instapayTitle: 'InstaPay Mobile Wallet',
    bankTitle: 'Bank Transfer',
    payNow: 'Pay Now',
    close: 'Close',
    cardHolder: 'Card Holder Name',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    selectBank: 'Select Bank',
    bankPlaceholder: 'Choose a bank',
    paymentSuccess: 'Payment details saved successfully!'
  },
  ar: {
    searchPlaceholder: 'ابحث عن منتج، علامة تجارية أو عرض...',
    searchButton: 'بحث',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    accountLists: 'الحساب والقوائم',
    orders: 'الطلبات',
    cart: 'السلة',
    deliveringTo: 'التوصيل إلى',
    all: 'الكل',
    freeDelivery: 'توصيل مجاني على الطلب الأول',
    heroTitle: 'تسوّق أفضل العروض من ماركت ستور',
    heroSubtitle: 'توصيل سريع، عروض يومية، وكل ما تحتاجه في مكان واحد.',
    paymentHeading: 'اختر طريقة الدفع',
    paymentDescription: 'اختر الطريقة الأنسب لك.',
    visaTitle: 'الدفع بواسطة فيزا / ماستركارد',
    instapayTitle: 'إنستا باي',
    bankTitle: 'تحويل بنكي',
    payNow: 'ادفع الآن',
    close: 'إغلاق',
    cardHolder: 'اسم صاحب البطاقة',
    cardNumber: 'رقم البطاقة',
    expiryDate: 'تاريخ الانتهاء',
    cvv: 'الرمز',
    selectBank: 'اختر البنك',
    bankPlaceholder: 'اختر بنكاً',
    paymentSuccess: 'تم حفظ بيانات الدفع بنجاح!'
  }
};

function App() {
  const [products] = useState(sampleProducts);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('recommended');
  const [lang, setLang] = useState('en');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bank: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [appRating, setAppRating] = useState(() => parseFloat(localStorage.getItem('appRating')) || 0);
  const [appRatingCount, setAppRatingCount] = useState(() => parseInt(localStorage.getItem('appRatingCount')) || 0);
  const [userAppRated, setUserAppRated] = useState(() => localStorage.getItem('userAppRated') === 'true');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activePage, setActivePage] = useState('home'); // 'home', 'cart', 'orders', 'product-details'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
    } else {
      setIsLoginOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('appRating', appRating.toString());
    localStorage.setItem('appRatingCount', appRatingCount.toString());
  }, [appRating, appRatingCount]);

  useEffect(() => {
    localStorage.setItem('userAppRated', userAppRated ? 'true' : 'false');
  }, [userAppRated]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

  // Hero slider auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = (key) => translations[lang][key] || key;
  const textDirection = lang === 'ar' ? 'rtl' : 'ltr';

  const handleSearchSubmit = () => {
    setCurrentPage(1);
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const handlePaymentOption = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(true);
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentSubmit = () => {
    if (cart.length === 0) {
      alert(lang === 'ar' ? 'السلة فارغة' : 'Cart is empty');
      return;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US'),
      items: cart,
      total: cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2),
      status: lang === 'ar' ? 'تم التسليم' : 'Delivered',
      paymentMethod: paymentMethod === 'visa' ? paymentForm.bank : paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setShowPaymentModal(false);
    setPaymentMethod(null);
    setPaymentForm({ cardHolder: '', cardNumber: '', expiryDate: '', cvv: '', bank: '' });
    alert(lang === 'ar' ? 'تم الطلب بنجاح ✅' : 'Order placed successfully ✅');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === 'price-low') return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      if (sortOption === 'price-high') return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
      if (sortOption === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [filteredProducts, sortOption]);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
  const displayedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const groupedProducts = categories
    .filter(category => category.key !== 'all')
    .map(category => ({
      ...category,
      products: sortedProducts.filter(product => product.category === category.key)
    }));

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart(prev => prev
      .map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsLoginOpen(true);
    setCart([]);
  };

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleAppRating = (ratingValue) => {
    if (userAppRated) {
      alert(lang === 'ar' ? 'لقد قمت بالتقييم بالفعل' : 'You have already rated the app.');
      return;
    }

    const newCount = appRatingCount + 1;
    const newAverage = ((appRating * appRatingCount) + ratingValue) / newCount;

    setAppRating(newAverage);
    setAppRatingCount(newCount);
    setUserAppRated(true);

    alert(lang === 'ar' ? 'شكراً لتقييمك! ⭐' : 'Thanks for rating! ⭐');
  };

  const handleLoginButton = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setIsLoginOpen(true);
    }
  };

  const openCategoryPage = (categoryId) => {
    setSelectedCategory(categoryId);
    setActivePage('category');
  };

  const openHeroPage = () => {
    setSelectedCategory('all');
    setActivePage('category');
  };

  const navigateToCart = () => {
    setActivePage('cart');
  };

  const navigateToHome = () => {
    setActivePage('home');
  };

  const navigateToOrders = () => {
    setActivePage('orders');
  };

  const navigateToProductDetails = (productId) => {
    setSelectedProductId(productId);
    setActivePage('product-details');
  };

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToHeroSlide = (index) => {
    setCurrentHeroSlide(index);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="login-hero">
          <h1>Welcome to the Market Store</h1>
          <p>Login now to discover the best deals and featured products.</p>
        </div>
        <Login
          isOpen={isLoginOpen}
          onClose={() => {}}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <div className="App" dir={textDirection}>
      <Navbar
        cartCount={cartCount}
        onLoginClick={handleLoginButton}
        isLoggedIn={isLoggedIn}
        onCartClick={navigateToCart}
        onOrdersClick={navigateToOrders}
        currentPage={activePage}
        lang={lang}
        setLang={handleLanguageChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        translations={translations[lang]}
      />

      <div className="hero-section">
        <h1>Shop the best deals with Market Store</h1>
        <p>Fast delivery, daily offers, and everything you need in one place.</p>
      </div>

      {activePage === 'home' ? (
        <>
          {/* Hero Section with Slider */}
          <section className="hero-slider">
            <div className="hero-slide" style={{ backgroundImage: `url(${heroSlides[currentHeroSlide].image})` }}>
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title">{heroSlides[currentHeroSlide].title[lang]}</h1>
                <p className="hero-subtitle">{heroSlides[currentHeroSlide].subtitle[lang]}</p>
                <button className="hero-cta" onClick={openHeroPage}>
                  {heroSlides[currentHeroSlide].cta[lang]}
                </button>
              </div>
              <div className="hero-navigation">
                <button className="hero-nav-btn" onClick={prevHeroSlide}>‹</button>
                <button className="hero-nav-btn" onClick={nextHeroSlide}>›</button>
              </div>
              <div className="hero-indicators">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`hero-indicator ${index === currentHeroSlide ? 'active' : ''}`}
                    onClick={() => goToHeroSlide(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Quick Categories */}
          <section className="quick-categories">
            <div className="section-header">
              <h2>{lang === 'ar' ? 'تسوق حسب الفئة' : 'Shop by Category'}</h2>
              <p>{lang === 'ar' ? 'اكتشف مجموعتنا المتنوعة من المنتجات' : 'Discover our diverse range of products'}</p>
            </div>
            <div className="categories-grid">
              {quickCategories.map(category => (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => openCategoryPage(category.id)}
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="category-overlay"></div>
                  <div className="category-content">
                    <span className="category-icon">{category.icon}</span>
                    <h3>{category.name[lang]}</h3>
                    <span className="category-count">{category.count} {lang === 'ar' ? 'منتج' : 'items'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <span className="stat-icon">{stat.icon}</span>
                  <div className="stat-content">
                    <h3>{stat.value}</h3>
                    <p>{stat.label[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="featured-products">
            <div className="section-header">
              <h2>{lang === 'ar' ? 'المنتجات المميزة' : 'Featured Products'}</h2>
              <p>{lang === 'ar' ? 'أفضل المنتجات المختارة لك' : 'Handpicked best products for you'}</p>
            </div>
            <div className="featured-grid">
              {products.filter(p => p.offer === 'Best Seller' || p.offer === 'Trending').slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={navigateToProductDetails} />
              ))}
            </div>
          </section>

          {/* Special Offers */}
          <section className="special-offers">
            <div className="section-header">
              <h2>{lang === 'ar' ? 'عروض خاصة' : 'Special Offers'}</h2>
              <p>{lang === 'ar' ? 'عروض محدودة الوقت' : 'Limited time offers'}</p>
            </div>
            <div className="offers-grid">
              {products.filter(p => p.originalPrice).slice(0, 4).map(product => (
                <div key={product.id} className="offer-card">
                  <div className="offer-badge">
                    -{Math.round(((parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))) /
                      parseFloat(product.originalPrice.replace('$', ''))) * 100)}%
                  </div>
                  <img src={product.image} alt={product.name} />
                  <div className="offer-content">
                    <h4>{product.name}</h4>
                    <div className="offer-prices">
                      <span className="original-price">{product.originalPrice}</span>
                      <span className="current-price">{product.price}</span>
                    </div>
                    <button onClick={() => addToCart(product)}>
                      {lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="testimonials">
            <div className="section-header">
              <h2>{lang === 'ar' ? 'آراء العملاء' : 'Customer Reviews'}</h2>
              <p>{lang === 'ar' ? 'ما يقوله عملاؤنا عنا' : 'What our customers say about us'}</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={testimonial.avatar} alt={testimonial.name[lang]} />
                    <div>
                      <h4>{testimonial.name[lang]}</h4>
                      <div className="rating">
                        {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p>{testimonial.comment[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          {/* App Rating */}
          <section className="app-rating">
            <div className="section-header">
              <h2>{lang === 'ar' ? 'قيّم التطبيق' : 'Rate the App'}</h2>
              <p>{lang === 'ar' ? 'ساعدنا نطور التطبيق من خلال تقييمك.' : 'Help us improve the app by rating it.'}</p>
            </div>
            <div className="rating-card">
              <div className="rating-summary">
                <div className="rating-average">{appRatingCount ? appRating.toFixed(1) : '0.0'}</div>
                <div className="rating-count">
                  {appRatingCount} {lang === 'ar' ? 'تقييم' : 'ratings'}
                </div>
              </div>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`rating-star ${star <= Math.round(appRating) ? 'active' : ''}`}
                    onClick={() => handleAppRating(star)}
                    aria-label={`${star} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="rating-note">
                {userAppRated
                  ? (lang === 'ar' ? 'شكراً لك! تم حفظ تقييمك.' : 'Thank you! Your rating has been saved.')
                  : (lang === 'ar' ? 'اضغط على النجوم لتقييم التطبيق.' : 'Tap the stars to rate the app.')}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="newsletter">
            <div className="newsletter-content">
              <h2>{lang === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}</h2>
              <p>{lang === 'ar' ? 'احصل على أحدث العروض والمنتجات الجديدة' : 'Get latest offers and new products'}</p>
              <div className="newsletter-form">
                <input type="email" placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
                <button>{lang === 'ar' ? 'اشترك' : 'Subscribe'}</button>
              </div>
            </div>
          </section>

          {/* Original sections moved to bottom */}
          <section className="top-features">
            {featureCards.map((card) => (
              <div key={card.id} className="feature-card" style={{ backgroundImage: `url(${card.image})` }}>
                <div className="feature-overlay" />
                <div className="feature-card-content">
                  {card.id === 4 && (
                    <span className="feature-tag">{translations[lang].freeDelivery}</span>
                  )}
                  <h3>{card.title[lang]}</h3>
                  <p>{card.description[lang]}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="payment-section">
            <h2>{lang === 'ar' ? 'خيارات الدفع' : 'Payment Options'}</h2>
            <div className="payment-grid">
              <div className="payment-card" onClick={() => handlePaymentOption('visa')}>
                <span>💳</span>
                <strong>{lang === 'ar' ? 'فيزا / ماستركارد' : 'Visa / Mastercard'}</strong>
                <p>{lang === 'ar' ? 'دفع سريع وآمن بالبطاقات' : 'Fast and secure card payments.'}</p>
              </div>
              <div className="payment-card" onClick={() => handlePaymentOption('instapay')}>
                <span>⚡</span>
                <strong>{lang === 'ar' ? 'إنستا باي' : 'InstaPay'}</strong>
                <p>{lang === 'ar' ? 'محفظة إلكترونية فورية' : 'Instant mobile wallet checkout.'}</p>
              </div>
              <div className="payment-card" onClick={() => handlePaymentOption('bank')}>
                <span>🏦</span>
                <strong>{lang === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</strong>
                <p>{lang === 'ar' ? 'جميع البنوك المحلية والدولية' : 'All major local and international banks accepted.'}</p>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <div className="search-and-filters">
            <Search
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
              categories={categories}
              sortOptions={sortOptions}
              translations={translations[lang]}
              lang={lang}
            />
          </div>

          <div className="category-chips">
            {categories.map(category => (
              <button
                key={category.key}
                className={`category-chip ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label[lang]}
              </button>
            ))}
          </div>

          {selectedCategory === 'all' ? (
            <div className="category-groups">
              {groupedProducts.map(category => (
                <section key={category.key} className="category-group">
                  <div className="category-group-header">
                    <h2>{category.label[lang]}</h2>
                    <span>{category.products.length} {lang === 'ar' ? 'منتج' : 'items'}</span>
                  </div>
                  {category.products.length > 0 ? (
                    <div className="category-group-grid">
                      {category.products.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={navigateToProductDetails} />
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state small">
                      <p>{lang === 'ar' ? 'لا توجد منتجات في هذه الفئة حالياً' : 'No products in this category yet.'}</p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="products-container">
              {displayedProducts.length > 0 ? (
                displayedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={navigateToProductDetails}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <h2>{lang === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}</h2>
                  <p>{lang === 'ar' ? 'حاول تحديث البحث أو اختيار فئة أخرى.' : 'Try updating your search or selecting another category.'}</p>
                </div>
              )}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : activePage === 'category' ? (
        <div className="category-page">
          <button className="back-btn" onClick={navigateToHome}>
            ← {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
          <div className="section-header">
            <h2>
              {selectedCategory === 'all'
                ? lang === 'ar' ? 'جميع المنتجات' : 'All Products'
                : quickCategories.find((category) => category.id === selectedCategory)?.name[lang]}
            </h2>
            <p>{lang === 'ar' ? 'تصفح المنتجات في هذه الفئة' : 'Browse products in this category'}</p>
          </div>
          <div className="products-container">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetails={navigateToProductDetails} />
              ))
            ) : (
              <div className="empty-state">
                <h2>{lang === 'ar' ? 'لم يتم العثور على منتجات' : 'No products found'}</h2>
                <p>{lang === 'ar' ? 'حاول اختيار فئة أخرى أو تحديث البحث.' : 'Try selecting another category or updating your search.'}</p>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : activePage === 'cart' ? (
        <div className="cart-page">
          <button className="back-btn" onClick={navigateToHome}>← Back to Shopping</button>
          <h1>Your Shopping Cart</h1>
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={handleCheckout}
          />
        </div>
      ) : activePage === 'orders' ? (
        <div className="orders-page">
          <button className="back-button" onClick={navigateToHome}>← {lang === 'ar' ? 'العودة للتسوق' : 'Back to Shopping'}</button>
          <h2>{lang === 'ar' ? 'طلباتي' : 'My Orders'}</h2>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <div className="order-id">{lang === 'ar' ? 'طلب رقم' : 'Order #'}{order.id}</div>
                      <div className="order-date">{order.date}</div>
                    </div>
                    <div className={`order-status completed`}>{lang === 'ar' ? 'مكتمل' : 'Completed'}</div>
                  </div>
                  <div className="order-items">
                    <h4>{lang === 'ar' ? 'المنتجات' : 'Items'}</h4>
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">{lang === 'ar' ? 'الكمية' : 'Qty'}: {item.quantity}</span>
                        <span className="order-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <div className="order-payment-method">{lang === 'ar' ? 'الدفع' : 'Payment'}: {order.paymentMethod}</div>
                    <div className="order-total">
                      <div className="order-total-label">{lang === 'ar' ? 'الإجمالي' : 'Total'}</div>
                      <div className="order-total-amount">${order.total}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <div className="empty-orders-icon">📦</div>
              <h3>{lang === 'ar' ? 'لا توجد طلبات' : 'No Orders Yet'}</h3>
              <p>{lang === 'ar' ? 'ابدأ التسوق الآن' : 'Start shopping now'}</p>
              <button className="back-button" onClick={navigateToHome}>{lang === 'ar' ? 'العودة للتسوق' : 'Back to Shopping'}</button>
            </div>
          )}
        </div>
      ) : (
        <div className="cart-page">
          <button className="back-btn" onClick={navigateToHome}>← Back to Shopping</button>
          <h1>Your Shopping Cart</h1>
          <Cart
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={handleCheckout}
          />
        </div>
      )}

      {activePage === 'product-details' && selectedProductId && (
        <div className="product-details-page">
          <button className="back-btn" onClick={navigateToHome}>← {lang === 'ar' ? 'العودة للتسوق' : 'Back to Shopping'}</button>
          <ProductDetails productId={selectedProductId} />
        </div>
      )}

      {showPaymentModal && (
        <div className="modal-overlay" onClick={closePaymentModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!paymentMethod ? (
              <>
                <h2>{translations[lang].paymentHeading}</h2>
                <p>{translations[lang].paymentDescription}</p>
                <div className="payment-options">
                  <button className="payment-option" onClick={() => handlePaymentOption('visa')}>
                    {translations[lang].visaTitle}
                  </button>
                  <button className="payment-option" onClick={() => handlePaymentOption('instapay')}>
                    {translations[lang].instapayTitle}
                  </button>
                  <button className="payment-option" onClick={() => handlePaymentOption('bank')}>
                    {translations[lang].bankTitle}
                  </button>
                </div>
                <button className="login-btn" onClick={closePaymentModal}>{translations[lang].close}</button>
              </>
            ) : (
              <>
                <h2>{paymentMethod === 'visa' ? translations[lang].visaTitle : paymentMethod === 'instapay' ? translations[lang].instapayTitle : translations[lang].bankTitle}</h2>
                {paymentMethod === 'visa' ? (
                  <div className="payment-form">
                    <label>{translations[lang].cardHolder}</label>
                    <input
                      value={paymentForm.cardHolder}
                      onChange={(e) => handlePaymentInputChange('cardHolder', e.target.value)}
                      placeholder={translations[lang].cardHolder}
                    />
                    <label>{translations[lang].cardNumber}</label>
                    <input
                      value={paymentForm.cardNumber}
                      onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                    />
                    <div className="payment-row">
                      <div>
                        <label>{translations[lang].expiryDate}</label>
                        <input
                          type="text"
                          value={paymentForm.expiryDate}
                          onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                          placeholder="MM / YY"
                        />
                      </div>
                      <div>
                        <label>{translations[lang].cvv}</label>
                        <input
                          type="text"
                          value={paymentForm.cvv}
                          onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <label>{translations[lang].selectBank}</label>
                    <select
                      value={paymentForm.bank}
                      onChange={(e) => handlePaymentInputChange('bank', e.target.value)}
                    >
                      <option value="">{translations[lang].bankPlaceholder}</option>
                      <option value="CIB">CIB</option>
                      <option value="National Bank">National Bank</option>
                      <option value="Banque Misr">Banque Misr</option>
                      <option value="HSBC">HSBC</option>
                      <option value="QNB">QNB</option>
                    </select>
                    <button className="login-btn" onClick={handlePaymentSubmit}>{translations[lang].payNow}</button>
                    <button className="login-btn secondary" onClick={() => setPaymentMethod(null)}>{translations[lang].close}</button>
                  </div>
                ) : (
                  <div className="payment-summary">
                    <p>{translations[lang].paymentDescription}</p>
                    <button className="login-btn" onClick={handlePaymentSubmit}>{translations[lang].payNow}</button>
                    <button className="login-btn secondary" onClick={() => setPaymentMethod(null)}>{translations[lang].close}</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Market Store</h3>
            <p>A trusted online marketplace offering everything you need in one place.</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Fashion</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Home</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get the latest deals first.</p>
            <div className="newsletter">
              <input type="email" placeholder="Email address" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
          <div className="footer-section">
            <h4>Rate Our App</h4>
            <p>Help us improve by rating your experience.</p>
            <div className="footer-rating">
              <div className="footer-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`footer-rating-star ${star <= Math.round(appRating) ? 'active' : ''}`}
                    onClick={() => handleAppRating(star)}
                    aria-label={`${star} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="footer-rating-info">
                <span className="footer-rating-score">{appRatingCount ? appRating.toFixed(1) : '0.0'}</span>
                <span className="footer-rating-count">({appRatingCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Market Store. All rights reserved.</p>
          <div className="payment-methods">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>AMEX</span>
            <span>InstaPay</span>
            <span>Bank Transfer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
