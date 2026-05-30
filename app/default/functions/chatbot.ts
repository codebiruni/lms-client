/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Quranic Barse - Islamic Learning Platform Information
const QURANIC_BARSE_INFO = {
  projectName: "Quranic Barse",
  tagline: "نور على نور - Light Upon Light | Your Spiritual Companion for Quranic Learning",
  description: "Quranic Barse is a comprehensive Islamic Learning Management System designed to facilitate Quranic education, Islamic studies, and spiritual development for Muslims worldwide. It combines traditional Islamic teachings with modern technology to create an immersive learning experience.",
  
  arabicName: "البرصة القرآنية",
  greeting: "السلام عليكم ورحمة الله وبركاته",
  
  overview: {
    mission: "To spread authentic Quranic knowledge and Islamic teachings through accessible, engaging, and technology-driven platforms that nurture spiritual growth.",
    vision: "Creating a global ummah connected through the light of the Quran, where every Muslim can access quality Islamic education regardless of location or background.",
    launchDate: "Ramadan 1445 AH (March 2024)",
    currentUsers: "10,000+ Active Learners",
    institutions: "50+ Islamic Centers & Madrasas",
    countries: "25+ Countries Worldwide"
  },

  keyFeatures: {
    quranic: [
      "Complete Quran with 15+ Authentic Tafsir (Ibn Kathir, Al-Jalalayn, etc.)",
      "Tajweed Rules with Audio Pronunciation Guide",
      "Word-by-Word Quran Translation & Grammar Analysis",
      "Multiple Qira'at (Recitation Styles) with Audio",
      "Quran Memorization Tracker with Review Scheduling",
      "Arabic Script Learning with Interactive Exercises"
    ],
    
    islamic: [
      "Sahih Hadith Collections (Bukhari, Muslim, Tirmidhi, etc.)",
      "Islamic Studies Curriculum (Aqeedah, Fiqh, Seerah, etc.)",
      "Prayer Times with Qibla Direction",
      "Duas & Adhkar with Audio and Translation",
      "Islamic Calendar with Important Events & Dates",
      "Zakat Calculator & Islamic Finance Guidance"
    ],
    
    learning: [
      "Live Virtual Classrooms with Quran Teachers",
      "Interactive Quizzes & Assessments",
      "Progress Tracking & Certification",
      "Peer Discussion Forums",
      "Resource Library with PDFs, Videos & Audio",
      "Multi-language Support (English, Arabic, Urdu, Bengali, etc.)"
    ],
    
    administrative: [
      "Teacher & Student Management",
      "Class Scheduling & Attendance Tracking",
      "Payment & Fee Management (Zakat, Sadaqah)",
      "Parent Portal for Student Progress",
      "Report Generation & Analytics",
      "Email & SMS Notification System"
    ]
  },

  targetAudience: [
    {
      category: "Individual Learners",
      examples: ["New Muslims", "Children & Youth", "Adults seeking Islamic knowledge", "Quran Memorization Students"]
    },
    {
      category: "Educational Institutions",
      examples: ["Madrasas & Islamic Schools", "Weekend Islamic Schools", "Online Quran Academies", "Universities (Islamic Studies)"]
    },
    {
      category: "Community Organizations",
      examples: ["Mosques & Islamic Centers", "Da'wah Organizations", "Islamic NGOs", "Halaqa Groups"]
    }
  ],

  curriculum: {
    quranLevels: [
      "Level 1: Nuraniyah - Arabic Alphabet & Basic Reading",
      "Level 2: Tajweed Essentials - Proper Pronunciation Rules",
      "Level 3: Quran Recitation with Tajweed Application",
      "Level 4: Memorization (Hifz) Program with Ijazah Track",
      "Level 5: Tafsir Studies - Understanding the Message",
      "Level 6: Quranic Arabic - Language & Grammar"
    ],
    
    islamicStudies: [
      "Aqeedah (Islamic Creed) - Beginner to Advanced",
      "Fiqh (Islamic Jurisprudence) - According to 4 Major Schools",
      "Seerah (Prophetic Biography) - Complete Life of Prophet Muhammad (PBUH)",
      "Hadith Sciences - Memorization & Understanding",
      "Tazkiyah (Spiritual Purification) - Sufism & Heart Softeners",
      "Islamic History - From Prophets to Modern Era"
    ],
    
    arabicCourses: [
      "Arabic Reading & Writing Foundation",
      "Conversational Arabic for Daily Life",
      "Quranic Arabic Grammar (Nahw & Sarf)",
      "Media Arabic & Modern Communication"
    ]
  },

  teachers: {
    qualifications: [
      "Certified Hafiz & Qari with Ijazah",
      "Graduates from Renowned Islamic Universities (Al-Azhar, Islamic University of Madinah)",
      "Specialized in Tajweed & Qira'at",
      "Experienced in Online Teaching Methodologies",
      "Native Arabic Speakers & Multilingual Instructors"
    ],
    studentRatio: "Maximum 10 students per live class for personalized attention",
    demoClasses: "Free trial classes available for all courses"
  },

  technicalSpecifications: {
    platform: "Web-based, Mobile-Responsive, PWA, Native Mobile Apps",
    technology: [
      "Frontend: React.js with TypeScript & Next.js",
      "Backend: Node.js with Express",
      "Database: MongoDB & PostgreSQL",
      "Cloud: AWS/GCP with CDN for Global Access",
      "Video Streaming: Optimized for Quran Audio/Video",
      "Real-time Features: Socket.io for Live Classes",
      "Mobile Apps: React Native (iOS & Android)",
      "Payment: Multiple Gateways (Islamic Banking Compliant)"
    ],
    security: [
      "Role-based Access Control (Admin, Teacher, Student, Parent)",
      "SSL/TLS Encryption",
      "Secure User Data Protection",
      "Family Accounts & Parental Controls",
      "Safe Online Environment for Children",
      "Regular Security Audits"
    ],
    accessibility: "WCAG 2.1 Compliant for users with disabilities"
  },

  pricing: {
    models: [
      "Monthly Subscription - Access to All Courses",
      "Annual Plan - 2 Months Free (Best Value)",
      "Family Package - Up to 5 Family Members",
      "Institutional License for Madrasas & Islamic Centers",
      "One-on-One Private Tutoring (Premium)"
    ],
    monthlyPlans: {
      basic: "$19.99/month - Access to All Self-Paced Courses",
      standard: "$49.99/month - Includes 2 Live Classes/Week",
      premium: "$99.99/month - Unlimited Live Classes + 1-on-1 Tutoring",
      family: "$149.99/month - Family Package (Up to 5 Members)"
    },
    annualDiscount: "20% off on all annual plans",
    freeOptions: [
      "Free Quran Reading Course",
      "Weekly Live Tafsir Session",
      "Islamic Knowledge Articles & Videos",
      "Basic Prayer Times & Qibla Features"
    ],
    scholarships: "Need-based scholarships available - Apply through our Financial Aid Program"
  },

  uniqueFeatures: [
    "AI-Powered Tajweed Feedback & Pronunciation Correction",
    "Voice-Activated Quran Recitation Practice",
    "Virtual Reality (VR) Hajj & Umrah Experience",
    "Digital Ijazah Certification from Qualified Scholars",
    "Ramadan Special Programs with Live Qiyam & Khatm al-Quran",
    "Children-Friendly Gamified Learning Environment",
    "Parent Dashboard with Progress Reports & Alerts",
    "Community Halaqa Groups & Study Circles"
  ],

  benefits: [
    "Learn from Qualified Scholars & Certified Teachers",
    "Flexible Schedule - Learn at Your Own Pace",
    "Safe, Ad-Free Islamic Learning Environment",
    "Track Your Memorization Progress",
    "Connect with Global Muslim Community",
    "Access to Authentic Islamic Resources",
    "Certificates Recognized by Islamic Institutions",
    "Affordable Quality Education"
  ],

  successMetrics: [
    "95% Student Satisfaction Rate",
    "80% Quran Memorization Completion Rate (Level 1-3)",
    "10,000+ Hours of Islamic Content",
    "50+ Qualified Teachers",
    "99.5% Platform Uptime",
    "Daily Active Users from 25+ Countries"
  ],

  certification: {
    types: [
      "Certificate of Completion for Each Course Level",
      "Ijazah Certification for Quran Memorization",
      "Teaching License for Certified Instructors",
      "Professional Development Credits for Teachers"
    ],
    accreditation: "Accredited by recognized Islamic educational bodies and scholars"
  },

  support: {
    types: [
      "24/5 Technical Support (Saturday - Thursday)",
      "Dedicated Student Success Advisor",
      "Teacher Office Hours for Extra Help",
      "Islamic Scholarship Guidance",
      "Technical Documentation & Video Tutorials",
      "Community Support Forums"
    ],
    responseTime: "Within 4 hours for technical issues (during business hours)",
    language: "Support available in English, Arabic, Urdu, Bengali, and Bahasa"
  },

  integrations: [
    "Prayer Time APIs (Accurate to Your Location)",
    "Qibla Direction via GPS",
    "Islamic Calendar Integration (Hijri Dates)",
    "Payment Gateways (Stripe, PayPal, Islamic Banking)",
    "Zoom/Google Meet for Live Classes",
    "Learning Tools Interoperability (LTI)",
    "Social Media Sharing for Progress (Optional)"
  ],

  contact: {
    email: "info@quranicbarse.com",
    support: "support@quranicbarse.com",
    phones: ["+1 (555) 123-4567", "+44 20 1234 5678"],
    location: "Global Operations - Serving Worldwide",
    website: "https://quranicbarse.com",
    socialMedia: {
      instagram: "@quranicbarse",
      facebook: "quranicbarse",
      youtube: "@quranicbarse",
      telegram: "quranicbarse"
    },
    demo: "Schedule a Free Demo at https://calendly.com/quranicbarse/demo",
    hours: {
      support: "Saturday - Thursday: 8:00 AM – 8:00 PM (Your Local Time)",
      friday: "Friday: Limited Support (Emergency Only)",
      response: "Messages responded within 24 hours"
    }
  },

  faq: [
    {
      question: "Are your teachers qualified?",
      answer: "Yes, all our Quran teachers are Hafiz certified with Ijazah, graduates from renowned Islamic universities, and have extensive experience in online teaching."
    },
    {
      question: "Do you offer free trial classes?",
      answer: "Yes, we offer a free trial class for all our courses so you can experience our teaching methodology before committing."
    },
    {
      question: "Can my child learn Quran online effectively?",
      answer: "Absolutely! Our interactive platform, qualified teachers, and child-friendly approach make online Quran learning effective and engaging for children of all ages."
    },
    {
      question: "What is the recommended age to start?",
      answer: "We have programs for all ages starting from 5 years old. Our curriculum is tailored to different age groups and learning levels."
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes, students receive certificates of completion and upon completing Hifz, they can receive Ijazah certification recognized by Islamic scholars worldwide."
    },
    {
      question: "What if I miss a live class?",
      answer: "All live classes are recorded and available in your dashboard for review at any time. You can watch them as many times as needed."
    },
    {
      question: "Is there a family discount?",
      answer: "Yes, we offer special family packages with up to 5 members at a discounted rate."
    },
    {
      question: "Do you teach adults and beginners?",
      answer: "Yes, we welcome students of all ages and levels, including complete beginners. Our courses start from basic Arabic alphabet recognition."
    }
  ],

  ramadanSpecial: {
    features: [
      "Daily Live Tafsir & Duas",
      "Taraweeh Recitation Practice",
      "Khatm al-Quran Program (Complete Quran in 30 Days)",
      "I'tikaf Virtual Program (Last 10 Days)",
      "Zakat Calculator & Sadaqah Guidance",
      "Ramadan Recipe Sharing & Community Iftar Ideas"
    ]
  }
};

