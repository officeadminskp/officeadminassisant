/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { PageId } from './data/siteContent';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageId[] = ['home', 'about', 'services', 'pricing', 'portfolio', 'contact'];

const PAGE_TITLES: Record<PageId, string> = {
  home: 'Office Admin Assistant – Professional Office & Admin Support',
  about: 'About Us – Office Admin Assistant',
  services: 'Our Services – Office Admin Assistant',
  pricing: 'Pricing Packages – Office Admin Assistant',
  portfolio: 'Portfolio & Case Studies – Office Admin Assistant',
  contact: 'Contact Us – Office Admin Assistant',
};

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = getInitialPage();
      setCurrentPage(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback(
    (page: PageId, options?: { service?: string; packageName?: string }) => {
      if (options?.service) {
        setPreselectedService(options.service);
      }
      if (options?.packageName) {
        setPreselectedPackage(options.packageName);
      }
      setCurrentPage(page);
      if (window.location.hash !== `#${page}`) {
        window.history.pushState(null, '', `#${page}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <Navbar currentPage={currentPage} onNavigate={(page) => navigate(page)} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && <HomePage onNavigate={navigate} />}
              {currentPage === 'about' && <AboutPage onNavigate={(page) => navigate(page)} />}
              {currentPage === 'services' && <ServicesPage onNavigate={navigate} />}
              {currentPage === 'pricing' && <PricingPage onNavigate={navigate} />}
              {currentPage === 'portfolio' && <PortfolioPage onNavigate={navigate} />}
              {currentPage === 'contact' && (
                <ContactPage
                  preselectedService={preselectedService}
                  preselectedPackage={preselectedPackage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={(page) => navigate(page)} />
        <WhatsAppWidget />
      </div>
    </MotionConfig>
  );
}
