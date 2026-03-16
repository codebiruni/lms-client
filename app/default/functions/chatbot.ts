/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Quranic Verse Academy LMS Project Information
const LMS_INFO = {
  projectName: "Quranic Verse Academy",
  tagline: "Illuminate Your Learning Journey - Comprehensive Learning Management System",
  description: "Quranic Verse Academy is a cutting-edge Learning Management System (LMS) designed to revolutionize education through technology. It provides a comprehensive platform for educational institutions, corporate training, and online course creators to deliver engaging learning experiences.",
  
  overview: {
    mission: "To make quality education accessible, engaging, and effective through innovative technology solutions.",
    vision: "Creating a global ecosystem where learning knows no boundaries, and every learner can find their bright path to success.",
    launchDate: "Q2 2024",
    currentUsers: "5000+ Active Learners",
    institutions: "25+ Educational Partners"
  },

  keyFeatures: {
    core: [
      "Interactive Course Management",
      "Virtual Classrooms with Live Streaming",
      "Automated Grading & Assessment",
      "Progress Tracking & Analytics",
      "Certification Management",
      "Multi-language Support (10+ languages)",
      "Mobile-First Responsive Design",
      "Offline Learning Capability"
    ],
    
    advanced: [
      "AI-Powered Personalized Learning Paths",
      "Real-time Collaboration Tools",
      "Gamification Elements (Badges, Leaderboards)",
      "Video Conferencing Integration",
      "Assignment & Quiz Builder",
      "Discussion Forums & Communities",
      "Learning Analytics Dashboard",
      "Content Library Management"
    ],

    administrative: [
      "User Role Management (Admin, Instructor, Student, Parent)",
      "Bulk User Enrollment",
      "Attendance Tracking",
      "Gradebook Management",
      "Report Generation",
      "Payment & Subscription Management",
      "Email Notification System",
      "Calendar & Event Management"
    ]
  },

  targetAudience: [
    {
      category: "Educational Institutions",
      examples: ["K-12 Schools", "Universities", "Colleges", "Vocational Training Centers"]
    },
    {
      category: "Corporate Training",
      examples: ["Employee Onboarding", "Professional Development", "Compliance Training", "Skills Enhancement"]
    },
    {
      category: "Individual Creators",
      examples: ["Online Course Creators", "Tutors", "Coaches", "Consultants"]
    }
  ],

  technicalSpecifications: {
    platform: "Web-based, Mobile-responsive, Progressive Web App",
    technology: [
      "Frontend: React.js with TypeScript",
      "Backend: Node.js with Express",
      "Database: MongoDB & PostgreSQL",
      "Cloud: AWS/GCP Integration",
      "Video Streaming: WebRTC & HLS",
      "Real-time Features: Socket.io",
      "Mobile Apps: React Native (iOS & Android)",
      "Payment Integration: SSLCommerz, Stripe, PayPal"
    ],
    security: [
      "Role-based Access Control (RBAC)",
      "SSL/TLS Encryption",
      "GDPR & Data Protection Compliance",
      "Two-Factor Authentication",
      "Secure Payment Gateway",
      "Regular Security Audits"
    ],
    scalability: "Supports 10,000+ concurrent users with auto-scaling capabilities"
  },

  useCases: [
    {
      title: "Online School Management",
      description: "Complete solution for schools to manage classes, assignments, grades, and parent communications"
    },
    {
      title: "University Course Delivery",
      description: "Hybrid learning support with lecture recordings, virtual labs, and research collaboration"
    },
    {
      title: "Corporate Training Portal",
      description: "Employee training with progress tracking, certification, and compliance management"
    },
    {
      title: "Skill Development Platform",
      description: "Marketplace for courses with revenue sharing, student engagement, and community features"
    }
  ],

  benefits: [
    "Reduce administrative workload by 40%",
    "Increase student engagement through interactive content",
    "24/7 accessibility across all devices",
    "Data-driven insights for continuous improvement",
    "Cost-effective compared to traditional LMS solutions",
    "Seamless integration with existing systems",
    "Customizable branding and white-labeling options"
  ],

  modules: {
    student: [
      "Personalized Dashboard",
      "Course Enrollment",
      "Learning Progress Tracking",
      "Assignment Submission",
      "Discussion Participation",
      "Peer Collaboration",
      "Achievement Badges"
    ],
    instructor: [
      "Course Builder",
      "Content Management",
      "Student Assessment",
      "Performance Analytics",
      "Communication Tools",
      "Grade Management",
      "Feedback System"
    ],
    admin: [
      "Platform Configuration",
      "User Management",
      "Revenue Analytics",
      "System Monitoring",
      "Report Generation",
      "Integration Management",
      "Support Ticketing"
    ],
    parent: [
      "Student Progress Monitoring",
      "Attendance Tracking",
      "Grade Reports",
      "Teacher Communication",
      "Payment History"
    ]
  },

  pricing: {
    models: [
      "Institutional License (Annual Subscription)",
      "Per-Student Pricing",
      "Enterprise Custom Package",
      "Revenue Share for Course Creators"
    ],
    startingPrice: {
      basic: "$499/month (Up to 500 users)",
      professional: "$999/month (Up to 2000 users)",
      enterprise: "Custom pricing (2000+ users)"
    },
    included: [
      "Unlimited courses",
      "All core features",
      "Basic support",
      "Mobile apps access"
    ]
  },

  support: {
    types: [
      "24/7 Technical Support",
      "Dedicated Account Manager",
      "Training & Onboarding",
      "Documentation & Knowledge Base",
      "Regular Feature Updates",
      "Custom Development Support"
    ],
    responseTime: "Within 2 hours for critical issues",
    training: "Comprehensive training for administrators and instructors"
  },

  integrationCapabilities: [
    "Zoom/Google Meet for virtual classes",
    "Payment Gateways (SSLCommerz, Stripe, PayPal)",
    "Google Workspace for Education",
    "Microsoft Office 365",
    "SCORM/xAPI compliance",
    "ERP systems integration",
    "CRM platforms",
    "Analytics tools (Google Analytics, Mixpanel)"
  ],

  successMetrics: [
    "92% Student Satisfaction Rate",
    "85% Course Completion Rate",
    "50% Reduction in Administrative Tasks",
    "3x Increase in Student Engagement",
    "99.9% Platform Uptime"
  ],

  contact: {
    email: "brightpath@codebiruni.com",
    phones: ["+8801617688805", "+880176407140"],
    location: "Dhaka, Bangladesh",
    website: "https://brightpathacademy.com",
    demo: "Schedule a live demo at https://calendly.com/brightpath/demo",
    hours: {
      weekdays: "Saturday - Thursday: 9:00 AM – 6:00 PM",
      friday: "Friday: Closed (Demo requests accepted via email)"
    }
  },

  faq: [
    {
      question: "How long does implementation take?",
      answer: "Typically 4-8 weeks depending on customization requirements."
    },
    {
      question: "Can we migrate existing course content?",
      answer: "Yes, we provide complete data migration services from any existing LMS."
    },
    {
      question: "Is white-labeling available?",
      answer: "Yes, you can customize the platform with your branding and domain."
    },
    {
      question: "What kind of support do you provide?",
      answer: "24/7 technical support with dedicated account manager for enterprise clients."
    }
  ]
};

