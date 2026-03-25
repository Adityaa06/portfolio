import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ───────────── DATA ───────────── */
const PERSONAL = {
  name: 'Aditya Singh',
  email: 'aaadityaaa64@gmail.com',
  phone: '+91 9870798989',
  linkedin: 'https://www.linkedin.com/in/adityaa06/',
  github: 'https://github.com/Adityaa06',
  titles: ['Full Stack Developer', 'Tech Enthusiast', 'Software Developer', 'Code Craftsman'],
};

const SKILLS = {
  Languages: [
    { name: 'C', icon: '⟨C⟩', color: '#5C6BC0', proficiency: 80 },
    { name: 'C++', icon: '⟨+⟩', color: '#00599C', proficiency: 85 },
    { name: 'Python', icon: '🐍', color: '#3776AB', proficiency: 75 },
    { name: 'JavaScript', icon: 'JS', color: '#F7DF1E', proficiency: 82 },
    { name: 'Java', icon: '☕', color: '#ED8B00', proficiency: 75 },
    { name: 'PHP', icon: '⟐', color: '#777BB4', proficiency: 70 },
    { name: 'HTML', icon: '◇', color: '#E34F26', proficiency: 90 },
    { name: 'CSS', icon: '◈', color: '#1572B6', proficiency: 88 },
  ],
  Frameworks: [
    { name: 'Tailwind CSS', icon: '◆', color: '#06B6D4', proficiency: 80 },
    { name: 'React.js', icon: '⚛', color: '#61DAFB', proficiency: 85 },
    { name: 'Express.js', icon: '⚡', color: '#68A063', proficiency: 78 },
    { name: 'Laravel', icon: '⟓', color: '#FF2D20', proficiency: 65 },
  ],
  'Tools & Platforms': [
    { name: 'VS Code', icon: '⟪⟫', color: '#007ACC', proficiency: 90 },
    { name: 'MySQL', icon: '🗄', color: '#4479A1', proficiency: 78 },
    { name: 'MongoDB', icon: '🍃', color: '#47A248', proficiency: 75 },
    { name: 'Git', icon: '⎇', color: '#F05032', proficiency: 82 },
    { name: 'GitHub', icon: '⌘', color: '#e0e6ed', proficiency: 85 },
    { name: 'Postman', icon: '📡', color: '#FF6C37', proficiency: 75 },
    { name: 'Vercel', icon: '▲', color: '#ffffff', proficiency: 70 },
    { name: 'Render', icon: 'R', color: '#46E3B7', proficiency: 68 },
  ],
  'Soft Skills': [
    { name: 'Problem-Solving', icon: '🧩', color: '#00dcff', proficiency: 92 },
    { name: 'Leadership', icon: '🚀', color: '#8b5cf6', proficiency: 85 },
    { name: 'Team Collaboration', icon: '🤝', color: '#10B981', proficiency: 88 },
    { name: 'Adaptability', icon: '🔄', color: '#F59E0B', proficiency: 90 },
  ],
};
const SKILL_TABS = Object.keys(SKILLS);

