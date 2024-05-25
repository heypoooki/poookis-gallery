// Get the modal
var lightbox = document.getElementById('lightbox');

// Get the image and insert it inside the modal
var lightboxImg = document.getElementById("lightbox-img");
var images = document.querySelectorAll('.portfolio-grid img');
var pageContent = document.getElementById('page-content');
var scrollPosition = 0;

images.forEach(image => {
    image.addEventListener('click', function() {
        lightbox.style.display = "flex";
        lightboxImg.src = this.getAttribute('data-full'); // Load the high-resolution image
        scrollPosition = window.pageYOffset; // Save the scroll position
        pageContent.classList.add('blur'); // Add the blur class to the page content
        
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    });
});

// Get the <span> element that closes the modal
var close = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    lightbox.style.display = "none";
    pageContent.classList.remove('blur'); // Remove the blur class from the page content
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition); // Return to the original scroll position
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == lightbox) {
        lightbox.style.display = "none";
        pageContent.classList.remove('blur'); // Remove the blur class from the page content
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition); // Return to the original scroll position
    }
}

