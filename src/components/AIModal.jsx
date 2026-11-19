import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../data/translations';
import { 
  X, 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Image as ImageIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Stethoscope, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function AIModal() {
  const { aiModalOpen, setAiModalOpen, setActiveTab, lang } = useApp();
  const { isBn } = useTranslation(lang);

  const [sector, setSector] = useState('agriculture');
  const [inputQuery, setInputQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: isBn 
        ? 'আসসালামু আলাইকুম! আমি "কৃষি মিত্র" এআই। ফসল, গবাদিপশুর রোগবালাই, মাছ চাষ অথবা আজকের পাইকারি বাজারদর সম্পর্কিত যেকোনো প্রশ্ন লিখে বা মুখে বলুন। জরুরি ক্ষেত্রে আমি সরাসরি বিশেষজ্ঞ ডাক্তারের সাথেও যুক্ত করে দিতে পারি।'
        : 'Welcome! I am "Krishi Mitra" AI assistant. Ask any question regarding crop pests, livestock care, fisheries, or wholesale market prices via voice or text. In high-risk cases, I can directly connect you with verified specialists.',
      time: isBn ? 'এখন' : 'Now',
      verified: true
    }
  ]);

  if (!aiModalOpen) return null;

  // Quick suggestion chips
  const quickPrompts = [
    { labelBn: 'আলুর পাতা পোড়া ও কুয়াশা প্রতিকার', labelEn: 'Potato late blight and fog advisory', sector: 'agriculture' },
    { labelBn: 'ধানের ব্লাস্ট রোগের সমাধান কী?', labelEn: 'Remedy for rice blast disease?', sector: 'agriculture' },
    { labelBn: 'গরুর ক্ষুরারোগের প্রাথমিক লক্ষণ ও করণীয়', labelEn: 'Cattle Foot & Mouth Disease care', sector: 'livestock' },
    { labelBn: 'পুকুরে মাছ ভেসে খাবি খেলে কী করব?', labelEn: 'Low pond oxygen emergency action', sector: 'fisheries' },
    { labelBn: 'আজকের বগুড়ার আলুর পাইকারি বাজারদর কত?', labelEn: 'Today Bogra potato wholesale price', sector: 'marketplace' }
  ];

  const handleSend = (textToSend = inputQuery) => {
    const q = (textToSend || '').trim();
    if (!q && !selectedImage) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q || (selectedImage ? (isBn ? 'ফসলের পাতার ছবি বিশ্লেষণ করুন' : 'Analyze attached plant photo') : ''),
      image: selectedImage,
      time: isBn ? 'এইমাত্র' : 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setSelectedImage(null);
    setIsLoading(true);

    // Simulate AI inference pipeline with RAG safety checks
    setTimeout(() => {
      let aiResponseText = '';
      let isCritical = false;
      let recommendedExpert = null;

      const lowerQ = q.toLowerCase();

      // Detection of Critical Emergency Cases (PRD 11.3 & SAD 9.1)
      if (lowerQ.includes('পচে') || lowerQ.includes('মড়ক') || lowerQ.includes('লেইট ব্লাইট') || lowerQ.includes('ক্ষুরা') || lowerQ.includes('লালা') || lowerQ.includes('খাবি খাচ্ছে') || lowerQ.includes('মরা') || lowerQ.includes('rot') || lowerQ.includes('blight') || lowerQ.includes('fmd') || lowerQ.includes('oxygen')) {
        isCritical = true;
        if (lowerQ.includes('ক্ষুরা') || lowerQ.includes('লালা') || lowerQ.includes('fmd') || sector === 'livestock') {
          recommendedExpert = {
            name: isBn ? 'ডা. সানজিদা সুলতানা (ভেটেরিনারি সার্জন)' : 'Dr. Sanjida Sultana (Veterinary Surgeon)',
            phone: '০১৭০১-৯৯৮৮৭৭',
            type: isBn ? 'ভেটেরিনারি ডাক্তার' : 'Veterinary Surgeon'
          };
          aiResponseText = isBn 
            ? '⚠️ সতর্কতা: আপনার বর্ণিত লক্ষণটি সংক্রামক ক্ষুরারোগ (FMD) বা জটিল ভাইরাসের নির্দেশক। অবিলম্বে আক্রান্ত পশুকে অন্য প্রাণী থেকে আলাদা করুন। পটাশযুক্ত কুসুম গরম পানি দিয়ে মুখ ও পায়ের ক্ষত ধুয়ে দিন। কৃত্রিম বুদ্ধিমত্তা কোনো নিবন্ধিত প্রেসক্রিপশন ছাড়া তীব্র অ্যান্টিবায়োটিক ব্যবহারের অনুমোদন দেয় না। নিচে সরাসরি জরুরি ভেট ডাক্তারের সাথে যোগাযোগ করুন।'
            : '⚠️ Warning: Symptoms indicate potential Foot & Mouth Disease (FMD) or viral infection. Immediately isolate infected animals. Wash lesions with warm potassium permanganate solution. AI is restricted from prescribing systemic antibiotics without clinical examination. Please contact the certified veterinarian below.';
        } else if (lowerQ.includes('খাবি') || lowerQ.includes('oxygen') || sector === 'fisheries') {
          recommendedExpert = {
            name: isBn ? 'মৎস্যবিদ মো. তৌহিদুল করিম' : 'Fisheries Specialist Md. Touhidul Karim',
            phone: '০১৭২২-৪৫৬৭৮৯',
            type: isBn ? 'মৎস্য বিশেষজ্ঞ' : 'Fisheries Specialist'
          };
          aiResponseText = isBn
            ? '⚠️ সতর্কতা: মাছ পানির উপরে খাবি খাওয়া মানে পানিতে দ্রবীভূত অক্সিজেন (DO) আশঙ্কাজনকভাবে কমে গেছে অথবা বিষাক্ত অ্যামোনিয়া গ্যাস বৃদ্ধি পেয়েছে। এখনই পুকুরে গোসল করিয়ে বা বাঁশ দিয়ে পানির ঢেউ তৈরি করুন অথবা শতকে ৫০-১০০ গ্রাম অক্সিম্যাক্স বা অক্সিজেন পাউডার ছড়িয়ে দিন। খাবার দেওয়া বন্ধ রাখুন। বিস্তারিত পর্যালোচনার জন্য মৎস্য বিশেষজ্ঞের সহায়তা নিন।'
            : '⚠️ Warning: Surface gasping indicates critical Dissolved Oxygen (DO) depletion or toxic ammonia surge. Immediately aerate pond by splashing water or applying 50-100g/decimal oxygen powder. Suspend feeding. Consult the fisheries specialist below.';
        } else {
          recommendedExpert = {
            name: isBn ? 'কৃষিবিদ ড. মাহফুজুর রহমান' : 'Agronomist Dr. Mahfuzur Rahman',
            phone: '০১৭২২-১১২২৩৩',
            type: isBn ? 'উদ্ভিদ রোগতত্ত্ববিদ' : 'Plant Pathologist'
          };
          aiResponseText = isBn
            ? '⚠️ সতর্কতা: এটি আলুর লেইট ব্লাইট (মড়ক) বা ছত্রাকজনিত মহামারী লক্ষণ হতে পারে। কুয়াশাচ্ছন্ন আবহাওয়ায় এটি ২৪-৪৮ ঘণ্টার মধ্যে পুরো ফসল নষ্ট করতে পারে। আক্রান্ত পাতা মাটিতে পুঁতে ফেলুন এবং ম্যানকোজেব জাতীয় প্রতিষেধক স্প্রে করুন। জরুরি বিশেষজ্ঞ পরামর্শের ব্যবস্থা নিচে সংযুক্ত করা হলো।'
            : '⚠️ Warning: Symptoms suggest Potato Late Blight fungus. Under persistent dense fog, this can destroy entire plots within 24-48 hours. Remove diseased foliage and apply preventive Mancozeb spray. Direct agronomist consultation link is provided below.';
        }
      } else if (lowerQ.includes('বাজারদর') || lowerQ.includes('দাম') || lowerQ.includes('price')) {
        aiResponseText = isBn
          ? '📊 আজকের কৃষি বিপণন অধিদপ্তর (DAM) এর তথ্য অনুযায়ী: বগুড়া মহাস্থান হাটে ডায়মন্ড আলু পাইকারি প্রতি মণ ১৪৫০-১৪৮০ টাকা (কেজি প্রায় ৩৭-৩৮ টাকা) এবং কাওরান বাজারে মিনিকেট চাল প্রতি কেজি পাইকারি ৬৮-৭০ টাকা। আপনি মার্কেটপ্লেস ট্যাবে গিয়ে সরাসরি বর্তমান রেট দেখতে পারেন।'
          : '📊 According to latest Department of Agricultural Marketing (DAM) bulletin: Bogra Mahasthan Hat wholesale Diamond Potato trades at ৳1450-1480/maund (~৳37-38/kg), and Miniket rice trades at ৳68-70/kg at Kawran Bazar.';
      } else if (lowerQ.includes('সার') || lowerQ.includes('ডোজ') || lowerQ.includes('fertilizer')) {
        aiResponseText = isBn
          ? '🌾 ফসলভেদে সারের সুষম ব্যবহার অপরিহার্য। যেমন বোরো ধানে শতাংশ প্রতি ইউরিয়া ১ কেজি, টিএসপি ৪০০ গ্রাম, এমওপি ৫০০ গ্রাম এবং জিপসাম ৩০০ গ্রাম সুপারিশকৃত। ইউরিয়া সার সর্বদা ৩ কিস্তিতে উপরিপ্রয়োগ করুন যাতে অপচয় না হয়। আমাদের অ্যাপের "সার ক্যালকুলেটর" বাটনে ক্লিক করে জমির নিখুঁত হিসাব পাবেন।'
          : '🌾 Balanced fertilizer management is essential. For Boro paddy, recommended dosage per decimal is 1kg Urea, 400g TSP, 500g MoP, and 300g Gypsum. Always split Urea into 3 top-dressing splits to prevent nitrogen loss. Check our Fertilizer Calculator tab for exact land area dosage.';
      } else {
        aiResponseText = isBn
          ? `আপনার অনুসন্ধানের জন্য ধন্যবাদ। এটি প্রাথমিক তথ্যভিত্তিক গাইডেন্স: "${q}" সম্পর্কে সুষম পুষ্টি ও সঠিক পর্যবেক্ষণ নিশ্চিত করুন। যেকোনো অস্বাভাবিক লক্ষণ দেখলে ছবি আপলোড করুন অথবা বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন।`
          : `Thank you for your inquiry. Verified guidance for "${q}": Ensure balanced nutritional management and periodic field observation. For suspicious symptoms, upload a photo or book a certified specialist.`;
      }

      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        time: isBn ? 'এইমাত্র' : 'Just now',
        verified: true,
        isCritical,
        recommendedExpert
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }, 1000);
  };

  // Voice recording toggle simulation
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setInputQuery(isBn ? 'আলুর পাতায় কালো দাগ ও পচে যাওয়ার লক্ষণ দেখা যাচ্ছে' : 'Dark lesions and leaf rot observed on potato leaves');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  // Text to speech simulation
  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isBn ? 'bn-BD' : 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert(isBn ? 'আপনার ব্রাউজারে অডিও স্পিচ সমর্থন সক্রিয় নয়।' : 'Audio speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl flex flex-col h-[88vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-emerald-200">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">
                  {isBn ? 'কৃষি মিত্র AI সহকারী' : 'Krishi Mitra AI Assistant'}
                </h3>
                <span className="text-[10px] bg-emerald-500/40 px-2 py-0.5 rounded-full text-emerald-100 font-semibold border border-emerald-400/30">
                  {isBn ? 'RAG ভেরিফায়েড' : 'RAG Verified'}
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">
                {isBn ? 'কৃষি, প্রাণিসম্পদ ও মৎস্য চাষের নির্ভরযোগ্য বুদ্ধিমত্তা' : 'Intelligent diagnostics for agriculture, livestock & aquaculture'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAiModalOpen(false)}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sector Pill Filter */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-500 font-semibold shrink-0">
            {isBn ? 'বিষয়:' : 'Domain:'}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: 'agriculture', nameBn: 'কৃষি ও ফসল', nameEn: 'Crops' },
              { id: 'livestock', nameBn: 'খামারি ও পশু', nameEn: 'Livestock' },
              { id: 'fisheries', nameBn: 'মৎস্য চাষ', nameEn: 'Fisheries' },
              { id: 'marketplace', nameBn: 'বাজারদর', nameEn: 'Market Prices' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSector(s.id)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  sector === s.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isBn ? s.nameBn : s.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 no-scrollbar">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-1 border border-emerald-300">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-emerald-700 text-white rounded-tr-none'
                  }`}
                >
                  {m.image && (
                    <img 
                      src={m.image} 
                      alt="Uploaded plant/animal" 
                      className="w-48 h-32 object-cover rounded-xl mb-2 border border-slate-200" 
                    />
                  )}

                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Critical Emergency Alert Card with 1-Click Expert Escalation (PRD 11.3) */}
                  {m.isCritical && m.recommendedExpert && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 animate-in fade-in">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 mb-1">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        {isBn ? 'জরুরি ডাক্তার পরামর্শ প্রস্তাবিত' : 'Doctor Consultation Recommended'}
                      </div>
                      <p className="text-[11px] text-amber-800 mb-2">
                        {isBn 
                          ? 'উক্ত জটিল লক্ষণ নিরাময়ে অবিলম্বে সরকারি নিবন্ধিত বিশেষজ্ঞ ডাক্তারের সাথে পরামর্শ করুন।'
                          : 'Due to epidemic risk, consult a registered specialist immediately for diagnostic assessment.'}
                      </p>
                      <button
                        onClick={() => {
                          setAiModalOpen(false);
                          setActiveTab('expertportal');
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm active:scale-95"
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        {isBn ? `${m.recommendedExpert.name} এর সাথে বুকিং করুন` : `Book Appointment with ${m.recommendedExpert.name}`}
                      </button>
                    </div>
                  )}

                  {/* AI Metadata & Audio button */}
                  {isAi && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> {isBn ? 'বিএআরআই / ডিএলএস প্রটোকল' : 'BARI / DLS Protocol'}
                      </span>
                      <button
                        onClick={() => playSpeech(m.text)}
                        className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 font-medium p-0.5 rounded transition"
                        title={isBn ? "অডিও শুনুন" : "Listen audio"}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        {isBn ? 'শুনুন' : 'Listen'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200 max-w-[75%]">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{isBn ? 'কৃষি ও খামার নলেজবেস যাচাই করে উত্তর তৈরি হচ্ছে...' : 'Querying agro-tech knowledge base...'}</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
            <span className="text-slate-500 text-[11px] font-semibold pl-1">
              {isBn ? 'পরামর্শ:' : 'Suggestions:'}
            </span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSector(qp.sector);
                  handleSend(isBn ? qp.labelBn : qp.labelEn);
                }}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-[11px] font-medium border border-slate-200 transition"
              >
                {isBn ? qp.labelBn : qp.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between text-xs">
            <span className="text-emerald-800 font-medium">
              {isBn ? '📷 ছবি সংযুক্ত হয়েছে (রোগ নির্ণয় মডেল সক্রিয়)' : '📷 Image attached (Diagnostic model active)'}
            </span>
            <button 
              onClick={() => setSelectedImage(null)}
              className="text-rose-600 hover:underline font-semibold"
            >
              {isBn ? 'বাতিল' : 'Remove'}
            </button>
          </div>
        )}

        {/* Voice Recording Banner */}
        {isRecording && (
          <div className="bg-rose-50 px-4 py-2 border-t border-rose-200 flex items-center justify-between text-xs text-rose-700 animate-pulse">
            <span className="flex items-center gap-2 font-semibold">
              <Mic className="w-4 h-4 text-rose-600" /> 
              {isBn ? 'কথা বলুন... আপনার কণ্ঠ রেকর্ড হচ্ছে (বাংলা ভয়েস)' : 'Listening... Recording voice query'}
            </span>
            <button 
              onClick={toggleRecording} 
              className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
            >
              {isBn ? 'বন্ধ করুন' : 'Stop'}
            </button>
          </div>
        )}

        {/* Input Controls */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          {/* Image attach button */}
          <label className="p-2.5 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer transition border border-slate-200">
            <ImageIcon className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </label>

          {/* Voice Input Button */}
          <button
            onClick={toggleRecording}
            className={`p-2.5 rounded-xl transition border ${
              isRecording 
                ? 'bg-rose-500 text-white border-rose-600 animate-bounce' 
                : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 border-slate-200'
            }`}
            title={isBn ? "বাংলায় কথা বলুন" : "Voice input"}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isBn ? "যেকোনো প্রশ্ন লিখুন (যেমন: আলুর জমিতে সেচ, গরুর পুষ্টি)..." : "Ask any query (e.g. potato irrigation, cattle feed)..."}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-800 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() && !selectedImage}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white transition active:scale-95 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
