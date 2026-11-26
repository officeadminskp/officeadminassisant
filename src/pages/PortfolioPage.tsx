import { useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { PageId, PORTFOLIO_CASES, PortfolioCase, ServiceCategory } from '../data/siteContent';
import { ResilientImage } from '../components/ResilientImage';

interface PortfolioPageProps {
  onNavigate: (page: PageId, options?: { service?: string }) => void;
}

const PORTFOLIO_CATEGORIES: ServiceCategory[] = [
  'All',
  'Data & Spreadsheets',
  'Documents & Conversion',
  'Presentations & Career',
  'Virtual & Admin Support',
];

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const [selectedCase, setSelectedCase] = useState<PortfolioCase | null>(null);

  const visibleCases =
    activeCategory === 'All'
      ? PORTFOLIO_CASES
      : PORTFOLIO_CASES.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-white">
      <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium text-blue-700">Portfolio &amp; Case Studies</p>
            <h1 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[#0b1f3a] leading-[1.15] headline-balance">
              Documented Administrative Projects &amp; Client Results
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore sample deliverables across Excel reporting, Word formatting, PDF extraction,
              resume design, PowerPoint decks, and ongoing virtual assistance.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter portfolio projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl w-fit"
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0b1f3a] text-white'
                      : 'text-slate-600 hover:text-[#0b1f3a] hover:bg-slate-50'
                  }`}
                >
                  {category === 'All' ? 'All Work' : category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCases.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 border-b border-slate-200 overflow-hidden">
                    <ResilientImage
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackLabel={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.timeframe}</span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-[#0b1f3a] leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-lg font-bold text-blue-700 tabular-nums">
                      {item.metricValue}
                    </p>
                    <p className="text-xs text-slate-500">{item.metricLabel}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCase(item)}
                    className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-[#0b1f3a] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Case Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          className="fixed inset-0 z-50 bg-[#061326]/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-blue-700">
                  {selectedCase.category} · {selectedCase.clientType}
                </p>
                <h2 id="case-modal-title" className="font-display text-2xl font-bold text-[#0b1f3a]">
                  {selectedCase.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Close case study details"
                className="h-10 w-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200">
              <ResilientImage
                src={selectedCase.image}
                alt={selectedCase.imageAlt}
                fallbackLabel={selectedCase.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-xs text-slate-500">Measured Outcome</p>
                <p className="font-mono text-xl font-bold text-blue-700 tabular-nums">
                  {selectedCase.metricValue}
                </p>
                <p className="text-xs text-slate-600">{selectedCase.metricLabel}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tools &amp; Turnaround</p>
                <p className="text-sm font-semibold text-[#0b1f3a] mt-0.5">{selectedCase.tools}</p>
                <p className="text-xs text-slate-600">{selectedCase.timeframe}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <h3 className="font-semibold text-[#0b1f3a] mb-1">Client Challenge</h3>
                <p className="leading-relaxed">{selectedCase.challenge}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0b1f3a] mb-1">Our Solution</h3>
                <p className="leading-relaxed">{selectedCase.solution}</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0b1f3a] mb-2">Key Deliverables</h3>
                <ul className="space-y-2">
                  {selectedCase.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedCase.title;
                  setSelectedCase(null);
                  onNavigate('contact', { service: title });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold cursor-pointer"
              >
                Request Similar Project
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