// Response templates for different query types
const RESPONSE_TEMPLATES = {
  greeting: `${QURANIC_BARSE_INFO.greeting} 🙏

Welcome to **${QURANIC_BARSE_INFO.projectName}** - ${QURANIC_BARSE_INFO.arabicName}
${QURANIC_BARSE_INFO.tagline}

✨ *${QURANIC_BARSE_INFO.description}*

How may I assist you in your spiritual journey today? Whether you're looking to learn Quran, understand Islamic teachings, or enhance your connection with Allah, I'm here to guide you! 📖✨`,

  overview: `🕌 **About ${QURANIC_BARSE_INFO.projectName}**

${QURANIC_BARSE_INFO.description}

**Mission:** ${QURANIC_BARSE_INFO.overview.mission}
**Vision:** ${QURANIC_BARSE_INFO.overview.vision}

📊 **Global Impact:**
• Active Learners: ${QURANIC_BARSE_INFO.overview.currentUsers}
• Partner Institutions: ${QURANIC_BARSE_INFO.overview.institutions}
• Countries Served: ${QURANIC_BARSE_INFO.overview.countries}
• Launch: ${QURANIC_BARSE_INFO.overview.launchDate}

Ready to begin your Quranic journey with us? 🚀`,

  features: `✨ **${QURANIC_BARSE_INFO.projectName} Features**

📖 **QURANIC FEATURES:**
${QURANIC_BARSE_INFO.keyFeatures.quranic.map(feature => `• ${feature}`).join('\n')}

🕌 **ISLAMIC STUDIES:**
${QURANIC_BARSE_INFO.keyFeatures.islamic.map(feature => `• ${feature}`).join('\n')}

🎓 **LEARNING TOOLS:**
${QURANIC_BARSE_INFO.keyFeatures.learning.map(feature => `• ${feature}`).join('\n')}

⚙️ **ADMIN & MANAGEMENT:**
${QURANIC_BARSE_INFO.keyFeatures.administrative.map(feature => `• ${feature}`).join('\n')}

🎯 **UNIQUE TO US:**
${QURANIC_BARSE_INFO.uniqueFeatures.map(feature => `• ${feature}`).join('\n')}

Which feature interests you most? Let me tell you more! 💫`,

  curriculum: `📚 **Our Curriculum**

**QURAN LEVELS:**
${QURANIC_BARSE_INFO.curriculum.quranLevels.map(level => `• ${level}`).join('\n')}

**ISLAMIC STUDIES:**
${QURANIC_BARSE_INFO.curriculum.islamicStudies.map(course => `• ${course}`).join('\n')}

**ARABIC COURSES:**
${QURANIC_BARSE_INFO.curriculum.arabicCourses.map(course => `• ${course}`).join('\n')}

We offer structured learning paths from beginner to advanced levels. Where would you like to start? 🤲`,

  pricing: `💰 **Pricing Plans**

**Monthly Subscriptions:**
• Basic: ${QURANIC_BARSE_INFO.pricing.monthlyPlans.basic}
• Standard: ${QURANIC_BARSE_INFO.pricing.monthlyPlans.standard}
• Premium: ${QURANIC_BARSE_INFO.pricing.monthlyPlans.premium}
• Family: ${QURANIC_BARSE_INFO.pricing.monthlyPlans.family}

**Annual Plans:** Save 20% on all yearly subscriptions

**FREE Resources:**
${QURANIC_BARSE_INFO.pricing.freeOptions.map(item => `• ${item}`).join('\n')}

**Pricing Models:**
${QURANIC_BARSE_INFO.pricing.models.map(model => `• ${model}`).join('\n')}

💰 **Scholarships:** Need-based financial aid available

💡 *Start your free trial today - No credit card required!*`,

  teachers: `👨‍🏫 **Our Qualified Teachers**

**Qualifications:**
${QURANIC_BARSE_INFO.teachers.qualifications.map(qual => `• ${qual}`).join('\n')}

**Class Size:** ${QURANIC_BARSE_INFO.teachers.studentRatio}

**Free Trial:** ${QURANIC_BARSE_INFO.teachers.demoClasses}

All our teachers undergo rigorous training and background checks to ensure a safe, high-quality learning environment for students of all ages. 🌟`,

  certification: `🎓 **Certification & Accreditation**

**Certificates Offered:**
${QURANIC_BARSE_INFO.certification.types.map(cert => `• ${cert}`).join('\n')}

**Accreditation:** ${QURANIC_BARSE_INFO.certification.accreditation}

Our certificates are recognized by Islamic institutions worldwide and can be shared on professional platforms. 📜`,

  ramadan: `🌙 **Ramadan Special Programs**

${QURANIC_BARSE_INFO.ramadanSpecial.features.map(feature => `• ${feature}`).join('\n')}

Make this Ramadan your most spiritually enriching month with our special programs designed to maximize your worship and Quranic connection! ✨`,

  technical: `🔧 **Technical Specifications**

**Platform:** ${QURANIC_BARSE_INFO.technicalSpecifications.platform}

**Technology Stack:**
${QURANIC_BARSE_INFO.technicalSpecifications.technology.map(tech => `• ${tech}`).join('\n')}

**Security & Safety:**
${QURANIC_BARSE_INFO.technicalSpecifications.security.map(sec => `• ${sec}`).join('\n')}

**Accessibility:** ${QURANIC_BARSE_INFO.technicalSpecifications.accessibility}

We prioritize security, especially for our young learners, ensuring a safe online environment. 🛡️`,

  benefits: `🌟 **Why Choose ${QURANIC_BARSE_INFO.projectName}?**

${QURANIC_BARSE_INFO.benefits.map(benefit => `• ${benefit}`).join('\n')}

📈 **Proven Results:**
${QURANIC_BARSE_INFO.successMetrics.map(metric => `• ${metric}`).join('\n')}

Join thousands of satisfied learners worldwide! 🌍`,

  support: `🛟 **Support & Assistance**

**Support Channels:**
${QURANIC_BARSE_INFO.support.types.map(type => `• ${type}`).join('\n')}

**Response Time:** ${QURANIC_BARSE_INFO.support.responseTime}
**Language Support:** ${QURANIC_BARSE_INFO.support.language}

We're committed to your learning success every step of the way! 💪`,

  contact: `📞 **Contact ${QURANIC_BARSE_INFO.projectName}**

📧 Email: ${QURANIC_BARSE_INFO.contact.email}
🆘 Support: ${QURANIC_BARSE_INFO.contact.support}
📱 Phone: ${QURANIC_BARSE_INFO.contact.phones.join(' / ')}
🌐 Website: ${QURANIC_BARSE_INFO.contact.website}
📅 Demo: ${QURANIC_BARSE_INFO.contact.demo}

**Social Media:**
• Instagram: ${QURANIC_BARSE_INFO.contact.socialMedia.instagram}
• Facebook: ${QURANIC_BARSE_INFO.contact.socialMedia.facebook}
• YouTube: ${QURANIC_BARSE_INFO.contact.socialMedia.youtube}
• Telegram: ${QURANIC_BARSE_INFO.contact.socialMedia.telegram}

**Support Hours:**
${QURANIC_BARSE_INFO.contact.hours.support}
${QURANIC_BARSE_INFO.contact.hours.friday}

May Allah bless your learning journey! 🤲`,

  faq: `❓ **Frequently Asked Questions**

${QURANIC_BARSE_INFO.faq.map(item => 
  `**Q: ${item.question}**\nA: ${item.answer}`
).join('\n\n')}

Have more questions? Feel free to ask, or schedule a free consultation call! 💬`
};