const PROJECTS = [
  {
    title: 'RecipeAI – Smart Cooking Assistant Website',
    image: '/1.png',
    github: 'https://github.com/Adityaa06/recipeeAI',
    live: 'https://recipee-ai.vercel.app/',
    bullets: [
      'Built an AI-powered recipe platform that generates personalized dish recommendations based on user-provided ingredients.',
      'Integrated real-time cooking instructions to deliver a clear, step-by-step cooking experience for users.',
      'Designed a clean and fully responsive UI ensuring smooth navigation and consistent layout across all screen sizes and devices.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Rangsutra – E-commerce Shopping Website',
    image: '/2.png',
    github: 'https://github.com/Adityaa06/E-COMMERCE',
    live: 'https://www.youtube.com/watch?v=8kbmuxZU_GQ',
    bullets: [
      'Developed a fully functional e-commerce platform supporting product browsing, filtering, and a smooth checkout experience.',
      'Implemented secure user authentication and login system using PHP with proper session management for safe access.',
      'Managed all product, user, and order data efficiently through a well-structured MySQL database.',
    ],
    tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
];

const TRAINING = [
  {
    title: 'Mastering data structures and algorithms (board infinity)',
    org: 'Board Infinity',
    period: "Jun' 25 - Jul' 25",
    details: 'Mastered fundamental and advanced DSA concepts including arrays, linked lists, stacks, queues, trees, graphs, and recursion. Practiced 100+ coding problems across various platforms to strengthen logical thinking and improve algorithmic efficiency. Delivered a DSA-based mini-project with 20–30% faster execution by applying structured optimization techniques.',
    link: 'https://drive.google.com/file/d/1ZYXy1Jolt0kOWNzbvQh4VhCNNDSWKaky/view',
  },
];

const CERTIFICATES = [
  { title: 'Oracle Cloud Infrastructure 2025 Foundations Associate', org: 'ORACLE', date: "Mar' 26", link: 'https://drive.google.com/file/d/1jZZZLl2nL2Hb1u7Aj2i2045HECFI-myf/view' },
  { title: 'Computational Theory', org: 'Infosys Springboard', date: "Sep' 25", link: 'https://drive.google.com/file/d/1aux7VTq3iAkQOOVS7CRBbCBLXSWMXHy1/view' },
  { title: 'Privacy and Security in Online social media', org: 'NPTEL', date: "Apr' 25", link: 'https://drive.google.com/file/d/1-2VabtwkkhSQCXfpQDyKux206Fjsie20/view' },
  { title: 'Computer Communications', org: 'COURSERA', date: "Nov' 24", link: 'https://drive.google.com/file/d/1mPZkkm3JIFZPtdytrsmt8onZ4JwvzqHe/view' },
];

const ACHIEVEMENTS = [
  { text: 'Solved 250+ coding problems across different platforms (Leet Code, GFG).', counter: 250, suffix: '+', label: 'Problems Solved' },
  { text: 'Achieved a 3-star rating on HackerRank, showcasing proficiency in data structures and algorithms.', counter: 3, suffix: '★', label: 'HackerRank Rank' },
  { text: 'Participated in a hackathon and secured a top 5 position among 15 competing teams.', counter: 5, suffix: '', label: 'Top Finish' },
];

const EDUCATION = [
  { degree: 'Bachelor of Technology – Computer Science and Engineering', school: 'Lovely Professional University', score: 'CGPA: 6.6', period: "Aug' 23 – Present" },
  { degree: 'Intermediate', school: 'Heritage Public School (C.B.S.E.)', score: '72%', period: "Apr' 22 – Mar' 23" },
  { degree: 'Matriculation', school: 'Heritage Public School (C.B.S.E.)', score: '77%', period: "Apr' 21 – Mar' 22" },
];

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Training', 'Certifications', 'Achievements', 'Education', 'Contact'];

/* ───────────── HOOKS ───────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(end, visible, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); } else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return count;
}

/* ───────────── PARTICLE CANVAS ───────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,220,255,${p.o})`;
        ctx.fill();
      }
      /* draw lines between nearby particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,220,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}

/* ───────────── CUSTOM CURSOR ───────────── */
function CustomCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}

/* ───────────── SECTION WRAPPER ───────────── */
function Section({ id, title, children, className = '' }) {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <section id={id} ref={ref} className={`section ${visible ? 'section-visible' : ''} ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
}

/* ───────────── TABBED SKILLS ───────────── */
function TabbedSkills() {
  const [activeTab, setActiveTab] = useState(SKILL_TABS[0]);
  const [animKey, setAnimKey] = useState(0);
  const [ref, visible] = useScrollReveal(0.1);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setAnimKey((k) => k + 1);
  };

  const items = SKILLS[activeTab] || [];

  return (
    <div ref={ref} className={`tabbed-skills ${visible ? 'tabbed-visible' : ''}`}>
      <div className="skill-tabs">
        {SKILL_TABS.map((tab) => (
          <button
            key={tab}
            className={`skill-tab ${activeTab === tab ? 'active' : ''}`}
            onMouseEnter={() => switchTab(tab)}
            onFocus={() => switchTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="skill-items-grid" key={animKey}>
        {items.map((skill, i) => (
          <div className="skill-item-card" key={skill.name} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="skill-item-icon" style={{ color: skill.color, borderColor: `${skill.color}44` }}>
              {skill.icon}
            </div>
            <div className="skill-item-info">
              <span className="skill-item-name">{skill.name}</span>
              <div className="skill-item-bar-track">
                <div
                  className="skill-item-bar-fill"
                  style={{ width: `${skill.proficiency}%`, background: skill.color, animationDelay: `${i * 0.08 + 0.2}s` }}
                />
              </div>
            </div>
            <span className="skill-item-pct" style={{ color: skill.color }}>{skill.proficiency}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── PROJECT CARD ───────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [ref, visible] = useScrollReveal(0.1);
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  }, []);
  return (
    <div ref={ref} className={`project-card-outer ${visible ? 'proj-visible' : ''}`} style={{ transitionDelay: `${index * 0.2}s` }}>
      <div ref={cardRef} className="project-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link-btn btn-github">
              <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '4px' }}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          )}
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="project-link-btn btn-live">Live ↗</a>}
        </div>
        {project.image && (
          <div className="project-card-image-wrapper">
            <img src={project.image} alt={project.title} className="project-card-image" />
            <div className="project-card-image-overlay" />
          </div>
        )}
        <div className="project-glare" />
        <div className="project-card-content">
          <h3 className="project-title">{project.title}</h3>
          <ul className="project-bullets">{project.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          <div className="project-tags">{project.tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── TIMELINE ITEM ───────────── */
function TimelineItem({ item, index, side }) {
  const [ref, visible] = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`timeline-item ${side} ${visible ? 'tl-visible' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
      <div className="timeline-dot" />
      <div className={`timeline-card ${item.link ? 'has-cert' : ''}`}>
        {item.link && (
          <a href={item.link} target="_blank" rel="noreferrer" className="cert-link-btn" title="View Certificate">
            View Certificate <span>↗</span>
          </a>
        )}
        <h3>{item.title || item.degree}</h3>
        <p className="tl-org">{item.org || item.school}</p>
        <p className="tl-date">{item.period || item.date}</p>
        {item.details && <p className="tl-detail">{item.details}</p>}
        {item.score && <p className="tl-score">{item.score}</p>}
      </div>
    </div>
  );
}

/* ───────────── ACHIEVEMENT CARD ───────────── */
function AchievementCard({ a, index }) {
  const [ref, visible] = useScrollReveal(0.15);
  const count = useCountUp(a.counter, visible);
  return (
    <div ref={ref} className={`ach-card ${visible ? 'ach-visible' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
      <div className={`ach-icon ${visible ? 'bounce' : ''}`}>🏆</div>
      <div className="ach-counter">{count}{a.suffix}</div>
      <div className="ach-label">{a.label}</div>
      <p className="ach-text">{a.text}</p>
    </div>
  );
}

/* ───────────── CERT CARD ───────────── */
function CertCard({ cert, index }) {
  const [ref, visible] = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`cert-card ${visible ? 'cert-visible' : ''}`} style={{ transitionDelay: `${index * 0.12}s` }}>
      <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link-btn" title="View Certificate">
        View Certificate <span>↗</span>
      </a>
      <div className={`cert-badge ${visible ? 'bounce' : ''}`}>🎓</div>
      <h3>{cert.title}</h3>
      <p className="cert-org">{cert.org}</p>
      <p className="cert-date">{cert.date}</p>
    </div>
  );
}

function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <div className="modal-body">
          <iframe
            src="https://drive.google.com/file/d/1ClkbdgG-dy2md1EFX7dn07SG7WnTerdd/preview"
            className="resume-iframe"
            title="Resume Preview"
          />
        </div>
        <div className="modal-footer">
          <a
            href="https://drive.google.com/file/d/1ClkbdgG-dy2md1EFX7dn07SG7WnTerdd/view"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ padding: '10px 24px', fontSize: '0.85rem' }}
          >
            View Full Resume <span>↗</span>
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1ClkbdgG-dy2md1EFX7dn07SG7WnTerdd"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.85rem' }}
          >
            Download Resume <span>⬇</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ───────────── CHATBOT WIDGET ───────────── */
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 Ask me anything about Aditya Singh — his skills, projects, education, or experience!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const getBotResponse = (input) => {
    const low = input.toLowerCase();
    
    const matches = (keys) => keys.some(k => low.includes(k));

    if (matches(['who', 'aditya', 'about', 'introduce', 'tell me', 'yourself', 'him', 'he', 'person'])) {
      return "Aditya Singh is a B.Tech Computer Science student at Lovely Professional University with a CGPA of 6.6. He is a Full Stack Developer skilled in React.js, Node.js, PHP, and more. He has built 4+ projects (like RecipeAI and Rangsutra), earned 5+ certifications, and is 3-star ranked on HackerRank. He's actively looking for opportunities! 😊";
    }
    
    if (matches(['skill', 'tech', 'language', 'framework', 'know', 'stack', 'tool', 'platform'])) {
      return "Aditya is proficient in Languages like C, C++, Python, JavaScript (ES6+), Java, and PHP. His framework expertise includes React.js, Node.js, Express.js, Tailwind CSS, and Laravel. He also works with MySQL, MongoDB, Supabase, Git, and Postman.";
    }
    
    if (matches(['project', 'built', 'made', 'work', 'recipeai', 'rangsutra', 'e-commerce', 'shopping', 'assistant'])) {
      return "Aditya has built impressive projects: \n1. RecipeAI: A smart AI cooking assistant (React, Node, Express, MongoDB).\n2. Rangsutra: A full-stack e-commerce site with PHP/MySQL.\nCheck the 'Featured Projects' section for more details and live links!";
    }
    
    if (matches(['education', 'college', 'university', 'school', 'degree', 'cgpa', 'lpu', 'btech', 'matric', 'intermediate', 'heritage'])) {
      return "He is currently pursuing a B.Tech in CSE at Lovely Professional University (2023-Present) with a CGPA of 6.6. He completed his Intermediate (72%) and Matriculation (77%) from Heritage Public School, Agra.";
    }
    
    if (matches(['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'connect', 'social'])) {
      return "You can reach Aditya at Aaadityaaa64@gmail.com or call +91 9870798989. Connect with him on LinkedIn (adityaa06) or see his code on GitHub (Adityaa06).";
    }
    
    if (matches(['certificate', 'certification', 'course', 'training', 'dsa', 'oracle', 'infosys', 'nptel', 'coursera', 'board infinity'])) {
      return "Notable Certifications: Oracle OCI 2025, Infosys Springboard (Computational Theory), NPTEL (Social Media Privacy), and Coursera (Computer Communications). He also completed advanced DSA training at Board Infinity.";
    }
    
    if (matches(['achievement', 'hackathon', 'leetcode', 'coding', 'solve', 'rank', 'hackerank', 'gfg'])) {
      return "Aditya has solved 250+ coding problems across LeetCode, GFG, and HackerRank. He is 3-star ranked on HackerRank and also secured a Top 5 position in a competitive hackathon! 🏆";
    }
    
    if (matches(['experience', 'internship', 'job', 'hire', 'resume', 'cv'])) {
      return "Aditya is a highly motivated fresher actively looking for Full Stack or Software Developer roles. He is ready to contribute and learn! Drop him an email at Aaadityaaa64@gmail.com to discuss opportunities.";
    }

    return "I can only answer questions about Aditya Singh. Try asking about his skills, projects, education, or contact details! 😊";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = { text: getBotResponse(userMsg.text), sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <button className={`chatbot-btn ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)} title="Ask Assistant">
        {isOpen ? '✕' : (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V5.73c-.6-.34-1-1-1-1.73a2 2 0 0 1 2-2M9 9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H9m.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M11 18h2v1h-2v-1z" />
          </svg>
        )}
      </button>

      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="bot-info">
            <div className="bot-avatar" style={{background: 'var(--cyan)'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V5.73c-.6-.34-1-1-1-1.73a2 2 0 0 1 2-2M9 9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H9m.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M11 18h2v1h-2v-1z" />
              </svg>
              <span className="online-dot" />
            </div>
            <div>
              <h4>Ask About Aditya</h4>
              <p>Assistant • Online</p>
            </div>
          </div>
          <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg-wrapper ${m.sender}`}>
              <div className="msg-bubble">{m.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="msg-wrapper bot">
              <div className="msg-bubble typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send" onClick={handleSend} aria-label="Send">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
export default function App() {
  /* ── Navbar scroll & spy ── */
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);

    // Scroll spy observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id], header[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', onScroll);
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  /* ── Typewriter ── */
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [typeText, setTypeText] = useState('');
  useEffect(() => {
    const current = PERSONAL.titles[titleIdx];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTypeText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) { setTimeout(() => setDeleting(true), 1800); }
        else setCharIdx(charIdx + 1);
      } else {
        setTypeText(current.slice(0, charIdx));
        if (charIdx === 0) { setDeleting(false); setTitleIdx((titleIdx + 1) % PERSONAL.titles.length); }
        else setCharIdx(charIdx - 1);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, titleIdx]);

  /* ── Smooth scroll ── */
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{CSS_TEXT}</style>
      <CustomCursor />
      <ParticleCanvas />

      {/* Floating Orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="geo geo1" />
      <div className="geo geo2" />

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>AS</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((l) => {
            const id = l.toLowerCase();
            return (
              <li key={l}>
                <button
                  className={activeSection === id ? 'active-nav' : ''}
                  onClick={() => scrollTo(id)}
                >
                  {l}
                </button>
              </li>
            );
          })}
          <li>
            <button className="nav-resume-btn" onClick={() => setShowResumeModal(true)}>
              Resume 📄
            </button>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <header className="hero" id="hero">
        <div className="hero-bg-cube">
          <div className="cube">
            <div className="face front" /><div className="face back" />
            <div className="face left" /><div className="face right" />
            <div className="face top" /><div className="face bottom" />
          </div>
        </div>

        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-content">
              <p className="hero-greeting">Hello, I'm</p>
              <h1 className="hero-name">ADITYA SINGH</h1>
              <p className="hero-type">
                <span className="type-prefix">&gt; </span>
                <span className="type-text">{typeText}</span>
                <span className="cursor-blink">|</span>
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Get in Touch</a>
                <a href="#projects" className="btn btn-outline" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>View Projects</a>
                <button className="btn btn-primary" onClick={() => setShowResumeModal(true)}>
                  Download Resume <span>⬇</span>
                </button>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="photo-wrapper"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (centerY - y) / 10;
                const rotateY = (x - centerX) / 10;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
              }}
            >
              <div className="photo-glow" />
              <div className="glass-ribbons">
                <div className="ribbon r1" />
                <div className="ribbon r2" />
                <div className="ribbon r3" />
              </div>
              <div className="floating-shards">
                <div className="shard s1" />
                <div className="shard s2" />
                <div className="shard s3" />
                <div className="shard s4" />
                <div className="shard s5" />
              </div>
              <div className="photo-main-container">
                <img src="/3.jpeg" alt="Aditya Singh" className="hero-photo" />
                <div className="photo-glass-glare" />
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"><div className="wheel" /></div>
          <span>Scroll Down</span>
        </div>
      </header>

      <main>
        {/* ── ABOUT ── */}
        <Section id="about" title="About Me">
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a passionate Computer Science engineering student at Lovely Professional University, driven by a deep love for building elegant digital solutions. From full-stack web applications to algorithmic challenges, I thrive on turning complex problems into clean, efficient code.</p>
              <p>With hands-on experience in <strong>React.js</strong>, <strong>Node.js</strong>, <strong>C++</strong>, and modern web technologies, I bring ideas to life through pixel-perfect interfaces and robust backend architectures. I've solved <strong>250+ coding problems</strong> and collaborated in hackathons, always pushing the boundaries of what's possible.</p>
            </div>
            <div className="about-stats">
              <div className="stat-item"><span className="stat-num">250+</span><span className="stat-label">Problems Solved</span></div>
              <div className="stat-item"><span className="stat-num">4+</span><span className="stat-label">Projects Built</span></div>
              <div className="stat-item"><span className="stat-num">5+</span><span className="stat-label">Certifications</span></div>
            </div>
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section id="skills" title="Skills & Technologies">
          <TabbedSkills />
        </Section>

        {/* ── PROJECTS ── */}
        <Section id="projects" title="Featured Projects">
          <div className="projects-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
          </div>
        </Section>

        {/* ── TRAINING ── */}
        <Section id="training" title="Training">
          <div className="timeline">
            <div className="timeline-line" />
            {TRAINING.map((t, i) => <TimelineItem key={i} item={t} index={i} side={i % 2 === 0 ? 'left' : 'right'} />)}
          </div>
        </Section>

        {/* ── CERTIFICATIONS ── */}
        <Section id="certifications" title="Certifications">
          <div className="cert-grid">
            {CERTIFICATES.map((c, i) => <CertCard key={i} cert={c} index={i} />)}
          </div>
        </Section>

        {/* ── ACHIEVEMENTS ── */}
        <Section id="achievements" title="Achievements">
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a, i) => <AchievementCard key={i} a={a} index={i} />)}
          </div>
        </Section>

        {/* ── EDUCATION ── */}
        <Section id="education" title="Education">
          <div className="timeline">
            <div className="timeline-line" />
            {EDUCATION.map((e, i) => <TimelineItem key={i} item={e} index={i} side={i % 2 === 0 ? 'left' : 'right'} />)}
          </div>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact" title="Let's Connect">
          <div className="contact-card">
            <p className="contact-desc">I'm always open to new opportunities, collaborations, and conversations. Feel free to reach out!</p>
            <div className="contact-links">
              <a href={`mailto:${PERSONAL.email}`} className="contact-link" aria-label="Email">
                <span className="contact-icon">✉</span>
                <span>{PERSONAL.email}</span>
              </a>
              <a href={`tel:${PERSONAL.phone}`} className="contact-link" aria-label="Phone">
                <span className="contact-icon">📱</span>
                <span>{PERSONAL.phone}</span>
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" className="contact-link" aria-label="LinkedIn">
                <span className="contact-icon">in</span>
                <span>LinkedIn</span>
              </a>
              <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="contact-link" aria-label="GitHub">
                <span className="contact-icon">⌘</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Aditya Singh. Crafted with passion & code.</p>
      </footer>

      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
      <Chatbot />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   CSS  (single template literal)
   ═══════════════════════════════════════════════════ */
const CSS_TEXT = `
/* ── FONTS ── */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap');

/* ── RESET & ROOT ── */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#050510;
  --bg2:#0a0a1a;
  --cyan:#00dcff;
  --cyan-dim:rgba(0,220,255,.15);
  --purple:#8b5cf6;
  --purple-glow:rgba(139,92,246,.25);
  --text:#e0e6ed;
  --text-dim:#8892a4;
  --glass:rgba(10,10,30,.55);
  --glass-border:rgba(0,220,255,.12);
  --radius:16px;
  --radius-sm:10px;
  --font-head:'Orbitron',sans-serif;
  --font-body:'Rajdhani',sans-serif;
}
html{scroll-behavior:smooth;font-size:16px;}
body{
  background:var(--bg);color:var(--text);font-family:var(--font-body);
  line-height:1.7;overflow-x:hidden;cursor:none;
}
a{color:var(--cyan);text-decoration:none;}
ul{list-style:none;}

/* ── CUSTOM CURSOR ── */
.cursor-dot{
  position:fixed;width:6px;height:6px;border-radius:50%;
  background:var(--cyan);pointer-events:none;z-index:10000;
  transform:translate(-50%,-50%);transition:transform .05s;
}
.cursor-glow{
  position:fixed;width:32px;height:32px;border-radius:50%;
  border:1.5px solid rgba(0,220,255,.4);pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);transition:left .12s ease-out,top .12s ease-out;
}
@media(max-width:768px){.cursor-dot,.cursor-glow{display:none;}body{cursor:auto;}}

/* ── FLOATING ORBS ── */
.orb{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;}
.orb1{width:400px;height:400px;background:rgba(0,220,255,.06);top:-100px;left:-100px;animation:floatOrb 18s ease-in-out infinite;}
.orb2{width:350px;height:350px;background:rgba(139,92,246,.07);bottom:-80px;right:-80px;animation:floatOrb 22s ease-in-out infinite reverse;}
.orb3{width:250px;height:250px;background:rgba(0,220,255,.05);top:50%;left:50%;animation:floatOrb 15s ease-in-out infinite 3s;}
@keyframes floatOrb{0%,100%{transform:translate(0,0);}25%{transform:translate(60px,-40px);}50%{transform:translate(-30px,60px);}75%{transform:translate(50px,30px);}}

/* ── GEOMETRIC SHAPES ── */
.geo{position:fixed;pointer-events:none;z-index:0;opacity:.06;}
.geo1{width:80px;height:80px;border:2px solid var(--cyan);top:20%;right:8%;animation:spinGeo 30s linear infinite;clip-path:polygon(50% 0%,0% 100%,100% 100%);}
.geo2{width:60px;height:60px;border:2px solid var(--purple);bottom:15%;left:5%;animation:spinGeo 25s linear infinite reverse;clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);}
@keyframes spinGeo{to{transform:rotate(360deg);}}

/* ── NAVBAR ── */
.navbar{
  position:fixed;top:0;left:0;width:100%;display:flex;align-items:center;
  justify-content:space-between;padding:16px 40px;z-index:1000;
  transition:all .4s ease;
}
.navbar-scrolled{
  background:rgba(5,5,20,.72);backdrop-filter:blur(18px) saturate(1.4);
  border-bottom:1px solid var(--glass-border);box-shadow:0 4px 30px rgba(0,0,0,.4);
}
.nav-brand{
  font-family:var(--font-head);font-size:1.5rem;font-weight:900;cursor:pointer;
  background:linear-gradient(135deg,var(--cyan),var(--purple));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.nav-links{display:flex;gap:8px;}
.nav-links li button{
  background:none;border:none;color:var(--text-dim);
  font-family:var(--font-body);font-size:.95rem;font-weight:500;cursor:none;
  padding:8px 14px;position:relative;transition:color .3s;cursor:pointer;
}
.nav-links li button::after{
  content:'';position:absolute;bottom:4px;left:14px;width:0;height:2px;
  background:var(--cyan);transition:width .3s ease, background 0.3s;
}
.nav-links li button:hover, .nav-links li button.active-nav{color:var(--cyan);}
.nav-links li button:hover::after, .nav-links li button.active-nav::after{
  width:calc(100% - 28px);
}
.nav-links li button.active-nav::after{
  background:linear-gradient(90deg,var(--cyan),var(--purple));
  box-shadow: 0 0 10px rgba(0, 220, 255, 0.5);
}
.menu-toggle{display:none;background:none;border:none;flex-direction:column;gap:5px;cursor:pointer;z-index:1001;padding:4px;}
.menu-toggle span{display:block;width:24px;height:2px;background:var(--text);transition:all .3s;}

@media(max-width:768px){
  .menu-toggle{display:flex;}
  .nav-links{
    position:fixed;top:0;right:-100%;width:70vw;height:100vh;
    flex-direction:column;background:rgba(5,5,20,.95);backdrop-filter:blur(20px);
    padding:80px 30px 30px;gap:4px;transition:right .4s ease;
  }
  .nav-links.open{right:0;}
  .nav-links li button{font-size:1.1rem;padding:12px 0;text-align:left;}
}

/* ── HERO ── */
.hero{
  position:relative;min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:120px 20px 60px;overflow:hidden;
}
.hero-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;
  position: relative;
  z-index: 2;
}
.hero-left {
  text-align: left;
}
.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

.hero-bg-cube{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:0;opacity:.12;}
.cube{width:200px;height:200px;transform-style:preserve-3d;animation:rotateCube 20s linear infinite;}
.face{position:absolute;width:200px;height:200px;border:1.5px solid var(--cyan);background:rgba(0,220,255,.03);opacity:.6;}
.front{transform:translateZ(100px);}.back{transform:translateZ(-100px) rotateY(180deg);}
.left{transform:translateX(-100px) rotateY(-90deg);}.right{transform:translateX(100px) rotateY(90deg);}
.top{transform:translateY(-100px) rotateX(90deg);}.bottom{transform:translateY(100px) rotateX(-90deg);}
@keyframes rotateCube{0%{transform:rotateX(0) rotateY(0);}100%{transform:rotateX(360deg) rotateY(360deg);}}

.hero-content{position:relative;z-index:2;}
.hero-greeting{
  font-size:1.2rem;color:var(--cyan);letter-spacing:3px;text-transform:uppercase;
  margin-bottom:12px;opacity:0;animation:fadeSlideUp .8s .3s forwards;
}
.hero-name{
  font-family:var(--font-head);font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;
  line-height:1.1;letter-spacing:2px;
  background:linear-gradient(135deg,#fff 0%,var(--cyan) 40%,var(--purple) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:float3d 4s ease-in-out infinite,fadeSlideUp .8s .5s forwards;
  opacity:0;filter:drop-shadow(0 0 40px rgba(0,220,255,.3));
}
@keyframes float3d{
  0%,100%{transform:perspective(600px) rotateX(2deg) translateY(0);}
  50%{transform:perspective(600px) rotateX(-2deg) translateY(-12px);}
}

.hero-type{
  font-size:clamp(1rem,2.2vw,1.3rem);color:var(--text-dim);margin:20px 0 36px;
  font-family:var(--font-body);font-weight:400;
  opacity:0;animation:fadeSlideUp .8s .7s forwards;
}
.type-prefix{color:var(--cyan);}
.type-text{color:var(--text);}
.cursor-blink{animation:blink .8s step-end infinite;color:var(--cyan);}
@keyframes blink{50%{opacity:0;}}

.hero-cta{display:flex;gap:16px;justify-content:flex-start;flex-wrap:wrap;opacity:0;animation:fadeSlideUp .8s .9s forwards;}

/* ── PHOTO STYLES ── */
.photo-wrapper {
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  animation: photoFloat 6s ease-in-out infinite;
}

@keyframes photoFloat {
  0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
  50% { transform: translateY(-20px) rotateX(1deg) rotateY(1deg); }
}

.photo-glow {
  position: absolute;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(0,220,255,0.1) 0%, rgba(139,92,246,0.08) 40%, transparent 70%);
  z-index: -1;
  filter: blur(40px);
  animation: glowPulse 8s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.glass-ribbons {
  position: absolute;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  pointer-events: none;
}

.ribbon {
  position: absolute;
  top: 50%; left: 50%;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent 40%, rgba(0,220,255,0.05));
  box-shadow: 0 0 20px rgba(0, 220, 255, 0.05), inset 0 0 10px rgba(255, 255, 255, 0.05);
}

.r1 { width: 130%; height: 130%; transform: translate(-50%, -50%) rotate3d(1, 0.5, 0, 45deg); animation: ribbonSpin 15s linear infinite; }
.r2 { width: 115%; height: 115%; transform: translate(-50%, -50%) rotate3d(-0.5, 1, 0, -30deg); animation: ribbonSpin 12s linear infinite reverse; }
.r3 { width: 145%; height: 145%; transform: translate(-50%, -50%) rotate3d(0.2, 0.2, 1, 15deg); animation: ribbonSpin 20s linear infinite; opacity: 0.4; }

@keyframes ribbonSpin {
  from { transform: translate(-50%, -50%) rotate3d(inherit) rotate(0); }
  to { transform: translate(-50%, -50%) rotate3d(inherit) rotate(360deg); }
}

.floating-shards {
  position: absolute;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  pointer-events: none;
}

.shard {
  position: absolute;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.s1 { width: 40px; height: 60px; top: 10%; left: 80%; transform: translateZ(100px); animation: shardFloat 8s ease-in-out infinite; }
.s2 { width: 30px; height: 30px; top: 70%; left: -10%; transform: translateZ(150px); animation: shardFloat 10s ease-in-out infinite reverse; }
.s3 { width: 50px; height: 20px; top: 80%; left: 90%; transform: translateZ(80px); animation: shardFloat 12s ease-in-out infinite; }
.s4 { width: 25px; height: 50px; top: -5%; left: 20%; transform: translateZ(120px); animation: shardFloat 9s ease-in-out infinite reverse; }
.s5 { width: 35px; height: 35px; top: 40%; left: 105%; transform: translateZ(60px); animation: shardFloat 11s ease-in-out infinite; }

@keyframes shardFloat {
  0%, 100% { transform: translateZ(inherit) translateY(0) rotate(0); }
  50% { transform: translateZ(inherit) translateY(-30px) rotate(15deg); }
}

.photo-main-container {
  position: relative;
  width: 350px;
  height: 350px;
  z-index: 5;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 220, 255, 0.4);
  box-shadow: 
    0 30px 70px rgba(0, 0, 0, 0.7),
    0 0 40px rgba(0, 220, 255, 0.2),
    inset 0 0 30px rgba(0, 220, 255, 0.1);
  background: rgba(5, 5, 20, 0.6);
  transform: translateZ(50px);
}

.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.photo-glass-glare {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 100%);
  pointer-events: none;
  z-index: 2;
}

.photo-main-container:hover .hero-photo {
  transform: scale(1.1) rotate(2deg);
}

@media(max-width:968px){
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 60px;
  }
  .hero-left { text-align: center; }
  .hero-cta { justify-content: center; }
  .photo-wrapper { width: 300px; height: 300px; }
  .photo-main-container { width: 300px; height: 300px; }
}

