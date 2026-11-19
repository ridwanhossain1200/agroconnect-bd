import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Sprout, 
  Beef, 
  Fish, 
  ShoppingBag, 
  Bot 
} from 'lucide-react';

export default function MobileNav() {
  const { activeTab, setActiveTab, setAiModalOpen, inquiries, lang } = useApp();
  const isBn = lang === 'bn';

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending').length;

  const navItems = [
    { id: 'dashboard', name: isBn ? 'হোম' : 'Home', icon: Home },
    { id: 'agriculture', name: isBn ? 'কৃষি' : 'Agri', icon: Sprout },
    { id: 'veterinary', name: isBn ? 'খামারি' : 'Livestock', icon: Beef },
    { id: 'fisheries', name: isBn ? 'মৎস্য' : 'Fish', icon: Fish },
    { id: 'marketplace', name: isBn ? 'বাজার' : 'Market', icon: ShoppingBag, badge: pendingInquiriesCount }
  ];

  return (
    <nav 
      aria-label="মোবাইল বটম নেভিগেশন"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-1.5 py-1 shadow-lg pb-[env(safe-area-inset-bottom,4px)] select-none"
    >
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition relative ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] scale-110' : 'stroke-[1.8px]'} transition-transform`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold px-1 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-emerald-800' : 'font-medium'}`}>
                {item.name}
              </span>
            </button>
          );
        })}

        {/* Floating AI Button */}
        <button
          onClick={() => setAiModalOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-teal-600 hover:text-teal-800 transition active:scale-95"
          title={isBn ? "কৃষি মিত্র AI" : "Krishi Mitra AI"}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-teal-800">
            {isBn ? 'AI সহকারী' : 'AI Bot'}
          </span>
        </button>
      </div>
    </nav>
  );
}
