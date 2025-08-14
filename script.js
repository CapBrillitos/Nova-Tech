// Navigation functionality
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Typewriter effect
const typewriterText = "Innovación que impulsa tu futuro digital"
const typewriterElement = document.getElementById("typewriter")
let i = 0

function typeWriter() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML = typewriterText.substring(0, i + 1)
    i++
    setTimeout(typeWriter, 100)
  }
}

// Start typewriter effect when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000)
})

// Testimonials slider
let currentTestimonial = 1
const testimonials = document.querySelectorAll(".testimonial-card")
const dots = document.querySelectorAll(".dot")

function showTestimonial(n) {
  testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  if (n > testimonials.length) currentTestimonial = 1
  if (n < 1) currentTestimonial = testimonials.length

  testimonials[currentTestimonial - 1].classList.add("active")
  dots[currentTestimonial - 1].classList.add("active")
}

function currentSlide(n) {
  currentTestimonial = n
  showTestimonial(currentTestimonial)
}

// Auto-advance testimonials
setInterval(() => {
  currentTestimonial++
  showTestimonial(currentTestimonial)
}, 5000)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add animation classes to elements
window.addEventListener("load", () => {
  // Service cards
  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Project cards
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Pricing cards
  document.querySelectorAll(".pricing-card").forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // About section
  const aboutText = document.querySelector(".about-text")
  const aboutImage = document.querySelector(".about-image")
  if (aboutText && aboutImage) {
    aboutText.classList.add("slide-in-left")
    aboutImage.classList.add("slide-in-right")
    observer.observe(aboutText)
    observer.observe(aboutImage)
  }

  // Contact section
  const contactInfo = document.querySelector(".contact-info")
  const contactForm = document.querySelector(".contact-form")
  if (contactInfo && contactForm) {
    contactInfo.classList.add("slide-in-left")
    contactForm.classList.add("slide-in-right")
    observer.observe(contactInfo)
    observer.observe(contactForm)
  }
})

// Contact form functionality
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Enviando..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("¡Mensaje enviado correctamente! Te contactaremos pronto.")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (!this.classList.contains("loading")) {
      this.classList.add("loading")

      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
        this.classList.remove("loading")
      }, 600)
    }
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-particles")
  if (parallax) {
    const speed = scrolled * 0.5
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat h3")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent)
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + (counter.textContent.includes("+") ? "+" : "")
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target + (counter.textContent.includes("+") ? "+" : "")
      }
    }

    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(counter)
  })
}

// Initialize counter animation
window.addEventListener("load", animateCounters)

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
`

document.body.appendChild(scrollToTopBtn)

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
