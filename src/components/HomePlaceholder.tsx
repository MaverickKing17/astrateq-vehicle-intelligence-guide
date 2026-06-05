/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  Cpu, 
  ShieldAlert, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Workflow,
  Radio,
  Lock
} from 'lucide-react';
import { AppRoute, RouteConfig } from '../types';

interface HomePlaceholderProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
}

export default function HomePlaceholder({ currentPath, onNavigate }: HomePlaceholderProps) {
  
  const routes: RouteConfig[] = [
    {
      path: '/guides/vehicle-compatibility',
      label: 'Vehicle Compatibility & Safety Guide',
      description: 'The active premium educational publication mapping OBD-II, electrical, and windshield factors.',
      available: true
    },
    {
      path: '/',
      label: 'Astrateq Portal (Future Root Platform)',
      description: 'Central customer reservation portal, user panels, and firmware coordination tools (Future Landing).',
      available: false
    },
    {
      path: '/diagnostics',
      label: 'Diagnostics Terminal & API',
      description: 'Localized self-diagnostic terminal to query vehicle networks in real time (Future Module).',
      available: false
    },
    {
      path: '/founding',
      label: 'Founding Engineer Charter',
      description: 'Direct editorial tracking the edge hardware engineering principles and team profile (Future Module).',
      available: false
    },
    {
      path: '/privacy',
      label: 'Security & Privacy Charter',
      description: 'The PIPEDA, GDPR, and provincial data compliance framework blueprints (Future Module).',
      available: false
    }
  ];

  return (
    <div id="home-placeholder-layout" className="min-h-screen bg-brand-midnight text-brand-silver font-sans py-20 px-6 relative flex flex-col justify-between overflow-hidden">
      {/* Aurora glow indicators */}
      <div className="absolute top-[-100px] left-1/3 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full space-y-16">
        {/* Brand Brief Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/25 px-3.5 py-1 rounded-full text-brand-cyan font-mono text-xs tracking-wider">
            <Radio className="h-3.5 w-3.5 animate-pulse text-brand-cyan" />
            <span>ASTRATEQ ARCHITECTURE REGISTRY</span>
          </div>
          
          <h1 id="placeholder-title" className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Digital Vehicle Intelligence <br />
            <span className="bg-gradient-to-r from-brand-cyan to-blue-200 bg-clip-text text-transparent">Router &amp; Deployment Node</span>
          </h1>
          
          <p id="placeholder-desc" className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome to the Astrateq Gadgets secure portal architecture. This system manages designed localized routes and educational pub layouts for Canadian drivers.
          </p>
        </div>

        {/* Dynamic Route Dashboard List */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">Registered Operational Paths</h3>
          
          <div className="space-y-3">
            {routes.map((route, i) => (
              <div 
                key={route.path}
                className={`p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  route.available 
                    ? 'bg-gradient-to-r from-brand-space to-brand-midnight border-brand-cyan/30 hover:border-brand-cyan text-white shadow-lg shadow-brand-cyan/5' 
                    : route.path === currentPath
                    ? 'border-white/15 bg-brand-space/40'
                    : 'border-white/5 bg-brand-space/10 text-gray-400 hover:border-white/10'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-brand-cyan">{route.path}</span>
                    {!route.available && (
                      <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400 uppercase tracking-widest">
                        Future Spec
                      </span>
                    )}
                    {route.available && (
                      <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan uppercase tracking-widest animate-pulse">
                        Fully Deployed
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-base font-display font-medium text-white group-hover:text-brand-cyan transition-colors">
                    {route.label}
                  </h4>
                  
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                    {route.description}
                  </p>
                </div>

                <div className="shrink-0">
                  {route.available ? (
                    <button
                      onClick={() => onNavigate(route.path)}
                      className="px-4 py-2 rounded-xl bg-brand-cyan hover:bg-white text-brand-midnight font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-brand-cyan/10 active:scale-95 cursor-pointer"
                    >
                      <span>Explore Active Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate(route.path)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-medium text-xs flex items-center gap-1.5 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <span>View Specifications</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic specification visual logic for Future Nodes */}
        {currentPath !== '/guides/vehicle-compatibility' && currentPath !== '/' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-brand-space/35 border border-white/10 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-brand-cyan/15 flex items-center justify-center text-brand-cyan">
                {currentPath === '/diagnostics' && <Cpu className="h-5 w-5" />}
                {currentPath === '/founding' && <Workflow className="h-5 w-5" />}
                {currentPath === '/privacy' && <Lock className="h-5 w-5" />}
              </div>
              <div>
                <span className="text-xs font-mono text-brand-cyan uppercase block">Simulated Architectural Sandbox</span>
                <h4 className="text-white font-medium font-display tracking-tight text-sm">
                  {currentPath === '/diagnostics' && 'System Node: Local Diagnostics Framework'}
                  {currentPath === '/founding' && 'System Node: Founding Team Editorial & Manifesto'}
                  {currentPath === '/privacy' && 'System Node: Security Firewall & Data Sovereignty'}
                </h4>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              {currentPath === '/diagnostics' && 'Planned specification slot. This terminal will link with standard automotive telemetry protocols directly through customized passive diagnostic cables. It coordinates with real-time logging hooks to track systemic warnings before mechanical components fail.'}
              {currentPath === '/founding' && 'Detailed historical document containing the profiles of our engineers, design principles regarding military-spec cold tolerance, and the corporate manifesto supporting absolute driver sovereignty.'}
              {currentPath === '/privacy' && 'A comprehensive document detailing localized regulatory compliance frameworks, outlining why zero customer logging keeps drivers safe from continuous private telemetry broker monitoring.'}
            </p>

            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2 text-[10.5px] font-mono text-gray-500 uppercase">
              <span>PATH DEPLOYMENT CODE: DISP-{currentPath.replace('/', '').toUpperCase() || 'ROOT'}-2026-REF</span>
              <button 
                onClick={() => onNavigate('/guides/vehicle-compatibility')}
                className="text-brand-cyan hover:underline hover:text-white transition-colors text-left"
              >
                Go to Fully Deployed Vehicle Compatibility Guide →
              </button>
            </div>
          </motion.div>
        )}

        {/* Brand visual statement */}
        <div className="p-6 bg-brand-space/10 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-brand-cyan shrink-0" />
            <div className="text-left">
              <span className="text-white font-semibold font-display text-sm block">Astrateq Gadgets Vision Statement</span>
              <span className="text-xs text-gray-500 font-sans block">Drive Safer. Drive Smarter. Privacy-First Edge Intelligence.</span>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate('/guides/vehicle-compatibility')}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-brand-cyan text-brand-midnight font-bold font-sans text-xs tracking-wide hover:bg-white hover:shadow-cyan-glow transition-all py-3 active:scale-95"
          >
            Launch Active Guide
          </button>
        </div>
      </div>

      <footer className="text-center text-[10px] font-mono text-gray-600 mt-16 max-w-3xl mx-auto pt-6 border-t border-white/5 w-full">
        🍁 DOCUMENT ISSUED BY DEPLOYMENT PORTAL DIRECTIVE • ENGINERED FOR CANADIAN DRIVING INFRASTRUCTURES
      </footer>
    </div>
  );
}
