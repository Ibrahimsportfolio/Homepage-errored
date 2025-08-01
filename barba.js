
  barba.init({
    transitions: [
      // Home <-> About Fade
      {
        name: 'home-about-fade',
        from: { namespace: ['home', 'about'] },
        to: { namespace: ['about', 'home'] },
        async leave(data) {
          await showLoader();
          await gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.4
          });
        },
        async enter(data) {
          await gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.4
          });
          await hideLoader();
        }
      },

      // Home <-> Services Slide Up
      {
        name: 'home-services-slide',
        from: { namespace: ['home', 'services'] },
        to: { namespace: ['services', 'home'] },
        async leave(data) {
          await showLoader();
          await gsap.to(data.current.container, {
            y: 100,
            opacity: 0,
            duration: 0.4
          });
        },
        async enter(data) {
          await gsap.from(data.next.container, {
            y: -100,
            opacity: 0,
            duration: 0.4
          });
          await hideLoader();
        }
      },

      // About <-> Services Slide Horizontal
      {
        name: 'about-services-slide',
        from: { namespace: ['about', 'services'] },
        to: { namespace: ['services', 'about'] },
        async leave(data) {
          await showLoader();
          await gsap.to(data.current.container, {
            x: -100,
            opacity: 0,
            duration: 0.4
          });
        },
        async enter(data) {
          await gsap.from(data.next.container, {
            x: 100,
            opacity: 0,
            duration: 0.4
          });
          await hideLoader();
        }
      },

      // Default fallback
      {
        name: 'default',
        async leave(data) {
          await showLoader();
          await gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.4
          });
        },
        async enter(data) {
          await gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.4
          });
          await hideLoader();
        }
      }
    ]
  });

  // Page-specific animations after enter
  barba.hooks.afterEnter((data) => {
    const ns = data.next.namespace;
    window.scrollTo(0, 0);

    if (ns === 'home') homeEnter();
    else if (ns === 'about') aboutEnter();
    else if (ns === 'services') servicesEnter();
  });

  // Loader functions
  function showLoader() {
    return gsap.fromTo(".loader", { y: '100%' }, { y: '0%', duration: 0.4 });
  }

  function hideLoader() {
    return gsap.to(".loader", { y: '-100%', duration: 0.4 });
  }

 