// Response templates for different query types
const RESPONSE_TEMPLATES = {
  greeting: `Welcome to **${LMS_INFO.projectName}**! 🌟

${LMS_INFO.tagline}

I'm your AI assistant here to help you explore how our LMS can transform your educational initiatives. How can I assist you today?`,

  overview: `🏫 **About ${LMS_INFO.projectName}**

${LMS_INFO.description}

**Mission:** ${LMS_INFO.overview.mission}
**Vision:** ${LMS_INFO.overview.vision}

📊 **Key Metrics:**
• Active Users: ${LMS_INFO.overview.currentUsers}
• Partner Institutions: ${LMS_INFO.overview.institutions}
• Launch Date: ${LMS_INFO.overview.launchDate}

Ready to join the Bright Path community? Let's discuss your requirements!`,

  features: `✨ **Quranic Verse Academy Features**

🎯 **CORE FEATURES:**
${LMS_INFO.keyFeatures.core.map(feature => `• ${feature}`).join('\n')}

🚀 **ADVANCED CAPABILITIES:**
${LMS_INFO.keyFeatures.advanced.map(feature => `• ${feature}`).join('\n')}

⚙️ **ADMINISTRATIVE TOOLS:**
${LMS_INFO.keyFeatures.administrative.map(feature => `• ${feature}`).join('\n')}

Which feature area interests you most?`,

  modules: `📚 **Platform Modules**

👨‍🎓 **STUDENT MODULE:**
${LMS_INFO.modules.student.map(item => `• ${item}`).join('\n')}

👨‍🏫 **INSTRUCTOR MODULE:**
${LMS_INFO.modules.instructor.map(item => `• ${item}`).join('\n')}

👨‍💼 **ADMIN MODULE:**
${LMS_INFO.modules.admin.map(item => `• ${item}`).join('\n')}

👪 **PARENT MODULE:**
${LMS_INFO.modules.parent.map(item => `• ${item}`).join('\n')}

All modules work seamlessly together for a complete learning ecosystem!`,

  pricing: `💰 **Pricing Plans**

**Starting Prices:**
• Basic (Up to 500 users): ${LMS_INFO.pricing.startingPrice.basic}
• Professional (Up to 2000 users): ${LMS_INFO.pricing.startingPrice.professional}
• Enterprise (2000+ users): ${LMS_INFO.pricing.startingPrice.enterprise}

**Pricing Models:**
${LMS_INFO.pricing.models.map(model => `• ${model}`).join('\n')}

**All Plans Include:**
${LMS_INFO.pricing.included.map(item => `• ${item}`).join('\n')}

💡 *Contact us for a personalized quote based on your specific requirements.*`,

  technical: `🔧 **Technical Specifications**

**Platform:** ${LMS_INFO.technicalSpecifications.platform}

**Technology Stack:**
${LMS_INFO.technicalSpecifications.technology.map(tech => `• ${tech}`).join('\n')}

**Security Features:**
${LMS_INFO.technicalSpecifications.security.map(sec => `• ${sec}`).join('\n')}

**Scalability:** ${LMS_INFO.technicalSpecifications.scalability}`,

  targetAudience: `🎯 **Who Can Benefit from Quranic Verse Academy?**

${LMS_INFO.targetAudience.map(audience => 
  `**${audience.category}:**\n${audience.examples.map(ex => `• ${ex}`).join('\n')}`
).join('\n\n')}

No matter your educational needs, Quranic Verse Academy can be customized to serve your specific audience!`,

  benefits: `🌟 **Why Choose Quranic Verse Academy?**

${LMS_INFO.benefits.map(benefit => `• ${benefit}`).join('\n')}

📈 **Proven Results:**
${LMS_INFO.successMetrics.map(metric => `• ${metric}`).join('\n')}`,

  integrations: `🔌 **Integration Capabilities**

${LMS_INFO.integrationCapabilities.map(integration => `• ${integration}`).join('\n')}

We ensure seamless connectivity with your existing tools and systems!`,

  support: `🛟 **Support & Training**

**Support Options:**
${LMS_INFO.support.types.map(type => `• ${type}`).join('\n')}

**Response Time:** ${LMS_INFO.support.responseTime}
**Training:** ${LMS_INFO.support.training}

We're committed to your success every step of the way!`,

  contact: `📞 **Contact Quranic Verse Academy**

📧 Email: ${LMS_INFO.contact.email}
📱 Phone: ${LMS_INFO.contact.phones.join(' / ')}
📍 Location: ${LMS_INFO.contact.location}
🌐 Website: ${LMS_INFO.contact.website}
📅 Demo: ${LMS_INFO.contact.demo}

**Business Hours:**
${LMS_INFO.contact.hours.weekdays}
${LMS_INFO.contact.hours.friday}

Ready to illuminate your learning journey? Let's schedule a personalized demo!`,

  useCases: `📋 **Success Stories & Use Cases**

${LMS_INFO.useCases.map(useCase => 
  `**${useCase.title}**\n${useCase.description}`
).join('\n\n')}

Want to discuss your specific use case? We'd love to help!`,

  faq: `❓ **Frequently Asked Questions**

${LMS_INFO.faq.map(item => 
  `**Q: ${item.question}**\nA: ${item.answer}`
).join('\n\n')}

Have more questions? Feel free to ask!`,

  emergency: `I apologize, but I'm having trouble understanding your query. 

I'm specialized in helping with information about Quranic Verse Academy:
• Features and modules
• Pricing and plans
• Technical specifications
• Implementation process
• Integration capabilities

Could you please rephrase your question, or would you like to schedule a demo with our team?`
};

