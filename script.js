// Runtime check: confirm script is loaded and capture unhandled errors
console.log('script.js loaded');
window.addEventListener('error', function(ev){
  console.error('Unhandled JS error:', ev.error || ev.message, ev);
  // show a non-blocking visual cue in case alerts are suppressed
  try{ var el = document.getElementById('__ps_runtime_err'); if(!el){ el = document.createElement('div'); el.id='__ps_runtime_err'; el.style.position='fixed'; el.style.right='12px'; el.style.bottom='12px'; el.style.padding='8px 12px'; el.style.background='rgba(220,60,60,0.95)'; el.style.color='#fff'; el.style.zIndex=9999; el.style.borderRadius='8px'; document.body.appendChild(el); } el.textContent = 'JS error: ' + (ev.error?.message || ev.message || 'See console'); }catch(e){}
});

function showAlert(msg){ alert(msg); }
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
}
// Simple client-side navigation (no separate files)
function navigateTo(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById(page);
  if(el) el.classList.add('active');
  window.location.hash = page;
  window.scrollTo(0,0);
}

// Preserve hash navigation on load
(function(){
  const hash = window.location.hash.replace('#','');
  if(hash && document.getElementById(hash)){
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
})();

// Validator form handling (demo — no backend)
function submitValidatorForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const areas = Array.from(document.getElementById('areas').selectedOptions).map(o=>o.value);
  const why = document.getElementById('why').value.trim();

  // basic client-side validation
  if(!name || !email){
    showFormMessage('Please enter name and email.', true);
    return;
  }
  // fake submission flow
  showFormMessage('Submitting application...');
  setTimeout(()=>{
    showFormMessage('Application submitted — we will review and notify you by email.');
    document.getElementById('validatorForm').reset();
  }, 900);
}

function saveDraft(){
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    profileLink: document.getElementById('profileLink').value,
    areas: Array.from(document.getElementById('areas').selectedOptions).map(o=>o.value),
    why: document.getElementById('why').value
  };
  localStorage.setItem('validatorDraft', JSON.stringify(data));
  showFormMessage('Draft saved locally.');
}

// Demo flow: start demo, save/load demo draft, submit demo (fake)
function startDemo(){
  // navigate to demo page and load any draft
  navigateTo('demo');
  const raw = localStorage.getItem('demoDraft');
  if(!raw) return;
  try{
    const d = JSON.parse(raw);
    if(d.title) document.getElementById('demoTitle').value = d.title;
    if(d.author) document.getElementById('demoAuthor').value = d.author;
    if(d.desc) document.getElementById('demoDesc').value = d.desc;
  }catch(e){console.warn('failed to load demo draft', e)}
}

function saveDemoDraft(){
  const data = {
    title: document.getElementById('demoTitle').value,
    author: document.getElementById('demoAuthor').value,
    desc: document.getElementById('demoDesc').value
  };
  localStorage.setItem('demoDraft', JSON.stringify(data));
  const el = document.getElementById('demoMsg');
  if(el) el.textContent = 'Demo draft saved locally.';
}

function submitDemoForm(e){
  e.preventDefault();
  const title = document.getElementById('demoTitle').value.trim();
  const author = document.getElementById('demoAuthor').value.trim();
  const desc = document.getElementById('demoDesc').value.trim();
  const el = document.getElementById('demoMsg');
  if(!title || !author){
    if(el) { el.style.color = '#ffb4b4'; el.textContent = 'Please provide title and your name.'; }
    return;
  }
  if(el) { el.style.color = '#aee6ff'; el.textContent = 'Publishing demo...'; }
  // fake publish and then show the project preview by navigating home and showing an alert
  setTimeout(()=>{
    // clear draft
    localStorage.removeItem('demoDraft');
    if(el) el.textContent = 'Demo published — visible in Projects.';
    // Optionally create a temporary banner on home; for now we'll navigate home and show a short alert
    navigateTo('home');
    showAlert('Demo "' + title + '" published by ' + author + '. It appears in Projects (local demo).');
    // In a real app we'd add the demo to a data store; here we could append to the DOM if desired.
  }, 900);
}

