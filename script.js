/* ==================================== */
/* 📝 Global JS Functions */
/* ==================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scroll dan Animasi Awal Home
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animasi Fade/Slide-in (Home Section)
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image-container');
    if (heroText && heroImage) {
        heroText.classList.add('animate-in');
        heroImage.classList.add('animate-in');
    }

    // 2. Observer untuk Highlight Link Aktif di Navigasi saat Scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: "-50% 0px -50% 0px" // Mengaktifkan link saat section berada di tengah viewport
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. Setup Modal untuk Gallery dan Video
    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-btn');

    const hideModal = () => {
        // Stop dan hapus video jika ada
        const videoElement = modalContent.querySelector('video');
        if (videoElement) {
            videoElement.pause();
            videoElement.remove(); 
        }
        
        // Hapus gambar jika ada
        const imageElement = modalContent.querySelector('img');
        if (imageElement) {
            imageElement.remove();
        }

        modal.classList.remove('open');
        // Delay hide agar transisi opacity terlihat
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }

    closeModal.onclick = hideModal;

    // Klik di luar modal untuk menutup
    window.onclick = (event) => {
        if (event.target == modal) {
            hideModal();
        }
    }


    /* 📸 Gallery Functions (#gallery) */
    document.querySelectorAll('.gallery-item img').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('src');
            
            modalContent.innerHTML = ''; 
            const img = document.createElement('img');
            img.src = imgSrc;
            modalContent.appendChild(img);

            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.add('open'); }, 10); 
        });
    });

    /* 🎥 Video Functions (#videos) */
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video-src');
            
            modalContent.innerHTML = ''; 
            const video = document.createElement('video');
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.style.borderRadius = '10px'; 
            modalContent.appendChild(video);

            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.add('open'); }, 10);
        });
    });
});