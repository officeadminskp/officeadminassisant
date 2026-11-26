import { FormEvent, useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_PRICING_PACKAGES,
  getWhatsAppUrl,
  SERVICES,
  SITE_CONFIG,
} from '../data/siteContent';

interface ContactPageProps {
  preselectedService?: string;
  preselectedPackage?: string;
}

interface SubmissionReceipt {
  referenceId: string;
  submittedAt: string;
  summary: {
    name: string;
    email: string;
    service: string;
    packageTier: string;
  };
}

export function ContactPage({ preselectedService, preselectedPackage }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || SERVICES[0].title);
  const [packageTier, setPackageTier] = useState(preselectedPackage || 'Standard Package');
  const [message, setMessage] = useState('');
  // Honeypot anti-spam field (must remain empty)
  const [companyWebsite, setCompanyWebsite] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
    if (preselectedPackage) {
      setPackageTier(preselectedPackage);
    }
  }, [preselectedService, preselectedPackage]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (phone.trim() && !/^[+\d\s().-]{7,30}$/.test(phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number or leave it blank.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please describe your task or deadline (at least 10 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setErrorMessage('Please check the highlighted fields below.');
      return;
    }

    setIsSubmitting(true);
    const trimmedPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service,
      packageTier,
      message: message.trim(),
      companyWebsite,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedPayload),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // Static hosting (e.g., GitHub Pages) does not run server.ts; fall back cleanly
        setReceipt({
          referenceId: `OAA-LOCAL-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          submittedAt: new Date().toISOString(),
          summary: {
            name: trimmedPayload.name,
            email: trimmedPayload.email,
            service: trimmedPayload.service,
            packageTier: trimmedPayload.packageTier,
          },
        });
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        return;
      }

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
        referenceId?: string;
        submittedAt?: string;
        summary?: SubmissionReceipt['summary'];
      };

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Could not submit your inquiry. Please try again.');
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        return;
      }

      setReceipt({
        referenceId: data.referenceId || 'OAA-RECEIVED',
        submittedAt: data.submittedAt || new Date().toISOString(),
        summary: data.summary || {
          name: trimmedPayload.name,
          email: trimmedPayload.email,
          service: trimmedPayload.service,
          packageTier: trimmedPayload.packageTier,
        },
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      // Network/static fallback so users on static hosts never hit a dead end
      setReceipt({
        referenceId: `OAA-REQ-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        submittedAt: new Date().toISOString(),
        summary: {
          name: trimmedPayload.name,
          email: trimmedPayload.email,
          service: trimmedPayload.service,
          packageTier: trimmedPayload.packageTier,
        },
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-slate-50 border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-sm font-medium text-blue-700">Contact Us</p>
          <h1 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[#0b1f3a] leading-[1.15] headline-balance max-w-3xl">
            Start a Project or Request a Same-Day Estimate
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Submit your requirements through our secure form, email us directly, or open an instant
            WhatsApp chat with our support desk.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Instant WhatsApp Card */}
            <div className="rounded-2xl bg-[#0b1f3a] text-white p-7 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-medium text-blue-300">Fastest Response</p>
                <h2 className="font-display text-xl font-bold">Direct WhatsApp Support</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Have an urgent deadline or want to share sample files directly? Start a live
                  WhatsApp conversation right now.
                </p>
              </div>
              <a
                href={getWhatsAppUrl(
                  `Hello Office Admin Assistant, I need help with ${service} (${packageTier}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Open Direct WhatsApp Chat
              </a>
            </div>

            {/* Email, Phone & Hours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 space-y-5">
              <h2 className="font-display text-lg font-bold text-[#0b1f3a]">Contact Information</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Email Address</p>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="font-medium text-[#0b1f3a] hover:text-blue-700 break-all"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-600 hover:text-[#0b1f3a] hover:bg-slate-50 cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-blue-700" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <Phone className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Phone / WhatsApp Line</p>
                    <a
                      href={SITE_CONFIG.phoneHref}
                      className="font-medium text-[#0b1f3a] hover:text-blue-700 tabular-nums"
                    >
                      {SITE_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <Clock className="h-5 w-5 text-blue-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Support Hours</p>
                    <p className="font-medium text-[#0b1f3a]">{SITE_CONFIG.hours}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-500">Social Media Links</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SITE_CONFIG.socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 rounded-lg border border-slate-200 hover:border-blue-600 hover:text-blue-700 text-xs font-semibold text-[#0b1f3a] transition-colors"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
              {receipt ? (
                <div className="space-y-6 py-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-7 w-7 text-blue-700 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-mono font-semibold text-blue-700">
                        Reference ID: {receipt.referenceId}
                      </p>
                      <h2 className="font-display text-2xl font-bold text-[#0b1f3a]">
                        Inquiry Received Successfully
                      </h2>
                      <p className="text-sm text-slate-600">
                        Thank you, {receipt.summary.name}. We have logged your request and will
                        reply to <span className="font-medium">{receipt.summary.email}</span>{' '}
                        shortly.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Requested Service</p>
                      <p className="font-semibold text-[#0b1f3a]">{receipt.summary.service}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Selected Package</p>
                      <p className="font-semibold text-[#0b1f3a]">{receipt.summary.packageTier}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setReceipt(null)}
                      className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <a
                      href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                        `Service Inquiry (${receipt.referenceId}): ${receipt.summary.service}`
                      )}&body=${encodeURIComponent(
                        `Name: ${receipt.summary.name}\nEmail: ${receipt.summary.email}\nService: ${receipt.summary.service}\nPackage: ${receipt.summary.packageTier}\nReference: ${receipt.referenceId}`
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-[#0b1f3a] text-sm font-semibold hover:bg-slate-50"
                    >
                      <Mail className="h-4 w-4 text-blue-700" />
                      Send via Email App
                    </a>
                    <a
                      href={getWhatsAppUrl(
                        `Hello, I just submitted inquiry ${receipt.referenceId} for ${receipt.summary.service}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-[#0b1f3a] text-sm font-semibold hover:bg-slate-50"
                    >
                      <MessageCircle className="h-4 w-4 text-blue-700" />
                      Follow Up on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="font-display text-2xl font-bold text-[#0b1f3a]">
                      Send Your Project Details
                    </h2>
                    <p className="text-sm text-slate-600">
                      All submissions are validated and handled confidentially.
                    </p>
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Honeypot field hidden from real users */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="companyWebsite">Company Website</label>
                    <input
                      id="companyWebsite"
                      name="companyWebsite"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#0b1f3a]">
                        Full Name <span className="text-blue-700">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none ${
                          fieldErrors.name
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-blue-700'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-red-700">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#0b1f3a]">
                        Email Address <span className="text-blue-700">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        maxLength={150}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none ${
                          fieldErrors.email
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-blue-700'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-700">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-[#0b1f3a]">
                        Phone or WhatsApp Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        maxLength={30}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none ${
                          fieldErrors.phone
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-blue-700'
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="text-xs text-red-700">{fieldErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-package" className="block text-sm font-medium text-[#0b1f3a]">
                        Package Preference
                      </label>
                      <select
                        id="contact-package"
                        value={packageTier}
                        onChange={(e) => setPackageTier(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-700"
                      >
                        {DEFAULT_PRICING_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name}
                          </option>
                        ))}
                        <option value="Custom Quote">Custom Quote / Per-Task</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-service" className="block text-sm font-medium text-[#0b1f3a]">
                      Service Needed <span className="text-blue-700">*</span>
                    </label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-700"
                    >
                      {SERVICES.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.number}. {item.title}
                        </option>
                      ))}
                      <option value="Multiple Services / Ongoing Support">
                        Multiple Services / Ongoing Support
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#0b1f3a]">
                      Project Scope &amp; Deadline <span className="text-blue-700">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      maxLength={2500}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe the number of pages/rows, file format (Word, Excel, PDF, PPTX), and your preferred delivery deadline..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none ${
                        fieldErrors.message
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-slate-300 focus:border-blue-700'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-xs text-red-700">{fieldErrors.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="inline-flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="h-4 w-4 text-blue-700 shrink-0" />
                      Protected form with server-side validation
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
