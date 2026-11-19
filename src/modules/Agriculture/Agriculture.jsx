import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CROPS, calculateFertilizer } from '../../data/cropCatalog';
import { LAND_UNITS, DISTRICTS } from '../../data/bangladeshGeo';
import { EXPERT_DIRECTORY } from '../../data/expertDirectory';
import { useTranslation } from '../../data/translations';
import { 
  Sprout, 
  Calculator, 
  Bug, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Droplets,
  Stethoscope,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Agriculture() {
  const { userProfile, setUserProfile, setActiveTab, setAiModalOpen, lang } = useApp();
  const { isBn } = useTranslation(lang);

  // Sub-tabs inside Agriculture module
  const [activeSubTab, setActiveSubTab] = useState('calculator'); // 'calculator', 'diagnostic', 'calendar', 'setup'

  // Fertilizer calculator state
  const [selectedCropId, setSelectedCropId] = useState('crop-potato');
  const [landArea, setLandArea] = useState('33'); // default 1 bigha / 33 decimals
  const [landUnit, setLandUnit] = useState('decimal');
  const [soilType, setSoilType] = useState('বেলে দোআঁশ');

  // Crop Calendar Tasks state
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'জমি তৈরি ও শেষ চাষে গোবর এবং টিএসপি সার প্রয়োগ', titleEn: 'Land preparation and base manure/TSP application', due: 'আজকের কাজ', done: true, stage: 'জমি তৈরি' },
    { id: 't2', title: 'আলুর বীজ বপন ও সারি তৈরি (লাইন থেকে লাইন ৬০ সেমি)', titleEn: 'Seed tuber planting with 60cm row spacing', due: 'আগামীকাল', done: true, stage: 'বপন' },
    { id: 't3', title: '১ম হালকা সেচ ও আগাছা দমন', titleEn: '1st light irrigation and weeding', due: '৩ দিন পর', done: false, stage: 'সেচ' },
    { id: 't4', title: 'গাছের বয়স ২৫ দিন: ইউরিয়া উপরিপ্রয়োগ ও গোড়ায় মাটি তোলা', titleEn: 'At 25 days: Urea top-dressing and earthing up', due: '১০ দিন পর', done: false, stage: 'সার' },
    { id: 't5', title: 'কুয়াশায় লেইট ব্লাইট প্রতিরোধে ম্যানকোজেব স্প্রে', titleEn: 'Preventive Mancozeb spray against late blight', due: '১৫ দিন পর', done: false, stage: 'বালাই দমন' }
  ]);

  const fertResult = calculateFertilizer(selectedCropId, landArea, landUnit);
  const currentCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const subTabs = [
    { id: 'calculator', nameBn: 'স্মার্ট সার ক্যালকুলেটর', nameEn: 'Fertilizer Calculator', icon: Calculator },
    { id: 'diagnostic', nameBn: 'রোগ ও বালাই নির্দেশিকা', nameEn: 'Pest & Disease Guide', icon: Bug },
    { id: 'calendar', nameBn: 'ফসলের ক্যালেন্ডার ও রিমাইন্ডার', nameEn: 'Crop Calendar', icon: Calendar },
    { id: 'setup', nameBn: 'জমি ও পরিবেশ প্রোফাইল', nameEn: 'Land Profile', icon: Layers }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Module Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 text-white p-5 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-700/40">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4" /> {isBn ? 'মডিউল ১: কৃষি ও মাঠ ফসল' : 'Module 1: Agriculture & Crops'}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            {isBn ? 'স্মার্ট কৃষি ব্যবস্থাপনা ও প্রযুক্তি' : 'Smart Agriculture & Crop Management'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'মাটির ধরন ও জমির পরিমাণ অনুযায়ী বৈজ্ঞানিক সার ক্যালকুলেটর, বালাই দমন পরামর্শ এবং ফসলের স্বয়ংক্রিয় কাজের ক্যালেন্ডার।'
              : 'Scientific fertilizer calculator based on soil and acreage, pest troubleshooting, and automated crop calendars.'
            }
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('expertportal')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow-md hover:bg-emerald-50 transition active:scale-95"
          >
            <Stethoscope className="w-4 h-4 text-emerald-700" />
            <span>{isBn ? 'কৃষিবিদ পরামর্শ নিন' : 'Consult Agronomist'}</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Navigation Buttons */}
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
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'bg-white text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isBn ? tab.nameBn : tab.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Smart Fertilizer Calculator (PRD 4.2 & SAD 3.1) */}
      {activeSubTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Input Panel */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>{isBn ? 'জমির তথ্য দিন' : 'Enter Land Details'}</span>
            </h3>

            {/* Select Crop */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'ফসল নির্বাচন করুন:' : 'Select Crop:'}
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isBn ? c.nameBn : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Land Area and Unit */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {isBn ? 'জমির পরিমাণ:' : 'Land Area:'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {isBn ? 'পরিমাপের একক:' : 'Unit:'}
                </label>
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {LAND_UNITS.map((u) => (
                    <option key={u.id} value={u.id}>
                      {isBn ? u.nameBn : u.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Soil Type */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'মাটির ধরন:' : 'Soil Type:'}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
              >
                <option value="বেলে দোআঁশ">{isBn ? 'বেলে দোআঁশ (আলু ও শাকসবজি)' : 'Sandy Loam'}</option>
                <option value="দোআঁশ">{isBn ? 'দোআঁশ (সার্বজনীন উর্বর মাটি)' : 'Loam'}</option>
                <option value="এঁটেল দোআঁশ">{isBn ? 'এঁটেল দোআঁশ (ধান চাষ উপযোগী)' : 'Clay Loam'}</option>
                <option value="পলি মাটি">{isBn ? 'পলি মাটি (চরে রবি ফসল)' : 'Silt Loam'}</option>
              </select>
            </div>

            {/* Crop Info Mini Box */}
            <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold">{isBn ? currentCrop.nameBn : currentCrop.nameEn}</div>
              <p>• {isBn ? 'উপযুক্ত মৌসুম:' : 'Season:'} {currentCrop.suitableSeasons.join(', ')}</p>
              <p>• {isBn ? 'জীবনকাল:' : 'Duration:'} প্রায় {currentCrop.durationDays} দিন</p>
              <p>• {isBn ? 'প্রত্যাশিত ফলন:' : 'Yield:'} প্রতি শতাংশে {currentCrop.expectedYieldPerDecimal}</p>
            </div>

            <div className="text-[10px] text-slate-400">
              * বিএআরআই (BARI) ও বিআরআরআই (BRRI) এর অনুমোদিত সার সুপারিশমালা ফ্রেমওয়ার্ক অনুযায়ী নির্ধারিত।
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {isBn ? 'সুপারিশকৃত সারের পরিমাণ ও আনুমানিক ব্যয়' : 'Recommended Fertilizer Dosage & Est. Cost'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isBn ? 'মোট হিসাবকৃত আয়তন:' : 'Calculated Area:'} <span className="font-bold text-emerald-800">{fertResult.decimalArea} {isBn ? 'শতাংশ' : 'Decimals'}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{isBn ? 'আনুমানিক সরকারি ভর্তুকি মূল্য' : 'Subsidized Est. Cost'}</span>
                  <span className="text-base sm:text-lg font-black text-emerald-800">৳ {fertResult.totalEstCost}</span>
                </div>
              </div>

              {/* Fertilizer Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-4">
                
                {/* Urea */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500">{isBn ? 'ইউরিয়া (নাইট্রোজেন)' : 'Urea (N)'}</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">{fertResult.ureaKg} <span className="text-xs font-semibold">{isBn ? 'কেজি' : 'Kg'}</span></div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">৳ {fertResult.ureaCost}</div>
                </div>

                {/* TSP */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500">{isBn ? 'টিএসপি (ফসফরাস)' : 'TSP (P)'}</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">{fertResult.tspKg} <span className="text-xs font-semibold">{isBn ? 'কেজি' : 'Kg'}</span></div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">৳ {fertResult.tspCost}</div>
                </div>

                {/* MOP */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500">{isBn ? 'এমওপি (পটাশ)' : 'MOP (K)'}</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">{fertResult.mopKg} <span className="text-xs font-semibold">{isBn ? 'কেজি' : 'Kg'}</span></div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">৳ {fertResult.mopCost}</div>
                </div>

                {/* Gypsum */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500">{isBn ? 'জিপসাম (সালফার)' : 'Gypsum (S)'}</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">{fertResult.gypsumKg} <span className="text-xs font-semibold">{isBn ? 'কেজি' : 'Kg'}</span></div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-1">৳ {fertResult.gypsumCost}</div>
                </div>

              </div>

              {/* Application Schedule Timeline (FR-AGR-08) */}
              <div className="mt-6">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                  {isBn ? 'কিস্তিতে সার প্রয়োগের সঠিক সময়সূচি:' : 'Application Split Schedule:'}
                </h4>
                <div className="space-y-2.5">
                  {fertResult.applicationSchedule.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{step.stage}</div>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">{step.fertilizer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                {isBn ? 'সারের সুষম ব্যবহার মাটির উর্বরতা রক্ষা করে এবং অতিরিক্ত খরচ সাশ্রয় করে।' : 'Balanced fertilizer usage preserves soil health and saves input costs.'}
              </span>
              <button
                onClick={() => alert(isBn ? 'সার প্রয়োগ পরিকল্পনাটি আপনার অ্যাকাউন্টে সফলভাবে সেভ করা হয়েছে!' : 'Fertilizer plan saved to your profile!')}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition shadow-sm shrink-0"
              >
                {isBn ? 'প্ল্যান সংরক্ষণ' : 'Save Plan'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 2. Disease & Pest Diagnostic (PRD 4.3) */}
      {activeSubTab === 'diagnostic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? 'ফসলের রোগবালাই ও কীটশত্রু ট্রাবলশুটিং' : 'Crop Pest & Disease Diagnostic'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? 'লক্ষণ দেখে সমস্যা চিহ্নিত করুন এবং নিরাপদ জৈব ও অনুমোদিত রাসায়নিক প্রতিকার জানুন।' : 'Identify field problems by symptoms and apply verified remedies.'}
              </p>
            </div>

            <button
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow hover:opacity-95 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isBn ? 'AI রোগ নির্ণয় ক্যামেরা' : 'AI Diagnostic Camera'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCrop.diseases.map((dis, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-3xl border transition ${
                  dis.urgency === 'critical'
                    ? 'bg-rose-50/40 border-rose-300'
                    : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{dis.nameBn}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    dis.urgency === 'critical'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {dis.urgency === 'critical' ? (isBn ? 'মহামারী ও জরুরি' : 'Critical Outbreak') : (isBn ? 'সাধারণ বালাই' : 'Common Pest')}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700">{isBn ? 'দৃশ্যমান লক্ষণ:' : 'Symptoms:'}</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{dis.symptoms}</p>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-800">{isBn ? 'জৈব / প্রাকৃতিক প্রতিরোধ:' : 'Organic Control:'}</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{dis.organicTreatment}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">{isBn ? 'অনুমোদিত সমাধান (কৃষি সম্প্রসারণ অধিদপ্তর):' : 'Chemical Guidance:'}</span>
                    <p className="text-slate-700 font-medium mt-0.5 leading-relaxed">{dis.chemicalTreatment}</p>
                  </div>
                </div>

                {dis.urgency === 'critical' && (
                  <div className="mt-4 pt-3 border-t border-rose-200 flex items-center justify-between">
                    <span className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> {isBn ? 'তাৎক্ষণিক বিশেষজ্ঞ পরামর্শ প্রয়োজন' : 'Expert Escalation Required'}
                    </span>
                    <button
                      onClick={() => setActiveTab('expertportal')}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                    >
                      {isBn ? 'ডাক্তার ডাকুন' : 'Call Doctor'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Crop Calendar & Reminders (PRD 4.4) */}
      {activeSubTab === 'calendar' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? currentCrop.nameBn : currentCrop.nameEn} - {isBn ? 'ফসলের পরিচর্যা ক্যালেন্ডার' : 'Crop Activity Calendar'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? 'বপন থেকে ফসল তোলা পর্যন্ত ধাপে ধাপে স্বয়ংক্রিয় রিমাইন্ডার ও সম্পন্ন করার ট্র্যাকার।' : 'Automated stage-by-stage task reminders from sowing to harvest.'}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {isBn ? 'রবি মৌসুম ২০২৬' : 'Rabi Season 2026'}
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition ${
                  task.done 
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition shrink-0 ${
                    task.done ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                  }`}>
                    {task.done && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                  <div>
                    <span className={`text-xs sm:text-sm font-semibold ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {isBn ? task.title : (task.titleEn || task.title)}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] sm:text-[11px] text-slate-500">
                      <span className="bg-slate-200/80 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700">{task.stage}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.due}</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[11px] sm:text-xs font-bold shrink-0 ${task.done ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {task.done ? (isBn ? 'সম্পন্ন' : 'Done') : (isBn ? 'বাকি আছে' : 'Pending')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            {isBn ? 'মোবাইলে পুশ নোটিফিকেশন ও এসএমএস এর মাধ্যমে প্রতিদিনের কাজের অ্যালার্ট পাঠানো হয়।' : 'Task alerts delivered via push notifications and SMS.'}
          </div>
        </div>
      )}

      {/* 4. Land & Environment Profile Setup (PRD 4.1) */}
      {activeSubTab === 'setup' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm max-w-2xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>{isBn ? 'কৃষকের জমি ও পরিবেশ প্রোফাইল' : 'Land & Environment Setup'}</span>
          </h3>
          <p className="text-xs text-slate-500">
            {isBn ? 'আপনার জমির আকার, মাটি ও সেচের ধরন অনুযায়ী প্ল্যাটফর্মের সকল এআই অ্যালগরিদম ও ক্যালকুলেটর পারসোনালাইজড হবে।' : 'Platform recommendation engine personalizes calculations to your specific land setup.'}
          </p>

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {isBn ? 'মোট আবাদি জমি (শতাংশ):' : 'Total Cultivable Land (Decimals):'}
              </label>
              <input
                type="number"
                defaultValue={userProfile.farmProfiles.agri.landSize}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {isBn ? 'প্রধান পানির উৎস:' : 'Primary Irrigation Source:'}
              </label>
              <input
                type="text"
                defaultValue={userProfile.farmProfiles.agri.waterSource}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>

            <button
              onClick={() => alert(isBn ? 'জমি ও পরিবেশ প্রোফাইল সফলভাবে আপডেট হয়েছে!' : 'Land profile updated successfully!')}
              className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition shadow"
            >
              {isBn ? 'প্রোফাইল সংরক্ষণ করুন' : 'Save Profile'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