// Sign-up flow: navigate to signup form, save/load draft, submit (fake)
function startSignUp(){
  navigateTo('signup');
  const raw = localStorage.getItem('signupDraft');
  if(!raw) return;
  try{
    const d = JSON.parse(raw);
    if(d.name) document.getElementById('suName').value = d.name;
    if(d.email) document.getElementById('suEmail').value = d.email;
    if(d.age) document.getElementById('suAge').value = d.age;
    if(d.mobile) document.getElementById('suMobile').value = d.mobile;
    if(d.resume) document.getElementById('suResume').value = d.resume;
    if(d.mini) document.getElementById('suMiniProject').value = d.mini;
    if(d.domains && d.domains.length){
      const sel = document.getElementById('suDomains');
      Array.from(sel.options).forEach(opt=>{ if(d.domains.includes(opt.value)) opt.selected = true; });
    }
  }catch(e){console.warn('failed to load signup draft', e)}
}

function saveSignUpDraft(){
  const data = {
    name: document.getElementById('suName').value,
    email: document.getElementById('suEmail').value,
    age: document.getElementById('suAge').value,
    mobile: document.getElementById('suMobile').value,
    resume: document.getElementById('suResume').value,
    mini: document.getElementById('suMiniProject').value,
    domains: Array.from(document.getElementById('suDomains').selectedOptions).map(o=>o.value)
  };
  localStorage.setItem('signupDraft', JSON.stringify(data));
  const el = document.getElementById('signupMsg'); if(el) el.textContent = 'Sign-up draft saved locally.';
}

function submitSignUpForm(e){
  e.preventDefault();
  const name = document.getElementById('suName').value.trim();
  const email = document.getElementById('suEmail').value.trim();
  const age = document.getElementById('suAge').value.trim();
  const mobile = document.getElementById('suMobile').value.trim();
  const resume = document.getElementById('suResume').value.trim();
  const mini = document.getElementById('suMiniProject').value.trim();
  const domains = Array.from(document.getElementById('suDomains').selectedOptions).map(o=>o.value);
  const el = document.getElementById('signupMsg');
  if(!name || !email){ if(el){ el.style.color = '#ffb4b4'; el.textContent = 'Please provide name and email.'; } return; }
  if(el){ el.style.color = '#aee6ff'; el.textContent = 'Creating account...'; }
  setTimeout(()=>{
    localStorage.removeItem('signupDraft');
    if(el) el.textContent = 'Account created — we will email you verification (demo).';
    // Persist full account info
    const account = { name, email, age, mobile, resume, mini, domains };
    localStorage.setItem('currentAccount', JSON.stringify(account));

    // Decide which application page to open first based on selected domains (priority order)
    const domainRouteMap = [
      { key: 'Front-end', page: 'apply-frontend', prefill: (a)=>{ if(a.name) document.getElementById('feName').value = a.name; if(a.email) document.getElementById('feEmail').value = a.email; } },
      { key: 'Video & Media', page: 'apply-video', prefill: (a)=>{ if(a.name) document.getElementById('vidName').value = a.name; if(a.email) document.getElementById('vidEmail').value = a.email; } },
      { key: 'Data & Analytics', page: 'apply-data', prefill: (a)=>{ if(a.name) document.getElementById('daName').value = a.name; if(a.email) document.getElementById('daEmail').value = a.email; } },
      { key: 'DevOps', page: 'apply-devops', prefill: (a)=>{ if(a.name) document.getElementById('dvName').value = a.name; if(a.email) document.getElementById('dvEmail').value = a.email; } },
      { key: 'Design & UX', page: 'apply-design', prefill: (a)=>{ if(a.name) document.getElementById('uxName').value = a.name; if(a.email) document.getElementById('uxEmail').value = a.email; } }
    ];

    let routed = false;
    for(const map of domainRouteMap){
      if(domains.includes(map.key)){
        // navigate to the page and prefill after the navigation completes
        navigateTo(map.page);
        setTimeout(()=>{
          try{ map.prefill(account); }catch(e){}
        }, 80);
        routed = true;
        break;
      }
    }

    if(!routed){
      navigateTo('home');
      showAlert('Account for ' + name + ' created. Domains: ' + (domains.length ? domains.join(', ') : 'None'));
    }
  }, 900);
}

