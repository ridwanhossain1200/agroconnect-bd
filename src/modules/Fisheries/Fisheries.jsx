import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FISH_SPECIES, 
  WATER_QUALITY_STANDARDS, 
  calculateStocking, 
  calculateFishFeed, 
  HATCHERY_DIRECTORY 
} from '../../data/fisheriesData';
import { EXPERT_DIRECTORY } from '../../data/expertDirectory';
import { useTranslation } from '../../data/translations';
import { 
  Fish, 
  Calculator, 
  Activity, 
  Building2, 
  CheckCircle2, 
  Phone, 
  Droplet,
  Stethoscope
} from 'lucide-react';

export default function Fisheries() {
  const { setActiveTab, setAiModalOpen, lang } = useApp();
  const { isBn } = useTranslation(lang);

  const [activeSubTab, setActiveSubTab] = useState('stocking'); // 'stocking', 'water', 'feeding', 'hatchery'

  // Stocking Calculator state
  const [pondArea, setPondArea] = useState('50'); // 50 decimals
  const [pondDepth, setPondDepth] = useState('5.5'); // 5.5 feet
  const [cultureType, setCultureType] = useState('polyculture_carp'); // 'polyculture_carp' | 'monoculture_tilapia'

  // Water Quality inputs
  const [waterPh, setWaterPh] = useState(7.4);
  const [waterDo, setWaterDo] = useState(6.2);
  const [waterAmmonia, setWaterAmmonia] = useState(0.01);
  const [waterTemp, setWaterTemp] = useState(28);

  // Feeding Calculator state
  const [fishCount, setFishCount] = useState('1750');
  const [avgFishGrams, setAvgFishGrams] = useState('350');
  const [feedingRate, setFeedingRate] = useState('3.5');

  const stockingResult = calculateStocking(pondArea, pondDepth, cultureType);
  const feedResult = calculateFishFeed(fishCount, avgFishGrams, feedingRate);

  const subTabs = [
    { id: 'stocking', nameBn: 'পোনা মজুত হার ক্যালকুলেটর', nameEn: 'Stocking Density', icon: Calculator },
    { id: 'water', nameBn: 'পানির গুণাগুণ (Water Quality)', nameEn: 'Water Quality', icon: Activity },
    { id: 'feeding', nameBn: 'দৈনিক খাদ্য ও বায়োমাস', nameEn: 'Biomass Feeding', icon: Droplet },
    { id: 'hatchery', nameBn: 'যাচাইকৃত হ্যাচারি ডিরেক্টরি', nameEn: 'Verified Hatcheries', icon: Building2 }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-950 via-sky-900 to-teal-900 text-white p-5 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-sky-800/40">
        <div>
          <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Fish className="w-4 h-4" /> {isBn ? 'মডিউল ৩: মৎস্য ও একুয়াকালচার' : 'Module 3: Fisheries & Aquaculture'}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            {isBn ? 'আধুনিক মৎস্য চাষ ও পুকুর ব্যবস্থাপনা' : 'Modern Aquaculture & Pond Management'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'পুকুরের আয়তন অনুযায়ী পোনা মজুত হার, পানির গুণাগুণ ট্র্যাকার, বায়োমাসভিত্তিক খাদ্য হিসাব এবং বিশ্বস্ত হ্যাচারি সংযোগ।'
              : 'Scientific fingerling stocking ratios, water quality monitoring, biomass feeding, and verified hatchery directory.'
            }
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('expertportal')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-sky-950 font-bold text-xs shadow-md hover:bg-sky-50 transition active:scale-95"
          >
            <Stethoscope className="w-4 h-4 text-sky-700" />
            <span>{isBn ? 'মৎস্য বিশেষজ্ঞ পরামর্শ' : 'Consult Fisheries Expert'}</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition shrink-0 ${
                isActive
                  ? 'bg-sky-800 text-white shadow-md shadow-sky-800/20'
                  : 'bg-white text-slate-600 hover:text-sky-900 hover:bg-sky-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isBn ? tab.nameBn : tab.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Stocking Density Calculator (PRD 4.12 & 4.13) */}
      {activeSubTab === 'stocking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Input Panel */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-700" />
              <span>{isBn ? 'পুকুরের আয়তন ও ধরন' : 'Pond Dimensions'}</span>
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'পুকুরের আয়তন (শতাংশ / ডেসিমাল):' : 'Pond Area (Decimals):'}
              </label>
              <input
                type="number"
                value={pondArea}
                onChange={(e) => setPondArea(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'গড় পানির গভীরতা (ফুট):' : 'Avg Water Depth (Feet):'}
              </label>
              <input
                type="number"
                step="0.5"
                value={pondDepth}
                onChange={(e) => setPondDepth(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'চাষের পদ্ধতি:' : 'Culture System:'}
              </label>
              <select
                value={cultureType}
                onChange={(e) => setCultureType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800"
              >
                <option value="polyculture_carp">{isBn ? 'মিশ্র কার্প চাষ (রুই, কাতলা, মৃগেল, কার্প)' : 'Polyculture Composite Carp'}</option>
                <option value="monoculture_tilapia">{isBn ? 'বাণিজ্যিক মনোসেক্স তেলাপিয়া চাষ' : 'Monoculture Tilapia'}</option>
              </select>
            </div>

            {/* Preparation inputs */}
            <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-1">
              <span className="font-bold block">{isBn ? 'পুকুর প্রস্তুতি উপকরণ:' : 'Preparation Inputs:'}</span>
              <p>• {isBn ? 'চুন প্রয়োজন:' : 'Lime Needed:'} <span className="font-bold">{stockingResult.limeRequirementKg} {isBn ? 'কেজি' : 'Kg'}</span></p>
              <p>• {isBn ? 'পচা গোবর:' : 'Cowdung Needed:'} <span className="font-bold">{stockingResult.cowdungRequirementKg} {isBn ? 'কেজি' : 'Kg'}</span></p>
            </div>

            <div className="text-[10px] text-slate-400">
              * মৎস্য অধিদপ্তর (DoF) ও বাংলাদেশ মৎস্য গবেষণা ইনস্টিটিউট (BFRI) সুপারিশমালা।
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {isBn ? 'সুপারিশকৃত পোনা মজুত অনুপাত' : 'Recommended Stocking Density'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{stockingResult.cultureTypeBn}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{isBn ? 'মোট পোনা প্রয়োজন' : 'Total Fingerlings'}</span>
                  <span className="text-lg sm:text-xl font-black text-sky-800">{stockingResult.totalFingerlings} {isBn ? 'টি' : 'Pcs'}</span>
                </div>
              </div>

              {/* Species Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {stockingResult.breakdown.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-800">{item.name}</div>
                      <span className="text-[10px] text-slate-400">{isBn ? 'অনুপাত:' : 'Ratio:'} {item.percentage}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-sky-900">{item.count}</span>
                      <span className="text-xs font-semibold text-slate-500 ml-1">{isBn ? 'টি' : 'pcs'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                <span className="font-bold block mb-1">{isBn ? 'মজুত নির্দেশিকা:' : 'Stocking Guidelines:'}</span>
                {stockingResult.advice}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-500">{isBn ? 'সুস্থ পোনা সংগ্রহ করতে হ্যাচারি দেখুন' : 'Source certified fingerlings'}</span>
              <button
                onClick={() => setActiveSubTab('hatchery')}
                className="px-3.5 py-1.5 rounded-xl bg-sky-800 text-white font-bold text-xs hover:bg-sky-900 transition"
              >
                {isBn ? 'যাচাইকৃত হ্যাচারি তালিকা →' : 'Verified Hatcheries →'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 2. Water Quality Monitoring (PRD 4.14) */}
      {activeSubTab === 'water' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? 'পুকুরের পানির গুণাগুণ বিশ্লেষণ ও রিয়েল-টাইম সতর্কবার্তা' : 'Water Quality Parameters & Health Alert'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? 'pH, অ্যামোনিয়া ও দ্রবীভূত অক্সিজেন মাত্রা ঠিক রাখলে মাছের বৃদ্ধি দ্বিগুণ হয়।' : 'Maintaining optimal pH, ammonia, and dissolved oxygen maximizes fish growth.'}
              </p>
            </div>
            <button
              onClick={() => alert(isBn ? 'পানির বর্তমান টেস্ট রিপোর্ট পুকুরের স্বাস্থ্য রেকর্ডে সংরক্ষিত হয়েছে!' : 'Water test report logged!')}
              className="px-4 py-2 rounded-xl bg-sky-800 text-white font-bold text-xs shadow hover:bg-sky-900 transition shrink-0"
            >
              {isBn ? 'রেকর্ড সংরক্ষণ করুন' : 'Log Water Test'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* pH */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-500">পানির অম্লতা (pH)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  waterPh >= 6.5 && waterPh <= 8.5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {waterPh >= 6.5 && waterPh <= 8.5 ? (isBn ? 'আদর্শ' : 'Optimal') : (isBn ? 'সতর্কতা' : 'Warning')}
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">{waterPh}</div>
              <input
                type="range"
                min="5"
                max="10"
                step="0.1"
                value={waterPh}
                onChange={(e) => setWaterPh(parseFloat(e.target.value))}
                className="w-full accent-sky-600"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                {waterPh < 6.5 ? WATER_QUALITY_STANDARDS.ph.warningLow : waterPh > 8.5 ? WATER_QUALITY_STANDARDS.ph.warningHigh : WATER_QUALITY_STANDARDS.ph.idealDesc}
              </p>
            </div>

            {/* DO (Dissolved Oxygen) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-500">অক্সিজেন (DO)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  waterDo >= 5.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {waterDo >= 5.0 ? (isBn ? 'উত্তম' : 'Optimal') : (isBn ? 'বিপদজনক' : 'Critical')}
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">{waterDo} <span className="text-sm font-semibold text-slate-400">mg/L</span></div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={waterDo}
                onChange={(e) => setWaterDo(parseFloat(e.target.value))}
                className="w-full accent-sky-600"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                {waterDo < 4.0 ? WATER_QUALITY_STANDARDS.do.warningLow : WATER_QUALITY_STANDARDS.do.idealDesc}
              </p>
            </div>

            {/* Ammonia */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-500">অ্যামোনিয়া (NH3)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  waterAmmonia <= 0.05 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {waterAmmonia <= 0.05 ? (isBn ? 'নিরাপদ' : 'Safe') : (isBn ? 'বিষাক্ত' : 'Toxic')}
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">{waterAmmonia} <span className="text-sm font-semibold text-slate-400">mg/L</span></div>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={waterAmmonia}
                onChange={(e) => setWaterAmmonia(parseFloat(e.target.value))}
                className="w-full accent-sky-600"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                {waterAmmonia > 0.05 ? WATER_QUALITY_STANDARDS.ammonia.warningHigh : WATER_QUALITY_STANDARDS.ammonia.idealDesc}
              </p>
            </div>

            {/* Water Temperature */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-500">পানির তাপমাত্রা</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {isBn ? 'স্বাভাবিক' : 'Normal'}
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900">{waterTemp}°C</div>
              <input
                type="range"
                min="15"
                max="40"
                step="1"
                value={waterTemp}
                onChange={(e) => setWaterTemp(parseInt(e.target.value))}
                className="w-full accent-sky-600"
              />
              <p className="text-[11px] text-slate-500 leading-tight">
                {WATER_QUALITY_STANDARDS.temp.idealDesc}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 3. Daily Feeding Management (PRD 4.14) */}
      {activeSubTab === 'feeding' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-sky-700" />
              <span>{isBn ? 'বায়োমাস ও খাদ্য হিসাব' : 'Biomass & Feed Calculator'}</span>
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'পুকুরে আনুমানিক জীবিত মাছের সংখ্যা:' : 'Total Fish Count in Pond:'}
              </label>
              <input
                type="number"
                value={fishCount}
                onChange={(e) => setFishCount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'মাছের বর্তমান গড় ওজন (গ্রাম):' : 'Current Avg Weight (Grams):'}
              </label>
              <input
                type="number"
                value={avgFishGrams}
                onChange={(e) => setAvgFishGrams(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'দৈনিক খাদ্য হার (শারীরিক ওজনের %):' : 'Daily Feeding Rate (% Body Wt):'}
              </label>
              <select
                value={feedingRate}
                onChange={(e) => setFeedingRate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800"
              >
                <option value="4.5">৪.৫% (ছোট পোনা পর্যায়: ৫০-১০০ গ্রাম)</option>
                <option value="3.5">৩.৫% (মাঝারি বৃদ্ধি পর্যায়: ১০০-৪০০ গ্রাম)</option>
                <option value="2.5">২.৫% (বড় মাছ পর্যায়: ৫০০ গ্রাম+)</option>
                <option value="1.5">১.৫% (শীতকালে কম খাদ্য গ্রহণ)</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                {isBn ? 'দৈনিক সুষম খাদ্য বণ্টন ফলাফল' : 'Feed Ration Distribution Results'}
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                  <span className="text-xs font-bold text-sky-700 uppercase">{isBn ? 'মোট মাছের বায়োমাস:' : 'Total Biomass:'}</span>
                  <div className="text-xl sm:text-2xl font-black text-sky-950 mt-1">{feedResult.totalBiomassKg} {isBn ? 'কেজি' : 'Kg'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-700 uppercase">{isBn ? 'দৈনিক মোট ফিড:' : 'Daily Feed:'}</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">{feedResult.dailyFeedKg} {isBn ? 'কেজি' : 'Kg'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                  <span className="text-xs font-bold text-purple-700 uppercase">{isBn ? 'দুই কিস্তিতে বিতরণ:' : 'Split Dose:'}</span>
                  <div className="text-xs font-bold text-purple-950 mt-1">সকাল: {feedResult.morningDoseKg} কেজি</div>
                  <div className="text-xs font-bold text-purple-950">বিকাল: {feedResult.eveningDoseKg} কেজি</div>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
                <span className="font-bold text-slate-800 block">খাবার দেওয়ার সঠিক নিয়ম:</span>
                <p>• মেঘলা আবহাওয়ায় বা বৃষ্টি চলাকালীন খাবারের পরিমাণ ৩০-৫০% কমিয়ে দিন।</p>
                <p>• ভাসমান ফিড দেওয়ার ২০ মিনিট পর ট্রে পরীক্ষা করে দেখুন সব খাবার শেষ হয়েছে কিনা।</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
              * অতিরিক্ত খাদ্য পানিতে তলিয়ে অ্যামোনিয়া গ্যাস বৃদ্ধি করে, তাই অতিরিক্ত খাদ্য দেওয়া পরিহার করুন।
            </div>
          </div>
        </div>
      )}

      {/* 4. Verified Hatchery Directory (PRD 4.13) */}
      {activeSubTab === 'hatchery' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-bold text-base text-slate-900">
              {isBn ? 'বাংলাদেশ সরকার অনুমোদিত ও যাচাইকৃত পোনা হ্যাচারি তালিকা' : 'Approved Fingerling Hatcheries Directory'}
            </h3>
            <span className="text-xs text-slate-500 font-semibold">৩টি শীর্ষ প্রতিষ্ঠান</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HATCHERY_DIRECTORY.map((hatch) => (
              <div key={hatch.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {isBn ? 'যাচাইকৃত' : 'Verified'}
                    </span>
                    <span className="text-xs font-bold text-amber-600">★ {hatch.rating}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mt-2">{hatch.nameBn}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{isBn ? 'মালিক:' : 'Proprietor:'} {hatch.owner}</p>
                  <p className="text-xs text-sky-800 font-semibold mt-1">স্থান: {hatch.district}, {hatch.upazila}</p>

                  <div className="mt-3">
                    <span className="text-[11px] font-semibold text-slate-700 block mb-1">উপলব্ধ পোনা:</span>
                    <div className="flex flex-wrap gap-1">
                      {hatch.availableSpecies.map((sp, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    {hatch.priceNote}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={`tel:${hatch.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isBn ? `যোগাযোগ করুন (${hatch.phone})` : `Call Hatchery (${hatch.phone})`}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