// Function to classify user intent
function classifyIntent(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) return 'greeting';
  if (message.includes('feature') || message.includes('capabilit')) return 'features';
  if (message.includes('module') || message.includes('component')) return 'modules';
  if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('plan')) return 'pricing';
  if (message.includes('technical') || message.includes('tech stack') || message.includes('technology')) return 'technical';
  if (message.includes('audience') || message.includes('who is it for') || message.includes('target')) return 'targetAudience';
  if (message.includes('benefit') || message.includes('advantage') || message.includes('why')) return 'benefits';
  if (message.includes('integrat') || message.includes('connect') || message.includes('api')) return 'integrations';
  if (message.includes('support') || message.includes('help') || message.includes('training')) return 'support';
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('demo')) return 'contact';
  if (message.includes('use case') || message.includes('example') || message.includes('success')) return 'useCases';
  if (message.includes('faq') || message.includes('question') || message.includes('ask')) return 'faq';
  if (message.includes('about') || message.includes('overview') || message.includes('what is')) return 'overview';
  
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
    
    case 'modules':
      return RESPONSE_TEMPLATES.modules;
    
    case 'pricing':
      return RESPONSE_TEMPLATES.pricing;
    
    case 'technical':
      return RESPONSE_TEMPLATES.technical;
    
    case 'targetAudience':
      return RESPONSE_TEMPLATES.targetAudience;
    
    case 'benefits':
      return RESPONSE_TEMPLATES.benefits;
    
    case 'integrations':
      return RESPONSE_TEMPLATES.integrations;
    
    case 'support':
      return RESPONSE_TEMPLATES.support;
    
    case 'contact':
      return RESPONSE_TEMPLATES.contact;
    
    case 'useCases':
      return RESPONSE_TEMPLATES.useCases;
    
    case 'faq':
      return RESPONSE_TEMPLATES.faq;
    
    default:
      // General response with key highlights
      return `I understand you're asking about: "${userMessage}"

**Quranic Verse Academy** is a comprehensive Learning Management System that offers:

${LMS_INFO.keyFeatures.core.slice(0, 5).map(f => `• ${f}`).join('\n')}

**Quick Facts:**
• 🎯 Serves ${LMS_INFO.targetAudience.length} main audience segments
• 📊 ${LMS_INFO.overview.currentUsers} active users
• 💰 Plans starting from ${LMS_INFO.pricing.startingPrice.basic}

Could you specify which aspect you'd like to know more about? I can help with:
• Features & Modules
• Pricing & Plans
• Technical Specifications
• Implementation Process
• Integration Options
• Scheduling a Demo`;
  }
}

