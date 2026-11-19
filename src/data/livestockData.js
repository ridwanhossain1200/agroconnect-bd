// Veterinary and Livestock Data & Care Guidelines for Bangladesh

export const LIVESTOCK_SPECIES = [
  {
    id: 'cattle',
    nameBn: 'গরু / গবাদিপশু',
    nameEn: 'Cattle',
    categories: ['গাভী (দুগ্ধ খামার)', 'ষাঁড় মোটাতাজাকরণ (মাংস)', 'বাছুর পালন'],
    breeds: [
      {
        nameBn: 'শাহিওয়াল (Sahiwal)',
        origin: 'উপমহাদেশীয়',
        purpose: 'দুধ ও মাংস উভমুখী',
        dailyMilk: '৮-১৫ লিটার',
        climateSuitability: 'বাংলাদেশের আবহাওয়ায় অত্যন্ত সহনশীল ও রোগ প্রতিরোধ ক্ষমতা বেশি।'
      },
      {
        nameBn: 'হোলস্টেইন ফ্রিজিয়ান সংকর (HF Cross)',
        origin: 'সংকর জাত',
        purpose: 'উচ্চ দুগ্ধ উৎপাদন',
        dailyMilk: '১৫-২৫ লিটার',
        climateSuitability: 'অতিরিক্ত গরমে ফ্যান ও সুশীতল শেড প্রয়োজন। উচ্চ পুষ্টিকর সুষম খাদ্য দরকার।'
      },
      {
        nameBn: 'রেড চিটাগাং ক্যাটল (RCC)',
        origin: 'চট্টগ্রাম, বাংলাদেশ',
        purpose: 'দুধ ও প্রাকৃতিক রোগ সহনশীল',
        dailyMilk: '৪-৮ লিটার',
        climateSuitability: 'শতভাগ দেশীয় পরিবেশে খাপ খায়, সাধারণ খাবারেও সুস্থ থাকে।'
      }
    ],
    dailyFeedPerAnimal: {
      greenGrassKg: '১৫-২০ কেজি কাঁচা ঘাস (নেপিয়ার / জার্মান)',
      dryStrawKg: '৩-৪ কেজি শুকনা খড় (ইউরিয়া মোলাসেস প্রক্রিয়াজাত)',
      concentrateKg: '২-৩ কেজি দানাদার খাদ্য (ভুট্টা ভাঙা, গমের ভুসি, খৈল, লবণ, ডিসিপি)',
      waterLiters: '৩০-৫০ লিটার পরিস্কার বিশুদ্ধ পানি'
    },
    vaccineSchedule: [
      { diseaseBn: 'তড়কা (Anthrax)', ageBn: '৬ মাস বয়সে', intervalBn: 'প্রতি বছর ১ বার (বর্ষার আগে)' },
      { diseaseBn: 'বাদলা (Black Quarter)', ageBn: '৬ মাস বয়সে', intervalBn: 'প্রতি বছর ১ বার' },
      { diseaseBn: 'ক্ষুরারোগ (FMD)', ageBn: '৪ মাস বয়সে', intervalBn: 'প্রতি ৪-৬ মাস পর পর' },
      { diseaseBn: 'গলাফুলা (HS)', ageBn: '৬ মাস বয়সে', intervalBn: 'প্রতি বছর ১ বার' }
    ]
  },
  {
    id: 'goat',
    nameBn: 'ছাগল ও ভেড়া',
    nameEn: 'Goat / Sheep',
    categories: ['মাংস উৎপাদন', 'বাচ্চা উৎপাদন / ব্রিডিং'],
    breeds: [
      {
        nameBn: 'ব্ল্যাক বেঙ্গল ছাগল (Black Bengal)',
        origin: 'বাংলাদেশ',
        purpose: 'উচ্চমানের সুস্বাদু মাংস ও চামড়া',
        climateSuitability: 'বছরে ২ বার বাচ্চা দেয় (একবারে ২-৩টি বাচ্চা)। বাংলাদেশের নিজস্ব সেরা সম্পদ।'
      },
      {
        nameBn: 'যমুনাপারি ছাগল (Jamunapari)',
        origin: 'ভারত',
        purpose: 'উচ্চ শারীরিক বৃদ্ধি ও দুধ',
        climateSuitability: 'লম্বা পা ও কান, দ্রুত ওজন বাড়ে, উঁচু মাচায় শুষ্ক ঘরে পালন উপযোগী।'
      }
    ],
    dailyFeedPerAnimal: {
      greenGrassKg: '২-৩ কেজি কচি ঘাস ও কাঁঠাল পাতা',
      concentrateKg: '১৫০-২৫০ গ্রাম দানাদার ভুসি মিশ্রণ',
      waterLiters: '৩-৫ লিটার বিশুদ্ধ পানি'
    },
    vaccineSchedule: [
      { diseaseBn: 'পিপিআর (PPR)', ageBn: '৩ মাস বয়সে', intervalBn: 'একবার দিলে ৩ বছর প্রতিরোধ ক্ষমতা থাকে' },
      { diseaseBn: 'ছাগলের বসন্ত (Goat Pox)', ageBn: '৩-৪ মাস বয়সে', intervalBn: 'প্রতি বছর ১ বার' }
    ]
  },
  {
    id: 'poultry',
    nameBn: 'হাঁস-মুরগি (পোল্ট্রি)',
    nameEn: 'Poultry',
    categories: ['ব্রয়লার (মাংস)', 'সোনালী মুরগি', 'লেয়ার (ডিম)'],
    breeds: [
      {
        nameBn: 'ব্রয়লার (কব্ব ৫০০ / রস ৩০৮)',
        purpose: 'দ্রুত মাংস বৃদ্ধি (৩২-৩৫ দিনে ১.৮-২.০ কেজি)',
        climateSuitability: 'নির্দিষ্ট তাপমাত্রা ব্রুডিং ও ফ্যান ব্যবস্থাপনা প্রয়োজন।'
      },
      {
        nameBn: 'সোনালী মুরগি',
        purpose: 'দেশি স্বাদযুক্ত মাংস',
        climateSuitability: '৬৫-৭০ দিনে ৭০০-৮৫০ গ্রাম ওজন হয়। রোগ প্রতিরোধ ক্ষমতা ভালো।'
      }
    ],
    dailyFeedPerAnimal: {
      concentrateKg: 'বয়সভেদে ব্রয়লার স্টার্টার, গ্রোয়ার ও ফিনিশার ফিড (দৈনিক ৫০-১৫০ গ্রাম)'
    },
    vaccineSchedule: [
      { diseaseBn: 'রাণীক্ষেত (BCRDV / RDV)', ageBn: '৪-৭ দিনে চোখের ড্রপ, ২১ দিনে ১ম বুস্টার' },
      { diseaseBn: 'গামবোরো (Gumboro)', ageBn: '১০-১২ দিনে ১ম ডোজ, ১৮-২১ দিনে ২য় ডোজ' }
    ]
  }
];

