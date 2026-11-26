import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ABOUT_CONTENT, KEY_METRICS, PageId, SITE_CONFIG } from '../data/siteContent';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-sm font-medium text-blue-700">About Us</p>
              <h1 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[#0b1f3a] leading-[1.15] headline-balance">
                {ABOUT_CONTENT.missionHeadline}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {ABOUT_CONTENT.missionBody}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                {ABOUT_CONTENT.secondaryBody}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                <ResilientImage
                  src={SITE_CONFIG.logoPath}
                  alt="Office Admin Assistant official brand emblem"
                  fallbackLabel={SITE_CONFIG.brandName}
                  className="w-full h-auto object-contain"
                />
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Online Administrative Partner</span>
                  <span aria-hidden="true">·</span>
                  <span>Serving Clients Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Photo & Who We Serve */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6">
              <div className="h-full min-h-[300px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={ABOUT_CONTENT.teamImage}
                  alt={ABOUT_CONTENT.teamImageAlt}
                  fallbackLabel="Office Admin Specialists"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-blue-700">Who We Support</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1f3a]">
                  Built for Individuals, Students &amp; Growing Teams
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_CONTENT.clientGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl border border-slate-200 p-5 space-y-2 bg-slate-50/50"
                  >
                    <h3 className="font-display text-base font-bold text-[#0b1f3a]">
                      {group.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{group.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quantified Commitment Strip */}
          <div className="mt-14 rounded-xl bg-[#0b1f3a] text-white p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {KEY_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <p className="font-mono text-2xl sm:text-3xl font-semibold text-blue-300 tabular-nums">
                  {metric.value}
                </p>
                <p className="text-sm text-slate-300 leading-snug">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Quality Process */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-medium text-blue-700">How We Work</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1f3a]">
              A Clear Four-Step Delivery Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_CONTENT.workflowSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-3"
              >
                <p className="font-mono text-sm font-semibold text-blue-700 tabular-nums">
                  {item.step}.
                </p>
                <h3 className="font-display text-lg font-bold text-[#0b1f3a]">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-blue-700 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-[#0b1f3a]">
                  Confidentiality &amp; NDA Protection Included
                </h3>
                <p className="text-sm text-slate-600">
                  All spreadsheets, financial records, resumes, and business documents are handled
                  under strict privacy guidelines and never shared with third parties.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Work With Us
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
