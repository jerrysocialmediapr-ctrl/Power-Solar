
import React, { useState, useEffect } from 'react';
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
  Plus,
  Minus,
  Battery,
  Layers,
  Wind,
  Clock
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { FormData } from './types';

// Configuración global de contacto
const LOGO_URL = "https://i.postimg.cc/Y9X0yj6M/logo-power-solar.png";
const PHONE_NUMBER = "(787) 628-1344";
const PHONE_TEL = "tel:7876281344";

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center">
              <img 
                src={LOGO_URL} 
                alt="Power Solar Logo" 
                className="h-14 md:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const container = e.currentTarget.parentElement;
                  if (container && !container.querySelector('.fallback-text')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-text flex flex-col leading-none';
                    fallback.innerHTML = `
                      <span class="text-xl font-black tracking-tighter text-[#333333] uppercase">POWER</span>
                      <span class="text-lg font-bold tracking-widest text-[#FF7A00] -mt-1 uppercase">SOLAR</span>
                    `;
                    container.appendChild(fallback);
                  }
                }}
              />
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-slate-600 hover:text-[#FF7A00] font-semibold transition-colors uppercase text-sm tracking-wider">Beneficios</a>
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
            <a href="#beneficios" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase tracking-tight">Beneficios</a>
            <a href="#productos" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase tracking-tight">Equipos</a>
            <a href="#proceso" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase tracking-tight">Proceso</a>
            <a href={PHONE_TEL} className="bg-[#FF7A00] text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 shadow-lg">
              <Phone className="w-5 h-5" /> ¡Llamar Ahora!
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const SolarForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    town: '',
    monthlyBill: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (supabase) {
        const { error: sbError } = await supabase
          .from('leads')
          .insert([
            { 
              name: formData.name, 
              phone: formData.phone, 
              email: formData.email, 
              town: formData.town, 
              monthly_bill: formData.monthlyBill 
            }
          ]);
        
        if (sbError) throw sbError;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setSubmitted(true);
    } catch (err: any) {
      setError('Error al enviar. Intenta llamar al (787) 628-1344.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold mb-2 uppercase">¡Recibido!</h3>
        <p className="text-slate-600 mb-6">Te llamaremos pronto para tu orientación gratuita.</p>
        <button onClick={() => setSubmitted(false)} className="text-[#FF7A00] font-semibold">Volver a enviar</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 mb-1 uppercase">Cámbiate a Power Solar</h3>
        <p className="text-slate-500 font-medium italic">Orientación y cotización 100% GRATIS hoy.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="text" placeholder="Nombre Completo" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <input required type="tel" placeholder="Teléfono" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input required type="text" placeholder="Pueblo" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" value={formData.town} onChange={e => setFormData({...formData, town: e.target.value})} />
        </div>
        <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white" value={formData.monthlyBill} onChange={e => setFormData({...formData, monthlyBill: e.target.value})}>
          <option value="">¿Pago mensual de luz?</option>
          <option value="150-250">$150 - $250</option>
          <option value="250-400">$250 - $400</option>
          <option value="400-600">$400 - $600</option>
          <option value="600+">Más de $600</option>
        </select>
        
        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
        
        <button disabled={loading} type="submit" className="w-full bg-[#FF7A00] text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xl active:scale-95 uppercase hover:bg-orange-600 transition-colors">
          {loading ? "Procesando..." : "¡Solicitar Cotización!"}
          <ArrowRight className="w-6 h-6" />
        </button>
        
        <p className="text-[10px] text-slate-400 leading-tight text-center mt-4">
          Al presionar el botón, usted acepta ser contactado por uno de nuestros expertos de Power Solar para coordinar una cita para orientación y cotización completamente GRATIS. Sus datos están protegidos.
        </p>
      </form>
    </div>
  );
};

const ProductShowcase = () => {
  return (
    <section id="productos" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 uppercase italic">Tecnología Premium Quality</h2>
          <p className="text-slate-500 text-lg font-medium">Equipos certificados y probados para el clima de Puerto Rico.</p>
        </div>

        {/* Panel Solar de 595W */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group flex justify-center">
            <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="https://i.postimg.cc/qRL4v7Qb/595-canadian-solar-bifacial-removebg-preview.png" 
              alt="Panel Solar de 595W" 
              className="relative z-10 w-full max-w-md h-auto object-contain transform group-hover:scale-105 transition-transform" 
            />
          </div>
          <div className="space-y-8">
            <div className="inline-block bg-orange-100 text-[#FF7A00] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Tecnología Lider</div>
            <h3 className="text-4xl font-black text-slate-900 uppercase">Panel Solar de 595W Bifacial</h3>
            <p className="text-slate-600 text-lg font-medium">No todos los paneles son iguales. No es cantidad de paneles sino lo que cada uno produce. Nuestra placa de 595W es la de mayor producción disponible en la isla.</p>
            <ul className="grid gap-4">
              <li className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                <Layers className="text-[#FF7A00] shrink-0" /> 
                <span><strong>Generación Bifacial:</strong> Captura luz por ambos lados (reflejo del techo), produciendo hasta un 30% más energía.</span>
              </li>
              <li className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                <Wind className="text-[#FF7A00] shrink-0" /> 
                <span><strong>Resistencia Extrema:</strong> Certificación contra vientos huracanados de 175+ MPH.</span>
              </li>
              <li className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                <TrendingUp className="text-[#FF7A00] shrink-0" /> 
                <span><strong>Alta Eficiencia:</strong> Tecnología TopCON que reduce la degradación anual, garantizando décadas de ahorro.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tesla Powerwall 3 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Respaldo Inteligente</div>
            <h3 className="text-4xl font-black text-slate-900 uppercase">Tesla Powerwall 3</h3>
            <p className="text-slate-600 text-lg font-medium">Dile adiós a los apagones para siempre con el sistema de batería más confiable del mundo.</p>
            <ul className="grid gap-4">
              <li className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                <Zap className="text-[#FF7A00] shrink-0" /> 
                <span><strong>Inversor Integrado:</strong> Sistema todo-en-uno de alta eficiencia que maximiza la carga solar.</span>
              </li>
              <li className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                <Battery className="text-[#FF7A00] shrink-0" /> 
                <span><strong>Backup Total:</strong> Capacidad para encender acondicionadores de aire y cisternas sin interrupciones.</span>
              </li>
              <li className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
                <ShieldCheck className="text-[#FF7A00] shrink-0" /> 
                <span><strong>Storm Watch:</strong> Se comunica con el servicio meteorológico para cargar al 100% antes de una tormenta.</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative group flex justify-center">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
            <img 
              src="https://i.postimg.cc/L4wLH0PH/Tesla-Powerwall-3-transparente.png" 
              alt="Tesla Powerwall 3" 
              className="relative z-10 w-[60%] h-auto object-contain transform group-hover:scale-105 transition-transform" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = ({ version }: { version: number }) => {
  const headlines = [
    "¡Libérate de los apagones desde hoy con Power Solar! 🇵🇷",
    "Paga tus Placas con el mismo dinero de tu factura de luz 💡",
    "Tecnología de Punta: Panel Solar de 595w + Powerwall 3 ☀️"
  ];
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
            {headlines[version]}
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 font-semibold italic">
            Toma control de la energía con <span className="text-[#FF7A00]">Power Solar</span>. Aprobación inmediata
          </p>
          
          {/* Badge de Urgencia Destacado */}
          <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-2xl font-black text-lg uppercase italic shadow-xl animate-pulse transform -rotate-1">
            <Clock className="w-6 h-6" /> Instalación en menos de 2 semanas
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-6">
            <div className="flex flex-col gap-2">
              <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-2 w-fit">
                <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" /> Financiamiento 100% Local
              </span>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 w-fit shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> 100% Garantía Local
              </span>
            </div>
            <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-2 h-fit">
              <Sun className="text-[#FF7A00] w-4 h-4" /> Panel Solar de 595w
            </span>
          </div>
        </div>
        <div id="form-hero">
          <SolarForm />
        </div>
      </div>
    </section>
  );
};

const Steps = () => (
  <section id="proceso" className="py-24 bg-white border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase italic">Tu Camino a la Independencia</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { n: "01", t: "Orientación Gratis", d: "Coordinamos una cita para evaluar tu consumo y techo." },
          { n: "02", t: "Diseño", d: "Creamos el diseño del sistema antes de instalarlo en tu hogar y te lo enviamos." },
          { n: "03", t: "Respaldo Local", d: "Instalamos y brindamos servicio 100% en Puerto Rico." }
        ].map((s, i) => (
          <div key={i} className="space-y-4">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-xl">{s.n}</div>
            <h3 className="text-xl font-bold uppercase">{s.t}</h3>
            <p className="text-slate-500 font-medium">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 bg-[#FF7A00] text-white text-center">
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <h2 className="text-4xl md:text-7xl font-black uppercase italic leading-none">
        ¡No Esperes Al Próximo <span className="lightning-text">Apagón</span>
      </h2>
      <p className="text-xl font-bold">Aprovecha el Financiamiento y Garantía 100% Local.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#form-hero" className="bg-white text-[#FF7A00] px-12 py-5 rounded-2xl font-black text-xl uppercase italic shadow-2xl hover:scale-105 transition-transform">Cotizar Gratis Ahora</a>
        <a href={PHONE_TEL} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl uppercase shadow-2xl flex items-center justify-center gap-2 hover:bg-black transition-colors group">
          <Phone className="group-hover:animate-bounce" /> ¡Llamar Ahora!
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
    <div className="min-h-screen bg-slate-50 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        <Hero version={headlineVersion} />
        <ProductShowcase />
        <Steps />
        <FinalCTA />
      </main>
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          Power Solar PR © {new Date().getFullYear()} - Expertos en Energía Solar con Garantía 100% Local 🇵🇷
        </p>
      </footer>
      
      {/* AB Testing UI Indicator (Solo para desarrollo/demo) */}
      <div className="fixed bottom-6 left-6 z-50 bg-white shadow-2xl rounded-2xl p-1 flex gap-1 border border-slate-200">
        {[0, 1, 2].map(v => (
          <button 
            key={v} 
            onClick={() => setHeadlineVersion(v)} 
            className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${headlineVersion === v ? 'bg-[#FF7A00] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            V{v+1}
          </button>
        ))}
      </div>
    </div>
  );
}
