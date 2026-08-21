"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  Box,
  ChevronRight,
  Code2,
  Database,
  FileCode2,
  FolderOpen,
  GitBranch,
  Layers3,
  Play,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";

type Stage = 0 | 1 | 2 | 3 | 4 | 5;

const stories = [
  ["01", "The spark", "Your website starts with an idea."],
  ["02", "The structure", "We turn that idea into architecture."],
  ["03", "The experience", "We design and build the experience."],
  ["04", "The momentum", "We turn code into products."],
  ["05", "The details", "Every detail is engineered."],
  ["06", "The launch", "Now let’s build yours."],
] as const;

const files = [
  {
    path: "routes/web.php",
    language: "PHP",
    lines: [
      ["1", "<?php", "keyword"], ["3", "use App\\Http\\Controllers\\HomeController;", "plain"], ["5", "Route::get('/', [HomeController::class, 'index']);", "route"], ["7", "Route::view('/studio', 'studio');", "route"], ["9", "// Every remarkable thing begins here.", "comment"],
    ],
  },
  {
    path: "app/Http/Controllers/HomeController.php",
    language: "PHP",
    lines: [
      ["1", "class HomeController extends Controller", "class"], ["2", "{", "plain"], ["3", "  public function index(): View", "keyword"], ["4", "  {", "plain"], ["5", "    return view('home');", "function"], ["6", "  }", "plain"], ["7", "}", "plain"],
    ],
  },
  {
    path: "resources/views/home.blade.php",
    language: "Blade",
    lines: [
      ["1", "@extends('layouts.app')", "keyword"], ["3", "@section('content')", "keyword"], ["5", "<section class=\"hero\">", "tag"], ["6", "  <h1>Build Something Amazing</h1>", "tag"], ["7", "  <p>Made for the way you grow.</p>", "tag"], ["8", "</section>", "tag"], ["10", "@endsection", "keyword"],
    ],
  },
  {
    path: "resources/css/app.css",
    language: "CSS",
    lines: [
      ["1", ".hero {", "css"], ["2", "  min-height: 100vh;", "plain"], ["3", "  display: flex;", "plain"], ["4", "  align-items: center;", "plain"], ["5", "  color: var(--ink);", "plain"], ["6", "}", "plain"], ["8", ".hero-title { letter-spacing: -.06em; }", "css"],
    ],
  },
  {
    path: "resources/js/app.js",
    language: "JavaScript",
    lines: [
      ["1", "import { gsap } from 'gsap';", "keyword"], ["3", "gsap.from('.hero-title', {", "function"], ["4", "  y: 100,", "plain"], ["5", "  opacity: 0,", "plain"], ["6", "  duration: 1,", "plain"], ["7", "  ease: 'power4.out'", "string"], ["8", "});", "plain"],
    ],
  },
  {
    path: "app/Services/LaunchService.php",
    language: "PHP",
    lines: [
      ["1", "final class LaunchService", "class"], ["2", "{", "plain"], ["3", "  public function ship(Product $product): void", "keyword"], ["4", "  {", "plain"], ["5", "    $product->publish();", "function"], ["6", "    event(new ProductLaunched($product));", "function"], ["7", "  }", "plain"], ["8", "}", "plain"],
    ],
  },
] as const;

