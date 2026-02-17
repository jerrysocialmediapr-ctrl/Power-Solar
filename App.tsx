
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
  Layers
} from 'lucide-react';
import { FormData, Testimonial, FAQItem } from './types';

// Configuración global de contacto
const LOGO_URL = "https://i.postimg.cc/Y9X0yj6M/logo-power-solar.png";
const PHONE_NUMBER = "(787) 628-1344";
const PHONE_TEL = "tel:7876281344";

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
                alt="Power Solar PR Logo" 
                className="h-14 md:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const container = e.currentTarget.parentElement;
                  if (container && !container.querySelector('.fallback-text')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-text flex flex-col leading-none';
                    fallback.innerHTML = `
                      <span class="text-xl font-black tracking-tighter text-[#333333] uppercase">POWER</span>
                      <span class="text-lg font-bold tracking-widest text-[#FF7A00] -mt-1 uppercase">SOLAR PR</span>
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
            <a href={PHONE_TEL} className="flex items-center gap-2 bg-[#FF7A00] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
              <Phone className="w-4 h-4" /> {PHONE_NUMBER}
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <a href="#beneficios" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase tracking-tight">Beneficios</a>
            <a href="#productos" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase tracking-tight">Equipos</a>
            <a href="#proceso" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-700 p-2 uppercase tracking-tight">Proceso</a>
            <a href={PHONE_TEL} className="bg-[#FF7A00] text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 shadow-lg">
              <Phone className="w-5 h-5" /> Llamar Ahora
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">¡Recibido con éxito!</h3>
        <p className="text-slate-600 mb-6">Un experto de <span className="font-bold text-[#FF7A00]">Power Solar </span> te llamará en breve para tu orientación gratuita.</p>
        <button onClick={() => setSubmitted(false)} className="text-[#FF7A00] font-semibold hover:underline">Volver a enviar</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">Cámbiate a Power Solar</h3>
        <p className="text-slate-500 font-medium">Coordina una cita de orientación y cotización gratis hoy mismo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Nombre Completo</label>
          <input required type="text" placeholder="Ej. Juan Pérez" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Teléfono</label>
            <input required type="tel" placeholder="(787) 628-1344" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all font-medium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Pueblo</label>
            <input required type="text" placeholder="Ej. San Juan" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all font-medium" value={formData.town} onChange={e => setFormData({...formData, town: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">Email</label>
          <input required type="email" placeholder="nombre@correo.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all font-medium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">¿Cuánto pagas de Luz?</label>
          <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all appearance-none bg-white font-medium" value={formData.monthlyBill} onChange={e => setFormData({...formData, monthlyBill: e.target.value})}>
            <option value="">Selecciona tu rango</option>
            <option value="150-250">$150 - $250</option>
            <option value="250-400">$250 - $400</option>
            <option value="400-600">$400 - $600</option>
            <option value="600+">Más de $600</option>
          </select>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-[#FF7A00] hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 text-xl active:scale-95 disabled:opacity-70 uppercase tracking-tight">
          {loading ? "Procesando..." : "¡Orientación Gratis!"}
          <ArrowRight className="w-6 h-6" />
        </button>

        <p className="text-[10px] text-slate-400 text-center leading-tight mt-4 italic">
          *Al enviar, autorizas a Power Solar a contactarte para fines de recibir orientación y cotización gratis.
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
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Tecnología Sin Precedentes</h2>
          <p className="text-slate-500 text-lg font-medium">Equipos certificados para las condiciones extremas de Puerto Rico.</p>
        </div>

        {/* Paneles Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group flex justify-center items-center">
            <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <img 
              src="https://i.postimg.cc/qRL4v7Qb/595-canadian-solar-bifacial-removebg-preview.png" 
              alt="Paneles Solares 595W Bifacial" 
              className="relative z-10 w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-8">
            <div>
              <span className="text-[#FF7A00] font-black tracking-widest uppercase text-sm mb-2 block italic">Potencia Máxima</span>
              <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Paneles 595W Bifacial</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                La eficiencia que necesitas. Estos paneles producen energía por ambos lados, aprovechando el reflejo del sol para darte más potencia en menos espacio.
              </p>
            </div>
            <ul className="grid gap-4">
              {[
                { title: "Potencia de 595 Watts ", desc: "La mayor capacidad por panel disponible en la isla." },
                { title: "Generación Bifacial", desc: "Hasta un 25% extra de producción capturando luz reflejada." },
                { title: "Resistencia Huracanada", desc: "Soportan vientos extremos y ambientes salinos costeros." },
                { title: "Garantía de 25 Años", desc: "Rendimiento y piezas protegidos por más de dos décadas." }
              ].map((benefit, i) => (
                <li key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#FF7A00] transition-colors">
                  <div className="bg-[#FF7A00] text-white p-2 rounded-lg h-fit group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm tracking-wide">{benefit.title}</h4>
                    <p className="text-slate-600 text-sm font-medium">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tesla Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="text-[#FF7A00] font-black tracking-widest uppercase text-sm mb-2 block italic">Respaldo Inteligente</span>
              <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Tesla Powerwall 3</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                La batería más avanzada del mundo. Olvídate de los ruidos de planta eléctrica y disfruta de silencio y energía ininterrumpida.
              </p>
            </div>
            <ul className="grid gap-4">
              {[
                { title: "Respaldo Inmediato", desc: "Cambio imperceptible durante los apagones de LUMA." },
                { title: "Capacidad de Arranque", desc: "Puede prender aires acondicionados sin esfuerzo." },
                { title: "Diseño Todo-en-Uno", desc: "Inversor solar integrado para una instalación más limpia." },
                { title: "Control Total vía App", desc: "Gestiona tu energía desde la palma de tu mano." }
              ].map((benefit, i) => (
                <li key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#FF7A00] transition-colors">
                  <div className="bg-[#FF7A00] text-white p-2 rounded-lg h-fit group-hover:scale-110 transition-transform">
                    <Battery className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm tracking-wide">{benefit.title}</h4>
                    <p className="text-slate-600 text-sm font-medium">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative group flex justify-center items-center">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src="https://i.postimg.cc/L4wLH0PH/Tesla-Powerwall-3-transparente.png" 
              alt="Tesla Powerwall 3" 
              className="relative z-10 w-[55%] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs: FAQItem[] = [
    {
      question: "¿Power Solar ofrece financiamiento?",
      answer: "Sí, contamos con diversos planes con $0 pronto. El ahorro en tu factura suele cubrir la inversión mensual."
    },
    {
      question: "¿Qué garantías ofrecen?",
      answer: "Trabajamos con equipos de alta gama que incluyen garantías de 25 años en paneles y baterías."
    },
    {
      question: "¿Cómo sé cuántos paneles necesito?",
      answer: "Nuestros expertos analizan tu factura de luz de los últimos 12 meses para diseñar un sistema que cubra el 100% de tu necesidad."
    },
    {
      question: "¿Puedo añadir más paneles luego?",
      answer: "Sí, nuestros sistemas son modulares y pueden expandirse según tus necesidades futuras de energía."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase tracking-tight italic">Resolviendo Dudas</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
              <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                {activeIndex === index ? <Minus className="w-5 h-5 text-[#FF7A00] flex-shrink-0" /> : <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />}
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6 text-slate-600 font-medium animate-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = ({ version }: { version: number }) => {
  const headlines = [
    "¡Libérate de los apagones con Power Solar! 🇵🇷",
    "Paga tus Placas con lo mismo que le das a LUMA 💡",
    "La Mejor Tecnología: Paneles de 595W + Powerwall 3 ☀️"
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF7A00] px-4 py-1.5 rounded-full text-sm font-black tracking-wide uppercase italic">
              <Zap className="w-4 h-4" /> 
              El sol de PR trabajando para ti
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1] uppercase tracking-tighter italic">
              {headlines[version]}
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
              Toma el control hoy con <span className="text-[#FF7A00]">Power Solar </span>. Diseño profesional, instalación rápida y garantía local.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold uppercase text-xs tracking-widest">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> $0 pronto
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold uppercase text-xs tracking-widest">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> Financiamiento 100% Local
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold uppercase text-xs tracking-widest">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> Garantía 100% local
              </div>
            </div>
          </div>

          <div id="form-hero">
            <SolarForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  return (
    <section id="proceso" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase italic tracking-tighter text-slate-900">Tu Ruta al Ahorro</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10" />
          {[
            { step: "01", title: "Cita Gratis", desc: "Coordinamos una visita o llamada para conocer tus metas de ahorro." },
            { step: "02", title: "Propuesta Solar", desc: "Presentamos un diseño de tu techo con paneles 595W y bateria Tesla Powerwall 3 ." },
            { step: "03", title: "Instalación", desc: "Nuestro equipo certificado instala y certifica tu sistema." }
          ].map((item, i) => (
            <div key={i} className="bg-white text-center space-y-4 px-6 relative group">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-black mx-auto shadow-xl group-hover:bg-[#FF7A00] transition-colors duration-300">
                {item.step}
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-600 font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const data: Testimonial[] = [
    { name: "Carlos Rivera", location: "San Juan", content: "Lo mejor de Power Solar fue la rapidez. En dos semanas ya estaba encendido y ahorrando.", rating: 5 },
    { name: "Marta González", location: "Dorado", content: "La Powerwall 3 es mágica. Se fue la luz y ni nos dimos cuenta. Recomiendo 100%.", rating: 5 },
    { name: "José Ortiz", location: "Ponce", content: "Excelentes paneles. Generan mucho más de lo que esperaba incluso en días nublados.", rating: 5 }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-tighter italic">Vidas Transformadas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((t, i) => (
            <div key={i} className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-[#FF7A00] transition-colors group">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />)}
              </div>
              <p className="text-xl italic text-slate-200 mb-8 font-medium">"{t.content}"</p>
              <div>
                <p className="font-black text-white text-lg uppercase tracking-wider group-hover:text-[#FF7A00] transition-colors">{t.name}</p>
                <p className="text-[#FF7A00] font-bold text-xs tracking-widest uppercase">{t.location}, PR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 bg-[#FF7A00] text-white text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="max-w-4xl mx-auto px-4 space-y-10 relative z-10">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">¿Vas a esperar <br/> al próximo apagón?</h2>
        <p className="text-xl md:text-3xl text-orange-50 font-black uppercase tracking-tight">Actúa ahora y asegura tu paz con Power Solar.</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
          <a href="#form-hero" className="bg-white text-[#FF7A00] px-12 py-6 rounded-2xl font-black text-2xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95 uppercase tracking-tight italic">
            Cotizar Gratis
          </a>
          <a href={PHONE_TEL} className="bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 uppercase tracking-tight">
            <Phone className="w-8 h-8" /> Llamar Ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [headlineVersion, setHeadlineVersion] = useState(0);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#FF7A00] selection:text-white bg-slate-50">
      <Navbar />
      <main>
        <Hero version={headlineVersion} />
        <ProductShowcase />
        <Steps />
        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>

      <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img 
                  src={LOGO_URL} 
                  alt="Power Solar  Footer Logo" 
                  className="h-14 w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const container = e.currentTarget.parentElement;
                    if (container && !container.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text flex flex-col leading-none';
                      fallback.innerHTML = `
                        <span class="text-xl font-black tracking-tighter text-white uppercase">POWER</span>
                        <span class="text-lg font-bold tracking-widest text-[#FF7A00] -mt-1 uppercase">SOLAR PR</span>
                      `;
                      container.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <p className="text-slate-400 max-w-sm font-medium">Líderes en tecnología solar bifacial y almacenamiento inteligente en Puerto Rico. Tu independencia empieza con nosotros.</p>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <p className="font-black text-2xl uppercase tracking-tight italic">¿Listo para el cambio?</p>
              <a href={PHONE_TEL} className="text-3xl font-black text-[#FF7A00] hover:underline tracking-tighter">{PHONE_NUMBER}</a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs italic font-medium">Power Solar - Todos los derechos reservados © {new Date().getFullYear()}. Especialistas en Paneles Solares.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <a href="#" className="hover:text-[#FF7A00] transition-colors">Privacidad</a>
              <a href="#" className="hover:text-[#FF7A00] transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Variation Switcher for A/B Testing */}
      <div className="fixed bottom-6 left-6 z-50 bg-white/90 backdrop-blur shadow-2xl rounded-2xl border border-slate-200 p-1 flex items-center gap-1">
        {[0, 1, 2].map((v) => (
          <button
            key={v}
            onClick={() => setHeadlineVersion(v)}
            className={`w-9 h-9 rounded-xl font-black text-[10px] transition-all ${headlineVersion === v ? 'bg-[#FF7A00] text-white shadow-lg' : 'bg-transparent text-slate-400 hover:bg-slate-100'}`}
          >
            V{v + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
