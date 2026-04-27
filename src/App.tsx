import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Menu, X, Play, Image as ImageIcon, ChevronRight, User, MousePointerClick, Cpu, PenTool } from 'lucide-react';
import { cn } from './lib/utils';

// --- Global Lightbox Context ---
type MediaType = { type: 'image' | 'video'; src: string; alt: string };
const LightboxContext = createContext<{ openMedia: (media: MediaType) => void }>({ openMedia: () => {} });

// --- Dummy Data ---
const portfolioFeatures = [
  { 
    title: "小米透明电视 品牌形象型产品", 
    desc: "主导“透明电视”视觉创意与互动策划。将高维技术概念转化为极简感官体验，确立品牌技术壁垒与高端认知。", 
    link: "https://mp.weixin.qq.com/s/3uV8k0RYHAj-AMu0s92xpg",
    secondaryLink: { title: "相似案例（小米壁画电视）", url: "https://www.mi.com/arttv?cfrom=search" },
    strategyId: "strategy-visual",
    image: "/photo3.jpeg"
  },
  { 
    title: "超大屏电视新品 内容构建", 
    desc: "统筹大屏产品矩阵包装与传播。聚焦“空间体验”定制差异化卖点，打破尺寸认知壁垒，助力业务高效转化。",
    link: "https://www.mi.com/redmitv/98?client_id=180100",
    strategyId: "strategy-selling",
    image: "/photo4.jpg"
  },
  { 
    title: "小米首款超高端OLED电视 技术点传达", 
    desc: "深度解构显示技术，以“大师级”心智驱动全链路创意。将硬核参数转化为场景价值，实现技术降维传达。", 
    link: "https://mp.weixin.qq.com/s/kKvpj79Q5FJWdy8TgES7IA",
    image: "/photo5.jpeg"
  },
  { 
    title: "MIUI for TV 3.0 上线 用户沟通", 
    desc: "主导MIUI for TV 3.0体验化拆解。通过动态创意演绎交互优势，将系统实力具象化为用户感知的品牌软实力。", 
    link: "https://mp.weixin.qq.com/s/9fnfod8wuKcRB5oom8sswA",
    image: "/photo6.jpg"
  }
];

const radarData = [
  { subject: '策略思考', A: 90, fullMark: 100 },
  { subject: '视觉/文案功底', A: 85, fullMark: 100 },
  { subject: '项目统筹', A: 88, fullMark: 100 },
  { subject: 'AIGC工具链', A: 75, fullMark: 100 },
  { subject: 'B端业务理解', A: 70, fullMark: 100 },
];

const mediaPlaceholder = (id: number) => `https://images.unsplash.com/photo-${[
  '1618005182384-a83a8bd57fbe', '1550751827-4bd374c3f58b', '1620641788421-7a1c342ea42e',
  '1451187580459-43490279c0fa', '1526374965328-7f61d4dc18c5', '1633511090172-e1d13f9cbaaf',
  '1614729939124-032f0b56c9ce', '1639322537228-f71fa6ba62d0', '1581091226825-a6a2a5aee158'
][id % 9]}?q=80&w=1200&auto=format&fit=crop`;

const videoPlaceholder = "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-3852-large.mp4";

// --- Components ---

