// Crop Catalog & Verified Agricultural Recommendation Guidelines for Bangladesh

export const CROPS = [
  {
    id: 'crop-rice-boro',
    nameBn: 'বোরো ধান (ব্রি ধান-২৮ / ২৯ / ৮৮)',
    nameEn: 'Boro Rice (BR-28/29/88)',
    category: 'দানাদার ফসল',
    suitableSeasons: ['রবি (অক্টোবর - মার্চ)'],
    suitableSoil: ['দোআঁশ', 'এঁটেল দোআঁশ', 'পলি দোআঁশ'],
    durationDays: 140,
    expectedYieldPerDecimal: '২৫-৩০ কেজি',
    waterRequirement: 'উচ্চ (সেচ নির্ভর)',
    // Fertilizer dosage in grams per decimal (শতাংশ)
    fertilizerDosePerDecimal: {
      urea: 1000, // 1 kg
      tsp: 400,   // 400 gm
      dap: 0,
      mop: 500,   // 500 gm
      gypsum: 300,
      zinc: 40,
      cowdung: 20000 // 20 kg
    },
    applicationSchedule: [
      { stage: 'জমি তৈরি শেষ চাষে', fertilizer: 'সম্পূর্ণ টিএসপি/ডিএপি, জিপসাম, জিংক ও ১/৩ ভাগ এমওপি' },
      { stage: 'চারা রোপণের ১৫-২০ দিন পর (কুশি আসার সময়)', fertilizer: '১ম কিস্তি ইউরিয়া (১/৩ অংশ)' },
      { stage: 'চারা রোপণের ৩৫-৪০ দিন পর (সর্বোচ্চ কুশি)', fertilizer: '২য় কিস্তি ইউরিয়া ও অবশিষ্ট এমওপি' },
      { stage: 'কাইচ থোড় আসার ৫-৭ দিন পূর্বে', fertilizer: '৩য় কিস্তি ইউরিয়া (১/৩ অংশ)' }
    ],
    diseases: [
      {
        nameBn: 'ধানের ব্লাস্ট রোগ (পাতার ও গলার ব্লাস্ট)',
        symptoms: 'পাতায় চোখের মত দাগ, দাগের মাঝের অংশ ছাই রঙের এবং কিনারা বাদামি। শীষের গোড়া পচে কালো হয়ে শীষ ভেঙে পড়ে।',
        prevention: 'রোগ প্রতিরোধী জাত ব্যবহার, সুষম সার ব্যবহার এবং অতিরিক্ত ইউরিয়া পরিহার।',
        organicTreatment: 'ছাই ছিটানো, নিম খৈল প্রয়োগ ও ট্রাইকোডার্মা ব্যবহার।',
        chemicalTreatment: 'ট্রাইসাইক্লাজোল (যেমন ট্রুপার/দিফা) প্রতি লিটার পানিতে ১ গ্রাম হারে অথবা এ্যাজোক্সিস্ট্রবিন+ডাইফেনোকোনাজোল স্প্রে করা।',
        urgency: 'high'
      },
      {
        nameBn: 'ধানের খোলপোড়া রোগ (Sheath Blight)',
        symptoms: 'গোড়ার খোলের ওপর সাপের চামড়ার মতো অনিয়মিত ধূসর দাগ দেখা যায়।',
        prevention: 'গাছের গোড়া পরিস্কার রাখা, জমিতে অতিরিক্ত পানি জমতে না দেওয়া।',
        organicTreatment: 'মাঝারি রোদ নিশ্চিত করা, সুষম পটাশ সার ব্যবহার।',
        chemicalTreatment: 'ভ্যালিডামাইসিন (ভ্যালিডা) প্রতি লিটারে ২ মিলি হারে গোড়ায় স্প্রে করা।',
        urgency: 'medium'
      },
      {
        nameBn: 'মাজরা পোকা (Stem Borer)',
        symptoms: 'গাছের মাঝের কুশি শুকিয়ে যায় যাকে "মরা ডিগ" বলে। শীষ আসার পর ক্ষতি হলে শীষ সাদা হয়ে যায় (সাদা শীষ)।',
        prevention: 'আলোক ফাঁদ ব্যবহার, জমিতে ডালপালা পুঁতে পাখি বসার ব্যবস্থা (পার্চিং)।',
        organicTreatment: 'ট্রাইকোগ্রামা পরজীবী পোকা অবমুক্তকরণ, নিম তেলের স্প্রে।',
        chemicalTreatment: 'কার্বোফিউরান (ফুরাডান ৫জি) অথবা ক্লোরান্ট্রানিলিপ্রোল (ভার্টাকো) প্রয়োগ।',
        urgency: 'medium'
      }
    ]
  },
  {
    id: 'crop-potato',
    nameBn: 'আলু (ডায়মন্ড / কার্ডিনাল / গ্র্যানুলা)',
    nameEn: 'Potato (Diamond / Cardinal)',
    category: 'কন্দ জাতীয় ফসল',
    suitableSeasons: ['রবি (নভেম্বর - ফেব্রুয়ারি)'],
    suitableSoil: ['বেলে দোআঁশ', 'হালকা দোআঁশ'],
    durationDays: 85,
    expectedYieldPerDecimal: '১০০-১২০ কেজি',
    waterRequirement: 'মাঝারি (৩-৪ টি নিয়ন্ত্রিত সেচ)',
    fertilizerDosePerDecimal: {
      urea: 1200,
      tsp: 800,
      dap: 0,
      mop: 1000,
      gypsum: 400,
      zinc: 50,
      magnesium: 150,
      cowdung: 35000
    },
    applicationSchedule: [
      { stage: 'জমি তৈরিতে শেষ চাষে', fertilizer: 'অর্ধেক ইউরিয়া, সম্পূর্ণ টিএসপি, অর্ধেক এমওপি, জিপসাম ও গোবর' },
      { stage: 'গাছের বয়স ২৫-৩০ দিন (গাছের গোড়ায় মাটি তোলার সময়)', fertilizer: 'অবশিষ্ট ইউরিয়া ও অবশিষ্ট এমওপি' }
    ],
    diseases: [
      {
        nameBn: 'আলুর মড়ক বা লেইট ব্লাইট (Late Blight)',
        symptoms: 'পাতায় প্রথমে পানিভেজা কালচে দাগ, সকালে পাতার নিচে সাদা ছত্রাকের গুঁড়ো দেখা যায় এবং কুয়াশাচ্ছন্ন আবহাওয়ায় দ্রুত সমস্ত গাছ পচে গন্ধ বের হয়।',
        prevention: 'রোগমুক্ত প্রত্যয়িত বীজ রোপণ, কুয়াশা পড়লে আগাম সতর্কতামূলক ছত্রাকনাশক স্প্রে।',
        organicTreatment: 'বোর্দো মিক্সচার স্প্রে করা।',
        chemicalTreatment: 'ম্যানকোজেব (ডায়থেন এম-৪৫) প্রতি লিটারে ২ গ্রাম অথবা মেটালাক্সিল+ম্যানকোজেব (রিডোমিল গোল্ড) প্রতি লিটারে ২ গ্রাম কুয়াশার আগে থেকেই স্প্রে করা।',
        urgency: 'critical' // triggers immediate expert escalation
      },
      {
        nameBn: 'আলুর দাঁদ রোগ (Scab)',
        symptoms: 'আলুর গায়ে খসখসে ক্ষতের মতো বাদামি দাগ পড়ে, দেখতে বিশ্রী হয়।',
        prevention: 'বীজ শোধন, মাটির অতিরিক্ত অম্লতা বা ক্ষারত্ব নিয়ন্ত্রণ।',
        organicTreatment: 'ট্রাইকো-কম্পোস্ট ব্যবহার।',
        chemicalTreatment: 'অটোস্টিন বা কার্বেনডাজিম দিয়ে বীজ শোধন।',
        urgency: 'low'
      }
    ]
  },
  {
    id: 'crop-onion',
    nameBn: 'পেঁয়াজ (তাহেরপুরী / বারি পেঁয়াজ-১ / ৪)',
    nameEn: 'Onion (Taherpuri / BARI Onion)',
    category: 'মসলা জাতীয় ফসল',
    suitableSeasons: ['রবি ও খরিফ-২'],
    suitableSoil: ['উর্বর বেলে দোআঁশ'],
    durationDays: 100,
    expectedYieldPerDecimal: '৪০-৫০ কেজি',
    waterRequirement: 'নিয়মিত হালকা সেচ',
    fertilizerDosePerDecimal: {
      urea: 1000,
      tsp: 900,
      dap: 0,
      mop: 750,
      gypsum: 450,
      zinc: 40,
      cowdung: 30000
    },
    applicationSchedule: [
      { stage: 'জমি তৈরিতে', fertilizer: 'সম্পূর্ণ গোবর, টিএসপি, জিপসাম ও অর্ধেক এমওপি' },
      { stage: 'চারা রোপণের ২৫ দিন পর', fertilizer: '১ম কিস্তি ইউরিয়া ও অবশিষ্ট অর্ধেক এমওপি' },
      { stage: 'চারা রোপণের ৫০ দিন পর', fertilizer: '২য় কিস্তি ইউরিয়া' }
    ],
    diseases: [
      {
        nameBn: 'পেঁয়াজের বেগুনি দাগ রোগ (Purple Blotch)',
        symptoms: 'পাতায় ছোট ছোট বাদামি বা বেগুনি রঙের বৃত্তাকার দাগ, পরে বড় হয়ে পাতা শুকিয়ে মরে যায়।',
        prevention: 'রোগমুক্ত বীজ ব্যবহার, ঘন করে না লাগানো।',
        organicTreatment: 'রসুন ও নিম পাতার নির্যাস স্প্রে।',
        chemicalTreatment: 'রোভরাল ৫০ ডব্লিউপি (ইপ্রোডিয়ন) প্রতি লিটার পানিতে ২ গ্রাম অথবা এন্ট্রাকল স্প্রে।',
        urgency: 'medium'
      },
      {
        nameBn: 'পেঁয়াজের থ্রিপস পোকা (Thrips)',
        symptoms: 'পাতার রস চুষে খায়, পাতা কুঁচকে রুপালি সাদা দাগ তৈরি হয়।',
        prevention: 'নীল রঙের আঠালো ফাঁদ (Blue sticky trap) স্থাপন।',
        organicTreatment: 'সাবান পানির স্প্রে (৫ গ্রাম ডিটারজেন্ট প্রতি লিটার)।',
        chemicalTreatment: 'ইমিডাক্লোপ্রিড (এডমায়ার/টিডো) প্রতি লিটারে ০.৫ মিলি স্প্রে।',
        urgency: 'medium'
      }
    ]
  },
  {
    id: 'crop-mustard',
    nameBn: 'সরিষা (বারি সরিষা-১৪ / ১৭ / টোরি-৭)',
    nameEn: 'Mustard (BARI Sarisha-14/17)',
    category: 'তৈলবীজ ফসল',
    suitableSeasons: ['রবি (কার্তিক - অগ্রহায়ণ)'],
    suitableSoil: ['বেলে দোআঁশ ও পলি দোআঁশ'],
    durationDays: 75,
    expectedYieldPerDecimal: '৬-৮ কেজি',
    waterRequirement: 'কম (১-২ টি হালকা সেচ)',
    fertilizerDosePerDecimal: {
      urea: 1000,
      tsp: 600,
      dap: 0,
      mop: 350,
      gypsum: 600,
      zinc: 30,
      boron: 40,
      cowdung: 15000
    },
    applicationSchedule: [
      { stage: 'শেষ চাষের সময়', fertilizer: 'অর্ধেক ইউরিয়া এবং সম্পূর্ণ টিএসপি, এমওপি, জিপসাম, জিংক ও বোরন' },
      { stage: 'ফুল আসার সময় (২৫-৩০ দিন পর)', fertilizer: 'বাকি অর্ধেক ইউরিয়া সেচের পর উপরিপ্রয়োগ' }
    ],
    diseases: [
      {
        nameBn: 'সরিষার জাবপোকা (Mustard Aphid)',
        symptoms: 'কচি ডগা ও ফুল থেকে রস চুষে খায়, ফলে ফুল ও ফল শুকাতে শুরু করে।',
        prevention: 'আগাম বপন (নভেম্বরের ১ম সপ্তাহেই বীজ বোনা)।',
        organicTreatment: 'হলুদ আঠালো ফাঁদ (Yellow sticky trap) ব্যবহার।',
        chemicalTreatment: 'ম্যালাথিয়ন ৫৭ ইসি প্রতি লিটারে ২ মিলি অথবা ডাইমেথোয়েট স্প্রে করা।',
        urgency: 'high'
      }
    ]
  }
];

