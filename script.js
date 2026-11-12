const order = ['home', 'about', 'events', 'schedule', 'contact'];
let index = 0;

const container = document.getElementById('pagesContainer');
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const count = document.getElementById('count');

function updateNavigation(name) {
    document.querySelectorAll('nav [data-page]').forEach(button => {
        button.classList.toggle('active', button.dataset.page === name);
    });
    if (count) count.textContent = `PAGE ${String(index + 1).padStart(2, '0')} / 05`;
    if (nav) nav.classList.remove('open');
    if (menu) menu.textContent = '☰';
}

function go(name) {
    const newIndex = order.indexOf(name);
    if (newIndex < 0 || !container) return;
    index = newIndex;
    container.scrollTo({ left: index * container.clientWidth, behavior: 'smooth' });
    updateNavigation(name);
}

// Header navigation and the home-page call-to-action.
document.querySelectorAll('nav [data-page], .logo[data-page], .copy [data-page]').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        go(button.dataset.page);
    });
});

if (menu && nav) {
    menu.addEventListener('click', () => {
        nav.classList.toggle('open');
        menu.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
}

// Update the page counter after a manual horizontal swipe/scroll.
let scrollTimer;
if (container) {
    container.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const width = container.clientWidth || 1;
            const nextIndex = Math.max(0, Math.min(order.length - 1, Math.round(container.scrollLeft / width)));
            index = nextIndex;
            updateNavigation(order[index]);
        }, 90);
    }, { passive: true });

    // Convert a vertical mouse wheel gesture into horizontal page movement.
    container.addEventListener('wheel', event => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            container.scrollLeft += event.deltaY;
        }
    }, { passive: false });
}

// About-page event blocks open the Explore Events page and focus the chosen event.
document.querySelectorAll('[data-event-target]').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.eventTarget;
        go('events');
        window.setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                target.classList.add('event-highlight');
                window.setTimeout(() => target.classList.remove('event-highlight'), 1400);
            }
        }, 450);
    });
});

// Replace these placeholders with the actual Google Form and WhatsApp invite URLs.
const links = {
    xwarfareRegistration: 'https://forms.gle/7cXj7M76yuXrhgdK6',
    xwarfareWhatsApp: 'https://chat.whatsapp.com/EE0NamGqUjBA2yoWl1MRDF',
    xpressionRegistration: 'https://forms.gle/7v9A2B4HCWA2hjJr5',
    xpressionWhatsApp: 'https://chat.whatsapp.com/CFV1Yj3yEjgGSwikFgeEmt',
    lastSuspectRegistration: 'https://forms.gle/ML8yXiGJ9R3BZkTX7',
    lastSuspectWhatsApp: 'https://chat.whatsapp.com/F1YqAMuGJxY2NrvCGcJO6D'
};

const qrs = {
    xwarfareQR: '',
    xpressionQR: '',
    lastSuspectQR: ''
};

document.querySelectorAll('[data-link]').forEach(link => {
    const url = links[link.dataset.link];
    if (url && !url.startsWith('PASTE_')) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    } else {
        link.href = '#';
        link.addEventListener('click', event => {
            event.preventDefault();
            alert('The organiser will add this registration or WhatsApp link soon.');
        });
    }
});

document.querySelectorAll('[data-qr]').forEach(element => {
    const source = qrs[element.dataset.qr];
    if (source) {
        const image = document.createElement('img');
        image.src = source;
        image.alt = 'WhatsApp group QR code';
        element.replaceWith(image);
    }
});

// Start on Home and keep the current page aligned after resizing.
go('home');
window.addEventListener('resize', () => {
    if (container) container.scrollTo({ left: index * container.clientWidth, behavior: 'auto' });
});
