import { Mail, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl, PageId, SERVICES, SITE_CONFIG } from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1f3a] text-slate-200 border-t border-[#132d52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column with Uploaded Logo */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-xl p-3 inline-block max-w-[260px] border border-slate-200">
              <ResilientImage
                src={SITE_CONFIG.logoPath}
                alt="Office Admin Assistant official brand logo"
                fallbackLabel={SITE_CONFIG.brandName}
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Reliable, accurate, and affordable online administrative support for individuals,
              students, small businesses, and corporate teams worldwide.
            </p>
            <div className="pt-1">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-tight">Pages</h3>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About Us' },
                  { id: 'services', label: 'Our Services' },
                  { id: 'pricing', label: 'Pricing Packages' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'contact', label: 'Contact Us' },
                ] as { id: PageId; label: string }[]
              ).map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-tight">Core Services</h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-tight">Direct Contact</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
                >
                  <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>{SITE_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li className="text-xs text-slate-400 leading-relaxed pt-1">{SITE_CONFIG.hours}</li>
            </ul>

            <div className="pt-2">
              <p className="text-xs font-medium text-slate-400 mb-2">Social Channels</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {SITE_CONFIG.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-blue-400 transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1c3861] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {SITE_CONFIG.brandName}. All rights reserved.
          </p>
          <p>{SITE_CONFIG.location}</p>
        </div>
      </div>
    </footer>
  );
}
