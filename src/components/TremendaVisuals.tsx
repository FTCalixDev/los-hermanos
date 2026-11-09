import React from 'react';

export type ThumbVariant =
  | 'pizza-4-gustos'
  | 'pizza-muzza'
  | 'pizza-pepperoni'
  | 'pizza-champi'
  | 'pizza-panchos'
  | 'calzon-tremendo'
  | 'faina-crocante'
  | 'fritas-abundantes'
  | 'promo-noche'
  | 'bebidas-heladas'
  | 'helado-crufi';

interface MenuThumbProps {
  variant: ThumbVariant;
  alt: string;
}

/**
 * Renders authentic food thumbnails using real cropped quadrants of Pizzería La Tremenda's
 * signature pizza (/assets/aistudio/image_c3f041fd.png), patio (/assets/aistudio/image_d19aba37.png),
 * logo (/assets/aistudio/image_2dc01ff3.png) and custom high-contrast street-food illustrations.
 */
export const MenuThumb: React.FC<MenuThumbProps> = ({ variant, alt }) => {
  if (variant === 'pizza-4-gustos') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#14141D]">
        <img
          src="/assets/aistudio/image_c3f041fd.png"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center menu-thumb-zoom"
        />
      </div>
    );
  }

  if (variant === 'pizza-pepperoni') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#14141D]">
        <img
          src="/assets/aistudio/image_c3f041fd.png"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[15%_48%] scale-125 menu-thumb-zoom"
        />
      </div>
    );
  }

  if (variant === 'pizza-champi') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#14141D]">
        <img
          src="/assets/aistudio/image_c3f041fd.png"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[50%_72%] scale-125 menu-thumb-zoom"
        />
      </div>
    );
  }

  if (variant === 'pizza-panchos') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#14141D]">
        <img
          src="/assets/aistudio/image_c3f041fd.png"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[85%_35%] scale-125 menu-thumb-zoom"
        />
      </div>
    );
  }

  if (variant === 'pizza-muzza') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#14141D]">
        <img
          src="/assets/aistudio/image_2dc01ff3.png"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-110 menu-thumb-zoom"
        />
      </div>
    );
  }

  if (variant === 'promo-noche') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#14141D]">
        <img
          src="/assets/aistudio/image_d19aba37.png"
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top menu-thumb-zoom"
        />
      </div>
    );
  }

  // Crafted high-contrast Midnight Street Food SVG visuals for Calzón, Fainá, Fritas, Bebidas & Postre Crufi
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#231B18] via-[#1A1A24] to-[#0D0D12] flex items-center justify-center">
      {variant === 'calzon-tremendo' && (
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 menu-thumb-zoom" fill="none">
          <path
            d="M16 64 C16 32, 84 32, 84 64 C84 74, 16 74, 16 64 Z"
            fill="#F59E0B"
            stroke="#FF8A00"
            strokeWidth="3"
          />
          <path
            d="M22 62 C26 42, 74 42, 78 62"
            stroke="#78350F"
            strokeWidth="2.5"
            strokeDasharray="5 4"
          />
          <circle cx="42" cy="54" r="5" fill="#FF2A2A" />
          <circle cx="58" cy="52" r="4.5" fill="#FEF08A" />
          <path d="M35 26 Q38 18 35 12 M52 24 Q55 16 52 10 M66 27 Q69 19 66 13" stroke="#FF8A00" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
        </svg>
      )}

      {variant === 'faina-crocante' && (
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 menu-thumb-zoom" fill="none">
          <polygon
            points="18,68 78,26 86,72"
            fill="#EAB308"
            stroke="#CA8A04"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon points="18,68 86,72 82,78 16,74" fill="#A16207" />
          <circle cx="55" cy="56" r="2.2" fill="#713F12" />
          <circle cx="68" cy="48" r="1.8" fill="#713F12" />
          <circle cx="43" cy="62" r="2" fill="#713F12" />
          <circle cx="72" cy="63" r="2.4" fill="#713F12" />
        </svg>
      )}

      {variant === 'fritas-abundantes' && (
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 menu-thumb-zoom" fill="none">
          <rect x="30" y="22" width="8" height="44" rx="3" transform="rotate(-10 30 22)" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="42" y="16" width="8" height="48" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="53" y="18" width="8" height="46" rx="3" transform="rotate(6 53 18)" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="64" y="24" width="8" height="42" rx="3" transform="rotate(14 64 24)" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M26 50 L74 50 L66 84 L34 84 Z" fill="#FF2A2A" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="67" r="7" fill="#FACC15" />
        </svg>
      )}

      {variant === 'bebidas-heladas' && (
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 menu-thumb-zoom" fill="none">
          <rect x="32" y="34" width="32" height="48" rx="5" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2.5" />
          <path d="M30 34 C30 24, 42 22, 48 26 C54 20, 66 24, 66 34 Z" fill="#FFFFFF" />
          <path d="M64 42 H74 C77 42, 79 45, 79 48 V64 C79 67, 77 70, 74 70 H64" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="46" x2="42" y2="72" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="54" y1="46" x2="54" y2="72" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      )}

      {variant === 'helado-crufi' && (
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 menu-thumb-zoom" fill="none">
          <polygon points="36,52 64,52 50,86" fill="#D97706" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="42" cy="44" r="12" fill="#FDE047" />
          <circle cx="58" cy="44" r="12" fill="#F43F5E" />
          <circle cx="50" cy="32" r="12" fill="#FEF3C7" />
          <circle cx="50" cy="19" r="4" fill="#FF2A2A" />
        </svg>
      )}
    </div>
  );
};
