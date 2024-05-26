// Get the modal
var lightbox = document.getElementById('lightbox');

// Get the image and insert it inside the modal
var lightboxImg = document.getElementById("lightbox-img");
var images = document.querySelectorAll('.portfolio-grid img');
var pageContent = document.getElementById('page-content');
var currentIndex = 0;

images.forEach((image, index) => {
    image.addEventListener('click', function() {
        lightbox.style.display = "flex";
        lightboxImg.src = this.getAttribute('data-full'); // Load the high-resolution image
        pageContent.classList.add('blur'); // Add the blur class to the page content
        currentIndex = index; // Set the current index
        console.log("Image clicked, currentIndex:", currentIndex);

        // Atualizar o Locomotive Scroll
        if (scroll) {
            scroll.update();
        }
    });
});

// Function to close the lightbox
function closeLightbox() {
    lightbox.style.display = "none";
    pageContent.classList.remove('blur'); // Remove the blur class from the page content

    // Atualizar o Locomotive Scroll
    if (scroll) {
        scroll.update();
    }
}

// Get the <span> element that closes the modal
var close = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    closeLightbox();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == lightbox) {
        closeLightbox();
    }
}

// Navigation through images
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

prev.addEventListener('click', function() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    console.log("Prev clicked, currentIndex:", currentIndex);
    lightboxImg.src = images[currentIndex].getAttribute('data-full');
});

next.addEventListener('click', function() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    console.log("Next clicked, currentIndex:", currentIndex);
    lightboxImg.src = images[currentIndex].getAttribute('data-full');
});

// Swipe functionality for touch devices
lightbox.addEventListener('touchstart', handleTouchStart, false);
lightbox.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { // Most significant
        if (xDiff > 0) {
            // Left swipe
            currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        } else {
            // Right swipe
            currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        }
        console.log("Swipe detected, currentIndex:", currentIndex);
        lightboxImg.src = images[currentIndex].getAttribute('data-full');
    }
    // Reset values
    xDown = null;
    yDown = null;
}

// Keyboard navigation functionality
document.addEventListener('keydown', function(event) {
    if (lightbox.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            prev.click();
        } else if (event.key === 'ArrowRight') {
            next.click();
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Inicializando Locomotive Scroll
let scroll;
document.addEventListener('DOMContentLoaded', function() {
    if ('requestAnimationFrame' in window) {
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (scrollContainer) {
            scroll = new LocomotiveScroll({
                el: scrollContainer,
                smooth: true,
                smoothMobile: true,
                inertia: 0.8 // Ajuste a inércia para obter o efeito desejado
            });

            // Garantir que o Locomotive Scroll seja atualizado na inicialização da página
            window.addEventListener('load', () => {
                scroll.update();
            });
        }
    } else {
        console.warn('Locomotive Scroll: `requestAnimationFrame` not supported');
    }
});

document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lastSendTimestamp = localStorage.getItem('lastSendTimestamp');
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastSendTimestamp;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email.');
        return;
    }

    if (lastSendTimestamp && timeDifference < 24 * 60 * 60 * 1000) { // 24 horas em milissegundos
        alert('You can only send one message every 24 hours.');
        return;
    }

    emailjs.sendForm('service_mb7xe7e', 'template_gascqfv', this)
        .then(function() {
            alert('Message sent successfully!');
            localStorage.setItem('lastSendTimestamp', currentTime);
        }, function(error) {
            alert('Failed to send message: ' + JSON.stringify(error));
        });
});
