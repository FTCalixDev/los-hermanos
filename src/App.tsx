import React, { useMemo, useState } from 'react';
import {
  IG_PHOTOS,
  IgCropSpec,
  IgCroppedPhoto,
  LosHermanosEmblem,
} from './components/LosHermanosEmblem';

type MenuCategory = 'todos' | 'parrilla' | 'cocina' | 'bodega';

interface MenuItem {
  id: string;
  category: Exclude<MenuCategory, 'todos'>;
  name: string;
  subtitle: string;
  description: string;
  portionNote: string;
  priceUYU: string;
  highlight?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'brasero-hermanos',
    category: 'parrilla',
    name: 'Brasero Completo “Los Hermanos”',
    subtitle: 'El clásico de las mesas familiares en San Gregorio',
    description:
      'Selección generosa salida de las brasas de Adolfo: asado de tira, vacío tierno, pollo a la leña, chorizos criollos, morcilla y chinchulines dorados, acompañado de papas fritas o ensalada mixta.',
    portionNote: 'Comen 2 a 3 personas cómodamente',
    priceUYU: '$U 1.650',
    highlight: 'Más pedido en mesa',
  },
  {
    id: 'asado-tira-rusa',
    category: 'parrilla',
    name: 'Asado de Tira a la Leña con Ensalada Rusa',
    subtitle: 'Corte insignia de la casa a fuego lento de monte',
    description:
      'Costillar cortado ancho, asado despacio sobre brasa de leña hasta lograr hueso suelto y costra crocante, servido con nuestra ensalada rusa casera recién preparada.',
    portionNote: 'Porción súper abundante (para compartir)',
    priceUYU: '$U 790',
    highlight: 'Famoso en reseñas',
  },
  {
    id: 'pollo-lena',
    category: 'parrilla',
    name: 'Pollo a las Brasas de Leña',
    subtitle: 'Piel crocante, ahumado suave y jugo natural',
    description:
      'Asado pacientemente en la parrilla de ladrillo refractario con toque de adobo criollo de la casa y guarnición a elección.',
    portionNote: 'Medio pollo abundante · Opción entero',
    priceUYU: '$U 640',
  },
  {
    id: 'achuras-parrillero',
    category: 'parrilla',
    name: 'Entrada Criolla de Achuras y Embutidos',
    subtitle: 'Para abrir el apetito mientras marcha el corte principal',
    description:
      'Chorizo puro cerdo, morcilla dulce o salada y chinchulines bien crocantes al limón, servidos directo del fierro a la tabla de madera.',
    portionNote: 'Ideal para picar al centro de la mesa',
    priceUYU: '$U 480',
  },
  {
    id: 'milanesa-casa',
    category: 'cocina',
    name: 'Milanesa Casera Napolitana o Completa',
    subtitle: 'De un plato comen dos comensales',
    description:
      'Carne tierna panada en el día, cubierta con salsa casera, jamón y abundante muzzarella gratinada, escoltada por una fuente generosa de papas fritas.',
    portionNote: 'Porción gigante para compartir',
    priceUYU: '$U 760',
    highlight: 'Porción para dos',
  },
  {
    id: 'pastas-familiares',
    category: 'cocina',
    name: 'Pastas Caseras Amasadas con Historia',
    subtitle: 'Recetas familiares transmitidas por generaciones',
    description:
      'Tallarines, ñoquis o ravioles caseros servidos con estofado de carne cocinado a fuego lento, tuco tradicional, bolognesa o salsa caruso.',
    portionNote: 'Plato hondo bien colmado',
    priceUYU: '$U 540',
  },
  {
    id: 'pizzetas-minutas',
    category: 'cocina',
    name: 'Pizzetas a la Piedra y Chivito al Plato',
    subtitle: 'Para las noches de encuentro y terraza',
    description:
      'Muzzarella fundida, gustos a elección o chivito uruguayo de lomo completo con panceta, huevo, jamón, rusa y fritas.',
    portionNote: 'Salón, terraza o en caja para delivery',
    priceUYU: '$U 690',
  },
  {
    id: 'bodega-postres',
    category: 'bodega',
    name: 'Vino Tannat en Carro de Madera, Cervezas y Postres',
    subtitle: 'Don Pascual Tannat, cervezas de litro bien heladas y flan casero',
    description:
      'Presentación tradicional de botella en nuestro carro artesanal de madera, cervezas nacionales bien frías, refrescos familiares, flan con dulce de leche y café.',
    portionNote: 'Servicio de bodega y sobremesa',
    priceUYU: 'Desde $U 240',
  },
];

interface ReviewItem {
  author: string;
  origin: string;
  rating: string;
  date: string;
  quote: string;
  ordered: string;
}

