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


// Expandable global child statistics and selectable topic details.
const globalStatsToggle=document.querySelector('#globalStatsToggle');
const globalStatsPanel=document.querySelector('#globalStatsPanel');
if(globalStatsToggle&&globalStatsPanel){
  globalStatsToggle.addEventListener('click',()=>{
    const opening=globalStatsPanel.hidden;
    globalStatsPanel.hidden=!opening;
    globalStatsToggle.setAttribute('aria-expanded',String(opening));
    globalStatsToggle.innerHTML=opening?'Close statistics <span aria-hidden="true">↑</span>':'Explore the statistics <span aria-hidden="true">↓</span>';
  });
}
const globalStatData={
  poverty:{
    title:'586 million children',
    description:'Children under 18 experiencing multidimensional poverty, including deprivation in areas such as housing, sanitation, nutrition, and education.',
    source:'Source: UNDP Global MPI 2025 ↗',
    url:'https://hdr.undp.org/content/2025-global-multidimensional-poverty-index-mpi'
  },
  school:{
    title:'273 million children and young people',
    description:'An estimated 273 million children and young people worldwide were out of school in 2024.',
    source:'Source: UNESCO global education estimates ↗',
    url:'https://www.unesco.org/en/articles/one-seven-children-and-young-people-still-out-school-unesco-report'
  },
  food:{
    title:'181 million children under five',
    description:'Children experiencing severe child food poverty, meaning they lack access to a sufficiently diverse and nutritious diet.',
    source:'Source: UNICEF, Child Food Poverty report, 2024 ↗',
    url:'https://www.unicef.org/reports/child-food-poverty'
  }
};
document.querySelectorAll('.global-stat-option').forEach(option=>{
  option.addEventListener('click',()=>{
    const data=globalStatData[option.dataset.globalStat];
    if(!data)return;
    document.querySelectorAll('.global-stat-option').forEach(item=>{
      const active=item===option;
      item.classList.toggle('is-active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    const title=document.querySelector('#globalStatTitle');
    const description=document.querySelector('#globalStatDescription');
    const source=document.querySelector('#globalStatSource');
    if(title)title.textContent=data.title;
    if(description)description.textContent=data.description;
    if(source){source.textContent=data.source;source.href=data.url;}
  });
});
