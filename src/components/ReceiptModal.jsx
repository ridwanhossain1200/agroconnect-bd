import React from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../data/translations';
import { 
  X, 
  Printer, 
  CheckCircle, 
  Share2, 
  Download, 
  QrCode, 
  MapPin, 
  Phone, 
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react';

export default function ReceiptModal() {
  const { receiptModalOrder, setReceiptModalOrder, lang } = useApp();
  const { isBn } = useTranslation(lang);

  if (!receiptModalOrder) return null;

  const order = receiptModalOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">
              {isBn ? 'ডিজিটাল বিক্রয় রশিদ (Order Receipt)' : 'Digital Trade Receipt'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition active:scale-95"
              title={isBn ? "প্রিন্ট বা PDF হিসেবে সংরক্ষণ করুন" : "Print or save as PDF"}
            >
              <Printer className="w-3.5 h-3.5" />
              {isBn ? 'প্রিন্ট / PDF' : 'Print / PDF'}
            </button>
            <button
              onClick={() => setReceiptModalOrder(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div id="printable-receipt" className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-800 bg-white no-scrollbar">
          
          {/* Receipt Top Header */}
          <div className="flex items-start justify-between border-b-2 border-dashed border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-black flex items-center justify-center text-sm">
                  {isBn ? 'কৃ' : 'A'}
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-emerald-900">
                    {isBn ? 'কৃষি সংযোগ মার্কেটপ্লেস' : 'AgroConnect Marketplace'}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {isBn ? 'সরাসরি কৃষক-পাইকারি ক্রেতা প্ল্যাটফর্ম' : 'Direct Farmer-to-Wholesale Trading Hub'}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle className="w-3.5 h-3.5" /> 
                {isBn ? 'নিশ্চিত অর্ডার' : 'Confirmed'}
              </span>
              <div className="text-xs font-mono font-bold text-slate-600 mt-1">
                {isBn ? 'মেমো নং:' : 'Memo:'} {order.id}
              </div>
              <div className="text-[11px] text-slate-400">
                {isBn ? 'তারিখ:' : 'Date:'} {order.orderDate}
              </div>
            </div>
          </div>

          {/* Parties: Seller & Buyer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block mb-1">
                {isBn ? 'বিক্রেতা (কৃষক/খামারি):' : 'Seller (Farmer/Producer):'}
              </span>
              <p className="font-bold text-slate-900 text-sm">{order.farmerName}</p>
              <p className="text-slate-600 flex items-center gap-1 mt-1">
                <Phone className="w-3 h-3 text-slate-400" /> {order.farmerPhone}
              </p>
              <p className="text-slate-500 mt-1 flex items-start gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" /> {order.pickupLocation}
              </p>
            </div>

            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block mb-1">
                {isBn ? 'ক্রেতা (পাইকারি ব্যবসায়ী/আড়তদার):' : 'Buyer (Wholesaler/Trader):'}
              </span>
              <p className="font-bold text-slate-900 text-sm">{order.buyerName}</p>
              <p className="text-slate-600 flex items-center gap-1 mt-1">
                <Phone className="w-3 h-3 text-slate-400" /> {order.buyerPhone}
              </p>
              <p className="text-slate-500 mt-1">
                {isBn ? 'পদ্ধতি:' : 'Terms:'} <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
              </p>
            </div>
          </div>

          {/* Product Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">{isBn ? 'আইটেম বিবরণ' : 'Description'}</th>
                  <th className="p-3 text-center">{isBn ? 'পরিমাণ' : 'Qty'}</th>
                  <th className="p-3 text-right">{isBn ? `দর (প্রতি ${order.unit})` : `Rate (/${order.unit})`}</th>
                  <th className="p-3 text-right">{isBn ? 'মোট মূল্য' : 'Total'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-medium text-slate-900">
                    <div>{order.productName}</div>
                    <div className="text-[10px] text-slate-500">{isBn ? 'ক্যাটাগরি:' : 'Category:'} {order.category}</div>
                  </td>
                  <td className="p-3 text-center font-bold">
                    {order.quantity} {order.unit}
                  </td>
                  <td className="p-3 text-right">
                    ৳ {order.unitPrice.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-900 text-sm">
                    ৳ {order.totalAmount.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Total Calculation */}
            <div className="bg-emerald-50/70 p-4 border-t border-slate-200 flex flex-col items-end">
              <div className="w-full sm:w-1/2 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{isBn ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                  <span className="font-semibold">৳ {order.totalAmount.toLocaleString(isBn ? 'bn-BD' : 'en-US')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isBn ? 'প্ল্যাটফর্ম ফি (পাইলট ফ্রি):' : 'Platform Fee (Pilot Free):'}</span>
                  <span className="font-semibold text-emerald-700">৳ ০.০০</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-emerald-200">
                  <span>{isBn ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                  <span className="text-emerald-800 font-extrabold text-base">
                    ৳ {order.totalAmount.toLocaleString(isBn ? 'bn-BD' : 'en-US')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery & Handover Instructions */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <Calendar className="w-4 h-4 text-amber-700" /> 
              {isBn ? 'পণ্য সংগ্রহ ও ডেলিভারি নির্দেশিকা:' : 'Logistics & Pickup Instructions:'}
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              • {isBn ? 'সম্ভাব্য পিকআপ তারিখ:' : 'Expected Pickup Date:'} <span className="font-semibold">{order.pickupDate}</span>
            </p>
            <p className="text-[11px] leading-relaxed text-amber-800">
              • {order.notes}
            </p>
          </div>

          {/* Digital Signature & QR Verification */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 p-1 bg-white border border-slate-300 rounded-lg flex items-center justify-center shrink-0">
                <QrCode className="w-14 h-14 text-slate-800" />
              </div>
              <div>
                <p className="font-semibold text-slate-700">
                  {isBn ? 'ডিজিটালভাবে যাচাইকৃত মেমো' : 'Cryptographically Verified Memo'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isBn ? 'স্ক্যান করে প্ল্যাটফর্মে সত্যতা নিশ্চিত করুন' : 'Scan QR code to verify authenticity'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="h-10 flex items-end justify-end">
                <span className="font-serif italic font-bold text-slate-700 text-sm border-b border-slate-400 px-4">
                  AgroConnect BD
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {isBn ? 'অনুমোদিত ডিজিটাল স্বাক্ষর' : 'Authorized Digital Signature'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