// Front-end application helpers
function saveFrontendDraft(){
  const data = {
    name: document.getElementById('feName').value,
    email: document.getElementById('feEmail').value,
    portfolio: document.getElementById('fePortfolio').value,
    frameworks: document.getElementById('feFrameworks').value,
    github: document.getElementById('feGithub').value,
    years: document.getElementById('feYears').value
  };
  localStorage.setItem('frontendDraft', JSON.stringify(data));
  const el = document.getElementById('frontendMsg'); if(el) el.textContent = 'Frontend draft saved locally.';
}

function submitFrontendApplication(e){
  e.preventDefault();
  const name = document.getElementById('feName').value.trim();
  const email = document.getElementById('feEmail').value.trim();
  const portfolio = document.getElementById('fePortfolio').value.trim();
  const frameworks = document.getElementById('feFrameworks').value.trim();
  const github = document.getElementById('feGithub').value.trim();
  const years = document.getElementById('feYears').value;
  const el = document.getElementById('frontendMsg');
  if(!name || !email || !portfolio){ if(el){ el.style.color = '#ffb4b4'; el.textContent = 'Please provide name, email, and portfolio URL.'; } return; }
  if(el){ el.style.color = '#aee6ff'; el.textContent = 'Submitting application...'; }
  setTimeout(()=>{
    // persist application in localStorage under 'applications' array
    const app = { domain: 'Front-end', name, email, portfolio, frameworks, github, years, submittedAt: new Date().toISOString() };
    const raw = localStorage.getItem('applications');
    let arr = [];
    try{ arr = raw ? JSON.parse(raw) : []; }catch(e){ arr = []; }
    arr.push(app);
    localStorage.setItem('applications', JSON.stringify(arr));
    localStorage.removeItem('frontendDraft');
    if(el) el.textContent = 'Application submitted — thank you.';
    navigateTo('home');
    showAlert('Front-end application submitted.');
  }, 900);
}

// --- Video & Media ---
function saveVideoDraft(){
  const data = {
    name: document.getElementById('vidName').value,
    email: document.getElementById('vidEmail').value,
    videoUrl: document.getElementById('vidVideoUrl').value,
    tools: document.getElementById('vidTools').value,
    duration: document.getElementById('vidDuration').value
  };
  localStorage.setItem('videoDraft', JSON.stringify(data));
  const el = document.getElementById('vidMsg'); if(el) el.textContent = 'Video draft saved locally.';
}

function submitVideoApplication(e){
  e.preventDefault();
  const name = document.getElementById('vidName').value.trim();
  const email = document.getElementById('vidEmail').value.trim();
  const videoUrl = document.getElementById('vidVideoUrl').value.trim();
  const tools = document.getElementById('vidTools').value.trim();
  const duration = document.getElementById('vidDuration').value;
  const el = document.getElementById('vidMsg');
  if(!name || !email || !videoUrl){ if(el){ el.style.color = '#ffb4b4'; el.textContent = 'Please provide name, email and video URL.';} return; }
  if(el){ el.style.color = '#aee6ff'; el.textContent = 'Submitting...'; }
  setTimeout(()=>{
    const app = { domain:'Video & Media', name, email, videoUrl, tools, duration, submittedAt:new Date().toISOString() };
    const raw = localStorage.getItem('applications'); let arr = raw?JSON.parse(raw):[]; arr.push(app); localStorage.setItem('applications', JSON.stringify(arr));
    localStorage.removeItem('videoDraft'); if(el) el.textContent = 'Submitted.';
    navigateTo('home'); showAlert('Video & Media application submitted.');
  },900);
}
function saveDataDraft(){
  const data = {
    name: document.getElementById('daName').value,
    email: document.getElementById('daEmail').value,
    notebook: document.getElementById('daNotebook').value,
    langs: document.getElementById('daLangs').value,
    years: document.getElementById('daYears').value
  };
  localStorage.setItem('dataDraft', JSON.stringify(data));
  const el = document.getElementById('daMsg'); if(el) el.textContent = 'Data draft saved locally.';
}
function submitDataApplication(e){
  e.preventDefault(); const name = document.getElementById('daName').value.trim(); const email = document.getElementById('daEmail').value.trim(); const notebook = document.getElementById('daNotebook').value.trim(); const langs = document.getElementById('daLangs').value.trim(); const years = document.getElementById('daYears').value; const el = document.getElementById('daMsg'); if(!name||!email||!notebook){ if(el){el.style.color='#ffb4b4'; el.textContent='Please provide name,email,and sample notebook.';} return;} if(el){el.style.color='#aee6ff'; el.textContent='Submitting...';} setTimeout(()=>{ const app={domain:'Data & Analytics',name,email,notebook,langs,years,submittedAt:new Date().toISOString()}; const raw=localStorage.getItem('applications'); let arr=raw?JSON.parse(raw):[]; arr.push(app); localStorage.setItem('applications',JSON.stringify(arr)); localStorage.removeItem('dataDraft'); if(el) el.textContent='Submitted.'; navigateTo('home'); showAlert('Data & Analytics application submitted.'); },900);
}

