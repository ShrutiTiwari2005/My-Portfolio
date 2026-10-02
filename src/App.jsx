import React, { useEffect, useMemo, useState } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, Sun, Moon, Code2, Sparkles, BriefcaseBusiness, GraduationCap, Download, ExternalLink, Star, GitFork } from 'lucide-react';

const GITHUB_USERNAME = 'ShrutiTiwari2005';
const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// Keep featured projects curated so their order and descriptions stay recruiter-friendly.
// Update repo names here if you rename repositories on GitHub.
const featured = [
  { repo: 'HemoAI', title: 'Blood Bank AI', category: 'Python', description: 'A blood-bank intelligence project designed to support shortage forecasting and donor recommendations.', stack: ['Python', 'Flask', 'MySQL', 'Random Forest'] },
  { repo: 'ToneRefineAI', title: 'ToneRefine AI — Email Tone Polisher', category: 'AI / Python', description: 'An AI-powered email writing tool that refines message tone based on the user’s needs.', stack: ['Python', 'Streamlit', 'Transformers', 'FLAN-T5'] },
  { repo: '-Stock-Portfolio-Analysis-Performance-Prediction-System', title: 'Stock Portfolio Analysis & Performance Prediction', category: 'Data Analysis', description: 'A Python project for analyzing stock portfolio performance using market data and data analysis tools.', stack: ['Python', 'Pandas', 'yfinance'] },
  { repo: 'email-spam-detection', title: 'Email Spam Detection', category: 'Machine Learning', description: 'A machine-learning project that classifies email text as spam or not spam.', stack: ['Python', 'scikit-learn', 'TF-IDF'] },
  { repo: 'Amazon-Clone', title: 'Amazon Clone Website', category: 'Frontend', description: 'A front-end e-commerce interface built to practice responsive web development.', stack: ['HTML', 'CSS', 'JavaScript'] },
  { repo: 'Tic-Tac-Toe-game', title: 'Tic Tac Toe Game', category: 'Frontend', description: 'A browser-based Tic Tac Toe game built with JavaScript.', stack: ['HTML', 'CSS', 'JavaScript'] }
];

