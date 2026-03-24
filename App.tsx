import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Menu, 
  X,
  Battery,
  Layers,
  Wind,
  Clock,
  AlertCircle,
  Loader2,
  Zap
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { FormData } from './types';

// ==========================================
// CONFIGURACIÓN DE SUPABASE
// ==========================================
const SUPABASE_URL = "https://qgzfpfublkjwpgbdkwrf.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_jc33HIOl5H0UDhF-nR5b5g_7gxTxine";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOGO_URL = "https://i.postimg.cc/Y9X0yj6M/logo-power-solar.png";
const PHONE_TEL = "tel:7876281344";

const PUERTO_RICO_TOWNS = [
  "Adjuntas", "Aguada", "Aguadilla", "Aguas Buenas", "Aibonito", "Añasco", "Arecibo", "Arroyo", 
  "Barceloneta", "Barranquitas", "Bayamón", "Cabo Rojo", "Caguas", "Camuy", "Canóvanas", "Carolina", 
  "Cataño", "Cayey", "Ceiba", "Ciales", "Cidra", "Coamo", "Comerío", "Corozal", "Culebra", "Dorado", 
  "Fajardo", "Florida", "Guánica", "Guayama", "Guayanilla", "Guaynabo", "Gurabo", "Hatillo", 
  "Hormigueros", "Humacao", "Isabela", "Jayuya", "Juana Díaz", "Juncos", "Lajas", "Lares", 
  "Las Marías", "Las Piedras", "Loíza", "Luquillo", "Manatí", "Maricao", "Maunabo", "Mayagüez", 
  "Moca", "Morovis", "Naguabo", "Naranjito", "Orocovis", "Patillas", "Peñuelas", "Ponce", 
  "Quebradillas", "Rincón", "Río Grande", "Sabana Grande", "Salinas", "San Germán", "San Juan", 
  "San Lorenzo", "San Sebastián", "Santa Isabel", "Toa Alta", "Toa Baja", "Trujillo Alto", 
  "Utuado", "Vega Alta", "Vega Baja", "Vieques", "Villalba", "Yabucoa", "Yauco"
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center">
              <img src={LOGO_URL} alt="Power Solar Logo" className="h-14 md:h-16 w-auto object-contain" />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="https://ofertas.powersolarprr.com" className="text-[#FF7A00] animate-pulse hover:text-orange-700 font-black transition-colors uppercase text-sm tracking-wider flex items-center gap-1"><Zap className="w-4 h-4" /> Ofertas Exclusivas</a>
            <a href="#productos" className="text-slate-600 hover:text-[#FF7A00] font-semibold transition-colors uppercase text-sm tracking-wider">Equipos</a>
            <a href="#proceso" className="text-slate-600 hover:text-[#FF7A00] font-semibold transition-colors uppercase text-sm tracking-wider">Proceso</a>
            <a href={PHONE_TEL} className="flex items-center gap-2 bg-[#FF7A00] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 group">
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" /> ¡Llamar!
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <a href="https://ofertas.powersolarprr.com" onClick={() => setIsOpen(false)} className="text-lg font-black text-[#FF7A00] p-2 uppercase flex items-center gap-2 bg-orange-50 rounded-xl"><Zap className="w-5 h-5" /> Ofertas Exclusivas</a>
            <a href="#productos" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase">Equipos</a>
            <a href="#proceso" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase">Proceso</a>
            <a href={PHONE_TEL} className="bg-[#FF7A00] text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> ¡Llamar Ahora!
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ==========================================
// FIX 1: URL corregida (typo: YzIWkf → YzlWkf)
// ==========================================
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwc0kmpjBfmierUxYzIWkfpzvY9ydeGkdbz9QSgYnyMiDVu7dwNnxG_Pl7F7BcicRDa/exec";

const SolarForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', town: '', monthlyBill: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [townSearch, setTownSearch] = useState('');
  const [showTowns, setShowTowns] = useState(false);
  const townRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (townRef.current && !townRef.current.contains(event.target as Node)) setShowTowns(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (phoneClean.length < 10) newErrors.phone = "Número inválido";
    if (!formData.town) newErrors.town = "Requerido";
    if (!formData.name.trim()) newErrors.name = "Requerido";
    if (!formData.monthlyBill) newErrors.monthlyBill = "Requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // FIX 2: handleSubmit ahora envía a Supabase Y a Google Sheets
  // ==========================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Paso 1: Guardar en Supabase
      const { error: sbError } = await supabase
        .from('leads')
        .insert([{ 
          name: formData.name.trim(), 
          phone: formData.phone.replace(/\D/g, ''), 
          email: formData.email ? formData.email.trim() : null,
          town: formData.town, 
          monthly_bill: formData.monthlyBill 
        }]);
      
      if (sbError) throw sbError;

      // Paso 2: Enviar a Google Sheets via GET (evita CORS en producción)
      const params = new URLSearchParams({
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        email: formData.email || '',
        town: formData.town,
        monthlyBill: formData.monthlyBill,
        leadSource: 'Power Solar Website'
      });

      await fetch(`${GOOGLE_SHEETS_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors'
      });

      setSubmitted(true);
    } catch (err: any) {
      setErrors({ form: "Error de envío. Intenta de nuevo o llámanos." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) => `
    w-full px-4 py-3 rounded-xl border-2 outline-none transition-all
    bg-slate-900 text-white placeholder-slate-400 font-bold
    ${errors[field] ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'}
  `;

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center animate-in zoom-in duration-300">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-black uppercase">¡Recibido!</h3>
        <p className="text-slate-600 mt-2 italic font-bold">Un experto de Power Solar te llamará pronto.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-[#FF7A00] font-bold underline">Enviar otro</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 uppercase">Orientación Gratis</h3>
        <p className="text-slate-500 italic text-sm font-medium">¡Paga tus placas con lo mismo de la luz!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Nombre Completo" className={inputClass('name')} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required type="tel" placeholder="Teléfono" className={inputClass('phone')} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div className="relative" ref={townRef}>
            <input 
              required placeholder="Pueblo" className={inputClass('town')} autoComplete="off" value={townSearch} 
              onFocus={() => setShowTowns(true)}
              onChange={e => { 
                setTownSearch(e.target.value); 
                setShowTowns(true);
                const match = PUERTO_RICO_TOWNS.find(t => t.toLowerCase() === e.target.value.toLowerCase());
                if(match) setFormData({...formData, town: match});
              }}
            />
            {showTowns && (
              <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl max-h-48 overflow-y-auto shadow-2xl">
                {PUERTO_RICO_TOWNS.filter(t => t.toLowerCase().includes(townSearch.toLowerCase())).map(t => (
                  <div key={t} className="px-4 py-3 hover:bg-orange-600 cursor-pointer text-white border-b border-slate-800 last:border-0" onClick={() => { setFormData({...formData, town: t}); setTownSearch(t); setShowTowns(false); }}>{t}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <input type="email" placeholder="Email (Opcional)" className={inputClass('email')} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />

        <select required className={inputClass('monthlyBill')} value={formData.monthlyBill} onChange={e => setFormData({...formData, monthlyBill: e.target.value})}>
          <option value="">¿Factura mensual de luz?</option>
          <option value="150-250">$150 - $250</option>
          <option value="250-400">$250 - $400</option>
          <option value="400-600">$400 - $600</option>
          <option value="600+">Más de $600</option>
        </select>
        
        {errors.form && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.form}</div>}
        
        <button disabled={loading} type="submit" className="w-full bg-[#FF7A00] text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xl active:scale-95 uppercase hover:bg-orange-600 transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" /> : <>Solicitar Cotización <ArrowRight /></>}
        </button>
      </form>
    </div>
  );
};

const ProductShowcase = () => (
  <section id="productos" className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 uppercase italic">Tecnología Premium Local</h2>
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <img src="https://i.postimg.cc/qRL4v7Qb/595-canadian-solar-bifacial-removebg-preview.png" alt="Panel 595W" className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform" />
        <div className="text-left space-y-6">
          <div className="inline-block bg-orange-100 text-[#FF7A00] px-4 py-1 rounded-full text-xs font-bold uppercase">Potencia Extrema</div>
          <h3 className="text-4xl font-black uppercase italic">Panel Solar 595W Bifacial</h3>
          <ul className="space-y-4">
            <li className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 italic">
              <Layers className="text-[#FF7A00] shrink-0" /> 
              <span><strong>Bifacial:</strong> Captura sol por ambos lados, rindiendo hasta 30% más en techos blancos.</span>
            </li>
            <li className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 italic">
              <Wind className="text-[#FF7A00] shrink-0" /> 
              <span><strong>Resistencia:</strong> Estructuras de aluminio certificadas para vientos huracanados.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left space-y-6 order-2 lg:order-1">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase">Respaldo Inteligente</div>
          <h3 className="text-4xl font-black uppercase italic">Tesla Powerwall 3</h3>
          <ul className="space-y-4">
            <li className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 italic">
              <Zap className="text-[#FF7A00] shrink-0" /> 
              <span><strong>Backup Total:</strong> Enciende aire acondicionado y calentadores sin problemas.</span>
            </li>
            <li className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 italic">
              <Battery className="text-[#FF7A00] shrink-0" /> 
              <span><strong>Control Total:</strong> App inteligente para ver cuánto ahorras cada segundo.</span>
            </li>
          </ul>
        </div>
        <img src="https://i.postimg.cc/L4wLH0PH/Tesla-Powerwall-3-transparente.png" alt="Tesla Powerwall 3" className="w-[60%] mx-auto order-1 lg:order-2 transform hover:scale-105 transition-transform" />
      </div>
    </div>
  </section>
);

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic leading-none">¡Libérate de los apagones desde hoy con Power Solar! 🇵🇷</h1>
          <p className="text-xl md:text-2xl text-slate-600 font-semibold italic">Aprobación instantánea con crédito desde 600.</p>
          <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-2xl font-black uppercase italic animate-pulse shadow-xl text-xs md:text-sm whitespace-nowrap">
            <Clock className="w-4 h-4" /> Instalación en menos de 21 días
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <span className="bg-white border px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"><Star className="text-yellow-500 fill-yellow-500 w-4 h-4"/> Financiamiento 100% Local</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> 25 Años de Garantía</span>
          </div>
        </div>
        <div id="form-hero"><SolarForm /></div>
      </div>
    </section>
  );
};

const ApartmentBatteries = () => (
  <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 skew-x-12 translate-x-32 hidden lg:block"></div>
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <div className="space-y-8 text-left">
        <div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Solución para Apartamentos</div>
        <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none">Baterías para<br /><span className="text-[#FF7A00]">Apartamento</span></h2>
        <p className="text-xl text-slate-300 font-medium italic">¿Vives en un apartamento y no puedes instalar placas? Tenemos la solución perfecta con sistemas portátiles de alta potencia.</p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 font-bold italic">
            <CheckCircle2 className="text-[#FF7A00]" /> Sin instalación fija requerida
          </li>
          <li className="flex items-center gap-3 font-bold italic">
            <CheckCircle2 className="text-[#FF7A00]" /> Carga plug-and-play en minutos
          </li>
          <li className="flex items-center gap-3 font-bold italic">
            <CheckCircle2 className="text-[#FF7A00]" /> Ideal para neveras, TV y abanicos
          </li>
        </ul>
        <div className="pt-4">
          <a 
            href="https://github.com/jerrysocialmediapr-ctrl/EcoFlow-PR.git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF7A00] text-white px-8 py-4 rounded-2xl font-black text-lg uppercase hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95 group"
          >
            Más Información <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full"></div>
        <img 
          src="https://i.postimg.cc/7P9gP93q/Delta-Pro3-frente.webp" 
          alt="EcoFlow Delta Pro 3" 
          className="relative z-10 w-full max-w-lg mx-auto transform hover:scale-105 transition-transform" 
        />
      </div>
    </div>
  </section>
);

const Steps = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proceso" ref={sectionRef} className="py-24 bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic">Tu Proceso Paso a Paso</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { n: "01", t: "Orientación", d: "Evaluación sin costo de tu techo y consumo." },
            { n: "02", t: "Diseño", d: "Diseñamos los planos de instalacion completamente personalizados." },
            { n: "03", t: "Instalación", d: "Servicio local de excelencia 100% en PR." }
          ].map((s, i) => (
            <div 
              key={i} 
              className={`space-y-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className={`w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-2xl transition-all duration-700 hover:scale-110 hover:rotate-3 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                {s.n}
              </div>
              <h3 className="text-xl font-bold uppercase italic">{s.t}</h3>
              <p className="text-slate-500 font-medium italic">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="py-24 bg-[#FF7A00] text-white text-center">
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none">¡Dile Adiós a los <span className="lightning-text">Apagones</span></h2>
      <p className="text-xl font-bold italic underline underline-offset-8 decoration-white/40">Garantía y Servicio 100% en Puerto Rico.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <a href="#form-hero" className="bg-white text-[#FF7A00] px-12 py-5 rounded-2xl font-black text-xl uppercase shadow-2xl hover:scale-105 transition-transform">¡Cotizar Gratis!</a>
        <a href={PHONE_TEL} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl uppercase shadow-2xl flex items-center justify-center gap-2 hover:bg-black transition-colors">
          <Phone /> ¡Llamar Ahora!
        </a>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-orange-100 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <ApartmentBatteries />
        <Steps />
        <FinalCTA />
      </main>
      <footer className="bg-slate-900 text-white py-12 text-center border-t border-slate-800">
        <p className="text-slate-500 text-xs font-bold uppercase italic tracking-widest">Power Solar PR © {new Date().getFullYear()} - El Poder del Sol 🇵🇷</p>
      </footer>
    </div>
  );
}
