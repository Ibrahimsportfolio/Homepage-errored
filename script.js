

// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);









     const swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
    },
  });


// Store animation timelines to kill them when needed
let animationTimelines = {};

// Preloader animation
function animatePreloader() {
  const loadingBar = document.querySelector('.loading-bar');
  const splitTop = document.querySelector('.split-panel.split-top');
  const splitBottom = document.querySelector('.split-panel.split-bottom');
  
  const tl = gsap.timeline();
  
  tl.to(loadingBar, {
    scaleX: 1,
    duration: 2,
     width: "100%",
    ease: 'power3.inOut'
  })
  .to(splitTop, {
    y: '-100%',
    duration: 1,
    ease: 'power3.inOut',
    delay: 0.5
  }, '-=0.5')
  .to(splitBottom, {
    y: '100%',
    duration: 1,
    ease: 'power3.inOut',
    delay: 0,
  }, '-=1')
  .to('.preloader', {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.querySelector('.preloader').style.display = 'none';
    }
    
  });
  const interval = setInterval(() => {
  if (loadingBar.style.width === '100%') {
    loadingBar.style.transition = 'opacity 0.3s ease';
    loadingBar.style.opacity = '0';
    clearInterval(interval); // stop checking
  }
}, 0.1); 
  return tl;
}

// Menu functionality
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
function pinsection(){
// Animate left content elements in sequence
            const leftElements = gsap.utils.toArray(".who-we-help-left > *");
            
            leftElements.forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".who-we-help-section",
                        start: `top+=${i * 15}% center`,
                        end: `top+=${(i + 1) * 15}% center`,
                        toggleActions: "play none none none",
                        markers: false
                    }
                });
            });
            
            // Pin the left part and make right part scroll
            ScrollTrigger.create({
                trigger: ".who-we-help-section",
                pin: ".who-we-help-left",
                start: "top top",
                end: "bottom 80%",
                endTrigger: ".who-we-help-content",
                scrub: true,
                markers: false
            });
            
            // Animate right categories as they come into view
            const helpCategories = gsap.utils.toArray(".help-category");
            
            helpCategories.forEach((category, i) => {
                gsap.to(category, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1)",
                    scrollTrigger: {
                        trigger: category,
                        start: "top 80%",
                        end: "top 30%",
                        toggleActions: "play none none none",
                        markers: false
                    }
                });
            });
}

// Setup slider functionality
function setupSlider() {
  const slides = document.querySelectorAll('.slide');
  const bullets = document.querySelectorAll('.bullet');

  bullets.forEach((bullet, i) => {
    bullet.addEventListener('click', () => {
      slides.forEach(s => s.classList.remove('active'));
      bullets.forEach(b => b.classList.remove('active'));

      slides[i].classList.add('active');
      bullet.classList.add('active');
    });
  });
}

// Setup hero animations
function setupHeroAnimations() {
  // Floating astronaut animation
  animationTimelines.astronaut = gsap.to(".astronaut", {
    y: -30,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });

  // Fade-in + slide for heading
  animationTimelines.headline = gsap.from("#headline", {
    opacity: 0,
    x: -100,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out"
  });

  // Fade-in + slide for paragraph
  animationTimelines.paragraph = gsap.from("#paragraph", {
    opacity: 0,
    x: -100,
    duration: 1.5,
    delay: 1,
    ease: "power3.out"
  });
}

// Setup about section animations
function setupAboutAnimations() {
  gsap.from(".left-image", {
    x: -60,
    opacity: 0,
    duration: 1
  });

  gsap.from(".experience", {
    delay: 0.5,
    opacity: 0,
    y: 30,
    duration: 1
  });

  gsap.from(".image-art", {
    scrollTrigger: {
      trigger: ".image-art",
      start: "top 80%",
    },
    x: -60,
    opacity: 0,
    duration: 1
  });

  gsap.from(".text-content p, .cta", {
    scrollTrigger: {
      trigger: ".text-content",
      start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2
  });

  // Split text into characters
  const splitText = new SplitType('#scrollText', { types: 'chars' });

  // Animate each letter color on scroll
  gsap.fromTo(splitText.chars,
    { color: "#555" },
    {
      color: "#fff",
      stagger: 0.03,
      scrollTrigger: {
        trigger: "#scrollText",
        start: "top 70%",
        end: "bottom 30%",
        scrub: true
      }
    });
}

// Setup horizontal section animation
function setupHorizontalSection() {
  
 const tagline = document.querySelector(".tagline");
    const section = document.querySelector(".horizontal-section");
    const container = document.querySelector(".horizontal-container");

    // Set section width based on the width of the tagline
    const taglineWidth = tagline.scrollWidth;
    section.style.width = taglineWidth + 'px';

    // ScrollTrigger end based on width of the tagline minus viewport
    const scrollDistance = taglineWidth - window.innerWidth;

    gsap.to(section, {
      x: -scrollDistance,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: true,
        markers: false
      }
    });

    gsap.fromTo(".circle", { x: 0 }, {
      x: scrollDistance * 0.3,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: true
      }
    });

    gsap.to(".line2", {
      scaleX: 1,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 30%",
        scrub: 1
      }
    });

}

