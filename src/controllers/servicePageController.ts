import { Request, Response } from 'express';
import ServicePage, { IServicePage } from '../models/ServicePage';

export const defaultServicePages = [
  // 1. Medical & Laboratory Equipment (Exact match to reference UI image)
  {
    slug: 'medical-laboratory-equipment',
    title: {
      en: 'Medical & Laboratory Equipment',
      ar: 'المعدات الطبية والمخبرية',
    },
    subtitle: {
      en: 'Comprehensive medical device solutions and laboratory testing equipment.',
      ar: 'حلول شاملة للأجهزة الطبية ومعدات الفحص والاختبارات المخبرية.',
    },
    icon: 'Microscope',
    order: 1,
    isActive: true,
    overview: {
      badge: {
        en: 'MEDICAL EQUIPMENT SOLUTIONS',
        ar: 'حلول المعدات الطبية',
      },
      heading: {
        en: 'Advanced Equipment for Better Healthcare Outcomes',
        ar: 'معدات متقدمة لتحقيق أفضل النتائج الصحية',
      },
      paragraphs: [
        {
          en: 'We provide a range of medical and laboratory equipment designed to support healthcare professionals, diagnostic centers, hospitals, and research facilities.',
          ar: 'نقدم مجموعة متكاملة من المعدات الطبية والمخبرية المصممة لدعم المتخصصين في الرعاية الصحية ومراكز التشخيص والمستشفيات ومرافق الأبحاث.',
        },
        {
          en: 'Our portfolio includes diagnostic instruments, laboratory analyzers, medical devices, and essential equipment for clinical and research environments. These solutions help healthcare facilities support accurate testing and efficient daily operations.',
          ar: 'تشمل محفظتنا أدوات التشخيص والمحللات المخبرية والأجهزة الطبية والمعدات الأساسية للبيئات السريرية والبحثية، مما يساعد المنشآت على الفحوصات الدقيقة والعمليات اليومية الفعالة.',
        },
        {
          en: 'We focus on equipment reliability, practical functionality, and suitability for different healthcare environments. Our goal is to help organizations identify solutions that align with their operational requirements.',
          ar: 'نركز على موثوقية المعدات والوظائف العملية والملاءمة لمختلف البيئات الصحية. هدفنا هو مساعدة المنظمات في اختيار الحلول التي تتوافق تماماً مع متطلباتها التشغيلية.',
        },
      ],
      keyFeaturesTitle: {
        en: 'Key Features',
        ar: 'الميزات الرئيسية',
      },
      keyFeatures: [
        {
          id: 'feat-1',
          icon: 'Crosshair',
          title: {
            en: 'Diagnostic Precision',
            ar: 'دقة التشخيص الفائقة',
          },
          description: {
            en: 'Equipment designed to support consistent testing and reliable diagnostic workflows.',
            ar: 'معدات مصممة لدعم الفحوصات المتسقة وسير عمل التشخيص فائق الدقة والموثوقية.',
          },
        },
        {
          id: 'feat-2',
          icon: 'Cpu',
          title: {
            en: 'Modern Technology',
            ar: 'أحدث التقنيات التكنولوجية',
          },
          description: {
            en: 'Solutions incorporating modern technologies for clinical and laboratory applications.',
            ar: 'حلول تدمج أحدث التقنيات الرقمية المتقدمة للتطبيقات السريرية والمخبرية.',
          },
        },
        {
          id: 'feat-3',
          icon: 'ShieldCheck',
          title: {
            en: 'Reliable Performance',
            ar: 'أداء معتمد ومستقر',
          },
          description: {
            en: 'Equipment selected with attention to durability, functionality, and operational needs.',
            ar: 'معدات مختارة بعناية لتحقيق أقصى درجات المتانة والاستجابة التشغيلية.',
          },
        },
        {
          id: 'feat-4',
          icon: 'Headphones',
          title: {
            en: 'Technical Assistance',
            ar: 'دعم فني واستشاري متواصل',
          },
          description: {
            en: 'Support with product information, equipment selection, and coordination requirements.',
            ar: 'دعم متكامل بالمعلومات الفنية واختيار المعدات وتنسيق الاحتياجات التشغيلية.',
          },
        },
      ],
    },
    whyChoose: {
      badge: {
        en: 'WHY CHOOSE OUR SOLUTIONS',
        ar: 'لماذا تختار حلولنا',
      },
      heading: {
        en: 'Medical & Laboratory Equipment',
        ar: 'المعدات الطبية والمخبرية',
      },
      items: [
        {
          id: 'why-1',
          icon: 'CheckCircle2',
          text: {
            en: 'Support for clinical and laboratory operations',
            ar: 'دعم شامل للعمليات السريرية والمخبرية المتقدمة',
          },
        },
        {
          id: 'why-2',
          icon: 'CheckCircle2',
          text: {
            en: 'Equipment options for different facility requirements',
            ar: 'خيارات متعددة للأجهزة تناسب مختلف متطلبات المنشآت',
          },
        },
        {
          id: 'why-3',
          icon: 'CheckCircle2',
          text: {
            en: 'Focus on quality and reliable performance',
            ar: 'تركيز دائم على معايير الجودة والأداء فائق الاستقرار',
          },
        },
        {
          id: 'why-4',
          icon: 'CheckCircle2',
          text: {
            en: 'Solutions tailored to operational needs',
            ar: 'حلول مخصصة تلبي كافة الاحتياجات التشغيلية للمستشفيات',
          },
        },
      ],
    },
    ctaBanner: {
      heading: {
        en: 'Find the Right Equipment for Your Facility',
        ar: 'اعثر على المعدات المناسبة لمنشأتك الصحية',
      },
      description: {
        en: 'Contact our team to discuss your medical and laboratory equipment requirements and explore suitable solutions.',
        ar: 'تواصل مع فريقنا المتخصص لمناقشة متطلبات الأجهزة الطبية والمخبرية واستكشاف أنسب الحلول المتوفرة.',
      },
      buttonText: {
        en: 'Submit Quote Request',
        ar: 'طلب عرض أسعار مخصص',
      },
      buttonLink: '/quotes',
    },
  },

  // 2. Laboratory Supplies
  {
    slug: 'laboratory-supplies',
    title: {
      en: 'Laboratory Supplies',
      ar: 'المستلزمات المخبرية',
    },
    subtitle: {
      en: 'Reliable laboratory supplies and essential consumables for research, testing, and diagnostic facilities.',
      ar: 'مستلزمات مخبرية ومواد استهلاكية موثوقة لمرافق الأبحاث والاختبار والتشخيص الطبي.',
    },
    icon: 'FlaskConical',
    order: 2,
    isActive: true,
    overview: {
      badge: {
        en: 'LABORATORY CONSUMABLES & CHEMICALS',
        ar: 'المستهلكات والمواد الكيميائية المخبرية',
      },
      heading: {
        en: 'High-Purity Supplies for Critical Laboratory Workflows',
        ar: 'مستلزمات عالية النقاء لسير العمل المخبري الدقيق',
      },
      paragraphs: [
        {
          en: 'We supply an extensive range of high-grade laboratory consumables, reagents, glassware, and diagnostic kits tailored for modern research and clinical laboratories.',
          ar: 'نوفر مجموعة واسعة من المستهلكات المخبرية والكواشف والأواني الزجاجية وأطقم التشخيص عالية الجودة المصممة للمختبرات البحثية والسريرية.',
        },
        {
          en: 'Our supply chain ensures constant stock availability, strict temperature control during transport, and full batch traceability for demanding regulatory environments.',
          ar: 'تضمن سلسلة التوريد لدينا توافر المخزون المستمر، والتحكم الصارم في درجات الحرارة أثناء النقل، وإمكانية التتبع الكامل للدفعات.',
        },
        {
          en: 'From routine testing disposables to specialized chemical reagents, we support educational, medical, and industrial testing laboratories with prompt, reliable distribution.',
          ar: 'من المستهلكات الروتينية إلى الكواشف الكيميائية المتخصصة، ندعم مختبرات الفحص التعليمية والطبية والصناعية بتوزيع سريع وموثوق.',
        },
      ],
      keyFeaturesTitle: {
        en: 'Key Features',
        ar: 'الميزات الرئيسية',
      },
      keyFeatures: [
        {
          id: 'feat-lab-1',
          icon: 'FlaskConical',
          title: {
            en: 'Certified Purity',
            ar: 'نقاوة معتمدة دولياً',
          },
          description: {
            en: 'Reagents and consumables adhering to ISO and clinical grade chemical standards.',
            ar: 'كواشف ومستهلكات مطابقة للمواصفات القياسية الدولية ومعايير الدرجة السريرية.',
          },
        },
        {
          id: 'feat-lab-2',
          icon: 'Layers',
          title: {
            en: 'Comprehensive Inventory',
            ar: 'مخزون شامل ومتنوع',
          },
          description: {
            en: 'Wide inventory of plasticware, glassware, reagents, and precision pipetting systems.',
            ar: 'مخزون عريض من الأدوات البلاستيكية والزجاجية والكواشف وأنظمة السحب الدقيق.',
          },
        },
        {
          id: 'feat-lab-3',
          icon: 'Truck',
          title: {
            en: 'Cold-Chain Delivery',
            ar: 'سلسلة تبريد لوجستية',
          },
          description: {
            en: 'Temperature-monitored logistics ensuring chemical and biological active integrity.',
            ar: 'شحن ومتابعة درجات الحرارة لضمان سلامة المواد الحيوية والكيميائية الحساسة.',
          },
        },
        {
          id: 'feat-lab-4',
          icon: 'FileCheck',
          title: {
            en: 'Batch Traceability',
            ar: 'تتبع معتمد لكل دفعة',
          },
          description: {
            en: 'Complete certificates of analysis (COA) and material safety data sheets (MSDS) provided.',
            ar: 'شهادات تحليل كاملة وملفات بيانات السلامة الدوائية والمخبرية لكل شحنة.',
          },
        },
      ],
    },
    whyChoose: {
      badge: {
        en: 'WHY CHOOSE OUR SOLUTIONS',
        ar: 'لماذا تختار حلولنا',
      },
      heading: {
        en: 'Laboratory Supplies',
        ar: 'المستلزمات المخبرية',
      },
      items: [
        {
          id: 'why-lab-1',
          icon: 'CheckCircle2',
          text: {
            en: 'Continuous stock availability and reliable scheduled replenishment',
            ar: 'توافر مستمر للمخزون وجداول توريد دورية منتظمة',
          },
        },
        {
          id: 'why-lab-2',
          icon: 'CheckCircle2',
          text: {
            en: 'High-grade analytical and clinical purity certification',
            ar: 'شهادات نقاوة سريرية وتحليلية معتمدة من كبرى المنظمات',
          },
        },
        {
          id: 'why-lab-3',
          icon: 'CheckCircle2',
          text: {
            en: 'Secure temperature-controlled transport nationwide',
            ar: 'نقل مبرد ومراقب رقمياً لجميع مناطق المملكة',
          },
        },
        {
          id: 'why-lab-4',
          icon: 'CheckCircle2',
          text: {
            en: 'Specialized consultation for reagent and testing kit selection',
            ar: 'استشارات متخصصة لاختيار أنسب الكواشف وأطقم الفحص',
          },
        },
      ],
    },
    ctaBanner: {
      heading: {
        en: 'Stock Your Laboratory with Certified Supplies',
        ar: 'زوّد مختبرك بمستلزمات موثوقة ومعتمدة',
      },
      description: {
        en: 'Get in touch with our lab supply specialists to request volume pricing, catalog access, or scheduled deliveries.',
        ar: 'تواصل مع متخصصي التوريد المخبري لدينا لطلب عروض أسعار الكميات وتصفح الكتالوج الشامل.',
      },
      buttonText: {
        en: 'Inquire About Lab Supplies',
        ar: 'طلب استفسار عن المستلزمات',
      },
      buttonLink: '/enquiries',
    },
  },

  // 3. Healthcare Solutions
  {
    slug: 'healthcare-solutions',
    title: {
      en: 'Healthcare Solutions',
      ar: 'حلول الرعاية الصحية',
    },
    subtitle: {
      en: 'Quality healthcare products and integrated operational solutions designed to support medical professionals and facilities.',
      ar: 'منتجات رعاية صحية عالية الجودة وحلول تشغيلية متكاملة مصممة لدعم المنشآت الطبية والكوادر الصحية.',
    },
    icon: 'Stethoscope',
    order: 3,
    isActive: true,
    overview: {
      badge: {
        en: 'INTEGRATED HEALTHCARE SYSTEMS',
        ar: 'أنظمة الرعاية الصحية المتكاملة',
      },
      heading: {
        en: 'Integrated Solutions Driving Clinical Excellence & Patient Care',
        ar: 'حلول متكاملة تقود التميز السريري وسلامة المرضى',
      },
      paragraphs: [
        {
          en: 'We deliver holistic healthcare solutions that combine medical technology, clinical ergonomics, and patient safety systems to modernize healthcare facilities.',
          ar: 'نقدم حلول رعاية صحية شاملة تجمع بين التكنولوجيا الطبية وبيئة العمل السريرية وأنظمة سلامة المرضى لتحديث المنشآت الصحية.',
        },
        {
          en: 'Our services encompass operating room setup, ICU patient monitoring integration, emergency response systems, and specialized clinical consultation.',
          ar: 'تشمل خدماتنا تجهيز غرف العمليات، ودمج أنظمة مراقبة المرضى في العناية المركزة، وأنظمة الاستجابة للطوارئ، والاستشارات السريرية المتخصصة.',
        },
        {
          en: 'By collaborating closely with hospital administrators and clinicians, we engineer turnkey clinical environments that improve workflows and elevate the standard of care.',
          ar: 'من خلال التعاون الوثيق مع إدارات المستشفيات والأطباء، نصمم بيئات سريرية متكاملة تعزز كفاءة سير العمل وترتقي بمستوى الرعاية.',
        },
      ],
      keyFeaturesTitle: {
        en: 'Key Features',
        ar: 'الميزات الرئيسية',
      },
      keyFeatures: [
        {
          id: 'feat-health-1',
          icon: 'Stethoscope',
          title: {
            en: 'Turnkey Clinical Setup',
            ar: 'تجهيز سريري متكامل (تسليم مفتاح)',
          },
          description: {
            en: 'End-to-end planning, procurement, installation, and commissioning of specialized departments.',
            ar: 'تخطيط وتوريد وتركيب وتشغيل متكامل للأقسام الطبية التخصصية.',
          },
        },
        {
          id: 'feat-health-2',
          icon: 'Activity',
          title: {
            en: 'Workflow Optimization',
            ar: 'تحسين كفاءة سير العمل السريري',
          },
          description: {
            en: 'Ergonomic designs and smart medical integrations that reduce response times and staff strain.',
            ar: 'تصاميم مريحة وتكاملات ذكية تقلل أوقات الاستجابة وتدعم الكوادر الطبية.',
          },
        },
        {
          id: 'feat-health-3',
          icon: 'Users',
          title: {
            en: 'Clinician Training',
            ar: 'تدريب سريري وفني معتمد',
          },
          description: {
            en: 'Continuous on-site and remote training programs for doctors, nurses, and bio-technicians.',
            ar: 'برامج تدريبية موقعية ومستمرة للأطباء والتمريض ومهندسي الأجهزة الطبية.',
          },
        },
        {
          id: 'feat-health-4',
          icon: 'Building2',
          title: {
            en: 'Modular Scalability',
            ar: 'قابلية التوسع المعياري',
          },
          description: {
            en: 'Flexible infrastructure that expands smoothly alongside hospital growth and rising patient demand.',
            ar: 'بنية تحتية مرنة تتوسع بسلاسة مع نمو المستشفى وزيادة أعداد المرضى.',
          },
        },
      ],
    },
    whyChoose: {
      badge: {
        en: 'WHY CHOOSE OUR SOLUTIONS',
        ar: 'لماذا تختار حلولنا',
      },
      heading: {
        en: 'Healthcare Solutions',
        ar: 'حلول الرعاية الصحية',
      },
      items: [
        {
          id: 'why-health-1',
          icon: 'CheckCircle2',
          text: {
            en: 'Comprehensive department planning from ICU to primary care clinics',
            ar: 'تخطيط شامل للأقسام من العناية المركزة إلى العيادات التخصصية',
          },
        },
        {
          id: 'why-health-2',
          icon: 'CheckCircle2',
          text: {
            en: 'Full integration with modern hospital information systems (HIS)',
            ar: 'تكامل كامل مع أنظمة معلومات المستشفيات الرقمية الحديثة',
          },
        },
        {
          id: 'why-health-3',
          icon: 'CheckCircle2',
          text: {
            en: 'Preventative bio-engineering maintenance programs included',
            ar: 'برامج صيانة وقائية وهندسة طبية حيوية متقدمة',
          },
        },
        {
          id: 'why-health-4',
          icon: 'CheckCircle2',
          text: {
            en: '24/7 dedicated clinical technical hotline and emergency response',
            ar: 'خط ساخن للاستجابة الفنية والطبية الطارئة على مدار الساعة',
          },
        },
      ],
    },
    ctaBanner: {
      heading: {
        en: 'Transform Your Healthcare Facility Today',
        ar: 'طوّر منشأتك الصحية بأحدث الحلول المتكاملة',
      },
      description: {
        en: 'Consult with our healthcare systems engineers to design solutions customized for your clinical environment.',
        ar: 'استشر مهندسي أنظمة الرعاية الصحية لدينا لتصميم حلول مخصصة لمنشأتك السريرية.',
      },
      buttonText: {
        en: 'Schedule Clinical Consultation',
        ar: 'حجز استشارة سريرية',
      },
      buttonLink: '/enquiries',
    },
  },

  // 4. Quality & Safety Standards
  {
    slug: 'quality-safety-standards',
    title: {
      en: 'Quality & Safety Standards',
      ar: 'معايير الجودة والسلامة',
    },
    subtitle: {
      en: 'Products selected with a rigorous focus on quality, clinical reliability, and compliance with applicable safety standards.',
      ar: 'منتجات مختارة بتركيز صارم على الجودة والموثوقية السريرية والامتثال التام لمعايير السلامة العالمية.',
    },
    icon: 'ShieldCheck',
    order: 4,
    isActive: true,
    overview: {
      badge: {
        en: 'REGULATORY COMPLIANCE & ACCREDITATION',
        ar: 'الامتثال التنظيمي والاعتماد الدولي',
      },
      heading: {
        en: 'Rigorous Safety Protocols & Global Certification Adherence',
        ar: 'بروتوكولات سلامة صارمة والالتزام التام بالاعتمادات الدولية',
      },
      paragraphs: [
        {
          en: 'Patient and staff safety is the foundational pillar of our medical portfolio. Every product and solution we supply complies with stringent international health guidelines.',
          ar: 'سلامة المرضى والكوادر الطبية هي الركيزة الأساسية لمحفظتنا الطبية. كل منتج وحل نوفره يمتثل للمبادئ التوجيهية الصحية العالمية الصارمة.',
        },
        {
          en: 'We adhere strictly to ISO 13485, CE medical device directives, FDA guidelines, and SFDA Saudi regulatory frameworks to ensure unquestioned safety and efficacy.',
          ar: 'نلتزم بشكل صارم بمعايير ISO 13485 وتوجيهات الأجهزة الطبية CE وتوجيهات FDA وأطر العمل التنظيمية للهيئة العامة للغذاء والدواء SFDA.',
        },
        {
          en: 'Our quality assurance team conducts regular vendor audits, calibration checks, and validation testing, giving healthcare institutions total peace of mind.',
          ar: 'يقوم فريق ضمان الجودة لدينا بإجراء عمليات تدقيق دورية للموردين، وفحوصات معايرة، واختبارات تحقق، مما يمنح المنشآت الصحية راحة بال تامة.',
        },
      ],
      keyFeaturesTitle: {
        en: 'Key Features',
        ar: 'الميزات الرئيسية',
      },
      keyFeatures: [
        {
          id: 'feat-qual-1',
          icon: 'ShieldCheck',
          title: {
            en: 'Global Certifications',
            ar: 'اعتمادات دولية معترف بها',
          },
          description: {
            en: 'Compliance with ISO 13485, CE Medical Devices Directive, FDA, and Saudi SFDA requirements.',
            ar: 'امتثال كامل لشهادات ISO 13485 وتوجيهات CE والـ FDA وهيئة الغذاء والدواء السعودية SFDA.',
          },
        },
        {
          id: 'feat-qual-2',
          icon: 'Award',
          title: {
            en: 'Manufacturer Audits',
            ar: 'تدقيق دوري للمصنعين',
          },
          description: {
            en: 'Multi-tiered inspection of global partner manufacturing facilities and cleanroom standards.',
            ar: 'فحص متعدد المراحل لمصانع الشركاء العالميين ومعايير غرف الإنتاج المعقمة.',
          },
        },
        {
          id: 'feat-qual-3',
          icon: 'CheckCheck',
          title: {
            en: 'Pre-Delivery Calibration',
            ar: 'معايرة واختبار قبل التسليم',
          },
          description: {
            en: 'Every precision instrument undergoes rigorous testing and calibration before facility dispatch.',
            ar: 'يخضع كل جهاز دقيق لاختبارات معايرة وضبط صارمة قبل تسليمه للمنشأة.',
          },
        },
        {
          id: 'feat-qual-4',
          icon: 'HeartHandshake',
          title: {
            en: 'Patient-First Safety',
            ar: 'سلامة المريض أولاً',
          },
          description: {
            en: 'Dedicated vigilance and rapid recall coordination protocols to safeguard patients always.',
            ar: 'بروتوكولات يقظة طبية وتنسيق سريع لحماية المرضى والمستخدمين في جميع الظروف.',
          },
        },
      ],
    },
    whyChoose: {
      badge: {
        en: 'WHY CHOOSE OUR SOLUTIONS',
        ar: 'لماذا تختار حلولنا',
      },
      heading: {
        en: 'Quality & Safety Standards',
        ar: 'معايير الجودة والسلامة',
      },
      items: [
        {
          id: 'why-qual-1',
          icon: 'CheckCircle2',
          text: {
            en: 'Full compliance with SFDA, CE, and ISO medical directives',
            ar: 'امتثال كامل لتوجيهات SFDA و CE و ISO الطبية',
          },
        },
        {
          id: 'why-qual-2',
          icon: 'CheckCircle2',
          text: {
            en: 'Comprehensive documentation and calibration certificates provided with each delivery',
            ar: 'وثائق كاملة وشهادات معايرة معتمدة تسلم مع كل شحنة',
          },
        },
        {
          id: 'why-qual-3',
          icon: 'CheckCircle2',
          text: {
            en: 'Zero-compromise approach to medical equipment sterilization and electrical safety',
            ar: 'نهج صارم لا يقبل التهاون في تعقيم الأجهزة ومعايير الأمان الكهربائي',
          },
        },
        {
          id: 'why-qual-4',
          icon: 'CheckCircle2',
          text: {
            en: 'Continuous post-market surveillance and proactive safety advisory updates',
            ar: 'متابعة دورية مستمرة وتحديثات استباقية لإرشادات السلامة',
          },
        },
      ],
    },
    ctaBanner: {
      heading: {
        en: 'Partner with a Certified Quality Leader',
        ar: 'شارك مع رواد الجودة والامتثال الطبي المعتمد',
      },
      description: {
        en: 'Request our quality certificates, compliance documentation, or schedule an accreditation review for your facility.',
        ar: 'اطلب شهادات الجودة ووثائق الامتثال الخاصة بنا أو نسق موعداً لمراجعة الاعتماد لمنشأتك.',
      },
      buttonText: {
        en: 'Request Quality Documentation',
        ar: 'طلب وثائق الجودة والاعتمادات',
      },
      buttonLink: '/enquiries',
    },
  },
];