// --- DevOps ---
function saveDevopsDraft(){
  const data = { name: document.getElementById('dvName').value, email: document.getElementById('dvEmail').value, cloud: document.getElementById('dvCloud').value, cicd: document.getElementById('dvCICD').value, years: document.getElementById('dvYears').value };
  localStorage.setItem('devopsDraft', JSON.stringify(data)); const el = document.getElementById('dvMsg'); if(el) el.textContent='DevOps draft saved.';
}
function submitDevopsApplication(e){
  e.preventDefault(); const name = document.getElementById('dvName').value.trim(); const email = document.getElementById('dvEmail').value.trim(); const cloud = document.getElementById('dvCloud').value; const cicd = document.getElementById('dvCICD').value.trim(); const years = document.getElementById('dvYears').value; const el = document.getElementById('dvMsg'); if(!name||!email){ if(el){el.style.color='#ffb4b4'; el.textContent='Please provide name and email.';} return;} if(el){el.style.color='#aee6ff'; el.textContent='Submitting...';} setTimeout(()=>{ const app={domain:'DevOps',name,email,cloud,cicd,years,submittedAt:new Date().toISOString()}; const raw=localStorage.getItem('applications'); let arr=raw?JSON.parse(raw):[]; arr.push(app); localStorage.setItem('applications',JSON.stringify(arr)); localStorage.removeItem('devopsDraft'); if(el) el.textContent='Submitted.'; navigateTo('home'); showAlert('DevOps application submitted.'); },900);
}

// --- Design & UX ---
function saveDesignDraft(){
  const data = { name: document.getElementById('uxName').value, email: document.getElementById('uxEmail').value, portfolio: document.getElementById('uxPortfolio').value, tools: document.getElementById('uxTools').value, samples: document.getElementById('uxSamples').value };
  localStorage.setItem('designDraft', JSON.stringify(data)); const el = document.getElementById('uxMsg'); if(el) el.textContent='Design draft saved.';
}
function submitDesignApplication(e){
  e.preventDefault(); const name = document.getElementById('uxName').value.trim(); const email = document.getElementById('uxEmail').value.trim(); const portfolio = document.getElementById('uxPortfolio').value.trim(); const tools = document.getElementById('uxTools').value.trim(); const samples = document.getElementById('uxSamples').value.trim(); const el = document.getElementById('uxMsg'); if(!name||!email||!portfolio){ if(el){el.style.color='#ffb4b4'; el.textContent='Please provide name,email,and portfolio link.';} return;} if(el){el.style.color='#aee6ff'; el.textContent='Submitting...';} setTimeout(()=>{ const app={domain:'Design & UX',name,email,portfolio,tools,samples,submittedAt:new Date().toISOString()}; const raw=localStorage.getItem('applications'); let arr=raw?JSON.parse(raw):[]; arr.push(app); localStorage.setItem('applications',JSON.stringify(arr)); localStorage.removeItem('designDraft'); if(el) el.textContent='Submitted.'; navigateTo('home'); showAlert('Design & UX application submitted.'); },900);
}

function showFormMessage(msg, isError){
  const el = document.getElementById('formMsg');
  if(!el) return;
  el.style.color = isError ? '#ffb4b4' : '#aee6ff';
  el.textContent = msg;
}

// --- How-it-works simulation helpers ---
const _how = { xp:0, badges:[] };
function updateHowUI(note){
  const xpEl = document.getElementById('howXp');
  const badgesEl = document.getElementById('howBadges');
  const logEl = document.getElementById('howLog');
  if(xpEl) xpEl.textContent = _how.xp + ' XP';
  if(badgesEl) badgesEl.innerHTML = _how.badges.length ? _how.badges.map(b=>'<span class="badge" style="padding:6px 8px;font-weight:600">'+b+'</span>').join(' ') : '—';
  if(logEl) logEl.textContent = note || 'Activity updated.';
}

