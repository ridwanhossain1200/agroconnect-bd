import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DISTRICTS } from '../data/bangladeshGeo';
import { useTranslation } from '../data/translations';
import { 
  Sprout, 
  Store, 
  Stethoscope, 
  ShieldCheck, 
  Bot, 
  Bell, 
  Wifi, 
  WifiOff, 
  MapPin, 
  PhoneCall, 
  Menu, 
  X,
  Languages,
  ChevronDown,
  User,
  Check,
  TrendingUp,
  Beef,
  Fish,
  ShoppingBag,
  Home
} from 'lucide-react';

export default function Navbar() {
  const { 
    lang, 
    setLang, 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab,
    selectedDistrict,
    setSelectedDistrict,
    notifications,
    setAiModalOpen,
    offlineMode,
    setOfflineMode,
    userProfile
  } = useApp();

  const { t, isBn } = useTranslation(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const roleDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles = [
    { id: 'farmer', nameBn: 'কৃষক / সেলার', nameEn: 'Farmer / Seller', icon: Sprout, color: 'text-emerald-700 bg-emerald-50 border-emerald-300' },
    { id: 'buyer', nameBn: 'পাইকারি ক্রেতা', nameEn: 'Wholesale Buyer', icon: Store, color: 'text-amber-800 bg-amber-50 border-amber-300' },
    { id: 'expert', nameBn: 'বিশেষজ্ঞ ডক্টর', nameEn: 'Certified Expert', icon: Stethoscope, color: 'text-blue-700 bg-blue-50 border-blue-300' },
    { id: 'admin', nameBn: 'অ্যাডমিন', nameEn: 'Admin Panel', icon: ShieldCheck, color: 'text-purple-700 bg-purple-50 border-purple-300' }
  ];

  const currentRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  const moduleTabs = [
    { id: 'dashboard', nameBn: 'ড্যাশবোর্ড', nameEn: 'Dashboard', icon: Home },
    { id: 'agriculture', nameBn: 'কৃষি ও ফসল', nameEn: 'Agriculture', icon: Sprout },
    { id: 'veterinary', nameBn: 'খামারি ও পশু', nameEn: 'Livestock', icon: Beef },
    { id: 'fisheries', nameBn: 'মৎস্য চাষ', nameEn: 'Fisheries', icon: Fish },
    { id: 'marketplace', nameBn: 'মার্কেটপ্লেস', nameEn: 'Marketplace', icon: ShoppingBag },
    { id: 'marketprices', nameBn: 'আজকের বাজারদর', nameEn: 'Market Prices', icon: TrendingUp },
    { id: 'expertportal', nameBn: 'বিশেষজ্ঞ পরামর্শ', nameEn: 'Consultations', icon: Stethoscope },
    { id: 'adminportal', nameBn: 'অ্যাডমিন পোর্টাল', nameEn: 'Admin', icon: ShieldCheck }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifMenu(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectRole = (roleId) => {
    setCurrentRole(roleId);
    setRoleDropdownOpen(false);
    if (roleId === 'expert') setActiveTab('expertportal');
    if (roleId === 'admin') setActiveTab('adminportal');
    if (roleId === 'buyer' && activeTab !== 'marketplace') setActiveTab('marketplace');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all select-none">
      
      {/* 1. Utility Top Bar: Emergency lines, District selector, Language & Offline */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] py-1 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Helplines */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
            <a 
              href="tel:16123" 
              className="flex items-center gap-1.5 hover:text-white transition font-medium"
              title="কৃষি কল সেন্টার বাংলাদেশ"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{isBn ? 'কৃষি কল সেন্টার:' : 'Agri Line:'} <strong className="text-white">১৬১২৩</strong></span>
            </a>

            <span className="text-emerald-800 hidden sm:inline">|</span>

            <a 
              href="tel:333" 
              className="hidden sm:flex items-center gap-1 hover:text-white transition text-emerald-300"
              title="জাতীয় প্রাণিসম্পদ ও সরকারি সেবা"
            >
              <span>{isBn ? 'প্রাণিসম্পদ:' : 'Livestock:'} <strong className="text-white">৩৩৩</strong></span>
            </a>
          </div>

          {/* Right: Location, Offline Toggle & Language */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* District Quick Select */}
            <div className="flex items-center gap-1 bg-emerald-900/80 hover:bg-emerald-800/90 px-2 py-0.5 rounded-lg border border-emerald-800/60 transition">
              <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-[11px] font-semibold text-emerald-100 focus:outline-none cursor-pointer max-w-[90px] sm:max-w-[130px] truncate"
                aria-label="জেলা নির্বাচন করুন"
              >
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id} className="text-slate-800 bg-white">
                    {isBn ? d.nameBn : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Offline Simulation Toggle */}
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold transition ${
                offlineMode 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800'
              }`}
              title={isBn ? "অফলাইন মোড টগল" : "Toggle Offline Simulation"}
            >
              {offlineMode ? <WifiOff className="w-3 h-3 text-white" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
              <span className="hidden xs:inline">{offlineMode ? (isBn ? 'অফলাইন' : 'Offline') : (isBn ? 'অনলাইন' : 'Online')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-[11px] border border-emerald-700/60 transition active:scale-95"
              title="Toggle Language"
            >
              <Languages className="w-3 h-3" />
              <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-emerald-950">
                  {isBn ? 'কৃষি সংযোগ' : 'AgroConnect'}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  BD
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 hidden xl:block font-medium">
                {t('brandSubtitle')}
              </p>
            </div>
          </div>

          {/* Role Switcher - Desktop (Wide Screen >= 1280px) */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    isSelected 
                      ? `${r.color} shadow-sm border font-bold` 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isBn ? r.nameBn : r.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Role Switcher - Compact Dropdown (Tablets & Medium Laptops: 768px - 1279px) */}
          <div className="hidden md:flex xl:hidden relative shrink-0" ref={roleDropdownRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-bold text-slate-800 transition"
            >
              <currentRoleObj.icon className="w-4 h-4 text-emerald-700" />
              <span className="max-w-[110px] truncate">{isBn ? currentRoleObj.nameBn : currentRoleObj.nameEn}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {roleDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50 animate-in fade-in">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">ভূমিকা পরিবর্তন করুন</div>
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = currentRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSelectRole(r.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition ${
                        isSelected ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{isBn ? r.nameBn : r.nameEn}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Actions: AI Assistant, Notifications, Profile, Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* AI Assistant Button */}
            <button
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-sm shadow-emerald-700/20 transition active:scale-95 animate-pulse"
              title={isBn ? "কৃষি মিত্র AI এর সাথে কথা বলুন" : "Chat with Krishi Mitra AI"}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{t('aiAssistant')}</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="নোটিফিকেশন দেখুন"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-800">{t('notifications')}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{unreadCount} {t('newNotifs')}</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition border border-slate-100 text-xs">
                        <div className="font-semibold text-slate-800 flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Mini Badge (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-90 transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300 shrink-0">
                  {userProfile.fullName ? userProfile.fullName.charAt(0) : 'র'}
                </div>
                <div className="leading-tight hidden md:block">
                  <span className="font-semibold text-slate-800 block truncate max-w-[85px] lg:max-w-[120px] text-xs">
                    {userProfile.fullName}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold capitalize block">
                    {isBn ? currentRoleObj.nameBn : currentRoleObj.nameEn}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs animate-in fade-in">
                  <div className="pb-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{userProfile.fullName}</p>
                    <p className="text-slate-500 text-[11px]">{userProfile.phone}</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                      {isBn ? currentRoleObj.nameBn : currentRoleObj.nameEn}
                    </span>
                  </div>
                  <div className="pt-2 space-y-1">
                    <button 
                      onClick={() => { setActiveTab('dashboard'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                    >
                      {t('tabDashboard')}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('marketplace'); setProfileDropdownOpen(false); }}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
                    >
                      {t('tabMarketplace')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition active:scale-95"
              aria-label="মেনু খুলুন"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* 3. Secondary Module Navigation Tabs (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-1 pt-2 border-t border-slate-100 mt-2 overflow-x-auto no-scrollbar">
          {moduleTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20 font-bold' 
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{isBn ? tab.nameBn : tab.nameEn}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 4. Full Mobile Slide-Over Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-200">
          
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl p-4 flex flex-col justify-between overflow-y-auto z-10">
            
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{t('brandName')}</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Mini Card in Drawer */}
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm border border-emerald-300">
                  {userProfile.fullName ? userProfile.fullName.charAt(0) : 'র'}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{userProfile.fullName}</h4>
                  <p className="text-[10px] text-slate-500">{userProfile.phone}</p>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                    {isBn ? currentRoleObj.nameBn : currentRoleObj.nameEn}
                  </span>
                </div>
              </div>

              {/* Role Selection Grid */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  {isBn ? 'আপনার ভূমিকা সিলেক্ট করুন:' : 'Select Your Role:'}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = currentRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          handleSelectRole(r.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-semibold border text-left transition ${
                          isSelected ? r.color : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{isBn ? r.nameBn : r.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Navigation Modules List */}
              <div className="mt-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  {isBn ? 'সকল সেবা মডিউল:' : 'All Service Modules:'}
                </span>
                <div className="space-y-1">
                  {moduleTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                          isActive 
                            ? 'bg-emerald-600 text-white font-bold shadow-sm' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{isBn ? tab.nameBn : tab.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
              <button
                onClick={() => {
                  setAiModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-sm"
              >
                <Bot className="w-4 h-4" />
                {t('btnAskAi')}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                <span>{selectedDistrict ? `${DISTRICTS.find(d => d.id === selectedDistrict)?.nameBn} জেলা` : 'বাংলাদেশ'}</span>
                <span className="font-semibold text-emerald-700">{offlineMode ? (isBn ? 'অফলাইন' : 'Offline') : (isBn ? 'অনলাইন' : 'Online')}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
