function setupMenu() {
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('menu');
        const links = document.querySelectorAll('.menu-links a');
        const menuLinks = document.getElementById('menuLinks');
        let isOpen = false;

        hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          menu.classList.toggle('active');

          if (!isOpen) {
            gsap.fromTo(links, {
              opacity: 0,
              y: 50
            }, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power3.out",
              delay: 0.2
            });
            gsap.from(".menu-img1", {
              y: -100,
              duration: 0.5,
              delay: 0.2,
            });
            gsap.from(".menu-img2", {
              y: 100,
              duration: 0.5,
              delay: 0.2,
            });
            gsap.to(menuLinks, { opacity: 1, duration: 0.4 });
            isOpen = true;
          } else {
            gsap.to(menuLinks, { opacity: 0, duration: 0.2 });
            isOpen = false;
          }
        });
      }

      function setupFooterAnimations() {
  

  gsap.from(".footer__links li, .footer__contact div", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer__container",
      start: "top 90%",
    },
  });
}
