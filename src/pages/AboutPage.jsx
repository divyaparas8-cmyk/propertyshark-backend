import React from 'react';
import { Header } from '../components/common/Header';
import { Building2, Shield, Database, CheckCircle2 } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      <Header transparent={false} />

      <div className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent flex items-center justify-center text-white font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">About Property Intelligence</h1>
              <p className="text-sm text-gray-500 font-medium">NYC Verified Public Data Engine</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-base">
            Property Intelligence is a SaaS platform engineered for real estate developers, investors, urban planners, and analysts researching New York City real estate properties.
          </p>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-brand-accent" />
              <span>Integrated NYC Open Data APIs</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-gray-700">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-brand-accent font-bold block">NYC PLUTO (64uk-42ks)</span>
                Primary tax lot & building footprint boundaries
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-brand-accent font-bold block">Assessment Roll (8y4t-faws)</span>
                10-year market value & taxable assessment rolls
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-brand-accent font-bold block">DOB Permits (ic3t-wcy2)</span>
                Department of Building alteration & work permits
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-brand-accent font-bold block">ACRIS Master & Deeds (bnx9-e6tj)</span>
                Recorded title deeds, mortgages, and parties
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>Strict Data Integrity Rule</span>
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Property Intelligence strictly adheres to empirical data reporting standards. Fields that cannot be verified against official public feeds explicitly state <span className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">Not Found</span>, <span className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">Calculated</span>, or <span className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">Not Verified</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