function computeBadges(xp){
  const out = [];
  if(xp >= 300) out.push('Gold');
  if(xp >= 150) out.push('Silver');
  if(xp >= 50) out.push('Bronze');
  return out;
}

function simulateSignUp(){
  _how.xp = 0;
  _how.badges = [];
  updateHowUI('Signed up — account created. No XP yet.');
  // navigate to sign-up to show the flow and prefill
  navigateTo('signup');
  try{ document.getElementById('suName').value = 'Demo User'; document.getElementById('suEmail').value = 'demo@example.com'; }catch(e){}
  showHowHub();
}

function simulateUpload(){
  // uploading doesn't award XP directly but starts the review process
  updateHowUI('Micro-project uploaded. Requesting peer reviews...');
  // Pre-fill demo form to show upload flow
  navigateTo('demo');
  try{ document.getElementById('demoTitle').value = 'Sample micro-project: Landing Page'; document.getElementById('demoAuthor').value = 'You'; document.getElementById('demoDesc').value = 'A small landing page demonstrating layout and responsiveness.'; }catch(e){}
  showHowHub();
}

function simulateApprove(){
  // simulate receiving approvals that award XP
  const gained = Math.floor(Math.random()*120) + 30; // 30..149
  _how.xp = (_how.xp || 0) + gained;
  _how.badges = computeBadges(_how.xp);
  updateHowUI('Received approval(s) — +' + gained + ' XP.');
  // On approval, add a project to the featured grid as a visual cue
  try{
    addProjectToGrid({ title: document.getElementById('demoTitle')?.value || ('Micro-project by ' + (document.getElementById('demoAuthor')?.value || 'Author')), meta: 'Verified' });
  }catch(e){}
  showHowHub();
}

// Append a project card to the featured projects grid (home)
function addProjectToGrid(project){
  const grid = document.querySelector('#projects .grid');
  if(!grid) return;
  const art = document.createElement('article'); art.className = 'project';
  const h3 = document.createElement('h3'); h3.textContent = project.title; art.appendChild(h3);
  const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = project.meta || '';
  art.appendChild(meta);
  grid.insertBefore(art, grid.firstChild);
}

function prepareValidatorFromAccount(){
  const acctRaw = localStorage.getItem('currentAccount');
  if(acctRaw){
    try{ const a = JSON.parse(acctRaw); const g = id=>document.getElementById(id); if(a.name && g('name')) g('name').value = a.name; if(a.email && g('email')) g('email').value = a.email; }catch(e){}
  }
  navigateTo('validator');
}

function resetHowSim(){
  _how.xp = 0; _how.badges = []; updateHowUI('Simulation reset.');
}

function showHowHub(){
  // Reveal interactive how-it-works options only when requested
  const how = document.getElementById('how');
  if(!how) return;
  const details = how.querySelector('.how-details');
  if(details){
    try{
      const isVisible = details.classList.contains('visible');
      if(isVisible){
        // hide
        details.classList.remove('visible');
        details.classList.add('hidden');
        details.style.display = '';
        details.setAttribute('aria-hidden','true');
        details.setAttribute('aria-expanded','false');
        updateHowUI('Interactive how-it-works hidden.');
        console.log('how: hidden');
      } else {
        // reveal: ensure display is allowed, remove hidden and then trigger visible to animate
        details.style.display = 'block';
        details.classList.remove('hidden');
        details.setAttribute('aria-hidden','false');
        details.setAttribute('aria-expanded','true');
        setTimeout(()=>{ details.classList.add('visible'); }, 30);
        updateHowUI('Interactive how-it-works revealed. Try the buttons to simulate the flow.');
        console.log('how: revealed');
      }
    }catch(err){ console.error('showHowHub error', err); details.style.display = 'block'; }
  }
  // Ensure we stay on the home page (the #how section is nested inside #home)
  navigateTo('home');
  // smooth scroll the #how section into view
  setTimeout(()=>{ const target = document.getElementById('how'); if(target && target.scrollIntoView) target.scrollIntoView({behavior:'smooth'}); }, 80);
}