// FCR Calculation Formula: Total Feed Consumed (kg) / Total Weight Gain (kg)
export function calculateFCR(totalFeedKg, initialWeightKg, finalWeightKg, birdOrAnimalCount) {
  const feed = parseFloat(totalFeedKg) || 0;
  const initial = (parseFloat(initialWeightKg) || 0) * (parseInt(birdOrAnimalCount) || 1);
  const final = (parseFloat(finalWeightKg) || 0) * (parseInt(birdOrAnimalCount) || 1);
  const totalWeightGain = final - initial;

  if (totalWeightGain <= 0 || feed <= 0) {
    return { fcr: 0, status: 'অপূর্ণ তথ্য', advice: 'সঠিক ওজন ও খাদ্যের তথ্য প্রদান করুন।' };
  }

  const fcr = (feed / totalWeightGain).toFixed(2);
  let status = 'উত্তম';
  let advice = 'খামারের এফসিআর মান খুবই লাভজনক। খাদ্য ব্যবস্থাপনা ঠিক আছে।';

  if (fcr > 1.8) {
    status = 'অতিরিক্ত খরচ (সতর্কতা)';
    advice = 'খাদ্য অপচয় হচ্ছে অথবা পুষ্টির ঘাটতি রয়েছে। পাত্রের খাদ্য নিয়ন্ত্রণ ও কৃমির চিকিৎসা দরকার।';
  } else if (fcr >= 1.5 && fcr <= 1.8) {
    status = 'সন্তোষজনক';
    advice = 'এফসিআর স্বাভাবিক মাত্রায় আছে, আরও একটু নিয়মিত তদারকিতে লাভ বাড়বে।';
  }

  return {
    fcr,
    totalWeightGain: totalWeightGain.toFixed(2),
    status,
    advice
  };
}
