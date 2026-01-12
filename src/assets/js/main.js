// Import CSS for Vite bundling
import '../css/main.css';

// Alpine.js
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();

// GSAP (uncomment if needed)
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll (uncomment if needed)
// import Lenis from 'lenis';
// const lenis = new Lenis();
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);

console.log('CMS Web - Ready');
