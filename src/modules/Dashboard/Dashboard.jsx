import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getDistrictWeather } from '../../data/weatherData';
import { MARKET_PRICES } from '../../data/marketPricesData';
import { DISTRICTS } from '../../data/bangladeshGeo';
import { useTranslation } from '../../data/translations';
import { 
  Sprout, 
  Beef, 
  Fish, 
  ShoppingBag, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowUpRight, 
  Bot, 
  ShieldCheck, 
  MapPin,
  CloudSun,
  PlusCircle,
  RefreshCw,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const { 
    currentRole, 
    setActiveTab, 
    selectedDistrict, 
    setSelectedDistrict,
    userProfile, 
    listings, 
    setAiModalOpen,
    lang 
  } = useApp();

  const { t, isBn } = useTranslation(lang);
  const [weatherRefreshing, setWeatherRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);

  const weather = getDistrictWeather(selectedDistrict);
  const currentDistrictObj = DISTRICTS.find(d => d.id === selectedDistrict);
  const districtName = isBn ? (currentDistrictObj?.nameBn || 'দিনাজপুর') : (currentDistrictObj?.nameEn || 'Dinajpur');

  const handleRefreshWeather = () => {
    setWeatherRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setWeatherRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3000);
    }, 800);
  };

  // Helper for advisory severity styling
  const getSeverityBadge = (level) => {
    switch (level) {
      case 'high':
        return {
          cardBg: 'bg-rose-50/70 border-rose-200',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          iconColor: 'text-rose-600',
          label: isBn ? 'জরুরি সতর্কতা' : 'High Alert'
        };
      case 'medium':
        return {
          cardBg: 'bg-amber-50/70 border-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          iconColor: 'text-amber-600',
          label: isBn ? 'মাঝারি সতর্কতা' : 'Moderate'
        };
      default:
        return {
          cardBg: 'bg-emerald-50/70 border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          iconColor: 'text-emerald-600',
          label: isBn ? 'অনুকূল আবহাওয়া' : 'Favorable'
        };
    }
  };

  const agriStyle = getSeverityBadge(weather.alerts?.agri?.level);
  const vetStyle = getSeverityBadge(weather.alerts?.livestock?.level);
  const fishStyle = getSeverityBadge(weather.alerts?.fish?.level);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 sm:p-7 md:p-8 shadow-xl relative overflow-hidden border border-emerald-700/40">
        <div className="relative z-10 max-w-3xl">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold mb-3 border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t('heroTag')}</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {t('heroWelcome')}, {userProfile.fullName}!
          </h1>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
            {currentRole === 'farmer' && t('heroFarmerDesc')}
            {currentRole === 'buyer' && t('heroBuyerDesc')}
            {currentRole === 'expert' && t('heroExpertDesc')}
            {currentRole === 'admin' && t('heroAdminDesc')}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{currentRole === 'buyer' ? t('btnBuyProducts') : t('btnNewListing')}</span>
            </button>

            <button
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950/90 text-white border border-white/20 text-xs sm:text-sm font-semibold transition active:scale-95 backdrop-blur-sm"
            >
              <Bot className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{t('btnAskAi')}</span>
            </button>

            <button
              onClick={() => setActiveTab('marketprices')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700/90 text-emerald-100 hover:text-white text-xs sm:text-sm font-medium transition active:scale-95 border border-emerald-600/50"
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>{t('btnViewPrices')}</span>
            </button>
          </div>

        </div>

        {/* Decorative Background Element (hidden on small mobile to avoid obscuring text) */}
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none hidden md:block">
          <Sprout className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* 2. Weather Dashboard & Actionable Guidance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Real-time Weather Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-sm text-slate-800">{t('regionalWeather')}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                  {districtName} {isBn ? 'জেলা' : ''}
                </span>
                
                {/* Refresh weather button */}
                <button
                  onClick={handleRefreshWeather}
                  disabled={weatherRefreshing}
                  className="p-1 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-slate-100 transition"
                  title="আবহাওয়া তথ্য হালনাগাদ করুন"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${weatherRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Station Notice if mapped to regional hub */}
            {!weather.isDirectStation && (
              <div className="mt-2.5 p-2 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[10px] text-amber-900 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {isBn 
                    ? `${districtName} জেলার আঞ্চলিক তথ্য নিকটস্থ "${weather.stationName}" থেকে সিঙ্ক করা হয়েছে।` 
                    : `Station feed sourced from nearest observatory: "${weather.stationNameEn || weather.stationName}".`
                  }
                </span>
              </div>
            )}

            {/* Live Temperature & Condition */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {weather.temp}°C
                </div>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  {isBn ? weather.condition : weather.conditionEn}
                </p>
              </div>

              <div className="text-right text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <div>{t('weatherHumidity')}: <strong className="text-slate-900">{weather.humidity}</strong></div>
                <div>{t('weatherRain')}: <strong className="text-slate-900">{weather.rainProb}</strong></div>
                <div>{t('weatherWind')}: <strong className="text-slate-900">{weather.windSpeed}</strong></div>
              </div>
            </div>

            {/* Short Forecast Description */}
            <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-normal">
              {isBn ? weather.forecast : weather.forecastEn}
            </div>

          </div>

          {/* Card Footer: Accredited Source & Timestamp */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t('weatherSource')}</span>
            <span className="font-semibold text-emerald-800 text-[10px]">
              {isBn ? weather.lastUpdated : weather.lastUpdatedEn}
            </span>
          </div>
        </div>

        {/* Actionable Sector Recommendations with Severity Badges */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-sm text-slate-800">{t('advisoryTitle')}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{t('todayAction')}</span>
            </div>

            {/* 3 Sector Alert Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Agri Advisory */}
              <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${agriStyle.cardBg}`}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                      {isBn ? 'কৃষি ও ফসল' : 'Crops'}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${agriStyle.badge}`}>
                      {isBn ? weather.alerts?.agri?.levelLabelBn : weather.alerts?.agri?.levelLabelEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-1">
                    {isBn ? weather.alerts?.agri?.textBn : weather.alerts?.agri?.textEn}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('agriculture')}
                  className="mt-3 text-[11px] font-bold text-emerald-800 flex items-center gap-1 hover:underline"
                >
                  {isBn ? 'ফসল প্ল্যান দেখুন' : 'View Plan'} <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Livestock Advisory */}
              <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${vetStyle.cardBg}`}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                      <Beef className="w-4 h-4 text-purple-600" />
                      {isBn ? 'খামারি ও পশু' : 'Livestock'}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${vetStyle.badge}`}>
                      {isBn ? weather.alerts?.livestock?.levelLabelBn : weather.alerts?.livestock?.levelLabelEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-1">
                    {isBn ? weather.alerts?.livestock?.textBn : weather.alerts?.livestock?.textEn}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('veterinary')}
                  className="mt-3 text-[11px] font-bold text-purple-800 flex items-center gap-1 hover:underline"
                >
                  {isBn ? 'টিকা ক্যালেন্ডার' : 'Vaccine Chart'} <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Fisheries Advisory */}
              <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${fishStyle.cardBg}`}>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                      <Fish className="w-4 h-4 text-sky-600" />
                      {isBn ? 'মৎস্য চাষ' : 'Fisheries'}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${fishStyle.badge}`}>
                      {isBn ? weather.alerts?.fish?.levelLabelBn : weather.alerts?.fish?.levelLabelEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-1">
                    {isBn ? weather.alerts?.fish?.textBn : weather.alerts?.fish?.textEn}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('fisheries')}
                  className="mt-3 text-[11px] font-bold text-sky-800 flex items-center gap-1 hover:underline"
                >
                  {isBn ? 'পানির মান পরীক্ষা' : 'Water Quality'} <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-slate-400 text-right">
            {isBn ? '* আবহাওয়ার পূর্বাভাস ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE) তথ্যের ভিত্তিতে প্রণীত।' : '* Formulated based on BMD radar and DAE agro-advisory guidelines.'}
          </div>
        </div>

      </div>

      {/* 3. Four Core Business Modules Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">{t('modulesTitle')}</h2>
          <span className="text-xs text-slate-500 font-medium">{t('modulesCount')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Module 1: Agriculture */}
          <div 
            onClick={() => setActiveTab('agriculture')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-sm">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('modAgriTitle')}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {t('modAgriDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{t('enter')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </div>

          {/* Module 2: Livestock */}
          <div 
            onClick={() => setActiveTab('veterinary')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 hover:border-purple-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-sm">
                <Beef className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-700 transition">
                {t('modVetTitle')}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {t('modVetDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>{t('enter')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </div>

          {/* Module 3: Fisheries */}
          <div 
            onClick={() => setActiveTab('fisheries')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 hover:border-sky-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-sm">
                <Fish className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition">
                {t('modFishTitle')}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {t('modFishDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>{t('enter')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </div>

          {/* Module 4: Marketplace */}
          <div 
            onClick={() => setActiveTab('marketplace')}
            className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition shadow-sm">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition">
                {t('modMarketTitle')}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {t('modMarketDesc')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{t('enter')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Live Market Price Ticker Preview & Active Produce Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Market Price Ticker */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-sm text-slate-800">{t('marketPriceTicker')}</span>
              </div>
              <button 
                onClick={() => setActiveTab('marketprices')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                {t('viewAll')}
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {MARKET_PRICES.slice(0, 4).map((p) => {
                const isUp = p.trendDirection === 'up';
                return (
                  <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{isBn ? p.productNameBn : p.productNameEn}</div>
                      <div className="text-[10px] text-slate-400">{p.marketNameBn.split(',')[0]}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">৳ {p.wholesalePrice} / {isBn ? p.unit : p.unitEn}</div>
                      <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${
                        isUp ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {p.priceTrend}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              {isBn ? 'উৎস: কৃষি বিপণন অধিদপ্তর (DAM)' : 'Source: Dept of Agricultural Marketing (DAM)'}
            </span>
          </div>
        </div>

        {/* Featured Produce Listings from Farmers */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-800">{t('directListings')}</h3>
              <p className="text-[11px] text-slate-400">{t('directListingsSubtitle')}</p>
            </div>
            <button 
              onClick={() => setActiveTab('marketplace')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              {t('viewAll')} ({listings.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {listings.slice(0, 2).map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveTab('marketplace')}
                className="group cursor-pointer rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.productName} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                  />
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.sectorBn}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow">
                    ৳ {item.pricePerUnit} / {item.unit}
                  </span>
                </div>

                <div className="p-3.5">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition">
                    {item.productName}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {item.districtBn}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {t('stockAvailable')}: {item.quantity} {item.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