/* ── BUTTONS ── */
.btn{
  display:inline-block;padding:14px 36px;border-radius:50px;
  font-family:var(--font-body);font-size:1rem;font-weight:600;
  letter-spacing:1px;text-transform:uppercase;cursor:pointer;
  transition:all .35s ease;position:relative;overflow:hidden;
}
.btn-primary{
  background:linear-gradient(135deg,var(--cyan),var(--purple));color:#050510;border:none;
  box-shadow:0 0 20px rgba(0,220,255,.3),0 0 40px rgba(139,92,246,.2);
}
.btn-primary:hover{
  box-shadow:0 0 30px rgba(0,220,255,.5),0 0 60px rgba(139,92,246,.35);
  transform:translateY(-2px);
}
.btn-outline{
  background:transparent;color:var(--cyan);
  border:2px solid var(--cyan);
  box-shadow:0 0 15px rgba(0,220,255,.15);
}
.btn-outline:hover{
  background:rgba(0,220,255,.08);
  box-shadow:0 0 25px rgba(0,220,255,.3);
  transform:translateY(-2px);
}

/* ── SCROLL INDICATOR ── */
.scroll-indicator{
  position:absolute;bottom:30px;display:flex;flex-direction:column;
  align-items:center;gap:8px;opacity:0;animation:fadeSlideUp .8s 1.2s forwards;
}
.scroll-indicator span{font-size:.75rem;color:var(--text-dim);letter-spacing:2px;text-transform:uppercase;}
.mouse{width:24px;height:38px;border:2px solid var(--cyan);border-radius:12px;position:relative;}
.wheel{
  width:3px;height:8px;background:var(--cyan);border-radius:3px;
  position:absolute;top:6px;left:50%;transform:translateX(-50%);
  animation:scrollWheel 2s ease-in-out infinite;
}
@keyframes scrollWheel{0%{transform:translateX(-50%) translateY(0);opacity:1;}100%{transform:translateX(-50%) translateY(14px);opacity:0;}}