// Helper to seed defaults if DB is empty
export const seedDefaultServicePages = async (): Promise<void> => {
  const count = await ServicePage.countDocuments();
  if (count === 0) {
    await ServicePage.insertMany(defaultServicePages);
    console.log('[ServicePage] Successfully seeded 4 default service pages.');
  }
};

// GET /services or /api/services
// Fetch all service pages
export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    await seedDefaultServicePages();

    const { activeOnly } = req.query;
    const filter = activeOnly === 'true' ? { isActive: true } : {};

    const services = await ServicePage.find(filter).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: error.message,
    });
  }
};

// GET /services/:slug or /api/services/:slug
// Fetch individual service details by slug
export const getServiceBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    await seedDefaultServicePages();

    const rawSlug = String(req.params.slug || '').trim().toLowerCase();

    // Map common aliases
    let targetSlug = rawSlug;
    if (rawSlug === 'medical-equipment' || rawSlug === 'medical') {
      targetSlug = 'medical-laboratory-equipment';
    } else if (rawSlug === 'standards' || rawSlug === 'quality-standards') {
      targetSlug = 'quality-safety-standards';
    }

    let service = await ServicePage.findOne({
      $or: [
        { slug: targetSlug },
        { slug: rawSlug },
      ],
    });

    if (!service) {
      // Fallback: check if ID was provided instead of slug
      if (rawSlug.match(/^[0-9a-fA-F]{24}$/)) {
        service = await ServicePage.findById(rawSlug);
      }
    }

    if (!service) {
      res.status(404).json({
        success: false,
        message: `Service not found with slug: "${rawSlug}"`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    console.error('Error fetching service by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service details',
      error: error.message,
    });
  }
};

