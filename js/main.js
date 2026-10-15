/**
 * ACES - Association of Computer Engineering Students
 * Sinhgad Institute of Technology, Lonavala
 * Interactive Engine: Theme Switcher, Filter Tabs, Modal, and Glass Spotlight
 */

(function () {
  'use strict';

  // ==========================================
  // 1. SITE STARTUP SYSTEM PRELOADER ENGINE
  // ==========================================
  const preloader = document.getElementById('site-preloader');
  const preloaderBar = document.getElementById('preloader-progress-bar');
  const preloaderStatus = document.getElementById('preloader-status-label');
  const preloaderPercent = document.getElementById('preloader-percent-label');

  if (preloader && preloaderBar && preloaderStatus && preloaderPercent) {
    let progress = 0;
    const statusMessages = [
      { threshold: 10, msg: 'INITIALIZING SUBSYSTEMS...' },
      { threshold: 30, msg: 'CONNECTING TO SIT SERVERS...' },
      { threshold: 60, msg: 'LOADING EVENTS & DIRECTORIES...' },
      { threshold: 85, msg: 'INITIALIZING 3D GRAPHICS...' },
      { threshold: 100, msg: 'SYSTEM READY' }
    ];

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 9) + 4;
      progress = Math.min(progress + increment, 100);

      preloaderBar.style.width = `${progress}%`;
      preloaderPercent.textContent = `${progress}%`;

      for (let i = statusMessages.length - 1; i >= 0; i--) {
        if (progress >= statusMessages[i].threshold) {
          preloaderStatus.textContent = statusMessages[i].msg;
          break;
        }
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 700);
        }, 320);
      }
    }, 45);
  }

  // ==========================================
  // 2. FACULTY HORIZONTAL SCROLL ENGINE (Side-by-Side Controls)
  // ==========================================
  const facultyTrack = document.getElementById('faculty-track');
  const facultyPrevBtn = document.getElementById('faculty-scroll-prev');
  const facultyNextBtn = document.getElementById('faculty-scroll-next');

  // Left-to-Right Carousel Navigation via Side Buttons
  if (facultyTrack && facultyPrevBtn && facultyNextBtn) {
    const getCardWidth = () => {
      const firstCard = facultyTrack.querySelector('.faculty-scroll-card');
      return firstCard ? firstCard.getBoundingClientRect().width + 24 : 344;
    };

    const updateCarouselArrows = () => {
      const maxScroll = facultyTrack.scrollWidth - facultyTrack.clientWidth;
      facultyPrevBtn.disabled = facultyTrack.scrollLeft <= 5;
      facultyNextBtn.disabled = facultyTrack.scrollLeft >= maxScroll - 5;
    };

    facultyPrevBtn.addEventListener('click', () => {
      facultyTrack.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    facultyNextBtn.addEventListener('click', () => {
      facultyTrack.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    facultyTrack.addEventListener('scroll', updateCarouselArrows, { passive: true });
    window.addEventListener('resize', updateCarouselArrows);
    // Initial check
    setTimeout(updateCarouselArrows, 100);
  }

  // ==========================================
  // 3. FACULTY DETAILS MODAL SYSTEM
  // ==========================================
  const facultyModal = document.getElementById('faculty-modal');
  const facultyModalCloseBtn = document.getElementById('modal-faculty-close-btn');
  const modalFacultyImg = document.getElementById('modal-faculty-img');
  const modalFacultyBadge = document.getElementById('modal-faculty-badge');
  const modalFacultyName = document.getElementById('modal-faculty-name');
  const modalFacultyRole = document.getElementById('modal-faculty-role');
  const modalFacultyQualifications = document.getElementById('modal-faculty-qualifications');
  const modalFacultyInstitution = document.getElementById('modal-faculty-institution');
  const modalFacultyDesc = document.getElementById('modal-faculty-desc');

  const facultyDataMap = {
    'mantri': {
      name: 'Dr. D. S. Mantri',
      role: 'Principal, Sinhgad Institute of Technology, Lonavala',
      badge: 'Institutional Leadership',
      qualifications: 'Ph.D., M.Tech, B.E. (Computer / Electronics)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-principal.jpg',
      desc: 'Dr. D. S. Mantri provides visionary administrative and academic leadership to Sinhgad Institute of Technology, Lonavala. Under his guidance, the institute emphasizes technological research, student innovation bodies, industry accreditation, and modern outcome-based engineering education. He actively supports departmental initiatives, student forums, and technical hackathons organized by ACES.'
    },
    'gaikwad': {
      name: 'Dr. S. M. Gaikwad',
      role: 'Vice Principal, Sinhgad Institute of Technology, Lonavala',
      badge: 'Institutional Leadership',
      qualifications: 'Ph.D. • Senior Academician',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-vice-principal.jpg',
      desc: 'Dr. S. M. Gaikwad oversees institutional governance, academic administration, university curriculum delivery, and student technical bodies. He actively champions hands-on technical growth, collaborative learning environments, and the cultivation of engineering excellence for Computer Engineering scholars.'
    },
    'nimbekar': {
      name: 'Prof. S. B. Nimbekar Sir',
      role: 'Associate Professor & Head (HOD), Department of Computer Engineering',
      badge: 'Associate Professor & Head',
      qualifications: 'M.E. (Electronics); Ph.D. pursuing (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-nimbekar.jpg',
      desc: 'An experienced academic in the Computer Engineering department, with a background in electronics and research interests in signal processing and neural processing. Supports technical learning, student project guidance, departmental academic excellence, and research-oriented activities. Under his mentorship, ACES organizes cutting-edge hackathons, coding leagues, and technical seminars.'
    },
    'chaudhari': {
      name: 'Dr. M. S. Chaudhari Sir',
      role: 'Professor & Dean R&D, Department of Computer Engineering',
      badge: 'Professor & Dean R&D',
      qualifications: 'Ph.D. (Communication and Computer Engineering) (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-chaudhari.jpg',
      desc: 'An experienced academic and research professional with expertise in Communication and Computer Engineering. His published research interests include the Internet of Things (IoT) and Artificial Intelligence, helping promote innovation, patent filings, research papers, and technical project activity within the student community.'
    },
    'raut': {
      name: 'Prof. Mayur Raut',
      role: 'Training & Placement Officer (T.P.O.), SIT Lonavala',
      badge: 'Corporate Relations & Placement Cell',
      qualifications: 'Head, Training & Placement Cell',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-tpo.jpg',
      desc: 'Directs institutional campus placements, multinational corporate tie-ups, student aptitude training, competitive interview coaching, and high-impact internship drives. Guides ACES students in career readiness, resume architecture, and industry-oriented problem-solving skills.'
    },
    'patil': {
      name: 'Prof. N. K. Patil Sir',
      role: 'Assistant Professor & NBA/NAAC Head',
      badge: 'Assistant Professor & Accreditation Lead',
      qualifications: 'M.E. (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-patil.jpg',
      desc: 'An experienced computer engineering educator whose listed areas of expertise include computer networks and computer security. Contributes to technical teaching, departmental academic activities, and institutional accreditation benchmarks (NBA/NAAC).'
    },
    'chavan': {
      name: 'Prof. V. M. Chavan Sir',
      role: 'Assistant Professor & Assistant CEO',
      badge: 'Assistant Professor & Assistant CEO',
      qualifications: 'M.E. (E&TC;) (official website lists Mr. Vikram M. Chavan)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-chavan.jpg?v=2',
      desc: 'A faculty member with a background in Electronics and Telecommunication engineering. His listed technical interests include embedded systems and VLSI, supporting practical and application-oriented engineering learning, microcontroller systems, and embedded firmware development.'
    },
    'udawant': {
      name: 'Mr. A. P. Udawant Sir',
      role: 'Assistant Professor, Department of Computer Engineering',
      badge: 'Assistant Professor',
      qualifications: 'Computer Engineering (department records)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-udawant.jpg?v=2',
      desc: 'Dedicated faculty member in the Computer Engineering department involved in curriculum delivery, algorithmic design laboratories, and student project mentorship. Encourages active student participation in coding competitions and technical club activities.'
    },
    'palaskar': {
      name: 'Mr. Umesh Palaskar Sir',
      role: 'Assistant Professor, Department of Computer Engineering',
      badge: 'Assistant Professor',
      qualifications: 'Computer Engineering (department records)',
      institution: 'SIT Lonavala',
      img: 'assets/faculty-palaskar.jpg?v=2',
      desc: 'Faculty member contributing to academic teaching, practical laboratory coordination, and student project mentorship at Sinhgad Institute of Technology. Fosters structured learning and hands-on coding experiments.'
    },
    'asmita': {
      name: 'Ms. Asmita Deshmukh',
      role: 'Lab Assistant (Ms. Asmita Atul Deshmukh)',
      badge: 'Technical & Lab Staff',
      qualifications: 'B.E. (Computer Science); Diploma (Industrial Electronics) (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/staff-asmita.jpg?v=2',
      desc: 'Supports practical laboratory activities and the day-to-day functioning of computer engineering labs, helping students and faculty use laboratory facilities for hands-on learning, practical examinations, and software experiments.'
    },
    'mulani': {
      name: 'Ms. Nilofar Mulani',
      role: 'Lab Assistant / Technical Assistant',
      badge: 'Technical & Lab Staff',
      qualifications: 'MCA (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/staff-mulani.jpg?v=2',
      desc: 'Supports technical and laboratory activities within the department, contributing to the smooth operation of practical sessions, software installation, system administration, and student learning environments.'
    },
    'pise': {
      name: 'Mr. Santaji S. Pise',
      role: 'Technical Assistant (Mr. Santajee Sadhu Pise)',
      badge: 'Technical & Lab Staff',
      qualifications: 'MCA; Diploma in Cyber Law (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/staff-pise.jpg',
      desc: 'Supports technical operations and practical learning activities in the department. His technical background includes computer applications, IT infrastructure support, and cyber law.'
    },
    'gund': {
      name: 'Mr. Prakash Gund',
      role: 'Department Support / Peon (Mr. Prakash Gangaram Gund)',
      badge: 'Department Support',
      qualifications: '9th standard (official website)',
      institution: 'SIT Lonavala',
      img: 'assets/staff-gund-profile.jpg',
      desc: 'Supports day-to-day departmental operations and general office activities, helping maintain an organized, clean, and functional academic environment across all computer engineering facilities.'
    }
  };

  // Open faculty modal
  const openFacultyModal = (facultyId) => {
    const data = facultyDataMap[facultyId];
    if (!data || !facultyModal) return;

    if (modalFacultyName) modalFacultyName.textContent = data.name;
    if (modalFacultyRole) modalFacultyRole.textContent = data.role;
    if (modalFacultyBadge) modalFacultyBadge.textContent = data.badge;
    if (modalFacultyQualifications) modalFacultyQualifications.textContent = data.qualifications;
    if (modalFacultyInstitution) modalFacultyInstitution.textContent = data.institution;
    if (modalFacultyDesc) modalFacultyDesc.textContent = data.desc;
    if (modalFacultyImg) {
      modalFacultyImg.src = data.img;
      modalFacultyImg.alt = data.name;
    }

    facultyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeFacultyModal = () => {
    if (facultyModal) {
      facultyModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Event delegation or direct listeners for faculty modal triggers
  document.querySelectorAll('[data-faculty-id]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      // Prevent double trigger if clicking inside card or button
      e.stopPropagation();
      const fId = elem.getAttribute('data-faculty-id');
      if (fId) openFacultyModal(fId);
    });
  });

  if (facultyModalCloseBtn) {
    facultyModalCloseBtn.addEventListener('click', closeFacultyModal);
  }

  if (facultyModal) {
    facultyModal.addEventListener('click', (e) => {
      if (e.target === facultyModal) closeFacultyModal();
    });
  }

  // ==========================================
  // 4. EVENTS FILTER TABS
  // ==========================================
  const eventFilterBtns = document.querySelectorAll('.events-filter-bar .filter-btn');
  const eventCards = document.querySelectorAll('.events-grid .event-card');

  eventFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || filterCategory === cardCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. TEAM HIERARCHY FILTER TABS
  // ==========================================
  const teamFilterBtns = document.querySelectorAll('.team-filter-bar .filter-btn');
  const tierGroups = document.querySelectorAll('.tier-group');

  teamFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      teamFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTier = btn.getAttribute('data-tier');

      tierGroups.forEach(group => {
        const groupTier = group.getAttribute('data-tier');
        if (targetTier === 'all' || targetTier === groupTier) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5B. FACULTY DIRECTORY FILTER TABS
  // ==========================================
  const facultyFilterBtns = document.querySelectorAll('.faculty-filter-bar .filter-btn');
  const facultyGridCards = document.querySelectorAll('.faculty-grid .faculty-scroll-card');

  if (facultyFilterBtns.length > 0 && facultyGridCards.length > 0) {
    facultyFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        facultyFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterCategory = btn.getAttribute('data-faculty-filter') || btn.getAttribute('data-category');

        facultyGridCards.forEach(card => {
          const cardCategory = card.getAttribute('data-faculty-category');
          if (filterCategory === 'all' || filterCategory === cardCategory) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.35s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================
  // 6. INTERACTIVE EVENT MODAL
  // ==========================================
  const modalOverlay = document.getElementById('event-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-event-title');
  const modalDate = document.getElementById('modal-event-date');
  const modalVenue = document.getElementById('modal-event-venue');
  const modalCategory = document.getElementById('modal-event-category');
  const modalDescription = document.getElementById('modal-event-desc');
  const modalThumb = document.getElementById('modal-event-thumb');

  const eventDataMap = {
    'freshers': {
      title: 'Freshers Party 2k26: Grand Departmental Welcome',
      date: 'February 25, 2026 (Wednesday) • 1:30 PM - 4:00 PM',
      venue: 'Building No 2 "IT Seminar Hall", SIT Lonavala',
      category: 'Departmental Welcome Gala',
      thumb: 'assets/event-freshers.jpg',
      desc: 'Freshers Party 2k26 is the grand departmental welcoming gala celebrating the incoming Computer Engineering scholars. Features high-energy stage performances, live music, dance showcases, interactive batch icebreakers, DJ party, and student welcome kits. Join us for an unforgettable afternoon of dance, music, and fun! Contact for More Information: Mohil Patil (7822875590).'
    },
    'genesis': {
      title: 'GENESIS: Gen AI Workshop',
      date: '17 - 18 Oct (Sat - Sun) • 10:00 AM Onwards',
      venue: 'IT Seminar Hall, SIT Lonavala',
      category: 'Workshop + Hands-On • Certificate & Prizes',
      thumb: 'assets/event-genesis.png',
      desc: 'ACES Presents GENESIS: Gen AI Workshop. Learn | Build | Explore. From Ideas to Innovation—a hands-on workshop to explore the real-world potential of Generative AI. Features interactive modules, prompt engineering, practical project building, and certificates & prizes for participants. Exclusively for Computer Engineering department students.'
    }
  };

  // Open modal on clicking "View Details"
  document.querySelectorAll('[data-event-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventId = btn.getAttribute('data-event-id');
      const data = eventDataMap[eventId];

      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalDate.textContent = data.date;
        modalVenue.textContent = data.venue;
        modalCategory.textContent = data.category;
        modalDescription.textContent = data.desc;
        if (modalThumb) {
          modalThumb.src = data.thumb;
          modalThumb.alt = data.title;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close event modal helper
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Global escape key handler for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
      if (facultyModal && facultyModal.classList.contains('active')) {
        closeFacultyModal();
      }
    }
  });

  // ==========================================
  // 7. 3D TILT & INTERACTIVE GLASS SPOTLIGHT EFFECT
  // ==========================================
  const interactiveCards = document.querySelectorAll('.glass-card, .event-card, .faculty-scroll-card, .team-card, .stat-glass-card');
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle 3D perspective tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ==========================================
  // 8. HIGH-PERFORMANCE CONTINUOUS SCROLL ENGINE (Up & Down Animations)
  // ==========================================
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const floatingScrollWidget = document.getElementById('floating-scroll-widget');
  const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  const progressRingCircle = document.getElementById('progress-ring-circle');
  const scrollPercentText = document.getElementById('scroll-percent-text');
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-links-menu .nav-pill-item a');
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  // Ring Circumference calculation
  const circleRadius = 23;
  const circleCircumference = 2 * Math.PI * circleRadius; // ~144.51
  if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${circleCircumference} ${circleCircumference}`;
    progressRingCircle.style.strokeDashoffset = `${circleCircumference}`;
  }

  // Scroll to Top Listener
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 8B. 3D BACKGROUND LAPTOP FLAP & MOTION CONTROLLER
  // Eliminates flap disappearing glitch and glides the laptop across all website sections
  // ==========================================
  const laptopContainer = document.getElementById('scroll-laptop-bg');
  const laptopBody = document.getElementById('laptop-body');
  const laptopScreenFlap = document.getElementById('laptop-screen-flap');

  let updateLaptopTargets = null;

  if (laptopContainer && laptopBody && laptopScreenFlap) {
    let currentX = 0.72;
    let currentY = 0.45;
    let targetX = 0.72;
    let targetY = 0.45;
    let currentTiltX = 46;
    let currentTiltY = 12;
    let currentTiltZ = -6;
    let targetTiltX = 46;
    let targetTiltY = 12;
    let targetTiltZ = -6;
    let currentFlapAngle = -24;
    let targetFlapAngle = -24;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    // Interactive mouse parallax tilt
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      mouseParallaxX = normX * 10;
      mouseParallaxY = -normY * 8;
    }, { passive: true });

    updateLaptopTargets = function (scrollPercent) {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        targetX = 0.50;
        targetY = 0.46;
        targetTiltX = 44;
        targetTiltY = 4;
        targetTiltZ = -2;
        const openProgress = Math.min(scrollPercent * 3.0, 1);
        targetFlapAngle = -22 - (54 * openProgress);
      } else {
        // Multi-point gliding flight across sections:
        // Top/Hero: Right side (72%)
        // About ACES: Left side (18%)
        // Vision: Right side (72%)
        // Events: Left side (18%)
        // Directories & Contact: Center-Right (64%)
        const xCos = Math.cos(scrollPercent * Math.PI * 3.4);
        targetX = 0.45 + 0.27 * xCos;
        targetY = 0.45 + 0.10 * Math.sin(scrollPercent * Math.PI * 2.8);

        targetTiltX = 46 - (scrollPercent * 8);
        targetTiltY = -22 * Math.sin(scrollPercent * Math.PI * 3.4);
        targetTiltZ = 8 * Math.sin(scrollPercent * Math.PI * 3.4);

        // Flap opening target:
        // Flap starts open at -24deg at the top, showing the screen clearly,
        // and smoothly opens to -78deg (upright screen) as user scrolls down.
        const openProgress = Math.min(scrollPercent * 3.2, 1);
        targetFlapAngle = -24 - (54 * openProgress);
      }
    };

    // Initialize targets immediately for the initial view
    updateLaptopTargets(0);

    // Smooth continuous animation loop
    function animateLaptop(time) {
      const ease = 0.08;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      currentTiltX += (targetTiltX + mouseParallaxY - currentTiltX) * ease;
      currentTiltY += (targetTiltY + mouseParallaxX - currentTiltY) * ease;
      currentTiltZ += (targetTiltZ - currentTiltZ) * ease;
      currentFlapAngle += (targetFlapAngle - currentFlapAngle) * 0.12;

      // Gentle organic levitation hover
      const hoverOffset = Math.sin(time * 0.0018) * 8;
      const hoverTilt = Math.sin(time * 0.0014) * 1.6;

      laptopContainer.style.left = `${(currentX * 100).toFixed(2)}%`;
      laptopContainer.style.top = `calc(${(currentY * 100).toFixed(2)}% + ${hoverOffset.toFixed(1)}px)`;

      laptopBody.style.transform = `rotateX(${(currentTiltX + hoverTilt).toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) rotateZ(${currentTiltZ.toFixed(2)}deg)`;
      laptopScreenFlap.style.transform = `rotateX(${currentFlapAngle.toFixed(2)}deg)`;

      requestAnimationFrame(animateLaptop);
    }

    requestAnimationFrame(animateLaptop);
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScrollUpdate() {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;
    const percentInt = Math.round(scrollPercent * 100);

    // 1. Top Window Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${(scrollPercent * 100).toFixed(1)}%`;
    }

    // 2. Circular Progress Indicator & Back-to-Top Button
    if (progressRingCircle) {
      const offset = circleCircumference - (scrollPercent * circleCircumference);
      progressRingCircle.style.strokeDashoffset = `${offset}`;
    }
    if (scrollPercentText) {
      scrollPercentText.textContent = `${percentInt}%`;
    }
    if (floatingScrollWidget) {
      if (currentScrollY > 160) {
        floatingScrollWidget.classList.add('visible');
      } else {
        floatingScrollWidget.classList.remove('visible');
      }
    }

    // 3. Bi-Directional Scroll Direction Detection (Down vs Up)
    const scrollDelta = currentScrollY - lastScrollY;
    if (scrollDelta > 4 && currentScrollY > 70) {
      document.body.classList.add('scrolling-down');
      document.body.classList.remove('scrolling-up');
    } else if (scrollDelta < -4 && currentScrollY > 30) {
      document.body.classList.add('scrolling-up');
      document.body.classList.remove('scrolling-down');
    } else if (currentScrollY <= 30) {
      document.body.classList.remove('scrolling-down', 'scrolling-up');
    }

    // 4. Parallax Shift for Ambient Background Orbs
    if (orb1) {
      orb1.style.transform = `translate3d(0, ${(currentScrollY * 0.12).toFixed(1)}px, 0)`;
    }
    if (orb2) {
      orb2.style.transform = `translate3d(0, ${(-currentScrollY * 0.08).toFixed(1)}px, 0)`;
    }
    if (orb3) {
      const lateralShift = Math.sin(currentScrollY * 0.003) * 18;
      orb3.style.transform = `translate3d(${lateralShift.toFixed(1)}px, ${(currentScrollY * 0.06).toFixed(1)}px, 0)`;
    }

    // 4B. 3D Scroll-Driven Background Laptop Update
    if (updateLaptopTargets) {
      updateLaptopTargets(scrollPercent);
    }

    // 5. Active Section Tracking (Sticky Nav on Home Page)
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');
    if (isHomePage) {
      let currentSectionId = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;
        if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}` || link.getAttribute('href') === `index.html#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScrollUpdate);
      ticking = true;
    }
  }, { passive: true });

  // Initial trigger on load
  onScrollUpdate();

  // ==========================================
  // 9. SCROLL REVEAL (IntersectionObserver for Both Scroll Directions)
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
      // Immediately reveal if already in initial viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      }
    });
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================
  // 10. DYNAMIC STATS NUMBER COUNTER ON SCROLL
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  let statsCounted = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach((statEl) => {
          const target = parseInt(statEl.getAttribute('data-count'), 10);
          const suffix = statEl.getAttribute('data-suffix') || '';
          const duration = 1400; // ms
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            statEl.textContent = `${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              statEl.textContent = `${target}${suffix}`;
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const heroStatsRow = document.getElementById('hero-stats');
  if (heroStatsRow) {
    countUpObserver.observe(heroStatsRow);
  }

  console.log('✨ ACES Website Engine initialized: Letterhead, Faculty Carousel, Events, Hierarchical Team Council, Continuous Scroll Interactions.');
})();

