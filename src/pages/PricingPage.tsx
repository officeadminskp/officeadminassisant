import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, Pencil, RotateCcw, Save } from 'lucide-react';
import {
  DEFAULT_PRICING_PACKAGES,
  getWhatsAppUrl,
  PageId,
  PricingPackage,
} from '../data/siteContent';

interface PricingPageProps {
  onNavigate: (page: PageId, options?: { packageName?: string }) => void;
}

type CurrencyCode = 'USD' | 'EUR' | 'GBP';

const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

const STORAGE_KEY = 'oaa_editable_pricing_v1';

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [packages, setPackages] = useState<PricingPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PricingPackage[];
        if (Array.isArray(parsed) && parsed.length === 3) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_PRICING_PACKAGES;
  });

  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
    } catch {
      // Ignore storage errors
    }
  }, [packages]);

  const formatConvertedPrice = (usdPrice: number) => {
    const { symbol, rate } = CURRENCY_CONFIG[currency];
    const converted = Math.round(usdPrice * rate);
    return `${symbol}${converted}`;
  };

  const updatePackageField = (
    pkgId: string,
    field: 'priceUsd' | 'billingCycle' | 'turnaround' | 'subtitle',
    value: string | number
  ) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === pkgId ? { ...pkg, [field]: value } : pkg))
    );
  };

  const updateFeatureItem = (pkgId: string, index: number, value: string) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id !== pkgId) return pkg;
        const nextFeatures = [...pkg.features];
        nextFeatures[index] = value;
        return { ...pkg, features: nextFeatures };
      })
    );
  };

  const handleResetDefaults = () => {
    setPackages(DEFAULT_PRICING_PACKAGES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="bg-white">
      {/* Header & Toolbar */}
      <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium text-blue-700">Pricing Packages</p>
            <h1 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[#0b1f3a] leading-[1.15] headline-balance">
              Clear, Editable Packages for Every Workload
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Choose between one-time project packages or monthly virtual assistant support. Use the
              currency selector or switch on Edit Mode to customize package prices and line items.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Currency Switcher */}
            <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl">
              {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    currency === code
                      ? 'bg-[#0b1f3a] text-white'
                      : 'text-slate-600 hover:text-[#0b1f3a]'
                  }`}
                >
                  {code} ({CURRENCY_CONFIG[code].symbol})
                </button>
              ))}
            </div>

            {/* Editable Pricing Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  isEditing
                    ? 'bg-blue-700 border-blue-700 text-white'
                    : 'bg-white border-slate-300 text-[#0b1f3a] hover:bg-slate-50'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Done Editing Rates
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4" />
                    Edit Prices &amp; Details
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-600 hover:text-[#0b1f3a] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Defaults
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const displayPrice = formatConvertedPrice(pkg.priceUsd);
              const whatsappInquiry = `Hello Office Admin Assistant, I am interested in the ${pkg.name} (${displayPrice} ${pkg.billingCycle}).`;

              return (
                <article
                  key={pkg.id}
                  className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-8 ${
                    pkg.featured
                      ? 'border-2 border-blue-700 bg-slate-50/60'
                      : 'border border-slate-200 bg-white'
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display text-xl font-bold text-[#0b1f3a]">{pkg.name}</h2>
                      {pkg.featured && (
                        <span className="text-xs font-semibold text-blue-700">Recommended</span>
                      )}
                    </div>

                    {isEditing ? (
                      <textarea
                        value={pkg.subtitle}
                        onChange={(e) => updatePackageField(pkg.id, 'subtitle', e.target.value)}
                        rows={2}
                        aria-label={`${pkg.name} description`}
                        className="w-full rounded-lg border border-blue-300 bg-white p-2.5 text-sm text-slate-700 focus:outline-none focus:border-blue-700"
                      />
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed">{pkg.subtitle}</p>
                    )}

                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      {isEditing ? (
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-slate-500">
                            Base Price (USD)
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={99999}
                            value={pkg.priceUsd}
                            onChange={(e) =>
                              updatePackageField(
                                pkg.id,
                                'priceUsd',
                                Math.max(1, Number(e.target.value) || 0)
                              )
                            }
                            className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 font-mono text-lg font-bold text-[#0b1f3a] tabular-nums focus:outline-none focus:border-blue-700"
                          />
                          <label className="block text-xs font-medium text-slate-500">
                            Billing Scope
                          </label>
                          <input
                            type="text"
                            value={pkg.billingCycle}
                            onChange={(e) =>
                              updatePackageField(pkg.id, 'billingCycle', e.target.value)
                            }
                            className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-700"
                          />
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-4xl font-bold text-[#0b1f3a] tabular-nums">
                            {displayPrice}
                          </span>
                          <span className="text-xs text-slate-500">{pkg.billingCycle}</span>
                        </div>
                      )}

                      {isEditing ? (
                        <input
                          type="text"
                          value={pkg.turnaround}
                          onChange={(e) => updatePackageField(pkg.id, 'turnaround', e.target.value)}
                          aria-label={`${pkg.name} turnaround`}
                          className="w-full rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-medium text-blue-700 focus:outline-none focus:border-blue-700"
                        />
                      ) : (
                        <p className="text-xs font-medium text-blue-700">{pkg.turnaround}</p>
                      )}
                    </div>

                    <ul className="space-y-3 pt-2 border-t border-slate-200 text-sm text-slate-700">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeatureItem(pkg.id, index, e.target.value)}
                              aria-label={`${pkg.name} feature ${index + 1}`}
                              className="w-full rounded-md border border-blue-300 bg-white px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-700"
                            />
                          ) : (
                            <span>{feature}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('contact', { packageName: pkg.name })}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                        pkg.featured
                          ? 'bg-blue-700 hover:bg-blue-800 text-white'
                          : 'bg-[#0b1f3a] hover:bg-[#132d52] text-white'
                      }`}
                    >
                      Choose {pkg.name}
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <a
                      href={getWhatsAppUrl(whatsappInquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 text-[#0b1f3a] text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 text-blue-700" />
                      Order via WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Custom Quote Note */}
          <div className="mt-14 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h3 className="font-display text-lg font-bold text-[#0b1f3a]">
                Need a Custom Per-Page or High-Volume Enterprise Rate?
              </h3>
              <p className="text-sm text-slate-600">
                For bulk PDF conversions, multi-thousand-row data migrations, or ongoing full-time
                virtual assistant coverage, request a tailored project estimate.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact', { packageName: 'Custom Quote' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Custom Quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