// POST /services or /api/services
// Create / Add New service page
export const createServicePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    // Generate slug from title if not explicitly provided
    let slug = body.slug ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
    if (!slug && body.title?.en) {
      slug = body.title.en.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!slug) {
      slug = `service-${Date.now()}`;
    }

    // Ensure uniqueness
    const existing = await ServicePage.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Determine order
    const maxOrderDoc = await ServicePage.findOne().sort({ order: -1 });
    const order = typeof body.order === 'number' ? body.order : ((maxOrderDoc?.order || 0) + 1);

    const newService = new ServicePage({
      ...body,
      slug,
      order,
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService,
    });
  } catch (error: any) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message,
    });
  }
};

// PUT /services/:id or /api/services/:id
// Update service page
export const updateServicePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id || '').trim();
    const body = req.body;

    let service: (IServicePage & { _id: any }) | null = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      service = await ServicePage.findById(id);
    }
    if (!service) {
      service = await ServicePage.findOne({ slug: id.toLowerCase() });
    }

    if (!service) {
      res.status(404).json({
        success: false,
        message: `Service not found with identifier: "${id}"`,
      });
      return;
    }

    // Update fields
    if (body.title) service.title = body.title;
    if (body.subtitle) service.subtitle = body.subtitle;
    if (body.icon) service.icon = body.icon;
    if (typeof body.order === 'number') service.order = body.order;
    if (typeof body.isActive === 'boolean') service.isActive = body.isActive;
    if (body.slug && body.slug !== service.slug) {
      // Check if new slug already taken
      const cleanSlug = body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const slugExists = await ServicePage.findOne({ slug: cleanSlug, _id: { $ne: service._id } });
      if (!slugExists) {
        service.slug = cleanSlug;
      }
    }
    if (body.overview) service.overview = { ...service.overview, ...body.overview };
    if (body.whyChoose) service.whyChoose = { ...service.whyChoose, ...body.whyChoose };
    if (body.ctaBanner) service.ctaBanner = { ...service.ctaBanner, ...body.ctaBanner };

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error: any) {
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: error.message,
    });
  }
};

// DELETE /services/:id or /api/services/:id
export const deleteServicePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id || '').trim();

    let deleted = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await ServicePage.findByIdAndDelete(id);
    }
    if (!deleted) {
      deleted = await ServicePage.findOneAndDelete({ slug: id.toLowerCase() });
    }

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: `Service not found with identifier: "${id}"`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      data: deleted,
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message,
    });
  }
};

// POST /api/services/reset-defaults
export const resetDefaultServices = async (_req: Request, res: Response): Promise<void> => {
  try {
    await ServicePage.deleteMany({});
    const inserted = await ServicePage.insertMany(defaultServicePages);
    res.status(200).json({
      success: true,
      message: 'Successfully reset services to 4 default service pages',
      count: inserted.length,
      data: inserted,
    });
  } catch (error: any) {
    console.error('Error resetting services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset default services',
      error: error.message,
    });
  }
};