function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 left-6 z-[100] preserve-3d">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
            className="absolute top-0 left-0 w-64 glass-panel rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-tencent-blue">导航目录</span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                <X size={20} className="text-tencent-gray" />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              <button onClick={() => scrollTo('profile')} className="text-left py-2 px-3 rounded-lg hover:bg-white/50 text-tencent-gray hover:text-tencent-blue transition-all font-medium text-sm">个人档案 Profile</button>
              <button onClick={() => scrollTo('project-planning')} className="text-left py-2 px-3 rounded-lg hover:bg-white/50 text-tencent-gray hover:text-tencent-blue transition-all font-medium text-sm">需求对接与创意指导案例</button>
              <button onClick={() => scrollTo('portfolio-overview')} className="text-left py-2 px-3 rounded-lg hover:bg-white/50 text-tencent-gray hover:text-tencent-blue transition-all font-medium text-sm">文案及视觉作品概览</button>
              <button onClick={() => scrollTo('aigc-practice')} className="text-left py-2 px-3 rounded-lg hover:bg-white/50 text-tencent-gray hover:text-tencent-blue transition-all font-medium text-sm">AIGC 深度实操</button>
              <button onClick={() => scrollTo('case-studies')} className="text-left py-2 px-3 rounded-lg hover:bg-white/50 text-tencent-gray hover:text-tencent-blue transition-all font-medium text-sm">项目案例</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer group font-medium text-tencent-blue",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="w-4 h-4 flex flex-col justify-center gap-[3px]">
          <span className="block w-full h-[2px] bg-tencent-blue"></span>
          <span className="block w-2/3 h-[2px] bg-tencent-blue"></span>
          <span className="block w-full h-[2px] bg-tencent-blue"></span>
        </div>
        <span className="text-sm">快速导航</span>
      </motion.button>
    </div>
  );
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [showScroll, setShowScroll] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth + 1) {
      setShowScroll(false);
      return;
    }
    setShowScroll(true);
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  const syncScrollToPosition = (clientX: number) => {
    if (!scrollRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const container = scrollRef.current;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const progress = x / rect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollLeft = progress * maxScroll;
  };

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
      const ro = new ResizeObserver(handleScroll);
      ro.observe(el);
      return () => {
        el.removeEventListener('scroll', handleScroll);
        ro.disconnect();
      };
    }
  }, []);

  React.useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      syncScrollToPosition(e.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full">
      <div 
        ref={scrollRef} 
        className={cn("overflow-x-auto hide-scrollbar snap-x", className)}
      >
        {children}
      </div>
      {showScroll && (
        <div className="mt-3 flex justify-center px-6">
          <div 
            ref={trackRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              syncScrollToPosition(e.clientX);
            }}
            className="w-32 h-2 -my-0.5 bg-slate-200/40 rounded-full cursor-pointer relative group"
          >
            <motion.div 
               className={cn(
                 "absolute top-0.5 left-0 h-1 bg-tencent-blue/60 rounded-full transition-colors",
                 isDragging ? "bg-tencent-blue" : "group-hover:bg-tencent-blue/80"
               )}
               initial={false}
               animate={{ left: `${scrollProgress * 0.7}%` }}
               style={{ width: '30%' }}
               transition={{ type: "spring", bounce: 0, duration: 0.1 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHead({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
        <span className="w-2 h-8 bg-tencent-blue rounded-full block"></span>
        <span className="title-gradient-breathe">{title}</span>
      </h2>
      {subtitle && <p className="text-tencent-gray mt-3 text-lg ml-5">{subtitle}</p>}
    </motion.div>
  );
}

interface MediaCardProps {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  mediaContainerClassName?: string;
  externalLink?: string;
  objectMode?: 'cover' | 'contain';
  key?: React.Key;
}

function MediaCard({ type, src, alt, caption, className, mediaContainerClassName, externalLink, objectMode = 'cover' }: MediaCardProps) {
  const { openMedia } = useContext(LightboxContext);
  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
      return;
    }
    openMedia({ type, src, alt });
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn("group cursor-pointer rounded-xl overflow-hidden glass-panel flex flex-col snap-start shrink-0 relative", className)}
      onClick={handleClick}
    >
      <div className={cn("relative w-full aspect-video overflow-hidden bg-black/5", mediaContainerClassName)}>
        {type === 'image' ? (
          <img src={src} alt={alt} className={cn("w-full h-full transition-transform duration-500 group-hover:scale-105", objectMode === 'cover' ? "object-cover" : "object-contain p-2")} onError={(e) => { e.currentTarget.src = mediaPlaceholder(0); }} />
        ) : (
          <div className="w-full h-full relative">
            <video 
              src={src} 
              className={cn("w-full h-full transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100", objectMode === 'cover' ? "object-cover" : "object-contain p-2")} 
              muted 
              loop 
              playsInline 
              autoPlay
              onError={(e) => { 
                const target = e.currentTarget;
                if (!target.src.includes('mixkit')) {
                  target.src = videoPlaceholder;
                  target.load();
                }
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
                <Play size={24} className="ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <div className="p-4 bg-white/40 backdrop-blur-sm border-t border-white/40 grow flex items-center">
          <p className="text-sm text-tencent-gray font-medium leading-snug">{caption}</p>
        </div>
      )}
    </motion.div>
  );
}

function HeroProfile() {
  return (
    <section id="profile" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Background large typography */}
      <div className="absolute top-[12%] left-[-2%] text-[14vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-200/40 to-transparent leading-none select-none tracking-tighter whitespace-nowrap z-0 pointer-events-none">
        TESSY
      </div>
      <div className="absolute top-[35%] right-[-5%] text-[16vw] font-black text-transparent bg-clip-text bg-gradient-to-t from-blue-300/30 to-transparent leading-none select-none tracking-tighter whitespace-nowrap z-0 pointer-events-none">
        YANG
      </div>

      {/* Logo Header */}
      <div className="absolute top-6 right-6 flex justify-end items-center mb-4 z-20">
        <div className="flex items-center gap-2 opacity-90 backdrop-blur-md bg-white/60 px-5 py-2.5 rounded-full border border-white shadow-sm">
          <div className="w-5 h-5 bg-gradient-to-br from-[#00A4FF] to-[#0052D9] rounded-[4px] shadow-inner"></div>
          <span className="font-bold tracking-tight text-tencent-dark text-sm">Tencent Cloud <span className="font-medium text-slate-400 ml-1">| 资深内容创意</span></span>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 mt-8">
        
        {/* Left Side: Text Details */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-12 lg:col-span-6 flex flex-col justify-center relative"
        >
           <div className="absolute -left-12 -top-12 w-32 h-32 bg-[#00A4FF]/10 rounded-full blur-2xl z-[-1]"></div>
           <p className="text-[#00A4FF] font-black tracking-[0.2em] uppercase mb-6 text-sm flex items-center gap-3">
             <span className="w-8 h-[2px] bg-gradient-to-r from-[#0052D9] to-[#00A4FF] block"></span> PORTFOLIO 2026
           </p>
           <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-tencent-dark mb-6 leading-[1.15]">
             资深内容创意<br />
             <span className="title-gradient-breathe">个人作品集</span>
           </h1>
           <p className="text-xl text-slate-500 mb-10 leading-relaxed sm:whitespace-nowrap font-medium">
            致力于将晦涩的技术概念，转化为更易感知、占据心智的创意表达。
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <span className="px-5 py-2 bg-white/80 backdrop-blur-xl text-tencent-blue text-sm rounded-full border border-white/60 shadow-sm font-bold tracking-wide">10年内容创意人</span>
            <span className="px-5 py-2 bg-white/80 backdrop-blur-xl text-tencent-blue text-sm rounded-full border border-white/60 shadow-sm font-medium tracking-wide">5年+科技/互联网经验</span>
            <span className="px-5 py-2 bg-white/80 backdrop-blur-xl text-tencent-blue text-sm rounded-full border border-white/60 shadow-sm font-medium tracking-wide">AIGC全链路实践者</span>
          </div>
        </motion.div>

        {/* Right side: Giant Portrait + overlapping Radar Chart. */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="col-span-12 lg:col-span-6 relative h-[500px] lg:h-[650px] flex items-center justify-center mt-12 lg:mt-0"
        >
          {/* Main Portrait Frame */}
          <div className="absolute inset-4 right-4 lg:right-12 bottom-12 rounded-[2.5rem] overflow-hidden border-[6px] border-white/90 shadow-2xl z-10 group bg-slate-100">
             <div className="absolute inset-0 bg-gradient-to-t from-[#0052D9]/80 via-[#0052D9]/10 to-transparent z-10 mix-blend-multiply opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
             {/* 替换为图片1 */}
             <img src="/photo1.jpg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"; }} alt="Creative Director Portrait" className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-1000" />
             <div className="absolute bottom-8 left-8 z-20">
               <p className="text-white font-black text-4xl tracking-tight leading-none drop-shadow-lg mb-1">内容创意</p>
               <p className="text-white/90 font-bold text-sm tracking-[0.2em] uppercase drop-shadow-md">Creative Strategist</p>
             </div>
          </div>

          {/* Decor: Glass curve behind */}
          <div className="absolute inset-0 right-0 lg:-right-8 top-12 lg:top-24 rounded-[3rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl z-0 transform rotate-6"></div>

          {/* Radar Chart Overlay - Floating on the lower right, accommodating the cutout person */}
          <div className="absolute -bottom-6 right-0 lg:-right-6 w-[340px] lg:w-[400px] z-30 bg-white/90 backdrop-blur-3xl p-4 lg:p-5 rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,82,217,0.18)] border border-white flex flex-row items-start">
             {/* 抠出的人像 (图片2) 放在左侧空白处 */}
             <div className="w-[16%] ml-4 mt-1 pointer-events-none relative z-20 flex-shrink-0 overflow-visible">
               <img src="/photo2.png" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                    alt="Creative Portrait" 
                    className="w-full h-auto object-contain drop-shadow-[0_8px_30px_rgba(0,82,217,0.1)] [mask-image:linear-gradient(to_bottom,black_95%,transparent)]" />
             </div>
             
             {/* 右侧雷达图区域 */}
             <div className="flex flex-col flex-grow relative z-10 pl-6 pt-1 overflow-hidden">
               <div className="flex justify-between items-center mb-1 pr-2">
                 <span className="text-sm font-black text-tencent-dark tracking-wide">能力模型</span>
                 <span className="text-[9px] font-bold text-white bg-gradient-to-r from-[#0052D9] to-[#00A4FF] px-2 py-[2px] rounded shadow-sm">AIGC DRIVEN</span>
               </div>
               <div className="w-full aspect-square max-h-[190px]">
                 <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="62%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3"/>
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <Radar name="能力值" dataKey="A" stroke="url(#radarStroke)" strokeWidth={3} fill="url(#radarFill)" fillOpacity={1} />
                    <defs>
                      <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00A4FF" stopOpacity={0.5}/>
                        <stop offset="100%" stopColor="#0052D9" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="radarStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00A4FF" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#0052D9" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                  </RadarChart>
                 </ResponsiveContainer>
               </div>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

function SectionProjectPlanning() {
  return (
    <section id="project-planning" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
      <SectionHead title="需求对接与创意指导案例" subtitle="全链路项目管理与深思熟虑的创意推导" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6 md:px-0">
        <div className="bento-card p-6 flex flex-col items-start gap-4 border-tencent-blue/10 bg-gradient-to-br from-white to-blue-50/30">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-tencent-blue shadow-sm">
            <PenTool size={20} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-tencent-dark mb-2">系列新品传播策划全案</h4>
            <p className="text-xs text-tencent-gray mb-6 leading-relaxed">覆盖全渠道新品上市传播策略，包含核心心智提炼、媒介矩阵排期与内容生产工作流。</p>
            <a 
              href="/75英寸新品传播内容策划全案.pdf" 
              target="_blank" 
              className="bg-[#0052D9] hover:bg-[#003CAB] text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 text-[11px]"
            >
              点击打开“75英寸新品传播内容策划全案” <ChevronRight size={14}/>
            </a>
          </div>
        </div>

        <div className="bento-card p-6 flex flex-col items-start gap-4 border-tencent-blue/10 bg-gradient-to-br from-white to-blue-50/30">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-tencent-blue shadow-sm">
            <Cpu size={20} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-tencent-dark mb-2">高端产品发布项目案</h4>
            <p className="text-xs text-tencent-gray mb-6 leading-relaxed">品牌大师系列（OLED/大师版）高端产品线全案策划，深耕顶奢认知与极致科技品牌溢价。</p>
            <a 
              href="/大师至尊纪念版电视发布方案.pdf" 
              target="_blank" 
              className="bg-[#0052D9] hover:bg-[#003CAB] text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 text-[11px]"
            >
              点击打开“大师至尊纪念版电视发布方案” <ChevronRight size={14}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section1() {
  return (
    <section id="portfolio-overview" className="max-w-7xl mx-auto px-6 py-24">
      <SectionHead title="文案及视觉作品概览" subtitle="融合品牌调性与创意的全场景内容输出" />
      
      {/* Hyperlinks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20 max-w-6xl mx-auto px-4">
        {portfolioFeatures.map((item, i) => (
          <div key={i} className="bento-card overflow-hidden flex flex-col group p-0 border border-slate-100 hover:shadow-xl transition-all duration-500 bg-white hover:-translate-y-1">
            {/* Top Side: Visual aspect-ratio flexible */}
            <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 flex items-center justify-center p-3">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-md" 
              />
              <div className="absolute inset-0 bg-tencent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            {/* Bottom side: Content */}
            <div className="p-4 flex flex-col grow">
              <h4 className="text-[15px] font-bold text-tencent-dark mb-2 leading-snug">{item.title}</h4>
              <p className="text-[10px] text-tencent-gray mb-6 leading-relaxed line-clamp-3">{item.desc}</p>
              <div className="flex flex-col gap-3 mt-auto">
                 <div className="flex items-center gap-4">
                   <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[12px] text-tencent-blue font-bold flex items-center gap-1 hover:opacity-70 transition-opacity group/btn">查看作品 <ChevronRight size={13} className="group-hover/btn:translate-x-1 transition-transform"/></a>
                   {item.strategyId && (
                     <button onClick={() => document.getElementById(item.strategyId)?.scrollIntoView({ behavior: 'smooth' })} className="text-[11px] text-tencent-gray font-medium flex items-center gap-1 hover:text-tencent-blue transition-colors group/btn2">查看策略 <ChevronRight size={13} className="group-hover/btn2:translate-x-1 transition-transform"/></button>
                   )}
                 </div>
                 {(item as any).secondaryLink && (
                   <a href={(item as any).secondaryLink.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-tencent-blue/80 font-medium flex flex-col items-start gap-0.5 hover:opacity-70 transition-opacity group/btn-sec text-left pt-2 border-t border-slate-50">
                     <span className="flex items-center gap-1 text-slate-400">相似案例 <ChevronRight size={11} className="group-hover/btn-sec:translate-x-1 transition-transform"/></span>
                     <span className="text-[10px] font-normal">小米壁画电视</span>
                   </a>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Images */}
      <div className="mb-16 space-y-12">
        <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
          <ImageIcon size={20} className="text-tencent-blue" /> <span className="title-gradient-breathe">平面案例展示</span>
        </h3>
        
        {[
          { title: "技术向产品海报", count: 6 },
          { title: "创意联名海报", count: 4 },
          { title: "品牌节气创意海报", count: 5 },
          { title: "风格化系列海报", count: 6 },
          { 
            title: "其他创意海报", 
            customImages: [
              "/photo40.jpeg", 
              "/photo41.jpeg", 
              "/photo42.jpeg", 
              "/photo28.jpeg", 
              "/photo29.jpeg", 
              "/photo30.jpeg"
            ] 
          }
        ].reduce(({ rows, nextId }, cat: any) => {
          const rowItems = cat.customImages 
            ? cat.customImages.map((img: string) => ({ title: cat.title, img }))
            : Array.from({ length: cat.count }).map((_, i) => ({
              title: cat.title,
              img: `/photo${nextId + i}.jpeg`
            }));
          return { 
            rows: [...rows, { title: cat.title, items: rowItems }], 
            nextId: nextId + (cat.count || 0) 
          };
        }, { rows: [] as {title: string, items: {title: string, img: string}[]}[], nextId: 7 }).rows.map((row, rowIdx) => (
          <div key={rowIdx} className="space-y-4">
            <div className="flex justify-between items-center pr-2">
              <h4 className="text-sm font-bold text-tencent-dark/80 ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tencent-blue"></span>
                {row.title}
              </h4>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-tencent-blue/50 uppercase tracking-widest">
                <span>Slide</span>
                <ChevronRight size={12} className="animate-bounce-x" />
              </div>
            </div>
            <HorizontalScroll className="-mx-6 px-6 pb-2">
              <div className="flex gap-4">
                {row.items.map((item, i) => (
                  <MediaCard 
                    key={i} 
                    type="image" 
                    src={item.img} 
                    alt={`${item.title} ${i+1}`}
                    className="w-[calc((100%-48px)/2.5)] sm:w-[calc((100%-64px)/3.5)] md:w-[calc((100%-80px)/4.5)] flex-shrink-0 snap-start"
                    mediaContainerClassName="aspect-[9/16]"
                    externalLink={item.img}
                  />
                ))}
              </div>
            </HorizontalScroll>
          </div>
        ))}
      </div>

      {/* Alternating Promo Videos */}
      <div className="mb-24">
        <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
          <Play size={20} className="text-tencent-blue" /> <span className="title-gradient-breathe">视频案例展示</span>
        </h3>
        <h4 className="text-lg font-semibold mb-6 text-tencent-dark">产品宣传片</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promoVideos.map((video, i) => (
            <div key={i} className="flex flex-col bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all h-full group">
              <div className="w-full aspect-video overflow-hidden">
                <MediaCard 
                  type="video" 
                  src={video.previewUrl || videoPlaceholder} 
                  alt={video.title}
                  className="w-full h-full !rounded-none !border-none !shadow-none !bg-transparent"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-tencent-dark mb-3">{video.title}</h4>
                <p className="text-tencent-gray leading-relaxed mb-4 font-medium text-xs flex-grow">
                  {video.desc}
                </p>
                
                {video.images && (
                  <div className={cn("grid gap-2 mb-6", video.images.length === 1 ? "grid-cols-1 max-w-[70%] mx-auto" : "grid-cols-2")}>
                    {video.images.map((img, imgIdx) => (
                      <div key={imgIdx} className={cn("rounded-lg overflow-hidden border border-slate-100", (video as any).imageAspectRatio || "aspect-video")}>
                        <img 
                          src={img} 
                          alt="Supporting Visual" 
                          className={cn(
                            "w-full h-full",
                            (video as any).imageObjectFit || "object-cover"
                          )} 
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Video can be played directly */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Videos */}
      <div>
        <h4 className="text-lg font-semibold mb-6 text-tencent-dark">社交媒体低成本创意内容</h4>
        <HorizontalScroll className="pb-8 -mx-6 px-6 items-stretch">
          <div className="flex gap-4 md:gap-6">
            {[
              "壁画电视与名画创意互动",
              "办公室的日常 之 小米电视拟人化宣传Redmi电视发布",
              "办公室的日常 之 小米空调智能化展示",
              "简单的工厂产线素材通过匹配模型音乐踩点剪辑，收获自然播放量600w+",
              "UGC二创98寸电视送装 单条自然流量1000w+",
              "芯片解码能力可视化展示 加载超大Raw照片速度对比"
            ].map((caption, i) => (
              <MediaCard 
                key={i} 
                type="video" 
                src={i === 3 ? "/video7-1.mp4" : `/video${i+4}.mp4`} 
                alt={`短视频 ${i+1}`}
                caption={caption}
                className="w-[140px] md:w-[180px] shrink-0 snap-center first:ml-0 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                mediaContainerClassName="aspect-[9/16]"
              />
            ))}
          </div>
        </HorizontalScroll>
      </div>
    </section>
  );
}

const promoVideos = [
  {
    title: "小米壁画电视创意宣传片",
    desc: "将壁画电视【形态与智能】2个主要方面的卖点通过创意设计为若干趣味创意生活小场景。该宣传片及其切片共获得1000w+自然播放量，在用户中迅速传播、广受好评，助力首款高端产品上线当天即售罄。",
    images: ["/photo54.jpg"],
    videoUrl: "https://weibo.com/tv/show/1034:4364651774063904?from=old_pc_videoshow",
    previewUrl: "/video21.mp4",
    imageAspectRatio: "aspect-[1605/714]",
    imageObjectFit: "object-contain"

  },
  {
    title: "小米电视印度宣传片",
    desc: "通过戏剧性创意情节设置，植入小米电视富有竞争力的价值点，在印度市场爆火，播放量1.3亿。",
    videoUrl: "https://v.douyin.com/g5GxlVtQU8A/",
    previewUrl: "/video2.mp4"
  },
  {
    title: "小米电视5系列幕后纪录片",
    desc: "通过视觉场景设计与不同采访切入点，以幕后不同身份的工作人员口吻表现产品打磨过程的投入与用心，塑造品牌及技术团队形象。",
    videoUrl: "https://weibo.com/tv/show/1034:4435600108157444?from=old_pc_videoshow",
    previewUrl: "/video3.mp4"
  }
];

function Section2() {
  return (
    <section id="aigc-practice" className="max-w-7xl mx-auto px-6 py-24">
      <SectionHead title="AIGC 深度实操" subtitle="在真实项目中提质增效的 AI 工作流赋能" />
      
      <div className="grid grid-cols-12 gap-6">
        {/* Subtitle 1 AIGC Posters */}
        <div className="bento-card-blue col-span-12 xl:col-span-7 p-8 lg:p-12 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2 block text-white">Focus Highlight</span>
                <h3 className="text-2xl font-bold title-gradient-breathe-white">AIGC 辅助品牌视觉提质增效</h3>
              </div>
              <div className="flex gap-2 shrink-0">
                <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-sm border border-white/10 text-white">效率提升 90%</div>
                <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-sm border border-white/10 text-white">产量提升 150%</div>
              </div>
            </div>
            
            <p className="text-white/80 font-medium mb-1">为知名白酒品牌创作高品质意境海报</p>
            <p className="text-white/60 text-sm mb-6 max-w-xl">品牌对“东方美学/光影/意境”要求极高，需完美结合现代审美与传统文化韵味。</p>
            
            <div className="bg-black/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col xl:flex-row gap-4 xl:gap-8 mb-8">
              <div className="flex-1">
                <span className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">工具组合</span>
                <span className="font-semibold text-sm">Midjourney <span className="font-normal text-xs text-white/70">(概念生成)</span> + StableDiffusion/ControlNet <span className="font-normal text-xs text-white/70">(控制瓶身结构与品牌Logo一致性)</span></span>
              </div>
              <div className="hidden xl:block w-px bg-white/20"></div>
              <div>
                <span className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">效率对比</span>
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <span className="text-white/80">传统 <span className="line-through text-white/50 font-normal">14天</span></span>
                  <span className="text-emerald-400">AIGC 1天</span>
                </div>
              </div>
            </div>

            <div className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {[
                  "/photo48.jpg",
                  "/photo49.jpg",
                  "/photo50.jpg",
                  "/photo51.jpg",
                ].map((src, i) => (
                  <MediaCard 
                    key={i} 
                    type="image" 
                    src={src} 
                    alt={`AIGC 海报 ${i+1}`}
                    className="w-full !bg-white/10 !border-white/10 shadow-none !rounded-lg"
                    mediaContainerClassName="aspect-[9/16]"
                  />
                ))}
              </div>
              <div className="space-y-4">
                <MediaCard 
                  type="image" 
                  src="/photo52.jpg" 
                  alt="AIGC 海报 5"
                  className="w-full !bg-white/10 !border-white/10 shadow-none !rounded-xl"
                  mediaContainerClassName="aspect-[2834/945]"
                />
                <div className="space-y-2">
                  <MediaCard 
                    type="image" 
                    src="/photo53.png" 
                    alt="AIGC 海报 6"
                    className="w-full !bg-white/10 !border-white/10 shadow-none !rounded-xl"
                    mediaContainerClassName="aspect-video"
                    objectMode="contain"
                  />
                  <p className="text-xs text-blue-200 text-center font-bold tracking-widest bg-white/10 py-1 rounded-lg border border-white/5">全年共AI产出平面内容及物料100+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle 2 AIGC Videos */}
        <div className="bento-card col-span-12 xl:col-span-5 p-8 lg:p-10 flex flex-col relative">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-bold title-gradient-breathe">AIGC 全流程短视频生产</h3>
            <div className="h-px bg-slate-100 flex-grow"></div>
            <span className="text-[10px] text-slate-400 font-mono">v2.0 WORKFLOW</span>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold border border-slate-100 text-tencent-blue">01</div>
              <div>
                <p className="text-sm font-bold text-tencent-dark">创意辅助</p>
                <p className="text-[10px] text-slate-500 mt-0.5">ChatGPT/deepseek + Midjourney 生成创意原型及参考图</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold border border-slate-100 text-tencent-blue">02</div>
              <div>
                <p className="text-sm font-bold text-tencent-dark">脚本与分镜</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Seedance2.0</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold border border-slate-100 text-tencent-blue">03</div>
              <div>
                <p className="text-sm font-bold text-tencent-dark">动态合成</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Runway / Luma 赋予画面电影级动态</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold border border-slate-100 text-tencent-blue">04</div>
              <div>
                <p className="text-sm font-bold text-tencent-dark">音效</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Suno 自动配乐</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold border border-slate-100 text-tencent-blue">05</div>
              <div>
                <p className="text-sm font-bold text-tencent-dark">复盘沉淀</p>
                <p className="text-[10px] text-slate-500 mt-0.5">提示词、虚拟形象等核心资产沉淀</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-6">
            <h4 className="text-xs font-bold text-tencent-dark mb-1">提效进化：全链路 AIGC 生产赋能</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              通过优化 <strong className="text-tencent-blue">AI 工作流</strong>，将提示词工程与模型微调相结合，确保品牌视觉特征的稳定产出。结合后期画质增强技术，实现从零散创意到批量化、高质量内容的规模化产出，大幅提升了品牌素材的生产效率。
            </p>
          </div>

          <div className="mt-auto">
            <MediaCard 
              type="image" 
              src="/photo55.jpg" 
              alt="AIGC 全流程生产工作流"
              className="w-full !bg-slate-50 !border-slate-100 !rounded-xl !shadow-none"
              mediaContainerClassName="aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Section3() {
  return (
    <section id="case-studies" className="max-w-7xl mx-auto px-6 py-24">
      <SectionHead title="项目案例" subtitle="基于产品全生命周期的内容统筹、策划与交付" />
      
      {/* Case 1 */}
      <div className="mb-24" id="strategy-visual">
        <div className="flex items-start gap-4 mb-10 group">
          <span className="bg-gradient-to-br from-[#0052D9] to-[#00A4FF] text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-md shrink-0 mt-1 group-hover:scale-105 transition-transform">1</span>
          <div>
            <h3 className="text-2xl lg:text-3xl font-extrabold mb-3">
              <span className="title-gradient-breathe whitespace-nowrap">科技参数的可视化传达</span>
            </h3>
            <p className="text-lg text-slate-500 font-medium tracking-wide">以小米透明电视上市发布为案例</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bento-card p-8 flex flex-col justify-center bg-slate-50 border-slate-100">
            <h4 className="text-slate-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300 block"></span>品牌痛点
            </h4>
            <div className="space-y-6">
              <div>
                <p className="text-xl font-bold text-tencent-dark">线上传播的失真性</p>
                <p className="text-sm text-slate-500 font-normal mt-1 leading-relaxed">一台“透明”电视，亲眼所见震撼远大于图片视频</p>
              </div>
              <div>
                <p className="text-xl font-bold text-tencent-dark">各项技术参数用户难以理解</p>
                <p className="text-sm text-slate-500 font-normal mt-1 leading-relaxed">透明OLED屏幕的实现原理、色深、色域、高对比、像素级独立控光......</p>
              </div>
            </div>
          </div>
          <div className="bento-card-blue p-8 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-6xl text-white/20 font-serif">"</div>
            <h4 className="text-white/80 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white block"></span>我们的创意解法
            </h4>
            <div className="space-y-6">
              <p className="text-xl font-bold text-white mb-2">传播聚焦 让透明“透”得惊艳</p>
              <div className="space-y-4">
                <p className="text-[15px] text-white/80 font-medium leading-relaxed flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0"></span>
                  <span>以“一眼惊艳”的创意主视觉打造科幻冲击力，弱化技术参数的晦涩表达</span>
                </p>
                <p className="text-[15px] text-white/80 font-medium leading-relaxed flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0"></span>
                  <span>延展系列有“互动性”的图片、视频素材（方便发布会展示、线下门店体验），生成有传播价值的体验UGC</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Initial images shrunk by wrapping in a narrower container */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {/* Row 1: 2 shorter cards */}
          <div className="grid grid-cols-2 gap-4">
            {['/photo34.jpeg', '/photo35.jpeg'].map((src, i) => (
               <MediaCard 
                key={`row1-${i}`} 
                type="image" 
                src={src} 
                alt={`透明电视案例 1-${i+1}`}
                caption=""
                className="w-full"
                mediaContainerClassName="aspect-[3/2]"
              />
            ))}
          </div>

          {/* Row 2: 3 shorter cards */}
          <div className="grid grid-cols-3 gap-4">
            {['/photo36.jpeg', '/photo37.jpeg', '/photo38.jpeg'].map((src, i) => (
               <MediaCard 
                key={`row2-${i}`} 
                type="image" 
                src={src} 
                alt={`透明电视案例 2-${i+1}`}
                caption=""
                className="w-full"
                mediaContainerClassName="aspect-[3/2]"
              />
            ))}
          </div>
        </div>

        {/* Row 3: Videos and photos side-by-side with original ratios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-6">
            <MediaCard 
              type="video" 
              src="/video10.mp4" 
              alt="透明电视动态案例 1"
              caption="视频案例: 科技感动态演示"
              className="w-full"
              mediaContainerClassName="aspect-auto min-h-[240px]"
              objectMode="contain"
            />
            <MediaCard 
              type="video" 
              src="/video11.mp4" 
              alt="透明电视动态案例 2"
              caption="视频案例: 交互效果演示"
              className="w-full"
              mediaContainerClassName="aspect-auto min-h-[240px]"
              objectMode="contain"
            />
          </div>
          <MediaCard 
            type="image" 
            src="/photo39.jpeg" 
            alt="透明电视案例 3"
            caption="核心画质参数：10.7亿色原色屏"
            className="w-full"
            mediaContainerClassName="aspect-auto h-full min-h-[400px]"
            objectMode="contain"
          />
        </div>

        <div className="flex flex-wrap gap-4">
           <a href="https://www.mi.com/mitv-great/hyaline" target="_blank" rel="noopener noreferrer" className="bg-[#0052D9] hover:bg-[#003CAB] text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 text-sm">小米透明电视产品详情页 <ChevronRight size={16}/></a>
           <a href="https://www.mi.com/arttv?cfrom=search" target="_blank" rel="noopener noreferrer" className="glass-button px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 text-sm">相似案例 小米壁画电视 <ChevronRight size={16}/></a>
           <a href="https://mp.weixin.qq.com/s/3uV8k0RYHAj-AMu0s92xpg" target="_blank" rel="noopener noreferrer" className="glass-button px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 text-sm">小米透明电视上市推文 <ChevronRight size={16}/></a>
        </div>
      </div>

      {/* Case 2 */}
      <div id="strategy-selling">
        <div className="flex items-start gap-4 mb-10 group">
          <span className="bg-gradient-to-br from-[#0052D9] to-[#00A4FF] text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-md shrink-0 mt-1 group-hover:scale-105 transition-transform">2</span>
          <div>
            <h3 className="text-2xl lg:text-3xl font-extrabold mb-3">
              <span className="title-gradient-breathe">卖点的创意表达</span>
            </h3>
            <p className="text-lg text-slate-500 font-medium tracking-wide">以系列大屏新品上市传播为案例（75寸、85寸、95寸）</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bento-card p-8 flex flex-col justify-center bg-slate-50 border-slate-100">
            <h4 className="text-slate-400 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300 block"></span>消费者认知
            </h4>
            <p className="text-xl font-medium text-tencent-dark">当下主流的大屏（如55寸或65寸）已经足够大，为什么要更大的巨幕电视？</p>
          </div>
          <div className="bento-card-blue p-8 flex flex-col justify-center">
            <h4 className="text-white/80 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white block"></span>策略洞察：消费者想要“大”电视的驱动力分析
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white/90">正向驱动：</p>
                <div className="text-xs text-white/70 space-y-0.5">
                  <p>· 不同价格买更大的：大屏有面子、大屏更沉浸</p>
                  <p>· 同样价格买更大的：性价比、“赚到了”心理</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white/90">反向驱动：</p>
                <div className="text-xs text-white/70">
                  <p>· 过往消费心智：客厅不够大</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-6 mb-8 max-w-4xl mx-auto px-6 md:px-0">
          <div className="flex flex-col gap-6">
            <MediaCard 
              type="image" 
              src="/photo43.jpeg" 
              alt="大屏案例 1"
              caption="“大”的体感化表达1"
              className="w-full"
              mediaContainerClassName="aspect-video"
            />
            <MediaCard 
              type="image" 
              src="/photo44.jpeg" 
              alt="大屏案例 2"
              caption="“大”的体感化表达2"
              className="w-full"
              mediaContainerClassName="aspect-video"
            />
          </div>
          <div className="flex items-start">
            <MediaCard 
              type="image" 
              src="/photo45.jpeg" 
              alt="大屏案例 3"
              caption="UGC活动"
              className="w-[200px] md:w-[280px]"
              mediaContainerClassName="aspect-[9/16]"
            />
          </div>
        </div>

        <div className="space-y-6 mb-10">
          {/* Row 1: 3 x 16:9 videos */}
          <HorizontalScroll className="-mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-6">
               {["/video12.mp4", "/video13.mp4", "/video14.mp4"].map((v, i) => (
                 <MediaCard 
                  key={`video-h-${i}`} 
                  type="video" 
                  src={v} 
                  alt={`大屏宣传短片 横版 ${i+1}`}
                  caption={i === 0 ? "“大”的体感化创意视频1" : i === 1 ? "“大”的体感化创意视频2" : "发布会现场视频魔性创意二创，获得微博CEO转发推荐"}
                  className="w-[85%] md:w-[30%] flex-shrink-0 snap-start"
                  mediaContainerClassName="aspect-video"
                />
              ))}
            </div>
          </HorizontalScroll>
          {/* Row 2: 3 x 9:16 videos (smaller scaled) */}
          <HorizontalScroll className="-mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-12">
               {["/video15.mp4", "/video16.mp4", "/video17.mp4"].map((v, i) => (
                 <MediaCard 
                  key={`video-v-${i}`} 
                  type="video" 
                  src={v} 
                  alt={`大屏宣传短片 竖版 ${i+1}`}
                  caption={`UGC内容二次成片，系列短视频自然流量2000w+`}
                  className="w-[65%] md:w-[25%] flex-shrink-0 snap-start"
                  mediaContainerClassName="aspect-[9/16]"
                />
              ))}
            </div>
          </HorizontalScroll>
        </div>

        <div className="flex flex-wrap gap-4">
           <a href="https://www.mi.com/redmitv/98?client_id=180100" target="_blank" rel="noopener noreferrer" className="bg-[#0052D9] hover:bg-[#003CAB] text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 text-sm">Redmi 98寸电视详情页 <ChevronRight size={16}/></a>
           <a href="https://www.baidu.com/link?url=glG52wQGfUdeviVPy-tkAd0GgmKUqZqKCE9W3D6RAxIFYPBiADtQjvwCzDvO_zDIL8MmZWwlBFHiIq8VIPGLD_&wd=&eqid=b89c56b3000170b00000000269edfd1f" target="_blank" rel="noopener noreferrer" className="glass-button px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 text-sm">Redmi 86寸电视详情页 <ChevronRight size={16}/></a>
        </div>
      </div>
    </section>
  );
}

function GlobalLightbox({ media, onClose }: { media: MediaType, onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10" onClick={onClose}>
          <X size={32} />
        </button>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative max-w-6xl max-h-full w-full outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          {media.type === 'image' ? (
            <img src={media.src} alt={media.alt} className="w-full h-auto max-h-[85vh] object-contain mx-auto rounded-lg shadow-2xl" onError={(e) => { e.currentTarget.src = mediaPlaceholder(0); }} />
          ) : (
            <video 
              src={media.src} 
              className="w-full h-auto max-h-[85vh] mx-auto rounded-lg shadow-2xl" 
              controls 
              autoPlay 
              playsInline 
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('mixkit')) {
                  target.src = videoPlaceholder;
                  target.load();
                }
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function BackgroundGlow() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-[#0052D9]/10 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] aspect-square bg-[#00A4FF]/15 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] aspect-square bg-indigo-300/15 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
      <div className="absolute top-[10%] right-[10%] w-[20%] aspect-square bg-sky-200/40 rounded-full blur-[80px] animate-blob mix-blend-overlay"></div>
    </div>
  );
}

export default function App() {
  const [activeMedia, setActiveMedia] = useState<MediaType | null>(null);

  return (
    <LightboxContext.Provider value={{ openMedia: setActiveMedia }}>
      <div className="relative overflow-hidden selection:bg-tencent-blue/20 selection:text-tencent-blue">
        <BackgroundGlow />
        <FloatingNav />
        <HeroProfile />
        <SectionProjectPlanning />
        <Section1 />
        <Section2 />
        <Section3 />
        
        {/* Footer */}
        <footer className="text-center py-12 text-tencent-gray/60 font-medium">
          <p>© {new Date().getFullYear()} 内容创意组简历作品集 - 由 AIGC 工作流赋能构建</p>
        </footer>

        {/* Global Lightbox */}
        {activeMedia && (
          <GlobalLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
        )}
      </div>
    </LightboxContext.Provider>
  );
}
