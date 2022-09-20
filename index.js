const navItems = document.querySelectorAll('.nav-link');
const form = document.querySelector('.form');

const TOKEN = config.TOKEN;
const ID = config.ID;

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(elem => {
            elem.classList.remove('active')
        })
        item.classList.add('active');
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        "Name": form.name.value,
        "Email": form.email.value,
        "Phone": form.phone.value,
        "Message": form.message.value
    }

    const entries = Object.entries(data);
    const values = entries.map(value => `<b>${value[0]}</b>: ${value[1]}`)
    const message = values.join('%0A');

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ID}&parse_mode=html&text=${message}`);

    form.reset();
})

window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    if (window.innerWidth > 1000) {
        document.querySelectorAll('.section').forEach((item, i) => {
            if (item.offsetTop - document.querySelector('.nav').clientHeight <= scrollDistance) {
                document.querySelectorAll('.nav a').forEach((item) => {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });

                document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('active');
            }
        });
    }
});

//animations

AOS.init({
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