// load draft if present
(function loadDraft(){
  const raw = localStorage.getItem('validatorDraft');
  if(!raw) return;
  try{
    const data = JSON.parse(raw);
    if(data.name) document.getElementById('name').value = data.name;
    if(data.email) document.getElementById('email').value = data.email;
    if(data.profileLink) document.getElementById('profileLink').value = data.profileLink;
    if(data.why) document.getElementById('why').value = data.why;
    if(data.areas && data.areas.length){
      const sel = document.getElementById('areas');
      Array.from(sel.options).forEach(opt=>{ if(data.areas.includes(opt.value)) opt.selected = true; });
    }
  }catch(e){console.warn('Failed to load draft', e)}
})();





// 🧠 DOMAIN MCQs SECTION
const mcqData = {
  "Front-end": [
    ["Which language structures web page content?", ["CSS", "HTML", "JavaScript", "SQL"], "B"],
    ["What enables dynamic updates in front-end UIs?", ["JavaScript", "SQL", "CSS", "PHP"], "A"],
    ["How can peers validate responsive design?", ["Testing on multiple devices", "Using backend tests"], "A"],
    ["What is React’s virtual DOM?", ["Lightweight UI representation", "Real DOM"], "A"],
    ["Which CSS property manages layout spacing?", ["Flexbox", "Box-shadow"], "A"],
    ["What tool helps peer review front-end code?", ["Version control", "FTP"], "A"],
    ["Why use semantic HTML?", ["Accessibility and SEO", "Faster load times"], "A"],
    ["What frontend testing tool is popular for automation?", ["Selenium", "Docker"], "A"],
    ["How do peers use version control?", ["Track changes and merge code", "Style pages"], "A"],
    ["What improves front-end peer collaboration?", ["Code reviews", "Ignoring errors"], "A"]
  ],
  "Back-end": [
    ["Popular back-end language?", ["Python", "HTML"], "A"],
    ["What is REST used for?", ["Web APIs", "UI styling"], "A"],
    ["What is the role of middleware?", ["Process requests", "Build UI"], "A"],
    ["How to validate back-end APIs?", ["Unit tests", "HTML design"], "A"],
    ["Popular version control tool?", ["Git", "SQL"], "A"],
    ["Node.js runs on which side?", ["Server", "Client"], "A"],
    ["What is ORM?", ["Object-Relational Mapping", "Open Resource Model"], "A"],
    ["What is CI/CD?", ["Automated build and deploy", "Manual deployment"], "A"],
    ["How to securely share credentials?", ["Use secrets management", "Public repos"], "A"],
    ["What tests validate back-end changes?", ["Integration tests", "HTML formatting"], "A"]
  ],
  "Full-stack": [
    ["What skills does a full-stack developer have?", ["Front-end and back-end", "UI design only"], "A"],
    ["Which stack includes MongoDB, Express, React, Node?", ["MERN", "LAMP"], "A"],
    ["How do peers validate full-stack projects?", ["Testing frontend and backend integration", "UI only"], "A"],
    ["What tool manages full-stack deployments?", ["Docker", "CSS"], "A"],
    ["What improves code quality in full-stack peer reviews?", ["Automated tests", "Skipping tests"], "A"],
    ["What does API endpoint testing cover?", ["Full-stack integration", "Front-end only"], "A"],
    ["How to handle data flow in full-stack apps?", ["State management libraries", "Static files"], "A"],
    ["What role does version control play?", ["Collaboration and rollback", "None"], "A"],
    ["What is the benefit of containerization?", ["Consistent dev environments", "Slower builds"], "A"],
    ["Peer collaboration tools include?", ["GitHub, Jira", "Photoshop only"], "A"]
  ],
  "Mobile": [
    ["Swift targets which platform?", ["iOS", "Android"], "A"],
    ["What is React Native used for?", ["Cross-platform mobile apps", "Backend APIs"], "A"],
    ["How can peers validate mobile apps?", ["Testing on devices and emulators", "Desktop only"], "A"],
    ["What is an APK?", ["Android app package", "iOS file"], "A"],
    ["Which language is Kotlin?", ["Android development", "iOS development"], "A"],
    ["How to manage mobile app state?", ["Redux, Context API", "Static files"], "A"],
    ["What tool helps peer code review for mobile?", ["GitHub", "WordPress"], "A"],
    ["What is the role of app store submission?", ["Publishing apps", "Testing apps only"], "A"],
    ["Peer feedback for UI/UX includes?", ["Usability, responsiveness", "Server status"], "A"],
    ["How do peers test mobile app security?", ["Penetration testing", "Ignore it"], "A"]
  ],
  "Video & Media": [
    ["What format is commonly used for online videos?", ["MP4", "JPG"], "A"],
    ["What is a codec?", ["Compression algorithm", "Editor tool"], "A"],
    ["How to validate video playback quality?", ["Peer playback tests", "Code review only"], "A"],
    ["Which protocol streams video?", ["HLS", "FTP"], "A"],
    ["What is transcoding?", ["Video format conversion", "Upload method"], "A"],
    ["How do peers comment on media projects?", ["Time-stamped annotations", "General texts"], "A"],
    ["Which format is best for transparent images?", ["PNG", "BMP"], "A"],
    ["What tool streams live video?", ["OBS", "Git"], "A"],
    ["How to optimize videos for web?", ["Compression", "High bitrate"], "A"],
    ["Peer review process for media includes?", ["Content, quality, format", "Only content"], "A"]
  ],
  "Data & Analytics": [
    ["What library is used for data analysis in Python?", ["Pandas", "Flask"], "A"],
    ["What is ETL?", ["Extract, transform, load", "Execute, test, log"], "A"],
    ["How to validate data pipelines?", ["Testing data accuracy", "Ignore errors"], "A"],
    ["What is SQL used for?", ["Data querying", "Styling"], "A"],
    ["What is data visualization?", ["Graphs and charts", "Data storage"], "A"],
    ["How do peers share analysis results?", ["Reports and dashboards", "Emails only"], "A"],
    ["What role do APIs have in data projects?", ["Data access", "UI building"], "A"],
    ["What is machine learning?", ["Algorithms that learn from data", "Manual coding"], "A"],
    ["How is big data processed?", ["Distributed systems", "Single computer"], "A"],
    ["Peer validation in data includes?", ["Accuracy and reproducibility", "Speed only"], "A"]
  ],
  "DevOps": [
    ["What is Kubernetes used for?", ["Container orchestration", "Code editing"], "A"],
    ["What does CI/CD mean?", ["Continuous integration / Continuous delivery", "Code initiation"], "A"],
    ["How do peers validate deployment pipelines?", ["Automated tests", "Manual builds"], "A"],
    ["What is Infrastructure as Code?", ["Managing infra with code", "Physical setup"], "A"],
    ["What tool helps version control infrastructure?", ["Terraform", "Photoshop"], "A"],
    ["How do peers ensure server security?", ["Regular patches", "Ignore risks"], "A"],
    ["What is containerization?", ["Packaging apps and dependencies", "Testing UI"], "A"],
    ["How do peers monitor systems?", ["Alerts and dashboards", "Emails only"], "A"],
    ["What is a rollback?", ["Revert to previous version", "Code review"], "A"],
    ["Peer feedback in DevOps focuses on?", ["Reliability and automation", "Color schemes"], "A"]
  ],
  "Design & UX": [
    ["What is usability?", ["Ease of use", "Code quality"], "A"],
    ["What tool helps wireframing?", ["Figma", "SQL"], "A"],
    ["How is accessibility validated?", ["Screen reader tests", "Ignore"], "A"],
    ["What is a persona?", ["User profile", "Developer"], "A"],
    ["What is user journey mapping?", ["Visualize user interactions", "Code trace"], "A"],
    ["How do peers give design feedback?", ["Annotations and comments", "Verbal only"], "A"],
    ["What principle focuses on consistency?", ["Design system", "Random layouts"], "A"],
    ["What is prototyping?", ["Interactive mockups", "Final code"], "A"],
    ["What UX research method includes interviews?", ["Qualitative research", "Automated tests"], "A"],
    ["Peer validation in UX targets?", ["User satisfaction", "Server speed"], "A"]
  ],
  "QA & Testing": [
    ["What is unit testing?", ["Testing individual components", "Testing whole system"], "A"],
    ["What tool is used for automated testing?", ["Selenium", "Photoshop"], "A"],
    ["What is a test case?", ["Step-by-step testing instructions", "Code file"], "A"],
    ["How do peers contribute to QA?", ["Writing and reviewing tests", "Ignore testing"], "A"],
    ["What is regression testing?", ["Testing after changes", "Initial testing"], "A"],
    ["What is bug tracking?", ["Recording defects", "Ignoring errors"], "A"],
    ["What is load testing?", ["Test system under heavy use", "Speed test UI"], "A"],
    ["How does CI help QA?", ["Automates tests", "Manual testing only"], "A"],
    ["What is exploratory testing?", ["Ad-hoc testing", "Scripted tests only"], "A"],
    ["Why involve peers in QA?", ["Improve test coverage and quality", "Reduce testing"], "A"]
  ],
  "Security": [
    ["What is encryption?", ["Securing data", "Deleting data"], "A"],
    ["What is a firewall?", ["Network security", "UI component"], "A"],
    ["How do peers validate security?", ["Penetration testing", "Skip testing"], "A"],
    ["What is authentication?", ["Verify user identity", "Styling"], "A"],
    ["What is authorization?", ["Grant access rights", "Interaction logs"], "A"],
    ["What is a vulnerability scan?", ["Detect security issues", "Test UI"], "A"],
    ["What is multi-factor authentication?", ["Multiple verification steps", "Single password"], "A"],
    ["How to secure APIs?", ["Token-based authentication", "Open access"], "A"],
    ["What is GDPR?", ["Data protection regulation", "Testing tool"], "A"],
    ["Peers can help in security by?", ["Reviewing code and testing", "Ignoring code"], "A"]
  ]
};