// Helper to calculate fertilizer requirement based on land size and unit
export function calculateFertilizer(cropId, landSize, landUnit) {
  const crop = CROPS.find(c => c.id === cropId) || CROPS[0];
  
  // Convert land size to Decimal (শতাংশ)
  const unitMultipliers = {
    decimal: 1,
    bigha: 33,
    katha: 1.65,
    acre: 100,
    hectare: 247.1
  };
  
  const decimalArea = (parseFloat(landSize) || 0) * (unitMultipliers[landUnit] || 1);
  const dose = crop.fertilizerDosePerDecimal;

  // Rates in Kg for easy readability
  const ureaKg = ((dose.urea * decimalArea) / 1000).toFixed(2);
  const tspKg = ((dose.tsp * decimalArea) / 1000).toFixed(2);
  const mopKg = ((dose.mop * decimalArea) / 1000).toFixed(2);
  const gypsumKg = ((dose.gypsum * decimalArea) / 1000).toFixed(2);
  const zincKg = ((dose.zinc * decimalArea) / 1000).toFixed(2);
  const cowdungKg = ((dose.cowdung * decimalArea) / 1000).toFixed(1);

  // Approximate current subsidized government prices in BD (BDT/kg)
  const ureaCost = (ureaKg * 27).toFixed(0);
  const tspCost = (tspKg * 32).toFixed(0);
  const mopCost = (mopKg * 22).toFixed(0);
  const gypsumCost = (gypsumKg * 15).toFixed(0);
  const totalEstCost = (parseFloat(ureaCost) + parseFloat(tspCost) + parseFloat(mopCost) + parseFloat(gypsumCost)).toFixed(0);

  return {
    crop,
    decimalArea: decimalArea.toFixed(2),
    ureaKg,
    tspKg,
    mopKg,
    gypsumKg,
    zincKg,
    cowdungKg,
    ureaCost,
    tspCost,
    mopCost,
    gypsumCost,
    totalEstCost,
    applicationSchedule: crop.applicationSchedule
  };
}
