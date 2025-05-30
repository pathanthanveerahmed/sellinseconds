
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-QMV442HBWL');
  

{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sell In Seconds",
  "url": "https://www.sellinseconds.in",
  "logo": "https://www.sellinseconds.in/fevicon.ico",
  "image": "https://www.sellinseconds.in/aicrop1.webp",
  "description": "Sell In Seconds is your trusted platform for selling, buying, exchanging, trade-ins, and expert repairs of mobile phones, laptops, tablets, smartwatches, and other electronic gadgets. We offer instant quotes, quick service, and chip-level repairs.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919886566379",
    "contactType": "Customer Service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"]
  },
  "potentialAction": {
    "@type": "SellAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.sellinseconds.in/#contact-form"
    },
    "query-input": "required name=gadgetInterest"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Gadget Services Offered by Sell In Seconds",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Mobile Phone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell iPhone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Android Phone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Laptop" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell MacBook" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Tablet" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell iPad" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Smart Watch" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Apple Watch" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell iMac" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Gaming Console" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sell Gadget Accessories" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buy Pre-owned Mobile Phone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buy Pre-owned Laptop" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Buy Pre-owned Tablet" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gadget Repair Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Phone Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Laptop Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tablet Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Smartwatch Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chip-Level Motherboard Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software Fix & Optimization" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gadget Diagnosis & Checkup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Phone Exchange" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gadget Trade-in Program" } }
    ]
  }
}


    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Sell In Seconds",
      "url": "https://www.sellinseconds.in",
      "image": "https://www.sellinseconds.in/aicrop1.webp",
      "telephone": "+919886566379",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ITPL Main Road",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560048",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "12:00",
        "closes": "23:59"
      }],
      "priceRange": "$$",
      "description": "Buy, sell, and repair gadgets (Chip level as well) instantly with trusted service and instant quotes."
    }
  

const containers = document.querySelectorAll('.image-container');
const nameInput = document.getElementById('name');
const interestInput = document.getElementById('interest');
const submitButton = document.querySelector('#contact-form button[type="submit"]');
const headerElement = document.querySelector('header');
const bodyElement = document.body;
const synth = window.speechSynthesis;
let currentUtterance;

const modal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');
const modalCloseButton = document.getElementById('modalCloseButton');

function showModal(message) {
modalMessage.textContent = message;
modal.style.display = 'block';
}
modalCloseButton.onclick = function() { modal.style.display = 'none'; }
window.onclick = function(event) { if (event.target == modal) { modal.style.display = 'none'; } }

function setBodyPadding() {
requestAnimationFrame(() => {
if (headerElement) {
bodyElement.style.paddingTop = headerElement.offsetHeight + 'px';
}
});
}

history.scrollRestoration = 'manual';

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('currentYear').textContent = new Date().getFullYear();
setTimeout(() => { window.scrollTo(0, 0); }, 50);

hideLoading();
setBodyPadding();
window.addEventListener('resize', setBodyPadding);

const allFlipContainers = document.querySelectorAll('.image-grid .image-container');
const hasFlippedOnce = sessionStorage.getItem('hasFlippedImages');
const flipDuration = 900;
const staggerDelay = 100;
const totalFlipInTime = allFlipContainers.length * staggerDelay;
const totalFlipOutTime = allFlipContainers.length * staggerDelay + flipDuration;
const parentGlowElements = document.querySelectorAll('.image-grid-row1-row2');

if (!hasFlippedOnce && allFlipContainers.length > 0) {
parentGlowElements.forEach(el => el.classList.add('glowing-border'));

allFlipContainers.forEach((container, index) => {
setTimeout(() => {
const innerCard = container.querySelector('.image-card-inner');
if (innerCard) {
innerCard.style.transform = 'rotateY(180deg)';
const backText = container.getAttribute('data-back-text');
const backFace = container.querySelector('.image-card-back');
if (backText && backFace) {
backFace.textContent = backText;
}
}
}, staggerDelay * index);
});

setTimeout(() => {
allFlipContainers.forEach((container, index) => {
setTimeout(() => {
const innerCard = container.querySelector('.image-card-inner');
if (innerCard) {
innerCard.style.transform = 'rotateY(0deg)';
}
}, staggerDelay * index);
});
setTimeout(() => {
parentGlowElements.forEach(el => el.classList.remove('glowing-border'));
sessionStorage.setItem('hasFlippedImages', 'true');
setTimeout(setBodyPadding, 100);
}, totalFlipOutTime + 200);
}, totalFlipInTime + 500);
}

