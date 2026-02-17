
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
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
  Database
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { FormData } from './types';

// ==========================================
// CONFIGURACIÓN DE SUPABASE
// ==========================================
const MANUAL_SUPABASE_URL = "https://qgzfpfublkjwpgbdkwrf.supabase.co"; 
const MANUAL_SUPABASE_ANON_KEY = "sb_publishable_jc33HIOl5H0UDhF-nR5b5g_7gxTxine";
// ==========================================

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

// Lógica de conexión
const finalUrl = (import.meta as any).env?.VITE_SUPABASE_URL || MANUAL_SUPABASE_URL;
const finalKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || MANUAL_SUPABASE_ANON_KEY;
const supabase = (finalUrl && finalKey) ? createClient(finalUrl, finalKey) : null;

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
    </nav>
  );
};

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
      if (townRef.current && !townRef.current.contains(event.target as Node)) {
        setShowTowns(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (phoneClean.length < 10) newErrors.phone = "Mínimo 10 números.";
    if (!formData.town) newErrors.town = "Selecciona un pueblo.";
    if (!formData.name.trim()) newErrors.name = "Nombre requerido.";
    if (!formData.monthlyBill) newErrors.monthlyBill = "Factura requerida.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      if (!supabase) throw new Error("Error de conexión. Verifica las llaves.");

      // Los nombres de las columnas aquí DEBEN coincidir con los de Supabase
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
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error técnico:", err);
      // Mostramos el error técnico real para que el usuario sepa qué falta en Supabase
      setErrors({ form: `Error: ${err.message || 'Fallo de red'}. Asegúrate de correr el script SQL en Supabase.` });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) => `
    w-full px-4 py-3 rounded-xl border outline-none transition-all
    bg-slate-900 text-white placeholder-slate-400 font-bold text-base
    ${errors[field] ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'}
  `;

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center animate-in zoom-in duration-300 border border-green-100">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-black uppercase text-slate-900">¡Recibido con éxito!</h3>
        <p className="text-slate-600 mt-2 italic font-bold">Un experto local de Power Solar te contactará hoy mismo.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-[#FF7A00] font-black underline hover:text-orange-700">ENVIAR OTRO</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FF7A00]"></div>
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 uppercase leading-none mb-2 italic">Orientación Gratis</h3>
        <p className="text-slate-500 italic text-sm font-bold">Respaldo garantizado ante cualquier apagón.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            required placeholder="Nombre y Apellido" className={inputClass('name')}
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          {errors.name && <p className="text-red-500 text-[10px] font-black mt-1 uppercase">{errors.name}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input 
              required type="tel" placeholder="Teléfono" className={inputClass('phone')}
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} 
            />
            {errors.phone && <p className="text-red-500 text-[10px] font-black mt-1 uppercase">{errors.phone}</p>}
          </div>
          <div className="relative" ref={townRef}>
            <input 
              required placeholder="Pueblo" className={inputClass('town')} autoComplete="off"
              value={townSearch} onFocus={() => setShowTowns(true)}
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
                  <div key={t} className="px-4 py-3 hover:bg-orange-600 cursor-pointer text-white font-bold border-b border-slate-800 last:border-0" onClick={() => { setFormData({...formData, town: t}); setTownSearch(t); setShowTowns(false); }}>{t}</div>
                ))}
              </div>
            )}
            {errors.town && <p className="text-red-500 text-[10px] font-black mt-1 uppercase">{errors.town}</p>}
          </div>
        </div>

        <input 
          type="email" placeholder="Email (Opcional)" className={inputClass('email')}
          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
        />

        <div>
          <select 
            required className={inputClass('monthlyBill')}
            value={formData.monthlyBill} onChange={e => setFormData({...formData, monthlyBill: e.target.value})}
          >
            <option value="">¿Cuánto pagas de luz?</option>
            <option value="150-250">$150 - $250</option>
            <option value="250-400">$250 - $400</option>
            <option value="400-600">$400 - $600</option>
            <option value="600+">Más de $600</option>
          </select>
          {errors.monthlyBill && <p className="text-red-500 text-[10px] font-black mt-1 uppercase">{errors.monthlyBill}</p>}
        </div>
        
        {errors.form && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-[10px] font-black flex items-start gap-2 border border-red-200 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0" /> {errors.form}
          </div>
        )}
        
        <button 
          disabled={loading} type="submit" 
          className="w-full bg-[#FF7A00] text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xl active:scale-95 uppercase hover:bg-orange-600 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Solicitar Cotización <ArrowRight /></>}
        </button>
      </form>
    </div>
  );
};

// ... (Resto de los componentes: ProductShowcase, Hero, Steps, FinalCTA, App se mantienen igual para no perder la estética)

