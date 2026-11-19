import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from '../../data/translations';
import { 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  AlertTriangle, 
  FileCheck,
  Bot
} from 'lucide-react';

export default function AdminPortal() {
  const { listings, orders, priceAlerts, lang } = useApp();
  const { isBn } = useTranslation(lang);

  const [verificationRequests, setVerificationRequests] = useState([
    {
      id: 'req-01',
      name: 'মো. রফিকুল ইসলাম',
      nameEn: 'Md. Rafiqul Islam',
      farmName: 'সবুজ বাংলা এগ্রো ফার্ম',
      farmNameEn: 'Sobuj Bangla Agro Farm',
      type: 'কৃষক ও বীজ উৎপাদনকারী',
      typeEn: 'Farmer & Seed Producer',
      district: 'দিনাজপুর',
      districtEn: 'Dinajpur',
      documents: 'জাতীয় পরিচয়পত্র ও কৃষি কার্ড',
      documentsEn: 'National ID & Agri Card',
      status: 'pending'
    },
    {
      id: 'req-02',
      name: 'মেসার্স কায়সার রাইস মিলস',
      nameEn: 'M/S Kaysar Rice Mills',
      farmName: 'আড়তদার প্রতিষ্ঠান',
      farmNameEn: 'Wholesale Aratdar Firm',
      type: 'পাইকারি ট্রেডার্স',
      typeEn: 'Wholesale Trader',
      district: 'ঢাকা (কাওরান বাজার)',
      districtEn: 'Dhaka (Kawran Bazar)',
      documents: 'ট্রেড লাইসেন্স ও ট্যাক্স সার্টিফিকেট',
      documentsEn: 'Trade License & Tax Certificate',
      status: 'pending'
    }
  ]);

  const approveVerification = (id) => {
    setVerificationRequests(verificationRequests.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    alert(isBn ? 'ব্যবহারকারীর প্রোফাইলে ভেরিফায়েড ব্যাজ সক্রিয় করা হয়েছে!' : 'Verified badge activated on user profile!');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Admin Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-purple-950 text-white p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> 
            {isBn ? 'প্ল্যাটফর্ম অ্যাডমিনিস্ট্রেশন ও গভর্ন্যান্স' : 'Platform Governance & Administration'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isBn ? 'সুপার অ্যাডমিন কন্ট্রোল প্যানেল' : 'Super Admin Oversight Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'মার্কেটপ্লেস লিস্টিং যাচাইকরণ, কৃষক-ব্যবসায়ী ভেরিফিকেশন, বিশেষজ্ঞ অনুমোদন ও প্ল্যাটফর্ম অ্যানালিটিক্স।'
              : 'Produce listing moderation, farmer/trader verification, certified expert audits, and system analytics.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-purple-800 text-purple-100 font-bold text-xs">
            {isBn ? 'RBAC রোল: সিস্টেম অ্যাডমিনিস্ট্রেটর' : 'RBAC: System Administrator'}
          </span>
        </div>
      </div>

      {/* Analytics KPI Metric Cards (PRD Section 10 & 10.7) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {isBn ? 'নিবন্ধিত কৃষক ও ক্রেতা' : 'Registered Users'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {isBn ? '১,২৫০+' : '1,250+'}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            {isBn ? 'পাইলট টার্গেট অর্জিত (৭৮%)' : 'Pilot Target Achieved (78%)'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {isBn ? 'সক্রিয় পণ্য লিস্টিং' : 'Active Produce Posts'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {listings.length} {isBn ? 'টি' : 'Items'}
          </div>
          <span className="text-[11px] text-purple-600 font-bold mt-1 block">
            {isBn ? '৩টি সেক্টর অন্তর্ভুক্ত' : 'Across 3 core sectors'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {isBn ? 'মোট লেনদেন (GMV)' : 'Total Volume (GMV)'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">
            ৳ {isBn ? '৪,১৮,০০০' : '4,18,000'}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {isBn ? 'ডিজিটাল মেমো সুরক্ষিত' : 'Protected by digital memo'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {isBn ? 'AI সেফটি ও ডাক্তার এসকেলেশন' : 'AI Safety & Doctor Escalation'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">100%</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            {isBn ? 'জরুরি কেস ডাক্তার রেফারেল' : 'High-risk automated doctor escalation'}
          </span>
        </div>
      </div>

      {/* Verification Requests Queue (PRD FR-MKT-50) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {isBn 
                ? `ব্যবসায়ী ও খামারি ভেরিফিকেশন আবেদন (${verificationRequests.filter(r => r.status === 'pending').length})`
                : `Identity Verification Queue (${verificationRequests.filter(r => r.status === 'pending').length})`}
            </h3>
            <p className="text-xs text-slate-500">
              {isBn ? 'প্রতারণা রোধে জাতীয় পরিচয়পত্র ও ট্রেড লাইসেন্স নিরীক্ষা' : 'NID & Trade License moderation to guarantee trust and safety'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {verificationRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{isBn ? req.name : req.nameEn}</h4>
                  <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-semibold">{isBn ? req.type : req.typeEn}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBn ? 'প্রতিষ্ঠান:' : 'Firm:'} {isBn ? req.farmName : req.farmNameEn} | {isBn ? 'অবস্থান:' : 'Location:'} {isBn ? req.district : req.districtEn}
                </p>
                <p className="text-[11px] text-purple-700 font-medium mt-1">
                  {isBn ? 'সংযুক্ত ডকুমেন্ট:' : 'Documents:'} {isBn ? req.documents : req.documentsEn}
                </p>
              </div>

              <div>
                {req.status === 'pending' ? (
                  <button
                    onClick={() => approveVerification(req.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {isBn ? 'ভেরিফাইড ব্যাজ অনুমোদন' : 'Approve Verified Badge'}
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> {isBn ? 'অনুমোদিত প্রোফাইল' : 'Verified Profile'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
