import { useState } from 'react';
import { ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { assetPath, PageId, ServiceCategory, SERVICES } from '../data/siteContent';
import { ResilientImage } from '../components/ResilientImage';

interface ServicesPageProps {
  onNavigate: (page: PageId, options?: { service?: string }) => void;
}

const CATEGORIES: ServiceCategory[] = [
  'All',
  'Data & Spreadsheets',
  'Documents & Conversion',
  'Presentations & Career',
  'Virtual & Admin Support',
];

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;
    return (
      matchesCategory &&
      (service.title.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.deliverables.some((d) => d.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="bg-white">
      {/* Header & Visual Showcase */}
      <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm font-medium text-blue-700">Our Services</p>
              <h1 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[#0b1f3a] leading-[1.15] headline-balance">
                Twelve Specialized Office &amp; Administrative Services
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                From high-volume data entry and formula-driven Excel workbooks to polished Word
                reports, PDF conversions, resumes, and daily virtual assistance.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  src={assetPath('src/assets/images/service_excel_data_1795671205384.jpg')}
                  alt="MS Excel financial reporting and data entry"
                  fallbackLabel="Excel Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  src={assetPath('src/assets/images/service_documents_cv_1795671206380.jpg')}
                  alt="MS Word reports and professional CV layout"
                  fallbackLabel="Word & CV Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            <div
              role="tablist"
              aria-label="Filter services by category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl"
            >
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#0b1f3a] text-white'
                        : 'text-slate-600 hover:text-[#0b1f3a] hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                aria-label="Search office assistant services"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Complete Services Grid */}
      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center space-y-3">
              <p className="text-base font-semibold text-[#0b1f3a]">
                No services match “{searchQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium cursor-pointer"
              >
                Show All 12 Services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-6 hover:border-blue-300 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span>{service.category}</span>
                      <span className="font-mono text-blue-700 font-medium tabular-nums">
                        {service.turnaround}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-bold text-[#0b1f3a]">
                      {service.number}. {service.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-slate-100 text-sm text-slate-700">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <p className="text-xs text-slate-500">{service.audience}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact', { service: service.title })}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:border-blue-700 hover:bg-blue-700 hover:text-white text-[#0b1f3a] text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Request This Service
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