containers.forEach((container) => {
container.addEventListener('click', () => {
containers.forEach(c => c.classList.remove('selected'));
container.classList.add('selected');

const gadgetInterest = container.getAttribute('data-gadget-name') || 'Selected Gadget';
interestInput.value = gadgetInterest;
let message;

if (gadgetInterest.toLowerCase().includes("buy")) {
message = `Interested in buying? Great choice!`;
submitButton.textContent = "See Available Gadgets";
} else if (gadgetInterest.toLowerCase().includes("repair")) {
message = `Need a repair? We can help!`;
submitButton.textContent = "Book Repair Service";
} else if (gadgetInterest.toLowerCase().includes("software fix")) {
message = `Having software troubles? We offer quick solutions!`;
submitButton.textContent = "Book Software Fix";
} else if (gadgetInterest.toLowerCase().includes("diagnosis")) {
message = `Need a checkup? We can diagnose any gadget issue!`;
submitButton.textContent = "Book Diagnosis";
} else {
message = `Selected: ${container.querySelector('figcaption')?.textContent || 'Gadget'}. Get your quote!`;
submitButton.textContent = "Get Instant Quote";
}

if (synth && 'speechSynthesis' in window && synth.speaking) {
synth.cancel();
setTimeout(() => speak(message), 150);
} else if (synth && 'speechSynthesis' in window) {
speak(message);
}

nameInput.classList.remove('wave');
const nameInputRect = nameInput.getBoundingClientRect();
const currentScrollY = window.scrollY;
const headerHeight = headerElement ? headerElement.offsetHeight : 0;
const targetScrollTop = nameInputRect.top + currentScrollY - headerHeight - 30;

window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });

setTimeout(() => {
nameInput.focus({ preventScroll: true });
nameInput.classList.add('wave');
setTimeout(() => { nameInput.classList.remove('wave'); }, 900);
}, 100);
});
});
});

window.onload = () => {
setTimeout(() => { window.scrollTo(0, 0); }, 50);
setBodyPadding();
};

function speak(text) {
if ('speechSynthesis' in window && synth) {
if (synth.speaking) {
synth.cancel();
}
setTimeout(() => {
currentUtterance = new SpeechSynthesisUtterance(text);
currentUtterance.rate = 1.1;
currentUtterance.pitch = 1.0;
synth.speak(currentUtterance);
}, 50);
} else {
console.log("Speech synthesis not supported or synth not initialized.");
}
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
e.preventDefault();
const form = e.target;
const name = form.name.value.trim();
const mobile = form.mobile.value.trim();
const interest = form.interest.value.trim();
const mobileRegex = /^[0-9]{10}$/;
const nameRegex = /^(?!^\d+$)(?!^[^\w\s]+$)[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]+$/u;


if (!name || !mobile || !interest) {
showModal("Please select a product/service and fill out all fields.");
return;
}
if (!nameRegex.test(name) || name.length < 2) {
showModal("Please enter a valid name (at least 2 characters, letters and standard punctuation).");
return;
}
if (!mobileRegex.test(mobile)) {
showModal("Invalid mobile number! It should contain exactly 10 digits.");
return;
}
showLoading();
let loadingTimeout = setTimeout(() => {
    hideLoading();
    showModal("The request is taking longer than expected. Please check your internet connection and try again.");
}, 15000);

const formBody = new URLSearchParams();
formBody.append("name", name);
formBody.append("mobile", mobile);
formBody.append("interest", interest);

fetch(form.action, {
method: "POST",
headers: { "Content-Type": "application/x-www-form-urlencoded" },
body: formBody.toString()
})
.then(response => {
    clearTimeout(loadingTimeout);
    hideLoading();
    if (response.ok) {
        showModal("Form submitted successfully! We will contact you soon.");
        form.reset();
        document.querySelectorAll('.image-container.selected').forEach(c => c.classList.remove('selected'));
        if(submitButton) submitButton.textContent = "Submit";
        interestInput.value = "";
        nameInput.classList.remove('wave');
    } else {
        response.text().then(text => {
            console.error("Server error response:", text);
            showModal("Failed to submit. Please try again. (Server error " + response.status + ")");
        });
    }
})
.catch(error => {
    clearTimeout(loadingTimeout);
    hideLoading();
    console.error("Network Error:", error.message);
    showModal("Failed to submit. Please check your internet connection and try again. (Network error)");
});
});

function showLoading() { document.getElementById('loading-overlay').style.display = 'flex'; }
function hideLoading() { document.getElementById('loading-overlay').style.display = 'none'; }
document.addEventListener('DOMContentLoaded', hideLoading);
