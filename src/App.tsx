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
