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
  ChevronDown
} from 'lucide-react';
import { 
  OBDSensor, 
  VehicleBrandMetrics, 
  AssessmentFactor 
} from '../types';

// Pre-defined Canadian-vibe vehicle datasets for the database explorer
const VEHICLE_DATABASE: VehicleBrandMetrics[] = [
  { name: 'Tesla Model Y / 3', country: 'USA (Built for Cold)', protocol: 'CAN ISO-15765 (Unified)', obdLocation: 'Under-dash console or rear console harness', voltageStability: 'Ultra-Stable', readinessScore: 98, notes: 'Direct high-speed CAN connectivity. Outstanding electrical regulation via high-voltage DC converter.' },
  { name: 'Volvo XC90 / XC60', country: 'Sweden (Arctic Ready)', protocol: 'CAN ISO-15765 (Dual Loop)', obdLocation: 'Driver side knee panel, well exposed', voltageStability: 'Robust', readinessScore: 95, notes: 'Highly standardized OBD-II architecture. Perfect compatibility with standard ADAS system integration.' },
  { name: 'Toyota RAV4 / Highlander', country: 'Japan (Canadian Spec)', protocol: 'CAN ISO-15765 (Symmetric)', obdLocation: 'Lower dashboard, left of steering column', voltageStability: 'Robust', readinessScore: 94, notes: 'Extremely reliable electrical signaling. Excellent physical clearance for compact hardware interfaces.' },
  { name: 'Subaru Outback / Forester', country: 'Japan (All-Weather)', protocol: 'CAN ISO-15765 (Standard)', obdLocation: 'Directly beneath steering column', voltageStability: 'Robust', readinessScore: 92, notes: 'Compatible with standard Eyesight camera layout. Requires offset placement for secondary lenses.' },
  { name: 'Ford F-150 Lightning / Super Duty', country: 'USA (Heavy Duty)', protocol: 'CAN J1939 / ISO-15765', obdLocation: 'Under dash, right of parking brake', voltageStability: 'Ultra-Stable', readinessScore: 96, notes: 'Heavy duty electrical loops. Supports continuous 2.4A standby draw without triggering power protection.' },
  { name: 'Hyundai Ioniq 5 / Tucson', country: 'South Korea (Cold-Tuned)', protocol: 'CAN ISO-15765 (Standard)', obdLocation: 'Lower dash, left side fuse cover', voltageStability: 'Robust', readinessScore: 93, notes: 'Standard high-speed CAN bus topology. Seamless connection for passive sensor telemetry.' },
  { name: 'BMW X5 / 3 Series', country: 'Germany (Autobahn Spec)', protocol: 'CAN ISO-15765 (Secure Gateway)', obdLocation: 'Driver kick panel near hood release', voltageStability: 'Ultra-Stable', readinessScore: 90, notes: 'Features secure automotive gateway. Read-only OBD passive telemetry is fully compatible.' },
  { name: 'Jeep Grand Cherokee / Wrangler', country: 'USA (All-Terrain)', protocol: 'CAN ISO-15765 (Mixed)', obdLocation: 'Under-dash, left steering column', voltageStability: 'Variable', readinessScore: 88, notes: 'Great clearance. Requires high-vibration isolation mounting due to extreme-terrain capability.' },
  { name: 'Honda CR-V / Civic', country: 'Japan (All-Weather)', protocol: 'CAN ISO-15765 (Standard)', obdLocation: 'Lower panel, driver side knee center', voltageStability: 'Robust', readinessScore: 91, notes: 'Ideal OBD layout. Traditional stable 12V charging system holds standard power requirements.' },
  { name: 'Audi Q7 / Q5', country: 'Germany (Quattro Spec)', protocol: 'CAN ISO-15765 (Dual Loop)', obdLocation: 'Beneath left instrumental cluster cowl', voltageStability: 'Ultra-Stable', readinessScore: 92, notes: 'German high-precision networks. Perfect passive read performance for thermal and telemetry layers.' }
];

