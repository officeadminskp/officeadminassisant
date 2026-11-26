import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId, SITE_CONFIG } from '../data/siteContent';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Our Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single clean Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-lg font-bold tracking-tight text-[#0b1f3a] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 rounded-sm"
        >
          {SITE_CONFIG.brandName}
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
                  isActive
                    ? 'text-blue-700'
                    : 'text-slate-600 hover:text-[#0b1f3a]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-blue-700 transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Contact Us
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg border border-slate-200 text-[#0b1f3a] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0b1f3a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="w-full py-3 px-4 rounded-lg text-base font-medium text-white bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
