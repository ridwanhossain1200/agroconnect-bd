import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EXPERT_DIRECTORY } from '../../data/expertDirectory';
import { useTranslation } from '../../data/translations';
import { 
  Stethoscope, 
  Calendar, 
  PhoneCall, 
  Video, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  FileText,
  X,
  Send
} from 'lucide-react';

export default function ExpertPortal() {
  const { userProfile, lang } = useApp();
  const { isBn } = useTranslation(lang);

  const [selectedExpert, setSelectedExpert] = useState(null);
  const [bookingUrgency, setBookingUrgency] = useState('urgent');
  const [issueDescription, setIssueDescription] = useState('');
  const [consultationActive, setConsultationActive] = useState(false);

  const [consultations, setConsultations] = useState([
    {
      id: 'cons-501',
      expertName: 'ডা. সানজিদা সুলতানা (ভেটেরিনারি সার্জন)',
      expertNameEn: 'Dr. Sanjida Sultana (Veterinary Surgeon)',
      sectorBn: 'খামারি ও পশু',
      sectorEn: 'Livestock & Animals',
      date: 'আজ সকাল ১১:৩০',
      dateEn: 'Today, 11:30 AM',
      issue: 'গাভীর দুধের ওলানে লালচে ভাব ও শক্ত হয়ে যাওয়া (মাস্টাইটিস সন্দেহ)',
      issueEn: 'Cow udder redness and swelling (suspected mastitis)',
      status: 'completed',
      prescription: 'পটাশ গরম পানির সেক, বরফ থেরাপি এবং ইন্ট্রাম্যামারি অ্যান্টিবায়োটিক টিউব চিকিৎসকের নির্দেশমতো।',
      prescriptionEn: 'Warm potassium compress, cold therapy, and intramammary antibiotic infusion as prescribed.'
    },
    {
      id: 'cons-502',
      expertName: 'কৃষিবিদ ড. মাহফুজুর রহমান',
      expertNameEn: 'Agronomist Dr. Mahfuzur Rahman',
      sectorBn: 'কৃষি ও ফসল',
      sectorEn: 'Crops & Agriculture',
      date: '১৫ নভেম্বর, ২০২৬',
      dateEn: 'Nov 15, 2026',
      issue: 'আলুর গাছের পাতায় কুয়াশার কারণে কালো ছোপ ছোপ দাগ',
      issueEn: 'Dark water-soaked lesions on potato leaves due to heavy fog',
      status: 'completed',
      prescription: 'ম্যানকোজেব ২ গ্রাম প্রতি লিটারে মিশিয়ে সকালে রোদ উঠার পর স্প্রে।',
      prescriptionEn: 'Mancozeb 2g per liter spray in the morning after sunlight emerges.'
    }
  ]);

  const handleBookConsultation = (e) => {
    e.preventDefault();
    if (!selectedExpert || !issueDescription) return;

    const newCons = {
      id: `cons-${Date.now().toString().slice(-4)}`,
      expertName: selectedExpert.nameBn,
      expertNameEn: selectedExpert.nameEn,
      sectorBn: selectedExpert.sectorBn,
      sectorEn: selectedExpert.sector,
      date: isBn ? 'এখন মাত্র বুকিংকৃত' : 'Just booked',
      dateEn: 'Just booked',
      issue: issueDescription,
      issueEn: issueDescription,
      status: 'in_progress',
      prescription: isBn ? 'ডাক্তার কেস হিস্ট্রি পর্যালোচনা করছেন। কিছুক্ষণের মধ্যে প্রেসক্রিপশন নোট আসবে।' : 'Doctor is reviewing medical case history. Prescription note will arrive shortly.',
      prescriptionEn: 'Doctor is reviewing medical case history. Prescription note will arrive shortly.'
    };

    setConsultations([newCons, ...consultations]);
    setConsultationActive(true);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" /> 
            {isBn ? 'সার্টিফাইড বিশেষজ্ঞ নেটওয়ার্ক' : 'Certified Expert Network'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isBn ? 'কৃষিবিদ, ভেটেরিনারি সার্জন ও মৎস্য বিশেষজ্ঞ পোর্টাল' : 'Agronomist, Veterinary Surgeon & Fisheries Tele-Care'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
            {isBn 
              ? 'সরকারি ও বিশ্ববিদ্যালয় ডিগ্রিধারী নিবন্ধিত বিশেষজ্ঞদের সাথে সরাসরি ভিডিও/অডিও পরামর্শ ও প্রেসক্রিপশন সেবা।'
              : 'Direct tele-consultations and verified digital prescriptions with university-accredited agricultural experts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/20 text-white font-bold text-xs backdrop-blur-sm">
            {isBn ? 'পাইলট পর্বে সকল সেবা বিনামূল্যে' : 'Free during pilot program'}
          </span>
        </div>
      </div>

      {/* Experts Directory Grid */}
      <div>
        <h3 className="font-bold text-base text-slate-900 mb-3">
          {isBn ? 'অনলাইন কর্মরত বিশেষজ্ঞবৃন্দ' : 'Online Verified Specialists'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EXPERT_DIRECTORY.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 transition"
            >
              <div>
                <div className="flex items-start gap-3">
                  <img
                    src={exp.avatar}
                    alt={exp.nameBn}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full w-fit">
                      <ShieldCheck className="w-3 h-3" /> {isBn ? 'সরকারি যাচাইকৃত' : 'Govt Verified'}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{isBn ? exp.nameBn : exp.nameEn}</h4>
                    <p className="text-[11px] text-blue-700 font-semibold">{isBn ? exp.sectorBn : exp.sector}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {exp.rating} ({exp.reviewsCount})
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-2xl text-xs space-y-1 text-slate-600">
                  <p className="text-[11px]"><span className="font-bold text-slate-800">{isBn ? 'ডিগ্রি:' : 'Degree:'}</span> {exp.qualification}</p>
                  <p className="text-[11px]"><span className="font-bold text-slate-800">{isBn ? 'পদবি:' : 'Role:'}</span> {isBn ? exp.designation : exp.designationEn}</p>
                  <p className="text-[11px]"><span className="font-bold text-slate-800">{isBn ? 'অভিজ্ঞতা:' : 'Experience:'}</span> {exp.experienceYears} {isBn ? 'বছর' : 'yrs'}</p>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {isBn ? 'বিশেষজ্ঞতার ক্ষেত্র:' : 'Specialties:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {exp.specialties.map((sp, i) => (
                      <span key={i} className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md font-medium">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedExpert(exp)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition shadow-sm active:scale-95"
                >
                  {isBn ? 'পরামর্শের জন্য বুক করুন' : 'Book Consultation'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {isBn ? 'ডাক্তার অ্যাপয়েন্টমেন্ট বুকিং' : 'Book Expert Consultation'}
              </h3>
              <button onClick={() => setSelectedExpert(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-blue-50 rounded-2xl text-xs text-blue-950 flex items-center gap-3">
              <img src={selectedExpert.avatar} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
              <div>
                <h4 className="font-bold text-sm">{isBn ? selectedExpert.nameBn : selectedExpert.nameEn}</h4>
                <p className="text-[11px] text-blue-800">{isBn ? selectedExpert.designation : selectedExpert.designationEn}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">{selectedExpert.availability}</span>
              </div>
            </div>

            <form onSubmit={handleBookConsultation} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'জরুরি মাত্রা (Urgency):' : 'Urgency Level:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', nameBn: 'স্বাভাবিক', nameEn: 'Normal' },
                    { id: 'urgent', nameBn: 'জরুরি', nameEn: 'Urgent' },
                    { id: 'emergency', nameBn: 'অতি জরুরি', nameEn: 'Emergency' }
                  ].map((u) => (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => setBookingUrgency(u.id)}
                      className={`py-2 rounded-xl font-bold border transition ${
                        bookingUrgency === u.id ? 'bg-blue-800 text-white border-blue-800 shadow-sm' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {isBn ? u.nameBn : u.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {isBn ? 'সমস্যা বা রোগের বিস্তারিত বর্ণনা:' : 'Case Description & Symptoms:'}
                </label>
                <textarea
                  rows="3"
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder={isBn ? "কত দিন ধরে লক্ষণ দেখা যাচ্ছে, পূর্বে কোনো ওষুধ দেওয়া হয়েছে কিনা ইত্যাদি লিখুন..." : "Describe symptoms, duration, and any prior medication given..."}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition shadow active:scale-95"
              >
                {isBn ? 'বুকিং সম্পন্ন করুন ও ভিডিও কল শুরু করুন' : 'Confirm Booking & Start Video Call'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Video Call Simulation Screen */}
      {consultationActive && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-sm">
                {isBn ? 'লাইভ টেলিকনসালটেশন চলছে...' : 'Live Tele-Consultation Active...'}
              </span>
            </div>
            <button
              onClick={() => setConsultationActive(false)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold transition active:scale-95"
            >
              {isBn ? 'কল শেষ করুন' : 'End Call'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-44 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center p-4 text-center">
              <Video className="w-8 h-8 text-blue-400 mb-2 animate-bounce" />
              <p className="text-xs font-semibold">{isBn ? (selectedExpert?.nameBn || 'বিশেষজ্ঞ ডাক্তার') : (selectedExpert?.nameEn || 'Specialist Doctor')}</p>
              <span className="text-[10px] text-slate-400">{isBn ? 'অডিও/ভিডিও সংযুক্ত' : 'Audio/Video Connected'}</span>
            </div>

            <div className="h-44 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center p-4 text-center">
              <p className="text-xs font-bold text-emerald-400">{userProfile.fullName}</p>
              <span className="text-[10px] text-slate-400">{isBn ? 'আপনার ক্যামেরা সচল' : 'Your feed is live'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Past Consultations & Prescriptions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-700" />
          {isBn ? 'পূর্ববর্তী প্রেসক্রিপশন ও পরামর্শের ইতিহাস' : 'Past Consultations & Prescriptions'}
        </h3>

        <div className="space-y-3">
          {consultations.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{isBn ? c.expertName : (c.expertNameEn || c.expertName)}</h4>
                  <span className="text-xs text-slate-400">{isBn ? c.date : (c.dateEn || c.date)} • {isBn ? c.sectorBn : (c.sectorEn || c.sectorBn)}</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 w-fit">
                  {isBn ? 'প্রেসক্রিপশন ইস্যুকৃত' : 'Prescription Issued'}
                </span>
              </div>

              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-800">{isBn ? 'সমস্যা:' : 'Case:'}</span> {isBn ? c.issue : (c.issueEn || c.issue)}
              </div>

              <div className="p-3 rounded-xl bg-white border border-blue-100 text-xs text-slate-800">
                <span className="font-bold text-blue-900 block mb-1">
                  {isBn ? 'ডাক্তারের পরামর্শ ও প্রেসক্রিপশন নোট:' : "Doctor's Advice & Prescription Note:"}
                </span>
                <p className="leading-relaxed">{isBn ? c.prescription : (c.prescriptionEn || c.prescription)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
