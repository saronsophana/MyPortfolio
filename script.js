// DOM Elements
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const filterBtns = document.querySelectorAll(".filter-btn");

// Scroll event
window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);
// Header scroll effect
function headerScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
  menuToggle.querySelector("i").classList.toggle("fa-times");
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.querySelector("i").classList.add("fa-bars");
    menuToggle.querySelector("i").classList.remove("fa-times");
    
    // Update active link
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Portfolio filtering
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const filter = btn.getAttribute("data-filter");
    
    cards.forEach(card => {
      const category = card.getAttribute("data-category");
      
      if (filter === "all" || category === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.classList.add("show");
        }, 100);
      } else {
        card.classList.remove("show");
        setTimeout(() => {
          card.style.display = "none";
        }, 400);
      }
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Active nav link on scroll
function activeNavOnScroll() {
  const sections = document.querySelectorAll("section");
  
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    
    if (window.scrollY >= top && window.scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Create success message
    const btn = contactForm.querySelector("button");
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = "linear-gradient(135deg, #00e5ff, #7c4dff)";
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      contactForm.reset();
    }, 3000);
  });
}

// Parallax effect for hero shapes
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.2);
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
}

// Event listeners
window.addEventListener("scroll", () => {
  revealCards();
  headerScroll();
  activeNavOnScroll();
  parallaxEffect();
});

window.addEventListener("load", () => {
  revealCards();
  headerScroll();
});

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector(".hero-text h2");
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = "";
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  setTimeout(typeWriter, 1000);
}window.addEventListener("load", revealCards);

const items = [
    { type: 'poster', img: 'poster/៧មករា.png' },
    { type: 'poster', img: 'poster/Exam poster.png' },
    { type: 'poster', img: 'poster/Pjum-ben.jpg' },
    { type: 'poster', img: 'poster/travel1.png' },
    { type: 'poster', img: 'poster/coffe-ps.png' },
    // អ្នកអាចបន្ថែម Banner ឬ Logo នៅទីនេះ
    { type: 'banner', img: 'https://picsum.photos/400/300?random=1' },
    { type: 'logo', img: 'https://picsum.photos/400/400?random=2' }
];

const gallery = document.getElementById('gallery');

function displayImages(filter = 'all') {
    gallery.innerHTML = '';
    
    const filteredItems = filter === 'all' ? items : items.filter(i => i.type === filter);
    
    filteredItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        // បន្ថែមរូបភាព
        div.innerHTML = `<img src="${item.img}" alt="Design">`;
        
        // ចុចលើរូបភាពដើម្បីបើកក្នុង Tab ថ្មី
        div.onclick = () => {
            window.open(item.img, '_blank');
        };
        
        gallery.appendChild(div);
    });
}

function filterGallery(category) {
    displayImages(category);
    
    const links = document.querySelectorAll('.nav-links li');
    links.forEach(link => {
        link.classList.remove('active');
        if(link.innerText.toLowerCase().includes(category) || (category === 'all' && link.innerText === 'All Projects')) {
            link.classList.add('active');
        }
    });
}

// ហៅមកបង្ហាញដំបូង
displayImages();