const REAL_REVIEWS: ReviewItem[] = [
  {
    author: 'Gustavo Rodríguez',
    origin: 'Guía Local en Google · Visita familiar',
    rating: '5.0 / 5',
    date: 'Reseña verificada',
    quote:
      'Parada obligatoria en San Gregorio de Polanco. Pedimos el asado de tira con ensalada rusa y una milanesa: las porciones son tan abundantes que de un plato comen dos perfectamente. La mano de Adolfo en la parrilla a leña es impecable.',
    ordered: 'Asado de tira con rusa y Milanesa casera',
  },
  {
    author: 'Valeria Méndez',
    origin: 'Turista de Montevideo · Cena en terraza',
    rating: '5.0 / 5',
    date: 'Reseña verificada',
    quote:
      'La calidez con la que te recibe Marcos y el equipo de mozas te hace sentir en casa desde que entrás. Comimos un brasero completo en la galería exterior y la carne se cortaba con cuchara. Precios súper honestos.',
    ordered: 'Brasero completo para compartir y Don Pascual Tannat',
  },
  {
    author: 'Jorge Luis Ferreira',
    origin: 'Tacuarembó · Almuerzo de fin de semana',
    rating: '4.5 / 5',
    date: 'Reseña verificada',
    quote:
      'Auténtico restaurante tradicional de pueblo. Tanto las carnes a la leña como las pastas caseras mantienen ese sabor de antes que ya casi no se encuentra. Excelente ambiente familiar y muy buena atención.',
    ordered: 'Pastas caseras con estofado y Pollo a la leña',
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('todos');
  const [lightboxPhoto, setLightboxPhoto] = useState<IgCropSpec | null>(null);

  // WhatsApp Simulator Form State
  const [clientName, setClientName] = useState('');
  const [guests, setGuests] = useState('4 personas');
  const [reason, setReason] = useState('Reservar mesa en salón');
  const [dayChoice, setDayChoice] = useState('Hoy');
  const [shiftChoice, setShiftChoice] = useState('Cena (19:30 - 00:00 hs)');
  const [selectedDishNote, setSelectedDishNote] = useState('');
  const [formError, setFormError] = useState('');

  const filteredMenu = useMemo(() => {
    if (selectedCategory === 'todos') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Calculate current schedule status in Uruguay time (UTC-3)
  const scheduleStatus = useMemo(() => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const uyHours = (utcHours - 3 + 24) % 24;
    const totalMinutes = uyHours * 60 + utcMinutes;

    const lunchStart = 10 * 60 + 30; // 10:30
    const lunchEnd = 14 * 60 + 30; // 14:30
    const dinnerStart = 19 * 60 + 30; // 19:30
    const dinnerEnd = 24 * 60; // 00:00

    if (totalMinutes >= lunchStart && totalMinutes <= lunchEnd) {
      return 'Abierto ahora · Turno Mediodía (10:30 a 14:30 hs)';
    }
    if (totalMinutes >= dinnerStart && totalMinutes <= dinnerEnd) {
      return 'Abierto ahora · Turno Noche (19:30 a 00:00 hs)';
    }
    if (totalMinutes > lunchEnd && totalMinutes < dinnerStart) {
      return 'Preparando brasas para la noche · Abre 19:30 hs';
    }
    return 'Horarios de hoy · 10:30 a 14:30 y 19:30 a 00:00 hs';
  }, []);

  const whatsappPreviewText = useMemo(() => {
    const cleanName = clientName.trim() || 'Cliente';
    const lines = [
      `Hola amigos de Los Hermanos! Mi nombre es ${cleanName}.`,
      `- Motivo: ${reason}`,
      `- Comensales: ${guests}`,
      `- Día y Turno: ${dayChoice} · ${shiftChoice}`,
    ];
    if (selectedDishNote.trim()) {
      lines.push(`- Plato / Consulta de carta: ${selectedDishNote.trim()}`);
    }
    lines.push('Muchas gracias!');
    return lines.join('\n');
  }, [clientName, guests, reason, dayChoice, shiftChoice, selectedDishNote]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/59894764118?text=${encodeURIComponent(whatsappPreviewText)}`;
  }, [whatsappPreviewText]);

  const handleSelectDishForWhatsApp = (dishName: string) => {
    setSelectedDishNote((prev) => {
      if (!prev) return dishName;
      if (prev.includes(dishName)) return prev;
      return `${prev}, ${dishName}`;
    });
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F4EFE6] pb-16 md:pb-0">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#12100E]/95 backdrop-blur-md border-b border-[#2E2722]">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="font-display text-xl font-bold tracking-tight text-[#F4EFE6] whitespace-nowrap shrink-0"
        >
          Los Hermanos
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#D6CEC2]">
          <a
            href="#el-fogon"
            className="hover:text-[#EA580C] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            El Fogón
          </a>
          <a
            href="#la-carta"
            className="hover:text-[#EA580C] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            La Carta
          </a>
          <a
            href="#resenas"
            className="hover:text-[#EA580C] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Reseñas
          </a>
          <a
            href="#ubicacion"
            className="hover:text-[#EA580C] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Ubicación
          </a>
        </nav>

        {/* Zone 3: Primary action + direct circular green WhatsApp button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="#reservas"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#F4EFE6] bg-[#EA580C] hover:bg-[#D9460F] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Reservar por WhatsApp
          </a>
          <a
            href="https://wa.me/59894764118"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir chat directo de WhatsApp sin formulario"
            title="Ir directo al WhatsApp 094 764 118"
            className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 shrink-0"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
            </svg>
          </a>
        </div>
      </header>

      {/* HERO SECTION: FOGON NOCTURNO E INSIGNIA OFICIAL */}
      <section
        id="inicio"
        className="relative fogon-glow border-b border-[#2E2722] pt-8 pb-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Official Emblem + Identity + Primary Action */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Unboxed quiet metadata line */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#D6CEC2] mb-6 tabular-nums">
                  <span>San Gregorio de Polanco, Tacuarembó</span>
                  <span aria-hidden="true">·</span>
                  <span>Gral. José Gervasio Artigas 125</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#E5A93C] font-semibold">
                    ★ 4.4 en Google (163 reseñas)
                  </span>
                </div>

                {/* Emblem + Main Headline lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                  <LosHermanosEmblem size="lg" />
                  <div>
                    <p className="font-hand text-2xl text-[#EA580C] mb-1">
                      Restaurante y Parrillada tradicional
                    </p>
                    <h1
                      className="font-display font-bold text-[#F4EFE6] tracking-tight leading-[1.08]"
                      style={{
                        fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                        textWrap: 'balance',
                      }}
                    >
                      Un rincón único donde el fuego y la amistad se encuentran.
                    </h1>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#D6CEC2] leading-relaxed max-w-2xl mb-8">
                  Brasas de leña encendidas por nuestro parrillero{' '}
                  <strong className="text-[#F4EFE6] font-semibold">Adolfo</strong>, recetas caseras
                  de generaciones y la atención cercana de su dueño{' '}
                  <strong className="text-[#F4EFE6] font-semibold">Marcos</strong> y su equipo de
                  mozas. Porciones generosas pensadas para compartir en familia en el corazón de la
                  Península Dorada.
                </p>
              </div>

              {/* Action & Live Schedule Bar */}
              <div className="pt-6 border-t border-[#2E2722]">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <a
                      href="#reservas"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#F4EFE6] bg-[#EA580C] hover:bg-[#D9460F] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md"
                    >
                      <span>Reservar por WhatsApp · 094 764 118</span>
                    </a>
                    <a
                      href="https://wa.me/59894764118"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Enviar WhatsApp directo sin formulario"
                      title="Abrir WhatsApp directo sin rellenar formulario"
                      className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 shrink-0"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
                      </svg>
                    </a>
                  </div>
                  <a
                    href="#la-carta"
                    className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#F4EFE6] bg-[#1C1815] hover:bg-[#26201C] border border-[#38302A] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Ver Pizarra del Parrillero
                  </a>
                </div>

                {/* Unboxed schedule metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#A89F91] tabular-nums">
                  <span className="text-[#F4EFE6] font-medium">{scheduleStatus}</span>
                  <span aria-hidden="true">·</span>
                  <span>Almuerzo: 10:30 - 14:30</span>
                  <span aria-hidden="true">/</span>
                  <span>Cena: 19:30 - 00:00</span>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://www.instagram.com/loshermanos_.comidas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#EA580C] hover:underline"
                  >
                    IG @loshermanos_.comidas
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Asymmetric Real Photo Composition from their IG */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-4 items-stretch">
              {/* Primary focal photo: The wood-fired grill full of meat */}
              <div className="col-span-7 relative rounded-xl overflow-hidden border border-[#2E2722] flex flex-col justify-end min-h-[320px] sm:min-h-[380px]">
                <IgCroppedPhoto
                  spec={IG_PHOTOS.asado_chorizos_parrilla}
                  className="absolute inset-0 w-full h-full"
                  onClick={() => setLightboxPhoto(IG_PHOTOS.asado_chorizos_parrilla)}
                />
                <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent">
                  <p className="text-xs text-[#E5A93C] font-medium tabular-nums">
                    Fuego a leña real
                  </p>
                  <p className="font-display text-sm sm:text-base text-[#F4EFE6] font-semibold">
                    Asado de tira, vacío y achuras en ladrillo refractario
                  </p>
                </div>
              </div>

              {/* Secondary stacked photos: Adolfo + Wine Cart with 094 764 118 */}
              <div className="col-span-5 flex flex-col gap-4">
                <div className="relative flex-1 rounded-xl overflow-hidden border border-[#2E2722] min-h-[160px]">
                  <IgCroppedPhoto
                    spec={IG_PHOTOS.adolfo_parrillero}
                    className="absolute inset-0 w-full h-full"
                    onClick={() => setLightboxPhoto(IG_PHOTOS.adolfo_parrillero)}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <p className="text-xs font-semibold text-[#F4EFE6]">Adolfo en las brasas</p>
                  </div>
                </div>

                <div className="relative flex-1 rounded-xl overflow-hidden border border-[#2E2722] min-h-[160px]">
                  <IgCroppedPhoto
                    spec={IG_PHOTOS.carro_vino_tannat}
                    className="absolute inset-0 w-full h-full"
                    onClick={() => setLightboxPhoto(IG_PHOTOS.carro_vino_tannat)}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <p className="text-xs font-semibold text-[#F4EFE6] tabular-nums">
                      Delivery 094 764 118
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-Column Authentic Metrics & Identity Strip below Hero */}
          <div className="mt-12 pt-8 border-t border-[#2E2722] grid grid-cols-2 lg:grid-cols-4 gap-6 tabular-nums">
            <div>
              <p className="text-xs text-[#A89F91]">Calificación Verificada</p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#F4EFE6] mt-1">
                4.4 ★ <span className="text-sm font-sans font-normal text-[#D6CEC2]">/ 5.0</span>
              </p>
              <p className="text-xs text-[#A89F91] mt-1">Más de 160 reseñas en Google</p>
            </div>
            <div>
              <p className="text-xs text-[#A89F91]">Doble Turno Diario</p>
              <p className="font-display text-lg sm:text-xl font-bold text-[#F4EFE6] mt-1">
                10:30–14:30 · 19:30–00:00
              </p>
              <p className="text-xs text-[#A89F91] mt-1">Almuerzo familiar y cena hasta medianoche</p>
            </div>
            <div>
              <p className="text-xs text-[#A89F91]">Sello de la Casa</p>
              <p className="font-display text-lg sm:text-xl font-bold text-[#F4EFE6] mt-1">
                De un plato comen dos
              </p>
              <p className="text-xs text-[#A89F91] mt-1">Porciones abundantes de verdad</p>
            </div>
            <div>
              <p className="text-xs text-[#A89F91]">Atención Directa</p>
              <p className="font-display text-lg sm:text-xl font-bold text-[#F4EFE6] mt-1">
                Marcos, Adolfo y Equipo
              </p>
              <p className="text-xs text-[#A89F91] mt-1">Hospitalidad de San Gregorio de Polanco</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EL FOGON, LA COCINA Y GALERIA REAL DE INSTAGRAM (PAPEL CREMA MANTEL) */}
      <section id="el-fogon" className="mantel-surface py-16 lg:py-24 border-b border-[#DED6C6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Editorial Asymmetric Story Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wider text-[#B83B1A] mb-2">
                01. Nuestra Historia en San Gregorio de Polanco
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#231E1A] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Parrilla de ladrillo a leña, recetas de familia y mesa sin apuro.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed">
                En <strong className="text-[#231E1A]">Gral. José Gervasio Artigas 125</strong>, Los
                Hermanos conserva la esencia de las parrilladas clásicas del interior uruguayo:
                mantel tendido, braseros que llegan chisporroteando a la mesa y platos caseros donde
                nadie se queda con hambre.
              </p>
            </div>
          </div>

          {/* 3 Editorial Pillars (Asymmetric 5 - 4 - 3 Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
            <div className="lg:col-span-5 bg-[#EBE4D6] border border-[#D5CBB8] rounded-xl p-7 flex flex-col justify-between">
              <div>
                <span className="font-hand text-2xl text-[#B83B1A]">El secreto del fuego</span>
                <h3 className="font-display text-xl font-bold text-[#231E1A] mt-1 mb-3">
                  La mano de Adolfo en las brasas a leña
                </h3>
                <p className="text-sm text-[#4A423B] leading-relaxed">
                  Nada de gas ni apuros. Adolfo trabaja el fuego con leña seleccionada para que el
                  asado de tira, el pollo y las achuras tomen ese dorado parejo y aroma ahumado que
                  nuestros clientes destacan en cada reseña.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5CBB8] text-xs text-[#5C5249]">
                Especialidad: Asado de tira ancho con ensalada rusa · Brasero para compartir
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#EBE4D6] border border-[#D5CBB8] rounded-xl p-7 flex flex-col justify-between">
              <div>
                <span className="font-hand text-2xl text-[#B83B1A]">Anfitriones de alma</span>
                <h3 className="font-display text-xl font-bold text-[#231E1A] mt-1 mb-3">
                  Atendido por su dueño Marcos y su equipo
                </h3>
                <p className="text-sm text-[#4A423B] leading-relaxed">
                  Desde que cruzás la puerta o te sentás en la terraza, Marcos y el equipo de mozas
                  te reciben como a un amigo de la casa, recomendando el corte más tierno del día o
                  las pastas amasadas en la cocina.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5CBB8] text-xs text-[#5C5249]">
                Salón interior tranquilo · Galería techada · Delivery rápido
              </div>
            </div>

            <div className="lg:col-span-3 bg-[#231E1A] text-[#F4EFE6] rounded-xl p-7 flex flex-col justify-between">
              <div>
                <span className="font-hand text-2xl text-[#EA580C]">Ríe, Ama, Vive</span>
                <h3 className="font-display text-xl font-bold text-[#F4EFE6] mt-1 mb-3">
                  Patio, peñas y noches de amigos
                </h3>
                <p className="text-sm text-[#D6CEC2] leading-relaxed">
                  Nuestra galería exterior se enciende cada noche con guirnaldas cálidas y, en
                  fechas especiales, guitarras y percusión en vivo que acompañan la sobremesa con un
                  buen Tannat.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#38302A] text-xs text-[#E5A93C]">
                “San Gregorio nos conquistó”
              </div>
            </div>
          </div>

          {/* Authentic Instagram Visual Grid (@loshermanos_.comidas) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-[#5C5249]">
                Postales reales de nuestro Instagram (hacé clic en cualquier foto para ampliar)
              </p>
              <h3 className="font-display text-2xl font-bold text-[#231E1A] mt-0.5">
                @loshermanos_.comidas en imágenes reales
              </h3>
            </div>
            <a
              href="https://www.instagram.com/loshermanos_.comidas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#B83B1A] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Ver perfil oficial en Instagram (995 seguidores)</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              IG_PHOTOS.parrilla_fuego_lena,
              IG_PHOTOS.braseros_mesa_familiar,
              IG_PHOTOS.salon_milanesas_familia,
              IG_PHOTOS.patio_nocturno_luces,
            ].map((spec) => (
              <div
                key={spec.id}
                onClick={() => setLightboxPhoto(spec)}
                className="group relative rounded-xl overflow-hidden border border-[#D5CBB8] bg-[#1C1815] aspect-[4/5] cursor-pointer"
              >
                <IgCroppedPhoto spec={spec} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[11px] text-[#E5A93C] font-medium">{spec.tag}</span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#F4EFE6] leading-snug">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-[#D6CEC2] line-clamp-2 mt-1">{spec.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: LA CARTA DEL PARRILLERO Y LA COCINA CASERA (CHALKBOARD & IRON) */}
      <section id="la-carta" className="chalkboard-surface py-16 lg:py-24 border-b border-[#2E2722]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#EA580C] mb-2">
                02. La Pizarra de Adolfo y la Cocina de Los Hermanos
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#F4EFE6] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Cortes a la leña, braseros y recetas caseras bien servidas
              </h2>
              <p className="font-hand text-2xl text-[#E5A93C] mt-2">
                “Acordate que nuestras porciones son bien abundantes: de muchos platos comen dos”
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#12100E] border border-[#2E2722] rounded-xl self-start lg:self-auto"
              role="tablist"
              aria-label="Filtrar carta por categoría"
            >
              {[
                { id: 'todos', label: 'Toda la Carta' },
                { id: 'parrilla', label: 'Del Brasero y la Leña' },
                { id: 'cocina', label: 'Cocina Casera y Minutas' },
                { id: 'bodega', label: 'Vinos y Postres' },
              ].map((tab) => {
                const active = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(tab.id as MenuCategory)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#EA580C] text-[#F4EFE6] shadow-sm'
                        : 'text-[#A89F91] hover:text-[#F4EFE6]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Framed Traditional Parrilla Board */}
          <div className="rounded-2xl border-2 border-[#38302A] bg-[#14110F] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {filteredMenu.map((item) => (
                <article
                  key={item.id}
                  className="pb-7 border-b border-dashed border-[#2E2722] flex flex-col justify-between"
                >
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[#A89F91] mb-1.5">
                      <span>
                        {item.category === 'parrilla'
                          ? 'Brasas a leña'
                          : item.category === 'cocina'
                          ? 'Cocina familiar'
                          : 'Bodega y sobremesa'}
                        {item.highlight ? ` · ${item.highlight}` : ''}
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-[#E5A93C] tabular-nums">
                        {item.priceUYU}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#F4EFE6]">{item.name}</h3>
                    <p className="text-xs font-medium text-[#EA580C] mt-0.5">{item.subtitle}</p>
                    <p className="text-sm text-[#D6CEC2] leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between gap-4">
                    <span className="text-xs text-[#A89F91]">{item.portionNote}</span>
                    <button
                      type="button"
                      onClick={() => handleSelectDishForWhatsApp(item.name)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#F4EFE6] bg-[#231E1A] hover:bg-[#EA580C] border border-[#38302A] hover:border-[#EA580C] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Sumar a mi consulta
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom note inside chalkboard */}
            <div className="mt-8 pt-6 border-t border-[#2E2722] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#A89F91]">
              <p>
                * Precios de referencia en Pesos Uruguayos ($U). Consultá hoy por WhatsApp qué cortes
                especiales y pastas caseras acaban de salir.
              </p>
              <a
                href="#reservas"
                className="text-[#EA580C] font-semibold hover:underline whitespace-nowrap shrink-0"
              >
                Armar pedido o reserva abajo →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MURO DE RESENAS REALES Y COMODIDADES DEL LOCAL (REDISEÑADO EN CREMA MANTEL) */}
      <section id="resenas" className="mantel-surface py-16 lg:py-24 border-b border-[#DED6C6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold text-[#B83B1A] mb-2">
                03. La Voz de Nuestros Comensales
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#231E1A] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Por qué locales y turistas vuelven a nuestra mesa
              </h2>
            </div>

            {/* Google Rating Architectural Summary Block */}
            <div className="bg-[#231E1A] text-[#F4EFE6] px-6 py-4 rounded-xl flex items-center gap-5 shrink-0">
              <div className="text-3xl font-display font-bold text-[#E5A93C] tabular-nums">
                4.4 ★
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#F4EFE6]">Calificación en Google Maps</p>
                <p className="text-[#A89F91] tabular-nums">Basado en más de 160 reseñas reales</p>
              </div>
            </div>
          </div>

          {/* 3 Real Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {REAL_REVIEWS.map((rev, i) => (
              <blockquote
                key={i}
                className="bg-[#EBE4D6] border border-[#D5CBB8] rounded-xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5C5249] mb-4 tabular-nums">
                    <span className="font-semibold text-[#B83B1A]">★ {rev.rating}</span>
                    <span>{rev.date}</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#231E1A] leading-relaxed mb-6">
                    “{rev.quote}”
                  </p>
                </div>
                <footer className="pt-4 border-t border-[#D5CBB8]">
                  <p className="font-display font-bold text-sm text-[#231E1A]">{rev.author}</p>
                  <p className="text-xs text-[#5C5249] mt-0.5">
                    {rev.origin} · Pidió: {rev.ordered}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Services & Amenities Architectural Grid */}
          <div className="bg-[#EBE4D6] border border-[#D5CBB8] rounded-2xl p-7 sm:p-10">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-semibold text-[#B83B1A] mb-1">
                Comodidades y Servicios en Gral. Artigas 125
              </p>
              <h3 className="font-display text-2xl font-bold text-[#231E1A]">
                Todo dispuesto para un almuerzo tranquilo o una cena entre amigos
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3.5">
                <svg
                  className="w-5 h-5 text-[#B83B1A] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-sm text-[#231E1A]">
                    Salón Familiar Climatizado
                  </h4>
                  <p className="text-xs text-[#5C5249] mt-1">
                    Interior amplio, tranquilo y cómodo para disfrutar en cualquier época del año.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <svg
                  className="w-5 h-5 text-[#B83B1A] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-sm text-[#231E1A]">
                    Mesas en Terraza Exterior
                  </h4>
                  <p className="text-xs text-[#5C5249] mt-1">
                    Galería techada al aire libre ideal para el mediodía o las noches templadas de
                    Polanco.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <svg
                  className="w-5 h-5 text-[#B83B1A] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-sm text-[#231E1A]">
                    Para Llevar y Delivery
                  </h4>
                  <p className="text-xs text-[#5C5249] mt-1">
                    Encargá tu asado, pollo a la leña, milanesas o pizzetas y retiralo calentito.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <svg
                  className="w-5 h-5 text-[#B83B1A] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-sm text-[#231E1A]">
                    Tarjetas, NFC y Accesibilidad
                  </h4>
                  <p className="text-xs text-[#5C5249] mt-1">
                    Pagos con débito/crédito/NFC, entrada accesible, sillas para niños y
                    estacionamiento gratuito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: REDISEÑO DE LAS ULTIMAS PARTES — SIMULADOR DE WHATSAPP + UBICACION Y HORARIOS */}
      <section id="reservas" className="py-16 lg:py-24 bg-[#12100E] border-b border-[#2E2722]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold text-[#EA580C] mb-2">
              04. Reservá tu Mesa o Consultá Qué Sale Hoy de la Parrilla
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#F4EFE6] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Contacto directo con Los Hermanos sin intermediarios
            </h2>
            <p className="text-sm sm:text-base text-[#D6CEC2] mt-2">
              Completá tu consulta en segundos: armamos el mensaje listo para enviar al WhatsApp
              oficial <strong className="text-[#F4EFE6] tabular-nums">094 764 118</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column (7 cols): Interactive WhatsApp Reservation / Order Simulator */}
            <div className="lg:col-span-7 bg-[#1A1614] border border-[#2E2722] rounded-2xl p-6 sm:p-9 flex flex-col justify-between">
              <form id="wa-simulator-form" onSubmit={handleFormSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#2E2722]">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#F4EFE6]">
                      Simulador de Reserva y Pedidos a WhatsApp
                    </h3>
                    <p className="text-xs text-[#A89F91] mt-0.5">
                      Respuesta directa de Marcos y el equipo en horario de atención
                    </p>
                  </div>
                  <LosHermanosEmblem size="sm" />
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-[#D9381E]/20 border border-[#D9381E] text-xs text-[#F4EFE6]"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="wa-nombre"
                      className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                    >
                      Tu Nombre y Apellido *
                    </label>
                    <input
                      id="wa-nombre"
                      type="text"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder="Ej. Martín Camejo"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#12100E] border border-[#38302A] text-sm text-[#F4EFE6] placeholder-[#6E655C] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wa-comensales"
                      className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                    >
                      Cantidad de Comensales
                    </label>
                    <select
                      id="wa-comensales"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#12100E] border border-[#38302A] text-sm text-[#F4EFE6] focus:outline-none focus:border-[#EA580C]"
                    >
                      <option value="2 personas">2 personas (Pareja / Amigos)</option>
                      <option value="3 a 4 personas">3 a 4 personas (Mesa Familiar)</option>
                      <option value="5 a 6 personas">5 a 6 personas (Grupo)</option>
                      <option value="Más de 6 personas">Más de 6 personas (Mesa Grande)</option>
                      <option value="Pedido para llevar / Delivery">
                        Pedido para llevar / Delivery
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="wa-motivo"
                    className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                  >
                    Motivo de tu Mensaje
                  </label>
                  <select
                    id="wa-motivo"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#12100E] border border-[#38302A] text-sm text-[#F4EFE6] focus:outline-none focus:border-[#EA580C]"
                  >
                    <option value="Reservar mesa en salón">Reservar mesa en salón interior</option>
                    <option value="Reservar en terraza">Reservar mesa en terraza exterior</option>
                    <option value="Consultar qué sale hoy de la parrilla / Para llevar">
                      Consultar qué sale hoy de la parrilla / Para llevar
                    </option>
                    <option value="Encargar pedido por Delivery">
                      Encargar pedido por Delivery
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="wa-dia"
                      className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                    >
                      Día
                    </label>
                    <select
                      id="wa-dia"
                      value={dayChoice}
                      onChange={(e) => setDayChoice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#12100E] border border-[#38302A] text-sm text-[#F4EFE6] focus:outline-none focus:border-[#EA580C]"
                    >
                      <option value="Hoy">Hoy</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Este Fin de Semana">Este Fin de Semana</option>
                      <option value="Próxima Semana">Próxima Semana</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="wa-turno"
                      className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                    >
                      Turno (Horarios Oficiales IG)
                    </label>
                    <select
                      id="wa-turno"
                      value={shiftChoice}
                      onChange={(e) => setShiftChoice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#12100E] border border-[#38302A] text-sm text-[#F4EFE6] focus:outline-none focus:border-[#EA580C]"
                    >
                      <option value="Almuerzo (10:30 - 14:30 hs)">
                        Almuerzo (10:30 - 14:30 hs)
                      </option>
                      <option value="Cena (19:30 - 00:00 hs)">Cena (19:30 - 00:00 hs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="wa-plato" className="text-xs font-semibold text-[#D6CEC2]">
                      Platos de interés o comentario opcional
                    </label>
                    {selectedDishNote && (
                      <button
                        type="button"
                        onClick={() => setSelectedDishNote('')}
                        className="text-xs text-[#EA580C] hover:underline cursor-pointer"
                      >
                        Limpiar selección
                      </button>
                    )}
                  </div>
                  <input
                    id="wa-plato"
                    type="text"
                    value={selectedDishNote}
                    onChange={(e) => setSelectedDishNote(e.target.value)}
                    placeholder="Ej. Brasero para compartir, asado de tira con rusa..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#12100E] border border-[#38302A] text-sm text-[#F4EFE6] placeholder-[#6E655C] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                {/* Live WhatsApp Message Preview Box */}
                <div className="p-4 rounded-xl bg-[#12100E] border border-[#2E2722]">
                  <p className="text-[11px] font-semibold text-[#E5A93C] mb-1">
                    Vista previa del mensaje que se enviará al +598 94 764 118:
                  </p>
                  <pre className="text-xs text-[#D6CEC2] whitespace-pre-wrap font-sans leading-relaxed">
                    {whatsappPreviewText}
                  </pre>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F4EFE6] bg-[#EA580C] hover:bg-[#D9460F] rounded-lg transition-colors cursor-pointer shadow-md whitespace-nowrap"
                  >
                    <span>Enviar Reserva / Consulta por WhatsApp</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Right Column (5 cols): Redesigned Location, Schedule & Embedded Map Card */}
            <div
              id="ubicacion"
              className="lg:col-span-5 bg-[#1A1614] border border-[#2E2722] rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-[#EA580C]">
                    Ubicación y Horarios Oficiales
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#F4EFE6] mt-1">
                    Gral. José Gervasio Artigas 125
                  </h3>
                  <p className="text-sm text-[#D6CEC2] mt-0.5">
                    San Gregorio de Polanco, Tacuarembó (CP 45200), Uruguay
                  </p>
                </div>

                {/* Official Double-Shift Schedule Box */}
                <div className="p-4 rounded-xl bg-[#12100E] border border-[#2E2722] space-y-2.5 tabular-nums">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A89F91]">Turno Mediodía (Almuerzo)</span>
                    <span className="font-semibold text-[#F4EFE6]">10:30 a 14:30 hs</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-[#2E2722] pt-2.5">
                    <span className="text-[#A89F91]">Turno Noche (Cena y Parrilla)</span>
                    <span className="font-semibold text-[#E5A93C]">19:30 a 00:00 hs</span>
                  </div>
                  <p className="text-[11px] text-[#A89F91] pt-1">
                    * En noches de temporada alta y peñas extendemos la sobremesa pasada la
                    medianoche.
                  </p>
                </div>

                {/* Both Phone Numbers Clearly Listed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 tabular-nums">
                  <a
                    href="https://wa.me/59894764118"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#12100E] hover:bg-[#231E1A] border border-[#2E2722] transition-colors"
                  >
                    <p className="text-[11px] text-[#A89F91]">WhatsApp Oficial y Reservas</p>
                    <p className="font-display text-base font-bold text-[#EA580C] mt-0.5">
                      094 764 118
                    </p>
                  </a>

                  <a
                    href="tel:+59899742329"
                    className="p-3.5 rounded-xl bg-[#12100E] hover:bg-[#231E1A] border border-[#2E2722] transition-colors"
                  >
                    <p className="text-[11px] text-[#A89F91]">Teléfono Alternativo / Delivery</p>
                    <p className="font-display text-base font-bold text-[#F4EFE6] mt-0.5">
                      099 742 329
                    </p>
                  </a>
                </div>
              </div>

              {/* Embedded Google Map + Direct Route Button */}
              <div className="border-t border-[#2E2722]">
                <div className="h-56 w-full bg-[#12100E]">
                  <iframe
                    title="Mapa de Restaurante y Parrillada Los Hermanos en Gral. José Gervasio Artigas 125, San Gregorio de Polanco"
                    src="https://www.google.com/maps?q=Gral.+Jose+Gervasio+Artigas+125,+San+Gregorio+de+Polanco,+Tacuarembo,+Uruguay&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4 bg-[#14110F] flex items-center justify-between gap-4">
                  <span className="text-xs text-[#A89F91]">
                    Estacionamiento gratuito en la cuadra
                  </span>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Gral.+Jose+Gervasio+Artigas+125,+San+Gregorio+de+Polanco,+Uruguay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-[#231E1A] bg-[#F4EFE6] hover:bg-[#E5A93C] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Cómo llegar en Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIET ARCHITECTURAL FOOTER WITH BOTH PHONES & CALIXDEV CREDIT */}
      <footer className="bg-[#0D0B0A] text-[#A89F91] py-12 border-t border-[#231E1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#231E1A] items-center">
            <div className="md:col-span-5 flex items-center gap-4">
              <LosHermanosEmblem size="md" />
              <div>
                <p className="font-display text-lg font-bold text-[#F4EFE6]">
                  Restaurante y Parrillada “Los Hermanos”
                </p>
                <p className="text-xs text-[#A89F91] mt-0.5">
                  Un rincón único donde el fuego y la amistad se encuentran.
                </p>
                <p className="text-xs text-[#D6CEC2] mt-1 tabular-nums">
                  Gral. José Gervasio Artigas 125 · San Gregorio de Polanco (CP 45200)
                </p>
              </div>
            </div>

            <div className="md:col-span-4 text-xs space-y-1.5 tabular-nums">
              <p className="text-[#F4EFE6] font-semibold">Contacto y Pedidos</p>
              <p>
                WhatsApp Principal:{' '}
                <a
                  href="https://wa.me/59894764118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EA580C] hover:underline font-medium"
                >
                  094 764 118 (+598 94 764 118)
                </a>
              </p>
              <p>
                Línea Alternativa / Delivery:{' '}
                <a href="tel:+59899742329" className="text-[#F4EFE6] hover:underline font-medium">
                  099 742 329
                </a>
              </p>
              <p>Horarios: 10:30 - 14:30 | 19:30 - 00:00 hs</p>
            </div>

            <div className="md:col-span-3 flex flex-col sm:items-end gap-2.5">
              <a
                href="https://www.instagram.com/loshermanos_.comidas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#F4EFE6] hover:text-[#EA580C] transition-colors"
              >
                Instagram: @loshermanos_.comidas →
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E655C]">
            <p>© {new Date().getFullYear()} Restaurante y Parrillada “Los Hermanos” · Tacuarembó, Uruguay.</p>
            <p className="text-[#A89F91]">Propuesta de diseño web por CalixDev</p>
          </div>
        </div>
      </footer>

      {/* COMPACT MOBILE BOTTOM FIXED BAR (<= 10% VIEWPORT HEIGHT) */}
      <nav
        aria-label="Accesos rápidos móviles"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#12100E]/95 backdrop-blur-md border-t border-[#2E2722] grid grid-cols-3 divide-x divide-[#2E2722]"
      >
        <a
          href="#la-carta"
          className="flex items-center justify-center text-xs font-semibold text-[#F4EFE6] hover:bg-[#1C1815] whitespace-nowrap"
        >
          Ver Parrilla
        </a>
        <a
          href="#ubicacion"
          className="flex items-center justify-center text-xs font-semibold text-[#F4EFE6] hover:bg-[#1C1815] whitespace-nowrap"
        >
          Ubicación
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-xs font-bold text-[#F4EFE6] bg-[#EA580C] whitespace-nowrap"
        >
          WhatsApp
        </a>
      </nav>

      {/* LIGHTBOX MODAL FOR INSTAGRAM REAL PHOTOS */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-[#1A1614] border border-[#38302A] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-square w-full">
              <IgCroppedPhoto spec={lightboxPhoto} className="w-full h-full" />
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#E5A93C] font-medium">{lightboxPhoto.tag}</p>
                <h3 className="font-display text-lg font-bold text-[#F4EFE6] mt-0.5">
                  {lightboxPhoto.title}
                </h3>
                <p className="text-xs text-[#D6CEC2] mt-1">{lightboxPhoto.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="px-3 py-1.5 text-xs font-semibold text-[#F4EFE6] bg-[#2E2722] hover:bg-[#EA580C] rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
