// Regional Weather & Agro-Meteorological Advisory Data for Bangladesh
// Source: Bangladesh Meteorological Department (BMD) Station Feed Reference

export const WEATHER_DATA = {
  dhaka: {
    temp: 29,
    condition: 'আংশিক মেঘলা',
    conditionEn: 'Partly Cloudy',
    humidity: '৬৫%',
    rainProb: '২০%',
    windSpeed: '১২ কিমি/ঘণ্টা',
    stationName: 'ঢাকা (আগারগাঁও আবহাওয়া পর্যবেক্ষণাগার)',
    stationNameEn: 'Dhaka (Agargaon Observatory)',
    lastUpdated: 'আজ সকাল ১০:১৫ (BMD সিনপটিক চার্ট)',
    lastUpdatedEn: 'Today 10:15 AM (BMD Synoptic Chart)',
    forecast: 'পরবর্তী ৪৮ ঘণ্টায় আকাশ আংশিক মেঘলা থাকতে পারে। মাঝারি তাপমাত্রা ও সহনীয় আর্দ্রতা বিরাজ করবে।',
    forecastEn: 'Partly cloudy sky over next 48 hours with moderate temperature and comfortable humidity.',
    alerts: {
      agri: {
        textBn: 'ফসলের জমিতে সেচ দেওয়ার জন্য আবহাওয়া উপযোগী। তবে নাইট্রোজেন সার প্রয়োগের পর হালকা সেচ দিন।',
        textEn: 'Suitable weather for field irrigation. Apply light irrigation after urea application.',
        level: 'normal',
        levelLabelBn: 'অনুকূল আবহাওয়া',
        levelLabelEn: 'Favorable'
      },
      livestock: {
        textBn: 'শেডের পর্যাপ্ত বায়ুচলাচল নিশ্চিত করুন। দুপুরবেলা প্রাণীদের পর্যাপ্ত ঠাণ্ডা ও লবণযুক্ত পানি দিন।',
        textEn: 'Ensure good ventilation in sheds. Provide ample cool, mineralized water during midday.',
        level: 'medium',
        levelLabelBn: 'মাঝারি সতর্কতা',
        levelLabelEn: 'Moderate'
      },
      fish: {
        textBn: 'পুকুরে স্বাভাবিক খাবার প্রয়োগ বজায় রাখুন। পানির রঙ ও অক্সিজেন মাত্রা সন্তোষজনক।',
        textEn: 'Maintain normal feeding. Pond water color and dissolved oxygen remain optimal.',
        level: 'normal',
        levelLabelBn: 'স্বাভাবিক',
        levelLabelEn: 'Normal'
      }
    }
  },
  bogra: {
    temp: 27,
    condition: 'কুয়াশাচ্ছন্ন সকাল ও শুষ্ক দিন',
    conditionEn: 'Foggy Morning & Dry Day',
    humidity: '৭২%',
    rainProb: '৫%',
    windSpeed: '৮ কিমি/ঘণ্টা',
    stationName: 'বগুড়া কৃষি আবহাওয়া মানমন্দির',
    stationNameEn: 'Bogra Agro-Meteorological Station',
    lastUpdated: 'আজ সকাল ৯:০০ (রাডার সংকেত)',
    lastUpdatedEn: 'Today 9:00 AM (Radar Feed)',
    forecast: 'শীতের আগমনে ভোরের দিকে ঘন কুয়াশা পড়তে পারে। দিনের তাপমাত্রা আরামদায়ক থাকবে।',
    forecastEn: 'Dense fog during early morning hours. Daytime temperature remains pleasant.',
    alerts: {
      agri: {
        textBn: 'সতর্কতা: ঘন কুয়াশার কারণে আলু ও সরিষায় লেইট ব্লাইট বা জাবপোকার আক্রমণ হতে পারে। আগাম প্রতিষেধক স্প্রে করুন।',
        textEn: 'Warning: Dense fog creates high risk of late blight in potatoes and aphid in mustard. Spray preventive fungicide.',
        level: 'high',
        levelLabelBn: 'জরুরি সতর্কতা',
        levelLabelEn: 'High Alert'
      },
      livestock: {
        textBn: 'রাতে ও ভোরে বাছুর এবং ছাগলের ঘরে চটের পর্দা ঝুলিয়ে শীত থেকে সুরক্ষা নিশ্চিত করুন।',
        textEn: 'Protect young calves and goats from cold morning drafts using jute curtains.',
        level: 'medium',
        levelLabelBn: 'মাঝারি সতর্কতা',
        levelLabelEn: 'Moderate'
      },
      fish: {
        textBn: 'শীতকালে মাছের খাদ্য গ্রহণের হার কমে যায়, তাই খাদ্যের পরিমাণ ১০-১৫% কমিয়ে দিন।',
        textEn: 'Fish metabolism slows down in cold weather; reduce daily feed ration by 10-15%.',
        level: 'medium',
        levelLabelBn: 'সতর্কতা',
        levelLabelEn: 'Caution'
      }
    }
  },
  dinajpur: {
    temp: 26,
    condition: 'হালকা রোদ ও ঠান্ডা বাতাস',
    conditionEn: 'Mild Sun & Cool Breeze',
    humidity: '৬৮%',
    rainProb: '০%',
    windSpeed: '১০ কিমি/ঘণ্টা',
    stationName: 'দিনাজপুর আঞ্চলিক আবহাওয়া কেন্দ্র',
    stationNameEn: 'Dinajpur Regional Weather Office',
    lastUpdated: 'আজ সকাল ৮:৪৫',
    lastUpdatedEn: 'Today 8:45 AM',
    forecast: 'উত্তরাঞ্চলে শীতের তীব্রতা সামান্য বৃদ্ধি পেতে পারে। আকাশ পরিষ্কার থাকবে।',
    forecastEn: 'Cooler nighttime temperatures in northern belt. Clear skies throughout.',
    alerts: {
      agri: {
        textBn: 'বোরো ধানের বীজতলায় স্বচ্ছ পলিথিন দিয়ে ঢেকে রাখুন যাতে ঠান্ডায় চারা হলুদ না হয়ে যায়।',
        textEn: 'Cover Boro seedbeds with transparent polythene sheets at night to prevent cold injury.',
        level: 'high',
        levelLabelBn: 'উচ্চ সতর্কতা',
        levelLabelEn: 'High Alert'
      },
      livestock: {
        textBn: 'পোল্ট্রি শেডে ব্রুডিং তাপমাত্রা বজায় রাখুন। ভিটামিন-সি ও ইলেকট্রোলাইট সরবরাহ করুন।',
        textEn: 'Maintain strict brooding temperature in poultry sheds. Supplement with vitamin C and electrolytes.',
        level: 'medium',
        levelLabelBn: 'মাঝারি সতর্কতা',
        levelLabelEn: 'Moderate'
      },
      fish: {
        textBn: 'পুকুরে নিয়মিত জাল টেনে তলদেশের বিষাক্ত গ্যাস দূর করুন ও পানির স্বচ্ছতা বজায় রাখুন।',
        textEn: 'Drag netting periodically to release harmful bottom gases and maintain water clarity.',
        level: 'normal',
        levelLabelBn: 'অনুকূল',
        levelLabelEn: 'Normal'
      }
    }
  },
  mymensingh: {
    temp: 28,
    condition: 'রৌদ্রোজ্জ্বল ও মিষ্টি বাতাস',
    conditionEn: 'Sunny & Pleasant Breeze',
    humidity: '৫৮%',
    rainProb: '১০%',
    windSpeed: '১১ কিমি/ঘণ্টা',
    stationName: 'ময়মনসিংহ রাডার স্টেশন',
    stationNameEn: 'Mymensingh Radar Station',
    lastUpdated: 'আজ সকাল ১০:০০',
    lastUpdatedEn: 'Today 10:00 AM',
    forecast: 'দিনভর মনোরম রোদ থাকবে। কৃষি ও মাছ চাষের জন্য আদর্শ পরিবেশ।',
    forecastEn: 'Full sun during daytime. Ideal conditions for crops and aquaculture.',
    alerts: {
      agri: {
        textBn: 'রবি ফসলের বীজ বোনার জন্য জমি প্রস্তুতের আদর্শ সময়। গোবর ও ফসফেট সার মিশিয়ে রাখুন।',
        textEn: 'Ideal time for Rabi land preparation. Incorporate well-decomposed manure and phosphate.',
        level: 'normal',
        levelLabelBn: 'অনুকূল',
        levelLabelEn: 'Favorable'
      },
      livestock: {
        textBn: 'কাঁচা ঘাসের উৎপাদন বৃদ্ধির জন্য জমিতে সেচ দিন এবং কৃমিনাশক ডোজ সম্পন্ন করুন।',
        textEn: 'Irrigate forage grass plots and complete scheduled seasonal deworming for livestock.',
        level: 'normal',
        levelLabelBn: 'স্বাভাবিক',
        levelLabelEn: 'Normal'
      },
      fish: {
        textBn: 'পুকুরে জাল টেনে মাছের শারীরিক বৃদ্ধি ও কোনো পরজীবী আক্রমণ আছে কিনা যাচাই করুন।',
        textEn: 'Check sample fish weights and inspect for external parasites before midday feeding.',
        level: 'normal',
        levelLabelBn: 'অনুকূল',
        levelLabelEn: 'Favorable'
      }
    }
  },
  jashore: {
    temp: 30,
    condition: 'পরিষ্কার আকাশ ও শুষ্ক আবহাওয়া',
    conditionEn: 'Clear Sky & Dry Atmosphere',
    humidity: '৬২%',
    rainProb: '৫%',
    windSpeed: '১৪ কিমি/ঘণ্টা',
    stationName: 'যশোর বিমানবন্দর আবহাওয়া কেন্দ্র',
    stationNameEn: 'Jashore Airport Weather Office',
    lastUpdated: 'আজ সকাল ৯:৩০',
    lastUpdatedEn: 'Today 9:30 AM',
    forecast: 'আবহাওয়া শুষ্ক থাকবে। সবজি ও রবি ফসলে নিয়মিত হালকা সেচ প্রয়োজন।',
    forecastEn: 'Dry spell persists. Frequent light irrigation advised for vegetables.',
    alerts: {
      agri: {
        textBn: 'মরিচ ও পেঁয়াজ ক্ষেতে রস কমে গেলে সান্ধ্যকালীন হালকা সেচ দিন।',
        textEn: 'Apply light evening irrigation to onion and chili fields to maintain soil moisture.',
        level: 'medium',
        levelLabelBn: 'মাঝারি সতর্কতা',
        levelLabelEn: 'Moderate'
      },
      livestock: {
        textBn: 'পশুদের ক্ষুরারোগের টিকা প্রদান না করা থাকলে দ্রুত চিকিৎসকের সাথে যোগাযোগ করুন।',
        textEn: 'Ensure FMD vaccination coverage for unvaccinated cattle immediately.',
        level: 'high',
        levelLabelBn: 'জরুরি সতর্কতা',
        levelLabelEn: 'High Alert'
      },
      fish: {
        textBn: 'পুকুরের পানির স্তর ৪-৫ ফুটের নিচে নামতে দেবেন না। প্রয়োজনে টিউবওয়েল থেকে নতুন পানি দিন।',
        textEn: 'Do not allow pond depth to fall below 4 feet. Top up with tube-well water if needed.',
        level: 'medium',
        levelLabelBn: 'সতর্কতা',
        levelLabelEn: 'Caution'
      }
    }
  },
  chattogram: {
    temp: 31,
    condition: 'আংশিক মেঘলা ও আর্দ্র',
    conditionEn: 'Partly Cloudy & Humid',
    humidity: '৭৫%',
    rainProb: '২৫%',
    windSpeed: '১৬ কিমি/ঘণ্টা',
    stationName: 'চট্টগ্রাম পতেঙ্গা প্রধান মানমন্দির',
    stationNameEn: 'Chattogram Patenga Central Observatory',
    lastUpdated: 'আজ সকাল ১০:০০',
    lastUpdatedEn: 'Today 10:00 AM',
    forecast: 'উপকূলীয় অঞ্চলে দমকা বাতাস ও আংশিক মেঘলা আকাশ থাকতে পারে।',
    forecastEn: 'Breezy coastal winds and scattered clouds likely.',
    alerts: {
      agri: {
        textBn: 'শাকসবজি ক্ষেতে বাতাসে গাছ হেলে পড়া ঠেকাতে বাঁশের কঞ্চি দিয়ে ঠেকনা দিন।',
        textEn: 'Support tall vegetable crops with bamboo stakes against strong coastal gusts.',
        level: 'medium',
        levelLabelBn: 'সতর্কতা',
        levelLabelEn: 'Moderate'
      },
      livestock: {
        textBn: 'আর্দ্র আবহাওয়ায় শেডে স্যাঁতসেঁতে ভাব কমাতে চুন ও শুকনো বালি ছড়িয়ে দিন।',
        textEn: 'Sprinkle dry lime on shed floors to counteract high coastal humidity.',
        level: 'medium',
        levelLabelBn: 'সতর্কতা',
        levelLabelEn: 'Moderate'
      },
      fish: {
        textBn: 'জোয়ার-ভাটা ও উপকূলীয় ঘেরে পানির লবণাক্ততা ও অম্লতা নিয়মিত পরিমাপ করুন।',
        textEn: 'Monitor salinity and pH levels closely in coastal and brackish water enclosures.',
        level: 'normal',
        levelLabelBn: 'স্বাভাবিক',
        levelLabelEn: 'Normal'
      }
    }
  },
  rajshahi: {
    temp: 28,
    condition: 'শুষ্ক ও রৌদ্রোজ্জ্বল',
    conditionEn: 'Dry & Sunny',
    humidity: '৫৪%',
    rainProb: '০%',
    windSpeed: '৯ কিমি/ঘণ্টা',
    stationName: 'রাজশাহী আবহাওয়া মানমন্দির',
    stationNameEn: 'Rajshahi Meteorological Observatory',
    lastUpdated: 'আজ সকাল ৯:১৫',
    lastUpdatedEn: 'Today 9:15 AM',
    forecast: 'বরেন্দ্র অঞ্চলে শুষ্ক আবহাওয়া ও আরামদায়ক তাপমাত্রা বজায় থাকবে।',
    forecastEn: 'Dry and sunny spell continues across the Barind tract.',
    alerts: {
      agri: {
        textBn: 'গম ও সরিষার জমিতে রস ধরে রাখতে সেচের পর জো আসার সাথে সাথে নিড়ানি দিন।',
        textEn: 'Weed and cultivate soil crust lightly after irrigation to conserve subsoil moisture.',
        level: 'normal',
        levelLabelBn: 'অনুকূল',
        levelLabelEn: 'Favorable'
      },
      livestock: {
        textBn: 'শুকনো খড়ের সাথে পর্যাপ্ত ইউরিয়া মোলাসেস ব্লক ও পুষ্টিকর সাইলেজ সরবরাহ করুন।',
        textEn: 'Supplement dry straw with Urea Molasses Multi-Nutrient Blocks (UMMB).',
        level: 'normal',
        levelLabelBn: 'স্বাভাবিক',
        levelLabelEn: 'Normal'
      },
      fish: {
        textBn: 'গভীর পুকুরে পানির স্তর স্বাভাবিক আছে। দুপুরের রোদে নিয়মিত খাদ্য দিন।',
        textEn: 'Pond water depth is optimal. Feed floating pellets during bright sunlight.',
        level: 'normal',
        levelLabelBn: 'অনুকূল',
        levelLabelEn: 'Normal'
      }
    }
  }
};

