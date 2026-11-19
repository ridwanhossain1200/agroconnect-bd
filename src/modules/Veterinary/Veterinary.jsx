import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LIVESTOCK_SPECIES, calculateFCR } from '../../data/livestockData';
import { EXPERT_DIRECTORY } from '../../data/expertDirectory';
import { useTranslation } from '../../data/translations';
import { 
  Beef, 
  Calculator, 
  Syringe, 
  PhoneCall, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  HeartPulse, 
  Utensils, 
  Layers
} from 'lucide-react';

export default function Veterinary() {
  const { setActiveTab, setAiModalOpen, lang } = useApp();
  const { isBn } = useTranslation(lang);

  const [activeSubTab, setActiveSubTab] = useState('feeding'); // 'feeding', 'fcr', 'vaccination', 'breeds'
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('cattle');

  // FCR Calculator state
  const [fcrFeedKg, setFcrFeedKg] = useState('3200'); // Total feed in kg
  const [fcrInitialWeight, setFcrInitialWeight] = useState('0.045'); // Day-old chick weight kg
  const [fcrFinalWeight, setFcrFinalWeight] = useState('1.95'); // Final weight per bird
  const [fcrBirdCount, setFcrBirdCount] = useState('1000'); // 1000 birds batch

  // Vaccination Tracker state
  const [vaccines, setVaccines] = useState([
    { id: 'v1', disease: 'ক্ষুরারোগ (FMD)', dueDate: 'আসন্ন ২৫ নভেম্বর', status: 'pending', target: 'গাভী ও বাছুর' },
    { id: 'v2', disease: 'তড়কা (Anthrax)', dueDate: 'সম্পন্ন (১৫ অক্টোবর)', status: 'completed', target: 'ষাঁড় ও গাভী' },
    { id: 'v3', disease: 'বাদলা (BQ)', dueDate: 'সম্পন্ন (১০ সেপ্টেম্বর)', status: 'completed', target: 'সকল গবাদিপশু' },
    { id: 'v4', disease: 'কৃমিনাশক ডোজ (Albendazole)', dueDate: 'আগামী ১ ডিসেম্বর', status: 'pending', target: 'সকল গবাদিপশু' }
  ]);

  const currentSpecies = LIVESTOCK_SPECIES.find(s => s.id === selectedSpeciesId) || LIVESTOCK_SPECIES[0];
  const fcrResult = calculateFCR(fcrFeedKg, fcrInitialWeight, fcrFinalWeight, fcrBirdCount);
  const vetDoctor = EXPERT_DIRECTORY.find(e => e.sector === 'livestock');

  const toggleVaccine = (id) => {
    setVaccines(vaccines.map(v => v.id === id ? { ...v, status: v.status === 'completed' ? 'pending' : 'completed' } : v));
  };

  const subTabs = [
    { id: 'feeding', nameBn: 'দৈনিক পুষ্টি ও খাদ্য তালিকা', nameEn: 'Daily Feeding Chart', icon: Utensils },
    { id: 'fcr', nameBn: 'FCR ক্যালকুলেটর', nameEn: 'FCR Calculator', icon: Calculator },
    { id: 'vaccination', nameBn: 'টিকা ও কৃমিনাশক ট্র্যাকার', nameEn: 'Vaccine Tracker', icon: Syringe },
    { id: 'breeds', nameBn: 'উন্নত জাত নির্বাচন গাইড', nameEn: 'Breed Guide', icon: Layers }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-900 text-white p-5 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-purple-800/40">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Beef className="w-4 h-4" /> {isBn ? 'মডিউল ২: খামারি ও প্রাণিসম্পদ' : 'Module 2: Livestock & Veterinary'}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            {isBn ? 'আধুনিক খামার ব্যবস্থাপনা ও পশু চিকিৎসা' : 'Modern Farm Management & Veterinary Care'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'গরু, ছাগল ও পোল্ট্রি খামারের সুষম পুষ্টি তালিকা, এফসিআর ক্যালকুলেটর, টিকাদান ট্র্যাকার ও ২৪/৭ জরুরি ভেট ডাক্তার সাপোর্ট।'
              : 'Scientific nutrition charts, FCR calculation, vaccination schedules, and 24/7 emergency veterinary doctor directory.'
            }
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:01701998877"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition active:scale-95 animate-pulse"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isBn ? 'জরুরি ভেট কল (২৪/৭)' : 'Emergency Vet (24/7)'}</span>
          </a>
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
                  ? 'bg-purple-800 text-white shadow-md shadow-purple-800/20'
                  : 'bg-white text-slate-600 hover:text-purple-800 hover:bg-purple-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isBn ? tab.nameBn : tab.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Daily Care & Feeding Chart (PRD 4.8) */}
      {activeSubTab === 'feeding' && (
        <div className="space-y-6">
          {/* Species Selector */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit overflow-x-auto no-scrollbar">
            {LIVESTOCK_SPECIES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSpeciesId(s.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                  selectedSpeciesId === s.id
                    ? 'bg-purple-800 text-white shadow'
                    : 'text-slate-600 hover:text-purple-900'
                }`}
              >
                {isBn ? s.nameBn : s.nameEn}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Feeding Chart Card */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {isBn ? currentSpecies.nameBn : currentSpecies.nameEn} - {isBn ? 'দৈনিক আদর্শ পুষ্টি ও খাদ্য তালিকা' : 'Daily Feeding Requirements'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isBn ? 'প্রাণিসম্পদ অধিদপ্তর (DLS) এর বৈজ্ঞানিক খাদ্য নির্দেশিকা' : 'Scientific nutrition standards approved by DLS Bangladesh'}
                  </p>
                </div>
                <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">
                  {isBn ? 'প্রতি প্রাণীর জন্য' : 'Per Animal'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentSpecies.dailyFeedPerAnimal.greenGrassKg && (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">
                      {isBn ? 'কাঁচা ঘাস / সাইলেজ:' : 'Green Forage / Silage:'}
                    </span>
                    <p className="text-sm font-black text-emerald-950">{currentSpecies.dailyFeedPerAnimal.greenGrassKg}</p>
                    <span className="text-[11px] text-emerald-700 mt-1 block">নেপিয়ার, পারা অথবা ভুট্টার সবুজ ঘাস</span>
                  </div>
                )}

                {currentSpecies.dailyFeedPerAnimal.dryStrawKg && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="text-xs font-bold text-amber-800 uppercase block mb-1">
                      {isBn ? 'শুকনা খড় (রাফেজ):' : 'Dry Straw (Roughage):'}
                    </span>
                    <p className="text-sm font-black text-amber-950">{currentSpecies.dailyFeedPerAnimal.dryStrawKg}</p>
                    <span className="text-[11px] text-amber-700 mt-1 block">ইউরিয়া মোলাসেস স্ট্র (UMS) প্রক্রিয়াজাত</span>
                  </div>
                )}

                {currentSpecies.dailyFeedPerAnimal.concentrateKg && (
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                    <span className="text-xs font-bold text-purple-800 uppercase block mb-1">
                      {isBn ? 'দানাদার সুষম মিশ্রণ:' : 'Concentrate Feed Mix:'}
                    </span>
                    <p className="text-sm font-black text-purple-950">{currentSpecies.dailyFeedPerAnimal.concentrateKg}</p>
                    <span className="text-[11px] text-purple-700 mt-1 block">ভুট্টা গুঁড়া, গমের ভুসি, খৈল ও মিনারেল মিক্স</span>
                  </div>
                )}

                {currentSpecies.dailyFeedPerAnimal.waterLiters && (
                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                    <span className="text-xs font-bold text-sky-800 uppercase block mb-1">
                      {isBn ? 'বিশুদ্ধ পানি:' : 'Clean Drinking Water:'}
                    </span>
                    <p className="text-sm font-black text-sky-950">{currentSpecies.dailyFeedPerAnimal.waterLiters}</p>
                    <span className="text-[11px] text-sky-700 mt-1 block">২৪ ঘণ্টা সার্বক্ষণিক পরিষ্কার পানি সরবরাহ</span>
                  </div>
                )}
              </div>

              {/* Shed Management Advice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">{isBn ? 'শেড ও খামার স্বাস্থ্যবিধি:' : 'Shed Hygiene & Biosecurity:'}</span>
                <p>• নিয়মিত সকাল ও বিকালে শেডের মেঝে জীবাণুনাশক দিয়ে পরিষ্কার করুন।</p>
                <p>• গ্রীষ্মে ফ্যান বা স্প্রিংকলার এবং শীতকালে চটের পর্দা ব্যবহার করে সহনশীল তাপমাত্রা রাখুন।</p>
              </div>
            </div>

            {/* Emergency Vet Support Box (PRD 4.11) */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50/80 rounded-3xl p-5 border border-purple-200 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-2">
                  <HeartPulse className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>{isBn ? 'জরুরি প্রাণিসম্পদ চিকিৎসা' : 'Emergency Vet Care'}</span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={vetDoctor.avatar}
                    alt={vetDoctor.nameBn}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-300"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{isBn ? vetDoctor.nameBn : vetDoctor.nameEn}</h4>
                    <p className="text-[11px] text-purple-800 font-medium">{vetDoctor.qualification}</p>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {vetDoctor.availability}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded-2xl border border-purple-100 text-xs text-slate-600 space-y-1">
                  <span className="font-semibold text-slate-800">{isBn ? 'কখন অবিলম্বে ডাক্তার ডাকবেন?' : 'When to call emergency vet?'}</span>
                  <p>• হঠাৎ পাতলা পায়খানা বা মুখ দিয়ে অতিরিক্ত লালা ঝরা</p>
                  <p>• পেট অতিরিক্ত ফুলে যাওয়া (ব্লোট/গ্যাস)</p>
                  <p>• উচ্চ তাপমাত্রা বা পা খুড়িয়ে হাঁটা</p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <a
                  href={`tel:${vetDoctor.phoneEmergency}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs shadow-md transition"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-300" />
                  <span>{isBn ? `সরাসরি ডাক্তার কল (${vetDoctor.phoneEmergency})` : `Call Vet Doctor (${vetDoctor.phoneEmergency})`}</span>
                </a>

                <button
                  onClick={() => setAiModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-300 font-bold text-xs transition"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{isBn ? 'AI ভেট লক্ষণে জিজ্ঞাসা' : 'Check Symptoms with AI'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. FCR Calculator (PRD 4.8 & SAD 3.2) */}
      {activeSubTab === 'fcr' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-700" />
              <span>{isBn ? 'এফসিআর (FCR) ডেটা ইনপুট' : 'FCR Input Parameters'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              FCR = মোট খাদ্য গ্রহণ (কেজি) ÷ মোট শারীরিক বৃদ্ধি (কেজি)
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'ব্যাচে মোট মুরগি বা প্রাণীর সংখ্যা:' : 'Total Flock/Batch Size:'}
              </label>
              <input
                type="number"
                value={fcrBirdCount}
                onChange={(e) => setFcrBirdCount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {isBn ? 'ব্যাচে মোট খাওয়ানো খাদ্যের পরিমাণ (কেজি):' : 'Total Feed Consumed (Kg):'}
              </label>
              <input
                type="number"
                value={fcrFeedKg}
                onChange={(e) => setFcrFeedKg(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {isBn ? 'শুরুর গড় ওজন (কেজি):' : 'Initial Avg Wt (Kg):'}
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={fcrInitialWeight}
                  onChange={(e) => setFcrInitialWeight(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {isBn ? 'বর্তমান গড় ওজন (কেজি):' : 'Final Avg Wt (Kg):'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={fcrFinalWeight}
                  onChange={(e) => setFcrFinalWeight(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                {isBn ? 'খাদ্য রূপান্তর অনুপাত (Feed Conversion Ratio) ফলাফল' : 'Feed Conversion Ratio (FCR) Results'}
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-center">
                  <span className="text-xs font-bold text-purple-700 uppercase">হিসাবকৃত FCR মান:</span>
                  <div className="text-3xl sm:text-4xl font-black text-purple-950 mt-1">{fcrResult.fcr}</div>
                  <span className="text-xs text-purple-800 font-semibold mt-1 inline-block">
                    ১ কেজি মাংসের জন্য {fcrResult.fcr} কেজি খাদ্য লেগেছে
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">মোট ওজন অর্জন:</span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-800 mt-1">{fcrResult.totalWeightGain} <span className="text-sm">কেজি</span></div>
                  <span className="text-xs text-emerald-700 font-semibold mt-1 inline-block">
                    স্থিতি: {fcrResult.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                <span className="font-bold block mb-1">বিশেষজ্ঞের মূল্যায়ন ও সুপারিশ:</span>
                {fcrResult.advice}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
              * আন্তর্জাতিক মানদণ্ড অনুযায়ী ব্রয়লারের জন্য ১.৫ - ১.৬ এফসিআর সর্বোচ্চ লাভজনক বলে বিবেচিত হয়।
            </div>
          </div>
        </div>
      )}

      {/* 3. Vaccination & Deworming Tracker (PRD 4.9) */}
      {activeSubTab === 'vaccination' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? 'টিকা ও কৃমিনাশক নিয়মিত ট্র্যাকার' : 'Vaccination & Deworming Tracker'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? 'মহামারী রোগ থেকে খামারকে বাঁচাতে সময়মতো টিকা দেওয়া বাধ্যতামূলক।' : 'Timely vaccination prevents catastrophic livestock epidemics.'}
              </p>
            </div>
            <button
              onClick={() => alert(isBn ? 'নতুন টিকা দেওয়ার তারিখ শিডিউলে যুক্ত হয়েছে!' : 'Vaccination schedule updated!')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-800 text-white font-bold text-xs hover:bg-purple-900 transition"
            >
              {isBn ? '+ নতুন শিডিউল যোগ করুন' : '+ Add Schedule'}
            </button>
          </div>

          <div className="space-y-3">
            {vaccines.map((v) => {
              const isCompleted = v.status === 'completed';
              return (
                <div
                  key={v.id}
                  onClick={() => toggleVaccine(v.id)}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition ${
                    isCompleted
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 hover:bg-purple-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition shrink-0 ${
                      isCompleted ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">{v.disease}</div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 mt-0.5">
                        <span>লক্ষ্য: {v.target}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-purple-700">
                          <Clock className="w-3 h-3" /> {v.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shrink-0 ${
                    isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isCompleted ? (isBn ? 'টিকা সম্পন্ন' : 'Vaccinated') : (isBn ? 'দেওয়া বাকি' : 'Pending')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Breeds Selection Guide (PRD 4.7) */}
      {activeSubTab === 'breeds' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {currentSpecies.breeds.map((breed, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-900">{breed.nameBn}</h4>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                    {isBn ? 'উন্নত জাত' : 'Improved Breed'}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <p>• <span className="font-semibold text-slate-800">উদ্দেশ্য:</span> {breed.purpose}</p>
                  {breed.dailyMilk && (
                    <p>• <span className="font-semibold text-slate-800">দৈনিক দুধ উৎপাদন:</span> {breed.dailyMilk}</p>
                  )}
                  <p>• <span className="font-semibold text-slate-800">জলবায়ু সহনশীলতা:</span> {breed.climateSuitability}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="text-xs font-bold text-purple-700 hover:underline"
                >
                  {isBn ? 'মার্কেটপ্লেসে লাইভ পশু দেখুন →' : 'View in Marketplace →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