/* ── FADE SLIDE UP ── */
@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}

/* ── SECTIONS ── */
.section{
  padding:40px 40px;max-width:1200px;margin:0 auto;
  position:relative;z-index:1;
  opacity:0;transform:translateY(40px);
  transition:opacity .7s ease,transform .7s ease;
}
.section-visible{opacity:1;transform:translateY(0);}
.section-title{
  font-family:var(--font-head);font-size:clamp(1.6rem,4vw,2.4rem);font-weight:700;
  text-align:center;margin-bottom:40px;position:relative;
  background:linear-gradient(135deg,var(--cyan),var(--purple));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.section-title::after{
  content:'';display:block;width:60px;height:3px;margin:12px auto 0;
  background:linear-gradient(90deg,var(--cyan),var(--purple));border-radius:3px;
}

/* ── ABOUT ── */
.about-grid{display:grid;grid-template-columns:2fr 1fr;gap:40px;align-items:center;}
.about-text p{font-size:1.05rem;color:var(--text-dim);margin-bottom:16px;font-weight:400;}
.about-text strong{color:var(--cyan);font-weight:600;}
.about-stats{display:flex;flex-direction:column;gap:20px;}
.stat-item{
  background:var(--glass);border:1px solid var(--glass-border);
  border-radius:var(--radius-sm);padding:20px;text-align:center;
  transition:transform .3s,box-shadow .3s;
}
.stat-item:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,220,255,.1);}
.stat-num{font-family:var(--font-head);font-size:2rem;font-weight:700;color:var(--cyan);display:block;}
.stat-label{font-size:.85rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:2px;}
@media(max-width:768px){.about-grid{grid-template-columns:1fr;}.about-stats{flex-direction:row;flex-wrap:wrap;justify-content:center;}.stat-item{flex:1;min-width:120px;}}