// Function to classify user intent (Islamic-focused)
function classifyIntent(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Arabic greetings
  if (message.includes('السلام') || message.includes('assalam') || message.includes('salam') || 
      message.includes('hello') || message.includes('hi') || message.includes('hey')) return 'greeting';
  
  // Islamic content queries
  if (message.includes('quran') || message.includes('recitation') || message.includes('memorization') || message.includes('hifz')) return 'quran';
  if (message.includes('tafsir') || message.includes('meaning') || message.includes('interpretation')) return 'tafsir';
  if (message.includes('hadith') || message.includes('sunnah') || message.includes('prophet')) return 'hadith';
  if (message.includes('dua') || message.includes('supplication') || message.includes('adhkar')) return 'dua';
  if (message.includes('prayer') || message.includes('salah') || message.includes('namaz')) return 'prayer';
  if (message.includes('ramadan') || message.includes('fasting')) return 'ramadan';
  
  // Course & curriculum
  if (message.includes('curriculum') || message.includes('course') || message.includes('level') || message.includes('program')) return 'curriculum';
  if (message.includes('arabic') || message.includes('language')) return 'arabic';
  if (message.includes('tajweed') || message.includes('pronunciation')) return 'tajweed';
  
  // Features & benefits
  if (message.includes('feature') || message.includes('capabilit')) return 'features';
  if (message.includes('benefit') || message.includes('advantage') || message.includes('why choose')) return 'benefits';
  
  // Pricing & enrollment
  if (message.includes('price') || message.includes('cost') || message.includes('how much') || 
      message.includes('plan') || message.includes('subscription') || message.includes('fee')) return 'pricing';
  if (message.includes('trial') || message.includes('free')) return 'trial';
  if (message.includes('scholarship') || message.includes('financial aid')) return 'scholarship';
  
  // Teachers & certification
  if (message.includes('teacher') || message.includes('instructor') || message.includes('scholar') || message.includes('qualified')) return 'teachers';
  if (message.includes('certificate') || message.includes('ijazah') || message.includes('accreditation')) return 'certification';
  
  // Technical
  if (message.includes('technical') || message.includes('tech') || message.includes('technology') || 
      message.includes('app') || message.includes('mobile')) return 'technical';
  if (message.includes('support') || message.includes('help') || message.includes('assistance')) return 'support';
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('demo')) return 'contact';
  
  // General info
  if (message.includes('about') || message.includes('overview') || message.includes('what is') || 
      message.includes('who is') || message.includes('introduction')) return 'overview';
  if (message.includes('faq') || message.includes('question') || message.includes('ask')) return 'faq';
  
  return 'general';
}

