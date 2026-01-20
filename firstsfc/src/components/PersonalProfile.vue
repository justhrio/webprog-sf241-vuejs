<template>
  <div class="profile-container">
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <nav class="navbar">
      <div class="logo">XR.</div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#task">Vue Task</a></li>
        <li><a href="#contact" class="btn-contact">Contact</a></li>
      </ul>
    </nav>

    <section id="home" class="hero">
      <div class="hero-content">
        <h3>Hello, I'm</h3>
        <h1>Xander Revelar</h1>
        <h2 class="typing-text">I am a <span class="typewriter">{{ displayText }}|</span></h2>
        <p>Specializing in Cyber Security & Forensics. Building secure systems for a safer web.</p>
        
        <div class="social-icons">
          <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" target="_blank"><i class="fab fa-github"></i></a>
        </div>
        
        <a href="mailto:sabibomb@gmail.com" class="btn-primary">Email Me</a>
      </div>
      <div class="hero-img">
        <img src="https://drive.google.com/thumbnail?id=13bP4qbyknXaE4l_BaAWOZo0b9DxR4D9I&sz=w1000" alt="Xander Profile">
      </div>
    </section>

    <section id="about" class="glass-section hidden">
      <h2 class="section-title">What I Do</h2>
      <div class="cards-grid">
        <div class="glass-card" v-for="service in services" :key="service.title">
          <i :class="service.icon + ' card-icon'"></i>
          <h3>{{ service.title }}</h3>
          <p>{{ service.desc }}</p>
        </div>
      </div>
    </section>

    <section id="skills" class="hidden">
      <h2 class="section-title">Tech Stack</h2>
      <div class="skills-container">
        <div class="skill-category" v-for="(category, name) in skills" :key="name">
          <h3 class="category-title">{{ name }}</h3>
          <div class="skill-grid">
            <div class="skill-item" v-for="tech in category" :key="tech.name">
              <i :class="tech.icon"></i>
              <span class="tooltip">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="portfolio" class="hidden">
      <h2 class="section-title">My Work</h2>
      <div class="filter-buttons">
        <button 
          v-for="cat in categories" 
          :key="cat"
          :class="{ active: currentCategory === cat }"
          @click="currentCategory = cat">
          {{ cat }}
        </button>
      </div>
      
      <div class="gallery-grid">
        <div class="gallery-item" v-for="project in filteredProjects" :key="project.title">
          <img :src="project.image" :alt="project.title">
          <div class="overlay">
            <h3>{{ project.title }}</h3>
            <p>{{ project.tech }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="task" class="hidden">
      <h2 class="section-title">Vue Task Integration</h2>
      <div class="task-wrapper">
        <h1>Example 'v-for' to create images</h1>
        <p>The 'v-for' directive is used to create images based on the 'manyFoods' array.</p>
        <div class="food-box">
          <img 
            v-for="x in manyFoods" 
            :key="x" 
            :src="'https://www.w3schools.com/vue/' + x" 
            :alt="x"
          >
        </div>
      </div>
    </section>

    <footer id="contact">
      <h2>Let's Connect</h2>
      <p class="copyright">&copy; 2026 Xander Revelar</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // --- VUE TASK DATA ---
      manyFoods: ['img_burrito.svg', 'img_salad.svg', 'img_cake.svg', 'img_soup.svg', 'img_fish.svg', 'img_pizza.svg', 'img_rice.svg'],
      
      // --- TYPING EFFECT DATA ---
      displayText: '',
      words: ["Cyber Security Specialist", "Forensics Analyst", "Faithful Believer"],
      wordIndex: 0,
      isDeleting: false,
      typingSpeed: 100,

      // --- FILTERING LOGIC ---
      currentCategory: 'All',
      categories: ['All', 'Security', 'Development', 'IoT'],

      // --- SERVICES & SKILLS & PROJECTS (Shortened for brevity) ---
      services: [
        { title: "Cyber Security", desc: "Vulnerability Assessment & Forensics.", icon: "fas fa-shield-alt" },
        { title: "Web Development", desc: "Full-stack apps using Vue.", icon: "fas fa-code" }
      ],
      skills: {
        "Languages": [
          { name: "Python", icon: "devicon-python-plain colored" },
          { name: "Java", icon: "devicon-java-plain colored" }
        ]
      },
      projects: [
        { title: "Network Defense", category: "Security", tech: "Kali Linux", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000" },
        { title: "Secure Dashboard", category: "Development", tech: "Vue.js", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000" }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.currentCategory === 'All') return this.projects;
      return this.projects.filter(project => project.category === this.currentCategory);
    }
  },
  methods: {
    typeWriter() {
      const currentWord = this.words[this.wordIndex];
      if (this.isDeleting) {
        this.displayText = currentWord.substring(0, this.displayText.length - 1);
        this.typingSpeed = 50;
      } else {
        this.displayText = currentWord.substring(0, this.displayText.length + 1);
        this.typingSpeed = 100;
      }
      if (!this.isDeleting && this.displayText === currentWord) {
        this.isDeleting = true;
        this.typingSpeed = 2000;
      } else if (this.isDeleting && this.displayText === '') {
        this.isDeleting = false;
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
        this.typingSpeed = 500;
      }
      setTimeout(() => this.typeWriter(), this.typingSpeed);
    },
    observeScroll() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      });
      document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
    }
  },
  mounted() {
    this.typeWriter();
    setTimeout(() => { this.observeScroll(); }, 100);
  }
}
</script>

<style>
/* Paste your personalprofile.css content here. 
   IMPORTANT: Since this is global, it might affect your other FoodItems 
   unless you remove them or wrap them. */
   
:root { --primary: #4e54c8; --secondary: #8f94fb; --dark: #1a1a1a; --light: #f4f4f4; }
body { background: var(--dark); color: var(--light); font-family: 'Poppins', sans-serif; }
.navbar { display: flex; justify-content: space-between; padding: 20px 50px; background: rgba(26,26,26,0.9); position: sticky; top:0; z-index: 1000;}
.hero { min-height: 90vh; display: flex; align-items: center; padding: 0 10%; }
.hero-content h1 { font-size: 4rem; background: linear-gradient(to right, #fff, #8f94fb); -webkit-background-clip: text; color: transparent; }
.btn-primary { padding: 12px 30px; background: linear-gradient(45deg, var(--primary), var(--secondary)); color: white; border-radius: 30px; text-decoration: none; }
.hidden { opacity: 0; transform: translateY(50px); transition: all 1s ease-out; }
.show { opacity: 1; transform: translateY(0); }
.task-wrapper { background: white; color: black; padding: 30px; border-radius: 10px; }
.food-box img { width: 80px; margin: 10px; }
</style>