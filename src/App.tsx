/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppRoute } from './types';
import VehicleCompatibilityGuide from './components/VehicleCompatibilityGuide';
import HomePlaceholder from './components/HomePlaceholder';
import { Route, Layout, Compass, Info } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<AppRoute>('/guides/vehicle-compatibility');

  // Align starting path with actual browser location bar
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname as AppRoute;
      
      // If path matches any valid configuration, route to it.
      if (
        path === '/' || 
        path === '/diagnostics' || 
        path === '/founding' || 
        path === '/privacy' || 
        path === '/guides/vehicle-compatibility'
      ) {
        setCurrentPath(path);
      } else {
        // Fallback or automatic redirect to vehicle-compatibility as default for this assignment
        setCurrentPath('/guides/vehicle-compatibility');
      }
    };

    // Listen to manual history changes
    window.addEventListener('popstate', handleLocationChange);
    
    // Check initial path on boot
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Secure path updates pushing to browser history bar
  const navigateTo = (path: AppRoute) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    // Smooth reset viewport scroll to top upon page alteration
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div id="application-router-root" className="min-h-screen bg-brand-midnight text-brand-silver">
      <AnimateRoute currentPath={currentPath} navigateTo={navigateTo} />

      {/* INTELLIGENT DEVELOPER OVERLAY BAR */}
      <div 
        id="dev-route-controller" 
        className="fixed bottom-4 right-4 bg-brand-space/90 backdrop-blur-md border border-brand-cyan/20 px-4 py-3.5 rounded-xl shadow-2xl z-50 text-xs text-brand-silver max-w-sm hidden sm:block"
      >
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
          <Compass className="h-4 w-4 text-brand-cyan animate-pulse" />
          <span className="font-mono font-bold text-white uppercase tracking-wider">Astrateq Route Inspector</span>
        </div>

        <p className="text-[10.5px] text-gray-400 mb-3 leading-relaxed">
          The applet uses a unified dynamic HTML5 History Router. Use the simulated switcher below to hop paths on the fly:
        </p>

        <div className="space-y-1.5 font-mono">
          <div className="text-[10px] text-gray-500 uppercase">ACTIVE PATHWAY:</div>
          <div className="text-brand-cyan font-bold bg-brand-midnight/60 p-2 rounded border border-white/5 text-[11px] truncate select-all mb-3 flex justify-between items-center">
            <span>{currentPath}</span>
            <span className="text-[8px] font-mono font-medium px-2 py-0.5 rounded bg-brand-cyan/15 border border-brand-cyan/20 text-brand-cyan uppercase tracking-widest animate-pulse">
              Live Link
            </span>
          </div>

          <div className="text-[10px] text-gray-500 uppercase mb-1">CHOOSE SYSTEM ENDPOINT:</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <button
              id="dev-nav-guide"
              onClick={() => navigateTo('/guides/vehicle-compatibility')}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentPath === '/guides/vehicle-compatibility' 
                  ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold' 
                  : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
            >
              /vehicle-compatibility
            </button>
            <button
              id="dev-nav-root"
              onClick={() => navigateTo('/')}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentPath === '/' 
                  ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold' 
                  : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
            >
              / (Homepage)
            </button>
            <button
              id="dev-nav-diag"
              onClick={() => navigateTo('/diagnostics')}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentPath === '/diagnostics' 
                  ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold' 
                  : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
            >
              /diagnostics
            </button>
            <button
              id="dev-nav-founding"
              onClick={() => navigateTo('/founding')}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentPath === '/founding' 
                  ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold' 
                  : 'border-white/5 bg-white/5 hover:bg-white/10'
              }`}
            >
              /founding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnimateRouteProps {
  currentPath: AppRoute;
  navigateTo: (path: AppRoute) => void;
}

function AnimateRoute({ currentPath, navigateTo }: AnimateRouteProps) {
  if (currentPath === '/guides/vehicle-compatibility') {
    return <VehicleCompatibilityGuide />;
  }

  return <HomePlaceholder currentPath={currentPath} onNavigate={navigateTo} />;
}
