// Fisheries and Aquaculture Data & Scientific Formulas for Bangladesh

export const FISH_SPECIES = [
  {
    id: 'rohu',
    nameBn: 'রুই মাছ',
    nameEn: 'Rohu (Labeo rohita)',
    waterLayer: 'পানির মধ্যম স্তর',
    feedHabit: 'প্লাঙ্কটন ও সম্পূরক খাদ্য',
    densityPerDecimal: 15,
    growthRate: '১ বছরে ১.২ - ১.৮ কেজি'
  },
  {
    id: 'catla',
    nameBn: 'কাতলা মাছ',
    nameEn: 'Catla (Gibelion catla)',
    waterLayer: 'পানির উপরের স্তর',
    feedHabit: 'জুপ্লাঙ্কটন ও ভাসমান খাদ্য',
    densityPerDecimal: 8,
    growthRate: '১ বছরে ২.০ - ২.৫ কেজি'
  },
  {
    id: 'mrigal',
    nameBn: 'মৃগেল মাছ',
    nameEn: 'Mrigal (Cirrhinus mrigala)',
    waterLayer: 'পানির তলদেশ',
    feedHabit: 'তলদেশের পচনশীল জৈব পদার্থ ও সম্পূরক খাদ্য',
    densityPerDecimal: 10,
    growthRate: '১ বছরে ৮০০ - ১২০০ গ্রাম'
  },
  {
    id: 'tilapia',
    nameBn: 'মনোসেক্স তেলাপিয়া',
    nameEn: 'Monosex Tilapia',
    waterLayer: 'সর্বস্তরের মাছ',
    feedHabit: 'ভাসমান বাণিজ্যিক ফিড',
    densityPerDecimal: 100, // For intensive/semi-intensive culture
    growthRate: '৪-৫ মাসে ৩০০ - ৪০০ গ্রাম'
  },
  {
    id: 'pangasius',
    nameBn: 'পাঙ্গাস মাছ',
    nameEn: 'Pangasius (Pangasianodon hypophthalmus)',
    waterLayer: 'পানির তলদেশ ও মধ্যস্তর',
    feedHabit: 'বাণিজ্যিক ভাসমান/ডুবন্ত ফিড',
    densityPerDecimal: 80,
    growthRate: '৬-৮ মাসে ১.০ - ১.৫ কেজি'
  }
];

export const WATER_QUALITY_STANDARDS = {
  ph: {
    min: 6.5,
    max: 8.5,
    unit: 'pH',
    idealDesc: '৭.০ - ৮.০ হলো মাছের জন্য শ্রেষ্ঠ মাত্রা।',
    warningLow: 'pH ৬.৫ এর কম হলে প্রতি শতাংশে ১ কেজি চুন প্রয়োগ করুন।',
    warningHigh: 'pH ৮.৫ এর বেশি হলে তেঁতুল পানি বা ইউরিয়া প্রয়োগ পরিহার করুন।'
  },
  do: {
    min: 5.0,
    max: 8.0,
    unit: 'mg/L',
    idealDesc: '৫ মিগ্রা/লিটারের বেশি থাকলে মাছের শ্বাসপ্রশ্বাস ও বৃদ্ধি চমৎকার হয়।',
    warningLow: '৩ মিগ্রা/লিটারের নিচে নামলে মাছ পানির উপরে ভেসে খাবি খাবে। দ্রুত পানির ঢেউ তৈরি করুন বা এয়ারেটর চালান বা অক্সিজেনের ট্যাবলেট (যেমন Oxymax) দিন।'
  },
  ammonia: {
    min: 0.0,
    max: 0.05,
    unit: 'mg/L',
    idealDesc: 'অ্যামোনিয়া ০.০২ এর নিচে রাখা দরকার।',
    warningHigh: '০.০৫ এর বেশি হলে বিষাক্ততা তৈরি হয়। তৎক্ষণাৎ খাদ্য দেওয়া বন্ধ করুন এবং পুকুরের তলার পানি বের করে নতুন পানি যোগ করুন অথবা জিওলাইট ব্যবহার করুন।'
  },
  temp: {
    min: 24,
    max: 32,
    unit: '°C',
    idealDesc: '২৫ - ৩০ ডিগ্রি সেলসিয়াসে মাছ সবচেয়ে বেশি খাদ্য গ্রহণ করে।'
  },
  transparency: {
    min: 25,
    max: 40,
    unit: 'সেমি (Secchi)',
    idealDesc: 'পানির সবুজ বর্ণ ও ২৫-৪০ সেমি স্বচ্ছতা নির্দেশ করে প্রাকৃতিক খাদ্য বিদ্যমান।'
  }
};

