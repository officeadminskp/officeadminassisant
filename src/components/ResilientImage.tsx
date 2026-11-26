import { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Office Admin Assistant',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0b1f3a] via-[#132d52] to-[#1d4ed8] text-white p-6 text-center ${className}`}
      >
        <FileSpreadsheet className="h-9 w-9 text-blue-200 mb-3" strokeWidth={1.5} />
        <span className="text-sm font-medium text-blue-50">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
