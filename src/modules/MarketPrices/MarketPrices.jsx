import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MARKET_PRICES } from '../../data/marketPricesData';
import { DISTRICTS } from '../../data/bangladeshGeo';
import { useTranslation } from '../../data/translations';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Search, 
  Filter, 
  Bell, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export default function MarketPrices() {
  const { addPriceAlert, setActiveTab, lang } = useApp();
  const { isBn } = useTranslation(lang);

  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const filteredPrices = MARKET_PRICES.filter((p) => {
    const matchSearch = (p.productNameBn && p.productNameBn.toLowerCase().includes(search.toLowerCase())) ||
                        (p.productNameEn && p.productNameEn.toLowerCase().includes(search.toLowerCase())) ||
                        (p.marketNameBn && p.marketNameBn.toLowerCase().includes(search.toLowerCase())) ||
                        (p.marketNameEn && p.marketNameEn.toLowerCase().includes(search.toLowerCase()));
    const matchSector = selectedSector === 'all' || p.sector === selectedSector;
    const matchDistrict = selectedDistrict === 'all' || p.district === selectedDistrict;
    return matchSearch && matchSector && matchDistrict;
  });

  const handleSetAlert = (p) => {
    addPriceAlert({
      productName: isBn ? p.productNameBn : (p.productNameEn || p.productNameBn),
      sector: p.sector,
      district: p.district,
      districtBn: p.districtBn,
      targetPrice: p.wholesalePrice,
      unit: p.unit,
      condition: 'at_or_above',
      conditionBn: isBn ? `দাম ৳${p.wholesalePrice} বা বেশি হলে` : `Price reaches ৳${p.wholesalePrice} or higher`
    });
    alert(isBn ? `"${p.productNameBn}" এর জন্য মূল্য সতর্কতা সক্রিয় করা হয়েছে!` : `Price alert activated for ${p.productNameEn || p.productNameBn}!`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" /> 
            {isBn ? 'গ্লোবাল সার্ভিস: আঞ্চলিক বাজারদর' : 'Market Intelligence: Daily Price Bulletin'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isBn ? 'আজকের আঞ্চলিক পাইকারি ও খুচরা বাজারদর' : 'Daily Regional Wholesale & Retail Market Rates'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'কৃষি বিপণন অধিদপ্তর (DAM) এবং দেশের প্রধান পাইকারি মোকামের রিয়েল-টাইম মূল্য ও ওঠানামা পর্যবেক্ষণ।'
              : 'Official daily wholesale commodity benchmarks from Department of Agricultural Marketing (DAM) and regional mokams.'}
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <span className="text-[11px] text-emerald-200 block">
            {isBn ? 'সর্বশেষ হালনাগাদ' : 'Last Updated'}
          </span>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full text-white inline-block mt-0.5">
            {isBn ? 'আজ সকাল ৯:৩০' : 'Today, 9:30 AM'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? "পণ্য বা মোকামের নাম দিয়ে খুঁজুন..." : "Search commodity or market hub..."}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full md:w-auto text-xs">
          {[
            { id: 'all', nameBn: 'সকল খাত', nameEn: 'All Sectors' },
            { id: 'agriculture', nameBn: 'কৃষি ও ফসল', nameEn: 'Crops' },
            { id: 'livestock', nameBn: 'খামারি ও পশু', nameEn: 'Livestock' },
            { id: 'fisheries', nameBn: 'মৎস্য', nameEn: 'Fisheries' }
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

        <div className="flex items-center gap-2 w-full md:w-auto">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer w-full"
          >
            <option value="all">{isBn ? 'সমগ্র বাংলাদেশ' : 'All Bangladesh'}</option>
            {DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>{isBn ? d.nameBn : d.nameEn}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Card View (< 768px) */}
      <div className="block md:hidden space-y-3">
        {filteredPrices.map((p) => {
          const isUp = p.trendDirection === 'up';
          return (
            <div key={p.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{isBn ? p.productNameBn : (p.productNameEn || p.productNameBn)}</h4>
                  <span className="text-[11px] text-slate-400">{p.variety}</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {p.priceTrend}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{isBn ? p.marketNameBn : (p.marketNameEn || p.marketNameBn)}, {p.districtBn}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{isBn ? 'পাইকারি দর' : 'Wholesale'}</span>
                  <div className="text-base font-black text-emerald-800">
                    ৳ {p.wholesalePrice.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                    <span className="text-xs font-normal text-slate-500"> /{p.unit}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{isBn ? 'খুচরা দর' : 'Retail'}</span>
                  <div className="text-base font-bold text-slate-700">
                    ৳ {p.retailPrice.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                    <span className="text-xs font-normal text-slate-400"> /{p.unit}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                <span className="truncate max-w-[180px]">{p.source} • {p.updatedAt}</span>
                <button
                  onClick={() => handleSetAlert(p)}
                  className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 px-2 py-1 rounded-lg bg-amber-50"
                >
                  <Bell className="w-3.5 h-3.5" />
                  {isBn ? 'সতর্কতা' : 'Alert'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Market Prices Table (>= 768px) */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs">
              <tr>
                <th className="p-4">{isBn ? 'পণ্য ও জাত' : 'Commodity & Variety'}</th>
                <th className="p-4">{isBn ? 'মোকাম / বাজার' : 'Market Hub'}</th>
                <th className="p-4 text-right">{isBn ? 'পাইকারি দর' : 'Wholesale Rate'}</th>
                <th className="p-4 text-right">{isBn ? 'খুচরা দর' : 'Retail Rate'}</th>
                <th className="p-4 text-center">{isBn ? 'বাজার প্রবণতা' : 'Trend'}</th>
                <th className="p-4">{isBn ? 'উৎস ও সময়' : 'Source & Time'}</th>
                <th className="p-4 text-center">{isBn ? 'অ্যালার্ট' : 'Alert'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPrices.map((p) => {
                const isUp = p.trendDirection === 'up';
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{isBn ? p.productNameBn : (p.productNameEn || p.productNameBn)}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{p.variety}</div>
                    </td>

                    <td className="p-4 text-slate-600">
                      <div className="font-semibold text-slate-800">{isBn ? p.marketNameBn : (p.marketNameEn || p.marketNameBn)}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {p.districtBn}
                      </div>
                    </td>

                    <td className="p-4 text-right font-black text-emerald-800 text-sm sm:text-base">
                      ৳ {p.wholesalePrice.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                      <span className="text-[10px] text-slate-500 font-normal block">/{p.unit}</span>
                    </td>

                    <td className="p-4 text-right font-semibold text-slate-600">
                      ৳ {p.retailPrice.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                      <span className="text-[10px] text-slate-400 font-normal block">/{p.unit}</span>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {p.priceTrend}
                      </span>
                    </td>

                    <td className="p-4 text-slate-500 text-xs">
                      <div className="font-medium text-slate-700">{p.source}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {p.updatedAt}
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleSetAlert(p)}
                        className="p-2 rounded-xl text-amber-700 hover:bg-amber-50 transition"
                        title={isBn ? "এই পণ্যের দাম বাড়লে অ্যালার্ট দিন" : "Set price notification alert"}
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPrices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-base text-slate-700">
            {isBn ? 'কোনো বাজারদর পাওয়া যায়নি' : 'No commodity rates found'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isBn ? 'অন্য কোনো নাম বা ফিল্টার নির্বাচন করুন।' : 'Try another commodity name or clear filters.'}
          </p>
        </div>
      )}

    </div>
  );
}