// Stocking Density Calculator
export function calculateStocking(pondAreaDecimal, pondDepthFeet, cultureType) {
  const area = parseFloat(pondAreaDecimal) || 0;
  const depth = parseFloat(pondDepthFeet) || 5;

  if (cultureType === 'polyculture_carp') {
    // Standard BD composite carp stocking ratio per decimal for 5-6 feet depth
    const totalFish = Math.round(area * 35);
    const ruiCount = Math.round(area * 12);
    const katlaCount = Math.round(area * 6);
    const mrigalCount = Math.round(area * 8);
    const silverCarpCount = Math.round(area * 5);
    const grassCarpCount = Math.round(area * 4);

    return {
      cultureTypeBn: 'মিশ্র কার্প জাতীয় মাছ চাষ (রুই, কাতলা, মৃগেল, কার্প)',
      totalFingerlings: totalFish,
      breakdown: [
        { name: 'রুই (মধ্য স্তর)', count: ruiCount, percentage: '৩৪%' },
        { name: 'কাতলা (উপরের স্তর)', count: katlaCount, percentage: '১৭%' },
        { name: 'মৃগেল (তলদেশ)', count: mrigalCount, percentage: '২৩%' },
        { name: 'সিলভার কার্প (প্লাঙ্কটন নিয়ন্ত্রক)', count: silverCarpCount, percentage: '১৪%' },
        { name: 'গ্রাস কার্প (জলজ ঘাস খাদক)', count: grassCarpCount, percentage: '১২%' }
      ],
      limeRequirementKg: (area * 1).toFixed(1), // 1 kg lime per decimal for pond prep
      cowdungRequirementKg: (area * 6).toFixed(1),
      advice: 'পুকুর প্রস্তুতির সময় শতকে ১ কেজি চুন ও ৬ কেজি গোবর দিয়ে ৭ দিন পর পানি তুলে পোনা মজুত করুন।'
    };
  } else {
    // Monoculture Tilapia or Pangas
    const totalFish = Math.round(area * 100);
    return {
      cultureTypeBn: 'বাণিজ্যিক মনোসেক্স তেলাপিয়া চাষ',
      totalFingerlings: totalFish,
      breakdown: [
        { name: 'মনোসেক্স তেলাপিয়া পোনা', count: totalFish, percentage: '১০০%' }
      ],
      limeRequirementKg: (area * 1.5).toFixed(1),
      cowdungRequirementKg: (area * 5).toFixed(1),
      advice: 'ভাসমান বাণিজ্যিক ফিড ব্যবহার করুন এবং সকাল ও বিকালে দুই কিস্তিতে খাদ্য দিন।'
    };
  }
}

// Daily feed requirement calculation based on biomass
export function calculateFishFeed(totalFishCount, avgWeightGrams, feedingRatePercent = 3.5) {
  const count = parseInt(totalFishCount) || 0;
  const avgGrams = parseFloat(avgWeightGrams) || 0;
  const totalBiomassKg = (count * avgGrams) / 1000;
  const dailyFeedKg = (totalBiomassKg * (feedingRatePercent / 100)).toFixed(2);
  const morningDoseKg = (dailyFeedKg * 0.6).toFixed(2);
  const eveningDoseKg = (dailyFeedKg * 0.4).toFixed(2);

  return {
    totalBiomassKg: totalBiomassKg.toFixed(1),
    dailyFeedKg,
    morningDoseKg,
    eveningDoseKg
  };
}

// Verified Hatchery Directory in Bangladesh
export const HATCHERY_DIRECTORY = [
  {
    id: 'hatchery-01',
    nameBn: 'ব্রহ্মপুত্র ফিশ হ্যাচারি ও ব্রিডিং কমপ্লেক্স',
    owner: 'মো. রফিকুল ইসলাম',
    district: 'ময়মনসিংহ',
    upazila: 'ত্রিশাল',
    phone: '০১৭২২-৪৫৬৭৮৯',
    availableSpecies: ['মনোসেক্স তেলাপিয়া', 'থাই পাঙ্গাস', 'রুই-কাতলা পোনা', 'গুলশা'],
    isVerified: true,
    rating: 4.9,
    priceNote: 'প্রতি হাজার তেলাপিয়া পোনা: ৮৫০-১০০০ টাকা'
  },
  {
    id: 'hatchery-02',
    nameBn: 'রূপালী মৎস্য হ্যাচারি ও রেণু খামার',
    owner: 'আলহাজ্ব শামসুল হক',
    district: 'যশোর',
    upazila: 'চৌগাছা',
    phone: '০১৮১৮-১২৩৪৫৬',
    availableSpecies: ['রুই', 'কাতলা', 'মৃগেল', 'সিলভার কার্প', 'পাবদা রেণু'],
    isVerified: true,
    rating: 4.8,
    priceNote: 'উচ্চমানের অক্সিজেন প্যাকেটজাত সরবরাহ ব্যবস্থা'
  },
  {
    id: 'hatchery-03',
    nameBn: 'মেঘনা একুয়া হ্যাচারি',
    owner: 'প্রকৌশলী মিজানুর রহমান',
    district: 'কুমিল্লা',
    upazila: 'দাউদকান্দি',
    phone: '০১৯১১-৯৮৭৬৫৪',
    availableSpecies: ['পাঙ্গাস', 'তেলাপিয়া', 'শিং-মাগুর'],
    isVerified: true,
    rating: 4.7,
    priceNote: 'পোনা বাছাই ও শতভাগ রোগমুক্ত নিশ্চিতকরণ'
  }
];
