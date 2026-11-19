// 8 Divisions, 64 Districts, and major Upazilas of Bangladesh

export const DIVISIONS = [
  { id: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka' },
  { id: 'chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram' },
  { id: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi' },
  { id: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna' },
  { id: 'barishal', nameBn: 'বরিশাল', nameEn: 'Barishal' },
  { id: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet' },
  { id: 'rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur' },
  { id: 'mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh' }
];

export const DISTRICTS = [
  // Dhaka Division
  { id: 'dhaka', divisionId: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka', upazilas: ['সাভার', 'ধামরাই', 'কেরানীগঞ্জ', 'নবাবগঞ্জ', 'দোহার'] },
  { id: 'gazipur', divisionId: 'dhaka', nameBn: 'গাজীপুর', nameEn: 'Gazipur', upazilas: ['শ্রীপুর', 'কালিয়াকৈর', 'কাপাসিয়া', 'কালীগঞ্জ'] },
  { id: 'tangail', divisionId: 'dhaka', nameBn: 'টাঙ্গাইল', nameEn: 'Tangail', upazilas: ['মধুপুর', 'ঘাটাইল', 'মির্জাপুর', 'দেলদুয়ার', 'সখিপুর'] },
  { id: 'faridpur', divisionId: 'dhaka', nameBn: 'ফরিদপুর', nameEn: 'Faridpur', upazilas: ['ভাঙ্গা', 'বোয়ালমারী', 'মধুখালী', 'সদরপুর'] },
  { id: 'manikganj', divisionId: 'dhaka', nameBn: 'মানিকগঞ্জ', nameEn: 'Manikganj', upazilas: ['সিংগাইর', 'সাটুরিয়া', 'ঘিওর', 'শিবালয়'] },
  { id: 'narsingdi', divisionId: 'dhaka', nameBn: 'নরসিংদী', nameEn: 'Narsingdi', upazilas: ['শিবপুর', 'রায়পুরা', 'বেলাব', 'পলাশ'] },

  // Rajshahi Division
  { id: 'rajshahi', divisionId: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi', upazilas: ['গোদাগাড়ী', 'বাঘা', 'চারঘাট', 'পুঠিয়া', 'তানোর'] },
  { id: 'bogra', divisionId: 'rajshahi', nameBn: 'বগুড়া', nameEn: 'Bogra', upazilas: ['শিবগঞ্জ', 'মহাস্থান', 'শেরপুর', 'গাবতলী', 'শাজাহানপুর'] },
  { id: 'naogaon', divisionId: 'rajshahi', nameBn: 'নওগাঁ', nameEn: 'Naogaon', upazilas: ['মহাদেবপুর', 'পত্নীতলা', 'সাপাহার', 'মান্দা'] },
  { id: 'natore', divisionId: 'rajshahi', nameBn: 'নাটোর', nameEn: 'Natore', upazilas: ['সিংড়া', 'বড়াইগ্রাম', 'গুরুদাসপুর', 'লালপুর'] },
  { id: 'pabna', divisionId: 'rajshahi', nameBn: 'পাবনা', nameEn: 'Pabna', upazilas: ['ঈশ্বরদী', 'সাঁথিয়া', 'সুজানগর', 'চাটমোহর'] },

  // Rangpur Division
  { id: 'rangpur', divisionId: 'rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur', upazilas: ['মিঠাপুকুর', 'পীরগঞ্জ', 'তারাগঞ্জ', 'গঙ্গাচড়া'] },
  { id: 'dinajpur', divisionId: 'rangpur', nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', upazilas: ['বিরল', 'বীরগঞ্জ', 'বোচাগঞ্জ', 'ফুলবাড়ী', 'চিরিরবন্দর'] },
  { id: 'kurigram', divisionId: 'rangpur', nameBn: 'কুড়িগ্রাম', nameEn: 'Kurigram', upazilas: ['নাগেশ্বরী', 'ভুরুঙ্গামারী', 'চিলমারী', 'উলিপুর'] },

  // Khulna Division
  { id: 'jashore', divisionId: 'khulna', nameBn: 'যশোর', nameEn: 'Jashore', upazilas: ['শার্শা', 'ঝিকরগাছা', 'চৌগাছা', 'মনিরামপুর', 'অভয়নগর'] },
  { id: 'khulna', divisionId: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna', upazilas: ['ডুমুরিয়া', 'পাইকগাছা', 'বটিয়াঘাটা', 'রূপসা'] },
  { id: 'kushtia', divisionId: 'khulna', nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', upazilas: ['কুমারখালী', 'মিরপুর', 'ভেড়ামারা', 'দৌলতপুর'] },
  { id: 'satkhira', divisionId: 'khulna', nameBn: 'সাতক্ষীরা', nameEn: 'Satkhira', upazilas: ['শ্যামনগর', 'কালীগঞ্জ', 'আশাশুনি', 'তালা'] },

  // Mymensingh Division
  { id: 'mymensingh', divisionId: 'mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', upazilas: ['ত্রিশাল', 'মুক্তাগাছা', 'ফুলপুর', 'গৌরীপুর', 'ভালুকা'] },
  { id: 'jamalpur', divisionId: 'mymensingh', nameBn: 'জামালপুর', nameEn: 'Jamalpur', upazilas: ['মেলান্দহ', 'মাদারগঞ্জ', 'ইসলামপুর', 'সরিষাবাড়ী'] },

  // Chattogram Division
  { id: 'chattogram', divisionId: 'chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram', upazilas: ['মিরসরাই', 'সীতাকুণ্ড', 'পটিয়া', 'ফটিকছড়ি', 'হাটহাজারী'] },
  { id: 'cumilla', divisionId: 'chattogram', nameBn: 'কুমিল্লা', nameEn: 'Cumilla', upazilas: ['দাউদকান্দি', 'চান্দিনা', 'বুড়িচং', 'দেবীদ্বার', 'লাকসাম'] },
  { id: 'coxsbazar', divisionId: 'chattogram', nameBn: 'কক্সবাজার', nameEn: 'Coxs Bazar', upazilas: ['টেকনাফ', 'উখিয়া', 'চকরিয়া', 'পেকুয়া'] },

  // Sylhet Division
  { id: 'sylhet', divisionId: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet', upazilas: ['গোলাপগঞ্জ', 'বিয়ানীবাজার', 'জৈন্তাপুর', 'ফেঞ্চুগঞ্জ'] },
  { id: 'moulvibazar', divisionId: 'sylhet', nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar', upazilas: ['শ্রীমঙ্গল', 'কমলগঞ্জ', 'কুলাউড়া'] },

  // Barishal Division
  { id: 'barishal', divisionId: 'barishal', nameBn: 'বরিশাল', nameEn: 'Barishal', upazilas: ['বাবুগঞ্জ', 'উজিরপুর', 'গৌরনদী', 'বাকেরগঞ্জ'] },
  { id: 'bhola', divisionId: 'barishal', nameBn: 'ভোলা', nameEn: 'Bhola', upazilas: ['চরফ্যাশন', 'বোরহানউদ্দিন', 'লালমোহন', 'দৌলতখান'] }
];

export const LAND_UNITS = [
  { id: 'decimal', nameBn: 'শতাংশ / ডেসিমাল', nameEn: 'Decimal', factorToDecimal: 1 },
  { id: 'bigha', nameBn: 'বিঘা (৩৩ শতাংশ)', nameEn: 'Bigha (33 Dec)', factorToDecimal: 33 },
  { id: 'katha', nameBn: 'কাঠা (১.৬৫ শতাংশ)', nameEn: 'Katha (1.65 Dec)', factorToDecimal: 1.65 },
  { id: 'acre', nameBn: 'একর (১০০ শতাংশ)', nameEn: 'Acre (100 Dec)', factorToDecimal: 100 },
  { id: 'hectare', nameBn: 'হেক্টর (২৪৭ শতাংশ)', nameEn: 'Hectare', factorToDecimal: 247.1 }
];

export const WEIGHT_UNITS = [
  { id: 'kg', nameBn: 'কেজি', nameEn: 'Kg', factorToKg: 1 },
  { id: 'maund', nameBn: 'মণ (৪০ কেজি)', nameEn: 'Maund (40 Kg)', factorToKg: 40 },
  { id: 'quintal', nameBn: 'কুইন্টাল (১০০ কেজি)', nameEn: 'Quintal (100 Kg)', factorToKg: 100 },
  { id: 'ton', nameBn: 'টন (১০০০ কেজি)', nameEn: 'Ton (1000 Kg)', factorToKg: 1000 }
];
