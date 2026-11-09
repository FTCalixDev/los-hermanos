import React, { useEffect, useRef, useState } from 'react';

export interface IgCropSpec {
  id: string;
  src: string;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  title: string;
  caption: string;
  tag: string;
}

export const IG_PHOTOS: Record<string, IgCropSpec> = {
  parrilla_fuego_lena: {
    id: 'parrilla_fuego_lena',
    src: './assets/aistudio/image_28076d22.png',
    sx: 4,
    sy: 362,
    sw: 240,
    sh: 236,
    title: 'Fuego de Monte y Hierro',
    caption: 'Leña encendida en el fogón de ladrillo refractario preparando la brasa para el turno.',
    tag: '@loshermanos_.comidas'
  },
  asado_chorizos_parrilla: {
    id: 'asado_chorizos_parrilla',
    src: './assets/aistudio/image_8b8be166.png',
    sx: 505,
    sy: 34,
    sw: 240,
    sh: 292,
    title: 'La Parrilla a Pleno',
    caption: 'Asado de tira, vacío, chorizos, morcillas y achuras dorándose a fuego lento de leña.',
    tag: 'Parrilla Uruguaya'
  },
  adolfo_parrillero: {
    id: 'adolfo_parrillero',
    src: './assets/aistudio/image_b4e3859f.png',
    sx: 250,
    sy: 34,
    sw: 240,
    sh: 294,
    title: 'Adolfo en las Brasas',
    caption: 'El parrillero estrella de Los Hermanos cuidando el punto justo de cada corte a la leña.',
    tag: 'Mano de Maestro'
  },
  braseros_mesa_familiar: {
    id: 'braseros_mesa_familiar',
    src: './assets/aistudio/image_28076d22.png',
    sx: 756,
    sy: 32,
    sw: 242,
    sh: 295,
    title: 'Braseros para Compartir',
    caption: 'Atención cálida de nuestro equipo de mozas sirviendo braseros abundantes en la galería.',
    tag: 'Mesa Familiar'
  },
  carro_vino_tannat: {
    id: 'carro_vino_tannat',
    src: './assets/aistudio/image_b4e3859f.png',
    sx: 4,
    sy: 18,
    sw: 240,
    sh: 310,
    title: 'Tannat Junto al Fogón',
    caption: 'Carro artesanal de madera grabado con nuestro número 094 764 118 y Don Pascual Tannat.',
    tag: 'Bodega Tradicional'
  },
  salon_milanesas_familia: {
    id: 'salon_milanesas_familia',
    src: './assets/aistudio/image_28076d22.png',
    sx: 505,
    sy: 362,
    sw: 240,
    sh: 236,
    title: 'Porciones que Comparten Dos',
    caption: 'Nuestras clásicas milanesas caseras con fritas en el salón interior climatizado.',
    tag: 'Cocina Casera'
  },
  patio_nocturno_luces: {
    id: 'patio_nocturno_luces',
    src: './assets/aistudio/image_b4e3859f.png',
    sx: 748,
    sy: 34,
    sw: 239,
    sh: 294,
    title: 'La Terraza de Noche',
    caption: 'Galería exterior iluminada lista para recibir familias y amigos desde las 19:30 hs.',
    tag: 'San Gregorio de Polanco'
  },
  espalda_camiseta_parrillero: {
    id: 'espalda_camiseta_parrillero',
    src: './assets/aistudio/image_28076d22.png',
    sx: 254,
    sy: 362,
    sw: 240,
    sh: 236,
    title: 'Oficio Frente al Fuego',
    caption: 'Indumentaria tradicional del equipo frente al parrillero lleno de pollos y carnes a la leña.',
    tag: 'Tradición Local'
  }
};

interface IgCroppedPhotoProps {
  spec: IgCropSpec;
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

export const IgCroppedPhoto: React.FC<IgCroppedPhotoProps> = ({
  spec,
  className = '',
  imgClassName = '',
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!isMounted || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const scale = 2;
      canvas.width = spec.sw * scale;
      canvas.height = spec.sh * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          img,
          spec.sx,
          spec.sy,
          spec.sw,
          spec.sh,
          0,
          0,
          spec.sw * scale,
          spec.sh * scale
        );
        setLoaded(true);
      }
    };
    img.onerror = () => {
      if (isMounted) setFailed(true);
    };
    img.src = spec.src;
    return () => {
      isMounted = false;
    };
  }, [spec]);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-[#1C1815] ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-label={spec.title}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          onClick ? 'group-hover:scale-105' : ''
        } ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
      {(!loaded || failed) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#231E1A] to-[#12100E]">
          <span className="font-display text-lg text-[#F4EFE6]">{spec.title}</span>
          <span className="text-xs text-[#A89F91] mt-1">{spec.caption}</span>
        </div>
      )}
    </div>
  );
};