function Editor({ stage }: { stage: Stage }) {
  const file = files[stage];
  return <div className="editor-shell">
    <div className="vscode-title"><div className="traffic"><i /><i /><i /></div><span>SRJ Web Studio - Visual Studio Code</span><div className="layout-dots">•••</div></div>
    <div className="vscode-body">
      <aside className="activity-bar"><FileCode2 /><Search /><GitBranch /><Box /><Layers3 /><Settings2 className="activity-bottom" /></aside>
      <aside className="explorer"><div className="explorer-label">EXPLORER <span>•••</span></div><div className="project"><ChevronRight size={10} /> SRJ-STUDIO</div><div className="folder"><ChevronRight size={10} /><FolderOpen size={12} /> app</div><div className="tree-file">&nbsp;&nbsp;&nbsp;&nbsp;HomeController.php</div><div className="folder"><ChevronRight size={10} /><FolderOpen size={12} /> resources</div><div className="tree-file">&nbsp;&nbsp;&nbsp;&nbsp;home.blade.php</div><div className="tree-file">&nbsp;&nbsp;&nbsp;&nbsp;app.css</div><div className="tree-file">&nbsp;&nbsp;&nbsp;&nbsp;app.js</div><div className="tree-file active-tree">&nbsp;&nbsp;{file.path.split("/").at(-1)}</div></aside>
      <div className="workbench"><div className="tabs"><div className="tab active-tab"><FileCode2 size={11} />{file.path.split("/").at(-1)} <b>×</b></div><div className="tab muted-tab">app.js <b>×</b></div></div><div className="breadcrumb">{file.path.split("/").map((part, i) => <span key={part}>{i > 0 && " › "}{part}</span>)}</div><div className="code-scroll" key={file.path}><div className="code-lines">{file.lines.map(([num, text, tone], index) => <div className="code-line" style={{ animationDelay: `${index * 55}ms` }} key={`${num}-${text}`}><span className="line-number">{num}</span><code className={tone}>{text}</code>{index === file.lines.length - 2 && <span className="cursor" />}</div>)}</div></div></div>
    </div>
    <div className="status-bar"><span><GitBranch size={10} /> main*</span><span>Ln 5, Col 23</span><span>Spaces: 2</span><span>{file.language}</span><span><Play size={10} /> Live</span></div>
  </div>;
}

