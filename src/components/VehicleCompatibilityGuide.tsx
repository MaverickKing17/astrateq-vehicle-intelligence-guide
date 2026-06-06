/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  Download, 
  Printer, 
  Link as LinkIcon, 
  Share2, 
  Cpu, 
  Shield, 
  Layers, 
  Sparkles, 
  Gauge, 
  ArrowRight, 
  Info, 
  Network, 
  ThermometerSnowflake, 
  CloudRain, 
  Lock, 
  Server, 
  Wifi, 
  ChevronRight, 
  Search, 
  Mail, 
  Car, 
  Smartphone, 
  FileText, 
  AlertTriangle,
  Flame,
  MousePointer,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { 
  OBDSensor, 
  VehicleBrandMetrics, 
  AssessmentFactor 
} from '../types';

// Pre-defined Canadian-vibe vehicle datasets for the database explorer
const VEHICLE_DATABASE: VehicleBrandMetrics[] = [
  // Family SUVs
  { name: 'Toyota RAV4', country: 'Japan (Canadian Spec)', protocol: 'CAN ISO-15765', obdLocation: 'Lower dashboard, left of steering column', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Extremely reliable electrical signaling. Standardized dashboard geometries.' },
  { name: 'Honda CR-V', country: 'Japan (Canadian Spec)', protocol: 'CAN ISO-15765', obdLocation: 'Lower panel, driver side knee center', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Ideal OBD layout. Traditional stable 12V charging loops.' },
  { name: 'Mazda CX-5', country: 'Japan (Cold-Calibrated)', protocol: 'CAN ISO-15765', obdLocation: 'Under dashboard, near hood release', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Excellent cabin architecture matching passenger ergonomics.' },
  { name: 'Ford Escape', country: 'USA (All-Weather)', protocol: 'CAN ISO-15765', obdLocation: 'Beneath left steering column cowl', voltageStability: 'Robust', compatibilityStatus: 'Evaluation Recommended', notes: 'Standard CAN bus topology. Seamless connection for passive sensor data.' },
  
  // Pickup Trucks
  { name: 'Ford F-150', country: 'USA (Heavy Duty)', protocol: 'CAN ISO-15765', obdLocation: 'Under dash, right of parking brake', voltageStability: 'Ultra-Stable', compatibilityStatus: 'Highly Aligned', notes: 'Heavy duty electrical loops. Supports continuous passive draws safely.' },
  { name: 'Ram 1500', country: 'USA (All-Weather)', protocol: 'CAN ISO-15765', obdLocation: 'Directly beneath steering column', voltageStability: 'Robust', compatibilityStatus: 'Evaluation Recommended', notes: 'Spacious lower console allows robust device spacing.' },
  { name: 'Chevrolet Silverado', country: 'USA (Cold-Calibrated)', protocol: 'CAN ISO-15765', obdLocation: 'Lower dash, left side fuse cover', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Clean signal profile under extensive electrical heating loads.' },
  { name: 'Toyota Tacoma', country: 'Japan (Adventure Spec)', protocol: 'CAN ISO-15765', obdLocation: 'Under dash panel, left of steering column', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Outstanding mechanical sealing environments.' },
  
  // Sedans
  { name: 'Honda Accord', country: 'Japan (Canadian Spec)', protocol: 'CAN ISO-15765', obdLocation: 'Under steering column, easily accessible', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Standardized OBD-II protocol. Perfect passive read performance.' },
  { name: 'Toyota Camry', country: 'Japan (All-Weather)', protocol: 'CAN ISO-15765', obdLocation: 'Driver knee panel block', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Symmetric communication bus. Minimal signal delays.' },
  { name: 'Hyundai Elantra', country: 'South Korea (Cold-Tuned)', protocol: 'CAN ISO-15765', obdLocation: 'Lower instrument panel left corner', voltageStability: 'Robust', compatibilityStatus: 'Evaluation Recommended', notes: 'Robust high-speed CAN networks present.' },
  { name: 'Mazda3', country: 'Japan (All-Weather)', protocol: 'CAN ISO-15765', obdLocation: 'Beneath steering column', voltageStability: 'Robust', compatibilityStatus: 'Highly Aligned', notes: 'Clean high-status cockpit environment layout.' }
];

// OBD-II Interactive Sensor Simulation Data
const OBD_SENSORS: OBDSensor[] = [
  { id: 'rpm', name: 'Engine Speed', parameterCode: '01 0C', unit: 'RPM', normalRange: '700 - 3,500', currentValue: 1850, signalHex: '41 0C 1C E8', educationalInfo: 'Mode 01 PID 0C returns engine rotation. Astrateq Gadgets uses local speed cycles to dynamically evaluate engine load state.' },
  { id: 'speed', name: 'Vehicle Velocity', parameterCode: '01 0D', unit: 'km/h', normalRange: '0 - 120', currentValue: 92, signalHex: '41 0D 5C', educationalInfo: 'Mode 01 PID 0D. Pure vehicle speed data sourced directly from wheel rotation sensors, free from GPS multipath loss in tall Canadian forests.' },
  { id: 'coolant', name: 'Engine Temp', parameterCode: '01 05', unit: '°C', normalRange: '80 - 105', currentValue: 88, signalHex: '41 05 80', educationalInfo: 'Mode 01 PID 05. Crucial for thermal health. Used by edge computing systems to predict winter battery optimization cycles.' },
  { id: 'throttle', name: 'Throttle Input', parameterCode: '01 11', unit: '%', normalRange: '0 - 100', currentValue: 42, signalHex: '41 11 6B', educationalInfo: 'Mode 01 PID 11 returns the throttle pedal position index. Sourced to map driver intent against passive outward camera feedback.' }
];

// Rich Premium Takeaways List matching Section 1
const KEY_TAKEAWAYS = [
  {
    title: "On-Board Diagnostics Health",
    desc: "Most modern vehicles include diagnostic systems that help owners understand vehicle health.",
    icon: Gauge,
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    title: "Standardized OBD-II Port",
    desc: "OBD-II is the standardized access point many vehicles use for diagnostics.",
    icon: Layers,
    color: "from-blue-500/20 to-indigo-500/10",
  },
  {
    title: "Vehicle Signal Ecosystem",
    desc: "Vehicle data can include diagnostic, performance, and usage-related signals.",
    icon: Network,
    color: "from-purple-500/20 to-cyan-500/10",
  },
  {
    title: "Decentralized Edge Processing",
    desc: "Local processing can reduce dependency on cloud connectivity.",
    icon: Cpu,
    color: "from-cyan-500/20 to-purple-500/10",
  },
  {
    title: "Informed Technology Integration",
    desc: "Drivers should understand privacy, ownership, and subscription tradeoffs before adopting connected vehicle technology.",
    icon: Lock,
    color: "from-indigo-500/20 to-blue-500/10",
  }
];

// Rich Premium Audiences List matching Section 2 Requirements
const AUDIENCES = [
  {
    id: "audience-suv",
    title: "Family SUV Owners",
    desc: "Ensure complete cabin safety, child locks, climate status, and engine speed indicators remain privately processed during domestic commutes in Canadian suburbs.",
    icon: Car,
  },
  {
    id: "audience-truck",
    title: "Pickup Truck Owners",
    desc: "Evaluate 12V voltage stability and high-current electrical load draws to secure passive auxiliary units without draining battery reserves in freezing workloads.",
    icon: Server,
  },
  {
    id: "audience-commuter",
    title: "Daily Commuters",
    desc: "Access localized metrics of engine health and real-time fuel temperature patterns quietly during long, high-traffic city gridlock drives across Canadian centers.",
    icon: Gauge,
  },
  {
    id: "audience-longdistance",
    title: "Long-Distance Drivers",
    desc: "Guarantee continuous operations entirely offline across expansive secondary provincial highways and national parks without needing expensive regional carrier coverage.",
    icon: Wifi,
  },
  {
    id: "audience-privacy",
    title: "Privacy-Conscious Drivers",
    desc: "Keep spatial tracking sequences, speed patterns, driving diaries, and trip statistics contained to local hardware under secure personal control.",
    icon: Shield,
  },
  {
    id: "audience-enthusiast",
    title: "Technology Enthusiasts",
    desc: "Direct access to passive, read-only engine CAN bus frames and parameters to explore automotive network layouts without code-signing or central vendor authorizations.",
    icon: Cpu,
  },
  {
    id: "audience-exploring",
    title: "Drivers Exploring Vehicle Intelligence",
    desc: "Learn how non-invasive diagnostics feed auxiliary dashboards to streamline safety awareness and passenger control.",
    icon: Sparkles,
  }
];

// Detailed compliance-correct FAQs matching Section 5
const FAQS = [
  {
    q: "What is OBD-II?",
    a: "OBD-II stands for On-Board Diagnostics, second generation. It is a standardized physical port and communication protocol that allows external accessories to read operational parameters from your vehicle’s internal computer networks."
  },
  {
    q: "Does every vehicle have an OBD-II port?",
    a: "Almost all gasoline, diesel, and hybrid passenger vehicles manufactured for North America since 1996 are legally mandated to feature a standardized OBD-II port. Electric vehicles also feature a diagnostic connection, though structural signaling may vary."
  },
  {
    q: "What is vehicle telemetry?",
    a: "Vehicle telemetry refers to the automated, real-time sensing, recording, and transmission of operational data from various onboard systems, such as velocity, throttle percentage, braking force, or diagnostic trouble signals."
  },
  {
    q: "Can vehicle diagnostics reveal personal information?",
    a: "Raw system parameters such as RPM or coolant heat do not contain personal identifiers. However, if combined with continuous global positioning coordinates or cabin voice recordings and transmitted to the cloud, they can map detailed habits."
  },
  {
    q: "Why do some vehicle products use cloud processing?",
    a: "Many products rely on cloud servers because of limited processing power on the device itself or because the vendor acts as an intermediary, collecting user diagnostics to commercialize driver profile databases."
  },
  {
    q: "What is local edge processing?",
    a: "Local edge processing represents a computing architecture where complex algorithms and data analyses are executed entirely on hardware located inside the cabin, with no necessity to transfer raw logs to remote external servers."
  },
  {
    q: "Can vehicle intelligence tools work without subscriptions?",
    a: "Yes. Tools designed with an offline, local-first computing environment operate independently. By excluding centralized cloud servers, they eliminate the maintenance overhead that forces vendors to install subscription paywalls."
  },
  {
    q: "Why does compatibility vary by vehicle?",
    a: "While OBD-II is standardized, different auto brands deploy distinct electronic architectures, baud-rates, physical dashboard clearance angles, or custom security gateways that impact connection."
  },
  {
    q: "Is this guide a guarantee that my vehicle will work with Astrateq?",
    a: "No. This guide is educational and does not guarantee product compatibility. Specific electrical architectures, regional cold-weather configurations, or aftermarket modifications can affect final installation success."
  },
  {
    q: "How do I check my vehicle compatibility?",
    a: "Review your year, make, and model parameters against our interactive checklist, verify your physical OBD-II port location, and consult technical vehicle manuals for security gateway barriers."
  }
];

// Art direction concepts matching Section 8 section requirements
const IMAGES_ART_DIRECTION = [
  {
    title: "Canadian Winter Highway at Dusk",
    desc: "Perspective look from driver viewport showing a snow-dusted, tree-lined northern road winding into twilight, framed under clear eye-safe dashboard accents with soft, low-contrast illumination.",
    focusLength: "35mm Cine-Prime",
    aspect: "Cold Ambient Palette"
  },
  {
    title: "Premium Family SUV Interior",
    desc: "Clean perspective from the center console towards the passenger instrument pane, focusing on high-end wood trim details, clean fabric seats, and spacious cabin ergonomics illuminated by eye-safe twilight.",
    focusLength: "50mm Portrait-Prime",
    aspect: "High-Contrast Wood/Onyx"
  },
  {
    title: "OBD-II Port Close-Up",
    desc: "Detailed close-quarters shot under a lower steering column shroud showing the native 16-pin interface socket, cleanly lit to showcase solid brass pins and stable grounding wires.",
    focusLength: "90mm Macro-Lens",
    aspect: "Engineering Detail"
  },
  {
    title: "Dashcam Mounted Cleanly Behind Rearview Mirror",
    desc: "S symmetric layout from interior looking upwards towards the windshield, showing a non-bulky, discrete diagnostic housing fitted cleanly flush against glass and tucked behind a high-end mirror system.",
    focusLength: "28mm Wide-Prime",
    aspect: "Ergonomic Flush Mount"
  },
  {
    title: "Driver Reviewing Vehicle Information on Tablet",
    desc: "Close-up over-the-shoulder view of a driver's hand holding a high-resolution dark slate digital readout, containing clean, tabular telemetry diagnostics, offline status flags, and local vehicle health guides.",
    focusLength: "40mm Editorial-Prime",
    aspect: "User Sovereignty Focus"
  },
  {
    title: "Luxury Vehicle Dashboard with Subtle Blue Interface",
    desc: "Minimalist perspective focusing on high-prestige driver displays showing a calm, non-flashy, dark slate interface displaying engine speed and warning logs in modern layout styling.",
    focusLength: "35mm Anamorphic",
    aspect: "Subdued Eye-safe Luminescence"
  }
];

export default function VehicleCompatibilityGuide() {
  // Navigation progress tracker
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Interactive Simulator States
  const [activeSensor, setActiveSensor] = useState<OBDSensor>(OBD_SENSORS[0]);
  const [customRpm, setCustomRpm] = useState<number>(1850);
  
  // Interactive Educational Requirements Checklist States
  const [checkedRequirements, setCheckedRequirements] = useState<{
    obd: boolean;
    year: boolean;
    electrical: boolean;
    safety: boolean;
    battery: boolean;
    history: boolean;
  }>({
    obd: true,
    year: true,
    electrical: true,
    safety: true,
    battery: false,
    history: false
  });
  
  // Interactive network map state
  const [activeNetworkNode, setActiveNetworkNode] = useState<string>('gateway');
  
  // Vehicle database search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Lead capture states
  const [leadName, setLeadName] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string>('');

  // Frequently Asked Questions index state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Active art direction card concept selection
  const [selectedArtDirectionIndex, setSelectedArtDirectionIndex] = useState<number>(0);

  // Floating notifications/toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth scroll helper
  const checklistRef = useRef<HTMLDivElement>(null);
  const leadSectionRef = useRef<HTMLDivElement>(null);

  // Conversion event logger placeholder
  const logAnalyticsEvent = (eventName: string, params?: Record<string, any>) => {
    console.log(`[ASTRATEQ ANALYTICS] Event: ${eventName}`, params || {});
  };

  // Update dynamic progress bar and log initial load tracking event
  useEffect(() => {
    logAnalyticsEvent('guide_page_view', { path: '/guides/vehicle-compatibility' });

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (docHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Handle live RPM sensor sliding adjustments
  const handleRpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setCustomRpm(val);
    
    // Recalculate the Hex payload dynamically based on standard OBD formula: A = RPM >> 8, B = RPM & 0xFF
    // Formula check: RPM = ((A * 256) + B) / 4. Therefore, combined 16-bit word = RPM * 4.
    const scaledWord = val * 4;
    const byteA = Math.floor(scaledWord / 256);
    const byteB = scaledWord % 256;
    
    const hexA = byteA.toString(16).toUpperCase().padStart(2, '0');
    const hexB = byteB.toString(16).toUpperCase().padStart(2, '0');
    
    if (activeSensor.id === 'rpm') {
      setActiveSensor(prev => ({
        ...prev,
        currentValue: val,
        signalHex: `41 0C ${hexA} ${hexB}`
      }));
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Utility Actions
  const handleCopyLink = () => {
    const canonicalURL = 'https://reports.astrateqgadgets.com/guides/vehicle-compatibility';
    logAnalyticsEvent('share_clicked', { method: 'copy_link' });
    navigator.clipboard.writeText(canonicalURL)
      .then(() => showToast('Canonical link copied to clipboard!'))
      .catch(() => showToast('Failed to copy link automatically.'));
  };

  const handlePrint = () => {
    logAnalyticsEvent('pdf_download_clicked', { trigger: 'print_menu' });
    showToast('PDF version coming soon. Join the email list to receive it when available.');
  };

  const handleShare = () => {
    const canonicalURL = 'https://reports.astrateqgadgets.com/guides/vehicle-compatibility';
    logAnalyticsEvent('share_clicked', { method: 'native_share' });
    if (navigator.share) {
      navigator.share({
        title: 'Digital Vehicle Compatibility & Safety Guide',
        text: 'Learn how modern vehicles communicate and check compatibility with privacy-first edge intelligence hardware.',
        url: canonicalURL,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsSubmitting(true);
    logAnalyticsEvent('toolkit_email_submit', { email: leadEmail, first_name: leadName });

    // Dynamic professional messaging for Canadian driver
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmitSuccessMsg(
        `Thank you, ${leadName}! A high-resolution PDF copy of the "Vehicle Compatibility & Safety Guide" and a secure validation link for your reservation have been queued to send to ${leadEmail}.`
      );
      showToast('Guide requested successfully!');
    }, 1200);
  };

  const filteredVehicles = VEHICLE_DATABASE.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.notes.toLowerCase().includes(searchQuery.toLowerCase()) || 
    vehicle.protocol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFaqToggle = (index: number) => {
    const isOpening = openFaqIndex !== index;
    setOpenFaqIndex(isOpening ? index : null);
    if (isOpening) {
      logAnalyticsEvent('faq_opened', { index, question: FAQS[index].q });
    }
  };

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="guide-layout" className="relative min-h-screen bg-brand-midnight text-brand-silver font-sans selection:bg-brand-cyan/30 selection:text-white overflow-hidden pb-24">
      {/* Dynamic top reading indicator */}
      <div 
        id="reading-progress-bar" 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-brand-cyan to-blue-500 z-50 transition-all duration-100 ease-out" 
        style={{ width: `${readingProgress}%` }}
      />

      {/* Glossy Overlay Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            id="toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-brand-space/95 border border-brand-cyan/40 px-6 py-3 rounded-full text-white font-medium text-sm flex items-center gap-2 shadow-2xl shadow-brand-cyan/10 z-50 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-brand-cyan animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glows simulating aurora borealis */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-1/3 w-[550px] h-[550px] bg-brand-cyan/3 rounded-full blur-[160px] pointer-events-none" />

      {/* FLOATING UTILITY HEADER FOR ACTIONS */}
      <header id="guide-header" className="sticky top-0 bg-brand-midnight/80 backdrop-blur-lg border-b border-white/5 py-4 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              id="astrateq-brand-logo-img"
              src="https://i.imgur.com/jBfhJCL.png" 
              alt="Astrateq Gadgets Logo" 
              className="h-9 w-auto object-contain select-none transition-transform hover:scale-105 duration-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-white font-display font-medium text-base tracking-wide flex items-center gap-1">
                Astrateq <span className="text-brand-cyan font-semibold">Gadgets</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest block uppercase">Safety & Tech Pubs</span>
            </div>
          </div>

          {/* Quick interactive utility action block */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              id="btn-copy-link"
              onClick={handleCopyLink} 
              className="p-2 md:px-3 md:py-1.5 rounded-lg bg-white/5 hover:bg-brand-cyan/15 hover:text-white text-gray-300 border border-white/5 transition-all text-xs flex items-center gap-2"
              title="Copy Guide Link"
            >
              <LinkIcon className="h-3.5 w-3.5 text-brand-cyan" />
              <span className="hidden md:inline font-medium">Copy Link</span>
            </button>
            <button 
              id="btn-print-guide"
              onClick={handlePrint} 
              className="p-2 md:px-3 md:py-1.5 rounded-lg bg-white/5 hover:bg-brand-cyan/15 hover:text-white text-gray-300 border border-white/5 transition-all text-xs flex items-center gap-2"
              title="Print / Save PDF"
            >
              <Printer className="h-3.5 w-3.5 text-brand-cyan" />
              <span className="hidden md:inline font-medium">Print Guide</span>
            </button>
            <button 
              id="btn-share-guide"
              onClick={handleShare} 
              className="p-2 md:px-3 md:py-1.5 rounded-lg bg-white/5 hover:bg-brand-cyan/15 hover:text-white text-gray-300 border border-white/5 transition-all text-xs flex items-center gap-2"
              title="Share Guide"
            >
              <Share2 className="h-3.5 w-3.5 text-brand-cyan" />
              <span className="hidden md:inline font-medium">Share</span>
            </button>
            <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />
            <a 
              id="header-nav-compat"
              href="#compatibility-calculator" 
              onClick={(e) => { e.preventDefault(); scrollToSection(checklistRef); }}
              className="px-4 py-2 rounded-lg bg-brand-cyan text-brand-midnight font-medium hover:bg-white hover:shadow-cyan-glow transition-all text-xs hidden sm:block shadow-lg shadow-brand-cyan/20"
            >
              Check Compatibility
            </a>
          </div>
        </div>
      </header>

      {/* METICULOUS CANADIAN ROAD INDICATOR ACCENT */}
      <div id="canadian-alert-header" className="bg-brand-space/50 border-b border-brand-cyan/10 py-2 text-center text-[11px] text-gray-300 tracking-wider font-mono">
        🍁 DOCUMENT ISSUE DIRECTIVE: <span className="text-white hover:text-brand-cyan cursor-help underline transition">CAN-ELEC-2026-REV3</span> • FOR CANADIAN DRIVING CONDITIONS & PROVINCIAL COLD-WEATHER REGULATION
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16">

        {/* SECTION 1: HERO */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-brand-cyan text-xs font-mono tracking-wider">
              <Layers className="h-3 w-3" />
              <span>VEHICLE ARCHITECTURE REPORT</span>
            </div>
            
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-tight tracking-tight">
              Digital Vehicle Compatibility <br />
              <span className="bg-gradient-to-r from-brand-cyan via-blue-200 to-white bg-clip-text text-transparent">
                &amp; Safety Guide
              </span>
            </h1>
            
            <p id="hero-subtitle" className="text-lg md:text-xl text-brand-cyan font-display tracking-wide font-light max-w-2xl">
              The Canadian Driver's Guide to Privacy-First Vehicle Intelligence
            </p>
            
            <p id="hero-description" className="text-base text-gray-300 leading-relaxed max-w-xl">
              Learn how modern vehicles communicate externally, what structural hardware factors dictate compatibility, and why locally processed edge computing is essential to preserve driver privacy across the vast road systems of Canada.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                id="btn-hero-print"
                onClick={handlePrint}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-brand-cyan text-brand-midnight font-medium flex items-center gap-2.5 transition-all shadow-xl shadow-white/5 active:scale-95 cursor-pointer"
              >
                <Download className="h-4.5 w-4.5" />
                <span>Download PDF Version</span>
              </button>
              
              <button 
                id="btn-hero-calc-scroll"
                onClick={() => scrollToSection(checklistRef)}
                className="px-6 py-3.5 rounded-xl bg-brand-space hover:bg-white/10 text-white font-medium border border-white/10 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>Check Vehicle Compatibility</span>
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-cyan" />
                <span>No Tool Installation Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-brand-cyan" />
                <span>12-Minute Complete Technical Read</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-blue-500/20 rounded-2xl blur-xl filter -z-10" />
            <div className="rounded-2xl border border-white/10 bg-brand-space/50 p-3 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-3 right-3 bg-brand-midnight/80 border border-brand-cyan/30 px-3 py-1 rounded font-mono text-[9px] text-brand-cyan uppercase tracking-widest">
                Preview Asset: Dashboard Rendering
              </div>
              
              {/* Premium Hero Visual */}
              <img 
                id="hero-dashboard-image"
                src="/src/assets/images/luxury_suv_dashboard_1780682000691.png" 
                alt="Luxury SUV cockpit looking out at Canadian wilderness with high tech telemetry gauge hud" 
                className="w-full h-auto aspect-video object-cover rounded-xl border border-white/5 shadow-inner"
                referrerPolicy="no-referrer"
              />
              
              <div className="p-4 space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs text-brand-cyan font-mono">
                  <span>ASTRATEQ GADGETS IN-CABIN HUD MOCKUP</span>
                  <span className="animate-pulse">● ACTIVE TELEMETRY FEED</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Refined local vision processing algorithms designed to match high-prestige interiors (Volvo, Porsche, Tesla) while keeping operational compute completely offline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KEY TAKEAWAYS (EXECUTIVE SUMMARY) */}
        <section id="executive-summary" className="mb-24">
          <div className="border border-brand-cyan/35 bg-brand-space/45 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.15)]">
            <div className="absolute top-0 right-0 h-64 w-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-cyan/20 to-brand-cyan/5 border border-brand-cyan/30 px-3 py-1 rounded-full text-brand-cyan text-xs font-mono tracking-wider uppercase">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span>PREMIUM ARCHITECTURE BRIEFING</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                    Key Takeaways
                  </h2>
                  <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                    A high-level physical summary of diagnostics, signals, processing constraints, and driver autonomy. Handcrafted to meet the aesthetic and engineering standards of elite cockpits.
                  </p>
                </div>
                
                {/* Prestige compatibility badge */}
                <div className="flex flex-col items-start md:items-end gap-1.5 p-4 rounded-xl bg-brand-midnight/60 border border-brand-cyan/30 self-start md:self-center font-mono">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">SYSTEM INSPIRATION &amp; OVERLAY</span>
                  <div className="flex flex-wrap gap-2 text-[10px] text-brand-cyan font-semibold">
                    <span>TESLA</span>•<span>APPLE</span>•<span>SAMSUNG</span>•<span>RIVIAN</span>•<span>PORSCHE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {KEY_TAKEAWAYS.map((takeaway, i) => {
                  const IconComponent = takeaway.icon;
                  return (
                    <div 
                      key={i} 
                      className="group p-6 rounded-2xl bg-brand-space/60 border border-brand-cyan/40 shadow-[0_0_15px_-4px_rgba(0,212,255,0.22)] hover:border-brand-cyan hover:shadow-[0_0_22px_rgba(0,212,255,0.45)] transition-all duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${takeaway.color} w-fit group-hover:scale-105 transition-transform duration-300 border border-white/5`}>
                          <IconComponent className="h-5 w-5 text-brand-cyan" />
                        </div>
                        <h3 className="text-sm font-medium text-white group-hover:text-brand-cyan transition-colors">
                          {takeaway.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-white/5 group-hover:border-brand-cyan/20 transition-colors">
                        {takeaway.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS GUIDE IS FOR SECTION */}
        <section id="section-who-it-is-for" className="mb-24">
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">SECTION 1.5 // AUDIENCE CONFIGURATIONS</div>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                Who This Guide Is For
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
                Discover how modern diagnostic telemetry targets your specific driver profile, vehicle class, and personal data rules. Inspired by high-fidelity user experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {AUDIENCES.map((audience) => {
                const IconComp = audience.icon;
                return (
                  <div 
                    key={audience.id}
                    className="p-5 rounded-2xl bg-brand-space/60 border border-brand-cyan/35 shadow-[0_0_12px_-4px_rgba(0,212,255,0.18)] hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.45)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 lg:col-span-1"
                  >
                    <div className="space-y-3">
                      <div className="p-2.5 rounded-lg bg-brand-midnight border border-brand-cyan/20 w-fit">
                        <IconComp className="h-4 w-4 text-brand-cyan" />
                      </div>
                      <h3 className="text-sm font-medium text-white tracking-tight">
                        {audience.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pt-1 border-t border-white/5">
                      {audience.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOUNDER PHILOSOPHY SECTION */}
        <section id="section-founder-philosophy" className="mb-24 border-t border-b border-brand-cyan/15 py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            
            <div className="lg:col-span-4 flex justify-center">
               {/* Clean elegant portrait placeholder card with custom design cues inspired by Apple's executive page */}
              <div className="w-full max-w-[280px] aspect-[3/4] rounded-2xl bg-brand-space border border-brand-cyan/40 shadow-[0_0_20px_rgba(0,212,255,0.2)] flex flex-col items-center justify-center p-6 relative overflow-hidden group hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/10 via-transparent to-brand-cyan/5 pointer-events-none" />
                
                {/* Glowing ring */}
                <div className="h-20 w-20 rounded-full bg-brand-midnight border border-brand-cyan/35 flex items-center justify-center mb-6 transition-transform group-hover:scale-105 duration-350 shadow-[0_0_15px_rgba(0,212,255,0.25)] relative">
                  <div className="absolute inset-0.5 rounded-full border border-dashed border-brand-cyan/40 animate-[spin_40s_linear_infinite]" />
                  <span className="text-brand-cyan font-mono text-2xl font-bold tracking-wider relative z-10">AQ</span>
                </div>
                
                <div className="text-center space-y-2 relative z-10">
                  <div className="inline-block text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">FOUNDER INITIATIVE</div>
                  <h4 className="text-white font-display font-medium text-sm">Arthur Algonquin</h4>
                  <p className="text-[10px] text-gray-400 font-mono tracking-wide uppercase leading-normal">Engineering Lead &amp; Principal Architect</p>
                  <p className="text-[10.5px] text-gray-500 italic px-2 leading-relaxed pt-2 group-hover:text-gray-300 transition-colors">"Sovereignty over the vehicle dashboard is the final frontier of driver autonomy."</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 text-left">
              <span className="text-[11px] font-mono text-brand-cyan tracking-widest uppercase block bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20 w-fit">FOUNDER PHILOSOPHY</span>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                Why Astrateq Gadgets Exists
              </h2>
              
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-sans max-w-2xl">
                <p>
                  Modern vehicles generate more information than ever before. Yet drivers have little visibility into how this data is harvested, analyzed, and commercialized.
                </p>
                <p>
                  We believe your cockpit should reflect the digital elegance and raw power of elite computer hardware, without the privacy compromises of legacy vehicle telemetry servers.
                </p>
                <div className="p-6 bg-brand-space/45 border-l-2 border-brand-cyan rounded-r-xl my-4 text-white font-medium italic shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                  "Drivers should understand their vehicle technology and make informed decisions about privacy, safety, and connectivity."
                </div>
                <p>
                  Astrateq Gadgets was created to bridge this divide. Designed specifically for the high demands of Canadian travel and winter climate extremes, our products deliver real, offline diagnostic sovereignty.
                </p>
              </div>

              <div className="pt-2 text-xs font-mono text-gray-500 flex items-center gap-2">
                <span>ASTRATEQ GADGETS ENGINEERING MANIFESTO</span>
                <span>•</span>
                <span className="text-brand-cyan">SEPTEMBER 2026 // EDITION V3</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: TODAY'S VEHICLES ARE COMPUTERS */}
        <section id="section-vehicles-evolved" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">SECTION 02 // HARDWARE TELEMETRY</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              The Modern Vehicle Has Evolved
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              A contemporary automobile is no longer a purely mechanical assembly. It represents a complex distributed system containing up to a hundred microcontrollers operating in absolute synchronicity. Sourcing signal data directly is how elite automotive software builds real intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {[
                {
                  title: "Electronic Control Units (ECUs)",
                  desc: "Individual specialized computers dedicated to specific task parameters. From throttle mapping parameters to active wheel torque balance, ECUs continuously record systemic activity."
                },
                {
                  title: "High-Speed CAN Bus Systems",
                  desc: "The central communication highway of vehicles. Developed by Bosch, this robust automotive network lets diverse ECUs relay telemetry packets concurrently at up to 1 Mbit/s without interference."
                },
                {
                  title: "Diagnostic Communication Channels",
                  desc: "Standard diagnostics rely on querying these buses. Intelligently listening to these messages safely exposes physical sensor telemetry like brake pressure, battery heat, and vehicle wheel slippage."
                }
              ].map((item, index) => (
                <div key={index} className="p-5 rounded-xl bg-brand-space/50 border border-brand-cyan/30 shadow-[0_0_12px_-4px_rgba(0,212,255,0.15)] hover:border-brand-cyan hover:shadow-[0_0_18px_rgba(0,212,255,0.4)] transition-all duration-300 group">
                  <div className="flex gap-4">
                    <div className="h-9 w-9 rounded-lg bg-brand-midnight border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 group-hover:bg-brand-cyan group-hover:text-brand-midnight transition-all duration-300">
                      <span className="font-mono text-xs font-bold">0{index + 1}</span>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-white font-medium font-display text-base tracking-wide group-hover:text-brand-cyan transition-colors">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7 bg-brand-space/45 border border-brand-cyan/25 shadow-[0_0_20px_rgba(0,212,255,0.12)] rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Network className="h-4.5 w-4.5 text-brand-cyan" />
                    <h3 className="text-base font-display font-medium text-white tracking-tight">
                      Automotive Area Network (CAN Map)
                    </h3>
                  </div>
                  <span className="bg-brand-cyan/15 border border-brand-cyan/30 px-2.5 py-0.5 rounded text-[8px] font-mono text-brand-cyan uppercase tracking-widest font-bold">
                    SYSTEM SCHEMATIC REVISION V3.1
                  </span>
                </div>
                
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  Interconnections mapping out how physical sensor intelligence translates from powertrain modules directly into safety-critical driver displays and outer sensors.
                </p>

                {/* Integrated Network Flow Diagram */}
                <div className="mb-6 rounded-xl overflow-hidden border border-brand-cyan/20 bg-brand-midnight/45 p-1 hover:border-brand-cyan transition-all duration-300 shadow-[0_0_15px_-4px_rgba(0,212,255,0.15)]">
                  <img 
                    id="schematic-network-image"
                    src="/src/assets/images/vehicle_network_schematic_1780682014029.png" 
                    alt="High tech CAN Bus vehicle network architecture diagram with glowing nodes" 
                    className="w-full h-auto aspect-video object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Interactive Network Node Explainer */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'gateway', label: 'OBD-II Security Gateway', color: 'border-brand-cyan text-brand-cyan' },
                    { id: 'pcm', label: 'Powertrain ECU (PCM)', color: 'border-blue-400 text-blue-400' },
                    { id: 'bcm', label: 'Body Control Module (BCM)', color: 'border-emerald-400 text-emerald-400' },
                    { id: 'edge', label: 'Local Edge Compute Hub', color: 'border-purple-400 text-purple-400' }
                  ].map(node => (
                    <button
                      key={node.id}
                      onClick={() => setActiveNetworkNode(node.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        activeNetworkNode === node.id 
                          ? `${node.color} bg-brand-cyan/5 font-semibold` 
                          : 'border-white/10 text-gray-400 hover:text-white hover:border-white/25 bg-transparent'
                      }`}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-brand-midnight/60 border border-brand-cyan/10">
                  <AnimatePresence mode="wait">
                    {activeNetworkNode === 'gateway' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-1.5 text-xs text-gray-300"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[10px] tracking-wider text-brand-cyan">
                          <Lock className="h-3.5 w-3.5" /> Security Gateway Layer
                        </div>
                        <p className="leading-relaxed">
                          Serves as physical connector boundary. Traditional telematics push your OBD packets continuously to AWS databases. Astrateq Gadgets designs its architecture strictly to passively intercept logs locally without injection, completely avoiding cloud security breaches.
                        </p>
                      </motion.div>
                    )}
                    {activeNetworkNode === 'pcm' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-1.5 text-xs text-gray-300"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[10px] tracking-wider text-blue-400">
                          <Cpu className="h-3.5 w-3.5" /> Powertrain Control Module (PCM)
                        </div>
                        <p className="leading-relaxed">
                          Regulates core ignition state, crankshaft rotations, fuel mass flow, dynamic timing, and radiator fans. Sourcing direct timing readings ensures sub-millisecond precision for safety awareness applications without GPS delays.
                        </p>
                      </motion.div>
                    )}
                    {activeNetworkNode === 'bcm' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-1.5 text-xs text-gray-300"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[10px] tracking-wider text-emerald-400">
                          <Layers className="h-3.5 w-3.5" /> Body Control Module (BCM)
                        </div>
                        <p className="leading-relaxed">
                          Regulates window climate controls, door interlocks, headlights, turn signals, wiper sensors, and interior dials. Capturing high-wiper velocity cycles equips the safety model to gauge physical atmospheric intensity locally.
                        </p>
                      </motion.div>
                    )}
                    {activeNetworkNode === 'edge' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-1.5 text-xs text-gray-300"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[10px] tracking-wider text-purple-400">
                          <Sparkles className="h-3.5 w-3.5" /> Local Edge Computing Target
                        </div>
                        <p className="leading-relaxed">
                          The computing philosophy championed by Astrateq Gadgets. Rather than uploading high-definition cabin telemetry to distant web-servers, complex automotive analytics compile locally on dedicated edge hardware inside the cabin.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: UNDERSTANDING OBD-II */}
        <section id="section-understanding-obd" className="mb-24 bg-brand-space/45 border border-brand-cyan/25 shadow-[0_0_20px_rgba(0,212,255,0.12)] rounded-3xl p-8 lg:p-12 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-40 w-40 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">SECTION 03 // VEHICLE PROTOCOLS</div>
              <h2 className="text-3xl font-display font-medium text-white tracking-tight leading-tight">
                The Language Your Vehicle Already Speaks
              </h2>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Mandated in North America since 1996, the <strong>OBD-II (On-Board Diagnostics)</strong> port is far more than a mechanism to clear check engine lights. It is a highly regulated, standardized pipeline providing high-density real-time operating metrics. Tested alongside premium electric workloads.
              </p>

              <div className="space-y-4 text-xs text-gray-400">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-gray-200">Global Standardization:</strong> Sourcing high-fidelity sensor protocols is highly stable regardless of vehicle manufacture.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-gray-200">Passive Listening Safety:</strong> Operates strictly via non-interfering diagnostic queries, eliminating mechanical feedback loop failures.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-gray-200">Physical Ergonomics:</strong> Positioned within arm’s reach of the driving seat, facilitating discrete hardware integration without vehicle restructuring.
                  </p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE OBD-II LIVE HEX DECODER PANEL */}
            <div className="lg:col-span-6">
              <div className="bg-brand-space border border-brand-cyan/40 rounded-2xl p-6 shadow-2xl relative shadow-brand-cyan/10">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-brand-cyan" />
                    <div>
                      <h4 className="text-white text-xs font-mono font-medium uppercase tracking-wider">OBD-II Hexadecimal Decoder</h4>
                      <p className="text-[10px] text-gray-400 font-mono">LIVE PASSIVE SNIFFER SIMULATION</p>
                    </div>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  Select a standard diagnostic telemetry parameter below to watch how vehicle computers packetize and broadcast hexadecimal values via the diagnostic interface.
                </p>

                {/* Sensor Selector Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {OBD_SENSORS.map(sensor => (
                    <button
                      key={sensor.id}
                      onClick={() => {
                        setActiveSensor(sensor);
                        if (sensor.id === 'rpm') setCustomRpm(1850);
                      }}
                      className={`p-3 rounded-xl text-left border text-xs font-mono transition-all relative cursor-pointer ${
                        activeSensor.id === sensor.id 
                          ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_12px_rgba(0,212,255,0.15)]' 
                          : 'border-white/5 bg-brand-midnight/45 text-gray-400 hover:text-white hover:border-white/15'
                      }`}
                    >
                      <div className="text-[10px] text-gray-500 font-sans">PID {sensor.parameterCode}</div>
                      <div className="font-semibold">{sensor.name}</div>
                      {activeSensor.id === sensor.id && (
                        <div className="absolute top-3.5 right-3 h-2 w-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#00d4ff]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Visual Dashboard Rendering of Active Metric */}
                <div className="rounded-xl bg-brand-midnight/80 p-5 border border-brand-cyan/20 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">TELEMETRY DECODING MATRIX</span>
                    <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/25 rounded">STANDARD MODE 01</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Gauge Visual */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center py-2">
                      <div className="relative h-26 w-26 rounded-full border-4 border-dashed border-brand-cyan/30 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                        <div className="absolute inset-2.5 rounded-full border border-brand-cyan/20 flex flex-col items-center justify-center bg-brand-space/75">
                          <span className="text-white font-mono text-xl font-bold tracking-tight">
                            {activeSensor.id === 'rpm' ? customRpm : activeSensor.currentValue}
                          </span>
                          <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-wider">{activeSensor.unit}</span>
                        </div>
                        {/* Needle Accent */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-brand-cyan origin-bottom rotate-[-30deg]" />
                      </div>
                    </div>

                    {/* Bit breakdown */}
                    <div className="md:col-span-7 space-y-3">
                      <div>
                        <div className="text-[10px] text-gray-500 font-mono">TRANSMITTED FRAME HEXADECIMAL LOG</div>
                        <div className="font-mono text-brand-cyan font-bold tracking-widest text-base select-all bg-black/40 p-2.5 rounded-lg border border-brand-cyan/20 mt-1 shadow-inner">
                          {activeSensor.signalHex}
                        </div>
                      </div>

                      <div className="text-[11px] space-y-1">
                        <div>
                          <span className="text-gray-500 font-mono">Response Prefix:</span> <strong className="text-gray-300 font-mono">41 {activeSensor.parameterCode.split(' ')[1]}</strong> <span className="text-gray-500 font-sans">(Diagnostic Frame Output)</span>
                        </div>
                        <div>
                          <span className="text-gray-500 font-mono">Data Byte:</span> 
                          {activeSensor.id === 'rpm' ? (
                            <strong className="text-white font-mono">
                              {' '}
                              {(activeSensor.signalHex.split(' ')[2] || '')} • {(activeSensor.signalHex.split(' ')[3] || '')}
                            </strong>
                          ) : (
                            <strong className="text-white font-mono"> {(activeSensor.signalHex.split(' ')[2] || '')}</strong>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeSensor.id === 'rpm' && (
                    <div className="space-y-1 bg-brand-space/60 p-3.5 rounded-xl font-mono text-[11px] text-gray-300 border border-brand-cyan/15">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>DYNAMIC SLIDER OPTION</span>
                        <span>RPM TARGET: {customRpm}</span>
                      </div>
                      <input 
                        type="range" 
                        min="700" 
                        max="3500" 
                        value={customRpm} 
                        onChange={handleRpmChange}
                        className="w-full accent-brand-cyan bg-brand-midnight h-1.5 rounded cursor-pointer"
                      />
                      <div className="pt-2 text-[10.5px] text-gray-400">
                        <span className="text-brand-cyan">DECODING FORMULA:</span> ((ByteA * 256) + ByteB) / 4 <br />
                        Applying: (({activeSensor.signalHex.split(' ')[2]} * 256) + {activeSensor.signalHex.split(' ')[3]}) / 4 = <strong>{customRpm} RPM</strong>
                      </div>
                    </div>
                  )}

                  {activeSensor.id !== 'rpm' && (
                    <div className="bg-brand-space/60 p-3.5 rounded-xl text-[11px] text-gray-300 border border-brand-cyan/15 italic leading-relaxed">
                      💡 {activeSensor.educationalInfo}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: UNDERSTANDING VEHICLE DATA education */}
        <section id="section-understanding-vehicle-data" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">SECTION 03 // EDUCATION &amp; TELEMETRY</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Understanding Vehicle Data
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              An educational mapping of physical engine sensor telemetry, local area network transmission, and safety analytics. Discover how raw bits are translated to keep you informed.
            </p>
          </div>

          {/* Visual Flow Diagram with glowing glassmorphism borders */}
          <div className="bg-brand-space/45 border border-brand-cyan/25 shadow-[0_0_20px_rgba(0,212,255,0.12)] rounded-3xl p-6 md:p-8 mb-12 relative overflow-hidden backdrop-blur-xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-8 text-center md:text-left">
              Data Processing Pipeline
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center relative">
              {/* Flow step 1 */}
              <div className="p-5 rounded-xl bg-brand-midnight/60 border border-brand-cyan/20 shadow-md space-y-3 relative z-10 hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all duration-300">
                <div className="absolute top-3.5 right-3.5 text-[10px] font-mono text-gray-500">01</div>
                <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan">
                  <Car className="h-5 w-5" />
                </div>
                <h4 className="text-white font-medium text-sm font-display">Vehicle Sensors</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Analog systems like wheel speed, engine load, and brake pressure registries continuously measuring mechanical states.
                </p>
              </div>

              {/* Flow step 2 */}
              <div className="p-5 rounded-xl bg-brand-midnight/60 border border-blue-500/20 shadow-md space-y-3 relative z-10 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300">
                <div className="absolute top-3.5 right-3.5 text-[10px] font-mono text-gray-500">02</div>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                  <Network className="h-5 w-5" />
                </div>
                <h4 className="text-white font-medium text-sm font-display">Vehicle Network</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  High-speed CAN Bus channels transferring micro-second telemetry packets safely across internal ECU frameworks.
                </p>
              </div>

              {/* Flow step 3 */}
              <div className="p-5 rounded-xl bg-brand-midnight/60 border border-emerald-500/20 shadow-md space-y-3 relative z-10 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300">
                <div className="absolute top-3.5 right-3.5 text-[10px] font-mono text-gray-500">03</div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-white font-medium text-sm font-display">Diagnostic Systems</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  The standard OBD-II gatekeeper querying real-time system PID states offline safely via non-destructive modes.
                </p>
              </div>

              {/* Flow step 4 */}
              <div className="p-5 rounded-xl bg-brand-space/65 border border-brand-cyan/40 space-y-3 relative z-10 shadow-xl shadow-brand-cyan/15 hover:border-brand-cyan hover:shadow-[0_0_20px_rgba(0,212,255,0.45)] transition-all duration-300">
                <div className="absolute top-3.5 right-3.5 text-[10px] font-mono text-brand-cyan font-bold">04</div>
                <div className="h-10 w-10 rounded-lg bg-brand-cyan/20 border border-brand-cyan/35 flex items-center justify-center text-brand-cyan">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <h4 className="text-white font-medium text-sm font-display">Driver Insights</h4>
                <p className="text-[11px] text-brand-cyan leading-relaxed font-semibold">
                  Local, privacy-first edge intelligence translating raw bus signals into immediate safety assistance feedback.
                </p>
              </div>
            </div>

            {/* Connecting arrows designed for large screen layouts of the flow */}
            <div className="hidden lg:block absolute left-[22%] top-[45%] w-[6%] h-0.5 border-t-2 border-dashed border-white/10 z-0" />
            <div className="hidden lg:block absolute left-[47%] top-[45%] w-[6%] h-0.5 border-t-2 border-dashed border-white/10 z-0" />
            <div className="hidden lg:block absolute left-[72%] top-[45%] w-[6%] h-0.5 border-t-2 border-dashed border-brand-cyan/25 z-0" />
          </div>

          {/* Deep Educational Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 rounded-xl bg-brand-space/10 border border-white/5 space-y-4">
              <h4 className="text-white font-medium font-display text-base">What is OBD-II &amp; Telemetry?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                The <strong>On-Board Diagnostics (OBD-II)</strong> port is a physical 16-pin interface standardized during the mid-1990s. Its core purpose is to report standardized trouble codes and real-world system logs such as engine heat, velocity, and sensor state.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong>Vehicle Telemetry</strong> represents the automated transmission and processing of these logs. In Astrateq Gadgets' worldview, telemetry is designed to be acquired locally and used strictly for driver awareness rather than centralized analysis.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-space/10 border border-white/5 space-y-4">
              <h4 className="text-white font-medium font-display text-base">Diagnostics vs. Personal Data</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                It is vital to distinguish between functional diagnostics and sensitive personal parameters. Operational readings like wheel RPM or brake cylinder pressure contain no identifying profiles, yet serve as high-utility markers for ice-detection or deceleration assists.
              </p>
              <p className="text-xs text-brand-cyan leading-relaxed font-sans">
                Our educational standpoint keeps these two streams isolated. By securing physical parameters offline, the driver enjoys premium assistance overlays without exporting their trip paths, coordinates, voice files, or private identification details to the cloud.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: IS YOUR VEHICLE READY? */}
        <section id="compatibility-calculator" className="mb-24 scroll-mt-24" ref={checklistRef}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">SECTION 02 // TECHNICAL READINESS</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Is Your Vehicle Ready?
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Most modern vehicles already include the foundational systems required for intelligent diagnostics and safety monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive Requirements Checklist Card Group */}
            <div className="lg:col-span-7 bg-brand-space/45 border border-brand-cyan/20 shadow-[0_0_15px_rgba(0,212,255,0.08)] rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">
                    Interactive Educational Checklist
                  </h3>
                  <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 border border-brand-cyan/20 rounded">CLICK CARDS TO TOGGLE PARAMETERS</span>
                </div>
                
                <div id="interactive-checklist-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: OBD-II */}
                  <button
                    id="checkbox-obd"
                    onClick={() => setCheckedRequirements(prev => ({ ...prev, obd: !prev.obd }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                      checkedRequirements.obd 
                        ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]' 
                        : 'border-white/5 bg-brand-midnight/40 text-gray-500 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className="text-xs font-bold font-display text-white group-hover:text-brand-cyan">1. OBD-II Port Present</span>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        checkedRequirements.obd ? 'bg-brand-cyan border-brand-cyan text-brand-midnight' : 'border-white/20 bg-transparent'
                      }`}>
                        {checkedRequirements.obd && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-sans">
                      Provides a standard physical access point to read diagnostic signals without vehicle modifications, mandatory for passenger vehicles since 1996 in North America.
                    </p>
                  </button>

                  {/* Card 2: Year */}
                  <button
                    id="checkbox-year"
                    onClick={() => setCheckedRequirements(prev => ({ ...prev, year: !prev.year }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                      checkedRequirements.year 
                        ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]' 
                        : 'border-white/5 bg-brand-midnight/40 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className="text-xs font-bold font-display text-white">2. Model Year 2008+</span>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        checkedRequirements.year ? 'bg-brand-cyan border-brand-cyan text-brand-midnight' : 'border-white/20 bg-transparent'
                      }`}>
                        {checkedRequirements.year && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-sans">
                      Ensures the use of high-speed Controller Area Network (CAN Bus) protocols, which is critical for real-time sensor processing and diagnostic reliability.
                    </p>
                  </button>

                  {/* Card 3: Electrical */}
                  <button
                    id="checkbox-electrical"
                    onClick={() => setCheckedRequirements(prev => ({ ...prev, electrical: !prev.electrical }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                      checkedRequirements.electrical 
                        ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]' 
                        : 'border-white/5 bg-brand-midnight/40 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className="text-xs font-bold font-display text-white">3. Healthy Electrical System</span>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        checkedRequirements.electrical ? 'bg-brand-cyan border-brand-cyan text-brand-midnight' : 'border-white/20 bg-transparent'
                      }`}>
                        {checkedRequirements.electrical && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-sans">
                      A stable electrical environment prevents low-voltage computer dips during starting, providing a robust power foundation for passive computing overlays.
                    </p>
                  </button>

                  {/* Card 4: Safety */}
                  <button
                    id="checkbox-safety"
                    onClick={() => setCheckedRequirements(prev => ({ ...prev, safety: !prev.safety }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                      checkedRequirements.safety 
                        ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]' 
                        : 'border-white/5 bg-brand-midnight/40 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className="text-xs font-bold font-display text-white">4. Modern Safety Systems</span>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        checkedRequirements.safety ? 'bg-brand-cyan border-brand-cyan text-brand-midnight' : 'border-white/20 bg-transparent'
                      }`}>
                        {checkedRequirements.safety && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-sans">
                      Active sensor layers provide safety integration options for passive real-time vision analytics without altering stock safety operations.
                    </p>
                  </button>

                  {/* Card 5: Battery */}
                  <button
                    id="checkbox-battery"
                    onClick={() => setCheckedRequirements(prev => ({ ...prev, battery: !prev.battery }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                      checkedRequirements.battery 
                        ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]' 
                        : 'border-white/5 bg-brand-midnight/40 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className="text-xs font-bold font-display text-white">5. Stable Battery Performance</span>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        checkedRequirements.battery ? 'bg-brand-cyan border-brand-cyan text-brand-midnight' : 'border-white/20 bg-transparent'
                      }`}>
                        {checkedRequirements.battery && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-sans">
                      Permits intelligent passive standby monitoring during off-cycles with zero danger of drawing down the vehicle's electrical reserve.
                    </p>
                  </button>

                  {/* Card 6: History */}
                  <button
                    id="checkbox-history"
                    onClick={() => setCheckedRequirements(prev => ({ ...prev, history: !prev.history }))}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] ${
                      checkedRequirements.history 
                        ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]' 
                        : 'border-white/5 bg-brand-midnight/40 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <span className="text-xs font-bold font-display text-white">6. Maintenance History</span>
                      <div className={`h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        checkedRequirements.history ? 'bg-brand-cyan border-brand-cyan text-brand-midnight' : 'border-white/20 bg-transparent'
                      }`}>
                        {checkedRequirements.history && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-2 font-sans">
                      Ensures that the vehicle ECU registers and diagnostic lines are free of historical faults or pending power blockages.
                    </p>
                  </button>
                </div>
              </div>

              <div className="bg-brand-midnight/80 rounded-2xl p-4.5 border border-brand-cyan/20 flex gap-3.5 items-start mt-6 text-left">
                <Info className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Toggle the checklist above to understand the physical and networking conditions that allow edge vehicle intelligence to assess systems safely.
                </p>
              </div>
            </div>

            {/* Qualitative Assessment Panel Display with custom Orange Tangerine parameters */}
            <div className="lg:col-span-5 bg-gradient-to-b from-brand-space to-brand-midnight border border-[#FF6A00]/25 rounded-3xl p-8 flex flex-col justify-between text-left relative shadow-2xl shadow-[#FF6A00]/5 overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-6">
                <h3 className="text-xs text-[#FF6A00] uppercase tracking-widest font-mono bg-[#FF6A00]/10 border border-[#FF6A00]/20 px-3 py-1 rounded-full w-fit">TECHNICAL ALIGNMENT SUMMARY</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-gray-300">
                    <span>EVALUATION METRIC:</span>
                    <span className="text-white font-bold text-sm">
                      {Object.values(checkedRequirements).filter(Boolean).length} / 6 PARAMETERS
                    </span>
                  </div>
                  
                  {/* Tangerine active progress bar */}
                  <div className="h-2.5 w-full bg-brand-midnight rounded-full overflow-hidden border border-white/5 p-[1px]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF6A00] to-amber-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_#FF6A00]"
                      style={{ width: `${(Object.values(checkedRequirements).filter(Boolean).length / 6) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-brand-midnight/50 p-5 rounded-2xl border border-brand-cyan/15 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/5 pb-2">
                    <span className="text-gray-400">RESEARCH ALIGNMENT:</span>
                    {Object.values(checkedRequirements).filter(Boolean).length === 6 ? (
                      <span className="text-brand-cyan font-bold uppercase tracking-wider">Optimal Alignment</span>
                    ) : Object.values(checkedRequirements).filter(Boolean).length >= 4 ? (
                      <span className="text-blue-400 font-bold uppercase tracking-wider">Stable Research</span>
                    ) : (
                      <span className="text-[#FF6A00] font-bold uppercase tracking-wider">Custom Calibration</span>
                    )}
                  </div>

                  <p className="text-xs text-gray-250 leading-relaxed font-sans">
                    {Object.values(checkedRequirements).filter(Boolean).length === 6 && (
                      "Your checked parameters are fully aligned with raw CAN bus analysis. This baseline configuration supports seamless, high-speed telemetry research. Highly approved for pre-launch development pools."
                    )}
                    {Object.values(checkedRequirements).filter(Boolean).length >= 4 && Object.values(checkedRequirements).filter(Boolean).length < 6 && (
                      "Diagnostic environment is stable. Standard vehicles within this perimeter offer highly reliable electrical flow and CAN query responses. Some calibration guides will assist your setup."
                    )}
                    {Object.values(checkedRequirements).filter(Boolean).length < 4 && (
                      "A customized mechanical mounting setup or updated interface cabling will clear systemic blocks to establish secure diagnostic links."
                    )}
                  </p>
                </div>

                <div className="text-[10px] text-gray-400 leading-normal font-mono uppercase bg-brand-midnight/40 p-4 border border-white/5 rounded-xl">
                  ⚠️ NOTICE: These parameters are provided for educational assessment and compatibility research. Final vehicle integration depends on physical configurations, and Astrateq Gadgets does not provide compatibility guarantees, pre-approvals, or regulatory credentials.
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-6 space-y-3">
                <a 
                  id="btn-reserve-lead-scroll"
                  href="#lead-capture-section"
                  onClick={(e) => { e.preventDefault(); scrollToSection(leadSectionRef); }}
                  className="w-full py-4.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-amber-500 inline-flex items-center justify-center gap-2.5 text-white font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(255,106,0,0.5)] transition-all duration-300 active:scale-95 cursor-pointer text-center hover:brightness-110"
                >
                  <span>Request Full PDF Edition</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: CANADIAN DRIVING CHALLENGES */}
        <section id="section-canadiandriving" className="mb-24 py-16 px-8 bg-brand-space/45 border border-brand-cyan/25 shadow-[0_0_20px_rgba(0,212,255,0.12)] rounded-3xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 h-40 w-40 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-12 text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">SECTION 05 // CANADIAN WEATHER SYSTEMS</div>
              <h2 className="text-3xl font-display font-medium text-white tracking-tight">
                Built For Canadian Roads
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Driving across Canada introduces unprecedented environmental loads that traditional tech companies based in moderate climates fail to anticipate.
              </p>
            </div>

            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                {
                  icon: <ThermometerSnowflake className="h-6 w-6 text-brand-cyan" />,
                  title: "Winter & Sub-Zero Resilience",
                  desc: "When temperatures plunge to -40°C in the Prairies, windshield structures contract, traditional suction mounts fail, and battery voltages sag dramatically. Astrateq Gadgets designs military-grade temperature gaskets to withstand these thermal cycles.",
                  metric: "-40°C Peak Tolerance"
                },
                {
                  icon: <CloudRain className="h-6 w-6 text-blue-400" />,
                  title: "Precision Vision Under Heavy Precipitation",
                  desc: "Wet snow, black ice, salt spray, and blinding sleet cripple legacy optical sensors that rely on clear weather templates. Astrateq Gadgets' local vision processing is specifically calibrated to cross-reference real OBD wiper cycles against live visual cues.",
                  metric: "Canadian Road Calibration"
                },
                {
                  icon: <Wifi className="h-6 w-6 text-emerald-400 font-bold" />,
                  title: "Remote Highway Offline Continuity",
                  desc: "The Trans-Canada Highway features expanses of mountain passes and desolate forests with zero mobile cellular coverage. Cloud-connected hardware stops running. Locally compiled edge processing keeps security running offline forever.",
                  metric: "100% Offline Edge Autonomy"
                }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl bg-brand-midnight/50 border border-white/5 hover:border-brand-cyan/20 transition-all flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-display font-medium text-base tracking-wide">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">ENVIRONMENT SCORE:</span>
                    <span className="text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded font-semibold">{item.metric}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 6: DATA OWNERSHIP AND PRIVACY */}
        <section id="section-data-privacy" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="border border-brand-cyan/25 rounded-3xl bg-brand-space/50 p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-xl shadow-[0_0_20px_rgba(0,212,255,0.08)]">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20 w-fit">TELEMETRY COMPARISON BRIEF</h4>
                
                <div className="space-y-4 text-xs font-mono pt-3">
                  <div className="p-4 bg-red-950/20 rounded-2xl border border-red-500/25 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    <span className="text-red-400 font-bold block mb-1">DATA DISCLOSURE INSIGHT</span>
                    <span className="text-gray-300">Recent research indicates multiple vehicle manufacturers transmit driving records, coordinates, and general speed indicators to external agencies under various circumstances.</span>
                  </div>
                  
                  <div className="p-4 bg-brand-cyan/5 rounded-2xl border border-brand-cyan/30 shadow-[0_0_10px_rgba(0,212,255,0.15)]">
                    <span className="text-brand-cyan font-bold block mb-1">ASTRATEQ GADGETS DESIGN APPROACH</span>
                    <span className="text-gray-300">Astrateq Gadgets' software components compile and process diagnostics locally inside the vehicle. This approach is intended to support total driver isolation.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">SECTION 06 // DATA PRIVACY PHILOSOPHY</div>
              
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                Who Owns Your Vehicle Data? <br />
                <span className="bg-gradient-to-r from-brand-cyan to-blue-200 bg-clip-text text-transparent">Connected Vehicles and Security</span>
              </h2>

              <p className="text-gray-350 text-sm leading-relaxed">
                As modern vehicle telematics grow, manufacturers commoditize continuous driving metrics. Insurance syndicates, credit agencies, and municipal servers routinely purchase live acceleration habits directly from cellular-connected auto frameworks.
              </p>

              <p className="text-gray-400 text-xs leading-relaxed">
                Our approach remains strictly educational and objective. Your vehicle is an extension of your private domain. Astrateq Gadgets believes that safety mapping shouldn't demand continuous corporate telemetry surveillance. Sourcing CAN bus cycles exclusively for local, private assistance models represents the only clean, forward-thinking solution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-brand-space/25 border border-brand-cyan/20 space-y-1.5 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                  <span className="text-white font-medium text-sm font-display block">Zero Cloud Dependencies</span>
                  <span className="text-xs text-gray-400">Telemetry computations happen locally inside the vehicle cab.</span>
                </div>
                <div className="p-5 rounded-2xl bg-brand-space/25 border border-brand-cyan/20 space-y-1.5 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                  <span className="text-white font-medium text-sm font-display block">Anonymized Local Loops</span>
                  <span className="text-xs text-gray-400">Your trip sequences are never compiled into centralized profiles.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: QUESTIONS EVERY DRIVER SHOULD ASK BEFORE BUYING */}
        <section id="section-driver-questions" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">SECTION 06 // BUYER AWARENESS</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Questions Every Driver Should Ask
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Before installing any connected hardware in your vehicle cabin, demand complete clarity about your digital civil liberties and telemetry security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                q: "Where is my data stored?",
                a: "Connected products often beam logs to centralized databases. Consider solutions designed around local physical storage inside your cabin to keep custody of your logs."
              },
              {
                q: "Can I use the product without a subscription?",
                a: "Avoid hardware traps that lock core safety, speed, or warning systems behind continuous subscription billing gates."
              },
              {
                q: "What happens if the company shuts down?",
                a: "If the product depends on a remote cloud backend, it will brick when corporate servers go dark. Offline systems run forever."
              },
              {
                q: "Who owns my driving data?",
                a: "Many brands sell your speed, coordinate histories, and acceleration habits to insurance aggregates. You should hold the sole master key."
              },
              {
                q: "Can features work without cloud connectivity?",
                a: "In vast regions of northern highways and rural parks, cell service drops. Safety features must compile locally to remain reliable."
              },
              {
                q: "Can I export or delete my information?",
                a: "Driver sovereignty means absolute control. Look for configurations where you can physically purge or download diagnostic logs directly under your own authority."
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-gradient-to-b from-brand-space/30 to-brand-midnight border border-brand-cyan/20 shadow-xl hover:border-[#FF6A00]/40 hover:shadow-[0_0_15px_rgba(255,106,0,0.15)] transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-2 w-10 bg-[#FF6A00]/30 rounded-full" />
                  <h4 className="text-white font-display font-semibold text-sm leading-snug tracking-tight">
                    {item.q}
                  </h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed font-sans">
                    {item.a}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-6 pt-4 border-t border-white/5">
                  QUESTION CODE: {101 + idx} // EDU
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: COMPARISON TABLE */}
        <section id="section-cloud-vs-edge" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-[#FF6A00] tracking-widest uppercase bg-[#FF6A00]/10 px-3 py-1 rounded-full border border-[#FF6A00]/25">SECTION 07 // SYSTEMS COMPARISON</div>
            <h2 className="text-3xl font-display font-medium text-white tracking-tight">
              Questions Every Driver Should Consider
            </h2>
            <p className="text-[#FF6A00] text-xs font-mono uppercase">Compare how cloud-mandatory telemetry stack compares against Astrateq Gadgets edge loops</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              An educational, objective breakdown detailing product architecture considerations. Make an informed choice for your cockpit.
            </p>
          </div>

          <div id="comparison-table-wrapper" className="overflow-x-auto rounded-3xl border border-brand-cyan/25 bg-brand-space/30 shadow-[0_0_20px_rgba(0,212,255,0.06)] backdrop-blur-xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-brand-cyan/15 bg-brand-space/55">
                  <th className="p-6 font-mono text-xs uppercase tracking-wider text-brand-cyan font-bold">Topic</th>
                  <th className="p-6 font-mono text-xs uppercase tracking-wider text-gray-300">What To Consider</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-xs">
                {[
                  {
                    topic: "Data Storage",
                    desc: "Local vs Cloud. Local processing supports physical storage drives remaining in your possession; Cloud models risk broker leakages and centralized data breach cycles."
                  },
                  {
                    topic: "Monthly Costs",
                    desc: "Subscription vs One-Time Purchase. Hardware purchase architectures should function permanently without forced monthly paywalls, premium feature lockdowns, or active key check-ins."
                  },
                  {
                    topic: "Internet Dependency",
                    desc: "Online vs Offline Functionality. Locally compiled edge engines compute diagnostics reliably over remote wilderness roads. Cloud dependent frameworks fail instantly when remote cell towers drop."
                  },
                  {
                    topic: "Privacy",
                    desc: "Data Collection Practices. Querying local physical PID streams protects identification and keeps trip routes private. Centralized telemetry trackers register complete spatial routes and cellular locations."
                  },
                  {
                    topic: "Ownership",
                    desc: "Driver Control. Drivers should own the hardware and keep physical master keys. Software terms that utilize remote cloud servers permit companies to dynamically alter licensing or revoke features."
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-cyan/5 transition-all duration-250">
                    <td className="p-6 font-bold text-white font-display text-sm whitespace-nowrap border-r border-white/5">{row.topic}</td>
                    <td className="p-6 text-gray-350 leading-relaxed max-w-xl font-sans">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 8: WHAT MAKES A VEHICLE ASTRATEQ GADGETS READY & BRAND EXPLORER */}
        <section id="section-astrateq-ready" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">SECTION 08 // TECHNICAL METRICS</div>
            <h2 className="text-3xl font-display font-medium text-white tracking-tight">
              What Makes a Vehicle Astrateq Gadgets Ready?
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              An transparent architectural overview of hardware expectations. No marketing fluff—just direct engineering guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "OBD-II Port Access",
                desc: "Standard 16-pin connector must be uncompromised and fully clear from third-party piggyback tuning chips.",
                status: "Mandatory"
              },
              {
                title: "CAN Architecture",
                desc: "Requires CAN protocol operating at 500kbps or 250kbps standard (standard on vehicles built since 2008).",
                status: "Mandatory"
              },
              {
                title: "Power Architecture",
                desc: "A stable 12V automotive battery battery system delivering clean current ranges between 11.8V to 14.4V.",
                status: "Mandatory"
              },
              {
                title: "Clear Windshield Geometry",
                desc: "Mounting path must clear wiper sweep zones to assure safety cameras are protected against snow and mud.",
                status: "Mandatory"
              },
              {
                title: "Secure Physical Mounts",
                desc: "Firm structural glass support to eliminate optical vibrations across unpaved cottage trails or gravel roads.",
                status: "Recommended"
              },
              {
                title: "Advanced Safety Suite",
                desc: "Existing lane-assist cameras do not interfere. The gadget works as an independent, non-modifying passive system.",
                status: "Adaptive"
              }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-brand-space/45 border border-brand-cyan/20 hover:border-[#FF6A00]/40 hover:shadow-[0_0_15px_rgba(255,106,0,0.1)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-bold font-display tracking-tight text-sm">{item.title}</h4>
                    <span className="font-mono text-[9px] px-2.5 py-1 rounded bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF6A00] uppercase tracking-wider font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-brand-cyan font-mono text-[10px] uppercase mt-6 pt-4 border-t border-white/5">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Validation Passed Standard</span>
                </div>
              </div>
            ))}
          </div>

          {/* REAL-WORLD VEHICLE COMPATIBILITY SAMPLES */}
          <div className="mb-16 space-y-6">
            <div className="border-l-2 border-brand-cyan pl-4 text-left">
              <h3 className="text-xl font-display font-medium text-white tracking-tight">
                Common Vehicle Categories
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                These examples are provided for educational context only. Final compatibility may vary by model year, trim, electrical architecture, and installation configuration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  category: "Family SUVs",
                  examples: "Toyota RAV4, Honda CR-V, Mazda CX-5, Ford Escape",
                  notes: "Standardized high-clearance windshield mounts and accessible driver knee-well diagnostic panels."
                },
                {
                  category: "Pickup Trucks",
                  examples: "Ford F-150, Ram 1500, Chevrolet Silverado, Toyota Tacoma",
                  notes: "Heavy-duty high-output alternator loops and ample space for localized telemetry edge hardware."
                },
                {
                  category: "Sedans",
                  examples: "Honda Accord, Toyota Camry, Hyundai Elantra, Mazda3",
                  notes: "Highly responsive electric power steering feedback systems and standardized passenger cabin routing."
                }
              ].map((cat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-brand-space/30 border border-brand-cyan/20 space-y-3 relative overflow-hidden hover:border-[#FF6A00]/30 transition-all duration-300">
                  <div className="text-[10px] font-mono text-brand-cyan tracking-wider uppercase font-bold">Category Class 0{idx + 1}</div>
                  <h4 className="text-white font-bold text-base font-display">{cat.category}</h4>
                  <div className="text-xs text-gray-300 pt-1">
                    <span className="text-gray-500 font-mono text-[9px] uppercase block mb-1">Representative Models:</span>
                    <span className="font-sans text-white font-medium">{cat.examples}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pt-3 border-t border-white/5">
                    {cat.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BRAND EXPLORER COMPONENT */}
          <div className="bg-brand-space/45 border border-brand-cyan/25 shadow-[0_0_20px_rgba(0,212,255,0.08)] rounded-3xl p-6 md:p-8 relative text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-brand-cyan" />
                  Canadian Vehicle Architecture Registry
                </h3>
                <p className="text-xs text-gray-450 font-sans mt-1">
                  Search standard Canadian imports to access standard diagnostic layouts and estimated hardware compatibility.
                </p>
              </div>
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF6A00]" />
                <input
                  id="vehicle-search"
                  type="text"
                  placeholder="Filter brands (e.g., Volvo, Toyota)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-midnight border border-brand-cyan/25 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]/20 transition-all"
                />
              </div>
            </div>

            {/* Simulated Data Grid */}
            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full text-left font-mono text-xs text-gray-400">
                <thead>
                  <tr className="bg-brand-midnight text-gray-300 border-b border-brand-cyan/20">
                    <th className="p-4">Brand / Model Variant</th>
                    <th className="p-4">OBD Location</th>
                    <th className="p-4">Standard Bus Protocol</th>
                    <th className="p-4">Electrical Delivery</th>
                    <th className="p-4 text-center">Research Alignment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((row, idx) => (
                       <tr key={idx} className="hover:bg-brand-cyan/5 transition-colors">
                        <td className="p-4 font-sans font-medium text-white text-sm">{row.name}</td>
                        <td className="p-4 text-[11px] font-mono leading-relaxed">{row.obdLocation}</td>
                        <td className="p-4 text-[11px] text-brand-cyan">{row.protocol}</td>
                        <td className="p-4 text-xs font-sans">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            row.voltageStability === 'Ultra-Stable' 
                              ? 'bg-purple-950/40 text-purple-300 border border-purple-500/10' 
                              : 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/10'
                          }`}>
                            {row.voltageStability}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded text-[10.5px] font-mono tracking-wide ${
                            row.compatibilityStatus === 'Highly Aligned' 
                              ? 'text-emerald-450 bg-emerald-950/45 border border-emerald-500/20' 
                              : 'text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/25'
                          }`}>
                            {row.compatibilityStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No vehicle match found for "{searchQuery}". General OBD-II standard remains compatible.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <p className="text-[10px] text-gray-500 font-mono mt-3 text-right">
              DATABASE SYNCHRONIZATION DIRECTIVE REF: CAN-ELEC-2026-V3
            </p>
          </div>
        </section>

        {/* SECTION 9: THE FUTURE OF VEHICLE INTELLIGENCE */}
        <section id="section-future-intelligence" className="mb-24 py-20 px-8 rounded-3xl bg-gradient-to-tr from-brand-midnight via-brand-space/45 to-brand-midnight border border-[#FF6A00]/25 shadow-[0_0_25px_rgba(255,106,0,0.06)] text-center relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative">
            <div className="inline-flex items-center gap-2 bg-[#FF6A00]/10 border border-[#FF6A00]/25 px-4 py-1.5 rounded-full text-[#FF6A00] text-xs font-mono tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE HORIZON OF INTELLIGENT TRAVEL</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              The Future of Vehicle Intelligence
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              We envision a future where driver assistance systems aren't reliant on corporate service subscription pricing or commercial telemetry leaks. Sourcing local diagnostic speeds, high-temp vision parameters, and offline road databases can keep drivers completely secure.
            </p>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-sans">
              Through local machine learning model configurations, Astrateq Gadgets is designing high-precision driver safety environments, passive vibration detection indices, and early thermographic brake feedback entirely within localized system architectures.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8">
              {[
                { label: 'Local-First AI loops', val: '100% Offline' },
                { label: 'Telemetry Protection', val: 'Absolute' },
                { label: 'Canadian Designed', val: 'Arctic Grade' }
              ].map((item, index) => (
                <div key={index} className="text-center bg-brand-midnight/60 px-6 py-4 rounded-2xl border border-white/5 min-w-[150px]">
                  <div className="text-lg md:text-xl font-display font-bold text-white">{item.val}</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHERE ASTRATEQ GADGETS FITS SECTION */}
        <section id="where-astrateq-fits" className="mb-24">
          <div className="border border-brand-cyan/25 bg-brand-space/35 rounded-[2rem] p-8 md:p-12 relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.1)]">
            <div className="absolute -top-12 -right-12 h-64 w-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-8 relative">
              <div className="space-y-4 text-left">
                <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/25 px-3 py-1 rounded-full text-brand-cyan text-xs font-mono tracking-wider uppercase">
                  <Layers className="h-3.5 w-3.5" />
                  <span>ARCHITECTURE REALITY CHECK</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                  Where Astrateq Fits
                </h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-4xl">
                  Modern vehicles already contain advanced diagnostic and safety systems. Astrateq Gadgets is being designed around three core principles: privacy-first intelligence, local processing, and driver ownership.
                </p>
                <p className="text-gray-500 text-xs italic">
                  We maintain total transparency: our parameters are non-invasive and read-only. We do not modify physical engine configurations or bypass factory safety grids.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Privacy First",
                    desc: "Sourcing high-fidelity sensor signals exclusively for your dashboard HUD, with zero commercial tracking profiles.",
                    icon: Shield
                  },
                  {
                    title: "Local Intelligence",
                    desc: "Running computer vision models completely on onboard chipset circuits, isolated from external network outages.",
                    icon: Cpu
                  },
                  {
                    title: "Driver Ownership",
                    desc: "You retain direct custody of raw telemetry records. We cannot access your files because they reside in your cabin.",
                    icon: FileText
                  },
                  {
                    title: "No Cloud Dependency",
                    desc: "Engine and cabin telemetry functions compile entirely offline. Perfect for expansive, remote high-latitude drives.",
                    icon: Server
                  }
                ].map((principle, index) => {
                  const IconComponent = principle.icon;
                  return (
                    <div key={index} className="p-6 rounded-2xl bg-brand-midnight/60 border border-brand-cyan/20 hover:border-[#FF6A00]/40 hover:shadow-[0_0_15px_rgba(255,106,0,0.1)] transition-all duration-300 space-y-4 text-left flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="p-3 bg-[#FF6A00]/5 rounded-xl border border-[#FF6A00]/20 w-fit">
                          <IconComponent className="h-5 w-5 text-[#FF6A00]" />
                        </div>
                        <h3 className="text-base font-display font-bold text-white">{principle.title}</h3>
                        <p className="text-xs text-gray-405 leading-relaxed">{principle.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                <a
                  id="btn-where-astrateq-cta"
                  href="https://astrateqgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logAnalyticsEvent('reserve_spot_clicked', { origin: 'where_astrateq_fits' })}
                  className="px-8 py-4 rounded-xl bg-white hover:bg-[#FF6A00] hover:text-white text-brand-midnight font-bold flex items-center gap-2.5 transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer text-sm tracking-wide shadow-black hover:shadow-[0_0_20px_rgba(255,106,0,0.4)]"
                >
                  <span>Explore Astrateq Priority Access</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <span className="text-xs text-gray-400 font-mono text-left">
                  Designed for Canadian driving sovereignty and PIPEDA privacy alignment.
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION 8: LEAD CAPTURE SECTION */}
        <section id="lead-capture-section" className="mb-12 scroll-mt-24" ref={leadSectionRef}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Lead capture form */}
            <div className="lg:col-span-7 bg-brand-space/55 border border-brand-cyan/25 shadow-[0_0_25px_rgba(0,212,255,0.08)] rounded-[2rem] p-8 relative flex flex-col justify-between backdrop-blur-xl">
              <div className="space-y-6">
                <div>
                  <div className="inline-block text-[11px] font-mono text-[#FF6A00] tracking-widest uppercase mb-2 bg-[#FF6A00]/10 px-3 py-1 rounded-full border border-[#FF6A00]/25">LIMITED PRE-LAUNCH PROGRAM</div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                    Download the Complete Canadian Vehicle Intelligence Toolkit
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mt-2 font-sans">
                    Get the complete guide, privacy checklist, vehicle readiness worksheet, and future Astrateq compatibility updates.
                  </p>
                </div>

                {/* PDF REQUIRED BENEFITS LIST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-b border-brand-cyan/15 py-5 my-2">
                  {[
                    "Digital Vehicle Compatibility & Safety Guide",
                    "Vehicle Privacy Checklist",
                    "Vehicle Readiness Worksheet",
                    "Future Compatibility Updates",
                    "Early Access Notifications"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white font-sans">
                      <Check className="h-4.5 w-4.5 text-[#FF6A00] shrink-0 font-bold" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10.5px] font-mono uppercase tracking-wider text-gray-400">First Name</label>
                        <input
                          id="lead-name"
                          type="text"
                          required
                          placeholder="Arthur"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full bg-brand-midnight/90 border border-brand-cyan/25 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]/20 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10.5px] font-mono uppercase tracking-wider text-gray-400">Email Address</label>
                        <input
                          id="lead-email"
                          type="email"
                          required
                          placeholder="arthur@algonquin.ca"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full bg-brand-midnight/90 border border-brand-cyan/25 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        id="btn-submit-lead"
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-xl bg-brand-cyan text-brand-midnight font-bold text-sm tracking-wider hover:bg-[#FF6A00] hover:text-white hover:shadow-[0_0_20px_rgba(255,106,0,0.45)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                          isSubmitting ? 'opacity-80 cursor-wait' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-brand-midnight border-t-transparent rounded-full animate-spin" />
                            <span>Encrypting &amp; Syncing Pipeline...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="h-4.5 w-4.5" />
                            <span>Send Me The Toolkit</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-500 font-mono leading-relaxed pt-2 text-left">
                      🔒 PRIVACY REASSURANCE: No spam. No resale of your information. You can unsubscribe anytime. Astrateq Gadgets operates on strict GDPR &amp; PIPEDA data compliance security protocols.
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    id="lead-submit-success"
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="p-6 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm font-display">Database Integration Confirmed</h4>
                        <span className="text-[10px] font-mono text-gray-500">MEMBER ID ENROLLED // AST-902-88</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {submitSuccessMsg}
                    </p>

                    <div className="bg-brand-midnight/80 p-3 rounded border border-white/5 font-mono text-[9.5px] text-gray-400 space-y-1.5 leading-normal">
                      <span className="text-brand-cyan font-bold block">RECIPIENT DEV LOG GATEWAY:</span>
                      <span>// Initialized dispatch protocol: SMTP wrapper...</span> <br />
                      <span>// Payload identifier: Astrateq-Gadgets-Compatibility-Safety-Guide.pdf</span> <br />
                      <span>// SMTP Response status: 250 Queue ID AST-902-88 OK</span>
                    </div>

                    <button
                      id="btn-reset-form"
                      onClick={() => {
                        setIsSubmitted(false);
                        setLeadName('');
                        setLeadEmail('');
                      }}
                      className="text-gray-400 hover:text-brand-cyan font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      ← Register Another Drive Address
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Direct Reservation Conversion Callout */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-space/50 via-brand-midnight to-brand-space/30 border border-[#FF6A00]/25 shadow-[0_0_25px_rgba(255,106,0,0.08)] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden text-left backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/25 flex items-center justify-center text-[#FF6A00] shadow-[0_0_15px_rgba(255,106,0,0.15)]">
                  <Car className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-medium text-white tracking-tight">
                    Secure Your Priority Access
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed font-sans">
                    Astrateq Gadgets' initial hardware batches are strictly limited due to precision arctic calibration standards. Reserving your spot registers your priority sequence.
                  </p>
                </div>

                <ul className="text-xs space-y-3 text-gray-400 font-sans">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#FF6A00] shrink-0 font-bold" />
                    <span>Priority hardware batch sequencing allocation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#FF6A00] shrink-0 font-bold" />
                    <span>Access to Canadian closed beta vision algorithms</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#FF6A00] shrink-0 font-bold" />
                    <span>Inviolable pricing priority protection</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 space-y-4">
                <a
                  id="btn-claim-reservation"
                  href="https://astrateqgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6A00] to-amber-500 text-white font-bold text-center text-sm shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] transition-all duration-300 active:scale-98 block cursor-pointer"
                >
                  Reserve Your Spot Now
                </a>
                
                <a
                  id="btn-claim-explore"
                  href="https://astrateqgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center text-gray-400 hover:text-white font-mono text-xs tracking-wider uppercase block py-1.5 hover:underline"
                >
                  Explore Astrateq Gadgets
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* AST-CONCEPT ART DIRECTION DECK */}
        <section id="section-art-direction" className="mb-24 border-t border-brand-cyan/25 pt-16">
          <div className="space-y-8">
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-brand-cyan text-xs font-mono tracking-wider uppercase">
                <Sparkles className="h-3 w-3" />
                <span>EDITORIAL IMAGE SYSTEM</span>
              </div>
              <h2 className="text-3xl font-display font-medium text-white tracking-tight">
                Imagery Concepts &amp; Art Direction Deck
              </h2>
              <p className="text-sm text-gray-400 max-w-3xl leading-relaxed font-sans">
                We believe that premium products deserve premium guidelines. Under this design system, mockups explicitly avoid low-fidelity AI gradients or generic cyberpunk effects. Clicking below previews the exact camera alignment, lenses, and color palettes designed for our upcoming marketing guides.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Concept list */}
              <div className="lg:col-span-5 space-y-3">
                {IMAGES_ART_DIRECTION.map((concept, index) => {
                  const isSelected = selectedArtDirectionIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedArtDirectionIndex(index);
                        logAnalyticsEvent('art_direction_concept_selected', { concept: concept.title });
                      }}
                      className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between text-xs font-sans font-semibold focus:outline-none cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-space/55 border-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/10' 
                          : 'bg-brand-midnight/40 border-brand-cyan/20 text-gray-400 hover:border-[#FF6A00]/50 hover:text-white'
                      }`}
                    >
                      <span>{concept.title}</span>
                      <ChevronRight className={`h-4.5 w-4.5 text-gray-550 transition-all ${isSelected ? 'translate-x-1.5 text-[#FF6A00]' : ''}`} />
                    </button>
                  );
                })}
              </div>

              {/* Specification layout output */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-brand-space/55 border border-brand-cyan/25 shadow-[0_0_20px_rgba(0,212,255,0.08)] space-y-4 relative min-h-[280px] flex flex-col justify-between backdrop-blur-xl">
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-brand-cyan/15 pb-4">
                    <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-2.5 py-0.5 rounded-full border border-brand-cyan/20">ART DIRECTOR BRIEF // CONCEPT 0{selectedArtDirectionIndex + 1}</span>
                    <span className="text-[10px] font-mono text-emerald-450 bg-emerald-950/30 px-3 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wide">Verified Spec</span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white">
                    {IMAGES_ART_DIRECTION[selectedArtDirectionIndex].title}
                  </h3>
                  
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {IMAGES_ART_DIRECTION[selectedArtDirectionIndex].desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-mono text-left">
                  <div className="p-3 bg-brand-midnight/80 rounded-xl border border-brand-cyan/20">
                    <span className="text-gray-500 block text-[9px] uppercase">Camera Lens Rig Cap:</span>
                    <span className="text-white font-medium">{IMAGES_ART_DIRECTION[selectedArtDirectionIndex].focusLength}</span>
                  </div>
                  <div className="p-3 bg-brand-midnight/80 rounded-xl border border-[#FF6A00]/20">
                    <span className="text-gray-500 block text-[9px] uppercase">Color Temperature:</span>
                    <span className="text-[#FF6A00] font-medium">{IMAGES_ART_DIRECTION[selectedArtDirectionIndex].aspect}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section id="section-faq" className="mb-24 scroll-mt-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/25">SECTION 09 // COMMON DRIVER INQUIRIES</div>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              
              {/* Premium Warning Callout banner */}
              <div className="p-4 rounded-xl bg-brand-space/35 border border-brand-cyan/25 shadow-[0_0_15px_rgba(0,212,255,0.05)] text-xs text-brand-cyan font-sans max-w-2xl mx-auto flex items-center gap-3">
                <Info className="h-5.5 w-5.5 shrink-0 text-brand-cyan" />
                <span className="text-left leading-relaxed">
                  <strong>Notice:</strong> This compatibility guide is provided exclusively for educational research. It does not provide product guarantees or certifiable physical pre-approvals.
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="rounded-2xl border border-brand-cyan/20 bg-brand-space/35 hover:border-[#FF6A00]/40 transition-all duration-300 overflow-hidden"
                  >
                    <button
                      id={`faq-btn-${index}`}
                      onClick={() => handleFaqToggle(index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    >
                      <span className="text-sm font-bold text-white hover:text-[#FF6A00] transition-colors font-sans">
                        {faq.q}
                      </span>
                      <ChevronDown 
                        className={`h-4.5 w-4.5 text-gray-500 transition-transform duration-350 ${
                          isOpen ? 'rotate-180 text-[#FF6A00]' : ''
                        }`} 
                      />
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-brand-cyan/25 bg-brand-midnight/40 text-xs text-gray-355 leading-relaxed font-sans text-left">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* DETAILED PREMIUM TECHNICAL FOOTER */}
      <footer id="guide-footer" className="max-w-7xl mx-auto px-6 mt-24 pt-16 border-t border-brand-cyan/20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.15)]">
                <span className="text-brand-cyan font-display font-black text-sm tracking-widest">A</span>
              </div>
              <span className="text-white font-display font-bold tracking-wider text-base">Astrateq Gadgets</span>
            </div>
            
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-sans">
              Producers of privacy-first edge intelligence hardware, diagnostic software modules, and cold-weather computer interfaces designed specifically for Canadian drivers.
            </p>
            
            <span className="text-[10px] text-gray-500 block font-mono">
              © 2026 Astrateq Gadgets. Built For Canadian Roads. All rights reserved.
            </span>
          </div>

          <div className="space-y-4 text-left">
            <h5 className="text-xs uppercase font-mono text-brand-cyan tracking-wider font-bold">Educational Guides</h5>
            <ul className="text-xs space-y-3 text-gray-450 font-sans">
              <li>
                <a href="#compatibility-calculator" className="hover:text-[#FF6A00] transition-colors duration-200">Digital Vehicle Compatibility Guide</a>
              </li>
              <li>
                <a href="#compatibility-calculator" className="hover:text-[#FF6A00] transition-colors duration-200">Diagnostic Compatibility Report</a>
              </li>
              <li>
                <a href="#section-driver-questions" className="hover:text-[#FF6A00] transition-colors duration-200">Founding Member Guide</a>
              </li>
              <li>
                <a href="#section-data-privacy" className="hover:text-[#FF6A00] transition-colors duration-200">Zero-Cloud Privacy Manifesto</a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h5 className="text-xs uppercase font-mono text-brand-cyan tracking-wider font-bold">Astrateq Ecosystem</h5>
            <ul className="text-xs space-y-3 text-gray-450 font-sans">
              <li>
                <a href="#lead-capture-section" className="hover:text-[#FF6A00] transition-colors duration-200">Astrateq Gadgets Pre-Launch Program</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[#FF6A00] transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#lead-capture-section" className="hover:text-[#FF6A00] transition-colors duration-200">Contact Us</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="py-6 border-t border-brand-cyan/15 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-500">
          <div>
            DOCUMENT REGISTRY ID: <span className="text-gray-300">AST-DVC-2026</span> • CANADIAN GENERAL PUBLICATION ASSIGNMENT
          </div>
          <div className="flex items-center gap-4">
            <button 
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#FF6A00] hover:text-[#FF8C33] hover:underline transition-all uppercase tracking-wider font-mono cursor-pointer bg-transparent border-none outline-none font-bold"
            >
              <ArrowUp className="h-4 w-4 text-[#FF6A00] filter drop-shadow-[0_0_6px_rgba(255,106,0,0.8)] animate-pulse" />
              <span>Back to Top</span>
            </button>
            <span>•</span>
            <a href="/privacy" className="hover:text-brand-cyan transition-colors">PROVINCIAL CONTROLS EXEMPTION</a>
            <span>•</span>
            <span>PIPEDA COMPLIANT</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {readingProgress > 10 && (
          <motion.button
            id="btn-floating-scroll-top"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={scrollToTop}
            title="Scroll to Top"
            className="fixed bottom-6 right-6 p-4 rounded-full bg-[#071120] border-2 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-[#071120] shadow-[0_0_20px_rgba(255,106,0,0.7)] hover:shadow-[0_0_30px_rgba(255,106,0,0.9)] transition-all duration-300 z-50 cursor-pointer hover:scale-110 group"
          >
            <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform filter drop-shadow-[0_0_6px_#FF6A00]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
