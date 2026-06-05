/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppRoute = 
  | '/' 
  | '/diagnostics' 
  | '/founding' 
  | '/privacy' 
  | '/guides/vehicle-compatibility';

export interface RouteConfig {
  path: AppRoute;
  label: string;
  description: string;
  available: boolean;
}

export interface OBDSensor {
  id: string;
  name: string;
  parameterCode: string; // PID code
  unit: string;
  normalRange: string;
  currentValue: number | string;
  signalHex: string;
  educationalInfo: string;
}

export interface CompatibilityParam {
  id: string;
  name: string;
  options: { label: string; score: number; description: string; value: string }[];
}

export interface VehicleBrandMetrics {
  name: string;
  country: string;
  protocol: string;
  obdLocation: string;
  voltageStability: 'Robust' | 'Variable' | 'Ultra-Stable';
  compatibilityStatus: string; // e.g. 'Highly Aligned', 'Evaluation Recommended'
  notes: string;
}

export interface AssessmentFactor {
  id: string;
  title: string;
  metric: string;
  description: string;
  score: number; // Out of 10
  status: 'optimal' | 'stable' | 'attention';
}

export interface EducationalSection {
  id: string;
  title: string;
  subtitle: string;
  readingTime: string;
}