// Function to generate context-aware response
function generateResponse(intent: string, userMessage: string): string {
  switch (intent) {
    case 'greeting':
      return RESPONSE_TEMPLATES.greeting;
    case 'overview':
      return RESPONSE_TEMPLATES.overview;
    case 'features':
      return RESPONSE_TEMPLATES.features;
    case 'curriculum':
      return RESPONSE_TEMPLATES.curriculum;
    case 'pricing':
      return RESPONSE_TEMPLATES.pricing;
    case 'teachers':
      return RESPONSE_TEMPLATES.teachers;
    case 'certification':
      return RESPONSE_TEMPLATES.certification;
    case 'ramadan':
      return RESPONSE_TEMPLATES.ramadan;
    case 'technical':
      return RESPONSE_TEMPLATES.technical;
    case 'benefits':
      return RESPONSE_TEMPLATES.benefits;
    case 'support':
      return RESPONSE_TEMPLATES.support;
    case 'contact':
      return RESPONSE_TEMPLATES.contact;
    case 'faq':
      return RESPONSE_TEMPLATES.faq;
    case 'quran':
      return `📖 **Quran Learning at ${QURANIC_BARSE_INFO.projectName}**

We offer comprehensive Quran education:

**Available Courses:**
• Quran Reading Basics (Nuraniyah)
• Tajweed Rules & Application  
• Quran Memorization (Hifz) with Ijazah Track
• Tafsir Studies (Understanding the Message)
• Multiple Qira'at (Recitation Styles)

**Key Features:**
• One-on-one live sessions with certified teachers
• AI-powered pronunciation feedback
• Progress tracking & revision scheduling
• Flexible timings (24/7 availability)

**Success Rate:** ${QURANIC_BARSE_INFO.successMetrics[1]}

Would you like to know about levels, pricing, or schedule a free trial class? 📚✨`;
    
    case 'tafsir':
      return `📚 **Tafsir Studies at ${QURANIC_BARSE_INFO.projectName}**

**Available Tafsir Collections:**
• Tafsir Ibn Kathir (Most Authentic)
• Tafsir Al-Jalalayn (Concise Explanation)
• Tafsir Al-Sa'di (Thematic Analysis)
• Tafsir Al-Qurtubi (Jurisprudential)

**Course Structure:**
• Word-by-word analysis of each Ayah
• Historical context & reasons for revelation (Asbab al-Nuzul)
• Lessons & practical applications
• Discussion-based learning with scholars

Join our Tafsir classes to understand the deeper meanings of Allah's words! 🌟`;
    
    case 'hadith':
      return `🕌 **Hadith Studies at ${QURANIC_BARSE_INFO.projectName}**

**Hadith Collections:**
• Sahih Al-Bukhari
• Sahih Muslim  
• Sunan Abu Dawud
• Jami' At-Tirmidhi
• Sunan An-Nasa'i
• Sunan Ibn Majah
• Muwatta Imam Malik

**Learning Outcomes:**
• Understanding Hadith classifications (Sahih, Hasan, Da'if)
• Memorization of 40 Hadith Nawawi
• Application of Prophetic teachings in daily life

Deepen your connection with the Sunnah of Prophet Muhammad (PBUH)! 💫`;
    
    case 'dua':
      return `🤲 **Duas & Adhkar Program**

**Our Dua Curriculum Includes:**
• Morning & Evening Adhkar
• Duas for Daily Activities (Eating, Sleeping, Traveling)
• Fortress of the Muslim (Hisnul Muslim)
• Quranic Duas from Prophets
• Duas for Special Occasions

**Features:**
• Audio pronunciation guides
• Transliteration for non-Arabic speakers
• Translation & explanation
• Memorization tracking
• Daily reminder notifications

Learn the beautiful supplications taught by Prophet Muhammad (PBUH)! ✨`;
    
    case 'prayer':
      return `🕌 **Prayer (Salah) Learning Module**

**What We Offer:**
• Complete step-by-step prayer guide
• Correct pronunciation of all prayer recitations
• Learning prayer times for your location
• Qibla direction finder
• Virtual prayer practice sessions

**Special Features:**
• Prayer times calculation based on your location
• Nearby mosque finder
• Jummah (Friday) prayer reminders
• Janazah (Funeral) prayer learning

Never miss a prayer with our comprehensive Salah learning system! 🤲`;
    
    case 'arabic':
      return `🇸🇦 **Arabic Language Courses**

**Course Levels:**
1. **Beginner:** Alphabet, basic reading & writing
2. **Intermediate:** Grammar (Nahw & Sarf), vocabulary building
3. **Advanced:** Quranic Arabic, classical texts
4. **Conversational:** Modern Standard Arabic & dialects

**Course Features:**
• Interactive exercises & quizzes
• Speaking practice with native teachers
• Quranic vocabulary focus
• Certificate upon completion

Master the language of the Quran with our structured curriculum! 📖`;
    
    case 'tajweed':
      return `🎵 **Tajweed Rules Mastery**

**What You'll Learn:**
• Makharij (Correct articulation points of letters)
• Sifaat (Characteristics of letters)
• Rules of Noon Saakin & Tanween
• Rules of Meem Saakin
• Madd (Prolongation) rules
• Qalqalah, Ghunnah, and more

**Features:**
• Audio examples for each rule
• Record & compare with teacher
• Practice exercises with instant feedback
• One-on-one correction sessions

Perfect your Quran recitation with our expert Tajweed teachers! 🌟`;
    
    case 'trial':
      return `🎁 **Free Trial Classes**

**What's Included in Free Trial:**
• 30-minute one-on-one session with a qualified teacher
• Assessment of your current level
• Personalized learning plan
• Platform orientation
• Q&A about courses and methodology

**No credit card required!**

Would you like me to help you schedule your free trial class? Just share your preferred day and time! 📅`;
    
    case 'scholarship':
      return `💰 **Financial Aid & Scholarships**

**Scholarship Programs:**
• **Need-based Scholarship:** For students with financial constraints
• **Hifz Excellence Scholarship:** For dedicated memorization students
• **Orphan Support Program:** Free access for orphaned children
• **Revert Support:** 50% discount for new Muslims
• **Group Discounts:** Available for families & institutions

**How to Apply:**
1. Fill out the scholarship application form
2. Submit required documentation
3. Review by our scholarship committee
4. Approval within 5-7 business days

No student is turned away due to financial constraints. Apply today! 🤲`;
    
    default:
      // General response with key highlights
      return `Thank you for your question about: "${userMessage}"

**${QURANIC_BARSE_INFO.projectName}** - Your comprehensive Islamic learning platform offering:

📖 **Quran Learning** - Tajweed, Memorization, Tafsir
🕌 **Islamic Studies** - Aqeedah, Fiqh, Seerah, Hadith
🇸🇦 **Arabic Language** - From basics to Quranic Arabic
🎓 **Certified Teachers** - Qualified scholars with Ijazah

**Quick Facts:**
• 🎯 10,000+ Active Learners Worldwide
• 👨‍🏫 50+ Qualified Teachers
• 🌍 Available in 25+ Countries
• 💰 Plans from $19.99/month + FREE resources

To better assist you, could you please specify:
• Are you interested in Quran learning, Islamic studies, or Arabic?
• Are you looking for self-paced or live classes?
• Would you like information about pricing or free trial?

I'm here to guide you on your spiritual learning journey! 🤲✨`;
  }
}

