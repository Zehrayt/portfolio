let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('.header'); 

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
           
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
           
            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    header.classList.toggle('sticky', window.scrollY > 100);

    
    if (navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x'); 
        navbar.classList.remove('active'); 
    }
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); 
    navbar.classList.toggle('active'); 
};


const certificateSlider = document.getElementById('certificateSlider');
const prevCertificateButton = document.getElementById('prevCertificate');
const nextCertificateButton = document.getElementById('nextCertificate');

if (certificateSlider && prevCertificateButton && nextCertificateButton) {
    const certificateItems = document.querySelectorAll('.certificate-item');
    const itemWidth = certificateItems.length > 0 ? certificateItems[0].offsetWidth + 20 : 0; 
    const wrapperWidth = document.querySelector('.certificate-slider-wrapper').offsetWidth;
    const visibleItems = Math.floor(wrapperWidth / itemWidth);
    const totalItems = certificateItems.length;
    let currentCertificateIndex = 0;

    function updateCertificateSlider() {
        const maxOffset = (totalItems - visibleItems) * itemWidth;
        let offset = currentCertificateIndex * itemWidth;
        if (offset > maxOffset) {
             offset = maxOffset > 0 ? maxOffset : 0; 
        }
        certificateSlider.style.transform = `translateX(-${offset}px)`;

        
        prevCertificateButton.disabled = currentCertificateIndex === 0;
        nextCertificateButton.disabled = currentCertificateIndex >= totalItems - visibleItems || totalItems <= visibleItems;
         if (totalItems <= visibleItems) { 
            prevCertificateButton.disabled = true;
            nextCertificateButton.disabled = true;
        }
    }

    nextCertificateButton.addEventListener('click', () => {
        if (currentCertificateIndex < totalItems - visibleItems) {
            currentCertificateIndex++;
            updateCertificateSlider();
        }
    });

    prevCertificateButton.addEventListener('click', () => {
        if (currentCertificateIndex > 0) {
            currentCertificateIndex--;
            updateCertificateSlider();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newWrapperWidth = document.querySelector('.certificate-slider-wrapper').offsetWidth;
            const newItemWidth = certificateItems.length > 0 ? certificateItems[0].offsetWidth + 20 : 0;
            const newVisibleItems = Math.floor(newWrapperWidth / newItemWidth);

            
            if (currentCertificateIndex > totalItems - newVisibleItems) {
                 currentCertificateIndex = Math.max(0, totalItems - newVisibleItems);
            }
            updateCertificateSlider(); 
        }, 250);
    });

    
    if(itemWidth > 0) { 
      updateCertificateSlider();
    } else { 
        prevCertificateButton.style.display = 'none';
        nextCertificateButton.style.display = 'none';
    }
}


const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const closeModalButton = document.querySelector('.close-modal-button');
const certificateItemsForPdf = document.querySelectorAll('.certificate-item.view-pdf-button');

certificateItemsForPdf.forEach(item => {
    item.addEventListener('click', () => {
        const pdfSrc = item.getAttribute('data-pdf-src');
        if (pdfSrc && pdfModal && pdfViewer) {
            pdfViewer.setAttribute('src', pdfSrc);
            pdfModal.classList.add('active'); 
            
            document.body.style.overflow = 'hidden';
        }
    });
});

function closePdfModal() {
    if (pdfModal && pdfViewer) {
        pdfModal.classList.remove('active'); 
        pdfViewer.setAttribute('src', ''); 
        
        document.body.style.overflow = 'auto';
    }
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', closePdfModal);
}

if (pdfModal) {
    pdfModal.addEventListener('click', (event) => {
        if (event.target === pdfModal) { 
            closePdfModal();
        }
    });
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && pdfModal && pdfModal.classList.contains('active')) {
        closePdfModal();
    }
});