async function Chatbot(userMessage: string) {
  try {
    // Classify user intent
    const intent = classifyIntent(userMessage);
    
    // Generate base response
    let response = generateResponse(intent, userMessage);
    
    // For complex or general queries, enhance with AI while maintaining LMS context
    if (intent === 'general' || userMessage.length > 50) {
      const enhancedPrompt = `
You are an AI assistant for Quranic Verse Academy - a comprehensive Learning Management System (LMS) designed for educational institutions, corporate training, and online course creators.

Project Context:
- Name: Quranic Verse Academy
- Core Features: ${LMS_INFO.keyFeatures.core.slice(0, 5).join(', ')}
- Target Audience: Educational Institutions, Corporate Training, Individual Creators
- Key Benefits: ${LMS_INFO.benefits.slice(0, 3).join(', ')}
- Pricing: Starting from ${LMS_INFO.pricing.startingPrice.basic}
- Contact: ${LMS_INFO.contact.email}

User Question: "${userMessage}"

Please provide a helpful, professional response that:
1. Directly addresses the user's question about the LMS
2. Highlights relevant Quranic Verse Academy features
3. Focuses on educational/learning management solutions
4. Maintains a professional and helpful tone
5. Encourages scheduling a demo or further discussion
6. Keeps response concise and actionable

Response Guidelines:
- Use emojis sparingly for emphasis
- Focus on how Quranic Verse Academy solves educational challenges
- Include specific feature mentions when relevant
- End with a call-to-action (demo, contact, or more info)

Current base response: "${response}"

Enhanced Response:`;

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

    // Ensure response includes Quranic Verse Academy branding
    if (!response.includes('Bright Path') && !response.includes('LMS') && intent !== 'greeting') {
      response += `\n\n---\n*Ready to illuminate your learning journey with **Quranic Verse Academy**? Schedule a demo today!*`;
    }

    console.log(`User: ${userMessage}`);
    console.log(`Intent: ${intent}`);
    console.log(`Response: ${response}`);
    
    return response;

  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback responses
    return `I apologize for the technical difficulty. **Quranic Verse Academy** is here to help with:

📚 Course Management & Virtual Classrooms
📊 Learning Analytics & Progress Tracking
🎓 Certification & Assessment Tools
💼 Corporate Training Solutions

Please contact us directly at ${LMS_INFO.contact.email} or call ${LMS_INFO.contact.phones[0]} for immediate assistance.

We specialize in creating engaging learning experiences that drive educational success!`;
  }
}

// Additional utility function for conversation history
export async function ChatbotWithHistory(userMessage: string, conversationHistory: Array<{role: string, content: string}>) {
  const context = conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n');
  
  const contextualPrompt = `
Conversation History:
${context}

Current User Message: "${userMessage}"

You are Quranic Verse Academy AI assistant. Provide a helpful response focusing on our LMS features:
- Course & Content Management
- Virtual Classrooms
- Student Progress Tracking
- Assessment & Certification
- Analytics & Reporting
- Integration Capabilities

Keep responses professional, concise, and encourage demo scheduling or further discussion about specific educational needs.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextualPrompt,
    });
    
    return response.text || "Thank you for your interest in Quranic Verse Academy! How can I help you explore our LMS solutions today?";
  } catch (error:any) {
    console.log(error)
    return Chatbot(userMessage);
  }
}

export default Chatbot;