async function Chatbot(userMessage: string) {
  try {
    // Classify user intent
    const intent = classifyIntent(userMessage);
    
    // Generate base response
    let response = generateResponse(intent, userMessage);
    
    // For complex or general queries, enhance with AI while maintaining Islamic context
    if (intent === 'general' || userMessage.length > 50) {
      const enhancedPrompt = `
You are an AI assistant for ${QURANIC_BARSE_INFO.projectName} - an Islamic Learning Management System for Quranic and Islamic education.

Islamic Context:
- Name: ${QURANIC_BARSE_INFO.projectName} (${QURANIC_BARSE_INFO.arabicName})
- Platform Purpose: Quran learning, Tajweed, Islamic studies, Arabic language
- Core Features: ${QURANIC_BARSE_INFO.keyFeatures.quranic.slice(0, 5).join(', ')}
- Student Base: ${QURANIC_BARSE_INFO.overview.currentUsers} worldwide
- Pricing: From ${QURANIC_BARSE_INFO.pricing.monthlyPlans.basic}
- Unique: AI-powered Tajweed feedback, Ijazah certification

IMPORTANT GUIDELINES:
1. Be respectful and inclusive of all Muslims
2. Reference Quran and Hadith appropriately when relevant
3. Use Islamic greetings like "Assalamu Alaikum", "Insha'Allah", "Alhamdulillah" naturally
4. Do NOT innovate in religious matters (bid'ah) - stick to authentic teachings
5. If unsure about religious ruling, advise consulting a qualified scholar
6. Encourage seeking knowledge and maintaining good character
7. Keep responses helpful, concise, and focused on the platform's educational services

User Question: "${userMessage}"

Please provide a helpful, professional response about ${QURANIC_BARSE_INFO.projectName} that:
1. Directly addresses the user's question about Islamic/Quranic learning
2. Highlights relevant features of our platform
3. Maintains an Islamic tone (use greetings, duas where appropriate)
4. Encourages taking action (free trial, demo, enrollment)
5. Is concise and actionable

Current base response: "${response}"

Enhanced Response (Islamic, helpful, action-oriented):`;

      try {
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: enhancedPrompt,
        });
        
        if (aiResponse.text) {
          response = aiResponse.text;
        }
      } catch (aiError) {
        console.error('AI enhancement failed, using base response:', aiError);
        // Fall back to base response
      }
    }

    // Ensure response includes Islamic greetings and branding
    if (!response.includes('Assalamu') && !response.includes('السلام') && intent !== 'greeting') {
      response = `${QURANIC_BARSE_INFO.greeting} 🙏\n\n${response}`;
    }
    
    if (!response.includes(QURANIC_BARSE_INFO.projectName) && intent !== 'greeting') {
      response += `\n\n---\n✨ *Ready to begin your Quranic journey with **${QURANIC_BARSE_INFO.projectName}**? Schedule your free trial class today!* 🤲`;
    }

    console.log(`User: ${userMessage}`);
    console.log(`Intent: ${intent}`);
    console.log(`Response: ${response}`);
    
    return response;

  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback responses
    return `${QURANIC_BARSE_INFO.greeting} 🙏

I apologize for the technical difficulty. **${QURANIC_BARSE_INFO.projectName}** is here to help with your Islamic learning needs:

📖 **Our Services:**
• Quran Reading with Tajweed
• Quran Memorization (Hifz) with Ijazah
• Tafsir & Islamic Studies
• Arabic Language Learning
• Live Classes with Qualified Scholars

Please contact us directly:
📧 ${QURANIC_BARSE_INFO.contact.email}
📱 ${QURANIC_BARSE_INFO.contact.phones[0]}
🌐 ${QURANIC_BARSE_INFO.contact.website}

Or schedule a free trial class: ${QURANIC_BARSE_INFO.contact.demo}

May Allah bless your quest for knowledge! 🤲`;
  }
}

