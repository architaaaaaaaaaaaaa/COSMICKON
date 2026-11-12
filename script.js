const order=['home','about','events','schedule','contact'];let index=0;
function go(name){const n=order.indexOf(name);if(n<0)return;index=n;
document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===name));
document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===name));
document.querySelectorAll('.dots button').forEach(x=>x.classList.toggle('selected',x.dataset.page===name));
document.getElementById('count').textContent=`PAGE ${String(index+1).padStart(2,'0')} / 05`;
document.getElementById('prev').disabled=index===0;document.getElementById('next').disabled=index===4;
document.getElementById('nav').classList.remove('open');document.getElementById('menu').textContent='☰';}
document.querySelectorAll('[data-page]').forEach(x=>x.addEventListener('click',()=>go(x.dataset.page)));
document.getElementById('prev').onclick=()=>index>0&&go(order[index-1]);
document.getElementById('next').onclick=()=>index<4&&go(order[index+1]);
document.getElementById('menu').onclick=()=>{const n=document.getElementById('nav');n.classList.toggle('open');document.getElementById('menu').textContent=n.classList.contains('open')?'✕':'☰';};
const links={xwarfareRegistration:'PASTE_X_WARFARE_REGISTRATION_LINK',xwarfareWhatsApp:'PASTE_X_WARFARE_WHATSAPP_LINK',xpressionRegistration:'PASTE_XPRESSION_REGISTRATION_LINK',xpressionWhatsApp:'PASTE_XPRESSION_WHATSAPP_LINK',lastSuspectRegistration:'PASTE_LAST_SUSPECT_REGISTRATION_LINK',lastSuspectWhatsApp:'PASTE_LAST_SUSPECT_WHATSAPP_LINK'};
const qrs={xwarfareQR:'',xpressionQR:'',lastSuspectQR:''};
document.querySelectorAll('[data-link]').forEach(a=>{const u=links[a.dataset.link];if(u&&!u.startsWith('PASTE_')){a.href=u;a.target='_blank';a.rel='noopener noreferrer';}else a.onclick=e=>{e.preventDefault();alert('This event link will be added soon.');};});
document.querySelectorAll('[data-qr]').forEach(el=>{const src=qrs[el.dataset.qr];if(src){const img=document.createElement('img');img.src=src;img.alt='WhatsApp QR code';el.replaceWith(img);}});
go('home');