function loadMCQs(domain) {
  const container = document.getElementById("mcqContainer");
  container.innerHTML = `<h2>${domain} MCQs</h2>`;
  const data = mcqData[domain];
  if (!data) return;

  data.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "project";
    const qText = document.createElement("h3");
    qText.textContent = `${idx + 1}. ${q[0]}`;
    card.appendChild(qText);

    q[1].forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "ghost";
      btn.style.margin = "4px";
      btn.textContent = `(${String.fromCharCode(65 + i)}) ${opt}`;
      btn.onclick = () => {
        if (String.fromCharCode(65 + i) === q[2]) {
          btn.style.background = "rgba(6,182,212,0.2)";
          showAlert("✅ Correct!");
        } else {
          btn.style.background = "rgba(220,38,38,0.3)";
          showAlert(`❌ Incorrect! Correct answer: ${q[2]}`);
        }
      };
      card.appendChild(btn);
    });
    container.appendChild(card);
  });
}


function loadMCQs(domain) {
  const container = document.getElementById("mcqContainer");
  container.innerHTML = `<h2>${domain} MCQs</h2>`;
  const data = mcqData[domain];
  if (!data) return;

  let score = 0;
  let answered = 0;

  data.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "project";
    const qText = document.createElement("h3");
    qText.textContent = `${idx + 1}. ${q[0]}`;
    card.appendChild(qText);

    q[1].forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "ghost";
      btn.style.margin = "4px";
      btn.textContent = `(${String.fromCharCode(65 + i)}) ${opt}`;

      btn.onclick = () => {
        if (btn.disabled) return; // prevent multiple answers
        answered++;
        const correct = String.fromCharCode(65 + i) === q[2];
        if (correct) {
          btn.style.background = "rgba(6,182,212,0.25)";
          score++;
        } else {
          btn.style.background = "rgba(220,38,38,0.25)";
        }
        // disable all buttons for this question
        const siblings = card.querySelectorAll("button");
        siblings.forEach(b => b.disabled = true);
        // update score display
        const scoreDiv = document.getElementById("scoreDisplay");
        if (scoreDiv)
          scoreDiv.textContent = `Progress: ${answered}/${data.length} • Score: ${score}`;
        // show final result if all answered
        if (answered === data.length) {
          showAlert(`✅ Quiz complete! You scored ${score} / ${data.length}`);
          if (scoreDiv)
            scoreDiv.textContent = `✅ Completed! Final Score: ${score} / ${data.length}`;
        }
      };
      card.appendChild(btn);
    });
    container.appendChild(card);
  });

  // Score tracker UI
  const scoreBox = document.createElement("div");
  scoreBox.id = "scoreDisplay";
  scoreBox.className = "muted small";
  scoreBox.style.marginTop = "16px";
  scoreBox.textContent = `Progress: 0/${data.length} • Score: 0`;
  container.appendChild(scoreBox);
}