// Map any district in Bangladesh to its nearest verified meteorological station
const DISTRICT_TO_REGION = {
  dhaka: 'dhaka',
  gazipur: 'dhaka',
  tangail: 'dhaka',
  faridpur: 'dhaka',
  manikganj: 'dhaka',
  narsingdi: 'dhaka',
  
  bogra: 'bogra',
  naogaon: 'bogra',
  natore: 'rajshahi',
  rajshahi: 'rajshahi',
  pabna: 'jashore',
  
  dinajpur: 'dinajpur',
  rangpur: 'dinajpur',
  kurigram: 'dinajpur',
  
  mymensingh: 'mymensingh',
  jamalpur: 'mymensingh',
  
  jashore: 'jashore',
  khulna: 'jashore',
  kushtia: 'jashore',
  satkhira: 'jashore',
  
  chattogram: 'chattogram',
  cumilla: 'chattogram',
  coxsbazar: 'chattogram',
  sylhet: 'mymensingh',
  moulvibazar: 'mymensingh',
  barishal: 'chattogram',
  bhola: 'chattogram'
};

export function getDistrictWeather(districtId) {
  const stationId = DISTRICT_TO_REGION[districtId] || 'dhaka';
  const data = WEATHER_DATA[stationId];
  const isDirectStation = districtId === stationId;

  return {
    ...data,
    isDirectStation,
    matchedStationId: stationId
  };
}
