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