// OBD-II Interactive Sensor Simulation Data
const OBD_SENSORS: OBDSensor[] = [
  { id: 'rpm', name: 'Engine Speed', parameterCode: '01 0C', unit: 'RPM', normalRange: '700 - 3,500', currentValue: 1850, signalHex: '41 0C 1C E8', educationalInfo: 'Mode 01 PID 0C returns engine rotation. Astrateq uses local speed cycles to dynamically evaluate engine load state.' },
  { id: 'speed', name: 'Vehicle Velocity', parameterCode: '01 0D', unit: 'km/h', normalRange: '0 - 120', currentValue: 92, signalHex: '41 0D 5C', educationalInfo: 'Mode 01 PID 0D. Pure vehicle speed data sourced directly from wheel rotation sensors, free from GPS multipath loss in tall Canadian forests.' },
  { id: 'coolant', name: 'Engine Temp', parameterCode: '01 05', unit: '°C', normalRange: '80 - 105', currentValue: 88, signalHex: '41 05 80', educationalInfo: 'Mode 01 PID 05. Crucial for thermal health. Used by edge computing systems to predict winter battery optimization cycles.' },
  { id: 'throttle', name: 'Throttle Input', parameterCode: '01 11', unit: '%', normalRange: '0 - 100', currentValue: 42, signalHex: '41 11 6B', educationalInfo: 'Mode 01 PID 11 returns the throttle pedal position index. Sourced to map driver intent against passive outward camera feedback.' }
];

