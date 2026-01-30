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
        <li><a href="#comments">Comments</a></li>
        <li><a href="mailto:sabibomb@gmail.com" class="btn-contact">Contact</a></li>
      </ul>
    </nav>

    <section id="home" class="hero">
      <div class="hero-content">
        <h3>Hello, I'm</h3>
        <h1>Xander Revelar</h1>
        <h2 class="typing-text">I am a <span class="typewriter">{{ displayText }}</span>|</h2>
        <p>Specializing in Cyber Security & Forensics. Building secure systems for a safer web.</p>
        <div class="social-icons">
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
          <a href="#"><i class="fab fa-github"></i></a>
        </div>
        <a href="mailto:sabibomb@gmail.com" class="btn-primary">Email Me</a>
      </div>
      <div class="hero-img">
        <img src="https://drive.google.com/thumbnail?id=13bP4qbyknXaE4l_BaAWOZo0b9DxR4D9I&sz=w1000" alt="Profile">
      </div>
    </section>

    <section id="comments" class="glass-section hidden">
      <h2 class="section-title">Guestbook</h2>
      <div class="task-wrapper">
        <form @submit.prevent="submitComment">
          <input v-model="newName" placeholder="Your Name" required class="form-control mb-2">
          <textarea v-model="newComment" placeholder="Leave a comment" required class="form-control mb-2"></textarea>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Post Comment' }}
          </button>
        </form>

        <ul class="mt-4">
          <li v-for="c in comments" :key="c.id" class="comment-item">
            <strong>{{ c.name }}:</strong> {{ c.comment }}
          </li>
        </ul>
      </div>
    </section>

    <section id="task" class="hidden">
      <h2 class="section-title">Vue Task Integration</h2>
      <div class="task-wrapper text-center">
        <p>The 'v-for' directive creating images from an array:</p>
        <div class="food-box">
          <img v-for="food in manyFoods" :key="food" :src="'https://www.w3schools.com/vue/' + food" :alt="food">
        </div>
      </div>
    </section>

    <footer>
      <p>&copy; 2026 Xander Revelar</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from './lib/supabaseClient'

// --- Portfolio & Typing Logic ---
const displayText = ref('')
const words = ["Cyber Security Specialist", "Forensics Analyst", "Faithful Believer"]
let wordIndex = 0
let isDeleting = false

function typeWriter() {
  const currentWord = words[wordIndex]
  if (isDeleting) {
    displayText.value = currentWord.substring(0, displayText.value.length - 1)
  } else {
    displayText.value = currentWord.substring(0, displayText.value.length + 1)
  }

  let typeSpeed = isDeleting ? 50 : 100
  if (!isDeleting && displayText.value === currentWord) {
    isDeleting = true
    typeSpeed = 2000
  } else if (isDeleting && displayText.value === '') {
    isDeleting = false
    wordIndex = (wordIndex + 1) % words.length
    typeSpeed = 500
  }
  setTimeout(typeWriter, typeSpeed)
}

// --- Supabase Logic ---
const comments = ref([])
const newName = ref('')
const newComment = ref('')
const isSubmitting = ref(false)

async function fetchComments() {
  const { data } = await supabase.from('comments').select('*').order('created_at', { ascending: false })
  comments.value = data
}

async function submitComment() {
  isSubmitting.value = true
  const { error } = await supabase.from('comments').insert([{ name: newName.value, comment: newComment.value }])
  if (!error) {
    newName.value = ''
    newComment.value = ''
    await fetchComments()
  }
  isSubmitting.value = false
}

// --- Food Task Data ---
const manyFoods = ['img_burrito.svg', 'img_salad.svg', 'img_cake.svg', 'img_soup.svg', 'img_fish.svg', 'img_pizza.svg', 'img_rice.svg']

// --- Scroll Observer ---
function observeScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show')
    })
  })
  document.querySelectorAll('.hidden').forEach(el => observer.observe(el))
}

onMounted(() => {
  typeWriter()
  fetchComments()
  setTimeout(observeScroll, 100)
})
</script>

<style>
/* Base Styles */
:root { --primary: #4e54c8; --secondary: #8f94fb; --dark: #1a1a1a; --light: #f4f4f4; }
body { background: var(--dark); color: var(--light); font-family: 'Poppins', sans-serif; margin:0; }

.navbar { display: flex; justify-content: space-between; padding: 20px 50px; background: rgba(26,26,26,0.9); position: sticky; top:0; z-index: 1000;}
.nav-links { display: flex; list-style: none; gap: 20px; }
.nav-links a { color: white; text-decoration: none; }

.hero { min-height: 80vh; display: flex; align-items: center; padding: 0 10%; justify-content: space-around; }
.hero-content h1 { font-size: 3.5rem; color: var(--secondary); }

.task-wrapper { background: white; color: black; padding: 20px; border-radius: 12px; margin: 20px 0; }
.form-control { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; }
.btn-primary { background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; }

.food-box img { width: 60px; margin: 10px; }
.comment-item { list-style: none; padding: 10px; border-bottom: 1px solid #eee; }

.hidden { opacity: 0; transform: translateY(30px); transition: 1s ease; }
.show { opacity: 1; transform: translateY(0); }

.background-shapes .shape { position: fixed; filter: blur(80px); z-index: -1; border-radius: 50%; }
.shape-1 { top: -10%; left: -10%; width: 400px; height: 400px; background: var(--primary); opacity: 0.3; }
.shape-2 { bottom: -10%; right: -10%; width: 300px; height: 300px; background: var(--secondary); opacity: 0.3; }
</style>