// Additional utility function for conversation history
export async function ChatbotWithHistory(userMessage: string, conversationHistory: Array<{role: string, content: string}>) {
  const context = conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n');
  
  const contextualPrompt = `
Conversation History:
${context}

Current User Message: "${userMessage}"

You are ${QURANIC_BARSE_INFO.projectName} AI assistant, specializing in Islamic/Quranic education.

Platform Overview:
- ${QURANIC_BARSE_INFO.projectName} provides Quran learning, Tajweed, Islamic studies, and Arabic courses
- Services: One-on-one live classes, self-paced courses, group sessions
- Teachers: Qualified Hafiz and scholars with Ijazah
- Features: AI Tajweed feedback, progress tracking, certification

Provide a helpful, Islamic-focused response that:
1. Addresses the user's specific question about Islamic learning
2. Highlights relevant platform features
3. Uses appropriate Islamic terminology and greetings
4. Encourages scheduling a free trial or demo
5. Is respectful and authentic

Keep response professional, concise, and focused on educational services.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextualPrompt,
    });
    
    return response.text || `${QURANIC_BARSE_INFO.greeting}! How can I help you with your Islamic learning journey today? We offer Quran, Tajweed, and Islamic studies courses with qualified teachers. Would you like to learn more or schedule a free trial?`;
  } catch (error: any) {
    console.log(error);
    return Chatbot(userMessage);
  }
}

export default Chatbot;