const ProductShowcase = () => (
  <section id="productos" className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 uppercase italic">Tecnología de Clase Mundial</h2>
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <img src="https://i.postimg.cc/qRL4v7Qb/595-canadian-solar-bifacial-removebg-preview.png" alt="Panel 595W" className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform" />
        <div className="text-left space-y-6">
          <span className="bg-orange-100 text-[#FF7A00] px-4 py-1 rounded-full text-xs font-bold uppercase">Potencia Extrema</span>
          <h3 className="text-4xl font-black uppercase italic">Panel Solar 595W Bifacial</h3>
          <p className="text-slate-600 italic font-medium">Capta energía por ambos lados para rendir hasta un 30% más que paneles comunes.</p>
          <div className="grid gap-4">
            <div className="flex gap-4 p-5 bg-slate-50 rounded-xl italic">
              <Layers className="text-[#FF7A00]" /> <strong>Tecnología Bifacial:</strong> Ideal para techos de Puerto Rico.
            </div>
            <div className="flex gap-4 p-5 bg-slate-50 rounded-xl italic">
              <Wind className="text-[#FF7A00]" /> <strong>Resistencia Huracán:</strong> Certificado vientos de 175+ MPH.
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-left space-y-6 order-2 lg:order-1">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase">Respaldo Inteligente</span>
          <h3 className="text-4xl font-black uppercase italic">Tesla Powerwall 3</h3>
          <p className="text-slate-600 italic font-medium">La batería más avanzada del mundo, instalada por expertos locales.</p>
          <div className="grid gap-4">
            <div className="flex gap-4 p-5 bg-slate-50 rounded-xl italic">
              <Zap className="text-[#FF7A00]" /> <strong>Energía Ininterrumpida:</strong> Ni notarás cuando se vaya la luz.
            </div>
            <div className="flex gap-4 p-5 bg-slate-50 rounded-xl italic">
              <Battery className="text-[#FF7A00]" /> <strong>App Tesla:</strong> Controla todo desde tu celular.
            </div>
          </div>
        </div>
        <img src="https://i.postimg.cc/L4wLH0PH/Tesla-Powerwall-3-transparente.png" alt="Tesla Powerwall 3" className="w-[60%] mx-auto order-1 lg:order-2 transform hover:scale-105 transition-transform" />
      </div>
    </div>
  </section>
);

const Hero = ({ version }: { version: number }) => {
  const headlines = [
    "¡Libérate de los apagones desde hoy con Power Solar! 🇵🇷",
    "Paga tus Placas con el mismo dinero de tu factura de luz 💡",
    "Panel Solar de 595w + Tesla Powerwall 3 ☀️"
  ];
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">{headlines[version]}</h1>
          <p className="text-xl text-slate-600 font-bold italic">Instalación rápida. Servicio local. Garantía de 25 años.</p>
          <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-2xl font-black uppercase italic animate-pulse shadow-xl">
            <Clock /> Instalación en tiempo récord
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <span className="bg-white border px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"><Star className="text-yellow-500 fill-yellow-500 w-4 h-4"/> 100% Capital Local</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Aprobación Rápida</span>
          </div>
        </div>
        <div id="form-hero"><SolarForm /></div>
      </div>
    </section>
  );
};

const Steps = () => (
  <section id="proceso" className="py-24 bg-white border-y">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic">Tu Proceso Es Simple</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { n: "01", t: "Orientación", d: "Evaluamos tu techo y consumo gratis." },
          { n: "02", t: "Propuesta", d: "Diseñamos tu ahorro personalizado en 3D." },
          { n: "03", t: "Instalación", d: "Activamos tu independencia energética." }
        ].map((s, i) => (
          <div key={i} className="space-y-4">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-2xl">{s.n}</div>
            <h3 className="text-xl font-bold uppercase italic">{s.t}</h3>
            <p className="text-slate-500 font-medium italic">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 bg-[#FF7A00] text-white text-center">
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <h2 className="text-5xl md:text-7xl font-black uppercase italic leading-none">¡Dile Adiós a <span className="lightning-text">LUMA</span></h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#form-hero" className="bg-white text-[#FF7A00] px-12 py-5 rounded-2xl font-black text-xl uppercase shadow-2xl hover:scale-105 transition-transform">Cotizar Ahora</a>
        <a href={PHONE_TEL} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl uppercase shadow-2xl flex items-center justify-center gap-2 hover:bg-black transition-colors">
          <Phone /> ¡Llamar Ahora!
        </a>
      </div>
    </div>
  </section>
);

export default function App() {
  const [headlineVersion, setHeadlineVersion] = useState(0);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.substring(1);
        document.getElementById(id || '')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-orange-100 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero version={headlineVersion} />
        <ProductShowcase />
        <Steps />
        <FinalCTA />
      </main>
      <footer className="bg-slate-900 text-white py-12 text-center border-t border-slate-800">
        <p className="text-slate-500 text-xs font-bold uppercase italic tracking-widest">Power Solar PR © {new Date().getFullYear()} - El Poder del Sol 🇵🇷</p>
      </footer>
      
      {/* Botones de Control para Testing (puedes ignorarlos) */}
      <div className="fixed bottom-6 left-6 z-50 bg-white shadow-2xl rounded-2xl p-1 flex gap-1 border border-slate-200">
        {[0, 1, 2].map(v => (
          <button key={v} onClick={() => setHeadlineVersion(v)} className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${headlineVersion === v ? 'bg-[#FF7A00] text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}>V{v+1}</button>
        ))}
      </div>
    </div>
  );
}