/* ── SKILLS (TABBED) ── */
.tabbed-skills{opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease;}
.tabbed-visible{opacity:1;transform:translateY(0);}

.skill-tabs{
  display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:36px;
}
.skill-tab{
  background:var(--glass);border:1px solid var(--glass-border);
  color:var(--text-dim);font-family:var(--font-body);font-size:.9rem;font-weight:600;
  padding:10px 22px;border-radius:50px;cursor:pointer;
  transition:all .35s ease;position:relative;overflow:hidden;
}
.skill-tab:hover{color:var(--cyan);border-color:rgba(0,220,255,.3);}
.skill-tab.active{
  color:#fff;
  background:linear-gradient(135deg,rgba(0,220,255,.18),rgba(139,92,246,.18));
  border-color:var(--cyan);
  box-shadow:0 0 18px rgba(0,220,255,.2),0 0 40px rgba(139,92,246,.1);
}

.skill-items-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;
}

.skill-item-card{
  display:flex;align-items:center;gap:14px;
  background:var(--glass);border:1px solid var(--glass-border);
  border-radius:var(--radius-sm);padding:16px 20px;
  animation:skillCardIn .5s ease both;
  transition:transform .3s ease,box-shadow .3s ease,border-color .3s;
}
.skill-item-card:hover{
  transform:translateY(-4px);
  box-shadow:0 8px 28px rgba(0,220,255,.1);
  border-color:rgba(0,220,255,.25);
}
@keyframes skillCardIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