function Computer({ stage, computerRef }: { stage: Stage; computerRef: React.RefObject<HTMLDivElement | null> }) {
  return <div className="computer-wrap" ref={computerRef} aria-label="Animated computer showing code">
    <div className="system-readout readout-top">[ SYSTEM ONLINE ]</div><div className="system-readout readout-bottom">LARAVEL / GSAP</div><div className="screen-glow" /><div className="monitor"><div className="monitor-frame"><Editor stage={stage} /><div className="screen-reflection" /></div></div><div className="monitor-neck" /><div className="monitor-foot" /><div className="computer-shadow" />
  </div>;
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const computerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const start = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const computer = computerRef.current;
        if (!computer) return;
        const media = gsap.matchMedia();
        media.add("(min-width: 1200px)", () => {
          gsap.to(".monitor", { y: -8, duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
          const master = gsap.timeline({ scrollTrigger: { trigger: mainRef.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true, onUpdate: (self) => setStage(Math.min(5, Math.floor(self.progress * 6)) as Stage) } });
          const states = [
            { x: "0vw", y: "0vh", scale: .98, rotation: -2 },
            { x: "-14vw", y: "10vh", scale: .76, rotation: 2 },
            { x: "-45vw", y: "14vh", scale: .66, rotation: -3 },
            { x: "2vw", y: "10vh", scale: .86, rotation: 2 },
            { x: "-42vw", y: "17vh", scale: .62, rotation: -2 },
            { x: "-2vw", y: "52vh", scale: .45, rotation: -3 },
          ];
          states.slice(1).forEach((state, index) => master.to(computer, state, index / 5));
          const move = (event: MouseEvent) => { const x = (event.clientX / innerWidth - .5) * 10; const y = (event.clientY / innerHeight - .5) * 7; gsap.to(".monitor", { rotateY: x, rotateX: -y, duration: .7, overwrite: "auto" }); gsap.to(".screen-reflection", { x: x * 2, y: y * 2, duration: .7 }); };
          window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move);
        });
        media.add("(min-width: 768px) and (max-width: 1199px)", () => {
          const master = gsap.timeline({ scrollTrigger: { trigger: mainRef.current, start: "top top", end: "bottom bottom", scrub: .8, onUpdate: (self) => setStage(Math.min(5, Math.floor(self.progress * 6)) as Stage) } });
          master.to(computer, { x: "-7vw", y: "10vh", scale: .8 }, 0).to(computer, { x: "-27vw", y: "16vh", scale: .64 }, .4).to(computer, { x: "-10vw", y: "20vh", scale: .76 }, .75);
        });
        media.add("(max-width: 767px)", () => { ScrollTrigger.create({ trigger: mainRef.current, start: "top top", end: "bottom bottom", onUpdate: (self) => setStage(Math.min(5, Math.floor(self.progress * 6)) as Stage) }); });
      }, mainRef);
    };
    start();
    return () => ctx?.revert();
  }, []);

  return <main ref={mainRef} className="site-shell">
    <div className="cyber-grid" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <nav className="nav"><a className="brand" href="#home"><span>SRJ</span> WEB STUDIO</a><div className="nav-links"><a href="#about">About</a><a href="#services">Services</a><a href="#work">Work</a></div><a href="#contact" className="nav-cta">Let&apos;s talk <ArrowDownRight size={15} /></a></nav>
    <div className="computer-stage"><Computer stage={stage} computerRef={computerRef} /></div>
    <section id="home" className="story hero"><div className="content hero-content"><p className="eyebrow"><Sparkles size={14} /> SRJ_SYSTEM / BUILD MODE: ACTIVE</p><h1>We build <em>momentum</em><br />for brands with<br />something to say.</h1><p className="intro">Strategy, design and technology for ambitious teams who prefer to move differently.</p><div className="hero-actions"><a href="#contact" className="button button-dark">Start a project <ArrowDownRight size={16} /></a><a href="#work" className="text-link">See selected work <ArrowDownRight size={15} /></a></div></div><div className="scroll-note">SCROLL TO WATCH IT BUILD <span>↓</span></div></section>
    <section id="about" className="story about"><div className="section-number">01 / STUDIO SYSTEM</div><div className="about-copy content"><p className="eyebrow">Architecture before aesthetics</p><h2>Good digital work<br />makes people <em>feel</em><br />something first.</h2><p>We blend sharp thinking with unapologetically human design. Then we engineer it until it feels effortless.</p></div><div className="side-note">{stories[1][2]}</div></section>
    <section id="services" className="story services"><div className="content service-grid"><div><p className="eyebrow">02 / DIGITAL SERVICES</p><h2>Products that<br /><em>move</em> business.</h2></div><div className="service-list"><article><span>01</span><h3>Brand systems</h3><p>Finding the visual language your people remember.</p></article><article><span>02</span><h3>Digital products</h3><p>Experiences that make complex feel completely natural.</p></article><article><span>03</span><h3>Creative engineering</h3><p>Motion, interaction and code with a little pulse.</p></article></div></div></section>
    <section id="work" className="story work"><div className="work-title content"><p className="eyebrow">03 / SELECTED WORK</p><h2>Proof in the<br /><em>product.</em></h2></div><div className="project-card"><div className="project-top"><span>FIELD NOTES / 2026</span><span>IDENTITY + DIGITAL</span></div><div className="project-word">FORM</div><p>A new kind of physical intelligence.</p></div></section>
    <section className="story process"><div className="content process-copy"><p className="eyebrow">04 / DELIVERY PROTOCOL</p><h2>Less theatre.<br />More <em>making.</em></h2><div className="process-steps"><span>01 / Listen</span><span>02 / Shape</span><span>03 / Make</span><span>04 / Launch</span></div></div><div className="process-mark">/</div></section>
    <section id="contact" className="story contact"><div className="content contact-layout"><div className="contact-content"><p className="eyebrow">05 / LET&apos;S BUILD</p><h2>Let&apos;s build something<br /><em>worth remembering.</em></h2><a className="contact-link" href="mailto:hello@srj.studio">Start a project <ArrowDownRight /></a></div><div className="footer-space" aria-hidden="true" /></div><footer><div className="footer-brand"><strong>SRJ</strong><span>WEB STUDIO</span><p>Digital engineering for brands ready to move.</p></div><div><b>Navigation</b><a href="#about">About</a><a href="#services">Services</a><a href="#work">Work</a></div><div><b>Contact</b><a href="mailto:hello@srj.studio">hello@srj.studio</a><a href="#contact">Instagram</a><a href="#contact">LinkedIn</a></div><div className="footer-meta">© 2026 SRJ WEB STUDIO<br />ALL SYSTEMS ONLINE</div></footer></section>
  </main>;
}
