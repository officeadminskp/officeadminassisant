import { ArrowRight, CheckCircle2, FileText, MessageCircle, ShieldCheck, Table2 } from 'lucide-react';
import {
  DEFAULT_PRICING_PACKAGES,
  getWhatsAppUrl,
  HERO_CONTENT,
  KEY_METRICS,
  PageId,
  PORTFOLIO_CASES,
  SERVICES,
  TESTIMONIALS,
} from '../data/siteContent';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageId, options?: { service?: string; packageName?: string }) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredCases = PORTFOLIO_CASES.slice(0, 2);

  return (
    <div>
      {/* 1. Hero Proposition */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-sm font-medium text-blue-700 tracking-tight">
                Online Administrative &amp; Office Support · Worldwide Service
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.45rem)] font-bold tracking-tight leading-[1.12] text-[#0b1f3a] headline-balance">
                {HERO_CONTENT.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {HERO_CONTENT.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  {HERO_CONTENT.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[#0b1f3a] text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1f3a]"
                >
                  {HERO_CONTENT.secondaryCta}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={HERO_CONTENT.heroImage}
                  alt={HERO_CONTENT.heroImageAlt}
                  fallbackLabel="Modern Office Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-Column Quantitative Proof Strip */}
          <div className="mt-12 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {KEY_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <p className="font-mono text-2xl sm:text-3xl font-medium text-[#0b1f3a] tabular-nums">
                  {metric.value}
                </p>
                <p className="text-sm text-slate-600 leading-snug">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Capabilities Bento Overview */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-medium text-blue-700">12 Specialized Disciplines</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0b1f3a] headline-balance">
                Structured Office Support for Individuals, Students &amp; Businesses
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              View All 12 Services
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wide Marquee Card 1: Data & Excel */}
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>01. Data &amp; Spreadsheets</span>
                    <span aria-hidden="true">·</span>
                    <span>12–24 hr Turnaround</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0b1f3a]">
                    Data Entry, MS Excel Management &amp; Copy-Paste Operations
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Clean CRM records, formula-driven workbooks, pivot reporting, and high-volume
                    catalog transfers verified line by line for error-free totals.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                      <span>Data Entry Services &amp; Copy-Paste Work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                      <span>MS Excel Data Management, Formulas &amp; Dashboards</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-white">
                  <ResilientImage
                    src="/src/assets/images/service_excel_data_1795671205384.jpg"
                    alt="Excel data management and financial spreadsheets on a laptop"
                    fallbackLabel="MS Excel Data Management"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Narrow Card 2: Virtual & Research */}
            <div className="rounded-xl border border-[#132d52] bg-[#0b1f3a] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-200">
                  <span>02. Virtual &amp; Admin Support</span>
                  <span aria-hidden="true">·</span>
                  <span>Daily Coverage</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Virtual Assistant, Email Management &amp; Internet Research
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Keep your inbox organized, schedules coordinated, and competitor or supplier
                  research compiled into clean actionable sheets.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('contact', { service: 'Virtual Assistant Services' })}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#132d52] hover:bg-blue-700 text-sm font-medium text-white transition-colors cursor-pointer"
              >
                <span>Book Virtual Support</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Narrow Card 3: Presentations & Career */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>03. Career &amp; Decks</span>
                  <span aria-hidden="true">·</span>
                  <span>24–48 hr Turnaround</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#0b1f3a]">
                  CV / Resume Making &amp; PowerPoint Presentations
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  ATS-friendly resumes for job seekers and boardroom-ready PowerPoint slide decks
                  aligned to your visual identity.
                </p>
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200">
                <ResilientImage
                  src="/src/assets/images/portfolio_presentation_desk_1795671206898.jpg"
                  alt="Corporate PowerPoint presentation displayed on a meeting room laptop"
                  fallbackLabel="PowerPoint Presentations"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Wide Marquee Card 4: Documents & Conversion */}
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-white">
                  <ResilientImage
                    src="/src/assets/images/service_documents_cv_1795671206380.jpg"
                    alt="Formatted corporate documents and structured resume layouts"
                    fallbackLabel="Document Formatting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>04. Documents &amp; Conversion</span>
                    <span aria-hidden="true">·</span>
                    <span>Print &amp; Cloud Ready</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0b1f3a]">
                    MS Word Formatting, PDF Conversion, Typing &amp; File Management
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Accurate conversion from scanned PDFs to editable Word or Excel, fast document
                    typing, academic styling, and structured cloud folder indexing.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-medium text-[#0b1f3a]">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                      MS Word Formatting
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Table2 className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                      PDF to Word &amp; Excel
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                      Typing Services
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                      File Documentation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complete 12-Service Quick Directory */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 mb-4">
              Complete 12-Service Directory — Click any service to request a quote
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onNavigate('contact', { service: service.title })}
                  className="text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-blue-600 hover:bg-blue-50/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#0b1f3a] group-hover:text-blue-700 truncate">
                      {service.number}. {service.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-700 shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proof of Impact: Portfolio Highlights + Client Testimonials */}
      <section className="py-16 lg:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-blue-700">Verified Delivery</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0b1f3a]">
                Recent Client Work &amp; Measurable Outcomes
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCases.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200 overflow-hidden">
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    fallbackLabel={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.clientType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.timeframe}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0b1f3a]">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-xl font-semibold text-blue-700 tabular-nums">
                        {item.metricValue}
                      </p>
                      <p className="text-xs text-slate-500">{item.metricLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('portfolio')}
                      className="text-sm font-semibold text-[#0b1f3a] hover:text-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      View Case Study
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Client Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {TESTIMONIALS.map((testimonial) => (
              <figure
                key={testimonial.id}
                className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-blue-700">{testimonial.outcome}</p>
                  <blockquote className="text-sm text-slate-700 leading-relaxed">
                    “{testimonial.quote}”
                  </blockquote>
                </div>
                <figcaption className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <span className="block font-semibold text-[#0b1f3a] text-sm">
                    {testimonial.name}
                  </span>
                  <span>
                    {testimonial.role} · {testimonial.organization}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pricing Overview & Final Action */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-blue-700">Transparent Packages</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0b1f3a]">
                Flexible Plans That Scale With Your Workload
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Compare &amp; Customize Packages
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 ${
                  pkg.featured
                    ? 'border-2 border-blue-700 bg-slate-50/70'
                    : 'border border-slate-200 bg-white'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[#0b1f3a]">{pkg.name}</h3>
                    {pkg.featured && (
                      <span className="text-xs font-semibold text-blue-700">Most Popular</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{pkg.subtitle}</p>
                  <div className="pt-1">
                    <span className="font-mono text-3xl font-bold text-[#0b1f3a] tabular-nums">
                      ${pkg.priceUsd}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">{pkg.billingCycle}</span>
                  </div>
                  <ul className="space-y-2.5 pt-3 border-t border-slate-200 text-sm text-slate-700">
                    {pkg.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('contact', { packageName: pkg.name })}
                  className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    pkg.featured
                      ? 'bg-blue-700 hover:bg-blue-800 text-white'
                      : 'border border-slate-300 bg-white hover:bg-slate-50 text-[#0b1f3a]'
                  }`}
                >
                  Select {pkg.name}
                </button>
              </div>
            ))}
          </div>

          {/* Direct Action Callout */}
          <div className="mt-14 rounded-2xl bg-[#0b1f3a] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight headline-balance">
                Ready to Hand Off Your Administrative Workload?
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Send your project requirements today or start an instant WhatsApp conversation for a
                same-day estimate.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Request a Free Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-500 hover:border-white text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
