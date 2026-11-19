import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LISTINGS } from '../data/initialListings';
import { MARKET_PRICES } from '../data/marketPricesData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Localization: 'bn' (Default as required by PRD) | 'en'
  const [lang, setLang] = useState('bn');

  // Role Switcher: 'farmer' (কৃষক/বিক্রেতা) | 'buyer' (পাইকারি ক্রেতা/আড়তদার) | 'expert' (কৃষি/ভেট/মৎস্য বিশেষজ্ঞ) | 'admin' (অ্যাডমিন)
  const [currentRole, setCurrentRole] = useState('farmer');

  // Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Selected district for regional weather and prices
  const [selectedDistrict, setSelectedDistrict] = useState('dinajpur');

  // User Profile
  const [userProfile, setUserProfile] = useState({
    id: 'user-001',
    fullName: 'মো. রফিকুল ইসলাম',
    phone: '০১৭২২-১১২২৩৩',
    email: 'farmer.rafiq@agrobd.com',
    district: 'dinajpur',
    districtBn: 'দিনাজপুর',
    upazila: 'চিরিরবন্দর',
    village: 'রানীবন্দর গ্রাম',
    roles: ['farmer', 'seller'],
    verified: true,
    experienceYears: '১২ বছর',
    farmProfiles: {
      agri: {
        landSize: 66,
        landUnit: 'decimal',
        soilType: 'বেলে দোআঁশ',
        season: 'রবি',
        selectedCrop: 'crop-potato',
        waterSource: 'গভীর নলকূপ ও সেচখাল'
      },
      livestock: {
        species: 'cattle',
        animalCount: 6,
        purpose: 'দুধ ও প্রজনন',
        farmSize: 'মাঝারি শেড (১০টি গরুর ধারণক্ষমতা)'
      },
      fisheries: {
        pondArea: 50,
        pondDepth: 5.5,
        cultureType: 'polyculture_carp',
        waterSource: 'ভূগর্ভস্থ ও বৃষ্টির পানি'
      }
    }
  });

  // Produce Listings (Initialized with pre-populated listings)
  const [listings, setListings] = useState(INITIAL_LISTINGS);

  // Inquiries and Negotiations
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-201',
      listingId: 'lst-101',
      listingTitle: 'সুগন্ধি কাটারিভোগ ধান (নতুন তোলা)',
      farmerId: 'user-001',
      farmerName: 'মো. রফিকুল ইসলাম',
      farmerPhone: '০১৭২২-১১২২৩৩',
      buyerId: 'buyer-301',
      buyerName: 'আলহাজ্ব মেসার্স কায়সার রাইস মিলস (কাওরান বাজার আড়ত)',
      buyerPhone: '০১৮১৮-৭৬৫৪৩২',
      requestedQuantity: 80,
      unit: 'মণ (৪০ কেজি)',
      offeredPrice: 1600,
      askingPrice: 1650,
      agreedPrice: 1625,
      status: 'accepted', // pending, accepted, rejected, ordered
      createdAt: 'আজ দুপুর ১২:০০',
      messages: [
        { sender: 'buyer', text: 'আসসালামু আলাইকুম। আপনার কাটারিভোগ ধানটি নিতে চাই। ৮০ মণ একবারে নিলে ১৬০০ টাকা মণ দেবেন কি?', time: 'দুপুর ১২:০০', offer: 1600 },
        { sender: 'farmer', text: 'ওয়ালাইকুমুস সালাম ভাই। ধানের কোয়ালিটি খুব ভালো, শুকনা। ১৬২০ টাকা হলে ফাইনাল করে দিতে পারি।', time: 'দুপুর ১২:১৫', offer: 1625 },
        { sender: 'buyer', text: 'ঠিক আছে ১৬২৫ টাকা মণ দরে ডিল কনফার্ম করুন। পিকআপ ভ্যান আগামী পরশু সকালে পাঠাবো।', time: 'দুপুর ১২:৩০', offer: 1625 }
      ]
    },
    {
      id: 'inq-202',
      listingId: 'lst-105',
      listingTitle: 'পুকুরে চাষকৃত তাজা রুই মাছ (গড় ওজন ২.২ - ২.৫ কেজি)',
      farmerId: 'user-farmer-05',
      farmerName: 'মো. তারেক হাসান',
      farmerPhone: '০১৬৭৭-৮৮৯৯০০',
      buyerId: 'user-001', // If user browses as buyer
      buyerName: 'যাত্রাবাড়ী আড়ত সমিতি',
      buyerPhone: '০১৭২২-১১২২৩৩',
      requestedQuantity: 50,
      unit: 'মণ (৪০ কেজি)',
      offeredPrice: 12200,
      askingPrice: 12800,
      agreedPrice: null,
      status: 'pending',
      createdAt: 'গতকাল বিকাল',
      messages: [
        { sender: 'buyer', text: '৫০ মণ রুই মাছ যাত্রাবাড়ী মোকামের জন্য নিতে চাই। ১২,২০০ টাকা মণ রাখা যাবে কি?', time: 'বিকাল ৫:৩০', offer: 12200 }
      ]
    }
  ]);

  // Orders Management (Lifecycle: pending -> accepted -> ready_for_pickup -> completed -> cancelled)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-98421',
      listingId: 'lst-101',
      productName: 'সুগন্ধি কাটারিভোগ ধান (নতুন তোলা)',
      category: 'ধান ও চাল',
      sector: 'agriculture',
      farmerId: 'user-001',
      farmerName: 'মো. রফিকুল ইসলাম',
      farmerPhone: '০১৭২২-১১২২৩৩',
      buyerId: 'buyer-301',
      buyerName: 'আলহাজ্ব মেসার্স কায়সার রাইস মিলস',
      buyerPhone: '০১৮১৮-৭৬৫৪৩২',
      quantity: 80,
      unit: 'মণ',
      unitPrice: 1625,
      totalAmount: 130000,
      paymentMethod: 'ক্যাশ অন পিকআপ (Cash on Pickup)',
      orderStatus: 'ready_for_pickup', // pending, accepted, ready_for_pickup, completed, cancelled
      orderDate: '১৭ নভেম্বর, ২০২৬',
      pickupDate: '১৯ নভেম্বর, ২০২৬ (সকাল ৯:০০)',
      pickupLocation: 'রানীবন্দর মোকাম সংলগ্ন গুদাম, চিরিরবন্দর, দিনাজপুর',
      notes: 'বস্তা প্রতি ওজন ৪০ কেজি নেট। চালক এসে ওজন যাচাই করবেন।'
    },
    {
      id: 'ORD-97510',
      listingId: 'lst-102',
      productName: 'উন্নত ডায়মন্ড গোল আলু (কোল্ড স্টোরেজ)',
      category: 'কন্দ ও সবজি',
      sector: 'agriculture',
      farmerId: 'user-farmer-02',
      farmerName: 'আলহাজ্ব আনিসুর রহমান',
      farmerPhone: '০১৮১৯-৯৮৮৭৭৬',
      buyerId: 'buyer-301',
      buyerName: 'প্রাণ এগ্রো ফুডস প্রকিউরমেন্ট',
      buyerPhone: '০১৯১১-২২৩৩৪৪',
      quantity: 200,
      unit: 'মণ',
      unitPrice: 1440,
      totalAmount: 288000,
      paymentMethod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
      orderStatus: 'completed',
      orderDate: '১০ নভেম্বর, ২০২৬',
      pickupDate: '১২ নভেম্বর, ২০২৬',
      pickupLocation: 'মহাস্থান কোল্ড স্টোরেজ-২, শিবগঞ্জ, বগুড়া',
      notes: 'লেনদেন সফলভাবে সম্পন্ন হয়েছে। রশিদ প্রদান করা হয়েছে।'
    }
  ]);

  // Price Alerts (PRD FR-MKT-40 to FR-MKT-46)
  const [priceAlerts, setPriceAlerts] = useState([
    {
      id: 'alt-01',
      productName: 'আলু (ডায়মন্ড)',
      sector: 'agriculture',
      district: 'dinajpur',
      districtBn: 'দিনাজপুর',
      targetPrice: 42,
      unit: 'কেজি',
      condition: 'at_or_above', // at_or_above, at_or_below
      conditionBn: 'দাম ৪২ টাকা বা তার বেশি হলে',
      isActive: true,
      lastTriggered: 'আজ সকাল ৭:৪৫',
      createdDate: '১২ নভেম্বর'
    },
    {
      id: 'alt-02',
      productName: 'বোরো ধান (ব্রি-২৮)',
      sector: 'agriculture',
      district: 'bogra',
      districtBn: 'বগুড়া',
      targetPrice: 1300,
      unit: 'মণ',
      condition: 'at_or_above',
      conditionBn: 'দাম ১৩০০ টাকা বা তার বেশি হলে',
      isActive: true,
      lastTriggered: null,
      createdDate: '১৪ নভেম্বর'
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'নতুন দর প্রস্তাব গ্রহণ!',
      message: 'মেসার্স কায়সার রাইস মিলস আপনার কাটারিভোগ ধানের অফার ১৬২৫ টাকায় গ্রহণ করেছেন। অর্ডার প্রস্তুত করুন।',
      type: 'marketplace',
      time: '১০ মিনিট আগে',
      read: false
    },
    {
      id: 'notif-2',
      title: 'আবহাওয়া ও কুয়াশা সতর্কতা',
      message: 'দিনাজপুর ও বগুড়া অঞ্চলে ভোরের ঘন কুয়াশার জন্য আলুর জমিতে লেইট ব্লাইট প্রতিরোধক স্প্রে করার পরামর্শ।',
      type: 'weather',
      time: '১ ঘণ্টা আগে',
      read: false
    },
    {
      id: 'notif-3',
      title: 'দৈনিক সেচ ও সার রিমাইন্ডার',
      message: 'আলুর ক্ষেতে মাটি তোলার আগে আজ অবশিষ্ট ইউরিয়া ও এমওপি সার উপরিপ্রয়োগের সময় হয়েছে।',
      type: 'reminder',
      time: '৩ ঘণ্টা আগে',
      read: true
    }
  ]);

  // Modals
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [receiptModalOrder, setReceiptModalOrder] = useState(null);
  const [offlineMode, setOfflineMode] = useState(false);

  // Add a new produce listing with automatic validation and price suggestion reference
  const addListing = (newListing) => {
    const listingWithMeta = {
      ...newListing,
      id: `lst-${Date.now().toString().slice(-4)}`,
      sellerId: userProfile.id,
      sellerName: userProfile.fullName,
      sellerType: 'নিবন্ধিত কৃষক',
      phone: userProfile.phone,
      viewsCount: 1,
      inquiriesCount: 0,
      createdAt: 'এখন মাত্র প্রকাশিত'
    };
    setListings([listingWithMeta, ...listings]);
    
    // Add success notification
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        title: 'পণ্য সফলভাবে তালিকাভুক্ত হয়েছে!',
        message: `আপনার "${newListing.productName}" বিক্রয় পোস্টটি পাইকারি ক্রেতাদের জন্য উন্মুক্ত করা হয়েছে।`,
        type: 'marketplace',
        time: 'এখন মাত্র',
        read: false
      },
      ...notifications
    ]);
  };

  // Create an inquiry or send price offer
  const sendInquiry = (listingId, quantity, offerPrice, initialMsg) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    const newInq = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      listingId: listing.id,
      listingTitle: listing.productName,
      farmerId: listing.sellerId,
      farmerName: listing.sellerName,
      farmerPhone: listing.phone,
      buyerId: userProfile.id,
      buyerName: userProfile.fullName,
      buyerPhone: userProfile.phone,
      requestedQuantity: parseFloat(quantity) || listing.quantity,
      unit: listing.unit,
      offeredPrice: parseFloat(offerPrice) || listing.pricePerUnit,
      askingPrice: listing.pricePerUnit,
      agreedPrice: null,
      status: 'pending',
      createdAt: 'এইমাত্র',
      messages: [
        {
          sender: 'buyer',
          text: initialMsg || `আমি ${quantity} ${listing.unit} নিতে আগ্রহী। আমার প্রস্তাবিত দর ${offerPrice} টাকা/${listing.unit}।`,
          time: 'এইমাত্র',
          offer: parseFloat(offerPrice)
        }
      ]
    };

    setInquiries([newInq, ...inquiries]);
  };

  // Add negotiation reply in chat
  const replyInquiry = (inquiryId, message, counterOffer) => {
    setInquiries(inquiries.map(inq => {
      if (inq.id === inquiryId) {
        const isFarmer = currentRole === 'farmer';
        const newMsg = {
          sender: isFarmer ? 'farmer' : 'buyer',
          text: message,
          time: 'এইমাত্র',
          offer: counterOffer ? parseFloat(counterOffer) : null
        };
        return {
          ...inq,
          messages: [...inq.messages, newMsg],
          ...(counterOffer ? { agreedPrice: parseFloat(counterOffer) } : {})
        };
      }
      return inq;
    }));
  };

  // Convert an inquiry into a confirmed order
  const convertInquiryToOrder = (inquiryId, paymentMethod = 'ক্যাশ অন পিকআপ (Cash on Pickup)') => {
    const inq = inquiries.find(i => i.id === inquiryId);
    if (!inq) return;

    const agreedPrice = inq.agreedPrice || inq.offeredPrice || inq.askingPrice;
    const totalAmount = Math.round(inq.requestedQuantity * agreedPrice);

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      listingId: inq.listingId,
      productName: inq.listingTitle,
      category: 'কৃষি/খামার পণ্য',
      sector: 'agriculture',
      farmerId: inq.farmerId,
      farmerName: inq.farmerName,
      farmerPhone: inq.farmerPhone,
      buyerId: inq.buyerId,
      buyerName: inq.buyerName,
      buyerPhone: inq.buyerPhone,
      quantity: inq.requestedQuantity,
      unit: inq.unit,
      unitPrice: agreedPrice,
      totalAmount,
      paymentMethod,
      orderStatus: 'accepted',
      orderDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
      pickupDate: 'আগামী ৩ কার্যদিবসের মধ্যে',
      pickupLocation: 'বিক্রেতার খামার/গুদাম প্রাঙ্গণ',
      notes: 'সিস্টেম জেনারেটেড অর্ডার। পিকআপের সময় ওজন নিশ্চিত করে ক্যাশ পরিশোধ করুন।'
    };

    setOrders([newOrder, ...orders]);

    // Update inquiry status
    setInquiries(inquiries.map(i => i.id === inquiryId ? { ...i, status: 'ordered' } : i));

    // Show digital receipt immediately
    setReceiptModalOrder(newOrder);

    // Reduce listing available quantity (FR-MKT-37 transactional stock prevention)
    setListings(listings.map(l => {
      if (l.id === inq.listingId) {
        const remaining = Math.max(0, l.quantity - inq.requestedQuantity);
        return {
          ...l,
          quantity: remaining,
          status: remaining === 0 ? 'sold' : 'published'
        };
      }
      return l;
    }));
  };

  // Update order status (Pending -> Accepted -> Ready for pickup -> Completed)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  // Add Price Alert
  const addPriceAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: `alt-${Date.now().toString().slice(-4)}`,
      isActive: true,
      lastTriggered: null,
      createdDate: 'আজ'
    };
    setPriceAlerts([newAlert, ...priceAlerts]);
  };

  // Delete Price Alert
  const deletePriceAlert = (alertId) => {
    setPriceAlerts(priceAlerts.filter(a => a.id !== alertId));
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        selectedDistrict,
        setSelectedDistrict,
        userProfile,
        setUserProfile,
        listings,
        addListing,
        inquiries,
        sendInquiry,
        replyInquiry,
        convertInquiryToOrder,
        orders,
        updateOrderStatus,
        priceAlerts,
        addPriceAlert,
        deletePriceAlert,
        notifications,
        aiModalOpen,
        setAiModalOpen,
        receiptModalOrder,
        setReceiptModalOrder,
        offlineMode,
        setOfflineMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