.skill-item-icon{
  width:42px;height:42px;min-width:42px;display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;font-weight:700;
  background:rgba(255,255,255,.04);border:1px solid;
  border-radius:10px;transition:transform .35s,box-shadow .35s;
}
.skill-item-card:hover .skill-item-icon{
  transform:scale(1.1);
  box-shadow:0 0 14px currentColor;
}

.skill-item-info{flex:1;min-width:0;}
.skill-item-name{font-size:.95rem;font-weight:600;color:var(--text);display:block;margin-bottom:6px;}
.skill-item-bar-track{width:100%;height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;}
.skill-item-bar-fill{
  height:100%;border-radius:3px;width:0;
  animation:barGrow 1s ease forwards;
}
@keyframes barGrow{to{width:var(--w,100%);}}
.skill-item-bar-fill{width:0;animation:none;}
.skill-item-card:hover .skill-item-bar-fill{animation:barGrowHover .8s ease forwards;}
@keyframes barGrowHover{from{width:0;}}

.skill-item-pct{font-family:var(--font-head);font-size:.75rem;font-weight:600;min-width:36px;text-align:right;}

/* ── PROJECTS ── */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:30px;}
.project-card-outer{
  opacity:0;transform:translateY(40px);
  transition:opacity .6s ease,transform .6s ease;
}
.proj-visible{opacity:1;transform:translateY(0);}
.project-card{
  --glare-x:50%;--glare-y:50%;
  position:relative;overflow:hidden;min-height:100%;
  background:var(--glass);border:1px solid var(--glass-border);
  border-radius:var(--radius);padding:0;
  transition:transform .15s ease,box-shadow .3s;
  box-shadow:0 4px 30px rgba(0,0,0,.3);
}
.project-card-image-wrapper{
  position:relative;width:100%;height:200px;overflow:hidden;
  border-bottom:1px solid var(--glass-border);
}
.project-card-image{
  width:100%;height:100%;object-fit:cover;
  transition:transform .5s ease;
}
.project-card:hover .project-card-image{transform:scale(1.05);}
.project-card-image-overlay{
  position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  transition:all .3s ease;
}
.project-card:hover .project-card-image-overlay{
  background:rgba(0,220,255,0.1);
  box-shadow:inset 0 0 30px rgba(0,220,255,0.25);
}
.project-card-content{padding:28px 32px 32px;}
.project-links{
  position:absolute;top:6px;right:6px;
  display:flex;gap:6px;z-index:25;
}
.project-link-btn{
  display:flex;align-items:center;padding:4px 8px;
  font-size:.7rem;font-weight:700;border-radius:4px;
  text-decoration:none;transition:all .3s ease;
}
.btn-github{
  background:#000!important;color:#fff!important;
  border:1px solid #333;
}
.btn-github:hover{
  box-shadow:0 0 10px rgba(255,255,255,0.4);
  border-color:#555;
}
.btn-live{
  background:#00ff88!important;color:#000!important;
  border:none;
}
.btn-live:hover{
  background:#05ff91!important;
  box-shadow:0 0 15px rgba(0,255,136,0.6);
}
.project-card:hover{box-shadow:0 12px 50px rgba(0,220,255,.12);}
.project-glare{
  position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(circle at var(--glare-x) var(--glare-y),rgba(0,220,255,.1) 0%,transparent 60%);
  opacity:0;transition:opacity .3s;
}
.project-card:hover .project-glare{opacity:1;}
.project-title{font-family:var(--font-head);font-size:1.1rem;color:var(--cyan);margin-bottom:14px;}
.project-bullets{margin-bottom:18px;}
.project-bullets li{position:relative;padding-left:18px;color:var(--text-dim);font-size:.95rem;margin-bottom:6px;}
.project-bullets li::before{content:'▹';position:absolute;left:0;color:var(--cyan);}
.project-tags{display:flex;flex-wrap:wrap;gap:8px;}
.tag{
  padding:4px 14px;border-radius:20px;font-size:.8rem;font-weight:500;
  background:rgba(0,220,255,.08);border:1px solid rgba(0,220,255,.2);
  color:var(--cyan);box-shadow:0 0 8px rgba(0,220,255,.08);
  transition:box-shadow .3s,background .3s;
}
.tag:hover{background:rgba(0,220,255,.15);box-shadow:0 0 16px rgba(0,220,255,.2);}

