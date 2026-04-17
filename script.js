/* =============================================
   JAVASCRIPT — Sky-High Library
============================================= */

/* ---------- BOOK DATA ---------- */
const BOOKS = [
  // SCIENCE
  { id:1, title:"A Brief History of Time", author:"Stephen Hawking", cat:"Science", year:1988, rating:4.8, cover:"https://images.unsplash.com/photo-1614728263952-84ea256f9d4d?w=300&q=70" },
  { id:2, title:"The Selfish Gene", author:"Richard Dawkins", cat:"Science", year:1976, rating:4.6, cover:"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=70" },
  { id:3, title:"Cosmos", author:"Carl Sagan", cat:"Science", year:1980, rating:4.9, cover:"https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=300&q=70" },
  { id:4, title:"The Gene: An Intimate History", author:"Siddhartha Mukherjee", cat:"Science", year:2016, rating:4.7, cover:"https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&q=70" },
  { id:5, title:"Astrophysics for People in a Hurry", author:"Neil deGrasse Tyson", cat:"Science", year:2017, rating:4.5, cover:"https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=300&q=70" },
  // ART
  { id:6, title:"The Story of Art", author:"E.H. Gombrich", cat:"Art", year:1950, rating:4.8, cover:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=70" },
  { id:7, title:"Ways of Seeing", author:"John Berger", cat:"Art", year:1972, rating:4.6, cover:"https://images.unsplash.com/photo-1578926288207-a90a5366e7a3?w=300&q=70" },
  { id:8, title:"The Shock of the New", author:"Robert Hughes", cat:"Art", year:1980, rating:4.5, cover:"https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=300&q=70" },
  { id:9, title:"Art: A World History", author:"Dorling Kindersley", cat:"Art", year:1997, rating:4.4, cover:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70" },
  { id:10, title:"Leonardo da Vinci", author:"Walter Isaacson", cat:"Art", year:2017, rating:4.9, cover:"https://images.unsplash.com/photo-1583266630823-d1b73e5a34e1?w=300&q=70" },
  // COMMERCIAL
  { id:11, title:"Rich Dad Poor Dad", author:"Robert Kiyosaki", cat:"Commercial", year:1997, rating:4.5, cover:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=70" },
  { id:12, title:"The Lean Startup", author:"Eric Ries", cat:"Commercial", year:2011, rating:4.6, cover:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=70" },
  { id:13, title:"Zero to One", author:"Peter Thiel", cat:"Commercial", year:2014, rating:4.7, cover:"https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=300&q=70" },
  { id:14, title:"Good to Great", author:"Jim Collins", cat:"Commercial", year:2001, rating:4.6, cover:"https://images.unsplash.com/photo-1463947628408-f8581a2f4aca?w=300&q=70" },
  { id:15, title:"Atomic Habits", author:"James Clear", cat:"Commercial", year:2018, rating:4.9, cover:"https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=300&q=70" },
];

const FEATURED = [
  { title:"The Hidden Life of Trees", author:"Peter Wohlleben", genre:"Science", desc:"A revelatory look at the social life of forests and the astonishing communication between trees.", rating:5, available:true, img:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80" },
  { title:"Sapiens", author:"Yuval Noah Harari", genre:"History", desc:"A sweeping narrative of humankind from the Stone Age to the modern era.", rating:5, available:true, img:"https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80" },
  { title:"The Alchemist", author:"Paulo Coelho", genre:"Fiction", desc:"A magical journey of following one's dreams.", rating:5, available:false, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80" },
  { title:"Ikigai", author:"Francesc Miralles", genre:"Self-Help", desc:"The Japanese secret to a long and happy life.", rating:4, available:true, img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { title:"Deep Work", author:"Cal Newport", genre:"Productivity", desc:"Rules for focused success in a distracted world.", rating:5, available:true, img:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80" },
];

/* ---------- RENDER BOOKS CATALOGUE ---------- */
function starHTML(rating) {
  let s = '';
  for(let i=1; i<=5; i++) {
    s += `<i class="fa-${i<=Math.floor(rating)?'solid':'regular'} fa-star"></i>`;
  }
  return s;
}

function renderBooks(list) {
  const grid = document.getElementById('booksGrid');
  if(!list.length){
    grid.innerHTML = '<div class="no-results"><i class="fa-solid fa-book-open" style="font-size:2.5rem;color:var(--green-200);display:block;margin-bottom:12px"></i>No books found. Try a different search.</div>';
    return;
  }
  grid.innerHTML = list.map(b => `
    <div class="book-card">
      <div class="book-cover">
        <img src="${b.cover}" alt="${b.title}" loading="lazy" />
        <span class="book-category-badge">${b.cat}</span>
      </div>
      <div class="book-info">
        <h4>${b.title}</h4>
        <p class="author">${b.author}</p>
        <div class="book-meta">
          <span class="book-rating">${starHTML(b.rating)} ${b.rating}</span>
          <span class="book-year">${b.year}</span>
        </div>
      </div>
    </div>
  `).join('');
}

let currentCat = 'all';
let searchQ = '';

function filterBooks() {
  let list = BOOKS;
  if(currentCat !== 'all') list = list.filter(b => b.cat === currentCat);
  if(searchQ) {
    const q = searchQ.toLowerCase();
    list = list.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    );
  }
  renderBooks(list);
}

document.getElementById('searchInput').addEventListener('input', e => {
  searchQ = e.target.value;
  filterBooks();
});

document.getElementById('filterTabs').addEventListener('click', e => {
  if(!e.target.classList.contains('filter-tab')) return;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  currentCat = e.target.dataset.cat;
  filterBooks();
});

renderBooks(BOOKS);

/* ---------- RENDER FEATURED ---------- */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = FEATURED.map((f, i) => `
    <div class="featured-card ${i===0?'main':''}">
      <img class="fc-image" src="${f.img}" alt="${f.title}" loading="lazy" />
      <div class="fc-body">
        <div class="fc-genre">${f.genre}</div>
        <div class="fc-title">${f.title}</div>
        <div class="fc-author">by ${f.author}</div>
        ${i===0?`<p class="fc-desc">${f.desc}</p>`:''}
        <div class="fc-footer">
          <span class="fc-stars">${starHTML(f.rating)}</span>
          <span class="fc-available ${f.available?'yes':'no'}">${f.available?'Available':'Checked Out'}</span>
        </div>
      </div>
    </div>
  `).join('');
}
renderFeatured();

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ---------- HAMBURGER / MOBILE NAV ---------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('visible');
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('visible');
  });
});

/* ---------- BACK TO TOP ---------- */
document.getElementById('back-top').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- HERO PARTICLES ---------- */
const particleContainer = document.getElementById('particles');
for(let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 60 + 20;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    animation-duration:${Math.random()*15+8}s;
    animation-delay:${Math.random()*10}s;
  `;
  particleContainer.appendChild(p);
}

/* ---------- TOAST HELPER ---------- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ---------- REGISTRATION FORM ---------- */
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('regSuccess').style.display = 'block';
  showToast('Welcome aboard! Account created successfully.');
});

/* ---------- CONTACT FORM ---------- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
    btn.style.background = 'var(--green-500)';
    showToast('Message sent! We\'ll get back to you within 24 hours.');
    this.reset();
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

/* ---------- ACTIVE NAV LINKS ---------- */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const activateNav = () => {
  const scrollY = window.pageYOffset;
  sections.forEach(s => {
    const top = s.offsetTop - 100;
    const bot = top + s.offsetHeight;
    if(scrollY >= top && scrollY < bot) {
      navAs.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${s.id}`);
      });
    }
  });
};
window.addEventListener('scroll', activateNav, { passive:true });