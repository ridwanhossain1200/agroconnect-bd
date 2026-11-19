import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import AIModal from './components/AIModal';
import ReceiptModal from './components/ReceiptModal';

import Dashboard from './modules/Dashboard/Dashboard';
import Agriculture from './modules/Agriculture/Agriculture';
import Veterinary from './modules/Veterinary/Veterinary';
import Fisheries from './modules/Fisheries/Fisheries';
import Marketplace from './modules/Marketplace/Marketplace';
import MarketPrices from './modules/MarketPrices/MarketPrices';
import ExpertPortal from './modules/ExpertPortal/ExpertPortal';
import AdminPortal from './modules/AdminPortal/AdminPortal';
import { useTranslation } from './data/translations';

import { Sprout, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

function MainAppContent() {
  const { activeTab, offlineMode, lang } = useApp();
  const { isBn } = useTranslation(lang);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-bengali text-slate-800">
      
      <div>
        {/* Offline Simulation Alert Banner if offline mode is toggled */}
        {offlineMode && (
          <div className="bg-rose-600 text-white text-xs py-2 px-4 text-center font-bold animate-in fade-in">
            {isBn 
              ? '⚠️ আপনি অফলাইন মোডে ব্রাউজ করছেন। পূর্বে সেভ করা ফসলের প্ল্যান, ক্যালেন্ডার ও ভ্যাক্সিনেশন তথ্য প্রদর্শিত হচ্ছে।'
              : '⚠️ You are currently browsing in Offline Mode. Cached crop plans, diagnostic guides, and vaccination schedules are accessible.'}
          </div>
        )}

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-24 md:pb-12">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'agriculture' && <Agriculture />}
          {activeTab === 'veterinary' && <Veterinary />}
          {activeTab === 'fisheries' && <Fisheries />}
          {activeTab === 'marketplace' && <Marketplace />}
          {activeTab === 'marketprices' && <MarketPrices />}
          {activeTab === 'expertportal' && <ExpertPortal />}
          {activeTab === 'adminportal' && <AdminPortal />}
        </main>
      </div>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-10 pb-20 md:pb-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            {/* Col 1: Brand & Vision */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
                  {isBn ? 'কৃ' : 'A'}
                </div>
                <span className="text-lg font-black text-white tracking-tight">
                  {isBn ? 'কৃষি সংযোগ' : 'AgroConnect BD'}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {isBn 
                  ? 'বাংলাদেশের কৃষক, খামারি ও পাইকারি ক্রেতাদের জন্য একটি আধুনিক এআই-পাওয়ার্ড সমন্বিত স্মার্ট এগ্রো-টেক ও সরাসরি ক্রয়-বিক্রয় প্ল্যাটফর্ম।'
                  : 'Modern AI-powered agricultural technology and direct-to-buyer wholesale marketplace empowering farmers across Bangladesh.'}
              </p>
              <div className="text-[10px] text-emerald-400 font-semibold">
                {isBn 
                  ? '"একটি প্ল্যাটফর্ম, কৃষি-খামার-মৎস্য চাষ ও পণ্য বিপণনের সকল সমাধান।"'
                  : '"One Unified Platform for Crops, Livestock, Fisheries & Direct Produce Trade."'}
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                {isBn ? 'প্রধান সেবাসমূহ' : 'Core Services'}
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li>• {isBn ? 'স্মার্ট সুষম সার ক্যালকুলেটর' : 'Balanced Fertilizer Calculator'}</li>
                <li>• {isBn ? 'ফসলের রোগবালাই ও কীটশত্রু ট্রাবলশুটিং' : 'Crop Disease Diagnostics & AI Help'}</li>
                <li>• {isBn ? 'গবাদিপশুর পুষ্টি ও এফসিআর ট্র্যাকিং' : 'Livestock Nutrition & FCR Tracking'}</li>
                <li>• {isBn ? 'পুকুরের পানির গুণাগুণ ও পোনা মজুত হার' : 'Pond Water Quality & Stocking Density'}</li>
                <li>• {isBn ? 'সরাসরি পাইকারি মার্কেটপ্লেস ও দরদাম' : 'Direct Wholesale Trade & Negotiation'}</li>
              </ul>
            </div>

            {/* Col 3: Government Help & Sources */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                {isBn ? 'সরকারি তথ্যসূত্র ও হেল্পলাইন' : 'Official Helplines & Sources'}
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 
                  {isBn ? 'কৃষি কল সেন্টার: ১৬১২৩' : 'Agri Call Center: 16123'}
                </li>
                <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 
                  {isBn ? 'প্রাণিসম্পদ কল সেন্টার: ৩৩৩' : 'Livestock Care: 333'}
                </li>
                <li>• {isBn ? 'কৃষি বিপণন অধিদপ্তর (DAM) বাজারদর' : 'Dept of Agricultural Marketing (DAM)'}</li>
                <li>• {isBn ? 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)' : 'Dept of Agricultural Extension (DAE)'}</li>
                <li>• {isBn ? 'বাংলাদেশ মৎস্য গবেষণা ইনস্টিটিউট (BFRI)' : 'Bangladesh Fisheries Research Institute (BFRI)'}</li>
              </ul>
            </div>

            {/* Col 4: Trust & Verification */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                {isBn ? 'নিরাপত্তা ও বিশ্বাস' : 'Trust & Safety'}
              </h4>
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-[11px] space-y-1">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> 
                  {isBn ? '১০০% ডিজিটাল মেমো নিশ্চিতকরণ' : '100% Digital Order Receipts'}
                </span>
                <p className="text-slate-400">
                  {isBn 
                    ? 'কৃষক ও পাইকারি ক্রেতার মধ্যে স্বচ্ছ সরাসরি লেনদেন। মধ্যস্বত্বভোগী ছাড়া সঠিক ওজন ও দামের সুরক্ষা।'
                    : 'Transparent direct trading between rural farmers and wholesale buyers. Guaranteed fair rates.'}
                </p>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>
              {isBn 
                ? '© ২০২৬ কৃষি সংযোগ (AgroConnect BD)। সর্বস্বত্ব সংরক্ষিত।' 
                : '© 2026 AgroConnect BD. All rights reserved.'}
            </p>
            <p className="flex items-center gap-1 text-slate-400">
              {isBn ? 'বাংলাদেশের কৃষির সমৃদ্ধির জন্য নির্মিত' : 'Built for the prosperity of Bangladesh Agriculture'} 
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Navigation (Flutter-like experience) */}
      <MobileNav />

      {/* Multimodal AI Assistant Modal */}
      <AIModal />

      {/* Digital Order Receipt Modal */}
      <ReceiptModal />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
