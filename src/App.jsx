import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Backpack from './components/Backpack.jsx';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  { id: 'arrival', eyebrow: 'كل حكاية تبدأ بفكرة', title: 'افتح باب\nالخيال', body: 'استعد لرحلة صغيرة مليئة بالاكتشافات والألوان.' },
  { id: 'friends', eyebrow: 'أصدقاء الرحلة', title: 'معاً نكتشف\nالعالم', body: 'شخصيتان محببتان ترافقان الأطفال في رحلة المعرفة.' },
  { id: 'books', eyebrow: 'المعرفة مغامرة', title: 'كل كتاب\nعالم جديد', body: 'من الحافظة إلى الكتب، ومن سؤال صغير إلى اكتشاف كبير.' },
  { id: 'portal', eyebrow: 'إلى ما وراء الخيال', title: 'هيا بنا\nنبدأ الرحلة', body: 'اعبر بوابة المعرفة واكتشف ما ينتظرك في الداخل.' }
];

function SceneImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`scene-art ${failed ? 'scene-art--fallback' : ''}`}>
      {!failed && <img src={src} alt={alt} onError={() => setFailed(true)} />}
      {failed && <div className="asset-hint"><span>✦</span><b>أضف الصورة إلى مجلد public/images</b><small>{src.split('/').pop()}</small></div>}
    </div>
  );
}

function StoryCopy({ scene, index }) {
  return (
    <article className={`story-copy story-copy--${index}`} data-copy={index}>
      <span className="eyebrow"><i />{scene.eyebrow}</span>
      <h2>{scene.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
      <p>{scene.body}</p>
      <span className="scene-count">0{index + 1} <i /> 04</span>
    </article>
  );
}

function App() {
  const storyRef = useRef(null);
  const backpackRef = useRef(null);
  const lidRef = useRef(null);
  const boyRef = useRef(null);
  const girlRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.story-panel');
      const copies = gsap.utils.toArray('.story-copy');

      gsap.set(panels, { autoAlpha: 0, scale: 1.035 });
      gsap.set(panels[0], { autoAlpha: 1, scale: 1 });
      gsap.set(copies, { autoAlpha: 0, y: 36 });
      gsap.set(copies[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top top',
          end: '+=3600',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4)))
        }
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const previous = panels[i - 1];
        tl.to(previous, { autoAlpha: 0, scale: 0.97, duration: 0.65 }, i - 1)
          .to(panel, { autoAlpha: 1, scale: 1, duration: 0.8 }, '<0.12')
          .to(copies[i - 1], { autoAlpha: 0, y: -26, duration: 0.35 }, '<')
          .fromTo(copies[i], { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '<0.2');
      });

      if (backpackRef.current) {
        tl.to(backpackRef.current.rotation, { y: Math.PI * 1.15, x: -0.12, duration: 2.4 }, 0.2);
        tl.to(backpackRef.current.position, { y: -1.8, duration: 1.1 }, 0.55);
      }
      if (lidRef.current) tl.to(lidRef.current.rotation, { x: -1.12, duration: 0.8 }, 0.72);
      if (boyRef.current) tl.fromTo(boyRef.current, { x: -80, y: 35, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.9 }, 1.25);
      if (girlRef.current) tl.fromTo(girlRef.current, { x: 80, y: 35, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.9 }, 1.55);
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark">✦</span><span>رحلة <b>المعرفة</b></span></a>
        <span className="header-note">عالم صغير، واكتشافات كبيرة</span>
        <a className="header-link" href="#story">ابدأ الرحلة <span>↙</span></a>
      </header>

      <section className="intro" id="top">
        <div className="intro-orb intro-orb--one" />
        <div className="intro-orb intro-orb--two" />
        <span className="intro-kicker">A LITTLE WORLD OF WONDER</span>
        <h1>كل شيء يبدأ<br /><em>بحقيبة صغيرة.</em></h1>
        <p>ارفع عينيك، وابدأ التمرير… هناك حكاية تنتظرك بالداخل.</p>
        <a className="scroll-cue" href="#story"><span className="scroll-mouse" /> مرّر لاكتشاف الحكاية</a>
        <div className="intro-decoration">✳</div>
      </section>

      <section className="story" id="story" ref={storyRef}>
        <div className="story-stage">
          <div className="stage-glow" />
          <div className="scene-panels">
            <div className="story-panel panel-capsule"><SceneImage src="/images/scene-capsule.webp" alt="الولد والبنت أمام الحافظة المستقبلية" /></div>
            <div className="story-panel panel-friends"><SceneImage src="/images/scene-friends.webp" alt="الطفلان في عالمهما الخيالي" /></div>
            <div className="story-panel panel-books"><SceneImage src="/images/scene-books.webp" alt="الطفلان مع الكتب" /></div>
            <div className="story-panel panel-portal"><SceneImage src="/images/scene-portal.webp" alt="بوابة المكتبة السحرية" /></div>
          </div>
          <div className="canvas-wrap">
            <Canvas camera={{ position: [0, 1.2, 7.4], fov: 34 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[4, 7, 5]} intensity={2.1} castShadow />
              <pointLight position={[-4, 1, 3]} color="#7ce8e2" intensity={25} />
              <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.12}>
                <Backpack ref={backpackRef} lidRef={lidRef} />
              </Float>
              <ContactShadows position={[0, -2.15, 0]} opacity={0.2} scale={6} blur={2.5} />
              <Environment preset="city" />
            </Canvas>
          </div>
          <div className="character-pair">
            <div ref={boyRef} className="character-label character-label--boy"><span>✦</span><b>صديقك في الرحلة</b></div>
            <div ref={girlRef} className="character-label character-label--girl"><span>✧</span><b>رفيقتك في الاكتشاف</b></div>
          </div>
          <div className="story-progress"><span style={{ width: `${(active + 1) * 25}%` }} /></div>
          <div className="story-index">0{active + 1}<i />04</div>
          {scenes.map((scene, i) => <StoryCopy key={scene.id} scene={scene} index={i} />)}
        </div>
      </section>

      <section className="outro">
        <div className="outro-spark">✦</div>
        <span className="eyebrow"><i />والآن تبدأ الحكاية</span>
        <h2>المغامرة التالية<br /><em>بين يديك.</em></h2>
        <p>كل صفحة باب، وكل فكرة بداية جديدة.</p>
        <a href="#top" className="back-top">عد إلى البداية ↑</a>
      </section>
      <footer><span>رحلة المعرفة © 2026</span><span>صُمّم بحب وفضول ✦</span></footer>
    </main>
  );
}

export default App;