export default function VehicleCompatibilityGuide() {
  // Navigation progress tracker
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Interactive Simulator States
  const [activeSensor, setActiveSensor] = useState<OBDSensor>(OBD_SENSORS[0]);
  const [customRpm, setCustomRpm] = useState<number>(1850);
  
  // Compatibility Scoring Engine States
  const [selectedYear, setSelectedYear] = useState<string>('2019');
  const [selectedBrand, setSelectedBrand] = useState<string>('symmetric');
  const [selectedWindshield, setSelectedWindshield] = useState<string>('steep');
  const [selectedVoltage, setSelectedVoltage] = useState<string>('clean-12v');
  const [compatibilityScore, setCompatibilityScore] = useState<number>(95);
  
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

  // Floating notifications/toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth scroll helper
  const checklistRef = useRef<HTMLDivElement>(null);
  const leadSectionRef = useRef<HTMLDivElement>(null);

  // Update dynamic progress bar
  useEffect(() => {
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

  // Recalculate compatibility score dynamically when inputs change
  useEffect(() => {
    let baseScore = 100;
    
    // Year factor
    if (selectedYear === 'pre-1996') baseScore -= 70; // Pre-OBDII
    else if (selectedYear === '1996-2007') baseScore -= 10; // Old OBDII
    else if (selectedYear === '2008-2018') baseScore -= 2;  // Standard CAN
    
    // Brand design factor
    if (selectedBrand === 'variable-old') baseScore -= 12;
    else if (selectedBrand === 'complex-ev') baseScore -= 5;
    
    // Windshield slope
    if (selectedWindshield === 'sleek-sports') baseScore -= 15;
    else if (selectedWindshield === 'sensor-pod') baseScore -= 8;
    
    // Voltage
    if (selectedVoltage === 'manual-var') baseScore -= 18;
    else if (selectedVoltage === 'switched-eco') baseScore -= 5;

    setCompatibilityScore(Math.max(15, baseScore));
  }, [selectedYear, selectedBrand, selectedWindshield, selectedVoltage]);

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
    navigator.clipboard.writeText(canonicalURL)
      .then(() => showToast('Canonical link copied to clipboard!'))
      .catch(() => showToast('Failed to copy link automatically.'));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const canonicalURL = 'https://reports.astrateqgadgets.com/guides/vehicle-compatibility';
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

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
                  <span>ASTRATEQ IN-CABIN HUD MOCKUP</span>
                  <span className="animate-pulse">● ACTIVE TELEMETRY FEED</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Refined local vision processing algorithms designed to match high-prestige interiors (Volvo, Porsche, Tesla) while keeping operational compute completely offline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TODAY'S VEHICLES ARE COMPUTERS */}
        <section id="section-vehicles-evolved" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 02 // HARDWARE TELEMETRY</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              The Modern Vehicle Has Evolved
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              A contemporary automobile is no longer a purely mechanical assembly. It represents a complex distributed system containing up to a hundred microcontrollers operating in absolute synchronicity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
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
                <div key={index} className="p-5 rounded-xl bg-brand-space/30 border border-white/5 hover:border-brand-cyan/20 transition-all group">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 group-hover:bg-brand-cyan hover:text-brand-midnight transition-colors">
                      <span className="font-mono text-xs font-semibold">0{index + 1}</span>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-white font-medium font-display text-base tracking-wide">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7 bg-brand-space/20 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-2 right-2 bg-brand-cyan/15 px-2 py-0.5 rounded text-[8px] font-mono text-brand-cyan uppercase tracking-widest font-bold">
                SYSTEM SCHEMATIC REVISION V3.1
              </div>
              
              <h3 className="text-lg font-display font-medium text-white mb-2 flex items-center gap-2">
                <Network className="h-4 w-4 text-brand-cyan" />
                Automotive Area Network (CAN Map)
              </h3>
              
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Interconnections mapping out how physical sensor intelligence translates from powertrain modules directly into safety-critical driver displays and outer sensors.
              </p>

              {/* Integrated Network Flow Diagram */}
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10 bg-brand-midnight/45 p-4">
                <img 
                  id="schematic-network-image"
                  src="/src/assets/images/vehicle_network_schematic_1780682014029.png" 
                  alt="High tech CAN Bus vehicle network architecture diagram with glowing nodes" 
                  className="w-full h-auto aspect-video object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                        activeNetworkNode === node.id 
                          ? `${node.color} bg-white/5 font-semibold` 
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
        <section id="section-understanding-obd" className="mb-24 bg-brand-space/10 border border-white/5 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 03 // VEHICLE PROTOCOLS</div>
              <h2 className="text-3xl font-display font-medium text-white tracking-tight leading-tight">
                The Language Your Vehicle Already Speaks
              </h2>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Mandated in North America since 1996, the <strong>OBD-II (On-Board Diagnostics)</strong> port is far more than a mechanism to clear check engine lights. It is a highly regulated, standardized pipeline providing high-density real-time operating metrics.
              </p>

              <div className="space-y-4 text-xs text-gray-400">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-gray-200">Global Standardization:</strong> Sourcing high-fidelity sensor protocols is highly stable regardless of vehicle manufacture.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-gray-200">Passive Listening Safety:</strong> Operates strictly via non-interfering diagnostic queries, eliminating mechanical feedback loop failures.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
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
              <div className="bg-brand-space border border-white/10 rounded-xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-brand-cyan" />
                    <div>
                      <h4 className="text-white text-xs font-mono font-medium uppercase tracking-wider">OBD-II Hexadecimal Decoder</h4>
                      <p className="text-[10px] text-gray-400 font-mono">LIVE PASSIVE SNIFFER SIMULATION</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
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
                      className={`p-2 rounded-lg text-left border text-xs font-mono transition-all relative ${
                        activeSensor.id === sensor.id 
                          ? 'border-brand-cyan bg-brand-cyan/5 text-white' 
                          : 'border-white/5 bg-brand-midnight/40 text-gray-400 hover:text-white hover:border-white/15'
                      }`}
                    >
                      <div className="text-[10px] text-gray-500 font-sans">PID {sensor.parameterCode}</div>
                      <div className="font-semibold">{sensor.name}</div>
                      {activeSensor.id === sensor.id && (
                        <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Visual Dashboard Rendering of Active Metric */}
                <div className="rounded-lg bg-brand-midnight/80 p-4 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">TELEMETRY DECODING MATRIX</span>
                    <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">STANDARD MODE 01</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Gauge Visual */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center py-2">
                      <div className="relative h-24 w-24 rounded-full border-4 border-dashed border-white/10 flex flex-col items-center justify-center">
                        <div className="absolute inset-2 rounded-full border border-brand-cyan/20 flex flex-col items-center justify-center">
                          <span className="text-white font-mono text-lg font-bold tracking-tight">
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
                        <div className="font-mono text-brand-cyan font-bold tracking-widest text-base select-all bg-black/30 p-2 rounded border border-white/5 mt-1">
                          {activeSensor.signalHex}
                        </div>
                      </div>

                      <div className="text-[11px] space-y-1">
                        <div>
                          <span className="text-gray-500 font-mono">Response Prefix:</span> <strong className="text-gray-300 font-mono">41 {activeSensor.parameterCode.split(' ')[1]}</strong> <span className="text-gray-500 font-sans">(Verification Output)</span>
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
                    <div className="space-y-1 bg-brand-space/40 p-3 rounded font-mono text-[11px] text-gray-300 border border-brand-cyan/5">
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
                      <div className="pt-2 text-[10px] text-gray-400">
                        <span className="text-brand-cyan">DECODING FORMULA:</span> ((ByteA * 256) + ByteB) / 4 <br />
                        Applying: (({activeSensor.signalHex.split(' ')[2]} * 256) + {activeSensor.signalHex.split(' ')[3]}) / 4 = <strong>{customRpm} RPM</strong>
                      </div>
                    </div>
                  )}

                  {activeSensor.id !== 'rpm' && (
                    <div className="bg-brand-space/40 p-3 rounded text-[11px] text-gray-300 border border-brand-cyan/5 italic leading-relaxed">
                      💡 {activeSensor.educationalInfo}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: WHY COMPATIBILITY MATTERS AND DYNAMIC CALCULATOR */}
        <section id="compatibility-calculator" className="mb-24 scroll-mt-24" ref={checklistRef}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 04 // VEHICLE ASSESSMENT</div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              Why System Compatibility Matters
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              Astrateq Gadgets' software requires precise electrical stability, stable OBD packet broadcasting, and a clear safety camera clear-space windshield scope. Check your vehicle's architectural score below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive Selector Pane */}
            <div className="lg:col-span-7 bg-brand-space/20 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-display font-medium text-white mb-6 flex items-center gap-2">
                  <Car className="h-4.5 w-4.5 text-brand-cyan" />
                  Select Vehicle Diagnostic Layout
                </h3>
                
                <div className="space-y-6">
                  {/* Parameter: Year */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">Manufacturing Era Group</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: '2019', label: '2019 or Newer', sub: 'Secure Gateway CAN' },
                        { id: '2008-2018', label: '2008 – 2018 Model', sub: 'High-speed CAN std.' },
                        { id: '1996-2007', label: '1996 – 2007 Model', sub: 'Legacy OBD networks' },
                        { id: 'pre-1996', label: 'Pre-1996 Era', sub: 'Analog (Non-OBD)' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedYear(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedYear === opt.id 
                              ? 'border-brand-cyan bg-brand-cyan/5 text-white' 
                              : 'border-white/5 bg-brand-midnight/40 text-gray-400 hover:text-white hover:border-white/15'
                          }`}
                        >
                          <div className="text-xs font-medium font-sans">{opt.label}</div>
                          <div className="text-[9px] font-mono text-gray-500 mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parameter: Brand Electrical Archetype */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">Brand Network Complexity</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: 'symmetric', label: 'Standard Symmetric', sub: 'Toyota, Honda, Subaru' },
                        { id: 'complex-ev', label: 'Electric / Luxury Hub', sub: 'Tesla, Volvo, BMW, EV' },
                        { id: 'variable-old', label: 'High Load Variable', sub: 'Heavy Duty, Mod Vehicles' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedBrand(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedBrand === opt.id 
                              ? 'border-brand-cyan bg-brand-cyan/5 text-white' 
                              : 'border-white/5 bg-brand-midnight/40 text-gray-400 hover:text-white hover:border-white/15'
                          }`}
                        >
                          <div className="text-xs font-semibold font-sans">{opt.label}</div>
                          <div className="text-[9px] font-mono text-gray-500 mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parameter: Windshield / Camera Mount */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">Windshield Mounting Geometry</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: 'steep', label: 'Steep SUV / Truck Angle', sub: 'Optimized camera field' },
                        { id: 'sensor-pod', label: 'Large HUD Pod Cabin', sub: 'Minor offset adjustment' },
                        { id: 'sleek-sports', label: 'Sleek Coupe Slope', sub: 'Special wedge accessory' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedWindshield(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedWindshield === opt.id 
                              ? 'border-brand-cyan bg-brand-cyan/5 text-white' 
                              : 'border-white/5 bg-brand-midnight/40 text-gray-400 hover:text-white hover:border-white/15'
                          }`}
                        >
                          <div className="text-xs font-semibold font-sans">{opt.label}</div>
                          <div className="text-[9px] font-mono text-gray-500 mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parameter: Power delivery stability */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400 block">Alternator / DC-DC Loop Stability</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: 'clean-12v', label: 'Continuous Clean 12V', sub: 'Highly Regulated DC' },
                        { id: 'switched-eco', label: 'Eco Switched Hub', sub: 'Micro Voltage Dips' },
                        { id: 'manual-var', label: 'Variable Core Sag', sub: 'Older Lead Acid standard' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedVoltage(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedVoltage === opt.id 
                              ? 'border-brand-cyan bg-brand-cyan/5 text-white' 
                              : 'border-white/5 bg-brand-midnight/40 text-gray-400 hover:text-white hover:border-white/15'
                          }`}
                        >
                          <div className="text-xs font-semibold font-sans">{opt.label}</div>
                          <div className="text-[9px] font-mono text-gray-500 mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-midnight/60 rounded-xl p-4 border border-white/5 flex gap-3 items-start mt-6">
                <Info className="h-4.5 w-4.5 text-brand-cyan shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  These choices adapt the edge computing telemetry payload to prevent battery drainage while maintaining high outward camera recognition accuracy under diverse Canadian weather profiles.
                </p>
              </div>
            </div>

            {/* Live Scoring Display Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-brand-space to-brand-midnight border border-white/10 rounded-2xl p-8 flex flex-col justify-between text-center relative shadow-2xl">
              <div className="space-y-6">
                <h3 className="text-base text-gray-400 uppercase tracking-widest font-mono">DETERMINED CALCULATOR RATING</h3>
                
                {/* Large animated radial score ring */}
                <div className="relative h-44 w-44 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[10px] border-white/5" />
                  
                  {/* Dynamic color ring ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="88" 
                      cy="88" 
                      r="78" 
                      stroke={compatibilityScore >= 80 ? "#00D4FF" : compatibilityScore >= 50 ? "#FBBF24" : "#EF4444"}
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="490"
                      strokeDashoffset={490 - (490 * compatibilityScore) / 100}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  
                  <div className="space-y-0.5">
                    <span className="text-5xl font-display font-semibold text-white tracking-tighter block">{compatibilityScore}%</span>
                    <span className="text-[10px] uppercase font-mono text-gray-400">READINESS INDEX</span>
                  </div>
                </div>

                {/* Score narrative */}
                <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/5 text-left">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">ARCHITECTURAL QUALITY:</span>
                    {compatibilityScore >= 90 ? (
                      <span className="text-emerald-400 font-bold uppercase">Optimal Ready</span>
                    ) : compatibilityScore >= 75 ? (
                      <span className="text-brand-cyan font-bold uppercase">Stable Read Only</span>
                    ) : compatibilityScore >= 40 ? (
                      <span className="text-amber-400 font-bold uppercase">Conditioned Required</span>
                    ) : (
                      <span className="text-red-400 font-bold uppercase">Non-Compatible</span>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                    {compatibilityScore >= 90 && "Outstanding compatibility. This vehicle topology features low communication latency, beautiful power regulation stability, and straightforward obd-ii diagnostic location placements."}
                    {compatibilityScore >= 75 && compatibilityScore < 90 && "Perfect readiness. The vehicle speaks standard diagnostic layers. Requires offset mounting pads or smart standbys to offset low voltage drops."}
                    {compatibilityScore >= 40 && compatibilityScore < 75 && "Requires legacy OBD protocol bypass or separate 12V auxiliary accessory cabling. High-speed raw logs are accessible with localized calibration."}
                    {compatibilityScore < 40 && "Analog dashboard systems present. Standard OBDII metrics are unavailable. Reach out for high-voltage offroad modifications bypass advice."}
                  </p>
                </div>
              </div>

              {/* Action Conversion in place */}
              <div className="pt-8 space-y-3">
                <a 
                  id="btn-reserve-lead-scroll"
                  href="#lead-capture-section"
                  onClick={(e) => { e.preventDefault(); scrollToSection(leadSectionRef); }}
                  className="w-full py-3.5 rounded-xl bg-brand-cyan inline-flex items-center justify-center gap-2 text-brand-midnight font-medium text-sm hover:bg-white hover:shadow-cyan-glow transition-all active:scale-95 cursor-pointer"
                >
                  <span>Reserve Your Priority Spot</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-[10px] text-gray-500 font-mono">
                  PROVISIONAL GRADE SUBJECT TO FINAL LAB CONFIRMATION • EXCLUDES AFTERMARKET ALTERNATORS
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: CANADIAN DRIVING CHALLENGES */}
        <section id="section-canadiandriving" className="mb-24 py-12 px-8 bg-brand-space/20 border border-white/5 rounded-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-12 text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 05 // CANADIAN WEATHER SYSTEMS</div>
              <h2 className="text-3xl font-display font-medium text-white tracking-tight">
                Built For Canadian Roads
              </h2>
              <p className="text-gray-300 text-sm">
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
                  desc: "Wet snow, black ice, salt spray, and blinding sleet cripple legacy optical sensors that rely on clear weather templates. Astrateq's local vision processing is specifically calibrated to cross-reference real OBD wiper cycles against live visual cues.",
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
        <section id="section-data-privacy" className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="border border-white/10 rounded-2xl bg-brand-space/30 p-6 md:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl" />
                
                <h4 className="text-xs font-mono text-brand-cyan uppercase tracking-widest">REALITY VERIFICATION BRIEF</h4>
                
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 bg-white/5 rounded border-l-2 border-amber-400">
                    <span className="text-amber-400 font-bold block mb-1">DATA DISCLOSURE INSIGHT</span>
                    <span>Recent regulatory audits discover prominent vehicle manufacturers transmit private cabin audio, continuous GPS sequences, and acceleration profiles to broker entities secretively.</span>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded border-l-2 border-brand-cyan">
                    <span className="text-brand-cyan font-bold block mb-1">ASTRATEQ INVIOLABLE PROTOCOL</span>
                    <span>Astrateq Gadgets' entire code stack compiles natively on localized hardware. We cannot read your logs because they never touch our servers. Security. Confirmed.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 06 // DATA PRIVACY PHILOSOPHY</div>
              
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                Who Owns Your Vehicle Data? <br />
                <span className="bg-gradient-to-r from-brand-cyan to-blue-200 bg-clip-text text-transparent">Connected Vehicles and Security</span>
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed">
                As modern vehicle telematics grow, manufacturers commoditize continuous driving metrics. Insurance syndicates, credit agencies, and municipal servers routinely purchase live acceleration habits directly from cellular-connected auto frameworks.
              </p>

              <p className="text-gray-400 text-xs leading-relaxed">
                Our approach remains strictly educational and objective. Your vehicle is an extension of your private domain. Astrateq believes that safety mapping shouldn't demand continuous corporate telemetry surveillance. Sourcing CAN bus cycles exclusively for local, private assistance models represents the only clean, forward-thinking solution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-brand-space/10 border border-white/5 space-y-1">
                  <span className="text-white font-medium text-sm font-display block">Zero Cloud Dependencies</span>
                  <span className="text-xs text-gray-500">Telemetry computations happen locally inside the vehicle cab.</span>
                </div>
                <div className="p-4 rounded-xl bg-brand-space/10 border border-white/5 space-y-1">
                  <span className="text-white font-medium text-sm font-display block">Anonymized Local Loops</span>
                  <span className="text-xs text-gray-500">Your trip sequences are never compiled into centralized profiles.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 7: LOCAL PROCESSING VS CLOUD PROCESSING COMPARISON */}
        <section id="section-cloud-vs-edge" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 07 // DETAILED COMPARISON</div>
            <h2 className="text-3xl font-display font-medium text-white tracking-tight">
              Local Processing vs. Cloud Processing
            </h2>
            <p className="text-gray-300 text-sm">
              Discover why privacy-first edge intelligence hardware represents the next stage of automotive technology compared to traditional cloud setups.
            </p>
          </div>

          <div id="comparison-table-wrapper" className="overflow-x-auto rounded-2xl border border-white/10 bg-brand-space/10 backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/15 bg-brand-space/35">
                  <th className="p-5 font-mono text-xs uppercase tracking-wider text-gray-300">Operational Metric</th>
                  <th className="p-5 font-mono text-xs uppercase tracking-wider text-gray-400">Traditional Cloud Systems</th>
                  <th className="p-5 font-mono text-xs uppercase tracking-wider text-brand-cyan bg-brand-cyan/5">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Sparkles className="h-3 w-3 text-brand-cyan animate-pulse" />
                      Astrateq Philosophy (Local Edge)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-xs">
                {[
                  {
                    metric: "Data Ownership",
                    cloud: "Shared. Telematics are commercialized and purchased by third party agencies.",
                    edge: "100% Private. Outward vision and CAN logs stay isolated to local SSD arrays."
                  },
                  {
                    metric: "Network Dependency",
                    cloud: "Heavy. System fails in mountain coordinates or deep Canadian forest loops.",
                    edge: "Self-Contained. Compute structures process fully offline inside the vehicle cabin."
                  },
                  {
                    metric: "Signal Latency",
                    cloud: "High (200ms – 1.5s). Data must query cell stacks, remote servers, and database APIs.",
                    edge: "Instantaneous (1ms – 5ms). Signal processing operates at the physical cable connector."
                  },
                  {
                    metric: "Standby Battery Drain",
                    cloud: "Micro-drains. Continuously wakes up modern ECUs to push telemetry heartbeats.",
                    edge: "Intelligent. Power limits cycle down to standby states when ignition ceases."
                  },
                  {
                    metric: "Secure Compliance",
                    cloud: "Corporate Risk. Vulnerable to server breaches, data broker laws, and telemetry subpoenas.",
                    edge: "Absolute Firewall. Data can never be leaked because it is never gathered centrally."
                  },
                  {
                    metric: "Software Longevity",
                    cloud: "Limited. Ceases functioning if manufacturer drops APIs or updates server pricing.",
                    edge: "Permanent. Code stack loops independently of remote authorization keys."
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-medium text-white font-display text-sm">{row.metric}</td>
                    <td className="p-5 text-gray-400 leading-relaxed max-w-sm">{row.cloud}</td>
                    <td className="p-5 text-gray-200 bg-brand-cyan/5 leading-relaxed max-w-sm font-medium border-l border-brand-cyan/25">
                      <div className="flex gap-2 items-start">
                        <Check className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" />
                        <span>{row.edge}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 8: WHAT MAKES A VEHICLE ASTRATEQ READY & BRAND EXPLORER */}
        <section id="section-astrateq-ready" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase">SECTION 08 // TECHNICAL METRICS</div>
            <h2 className="text-3xl font-display font-medium text-white tracking-tight">
              What Makes a Vehicle Astrateq Ready?
            </h2>
            <p className="text-gray-300 text-sm">
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
              <div key={index} className="p-6 rounded-xl bg-brand-space/30 border border-white/5 hover:border-brand-cyan/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium font-display tracking-tight text-base">{item.title}</h4>
                    <span className="font-mono text-[9px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-cyan uppercase tracking-wider font-bold">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-brand-cyan font-mono text-[10px] uppercase mt-6 pt-4 border-t border-white/5">
                  <Check className="h-3 w-3" />
                  <span>Validation Passed Standard</span>
                </div>
              </div>
            ))}
          </div>

          {/* BRAND EXPLORER COMPONENT */}
          <div className="bg-brand-space/25 border border-white/10 rounded-2xl p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
                  <Cpu className="h-4.5 w-4.5 text-brand-cyan" />
                  Canadian Vehicle Architecture Registry
                </h3>
                <p className="text-xs text-gray-400">
                  Search standard Canadian imports to access standard diagnostic layouts and estimated hardware compatibility.
                </p>
              </div>
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="vehicle-search"
                  type="text"
                  placeholder="Filter brands (e.g., Volvo, Toyota)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-midnight/80 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20"
                />
              </div>
            </div>

            {/* Simulated Data Grid */}
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left font-mono text-xs text-gray-400">
                <thead>
                  <tr className="bg-brand-midnight/90 text-gray-300 border-b border-white/10">
                    <th className="p-4">Brand / Model Variant</th>
                    <th className="p-4">OBD Location</th>
                    <th className="p-4">Standard Bus Protocol</th>
                    <th className="p-4">Electrical Delivery</th>
                    <th className="p-4 text-center">Score Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-medium text-white text-sm">{row.name}</td>
                        <td className="p-4 text-[11px] font-mono leading-relaxed">{row.obdLocation}</td>
                        <td className="p-4 text-[11px] text-brand-cyan">{row.protocol}</td>
                        <td className="p-4 text-xs">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            row.voltageStability === 'Ultra-Stable' 
                              ? 'bg-purple-950 text-purple-300' 
                              : 'bg-indigo-950 text-indigo-300'
                          }`}>
                            {row.voltageStability}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            row.readinessScore >= 92 
                              ? 'text-emerald-400 font-bold bg-emerald-950/20' 
                              : 'text-brand-cyan font-bold bg-brand-cyan/5'
                          }`}>
                            {row.readinessScore}%
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
        <section id="section-future-intelligence" className="mb-24 py-16 px-8 rounded-2xl bg-gradient-to-tr from-brand-midnight via-brand-space/30 to-brand-midnight border border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full text-brand-cyan text-xs font-mono tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE HORIZON OF INTELLIGENT TRAVEL</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
              The Future of Vehicle Intelligence
            </h2>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              We envision a future where driver assistance systems aren't reliant on corporate service subscription pricing or commercial telemetry leaks. Sourcing local diagnostic speeds, high-temp vision parameters, and offline road databases can keep drivers completely secure.
            </p>

            <p className="text-gray-400 text-xs leading-relaxed max-w-xl mx-auto">
              Through local machine learning model configurations, Astrateq Gadgets is designing high-precision driver safety environments, passive vibration detection indices, and early thermographic brake feedback entirely within localized system architectures.
            </p>

            <div className="flex justify-center gap-12 pt-8">
              {[
                { label: 'Local-First AI loops', val: '100% Offline' },
                { label: 'Telemetry Protection', val: 'Absolute' },
                { label: 'Canadian Designed', val: 'Arctic Grade' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-display font-medium text-white">{item.val}</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: LEAD CAPTURE SECTION */}
        <section id="lead-capture-section" className="mb-12 scroll-mt-24" ref={leadSectionRef}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Lead capture form */}
            <div className="lg:col-span-7 bg-brand-space border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="inline-block text-[11px] font-mono text-brand-cyan tracking-widest uppercase mb-2">EDUCATIONAL LEAD GATEWAY</div>
                  <h3 className="text-2xl font-display font-medium text-white tracking-tight">
                    Get the Comprehensive Guide
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed mt-1">
                    Receive a high-resolution, bookmarkable PDF edition of the Complete Vehicle Compatibility &amp; Safety Guide. You will also register for future hardware releases, firmware revisions, and Canadian beta access updates safely.
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-mono uppercase tracking-wider text-gray-400">First Name</label>
                        <input
                          id="lead-name"
                          type="text"
                          required
                          placeholder="Arthur"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full bg-brand-midnight/90 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-mono uppercase tracking-wider text-gray-400">Email Address Address</label>
                        <input
                          id="lead-email"
                          type="email"
                          required
                          placeholder="arthur@algonquin.ca"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full bg-brand-midnight/90 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        id="btn-submit-lead"
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 rounded-xl bg-brand-cyan text-brand-midnight font-medium text-sm hover:bg-white hover:shadow-cyan-glow transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
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
                            <Mail className="h-4.5 w-4.5 text-brand-midnight" />
                            <span>Send Me The Complete Report</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-500 font-mono leading-relaxed pt-2">
                      🔒 PRIVACY DECLARATION: Astrateq Gadgets operates on strict GDPR &amp; PIPEDA data compliance policies. Your communications are fully isolated. No broker disclosures ever.
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
                        <h4 className="text-white font-semibold text-sm font-display">Database Validation Confirmed</h4>
                        <span className="text-[10px] font-mono text-gray-500">MEMBER ID ENROLLED // AST-902-88</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {submitSuccessMsg}
                    </p>

                    <div className="bg-brand-midnight/80 p-3 rounded border border-white/5 font-mono text-[9.5px] text-gray-400 space-y-1.5 leading-normal">
                      <span className="text-brand-cyan font-bold block">RECIPIENT DEV LOG GATEWAY:</span>
                      <span>// Initialized dispatch protocol: SMTP wrapper...</span> <br />
                      <span>// Payload identifier: Astrateq-Compatibility-Safety-Guide.pdf</span> <br />
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
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-space/50 via-brand-midnight to-brand-space/30 border border-white/10 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden text-left shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="h-10 w-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                  <Car className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-display font-medium text-white tracking-tight">
                    Secure Your Priority Access
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Astrateq Gadgets' initial hardware batches are strictly limited due to precision arctic calibration standards. Reserving your spot registers your priority sequence.
                  </p>
                </div>

                <ul className="text-xs space-y-2.5 text-gray-400 font-sans">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-cyan shrink-0" />
                    <span>Priority hardware batch sequencing allocation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-cyan shrink-0" />
                    <span>Access to Canadian closed beta vision algorithms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-cyan shrink-0" />
                    <span>Inviolable pricing priority protection</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 space-y-3">
                <a
                  id="btn-claim-reservation"
                  href="https://astrateqgadgets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-white text-brand-midnight font-bold text-center text-sm hover:bg-brand-cyan hover:shadow-cyan-glow transition-all duration-300 active:scale-95 block"
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

      </main>

      {/* DETAILED PREMIUM TECHNICAL FOOTER */}
      <footer id="guide-footer" className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                <span className="text-brand-cyan font-display font-medium text-sm tracking-widest">A</span>
              </div>
              <span className="text-white font-display font-medium tracking-wide">Astrateq Gadgets</span>
            </div>
            
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-sans">
              Producers of privacy-first edge intelligence hardware, diagnostic software modules, and cold-weather computer interfaces designed specifically for Canadian drivers.
            </p>
            
            <span className="text-[10px] text-gray-600 block font-mono">
              © 2026 Astrateq Gadgets. Built For Canadian Roads. All rights reserved.
            </span>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs uppercase font-mono text-gray-300 tracking-wider">Educational Guides</h5>
            <ul className="text-xs space-y-2 text-gray-500 font-sans">
              <li>
                <a href="#section-understanding-obd" className="hover:text-brand-cyan transition-colors">OBD-II Sniffer Science</a>
              </li>
              <li>
                <a href="#section-vehicles-evolved" className="hover:text-brand-cyan transition-colors">CAN Bus Architecture</a>
              </li>
              <li>
                <a href="#section-canadiandriving" className="hover:text-brand-cyan transition-colors">Arctic Mechanical Gaskets</a>
              </li>
              <li>
                <a href="#section-data-privacy" className="hover:text-brand-cyan transition-colors">PIPED Telemetry Standards</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs uppercase font-mono text-gray-300 tracking-wider">Astrateq Architecture</h5>
            <ul className="text-xs space-y-2 text-gray-500 font-sans">
              <li>
                <a href="/" className="hover:text-brand-cyan transition-colors">Future Platform Homepage</a>
              </li>
              <li>
                <a href="/diagnostics" className="hover:text-brand-cyan transition-colors">Self Diagnostics API</a>
              </li>
              <li>
                <a href="/founding" className="hover:text-brand-cyan transition-colors">Founding Engineers Brief</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-brand-cyan transition-colors">Security Firewalls Charter</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-600">
          <div>
            DOCUMENT REGISTRY ID: <span className="text-gray-400">AST-DVC-2026</span> • CANADIAN GENERAL PUBLICATION ASSIGNMENT
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-brand-cyan transition-colors">PROVINCIAL CONTROLS EXEMPTION</a>
            <span>•</span>
            <span>PIPED COMPLIANT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
