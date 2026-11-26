import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/siteContent';

export function WhatsAppWidget() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat directly on WhatsApp with Office Admin Assistant"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-12 px-4 rounded-full bg-[#0b1f3a] hover:bg-blue-700 text-white shadow-lg border border-blue-500/30 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <MessageCircle className="h-5 w-5 text-blue-300 shrink-0" />
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
        WhatsApp Chat
      </span>
    </a>
  );
}