/* ── TIMELINE ── */
.timeline{position:relative;padding:20px 0;}
.timeline-line{position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--cyan),var(--purple));transform:translateX(-50%);}
.timeline-item{
  position:relative;width:50%;padding:10px 40px;
  opacity:0;transition:opacity .6s ease,transform .6s ease;
}
.timeline-item.left{left:0;text-align:right;transform:translateX(-40px);}
.timeline-item.right{left:50%;text-align:left;transform:translateX(40px);}
.tl-visible.left{opacity:1;transform:translateX(0);}
.tl-visible.right{opacity:1;transform:translateX(0);}
.timeline-dot{
  position:absolute;top:20px;width:14px;height:14px;border-radius:50%;
  background:var(--cyan);box-shadow:0 0 16px var(--cyan);z-index:2;
}
.left .timeline-dot{right:-7px;}
.right .timeline-dot{left:-7px;}
.timeline-card{
  position:relative;
  background:var(--glass);border:1px solid var(--glass-border);
  border-radius:var(--radius-sm);padding:20px;
  transition:box-shadow .3s;
}
.timeline-card.has-cert{padding-top:32px;}
.timeline-card:hover{box-shadow:0 8px 30px rgba(0,220,255,.1);}
.timeline-card h3{font-family:var(--font-head);font-size:1rem;color:var(--text);margin-bottom:4px;}
.tl-org{color:var(--cyan);font-weight:600;font-size:.9rem;}
.tl-date{color:var(--text-dim);font-size:.85rem;margin-bottom:6px;}
.tl-detail,.tl-score{color:var(--text-dim);font-size:.9rem;}

@media(max-width:768px){
  .timeline-line{left:16px;}
  .timeline-item{width:100%;left:0!important;text-align:left!important;padding:10px 10px 10px 44px;transform:translateX(-30px)!important;}
  .tl-visible.left,.tl-visible.right{transform:translateX(0)!important;}
  .timeline-dot{left:9px!important;right:auto!important;}
}

/* ── CERTIFICATIONS ── */
.cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;}
.cert-card{
  position:relative;
  background:var(--glass);border:1px solid var(--glass-border);
  border-radius:var(--radius-sm);padding:24px;text-align:center;
  opacity:0;transform:translateY(30px);
  transition:opacity .6s ease,transform .6s ease,box-shadow .3s;
}
.cert-link-btn{
  position:absolute;top:0;right:0;
  display:flex;align-items:center;gap:4px;
  padding:6px 12px;font-size:.65rem;font-weight:700;
  color:var(--cyan);text-transform:uppercase;letter-spacing:.5px;
  background:rgba(0,220,255,.08);backdrop-filter:blur(8px);
  border-left:1px solid rgba(0,220,255,.2);
  border-bottom:1px solid rgba(0,220,255,.2);
  border-radius:0 10px 0 10px;
  transition:all .3s ease;z-index:2;
}
.cert-link-btn:hover{
  background:rgba(0,220,255,.12);
  border-color:var(--cyan);
  box-shadow:0 0 10px rgba(0,220,255,.3);
}
.cert-visible{opacity:1;transform:translateY(0);}
.cert-card:hover{box-shadow:0 8px 30px rgba(0,220,255,.1);}
.cert-badge{font-size:2.2rem;margin-bottom:10px;display:inline-block;}
.cert-card h3{font-family:var(--font-head);font-size:.9rem;color:var(--text);margin-bottom:4px;}
.cert-org{color:var(--cyan);font-size:.85rem;font-weight:600;}
.cert-date{color:var(--text-dim);font-size:.8rem;}

/* ── ACHIEVEMENTS ── */
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;}
.ach-card{
  background:var(--glass);border:1px solid var(--glass-border);
  border-radius:var(--radius);padding:32px;text-align:center;
  opacity:0;transform:translateY(30px);
  transition:opacity .6s ease,transform .6s ease,box-shadow .3s;
}
.ach-visible{opacity:1;transform:translateY(0);}
.ach-card:hover{box-shadow:0 8px 30px rgba(0,220,255,.1);}
.ach-icon{font-size:2.8rem;margin-bottom:10px;display:inline-block;}
.ach-counter{font-family:var(--font-head);font-size:2.8rem;font-weight:900;color:var(--cyan);}
.ach-label{font-size:.85rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;}
.ach-text{color:var(--text-dim);font-size:.9rem;}

/* ── BOUNCE ── */
.bounce{animation:bounceIn .6s ease;}
@keyframes bounceIn{0%{transform:scale(0.3);opacity:0;}50%{transform:scale(1.15);}70%{transform:scale(.9);}100%{transform:scale(1);opacity:1;}}

/* ── CONTACT ── */
.contact-card{
  max-width:600px;margin:0 auto;
  background:rgba(10,10,30,.55);backdrop-filter:blur(20px) saturate(1.3);
  border:1px solid var(--glass-border);border-radius:var(--radius);
  padding:40px;text-align:center;
}
.contact-desc{color:var(--text-dim);font-size:1.05rem;margin-bottom:28px;}
.contact-links{display:flex;flex-direction:column;gap:14px;}
.contact-link{
  display:flex;align-items:center;gap:14px;padding:14px 20px;
  background:rgba(0,220,255,.04);border:1px solid rgba(0,220,255,.1);
  border-radius:var(--radius-sm);color:var(--text);font-size:.95rem;
  transition:all .3s ease;
}
.contact-link:hover{
  background:rgba(0,220,255,.1);border-color:var(--cyan);
  box-shadow:0 0 20px rgba(0,220,255,.15);transform:translateX(6px);
}
.contact-icon{
  width:40px;height:40px;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,rgba(0,220,255,.15),rgba(139,92,246,.15));
  border-radius:10px;font-size:1.1rem;font-weight:700;
  transition:transform .4s ease,box-shadow .3s;
}
.contact-link:hover .contact-icon{
  transform:rotate(360deg);
  box-shadow:0 0 12px rgba(0,220,255,.3);
}