interface EmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Vectorial high-definition recreation of the official "LOS HERMANOS RESTAURANTE Y PARRILLADA"
 * emblem from their Instagram (@loshermanos_.comidas):
 * Charcoal-black circular badge, orange outer rings interrupted by the central serif wordmark,
 * roaring orange/red flame crown, red medallion with crossed spatula and carving fork,
 * and cream-white classic serif lettering.
 */
export const LosHermanosEmblem: React.FC<EmblemProps> = ({ size = 'md', className = '' }) => {
  const dims = {
    sm: 'w-11 h-11',
    md: 'w-20 h-20',
    lg: 'w-36 h-36',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-[#0D0B0A] shadow-2xl border border-[#2E2722] select-none shrink-0 ${dims} ${className}`}
      title="Restaurante y Parrillada Los Hermanos - Emblema Oficial"
    >
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Logo Oficial Los Hermanos Restaurante y Parrillada"
      >
        {/* Deep charcoal circle base */}
        <circle cx="120" cy="120" r="116" fill="#0B0A09" />

        {/* Upper orange double arch */}
        <path
          d="M 28 106 A 94 94 0 0 1 212 106"
          stroke="#EA580C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 39 106 A 83 83 0 0 1 201 106"
          stroke="#EA580C"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Lower orange double arch */}
        <path
          d="M 38 158 A 90 90 0 0 0 202 158"
          stroke="#EA580C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 48 158 A 80 80 0 0 0 192 158"
          stroke="#EA580C"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Horizontal framing bars above and below LOS HERMANOS */}
        <line x1="24" y1="108" x2="86" y2="108" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="154" y1="108" x2="216" y2="108" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="36" y1="156" x2="204" y2="156" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />

        {/* Central Flame Outline & Fill */}
        <path
          d="M120 18 C126 36, 146 44, 144 68 C154 60, 160 48, 158 38 C170 54, 174 78, 160 98 C164 86, 160 76, 154 72 C158 86, 150 102, 138 106 L102 106 C86 100, 78 82, 84 64 C88 72, 92 76, 94 78 C86 60, 96 38, 120 18 Z"
          fill="#EA580C"
        />
        <path
          d="M121 30 C125 44, 138 52, 137 70 C144 64, 148 56, 147 48 C155 60, 156 78, 146 94 L96 94 C88 82, 92 64, 102 52 C100 60, 103 66, 106 68 C102 54, 108 42, 121 30 Z"
          fill="#DC2626"
        />

        {/* Red Medallion Inside Flame */}
        <circle cx="120" cy="82" r="24" fill="#EF4444" stroke="#0B0A09" strokeWidth="3" />

        {/* Crossed Spatula & Parrilla Fork in Cream */}
        <g stroke="#F4EFE6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Spatula (bottom-right to top-left) */}
          <line x1="133" y1="95" x2="112" y2="74" />
          <rect
            x="103"
            y="65"
            width="11"
            height="13"
            rx="1.5"
            transform="rotate(-45 108.5 71.5)"
            fill="#EF4444"
            stroke="#F4EFE6"
            strokeWidth="2.2"
          />
          {/* Fork (bottom-left to top-right) */}
          <line x1="107" y1="95" x2="127" y2="75" />
          <path d="M125 71 L131 65 M129 75 L135 69 M124 72 C126 70, 130 74, 128 76" />
        </g>

        {/* Main Wordmark: LOS HERMANOS */}
        <text
          x="120"
          y="143"
          textAnchor="middle"
          fill="#F4EFE6"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="800"
          fontSize="26"
          letterSpacing="-0.5"
        >
          LOS HERMANOS
        </text>

        {/* Sub-label: RESTAURANTE Y PARRILLADA */}
        <text
          x="120"
          y="174"
          textAnchor="middle"
          fill="#F4EFE6"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="700"
          fontSize="11.5"
          letterSpacing="1.2"
        >
          RESTAURANTE
        </text>
        <text
          x="120"
          y="185"
          textAnchor="middle"
          fill="#EA580C"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="10"
        >
          y
        </text>
        <path
          id="parrilladaCurve"
          d="M 68 188 Q 120 208 172 188"
          fill="transparent"
        />
        <text
          fill="#F4EFE6"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="1.4"
        >
          <textPath href="#parrilladaCurve" startOffset="50%" textAnchor="middle">
            PARRILLADA
          </textPath>
        </text>
      </svg>
    </div>
  );
};
