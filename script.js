
const order = ['home', 'about', 'events', 'schedule', 'contact'];

let index = 0;

const container = document.getElementById('pagesContainer');
const pages = document.querySelectorAll('.page');
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const count = document.getElementById('count');


// HORIZONTAL PAGE NAVIGATION

function go(name) {

    const newIndex = order.indexOf(name);

    if (newIndex < 0) return;

    index = newIndex;

    const targetPage = document.getElementById(name);

    container.scrollTo({
        left: targetPage.offsetLeft - container.offsetLeft,
        behavior: 'smooth'
    });

    updateNavigation(name);

}


// UPDATE MENU, DOTS AND PAGE COUNTER

function updateNavigation(name) {

    document.querySelectorAll('[data-page]').forEach(button => {

        button.classList.toggle(
            'active',
            button.dataset.page === name
        );

    });


    document.querySelectorAll('.dots button').forEach(button => {

        button.classList.toggle(
            'selected',
            button.dataset.page === name
        );

    });


    count.textContent =
        `PAGE ${String(index + 1).padStart(2, '0')} / 05`;

    nav.classList.remove('open');

    menu.textContent = '☰';

}


// TOP MENU AND NAVIGATION DOTS

document.querySelectorAll('[data-page]').forEach(button => {

    button.addEventListener('click', () => {

        go(button.dataset.page);

    });

});


// MOBILE MENU BUTTON

menu.addEventListener('click', () => {

    nav.classList.toggle('open');

    menu.textContent =
        nav.classList.contains('open') ? '✕' : '☰';

});


// UPDATE PAGE COUNTER WHEN SCROLLING MANUALLY

let scrollTimer;

container.addEventListener('scroll', () => {

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {

        const containerWidth = container.clientWidth;

        const newIndex = Math.round(
            container.scrollLeft / containerWidth
        );

        if (newIndex >= 0 && newIndex < order.length) {

            index = newIndex;

            updateNavigation(order[index]);

        }

    }, 100);

});


// PHONE SWIPE SUPPORT

let touchStartX = 0;
let touchEndX = 0;

container.addEventListener('touchstart', event => {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });


container.addEventListener('touchend', event => {

    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0 && index < order.length - 1) {

        go(order[index + 1]);

    }

    else if (difference < 0 && index > 0) {

        go(order[index - 1]);

    }

}, { passive: true });


// MOUSE WHEEL HORIZONTAL NAVIGATION

container.addEventListener('wheel', event => {

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {

        event.preventDefault();

        container.scrollLeft += event.deltaY;

    }

}, { passive: false });


// REGISTRATION AND WHATSAPP LINKS

const links = {

    xwarfareRegistration: 'PASTE_X_WARFARE_REGISTRATION_LINK',

    xwarfareWhatsApp: 'PASTE_X_WARFARE_WHATSAPP_LINK',

    xpressionRegistration: 'PASTE_XPRESSION_REGISTRATION_LINK',

    xpressionWhatsApp: 'PASTE_XPRESSION_WHATSAPP_LINK',

    lastSuspectRegistration: 'PASTE_LAST_SUSPECT_REGISTRATION_LINK',

    lastSuspectWhatsApp: 'PASTE_LAST_SUSPECT_WHATSAPP_LINK'

};


const qrs = {

    xwarfareQR: '',

    xpressionQR: '',

    lastSuspectQR: ''

};


// ADD LINKS TO EVENT BUTTONS

document.querySelectorAll('[data-link]').forEach(link => {

    const url = links[link.dataset.link];

    if (url && !url.startsWith('PASTE_')) {

        link.href = url;

        link.target = '_blank';

        link.rel = 'noopener noreferrer';

    } else {

        link.addEventListener('click', event => {

            event.preventDefault();

            alert('This event link will be added soon.');

        });

    }

});


// ADD WHATSAPP QR CODES

document.querySelectorAll('[data-qr]').forEach(element => {

    const source = qrs[element.dataset.qr];

    if (source) {

        const image = document.createElement('img');

        image.src = source;

        image.alt = 'WhatsApp QR code';

        element.replaceWith(image);

    }

});


// SET INITIAL PAGE

go('home');


// KEEP NAVIGATION CORRECT WHEN WINDOW RESIZES

window.addEventListener('resize', () => {

    go(order[index]);

});
