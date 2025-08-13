
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
    const roles = ['UI/UX Designer','Web Designer','Web Developer'];
    const rolesEl = document.getElementById('roles');
    let ri=0, ci=0, del=false;
    function tick(){
      const word = roles[ri];
      rolesEl.textContent = (del ? word.slice(0,ci--) : word.slice(0,ci++));
      if(!del && ci>word.length+5){del=true}
      if(del && ci<0){del=false; ri=(ri+1)%roles.length}
      setTimeout(tick, del?70:100);
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
    const nums = document.querySelectorAll('.num');
    const ob3 = new IntersectionObserver((es)=>{
      es.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target; const target=+el.dataset.count; let cur=0; const step=Math.ceil(target/60);
          const it=setInterval(()=>{cur+=step; if(cur>=target){cur=target; clearInterval(it)} el.textContent=cur}, 20);
          ob3.unobserve(el);
        }
      })
    },{threshold:.5});
    nums.forEach(n=>ob3.observe(n));

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