function App() {
  const [dark, setDark] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    })
      .then(async response => {
        if (!response.ok) throw new Error(response.status === 403 ? 'GitHub API rate limit reached. Please try again later.' : 'Could not load GitHub repositories.');
        return response.json();
      })
      .then(data => setRepos(Array.isArray(data) ? data.filter(repo => !repo.fork) : []))
      .catch(err => { if (err.name !== 'AbortError') setError(err.message || 'Could not load repositories.'); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const featuredCards = featured.map(project => {
    const repo = repos.find(item => item.name.toLowerCase() === project.repo.toLowerCase());
    return { ...project, url: repo?.html_url || `${PROFILE_URL}/${project.repo}`, language: repo?.language || project.stack[0], stars: repo?.stargazers_count ?? 0 };
  });

  const featuredNames = new Set(featured.map(p => p.repo.toLowerCase()));
  const otherRepos = repos.filter(repo => !featuredNames.has(repo.name.toLowerCase()));
  const categories = ['All', 'Python', 'JavaScript', 'HTML', 'Jupyter Notebook', 'Other'];
  const visibleRepos = useMemo(() => filter === 'All' ? otherRepos : otherRepos.filter(repo => (repo.language || 'Other') === filter), [filter, repos]);

  return <main className={dark ? 'app dark' : 'app light'}>
    <nav className="nav wrap">
      <a className="brand" href="#home">ST<span>.</span></a>
      <div className="navlinks"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div>
      <button className="icon-btn" aria-label="Toggle color theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
    </nav>

    <section id="home" className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> OPEN TO OPPORTUNITIES</div>
        <p className="hello">Hello, I’m</p>
        <h1>Shruti <span>Tiwari.</span></h1>
        <h2>Python Developer <i>·</i> Data Enthusiast</h2>
        <p className="intro">Computer Science graduate who enjoys building practical applications, working with data, and turning ideas into useful solutions.</p>
        <div className="actions"><a className="primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="secondary" href="#contact">Let’s connect</a></div>
        <div className="socials"><a href={PROFILE_URL} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a><a href="https://www.linkedin.com/in/shruti-tiwari-8851b7287/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href="mailto:tiwarishruti2005@gmail.com" aria-label="Email"><Mail size={19}/></a></div>
      </div>
      <div className="hero-art" aria-label="Decorative code illustration"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="code-card"><div className="dots"><b/><b/><b/></div><div className="code-line muted"># building ideas into reality</div><div className="code-line"><span className="pink">class</span> <span className="cyan">Developer</span>:</div><div className="code-line indent"><span className="pink">def</span> <span className="yellow">create</span>(self):</div><div className="code-line indent2">skills = [</div><div className="code-line indent3"><span className="green">'Python'</span>, <span className="green">'SQL'</span>,</div><div className="code-line indent3"><span className="green">'Flask'</span>, <span className="green">'Data'</span></div><div className="code-line indent2">]</div><div className="code-line indent"><span className="pink">return</span> <span className="cyan">impact</span></div><div className="cursor"/></div><div className="float-chip chip-a"><Code2 size={16}/> Python</div><div className="float-chip chip-b"><Sparkles size={16}/> Curious mind</div><div className="hero-glow"/></div>
      <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section id="about" className="section wrap">
      <div className="section-head"><span className="kicker">01 / ABOUT</span><h2>A little about <em>me</em></h2></div>
      <div className="about-grid"><p className="about-lead">I’m a Computer Science & Engineering graduate with a growing focus on Python development and data-driven problem solving.</p><div className="about-detail"><p>I like learning by building: from web applications and automation to machine-learning projects. I’m currently looking for an opportunity where I can contribute, keep learning, and grow as a developer.</p><div className="mini-stats"><div><strong>2026</strong><span>Graduated</span></div><div><strong>6+</strong><span>Projects</span></div><div><strong>Python</strong><span>Core focus</span></div></div></div></div>
    </section>

    <section id="skills" className="section wrap">
      <div className="section-head"><span className="kicker">02 / TOOLKIT</span><h2>Skills & <em>technologies</em></h2></div>
      <div className="skills-grid">
        {[
          ['Programming', 'Python', 'Java', 'C / C++'],
          ['Backend & Web', 'Flask', 'Django', 'HTML', 'CSS', 'JavaScript'],
          ['Data & Database', 'SQL', 'MySQL', 'Pandas', 'NumPy', 'Excel'],
          ['Tools & ML', 'Power BI', 'scikit-learn', 'Git', 'GitHub', 'Streamlit']
        ].map(([title, ...items]) => <div className="skill-card" key={title}><div className="skill-icon"><Code2 size={18}/></div><h3>{title}</h3><div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div></div>)}
      </div>
    </section>

    <section id="projects" className="section wrap">
      <div className="section-head project-title"><div><span className="kicker">03 / SELECTED WORK</span><h2>Projects that <em>I've built</em></h2></div><a className="text-link" href={PROFILE_URL} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={16}/></a></div>
      <div className="project-grid">{featuredCards.map((project, i) => <article className="project-card" key={project.repo}><div className="project-top"><span className="project-index">0{i+1}</span><span className="project-category">{project.category}</span></div><div className="project-visual"><div className={`visual-shape shape-${i+1}`}><span>{['HB','T°','↗','✉','A','×'][i]}</span></div><div className="visual-label">FEATURED PROJECT</div></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-footer"><span className="language"><i/> {project.language || 'Code'} {project.stars > 0 && <small><Star size={12}/> {project.stars}</small>}</span><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}><ArrowUpRight size={18}/></a></div></article>)}</div>
      <div className="repo-heading"><div><span className="kicker">FROM GITHUB</span><h3>More repositories</h3><p>Automatically fetched from your public GitHub profile.</p></div><span className="repo-count">{loading ? 'Loading…' : `${otherRepos.length} repos`}</span></div>
      <div className="filters">{categories.map(category => <button key={category} className={filter === category ? 'filter active' : 'filter'} onClick={() => setFilter(category)}>{category}</button>)}</div>
      {loading ? <div className="repo-state">Loading public repositories from GitHub…</div> : error ? <div className="repo-state">{error} <a href={`${PROFILE_URL}?tab=repositories`} target="_blank" rel="noreferrer">View repositories on GitHub <ExternalLink size={14}/></a></div> : visibleRepos.length ? <div className="repo-grid">{visibleRepos.map(repo => <a className="repo-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}><div className="repo-card-head"><Github size={17}/><ArrowUpRight size={16}/></div><h4>{repo.name.replaceAll('-', ' ')}</h4><p>{repo.description || 'No description provided yet.'}</p><div className="repo-meta"><span>{repo.language || 'Other'}</span><span><Star size={12}/> {repo.stargazers_count}</span><span><GitFork size={12}/> {repo.forks_count}</span></div></a>)}</div> : <div className="repo-state">No additional public repositories found for this filter.</div>}
    </section>

    <section id="experience" className="section wrap">
      <div className="section-head"><span className="kicker">04 / JOURNEY</span><h2>Experience & <em>education</em></h2></div>
      <div className="timeline">
        <div className="timeline-item"><div className="timeline-icon"><BriefcaseBusiness size={18}/></div><div className="timeline-content"><span className="date">MAY 2025 — JUN 2025</span><h3>Python Developer Intern</h3><h4>Markstein</h4><p>Worked on Python development and strengthened practical programming skills through internship experience.</p></div></div>
        <div className="timeline-item"><div className="timeline-icon"><GraduationCap size={18}/></div><div className="timeline-content"><span className="date">2022 — 2026</span><h3>B.Tech, Computer Science & Engineering</h3><h4>IPS College of Technology & Management, Gwalior</h4><p>Built a foundation in programming, databases, software development, and computer science.</p></div></div>
      </div>
    </section>

    <section id="contact" className="contact-section">
      <div className="wrap contact-inner"><span className="kicker">05 / CONTACT</span><h2>Let’s build something <em>meaningful.</em></h2><p>I’m open to entry-level opportunities in Python development and related roles. Have an opportunity or just want to connect? Feel free to reach out.</p><a className="primary" href="mailto:tiwarishruti2005@gmail.com">Say hello <ArrowUpRight size={17}/></a><div className="contact-links"><a href={PROFILE_URL} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href="https://www.linkedin.com/in/shruti-tiwari-8851b7287/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a></div></div>
    </section>
    <footer className="footer wrap"><a className="brand" href="#home">ST<span>.</span></a><span>Designed & built with curiosity · © 2026 Shruti Tiwari</span><a href="#home">Back to top ↑</a></footer>
  </main>;
}
export default App;
