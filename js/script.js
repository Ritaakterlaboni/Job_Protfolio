
    // Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobile = document.getElementById('mobileNav');
    if(menuBtn){
      menuBtn.addEventListener('click',()=>{
         if (window.innerWidth < 1024) { // শুধু mobile/tablet এ কাজ করবে
      mobile.style.display = mobile.style.display === 'block' ? 'none' : 'block';
    }
      });
    }

    // Active link on scroll
    const links = [...document.querySelectorAll('header nav a')];
    const ids = links.map(a => a.getAttribute('href')).filter(Boolean);
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        const id = '#' + e.target.id;
        links.forEach(a=> a.classList.toggle('active', a.getAttribute('href')===id && e.isIntersecting));
      })
    }, {rootMargin:'-40% 0px -55% 0px', threshold:0});
    ids.forEach(id=>{const el=document.querySelector(id); if(el) obs.observe(el)});

    // Typewriter roles
const roles = [
  "HTML Developer",
  "CSS Stylist",
  "JavaScript Coder",
  "Bootstrap Expert",
  "Tailwind Designer",
  "React Developer",
];
const rolesEl = document.getElementById("roles");

let ri = 0; // role index
let ci = 0; // char index
let del = false; // deleting?

function tick() {
  const word = roles[ri];

  if (!del) {
    // typing phase
    rolesEl.textContent = word.slice(0, ci);
    ci++;

    if (ci > word.length) {
      del = true; // start deleting
      setTimeout(tick, 800); // full-word pause
      return;
    }

    setTimeout(tick, 100);
  } else {
    // deleting phase
    rolesEl.textContent = word.slice(0, ci);
    ci--;

    if (ci < 0) {
      del = false; // move to next word
      ri = (ri + 1) % roles.length;
      ci = 0; // IMPORTANT: reset to 0 to avoid flash
      setTimeout(tick, 150); // small pause before typing next
      return;
    }

    setTimeout(tick, 70);
  }
}

tick();




    

    // Skill bars animate on view
    const bars = document.querySelectorAll('.bar');
    const ob2 = new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.style.width = e.target.dataset.val+'%'; } });
    },{threshold:.5});
    bars.forEach(b=>ob2.observe(b));

    // Portfolio filtering
    const chips = document.querySelectorAll('.chip');
    const works = document.querySelectorAll('.work');
    chips.forEach(ch=> ch.addEventListener('click',()=>{
      chips.forEach(c=>c.classList.remove('active')); ch.classList.add('active');
      const f = ch.dataset.filter;
      works.forEach(w=>{ w.style.display = (f==='all'|| w.dataset.cat===f) ? 'block' : 'none'; });
    }));

   
// Facts counter
const nums = document.querySelectorAll(".num");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 2000; // 2 second animation
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / target), 20);

      const counter = setInterval(() => {
        start++;
        el.textContent = start;
        if (start >= target) {
          el.textContent = target;
          clearInterval(counter);
        }
      }, stepTime);

      obs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

nums.forEach(num => observer.observe(num));
    // Simple testimonials auto-rotate
    const t = document.getElementById('testi');
    let tIndex=0; setInterval(()=>{
      const items = t.querySelectorAll('.quote');
      items.forEach((x,i)=> x.style.display = (Math.floor(i/2)===tIndex)? 'block':'none');
      tIndex = (tIndex + 1) % Math.ceil(items.length/2);
    }, 3500);

    // Contact form validation (no backend)
    const f = document.getElementById('contactForm');
    const msg = document.getElementById('formMsg');
    f.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name=f.name?.value || document.getElementById('name').value;
      const email=f.email?.value || document.getElementById('email').value;
      const subject=document.getElementById('subject').value;
      const message=document.getElementById('message').value;
      if(!name || !email || !subject || !message){ msg.textContent='Please fill in all fields.'; return; }
      const ok = /.+@.+\..+/.test(email);
      if(!ok){ msg.textContent='Please provide a valid email address.'; return; }
      msg.textContent='Thanks! Your message has been prepared (demo only).';
      f.reset();
    });

    // Color switcher
    document.querySelectorAll('.sw').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const t=btn.dataset.theme;
        if(t==='pink'){ document.documentElement.style.setProperty('--brand','#ff7eb3'); document.documentElement.style.setProperty('--brand-2','#ffd1e5'); }
        if(t==='blue'){ document.documentElement.style.setProperty('--brand','#5b8cff'); document.documentElement.style.setProperty('--brand-2','#7aeea8'); }
        if(t==='mint'){ document.documentElement.style.setProperty('--brand','#7aeea8'); document.documentElement.style.setProperty('--brand-2','#5b8cff'); }
      })
    })
