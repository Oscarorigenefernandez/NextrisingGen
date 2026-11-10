const menu=document.querySelector('.menu');
const nav=document.querySelector('#nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));
}
const year=document.querySelector('#year');
if(year) year.textContent=new Date().getFullYear();

// Reveal sections and cards as visitors scroll, without blocking content.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion && 'IntersectionObserver' in window){
  const revealTargets=document.querySelectorAll(
    '.two-col,.founder-grid,.mission .wrap,.impact-heading,.stat-card,.impact-note,.section-head,.program-card,.feature-grid,.value-grid article,.involved-grid,.contact-grid'
  );
  revealTargets.forEach((el,index)=>{
    el.classList.add('reveal');
    if(el.matches('.stat-card,.program-card,.value-grid article')) {
      el.classList.add('reveal-delay-'+((index%3)+1));
    }
  });
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach(el=>observer.observe(el));
}