// Setup service cards animations
function setupServiceCards() {
  const cards = document.querySelectorAll('.split-service-card');

  gsap.from(cards, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.2
  });

  cards.forEach(card => {
    const icon = card.querySelector('.split-card-icon');
    const title = card.querySelector('.split-card-title');
    const text = card.querySelector('.split-card-text');
    const link = card.querySelector('.split-learn-more');
    const arrow = card.querySelector('.split-learn-more i');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
      gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(1.7)" });
      gsap.to(title, { color: '#ffffff', x: 5, duration: 0.3 });
      gsap.to(text, { color: 'rgba(255, 255, 255, 0.9)', x: 5, duration: 0.3 });
      gsap.to(link, { color: '#ffffff', x: 5, duration: 0.3 });
      gsap.to(arrow, { x: 5, duration: 0.3 });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(1.7)" });
      gsap.to(title, { color: '#2c3e50', x: 0, duration: 0.3 });
      gsap.to(text, { color: '#7f8c8d', x: 0, duration: 0.3 });
      gsap.to(link, { color: '#000', x: 0, duration: 0.3 });
      gsap.to(arrow, { x: 0, duration: 0.3 });
    });
  });
}

// Setup footer animations
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

// Setup contact section animations
function setupContactAnimations() {
  gsap.from(".contact-text, .contact-form", {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%",
    }
  });

  gsap.to(".background-icon", {
    rotate: 360,
    scale: 1.1,
    duration: 3,
    ease: "none",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}



function other(){

// GSAP animations timeline
const tl = gsap.timeline();

// Animate static elements first
tl.from('.section-subtitle', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    ease: "back.out(1.7)"
})
.from('.section-title', {
    duration: 0.8,
    y: -30,
    opacity: 0,
    ease: "back.out(1.7)"
}, "-=0.4")
.from('.section-description', {
    duration: 0.8,
    y: -20,
    opacity: 0,
    ease: "power2.out"
}, "-=0.3")
.from('.benefit-item', {
    duration: 0.6,
    x: -20,
    opacity: 0,
    stagger: 0.15,
    ease: "power2.out"
}, "-=0.2")
.from('.cta-button', {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "back.out(1.7)"
}, "-=0.2");

// Animate only visible swiper slides after slight delay
gsap.delayedCall(1, () => {
    const visibleSlides = document.querySelectorAll('.swiper-slide-active, .swiper-slide-next, .swiper-slide-prev');
    gsap.from(visibleSlides, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)"
    });
});
















              const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            const trail = document.querySelector('.cursor-trail');
            const hero = document.querySelector('.hero');
            
            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;
            let trailX = 0, trailY = 0;
            let isInHero = false;
            let trailParticles = [];
            const trailLength = 10;
            
            // Initialize trail particles
            for (let i = 0; i < trailLength; i++) {
                let particle = document.createElement('div');
                particle.className = 'cursor-trail';
                document.body.appendChild(particle);
                trailParticles.push({
                    element: particle,
                    x: 0,
                    y: 0,
                    delay: i * 0.03,
                    opacity: 1 - (i * 0.08)
                });
            }
            
            // Mouse move event
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                // Check if in hero section
                const heroRect = hero.getBoundingClientRect();
                isInHero = (
                    mouseX >= heroRect.left && 
                    mouseX <= heroRect.right && 
                    mouseY >= heroRect.top && 
                    mouseY <= heroRect.bottom
                );
                
                // Update cursor position
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
                
                // Only show effect in hero section
                if (isInHero) {
                    follower.style.opacity = '1';
                    follower.style.width = '40px';
                    follower.style.height = '40px';
                } else {
                    follower.style.opacity = '0';
                    follower.style.width = '0px';
                    follower.style.height = '0px';
                }
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                // Smooth follower movement
                followerX += (mouseX - followerX) * 0.2;
                followerY += (mouseY - followerY) * 0.2;
                
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
                
                // Trail effect only in hero section
                if (isInHero) {
                    // Update trail particles
                    trailParticles.forEach((particle, i) => {
                        setTimeout(() => {
                            particle.x += (mouseX - particle.x) * (0.1 + i * 0.01);
                            particle.y += (mouseY - particle.y) * (0.1 + i * 0.01);
                            
                            particle.element.style.left = particle.x + 'px';
                            particle.element.style.top = particle.y + 'px';
                            particle.element.style.opacity = particle.opacity;
                        }, i * 10);
                    });
                } else {
                    trailParticles.forEach(particle => {
                        particle.element.style.opacity = '0';
                    });
                }
            }
            
            // Hover effects
            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                    follower.style.transform = 'translate(-50%, -50%) scale(0.5)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    follower.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
            
            animate();




 const categories = [
      { name: 'Web', image: 'https://via.placeholder.com/80x160' },
      { name: 'App', image: 'https://via.placeholder.com/80x160' },
      { name: 'Design', image: 'https://via.placeholder.com/80x160' },
      { name: 'AI', image: 'https://via.placeholder.com/80x160' },
      { name: 'Branding', image: 'https://via.placeholder.com/80x160' },
      { name: 'funnel', image: 'https://via.placeholder.com/80x160' },
      { name: 'Other', image: 'https://via.placeholder.com/80x160' },
    ];

    const works = {
      Web: [
        { title: 'Website 1', img: 'https://via.placeholder.com/600x300', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'Website 2', img: 'https://via.placeholder.com/600x300', tags: ['React', 'API', 'UI'] },
        { title: 'Website 3', img: 'https://via.placeholder.com/600x300', tags: ['Animation', 'JS', 'Modern'] },
      ],
      App:[
        { title: 'HEADINGS TAB 2', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'HEADINGS TAB 2', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['React', 'API', 'UI'] },
        { title: 'HEADINGS TAB 2', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['Animation', 'JS', 'Modern'] },
      ],
      Design: [
        { title: 'HEADINGS TAB 3', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'HEADINGS TAB 3', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['React', 'API', 'UI'] },
        { title: 'HEADINGS TAB 3', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['Animation', 'JS', 'Modern'] },
      ],
      AI: [
        { title: 'HEADINGS TAB 4', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'HEADINGS TAB 4', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['React', 'API', 'UI'] },
        { title: 'HEADINGS TAB 4', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['Animation', 'JS', 'Modern'] },
      ],
      Branding: [
        { title: 'Website 5', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'Website 5', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['React', 'API', 'UI'] },
        { title: 'Website 5', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['Animation', 'JS', 'Modern'] },
      ],
      Other: [
        { title: 'Website 6', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'Website 6', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['React', 'API', 'UI'] },
        { title: 'Website 6', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['Animation', 'JS', 'Modern'] },
      ],
      funnel: [
        { title: 'Website 7', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['HTML', 'CSS', 'GSAP'] },
        { title: 'Website 7', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['React', 'API', 'UI'] },
        { title: 'Website 7', img: 'https://tse4.mm.bing.net/th/id/OIP.cgrJbdHSEJY3c54z2j0TggHaEw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', tags: ['Animation', 'JS', 'Modern'] },
      ],
      
    };

    const categoryContainer = document.getElementById('categories');
    const mainCards = document.getElementById('main-cards');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');

    categories.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `<img src="${cat.image}"/><div class="category-name">${cat.name}</div>`;
      card.onclick = () => renderWorks(cat.name);
      categoryContainer.appendChild(card);
    });

    function renderWorks(category) {
      mainCards.innerHTML = '';
      const items = works[category] || [];
      items.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'work-card';
        card.innerHTML = `
          <img src="${item.img}" />
          <div class="work-card-content">
            <h3>${item.title}</h3>
            <div class="tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
        `;
        card.addEventListener('click', () => {
          popupContent.innerHTML = `<h2>${item.title}</h2><img src='${item.img}' style='width:100%; margin-top:1rem;'><p style='margin-top:1rem;'>Tags: ${item.tags.join(', ')}</p>`;
          popup.classList.add('active');
        });
        mainCards.appendChild(card);
        gsap.to(card, {
          delay: i * 0.2,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          onStart: () => card.classList.add('show')
        });
      });
    }

    popup.onclick = () => popup.classList.remove('active');

    // Initial render
    renderWorks('Web');
  










    
        // Correct horizontal scroll implementation
        const sections = gsap.utils.toArray(".cb-panel");
        const container = document.querySelector(".cb-scroll-container");
        const wrapper = document.querySelector(".cb-scroll-wrapper");

        // Calculate total width needed
        let totalWidth = sections.length * 100;
        
        // Set wrapper width
        gsap.set(wrapper, {
            width: `${totalWidth}vw`
        });

        // Create horizontal scroll
        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: () => `+=${wrapper.offsetWidth}`,
                invalidateOnRefresh: true
            }
        });

        // Panel animations
        sections.forEach((section, i) => {
            const content = section.querySelector("div");
            
            gsap.from(content, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left center",
                    toggleActions: "play none none none"
                }
            });
        });

      
  }
  











  

            

// Initialize all page animations
function initPageAnimations() {
  setupMenu();
  setupSlider();
  setupHeroAnimations();
  setupAboutAnimations();
  setupHorizontalSection();
  pinsection()
  setupServiceCards();
  setupFooterAnimations();
  setupContactAnimations();
  other() 
}


// Initialize animations on first page load
document.addEventListener("DOMContentLoaded", () => {
  animatePreloader().then(() => {
    initPageAnimations();
  });

// Run animation after each Barba transition
barba.hooks.afterEnter((data) => {
  initPageAnimations();
});


});