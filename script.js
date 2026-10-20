const chatWidget = document.getElementById('chatWidget');
const chatPanel = document.getElementById('chatPanel');
const chatLauncher = document.getElementById('chatLauncher');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');

const BUSINESS = {
  name: 'Benjamin Franklin Plumbing of North Austin',
  phone: '+15126484208',
  nationalPhone: '+18002597705',
  membershipPhone: '+17373162148',
  address: '2000 Windy Terrace Dr, Bldg 7 Suite A, Cedar Park, TX 78613',
  placeId: 'ChIJT5PbhjLNRIYRvJmmj2XtNuk',
  license: 'Texas Responsible Master Plumber License #M15007',
  areas: 'Austin, Cedar Park, Georgetown, Hutto, Leander, Liberty Hill, McNeil, Pflugerville, Round Rock, Walburg, and Weir. Coverage should be confirmed by phone.',
  email: ''
};

function setChatOpen(isOpen) {
  chatWidget.classList.toggle('is-open', isOpen);
  chatLauncher.setAttribute('aria-expanded', String(isOpen));
  chatPanel.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) chatInput.focus();
}

function addMessage(text, className) {
  const message = document.createElement('div');
  message.className = `message ${className}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addActions(actions) {
  if (!actions.length) return;
  const row = document.createElement('div');
  row.className = 'chat-actions';
  actions.forEach(({ label, href, primary }) => {
    const link = document.createElement('a');
    link.className = `chat-action${primary ? ' primary' : ''}`;
    link.href = href;
    link.textContent = label;
    if (href.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    row.appendChild(link);
  });
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getReply(text, isBengali) {
  const value = text.toLowerCase();
  const has = (pattern) => pattern.test(value);
  const reply = (kind, en, bn) => ({ kind, answer: isBengali ? bn : en });

  if (has(/emergency|urgent|flood|burst pipe|pipe burst|overflow|gas smell|জরুরি|ইমার্জেন্সি|পাইপ ফেটে|বন্যা|পানি ঢুক|গ্যাসের গন্ধ|ওভারফ্লো/)) {
    return reply('emergency',
      'For an active leak or flooding, shut off the main water valve if it is safe. Stay away from water near electrical equipment. For a gas odor, leave the area without operating switches and contact emergency services/your gas provider. Benjamin Franklin Plumbing of North Austin answers its plumbing line 24/7: (512) 648-4208. The national emergency line is (800) 259-7705. Same-day service is pursued when possible; arrival is not guaranteed.',
      'পানি ছড়ানো বা বড় লিক হলে নিরাপদ হলে মেইন water valve বন্ধ করুন; বৈদ্যুতিক যন্ত্রের কাছে পানিতে যাবেন না। গ্যাসের গন্ধ পেলে সুইচ চালাবেন না—এলাকা ছেড়ে জরুরি সহায়তা/গ্যাস সরবরাহকারীকে জানান। North Austin-এর plumbing line ২৪/৭: (512) 648-4208; national emergency line: (800) 259-7705। সম্ভব হলে same-day service দেওয়ার চেষ্টা করা হয়, তবে নিশ্চিত নয়।');
  }
  if (has(/club|membership|maintenance plan|মেম্বার|ক্লাব|মেইনটেন্যান্স প্ল্যান/)) {
    return reply('membership',
      'The Plumbing Club plan is listed at $7.99/month ($95.88/year). Benefits: one annual visit, annual plumbing health and safety check, 20% off labor, priority scheduling, no after-hours fees, and a reduced trip charge ($79 instead of $99). For enrollment questions call (737) 316-2148. Terms and cancellation details were not provided; confirm them before enrolling.',
      'Plumbing Club পরিকল্পনার প্রকাশিত মূল্য $7.99/মাস ($95.88/বছর)। সুবিধা: বছরে ১টি ভিজিট ও plumbing health/safety check, শ্রমে ২০% ছাড়, অগ্রাধিকারভিত্তিক সময়, after-hours fee নেই এবং trip charge $99 থেকে $79। সদস্যতার প্রশ্নে কল করুন (737) 316-2148। শর্ত ও বাতিলের বিস্তারিত প্রকাশিত নেই—যোগদানের আগে নিশ্চিত করুন।');
  }
  if (has(/coupon|offer|special|discount|promotion|save \$|\$100|\$300|\$800|\$50|কুপন|অফার|ছাড়|ডিসকাউন্ট/)) {
    return reply('offers',
      'Published offers (expire 12/31/2026): $100 off any water heater; $300 off a water softener; $800 off a water softener/filtration combo; $300 off a new tankless water heater; and $50 off any service or repair (a service fee may apply). One coupon per household; present at purchase; offers cannot be combined; restrictions, taxes, and fees may apply. The booking-vs-purchase instructions differ, so confirm how to redeem by phone: (512) 648-4208. Offers apply at participating locations.',
      'প্রকাশিত অফার (মেয়াদ 12/31/2026): যেকোনো water heater-এ $100 ছাড়; water softener-এ $300; softener/filtration combo-তে $800; নতুন tankless heater-এ $300; যেকোনো service/repair-এ $50 (service fee লাগতে পারে)। প্রতি household-এ একটি coupon; কেনার সময় দেখাতে হবে; অন্য অফারের সঙ্গে মিলবে না; শর্ত, কর ও fee প্রযোজ্য হতে পারে। বুকিং না কেনার সময় coupon দেখাতে হবে—নির্দেশনায় পার্থক্য আছে, তাই (512) 648-4208 নম্বরে নিশ্চিত করুন। অংশগ্রহণকারী লোকেশনে অফার প্রযোজ্য।');
  }
  if (has(/where|location|address|near me|map|directions|কোথায়|ঠিকানা|লোকেশন|এলাকা|কাছাকাছি|গুগল ম্যাপ/)) {
    return reply('location',
      `Address: ${BUSINESS.address}. The Google Maps button opens the North Austin listing. Listed service areas include ${BUSINESS.areas} ZIP coverage is not listed, so call to confirm your address is served.`,
      `ঠিকানা: ${BUSINESS.address}। Google Maps বাটনে North Austin-এর listing খুলবে। প্রকাশিত service area: ${BUSINESS.areas} ZIP coverage-এর তালিকা নেই—আপনার ঠিকানা সেবার আওতায় কি না ফোনে নিশ্চিত করুন।`);
  }
  if (has(/hour|open|24.?7|same.?day|availability|weekend|আজ|সময়|সময়|খোলা|কখন আস|২৪.?৭|সেম.?ডে/)) {
    return reply('hours',
      'The local plumbing phone is answered 24 hours a day, 7 days a week at (512) 648-4208. Regular office hours are not listed. The FAQ says the team strives to provide same-day service when possible, especially for urgent repairs; availability is not guaranteed.',
      'স্থানীয় plumbing ফোন (512) 648-4208 সপ্তাহে ৭ দিন, দিনে ২৪ ঘণ্টা উত্তর দেওয়া হয়। সাধারণ অফিস সময় প্রকাশিত নেই। FAQ অনুযায়ী সম্ভব হলে, বিশেষ করে জরুরি মেরামতে, same-day service দেওয়ার চেষ্টা করে—তবে নিশ্চিত নয়।');
  }
  if (has(/license|licensed|master plumber|insured|insurance|background check|drug test|লাইসেন্স|লাইসেন্সধারী|ইনস্যুরেন্স/)) {
    return reply('credentials',
      'The supplied site information lists Texas Responsible Master Plumber License #M15007. It also says field-employee background checks are completed as permitted by law and employees receive ongoing training. Specific company insurance policy details were not provided; call the office for current documentation.',
      'দেওয়া তথ্য অনুযায়ী Texas Responsible Master Plumber License #M15007। আইন যতটা অনুমতি দেয়, field employee-দের background check হয় এবং কর্মীরা চলমান প্রশিক্ষণ পান। প্রতিষ্ঠানের নির্দিষ্ট insurance policy details দেওয়া নেই—বর্তমান নথির জন্য অফিসে কল করুন।');
  }
  if (has(/guarantee|warranty|late|delay|on.?time|satisfaction|uwin|গ্যারান্টি|ওয়ারেন্টি|ওয়ারেন্টি|দেরি|সময়মতো/)) {
    return reply('guarantee',
      'The listed On-Time Guarantee says $5 for every minute late, up to $300 (60 minutes). A 100% satisfaction guarantee is also advertised. Specific workmanship/parts warranty terms and guarantee conditions were not provided, so ask the local office to confirm what applies to your job. UWIN is described as a customer-resolution resource for Benjamin Franklin Plumbing customers.',
      'প্রকাশিত On-Time Guarantee অনুযায়ী দেরির প্রতি মিনিটে $5, সর্বোচ্চ $300 (৬০ মিনিট)। 100% satisfaction guarantee-ও বিজ্ঞাপিত। কাজ/যন্ত্রাংশের warranty-র মেয়াদ ও শর্ত দেওয়া নেই—আপনার কাজের ক্ষেত্রে কী প্রযোজ্য ফোনে নিশ্চিত করুন। UWIN-কে Benjamin Franklin Plumbing গ্রাহকদের customer-resolution resource হিসেবে বর্ণনা করা হয়েছে।');
  }
  if (has(/review|rating|star|forbes|award|রিভিউ|রেটিং|স্টার|পুরস্কার/)) {
    return reply('reviews',
      'The supplied North Austin location information shows 4.8 stars from 1,334 Google reviews and says the brand was named Forbes’ Top Ranked Plumbing Company of 2024. Ratings can change over time; check the current Google listing for the latest count.',
      'দেওয়া North Austin তথ্য অনুযায়ী Google-এ 1,334টি review থেকে 4.8 star এবং ব্র্যান্ডটি Forbes’ Top Ranked Plumbing Company of 2024 হিসেবে উল্লেখিত। রেটিং সময়ের সঙ্গে বদলাতে পারে—সর্বশেষ সংখ্যার জন্য বর্তমান Google listing দেখুন।');
  }
  if (has(/about|who are|company|business|independent|owner|trust|integrity|company info|সম্পর্কে|কোম্পানি|ব্যবসা|মালিক/)) {
    return reply('about',
      'Benjamin Franklin Plumbing of North Austin is described as a locally owned and operated franchise, with each location independently owned and operated. The supplied company information highlights ongoing technician training, local hiring, code-compliant work, stocked service vehicles, prompt arrival, expert workmanship, and customer satisfaction. Owner name and years in business were not listed.',
      'Benjamin Franklin Plumbing of North Austin-কে locally owned and operated franchise বলা হয়েছে; প্রতিটি location স্বাধীনভাবে পরিচালিত। দেওয়া তথ্যে কর্মীদের চলমান প্রশিক্ষণ, স্থানীয় নিয়োগ, code-compliant কাজ, parts-সহ service vehicle, সময়মতো পৌঁছানো, দক্ষ workmanship ও customer satisfaction-এর কথা আছে। মালিকের নাম ও ব্যবসার বছর উল্লেখ নেই।');
  }
  if (has(/service area|do you serve|coverage|cedar park|georgetown|hutto|leander|liberty hill|mcneil|pflugerville|round rock|walburg|weir|north austin|austin|সার্ভিস এরিয়া|সেবা এলাকা|সেবা দেন|কভারেজ|রাউন্ড রক|সিডার পার্ক/)) {
    return reply('location',
      `Listed service areas: ${BUSINESS.areas} The supplied information also links Lakeway, Northwest Austin, and South Austin locations; confirm which local office serves your address. Call (512) 648-4208 to check coverage.`,
      `প্রকাশিত service area: ${BUSINESS.areas} তথ্যসূত্রে Lakeway, Northwest Austin ও South Austin-এর আলাদা location-ও আছে—আপনার ঠিকানায় কোন অফিস সেবা দেয় নিশ্চিত করুন। কভারেজ জানতে (512) 648-4208 নম্বরে কল করুন।`);
  }
  if (has(/price|cost|quote|estimate|financ|how much|কত টাকা|খরচ|দাম|কোটেশন|এস্টিমেট|ফাইন্যান্স/)) {
    return reply('quote',
      'Service pricing and financing details were not listed, and a reliable quote depends on diagnosis, parts, and the property. Call (512) 648-4208 to request an appointment/quote. Free estimates are not explicitly confirmed. Ask about the $50 service/repair offer and its conditions.',
      'সার্ভিসের মূল্য বা financing details প্রকাশিত নেই; সঠিক quote নির্ভর করে diagnosis, parts ও বাড়ির অবস্থার ওপর। appointment/quote চাইতে (512) 648-4208 নম্বরে কল করুন। Free estimate নিশ্চিত করে বলা হয়নি। $50 service/repair অফার ও শর্ত জিজ্ঞেস করতে পারেন।');
  }
  if (has(/book|appointment|schedule|visit|booking|request service|বুক|অ্যাপয়েন্টমেন্ট|সময় দিতে|সময় দিতে|ভিজিট|সার্ভিস বুক/)) {
    return reply('booking',
      'To request service, call (512) 648-4208 or message via WhatsApp. Share your name, phone, service address, issue, and preferred time. Emergency phones are answered 24/7; same-day service is pursued when possible but is not guaranteed. No public booking form link was included in the supplied details.',
      'সার্ভিস চাইতে (512) 648-4208 নম্বরে কল বা WhatsApp করুন। নাম, ফোন, service address, সমস্যার বিবরণ ও সুবিধাজনক সময় জানান। জরুরি ফোন ২৪/৭ উত্তর দেওয়া হয়; সম্ভব হলে same-day service-এর চেষ্টা করা হয়, তবে নিশ্চিত নয়। দেওয়া তথ্যে online booking form-এর public link নেই।');
  }
  if (has(/call|phone|number|contact|email|e-mail|whatsapp|ফোন|কল|যোগাযোগ|ইমেইল|ই-মেইল|হোয়াটসঅ্যাপ/)) {
    const emailQuestion = has(/email|e-mail|ইমেইল|ই-মেইল/);
    return reply('contact',
      emailQuestion
        ? 'No public email address was listed in the supplied business information. Contact the local office at (512) 648-4208 or use the WhatsApp button.'
        : 'Contact Benjamin Franklin Plumbing of North Austin at (512) 648-4208 (local line, answered 24/7). WhatsApp is available through the button below. For Plumbing Club enrollment questions, call (737) 316-2148.',
      emailQuestion
        ? 'দেওয়া ব্যবসায়িক তথ্যে public email address নেই। স্থানীয় অফিসে (512) 648-4208 নম্বরে কল করুন বা WhatsApp বাটন ব্যবহার করুন।'
        : 'Benjamin Franklin Plumbing of North Austin-এ যোগাযোগ: (512) 648-4208 (স্থানীয় লাইন, ২৪/৭ উত্তর দেওয়া হয়)। নিচের WhatsApp বাটন ব্যবহার করতে পারেন। Plumbing Club সদস্যতার প্রশ্নে (737) 316-2148 নম্বরে কল করুন।');
  }

  if (has(/leak|drip|slab leak|hidden leak|pipe repair|water line|repip|পানি পড়|লিক|স্ল্যাব|পাইপ|রিপাইপ/)) {
    return reply('service',
      'For a leak, if safe, close the nearest fixture shut-off valve; if needed, shut off the main water valve. Avoid electrical hazards. The local team lists leak detection/repair, slab-leak detection and repair, pipe repair, repiping, and water-line replacement. Hidden-leak clues include damp spots, unexplained high bills, mold, or musty odors. Call (512) 648-4208 for diagnosis.',
      'লিক হলে নিরাপদ থাকলে কাছের fixture shut-off valve বন্ধ করুন; প্রয়োজনে main water valve বন্ধ করুন। বৈদ্যুতিক ঝুঁকি এড়ান। তালিকাভুক্ত সেবা: leak detection/repair, slab leak, pipe repair, repiping ও water-line replacement। ভেজা দাগ, অকারণে বেশি bill, mold বা স্যাঁতসেঁতে গন্ধ hidden leak-এর ইঙ্গিত হতে পারে। diagnosis-এর জন্য (512) 648-4208 নম্বরে কল করুন।');
  }
  if (has(/drain|clog|blocked|slow drain|hydro.?jet|snake|জ্যাম|ড্রেন|পানি নামছে না|হাইড্রো/)) {
    return reply('service',
      'Avoid mixing drain chemicals; fumes can be dangerous. The service list includes drain cleaning, installation, and hydro jetting. Snaking mechanically removes a clog; hydro jetting cleans more of the pipe interior and may help with stubborn buildup. Repeated clogs may need professional cleaning or camera inspection. Multiple affected drains can indicate a main-line issue—call promptly.',
      'ড্রেনের chemical একসঙ্গে মেশাবেন না—বিপজ্জনক ধোঁয়া হতে পারে। সেবার মধ্যে drain cleaning, installation ও hydro jetting আছে। Snaking যান্ত্রিকভাবে clog সরায়; hydro jetting পাইপের ভেতর বেশি অংশ পরিষ্কার করে এবং জেদি buildup-এ কাজে লাগতে পারে। বারবার clog হলে professional cleaning বা camera inspection লাগতে পারে। একাধিক drain বন্ধ হলে main-line সমস্যা হতে পারে—দ্রুত কল করুন।');
  }
  if (has(/sewer|sewage|tree root|trenchless|gurg|septic|সিওয়ার|পয়ঃ|নর্দমা|গাছের শিকড়|গার্গল/)) {
    return reply('service',
      'Frequent clogs, gurgling toilets, foul odors, multiple backups, or soggy yard patches can signal a sewer problem. Avoid contact with wastewater. Listed sewer options include repair, replacement, and trenchless lining/bursting; the right option depends on inspection and damage. Septic service is listed only on national pages, so confirm local availability. Call (512) 648-4208.',
      'বারবার clog, toilet-এ গড়গড় শব্দ, দুর্গন্ধ, একাধিক backup বা উঠোনে ভেজা অংশ sewer সমস্যার লক্ষণ হতে পারে। বর্জ্য পানির সংস্পর্শ এড়ান। তালিকাভুক্ত sewer সেবা repair, replacement এবং trenchless lining/bursting; inspection ও ক্ষতির ওপর পদ্ধতি নির্ভর করে। Septic শুধু national pages-এ আছে—স্থানীয় availability নিশ্চিত করুন। (512) 648-4208 নম্বরে কল করুন।');
  }
  if (has(/banging|knocking|water hammer|pipes? (?:bang|knock)|পাইপে শব্দ|পাইপ ঠকঠক/)) {
    return reply('service',
      'Banging or knocking after a faucet or valve closes is often water hammer; loose pipe supports or pressure issues can also cause noise. Avoid adjusting pressure equipment unless qualified. A plumber can inspect the pipes and recommend a water-hammer arrestor or pressure adjustment. Call (512) 648-4208 if the noise is persistent or accompanied by leaks.',
      'কল বা valve বন্ধের পর পাইপে ঠকঠক শব্দ water hammer-এর কারণে হতে পারে; ঢিলা pipe support বা pressure সমস্যাও কারণ হতে পারে। দক্ষতা না থাকলে pressure equipment নিজে adjust করবেন না। plumber পরীক্ষা করে water-hammer arrestor বা pressure adjustment পরামর্শ দিতে পারেন। শব্দ চলতে থাকলে বা leak থাকলে (512) 648-4208 নম্বরে কল করুন।');
  }
  if (has(/water heater|hot water|tankless|geyser|no hot|heater|গিজার|ওয়াটার হিটার|গরম পানি|ট্যাংকলেস/)) {
    return reply('service',
      'Water-heater service includes diagnosis, repair, installation/replacement, and tankless units. Warning signs include inconsistent hot water, rusty/cloudy water, rumbling or popping, and visible leaks. Traditional tanks commonly last 8–12 years; ask a plumber to assess the unit. Tank models generally cost less upfront; tankless units are compact and can use less energy, but suitability and savings depend on the home. If you smell gas, leave the area and do not operate switches. Published offers: $100 off a water heater or $300 off a new tankless unit, through 12/31/2026; restrictions apply.',
      'Water heater সেবায় diagnosis, repair, installation/replacement ও tankless unit আছে। লক্ষণ: গরম পানি অনিয়মিত, মরচে/ঘোলা পানি, গর্জন/পপিং শব্দ বা দৃশ্যমান লিক। সাধারণ tank heater প্রায় ৮–১২ বছর চলে; plumber দিয়ে পরীক্ষা করান। Tank model-এর প্রাথমিক খরচ সাধারণত কম; tankless ছোট জায়গা নেয় ও শক্তি সাশ্রয় করতে পারে, তবে উপযোগিতা বাড়ির ওপর নির্ভর করে। গ্যাসের গন্ধ পেলে এলাকা ছেড়ে সুইচ চালাবেন না। প্রকাশিত অফার: water heater-এ $100 বা নতুন tankless-এ $300 ছাড়, 12/31/2026 পর্যন্ত; শর্ত প্রযোজ্য।');
  }
  if (has(/filter|filtration|water softener|reverse osmosis|brita|carbon filter|পানি পরিশোধ|ফিল্টার|সফটেনার|রিভার্স অসমোসিস/)) {
    return reply('service',
      'Water-treatment options listed include whole-house filtration, Brita Pro under-sink filters, reverse osmosis, carbon filters, and water softeners. A water test can help choose a system; filters are commonly replaced every 3–6 months depending on system and use. Published offers through 12/31/2026: $300 off a softener or $800 off a softener/filtration combo; restrictions apply.',
      'তালিকাভুক্ত water-treatment বিকল্প: whole-house filtration, Brita Pro under-sink, reverse osmosis, carbon filter ও water softener। system বাছতে water test সহায়ক; ব্যবহার ও system অনুযায়ী সাধারণত ৩–৬ মাসে filter বদলাতে হয়। 12/31/2026 পর্যন্ত প্রকাশিত অফার: softener-এ $300 বা softener/filtration combo-তে $800 ছাড়; শর্ত প্রযোজ্য।');
  }
  if (has(/pressure|weak flow|low flow|water pressure|পানির চাপ|চাপ কম|ধীরে পড়/)) {
    return reply('service',
      'Low pressure at one faucet may come from a clogged aerator; throughout the house, check accessible valves are fully open. Persistent low pressure may involve a pressure regulator, hidden leak, or corrosion and needs a licensed plumber. Is it one fixture or the whole home? Call (512) 648-4208 for an inspection.',
      'একটি কলেই চাপ কম হলে aerator বন্ধ হতে পারে; পুরো বাড়িতে হলে accessible valve পুরো খোলা আছে কি না দেখুন। সমস্যা থাকলে pressure regulator, hidden leak বা corrosion থাকতে পারে—licensed plumber পরীক্ষা করবেন। একটি fixture, নাকি পুরো বাড়িতে? inspection-এর জন্য (512) 648-4208 নম্বরে কল করুন।');
  }
  if (has(/toilet|flush|overflow|টয়লেট|কমোড|ফ্লাশ/)) {
    return reply('service',
      'If a toilet is overflowing, stop using it and, if safe, turn the shut-off valve beside the base clockwise. The service list includes toilet repair and installation. For an active overflow or backup, call (512) 648-4208; avoid contact with wastewater.',
      'টয়লেট overflow করলে ব্যবহার বন্ধ করুন এবং নিরাপদ হলে গোড়ার পাশের shut-off valve ঘড়ির কাঁটার দিকে ঘুরিয়ে বন্ধ করুন। তালিকায় toilet repair ও installation আছে। চলমান overflow/backup হলে (512) 648-4208 নম্বরে কল করুন; বর্জ্য পানির সংস্পর্শ এড়ান।');
  }
  if (has(/faucet|tap|sink|garbage disposal|disposal|bathtub|bath|shower|কল|সিঙ্ক|বেসিন|গার্বেজ ডিসপোজাল|বাথটাব|শাওয়ার|ঝরনা/)) {
    return reply('service',
      'The local catalog includes faucet, sink, bathtub, and shower repair/installation, plus garbage-disposal repair/installation. For a humming disposal, switch off power before checking anything; do not put a hand into the unit. Call (512) 648-4208 to discuss the fixture and request service.',
      'স্থানীয় সেবার তালিকায় faucet, sink, bathtub ও shower repair/installation এবং garbage-disposal repair/installation আছে। disposal গুনগুন করলেও না চললে পরীক্ষা করার আগে বিদ্যুৎ বন্ধ করুন; যন্ত্রের ভেতরে হাত দেবেন না। fixture-এর কাজ জানাতে ও service চাইতে (512) 648-4208 নম্বরে কল করুন।');
  }
  if (has(/frozen|freeze|water hammer|banging|knocking|gas line|gas pipe|sump pump|pump|outdoor|commercial|boiler|bidet|well pump|ফ্রোজেন|জমে গেছে|পাইপে শব্দ|গ্যাস লাইন|পাম্প/)) {
    return reply('service',
      'The supplied catalog lists frozen/leaking pipe work, gas lines, outdoor and commercial plumbing, and sump pumps. Boilers, bidets, septic, pool/ejector/well pumps are listed on national pages only—confirm local availability before booking. Never thaw a pipe with an open flame. For a burst pipe, shut off water if safe and call (512) 648-4208.',
      'দেওয়া catalog-এ frozen/leaking pipe, gas line, outdoor/commercial plumbing ও sump pump আছে। Boiler, bidet, septic, pool/ejector/well pump শুধু national pages-এ তালিকাভুক্ত—বুকিংয়ের আগে স্থানীয় availability নিশ্চিত করুন। খোলা আগুন দিয়ে পাইপ গলাবেন না। পাইপ ফাটলে নিরাপদে পানি বন্ধ করে (512) 648-4208 নম্বরে কল করুন।');
  }
  if (has(/inspection|maintenance|annual|preventative|preventive|checkup|বার্ষিক|পরিদর্শন|রক্ষণাবেক্ষণ/)) {
    return reply('service',
      'An annual plumbing inspection is recommended, especially for older homes or recurring issues. Checks can include pipe integrity, water pressure, and appliance connections. Scheduled drain cleaning and early repairs can help prevent damage. The Plumbing Club lists one annual visit and a health/safety check for $7.99/month ($95.88/year); call (737) 316-2148 for plan questions.',
      'বিশেষ করে পুরোনো বাড়ি বা বারবার সমস্যা হলে বছরে একবার plumbing inspection সুপারিশ করা হয়। pipe integrity, water pressure ও appliance connection পরীক্ষা হতে পারে। নিয়মিত drain cleaning ও আগাম repair ক্ষতি ঠেকাতে সাহায্য করে। Plumbing Club-এ বছরে ১টি visit ও health/safety check, $7.99/মাস ($95.88/বছর); পরিকল্পনার প্রশ্নে (737) 316-2148 নম্বরে কল করুন।');
  }
  if (has(/\b(?:hi|hello|hey)\b|হ্যালো|হাই|আসসালামু|নমস্কার/)) {
    return reply('general',
      'Hello! I can help with North Austin service areas, 24/7 emergency contact, leaks, drains/sewers, water heaters, filtration, fixtures, offers, membership, guarantees, and address/Maps. What would you like to know?',
      'হ্যালো! North Austin service area, ২৪/৭ জরুরি যোগাযোগ, leak, drain/sewer, water heater, filtration, fixture, offer, membership, guarantee ও ঠিকানা/Maps সম্পর্কে জানতে পারেন। কী জানতে চান?');
  }
  return reply('general',
    'I can answer from the business information supplied, but this chat is an automated guide—not a live technician and not connected to an AI service. I do not have enough verified information to answer that specifically. Tell me the plumbing issue, fixture, and your city/ZIP, or call (512) 648-4208. For emergencies, shut off water if safe and call now.',
    'দেওয়া ব্যবসায়িক তথ্যের ভিত্তিতে আমি সাহায্য করতে পারি, তবে এটি automated guide—live technician নয় এবং AI service-এ সংযুক্ত নয়। এই প্রশ্নের নির্দিষ্ট উত্তর দেওয়ার মতো verified তথ্য নেই। plumbing সমস্যা, fixture ও city/ZIP লিখুন, অথবা (512) 648-4208 নম্বরে কল করুন। জরুরি হলে নিরাপদে পানি বন্ধ করে এখনই কল করুন।');
}

function actionsFor(kind, isBengali) {
  const phone = BUSINESS.phone;
  const digits = phone.replace(/\D/g, '');
  const call = { label: isBengali ? '📞 এখনই কল' : '📞 Call North Austin', href: `tel:${phone}`, primary: true };
  const whatsapp = {
    label: 'WhatsApp',
    href: `https://wa.me/${digits}?text=${encodeURIComponent(isBengali ? 'আমি Benjamin Franklin Plumbing of North Austin-এর সার্ভিস সম্পর্কে জানতে চাই।' : 'I have a question for Benjamin Franklin Plumbing of North Austin.')}`
  };
  const maps = {
    label: '📍 Google Maps',
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}&query_place_id=${BUSINESS.placeId}`
  };
  const nationalCall = { label: isBengali ? '📞 জাতীয় লাইন: (800) 259-7705' : '📞 National: (800) 259-7705', href: `tel:${BUSINESS.nationalPhone}` };
  const clubCall = { label: isBengali ? '📞 সদস্যতা: (737) 316-2148' : '📞 Club: (737) 316-2148', href: `tel:${BUSINESS.membershipPhone}` };
  const contact = [call, whatsapp];
  if (kind === 'emergency') return [call, nationalCall, whatsapp];
  if (kind === 'location') return [maps, call, whatsapp];
  if (kind === 'membership') return [clubCall, call, whatsapp];
  if (['emergency', 'contact', 'booking', 'quote', 'service', 'offers', 'hours', 'credentials', 'guarantee'].includes(kind)) return contact;
  if (kind === 'about' || kind === 'reviews') return [maps, call];
  return [];
}

function respondTo(text) {
  const isBengali = /[\u0980-\u09FF]/.test(text);
  const reply = getReply(text, isBengali);
  window.setTimeout(() => {
    addMessage(reply.answer, 'bot-message');
    addActions(actionsFor(reply.kind, isBengali));
  }, 320);
}

function sendMessage(text) {
  const value = text.trim();
  if (!value) return;
  const quickReplies = document.getElementById('quickReplies');
  if (quickReplies) quickReplies.remove();
  addMessage(value, 'user-message');
  chatInput.value = '';
  respondTo(value);
}

chatLauncher.addEventListener('click', () => setChatOpen(!chatWidget.classList.contains('is-open')));
document.getElementById('startChat').addEventListener('click', () => setChatOpen(true));
document.getElementById('closeChat').addEventListener('click', () => setChatOpen(false));
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(chatInput.value);
});
document.getElementById('quickReplies').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-reply]');
  if (button) sendMessage(button.dataset.reply);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && chatWidget.classList.contains('is-open')) setChatOpen(false);
});
