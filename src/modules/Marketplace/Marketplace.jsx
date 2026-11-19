import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISTRICTS } from '../../data/bangladeshGeo';
import { MARKET_PRICES, getPriceReference } from '../../data/marketPricesData';
import { useTranslation } from '../../data/translations';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Tag, 
  MessageSquare, 
  PhoneCall, 
  FileCheck2, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  SlidersHorizontal,
  Bell,
  Eye,
  AlertCircle,
  X,
  Send,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Marketplace() {
  const { 
    currentRole, 
    listings, 
    addListing, 
    inquiries, 
    sendInquiry, 
    replyInquiry, 
    convertInquiryToOrder,
    orders, 
    updateOrderStatus,
    setReceiptModalOrder,
    priceAlerts,
    addPriceAlert,
    deletePriceAlert,
    userProfile,
    lang
  } = useApp();

  const { isBn } = useTranslation(lang);

  // Sub-navigation inside Marketplace
  const [activeTabMkt, setActiveTabMkt] = useState('explore'); // 'explore', 'my_listings', 'inquiries', 'orders', 'alerts'

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all'); // 'all', 'agriculture', 'livestock', 'fisheries'
  const [filterDistrict, setFilterDistrict] = useState('all');

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedListingDetail, setSelectedListingDetail] = useState(null);
  const [offerModalListing, setOfferModalListing] = useState(null);
  const [negotiationModalInquiry, setNegotiationModalInquiry] = useState(null);

  // New Listing Form state with Smart Price Suggestion (PRD 4.19)
  const [newSector, setNewSector] = useState('agriculture');
  const [newProductName, setNewProductName] = useState('');
  const [newCategory, setNewCategory] = useState(isBn ? 'ধান ও চাল' : 'Paddy & Rice');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState(isBn ? 'মণ (৪০ কেজি)' : 'Maund (40 kg)');
  const [newPrice, setNewPrice] = useState('');
  const [newGrade, setNewGrade] = useState(isBn ? 'গ্রেড A (উন্নত)' : 'Grade A (Premium)');
  const [newHarvestDate, setNewHarvestDate] = useState(isBn ? 'গত সপ্তাহে সংগৃহীত' : 'Harvested last week');
  const [newAvailability, setNewAvailability] = useState(isBn ? 'তাৎক্ষণিক পিকআপ সম্ভব' : 'Immediate pickup available');
  const [newDistrict, setNewDistrict] = useState('dinajpur');
  const [newUpazila, setNewUpazila] = useState(isBn ? 'চিরিরবন্দর' : 'Chirirbandar');
  const [newLocationDetails, setNewLocationDetails] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80');

  // Buyer Offer Form state
  const [offerQuantity, setOfferQuantity] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  // Negotiation reply message state
  const [chatReplyText, setChatReplyText] = useState('');
  const [counterPriceInput, setCounterPriceInput] = useState('');

  // New Price Alert Form state
  const [newAlertProduct, setNewAlertProduct] = useState(isBn ? 'আলু (ডায়মন্ড)' : 'Potato (Diamond)');
  const [newAlertTarget, setNewAlertTarget] = useState('42');
  const [newAlertUnit, setNewAlertUnit] = useState(isBn ? 'কেজি' : 'kg');
  const [newAlertDistrict, setNewAlertDistrict] = useState('dinajpur');

  // Dynamic Smart Price Reference during listing creation (PRD 4.19 FR-MKT-11 to FR-MKT-16)
  const suggestedPriceRef = getPriceReference(newProductName || (isBn ? 'ধান' : 'Paddy'), newSector, newDistrict);

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (item.districtBn && item.districtBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (item.district && item.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchSector = selectedSector === 'all' || item.sector === selectedSector;
    const matchDistrict = filterDistrict === 'all' || item.district === filterDistrict;
    return matchSearch && matchSector && matchDistrict;
  });

  const myListings = listings.filter(l => l.sellerId === userProfile.id);

  // Handle Form Submission for new listing
  const handleCreateListingSubmit = (e) => {
    e.preventDefault();
    if (!newProductName || !newQuantity || !newPrice) {
      alert(isBn ? 'অনুগ্রহ করে পণ্যের নাম, পরিমাণ ও প্রত্যাশিত দাম সঠিকভাবে পূরণ করুন।' : 'Please enter the product name, quantity, and expected price.');
      return;
    }

    const listingObj = {
      productName: newProductName,
      sector: newSector,
      sectorBn: newSector === 'agriculture' ? (isBn ? 'কৃষি' : 'Crops') : newSector === 'livestock' ? (isBn ? 'খামারি ও পশু' : 'Livestock') : (isBn ? 'মৎস্য' : 'Fisheries'),
      category: newCategory,
      quantity: parseFloat(newQuantity),
      unit: newUnit,
      unitKey: newUnit.includes('মণ') || newUnit.toLowerCase().includes('maund') ? 'maund' : 'kg',
      pricePerUnit: parseFloat(newPrice),
      qualityGrade: newGrade,
      harvestDate: newHarvestDate,
      availabilityDate: newAvailability,
      district: newDistrict,
      districtBn: DISTRICTS.find(d => d.id === newDistrict)?.nameBn || (isBn ? 'দিনাজপুর' : 'Dinajpur'),
      upazila: newUpazila,
      locationDetails: newLocationDetails || (isBn ? 'খামার প্রাঙ্গণ' : 'Farm yard'),
      description: newDescription || (isBn ? 'উন্নত মানের ফ্রেশ উৎপাদিত কৃষি পণ্য।' : 'Fresh high-quality agricultural produce direct from farm.'),
      image: newImage,
      status: 'published',
      regionalMarketPriceRef: suggestedPriceRef?.wholesalePrice || parseFloat(newPrice)
    };

    addListing(listingObj);
    setCreateModalOpen(false);
    // Reset form
    setNewProductName('');
    setNewQuantity('');
    setNewPrice('');
    setActiveTabMkt('my_listings');
  };

  // Submit Buyer Offer
  const handleSendOfferSubmit = (e) => {
    e.preventDefault();
    if (!offerModalListing) return;
    sendInquiry(offerModalListing.id, offerQuantity || offerModalListing.quantity, offerPrice || offerModalListing.pricePerUnit, offerMessage);
    setOfferModalListing(null);
    setOfferQuantity('');
    setOfferPrice('');
    setOfferMessage('');
    alert(isBn ? 'আপনার প্রস্তাবিত দর বিক্রেতার কাছে সফলভাবে পাঠানো হয়েছে!' : 'Your purchase offer has been successfully sent to the seller!');
    setActiveTabMkt('inquiries');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Marketplace Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-800 via-amber-700 to-emerald-800 text-white p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" /> 
            {isBn ? 'মডিউল ৪: কৃষি পণ্য বিপণন ও পাইকারি মার্কেটপ্লেস' : 'Module 4: Produce Marketing & Direct Wholesale'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isBn ? 'কৃষক-পাইকারি সরাসরি ক্রয়-বিক্রয় পোর্টাল' : 'Direct Farmer-to-Wholesale Marketplace'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'কোনো মধ্যস্বত্বভোগী ছাড়া দেশের প্রান্তিক কৃষকদের উৎপাদিত ধান, আলু, শাকসবজি, মাছ ও গবাদিপশু ক্রয় ও বিক্রয়ের বিশ্বস্ত প্ল্যাটফর্ম।'
              : 'Trusted transparent direct trading platform connecting rural farmers producing paddy, potato, fish, and livestock with wholesale buyers.'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition active:scale-95"
          >
            <Plus className="w-4 h-4 text-emerald-700 stroke-[3]" />
            {isBn ? 'নতুন বিক্রয় পোস্ট দিন' : 'Post Produce for Sale'}
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'explore', nameBn: 'সব পণ্য এক্সপ্লোর', nameEn: 'Explore All', icon: ShoppingBag, count: listings.length },
            { id: 'my_listings', nameBn: 'আমার বিক্রয় পোস্ট', nameEn: 'My Listings', icon: Tag, count: myListings.length },
            { id: 'inquiries', nameBn: 'দরদাম ও অফার (চ্যাট)', nameEn: 'Negotiations', icon: MessageSquare, count: inquiries.length },
            { id: 'orders', nameBn: 'অর্ডার ও রশিদ', nameEn: 'Orders & Receipts', icon: FileCheck2, count: orders.length },
            { id: 'alerts', nameBn: 'মূল্য সতর্কতা', nameEn: 'Price Alerts', icon: Bell, count: priceAlerts.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTabMkt === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabMkt(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20'
                    : 'bg-white text-slate-600 hover:text-amber-800 hover:bg-amber-50/50 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {isBn ? tab.nameBn : tab.nameEn}
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Explore Products View */}
      {activeTabMkt === 'explore' && (
        <div className="space-y-5">
          
          {/* Search & Filters Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? "পণ্য, জাত বা জেলা দিয়ে খুঁজুন (যেমন: ধান, আলু, রুই)..." : "Search crop, variety, or district..."}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Sector Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full md:w-auto text-xs">
              {[
                { id: 'all', nameBn: 'সকল খাত', nameEn: 'All Sectors' },
                { id: 'agriculture', nameBn: '🌾 কৃষি ও ফসল', nameEn: '🌾 Crops' },
                { id: 'livestock', nameBn: '🐄 খামারি ও পশু', nameEn: '🐄 Livestock' },
                { id: 'fisheries', nameBn: '🐟 মৎস্য', nameEn: '🐟 Fisheries' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSector(s.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedSector === s.id
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isBn ? s.nameBn : s.nameEn}
                </button>
              ))}
            </div>

            {/* District Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer w-full"
              >
                <option value="all">{isBn ? 'বাংলাদেশের সকল জেলা' : 'All Districts'}</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {isBn ? `${d.nameBn} জেলা` : `${d.nameEn} District`}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-400 transition flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Sector Badge - Clickable to open details */}
                  <div 
                    onClick={() => setSelectedListingDetail(item)}
                    className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {item.sectorBn}
                      </span>
                      <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.qualityGrade}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-slate-100">
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        {isBn ? 'প্রত্যাশিত পাইকারি দর' : 'Expected Rate'}
                      </span>
                      <span className="text-base font-black text-emerald-800">
                        ৳ {item.pricePerUnit.toLocaleString(isBn ? 'bn-BD' : 'en-US')} <span className="text-xs font-semibold">/{item.unit}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 
                      onClick={() => setSelectedListingDetail(item)}
                      className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition cursor-pointer"
                    >
                      {item.productName}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.districtBn}, {item.upazila}</span>
                      </div>
                      <div className="font-bold text-slate-800">
                        {isBn ? 'মজুত' : 'Stock'}: {item.quantity} {item.unit}
                      </div>
                    </div>

                    {/* Regional Reference Price comparison pill (PRD 4.19) */}
                    {item.regionalMarketPriceRef && (
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{isBn ? 'আঞ্চলিক বাজারদর রেফারেন্স:' : 'Regional Benchmark:'}</span>
                        <span className="font-bold text-slate-700">৳ {item.regionalMarketPriceRef}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setOfferModalListing(item)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {isBn ? 'দর প্রস্তাব দিন (অফার)' : 'Make an Offer'}
                  </button>

                  <button
                    onClick={() => setSelectedListingDetail(item)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0"
                    title={isBn ? "বিস্তারিত তথ্য দেখুন" : "View Details"}
                  >
                    <Eye className="w-4 h-4 text-slate-600" />
                  </button>

                  <a
                    href={`tel:${item.phone}`}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition shrink-0"
                    title={isBn ? `সরাসরি কল করুন: ${item.phone}` : `Call seller: ${item.phone}`}
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-700" />
                  </a>
                </div>

              </div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-base text-slate-700">
                {isBn ? 'কোনো পণ্য পাওয়া যায়নি' : 'No listings found'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? 'অন্য কোনো ফিল্টার বা নাম দিয়ে অনুসন্ধান করুন।' : 'Try searching with another keyword or changing the district filter.'}
              </p>
            </div>
          )}

        </div>
      )}

      {/* 2. My Listings View */}
      {activeTabMkt === 'my_listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-bold text-base text-slate-900">
              {isBn ? 'আমার প্রকাশিত বিক্রয় পোস্টসমূহ' : 'My Published Produce Listings'}
            </h3>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition"
            >
              + {isBn ? 'নতুন পণ্য বিক্রয় পোস্ট' : 'Post New Produce'}
            </button>
          </div>

          <div className="space-y-3">
            {myListings.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.sectorBn}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{item.productName}</h4>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'অবশিষ্ট মজুত' : 'Available'}: <span className="font-bold text-slate-800">{item.quantity} {item.unit}</span> | {isBn ? 'দর' : 'Rate'}: <span className="font-bold text-emerald-800">৳ {item.pricePerUnit}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTabMkt('inquiries')}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                  >
                    {isBn ? `ক্রেতা অফার (${item.inquiriesCount || 0})` : `Buyer Offers (${item.inquiriesCount || 0})`}
                  </button>
                  <button
                    onClick={() => setSelectedListingDetail(item)}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition"
                  >
                    {isBn ? 'বিস্তারিত' : 'Details'}
                  </button>
                </div>
              </div>
            ))}

            {myListings.length === 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
                <Tag className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 text-sm">{isBn ? 'আপনার কোনো সক্রিয় লিস্টিং নেই' : 'No active listings'}</h4>
                <p className="text-xs text-slate-400">{isBn ? 'আপনার জমির উৎপাদিত ফসল বা পশুর বিক্রয় পোস্ট প্রকাশ করতে নিচের বাটনে চাপুন।' : 'Create your first produce post to receive direct purchase offers from verified buyers.'}</p>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  + {isBn ? 'প্রথম বিক্রয় পোস্ট দিন' : 'Create First Post'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Inquiries & Negotiations View (PRD 4.21) */}
      {activeTabMkt === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? 'ক্রেতা-বিক্রেতা সরাসরি দরদাম ও অফার' : 'Direct Buyer-Seller Negotiations & Offers'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'ইন-অ্যাপ চ্যাট ও অফার ইতিহাস সংরক্ষণ ব্যবস্থা' : 'In-app negotiation threads and price agreed tracking'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500">{isBn ? 'ইনকোয়ারি' : 'Inquiry'} #{inq.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inq.status === 'ordered' 
                        ? 'bg-purple-100 text-purple-800' 
                        : inq.status === 'accepted' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inq.status === 'ordered' 
                        ? (isBn ? 'অর্ডার তৈরি হয়েছে' : 'Order Placed')
                        : inq.status === 'accepted' 
                        ? (isBn ? 'দর গৃহীত' : 'Offer Accepted')
                        : (isBn ? 'দর কষাকষি চলছে' : 'Negotiating')}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mt-2">{inq.listingTitle}</h4>
                  
                  <div className="mt-2 p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{isBn ? 'প্রস্তাবিত পরিমাণ:' : 'Requested Quantity:'}</span>
                      <span className="font-bold text-slate-800">{inq.requestedQuantity} {inq.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{isBn ? 'বিক্রেতার চাওয়া দর:' : 'Asking Price:'}</span>
                      <span className="font-bold text-slate-600">৳ {inq.askingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{isBn ? 'ক্রেতার অফার:' : 'Buyer Offer:'}</span>
                      <span className="font-bold text-emerald-800">৳ {inq.offeredPrice}</span>
                    </div>
                    {inq.agreedPrice && (
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-emerald-900">
                        <span>{isBn ? 'সম্মত চূড়ান্ত দর:' : 'Agreed Price:'}</span>
                        <span>৳ {inq.agreedPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Chat messages summary */}
                  <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
                    {inq.messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl text-xs ${
                          m.sender === 'buyer' ? 'bg-amber-50 text-amber-950 ml-2' : 'bg-emerald-50 text-emerald-950 mr-2'
                        }`}
                      >
                        <span className="font-bold block text-[10px] opacity-70">
                          {m.sender === 'buyer' ? (isBn ? `ক্রেতা (${inq.buyerName.split(' ')[0]})` : `Buyer (${inq.buyerName.split(' ')[0]})`) : (isBn ? 'কৃষক' : 'Farmer')}:
                        </span>
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  {inq.status !== 'ordered' ? (
                    <>
                      <button
                        onClick={() => convertInquiryToOrder(inq.id)}
                        className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm active:scale-95"
                      >
                        {isBn ? 'অফার গ্রহণ ও অর্ডার নিশ্চিত' : 'Accept Offer & Order'}
                      </button>
                      <button
                        onClick={() => setNegotiationModalInquiry(inq)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                      >
                        {isBn ? 'কাউন্টার অফার' : 'Counter'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        const relatedOrder = orders.find(o => o.listingId === inq.listingId);
                        if (relatedOrder) setReceiptModalOrder(relatedOrder);
                      }}
                      className="w-full py-2 rounded-xl bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      {isBn ? 'ডিজিটাল রশিদ দেখুন' : 'View Digital Memo'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Orders & Receipts View (PRD 4.22) */}
      {activeTabMkt === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="font-bold text-base text-slate-900">
              {isBn ? 'অর্ডার ব্যবস্থাপনা ও ডিজিটাল রশিদ' : 'Order Management & Digital Receipts'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {isBn ? 'ক্যাশ অন পিকআপ / ডেলিভারি' : 'Cash on Pickup / Delivery'}
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">#{ord.id}</span>
                    <span className="text-[10px] text-slate-400">{ord.orderDate}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ord.orderStatus === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.orderStatus === 'ready_for_pickup'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.orderStatus === 'completed' 
                        ? (isBn ? 'সম্পন্ন হয়েছে' : 'Completed')
                        : ord.orderStatus === 'ready_for_pickup' 
                        ? (isBn ? 'পিকআপের জন্য প্রস্তুত' : 'Ready for Pickup')
                        : (isBn ? 'অর্ডার গৃহীত' : 'Order Accepted')}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mt-1">{ord.productName}</h4>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{isBn ? 'পরিমাণ:' : 'Qty:'} <span className="font-bold text-slate-800">{ord.quantity} {ord.unit}</span></span>
                    <span>•</span>
                    <span>{isBn ? 'মোট মূল্য:' : 'Total:'} <span className="font-bold text-emerald-800">৳ {ord.totalAmount.toLocaleString(isBn ? 'bn-BD' : 'en-US')}</span></span>
                    <span>•</span>
                    <span>{isBn ? 'ক্রেতা:' : 'Buyer:'} <span className="font-medium text-slate-700">{ord.buyerName}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  {ord.orderStatus === 'ready_for_pickup' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'completed')}
                      className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
                    >
                      {isBn ? 'পিকআপ ও লেনদেন সম্পন্ন' : 'Mark Completed'}
                    </button>
                  )}

                  <button
                    onClick={() => setReceiptModalOrder(ord)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs border border-purple-200 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {isBn ? 'ডিজিটাল রশিদ' : 'Digital Memo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Price Alerts View (PRD 4.23) */}
      {activeTabMkt === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              {isBn ? 'নতুন মূল্য সতর্কতা তৈরি করুন' : 'Create New Price Alert'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isBn 
                ? 'বাজারে পণ্যের পাইকারি দর আপনার প্রত্যাশিত মূল্যে পৌঁছালে স্বয়ংক্রিয় পুশ নোটিফিকেশন পাবেন।'
                : 'Receive automatic push notifications when wholesale market price reaches your target rate.'}
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'পণ্যের নাম:' : 'Product Name:'}
              </label>
              <input
                type="text"
                value={newAlertProduct}
                onChange={(e) => setNewAlertProduct(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {isBn ? 'টার্গেট মূল্য (টাকা):' : 'Target Price (BDT):'}
                </label>
                <input
                  type="number"
                  value={newAlertTarget}
                  onChange={(e) => setNewAlertTarget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {isBn ? 'পরিমাপের একক:' : 'Unit:'}
                </label>
                <select
                  value={newAlertUnit}
                  onChange={(e) => setNewAlertUnit(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs font-semibold"
                >
                  <option value={isBn ? "কেজি" : "kg"}>{isBn ? "কেজি" : "kg"}</option>
                  <option value={isBn ? "মণ" : "maund"}>{isBn ? "মণ" : "maund"}</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                addPriceAlert({
                  productName: newAlertProduct,
                  sector: 'agriculture',
                  district: newAlertDistrict,
                  districtBn: DISTRICTS.find(d => d.id === newAlertDistrict)?.nameBn || 'দিনাজপুর',
                  targetPrice: parseFloat(newAlertTarget),
                  unit: newAlertUnit,
                  condition: 'at_or_above',
                  conditionBn: isBn ? `দাম ${newAlertTarget} টাকা বা তার বেশি হলে` : `Price reaches ৳${newAlertTarget} or higher`
                });
                alert(isBn ? 'মূল্য সতর্কতা সক্রিয় করা হয়েছে!' : 'Price alert activated!');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition shadow active:scale-95"
            >
              {isBn ? 'মূল্য সতর্কতা সক্রিয় করুন' : 'Activate Price Alert'}
            </button>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-base text-slate-900">
              {isBn ? 'সক্রিয় মূল্য সতর্কতাবার্তাসমূহ' : 'Active Price Alerts'}
            </h3>
            {priceAlerts.map((alt) => (
              <div key={alt.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{alt.productName}</span>
                    <span className="text-xs text-slate-400">({alt.districtBn} {isBn ? 'জেলা' : 'District'})</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{alt.conditionBn} / {alt.unit}</p>
                  {alt.lastTriggered && (
                    <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                      {isBn ? 'সর্বশেষ ম্যাচ:' : 'Last matched:'} {alt.lastTriggered}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => deletePriceAlert(alt.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 text-xs font-bold transition"
                >
                  {isBn ? 'মুছুন' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Comprehensive Product Details View */}
      {selectedListingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-200" />
                <h3 className="font-bold text-base">
                  {isBn ? 'পণ্যের বিস্তারিত বিবরণ ও বিক্রেতা প্রোফাইল' : 'Produce Details & Seller Profile'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedListingDetail(null)}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar space-y-5 text-xs sm:text-sm">
              
              {/* Product Image & Badges */}
              <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedListingDetail.image}
                  alt={selectedListingDetail.productName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {selectedListingDetail.sectorBn}
                  </span>
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {selectedListingDetail.qualityGrade}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {isBn ? 'প্রত্যাশিত পাইকারি দর' : 'Expected Wholesale Rate'}
                  </span>
                  <span className="text-lg font-black text-emerald-800">
                    ৳ {selectedListingDetail.pricePerUnit.toLocaleString(isBn ? 'bn-BD' : 'en-US')} <span className="text-xs font-semibold">/{selectedListingDetail.unit}</span>
                  </span>
                </div>
              </div>

              {/* Product Title & Basic Stats */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {selectedListingDetail.productName}
                  </h2>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {isBn ? 'ক্যাটাগরি:' : 'Category:'} {selectedListingDetail.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isBn ? 'মোট মজুত' : 'Stock Available'}</span>
                    <span className="text-sm sm:text-base font-black text-slate-900">{selectedListingDetail.quantity} {selectedListingDetail.unit}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isBn ? 'ফসল তোলার তারিখ' : 'Harvest Date'}</span>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{selectedListingDetail.harvestDate}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isBn ? 'সরবরাহ সময়' : 'Availability'}</span>
                    <span className="text-xs font-bold text-emerald-700 line-clamp-1">{selectedListingDetail.availabilityDate}</span>
                  </div>
                </div>
              </div>

              {/* Benchmark Price Alert Note */}
              {selectedListingDetail.regionalMarketPriceRef && (
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isBn ? 'কৃষি বিপণন অধিদপ্তর (DAM) আঞ্চলিক রেফারেন্স গড় দর:' : 'Govt DAM Benchmark Reference Rate:'}</span>
                  </div>
                  <span className="font-bold text-emerald-900 text-sm">৳ {selectedListingDetail.regionalMarketPriceRef}</span>
                </div>
              )}

              {/* Detailed Description */}
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  {isBn ? 'পণ্যের বিবরণ ও বৈশিষ্ট্য:' : 'Produce Description & Quality:'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                  {selectedListingDetail.description}
                </p>
              </div>

              {/* Verified Seller & Location Information */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {isBn ? 'বিক্রেতা ও খামারের তথ্য' : 'Verified Seller & Farm Information'}
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {isBn ? 'যাচাইকৃত চাষী' : 'Verified Producer'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400 text-[11px]">{isBn ? 'চাষী / বিক্রেতা:' : 'Farmer / Seller:'}</p>
                    <p className="font-bold text-slate-900 text-sm">{selectedListingDetail.sellerName}</p>
                    <p className="text-slate-600 text-[11px]">{selectedListingDetail.farmName} • {selectedListingDetail.sellerType}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px]">{isBn ? 'পিকআপ অবস্থান / মোকাম:' : 'Pickup Location / Market:'}</p>
                    <p className="font-semibold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {selectedListingDetail.districtBn}, {selectedListingDetail.upazila}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{selectedListingDetail.locationDetails}</p>
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    const item = selectedListingDetail;
                    setSelectedListingDetail(null);
                    setOfferModalListing(item);
                  }}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  {isBn ? 'দর প্রস্তাব পাঠান (Make an Offer)' : 'Submit Purchase Offer'}
                </button>

                <a
                  href={`tel:${selectedListingDetail.phone}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>{isBn ? `সরাসরি কল: ${selectedListingDetail.phone}` : `Call: ${selectedListingDetail.phone}`}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Modal: Create Produce Listing with Smart Price Suggestion (PRD 4.18 & 4.19) */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">
                  {isBn ? 'নতুন কৃষি পণ্য বিক্রয় পোস্ট' : 'Post Produce for Sale'}
                </h3>
                <p className="text-xs text-emerald-100">
                  {isBn ? 'পাইকারি ক্রেতাদের জন্য আপনার ফসলের তথ্য দিন' : 'Enter produce details for wholesale buyers'}
                </p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateListingSubmit} className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4 text-xs sm:text-sm">
              
              {/* Sector Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'সেক্টর নির্বাচন করুন:' : 'Select Sector:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'agriculture', nameBn: 'কৃষি ও ফসল', nameEn: 'Crops' },
                    { id: 'livestock', nameBn: 'খামারি ও পশু', nameEn: 'Livestock' },
                    { id: 'fisheries', nameBn: 'মৎস্য', nameEn: 'Fisheries' }
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setNewSector(s.id)}
                      className={`py-2 rounded-xl font-bold border transition ${
                        newSector === s.id ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isBn ? s.nameBn : s.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'পণ্যের নাম ও জাত:' : 'Product Name & Variety:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder={isBn ? "যেমন: মিনিকেট চাল, ডায়মন্ড আলু..." : "e.g. Miniket Rice, Diamond Potato..."}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'ক্যাটাগরি:' : 'Category:'}
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder={isBn ? "যেমন: ধান, আলু, মাছ, গবাদিপশু..." : "e.g. Paddy, Potato, Fish..."}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'মোট পরিমাণ:' : 'Total Quantity:'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="50"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'পরিমাপের একক:' : 'Unit:'}
                  </label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 font-semibold"
                  >
                    <option value={isBn ? "মণ (৪০ কেজি)" : "Maund (40 kg)"}>{isBn ? "মণ (৪০ কেজি)" : "Maund (40 kg)"}</option>
                    <option value={isBn ? "কেজি" : "kg"}>{isBn ? "কেজি" : "kg"}</option>
                    <option value={isBn ? "কুইন্টাল" : "Quintal (100 kg)"}>{isBn ? "কুইন্টাল (১০০ কেজি)" : "Quintal (100 kg)"}</option>
                    <option value={isBn ? "টি" : "Piece/Head"}>{isBn ? "টি (পশু/হাঁস-মুরগি)" : "Piece/Head"}</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'প্রত্যাশিত দাম:' : 'Expected Rate:'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="1450"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-emerald-800"
                  />
                </div>
              </div>

              {/* SMART PRICE SUGGESTION ENGINE (PRD 4.19 FR-MKT-11 to FR-MKT-16) */}
              {suggestedPriceRef && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1 animate-in fade-in">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      {isBn ? 'স্মার্ট বাজারদর রেফারেন্স (Smart Price Benchmark)' : 'Smart Price Intelligence Benchmark'}
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-amber-200">
                      {suggestedPriceRef.source}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {isBn 
                      ? `বর্তমান ${suggestedPriceRef.marketNameBn} মোকামে পাইকারি গড় মূল্য: `
                      : `Current ${suggestedPriceRef.marketNameBn} wholesale benchmark: `}
                    <span className="font-bold text-slate-900">৳ {suggestedPriceRef.wholesalePrice} / {suggestedPriceRef.unit}</span> ({isBn ? 'সীমা:' : 'range:'} ৳ {suggestedPriceRef.minPrice} - ৳ {suggestedPriceRef.maxPrice})।
                  </p>
                  <p className="text-[10px] text-slate-500 italic">
                    {isBn ? '* এটি তথ্যভিত্তিক রেফারেন্স। আপনি আপনার পছন্দমতো প্রত্যাশিত দাম নির্ধারণ করতে পারেন।' : '* Reference guideline from DAM. You can set your own asking price.'}
                  </p>
                </div>
              )}

              {/* Quality Grade & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'কোয়ালিটি গ্রেড:' : 'Quality Grade:'}
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  >
                    <option value={isBn ? "গ্রেড A (উন্নত)" : "Grade A (Premium)"}>{isBn ? "গ্রেড A (উন্নত)" : "Grade A (Premium)"}</option>
                    <option value={isBn ? "গ্রেড B (মাঝারি)" : "Grade B (Medium)"}>{isBn ? "গ্রেড B (মাঝারি)" : "Grade B (Medium)"}</option>
                    <option value={isBn ? "গ্রেড C (সাধারণ)" : "Grade C (Standard)"}>{isBn ? "গ্রেড C (সাধারণ)" : "Grade C (Standard)"}</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'জেলা:' : 'District:'}
                  </label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>{isBn ? d.nameBn : d.nameEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'পণ্যের বিস্তারিত বিবরণ:' : 'Produce Description:'}
                </label>
                <textarea
                  rows="2"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder={isBn ? "ফসলের শুকনা অবস্থা, বস্তার সাইজ বা পিকআপ নির্দেশিকা লিখুন..." : "Enter harvest condition, bag sizing, or pickup notes..."}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow transition active:scale-95"
              >
                {isBn ? 'মার্কেটপ্লেসে পোস্টটি প্রকাশ করুন' : 'Publish Produce Listing'}
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Modal: Buyer Send Offer / Inquiry (PRD 4.21) */}
      {offerModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 sm:p-6 max-h-[92vh] overflow-y-auto no-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? 'দর প্রস্তাব (Purchase Offer) পাঠান' : 'Send Purchase Offer'}
              </h3>
              <button onClick={() => setOfferModalListing(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-slate-900">{offerModalListing.productName}</div>
              <div className="text-slate-500">{isBn ? 'বিক্রেতা' : 'Seller'}: {offerModalListing.sellerName} ({offerModalListing.phone})</div>
              <div className="text-emerald-800 font-bold">{isBn ? 'চাওয়া দর' : 'Asking Rate'}: ৳ {offerModalListing.pricePerUnit} / {offerModalListing.unit}</div>
            </div>

            <form onSubmit={handleSendOfferSubmit} className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'প্রয়োজনীয় পরিমাণ:' : 'Required Quantity:'}
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={offerModalListing.quantity.toString()}
                    value={offerQuantity}
                    onChange={(e) => setOfferQuantity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isBn ? 'আপনার প্রস্তাবিত দর:' : 'Your Offer Rate:'}
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={offerModalListing.pricePerUnit.toString()}
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'বার্তা বা শর্তাদি:' : 'Message or Terms:'}
                </label>
                <textarea
                  rows="2"
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  placeholder={isBn ? "যেমন: আমরা ট্রাক পাঠাবো অথবা ক্যাশ অন পিকআপে নেব..." : "e.g. We will send a truck or pay cash on pickup..."}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition active:scale-95"
              >
                {isBn ? 'প্রস্তাব পাঠান' : 'Submit Offer'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Negotiation Counteroffer Thread */}
      {negotiationModalInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-5 sm:p-6 max-h-[92vh] overflow-y-auto no-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                {isBn ? 'কাউন্টার অফার ও বার্তা' : 'Counter Offer & Message'}
              </h3>
              <button onClick={() => setNegotiationModalInquiry(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'কাউন্টার দর (টাকা):' : 'Counter Rate (BDT):'}
                </label>
                <input
                  type="number"
                  placeholder="1620"
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'আপনার উত্তর:' : 'Your Message:'}
                </label>
                <textarea
                  rows="2"
                  placeholder={isBn ? "দর কিছুটা কমিয়ে চূড়ান্ত করা যেতে পারে..." : "We can finalize at this rate..."}
                  value={chatReplyText}
                  onChange={(e) => setChatReplyText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <button
                onClick={() => {
                  if (!chatReplyText) return;
                  replyInquiry(negotiationModalInquiry.id, chatReplyText, counterPriceInput);
                  setNegotiationModalInquiry(null);
                  setChatReplyText('');
                  setCounterPriceInput('');
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition active:scale-95"
              >
                {isBn ? 'কাউন্টার অফার পাঠিয়ে দিন' : 'Send Counter Offer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