/* ── FOOTER ── */
.footer{
  text-align:center;padding:30px 20px;
  border-top:1px solid var(--glass-border);
  color:var(--text-dim);font-size:.85rem;
  position:relative;z-index:1;
}

/* ── RESPONSIVE ── */
@media(max-width:600px){
  .section{padding:20px 20px;}
  .hero{padding:80px 16px 40px;}
  .projects-grid{grid-template-columns:1fr;}
  .skill-items-grid{grid-template-columns:1fr;}
  .skill-tab{padding:8px 16px;font-size:.8rem;}
  .btn{padding:12px 28px;font-size:.9rem;}
}

/* ── RESUME NAV BTN ── */
.nav-resume-btn{
  background:rgba(10,10,30,0.55);backdrop-filter:blur(8px);
  border:1.5px solid var(--glass-border);border-radius:var(--radius-sm);
  color:var(--text);font-family:var(--font-body);font-size:.9rem;font-weight:600;
  padding:6px 16px;cursor:pointer;transition:all .3s ease;display:flex;align-items:center;gap:6px;
  margin-left:12px;
}
.nav-resume-btn:hover{
  border-color:var(--cyan);background:rgba(0,220,255,0.08);
  box-shadow:0 0 15px rgba(0,220,255,0.25);color:var(--cyan);
}

/* ── MODAL ── */
.modal-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;z-index:2000;
  padding:20px;animation:fadeIn .3s ease;
}
.modal-content{
  position:relative;width:100%;max-width:850px;max-height:90vh;
  background:var(--bg2);border:2px solid var(--cyan);border-radius:var(--radius);
  box-shadow:0 0 40px rgba(0,220,255,0.2);display:flex;flex-direction:column;
  overflow:hidden;animation:modalEnter .4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-close{
  position:absolute;top:15px;right:15px;background:none;border:none;
  color:var(--text);font-size:1.5rem;cursor:pointer;z-index:10;transition:color .3s;
}
.modal-close:hover{color:var(--cyan);}
.modal-body{flex:1;min-height:450px;padding-top:40px;}
.resume-iframe{width:100%;height:100%;min-height:450px;border:none;}
.modal-footer{
  padding:20px;display:flex;justify-content:center;gap:16px;
  border-top:1px solid var(--glass-border);background:rgba(255,255,255,0.02);
}

@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes modalEnter{from{opacity:0;transform:scale(0.9) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}

@media(max-width:768px){
  .nav-resume-btn{margin-left:0;margin-top:10px;width:fit-content;}
  .modal-content{max-height:95vh;}
  .modal-body{min-height:350px;}
  .resume-iframe{min-height:350px;}
}

/* ── CHATBOT WIDGET ── */
.chatbot-container{position:fixed;bottom:30px;right:30px;z-index:9999;}
.chatbot-btn{
  width:60px;height:60px;border-radius:50%;
  background:rgba(10,10,30,0.6);backdrop-filter:blur(15px);
  border:1px solid rgba(0,220,255,0.3);
  color:var(--cyan);font-size:1.5rem;display:flex;align-items:center;justify-content:center;
  cursor:pointer;box-shadow:0 0 20px rgba(0,220,255,0.1);transition:all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation:btnPulse 3s infinite;
}
.chatbot-btn.active{transform:rotate(90deg);background:var(--purple);color:#fff;border-color:var(--purple);}
@keyframes btnPulse{0%{box-shadow:0 0 0 0 rgba(0,220,255,0.2);}70%{box-shadow:0 0 0 10px rgba(0,220,255,0);}100%{box-shadow:0 0 0 0 rgba(0,220,255,0);}}

.chat-window{
  position:absolute;bottom:80px;right:0;width:400px;height:500px;
  background:var(--glass);backdrop-filter:blur(20px) saturate(1.4);
  border:1px solid var(--glass-border);border-radius:var(--radius);
  display:flex;flex-direction:column;overflow:hidden;
  opacity:0;transform:translateY(30px) scale(0.95);pointer-events:none;
  transition:all .4s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-window.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}

.chat-header{
  padding:16px 20px;background:rgba(255,255,255,0.05);display:flex;
  align-items:center;justify-content:space-between;border-bottom:1px solid var(--glass-border);
}
.bot-info{display:flex;align-items:center;gap:12px;}
.bot-avatar{
  width:40px;height:40px;background:var(--bg2);border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:1.2rem;position:relative;
}
.online-dot{
  position:absolute;bottom:2px;right:2px;width:10px;height:100px;
  width:10px;height:10px;border-radius:50%;background:#10B981;border:2px solid var(--bg2);
}
.chat-header h4{font-family:var(--font-head);font-size:.9rem;color:var(--text);margin:0;}
.chat-header p{font-size:.7rem;color:var(--text-dim);margin:0;}
.chat-close{background:none;border:none;color:var(--text-dim);font-size:1.2rem;cursor:pointer;}

.chat-messages{flex:1;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;}
.msg-wrapper{display:flex;width:100%;}
.msg-wrapper.bot{justify-content:flex-start;}
.msg-wrapper.user{justify-content:flex-end;}

.msg-bubble{
  max-width:80%;padding:10px 16px;border-radius:18px;font-size:.9rem;line-height:1.5;
  animation:msgIn .3s ease forwards;
}
@keyframes msgIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}

.bot .msg-bubble{
  background:rgba(0,220,255,0.1);color:var(--text);
  border:1px solid var(--cyan-dim);border-bottom-left-radius:4px;
}
.user .msg-bubble{
  background:rgba(255,255,255,0.08);color:#fff;
  border:1px solid rgba(255,255,255,0.1);border-bottom-right-radius:4px;
}

.typing span{animation:dotFlash 1.4s infinite;margin:0 1px;font-weight:900;font-size:1.2rem;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes dotFlash{0%,100%{opacity:0.2;}50%{opacity:1;}}

.chat-input-area{
  padding:16px 20px;background:rgba(255,255,255,0.03);display:flex;gap:10px;
  border-top:1px solid var(--glass-border);
}
.chat-input-area input{
  flex:1;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);
  border-radius:20px;padding:10px 16px;color:var(--text);font-family:var(--font-body);
  font-size:.9rem;outline:none;transition:border-color .3s;
}
.chat-input-area input:focus{border-color:var(--cyan-dim);}
.chat-send{
  background:var(--cyan);border:none;width:40px;height:40px;border-radius:50%;
  color:#000;display:flex;align-items:center;justify-content:center;cursor:pointer;
  transition:all .3s;
}
.chat-send:hover{background:var(--purple);color:#fff;transform:scale(1.1);}

@media(max-width:500px){
  .chat-window{width:calc(100vw - 40px);height:60vh;bottom:70px;right:-10px;}
}
`;

