// ========================================
// MENU MOBILE TOGGLE
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// CONTADOR REGRESSIVO
// ========================================

function initCountdown() {
    // Define a data final da promoção (Black Friday - 29 de novembro de 2024, 23:59:59)
    const countdownDate = new Date('November 29, 2024 23:59:59').getTime();
    
    // Atualiza o contador a cada segundo
    const countdownInterval = setInterval(() => {
        // Data e hora atuais
        const now = new Date().getTime();
        
        // Diferença entre a data final e a data atual
        const distance = countdownDate - now;
        
        // Cálculos para dias, horas, minutos e segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualiza os elementos HTML
        document.getElementById('days').textContent = formatNumber(days);
        document.getElementById('hours').textContent = formatNumber(hours);
        document.getElementById('minutes').textContent = formatNumber(minutes);
        document.getElementById('seconds').textContent = formatNumber(seconds);
        
        // Se o contador chegar a zero, exibe mensagem
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem; font-weight: 700;">Promoção Encerrada!</p>';
        }
    }, 1000);
}

// Formata números para sempre exibir dois dígitos (ex: 09, 08, 07)
function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

// Inicializa o contador quando a página carregar
initCountdown();

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================

const backToTopButton = document.getElementById('backToTop');

// Mostra/esconde o botão baseado no scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Ação do botão - scroll suave para o topo
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// ANIMAÇÃO DE SCROLL (FADE-IN)
// ========================================

function handleScrollAnimation() {
    const elements = document.querySelectorAll('.book-card, .benefit-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializa as animações de scroll
handleScrollAnimation();

// ========================================
// SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// EFEITO DE PARALLAX NO HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// ADICIONAR AO CARRINHO (SIMULAÇÃO)
// ========================================

const buyButtons = document.querySelectorAll('.btn-buy');

buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Pega o título do livro
        const bookCard = this.closest('.book-card');
        const bookTitle = bookCard.querySelector('.book-title').textContent;
        const bookPrice = bookCard.querySelector('.price-new').textContent;
        
        // Animação do botão
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        this.style.background = '#28a745';
        
        // Exibe mensagem de sucesso (você pode substituir por um toast/notification mais elaborado)
        showNotification(`${bookTitle} adicionado por ${bookPrice}!`);
        
        // Restaura o botão após 2 segundos
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// ========================================
// SISTEMA DE NOTIFICAÇÃO
// ========================================

function showNotification(message) {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Adiciona estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    // Adiciona ao body
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adiciona animações CSS para notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// QUICK VIEW (VISTA RÁPIDA)
// ========================================

// Dados dos livros
const booksData = {
    1: {
        title: "O Senhor dos Anéis",
        author: "J.R.R. Tolkien",
        badge: "-70%",
        priceOld: "R$ 149,90",
        priceNew: "R$ 44,97",
        rating: 4.5,
        description: "Uma épica aventura de fantasia que narra a jornada de Frodo Bolseiro para destruir o Um Anel e salvar a Terra-média das forças das trevas. Uma obra-prima da literatura fantástica que encantou gerações.",
        image: "images/senhor-dos-aneis.jpg"
    },
    2: {
        title: "1984",
        author: "George Orwell",
        badge: "-65%",
        priceOld: "R$ 89,90",
        priceNew: "R$ 31,47",
        rating: 5.0,
        description: "Um clássico distópico que apresenta um futuro totalitário onde o Grande Irmão vigia tudo. Uma crítica poderosa sobre controle, manipulação e perda de liberdade individual.",
        image: "images/1984.jpg"
    },
    3: {
        title: "Harry Potter e a Pedra Filosofal",
        author: "J.K. Rowling",
        badge: "-60%",
        priceOld: "R$ 119,90",
        priceNew: "R$ 47,96",
        rating: 4.9,
        description: "O primeiro livro da saga mágica que conquistou o mundo. Acompanhe Harry Potter em sua descoberta do mundo mágico e suas aventuras em Hogwarts.",
        image: "images/harry-potter.jpg"
    },
    4: {
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        badge: "-55%",
        priceOld: "R$ 59,90",
        priceNew: "R$ 26,96",
        rating: 4.7,
        description: "Uma fábula poética e filosófica sobre amor, amizade, perda e solidão. Um clássico atemporal que toca corações de todas as idades com suas profundas reflexões sobre a vida.",
        image: "images/pequeno-principe.svg"
    },
    5: {
        title: "A Revolução dos Bichos",
        author: "George Orwell",
        badge: "-68%",
        priceOld: "R$ 79,90",
        priceNew: "R$ 25,57",
        rating: 4.8,
        description: "Uma sátira política brilhante que usa animais de uma fazenda para criticar regimes totalitários. Uma alegoria poderosa sobre poder, corrupção e revolução.",
        image: "images/revolucao-bichos.svg"
    },
    6: {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        badge: "-62%",
        priceOld: "R$ 69,90",
        priceNew: "R$ 26,56",
        rating: 4.2,
        description: "Romance clássico da literatura brasileira que narra a história de Bentinho e sua obsessão por Capitu. Uma obra-prima que explora ciúmes, memória e a ambiguidade das relações humanas.",
        image: "images/dom-casmurro.svg"
    }
};

const modal = document.getElementById('quickViewModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const quickViewButtons = document.querySelectorAll('.btn-quick-view');

quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const bookCard = this.closest('.book-card');
        const bookId = bookCard.getAttribute('data-book');
        const bookData = booksData[bookId];
        
        if (bookData) {
            // Preenche os dados do modal
            document.getElementById('modalBookImage').src = bookData.image;
            document.getElementById('modalBookImage').alt = bookData.title;
            document.getElementById('modalBadge').textContent = bookData.badge;
            document.getElementById('modalTitle').textContent = bookData.title;
            document.getElementById('modalAuthor').textContent = bookData.author;
            document.getElementById('modalPriceOld').textContent = bookData.priceOld;
            document.getElementById('modalPriceNew').textContent = bookData.priceNew;
            document.getElementById('modalDescription').textContent = bookData.description;
            
            // Cria as estrelas de avaliação
            const ratingContainer = document.getElementById('modalRating');
            ratingContainer.innerHTML = '';
            const fullStars = Math.floor(bookData.rating);
            const hasHalfStar = bookData.rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                ratingContainer.innerHTML += '<i class="fas fa-star"></i>';
            }
            if (hasHalfStar) {
                ratingContainer.innerHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            const emptyStars = 5 - Math.ceil(bookData.rating);
            for (let i = 0; i < emptyStars; i++) {
                ratingContainer.innerHTML += '<i class="far fa-star"></i>';
            }
            ratingContainer.innerHTML += `<span>(${bookData.rating})</span>`;
            
            // Mostra o modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fechar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Botão de compra no modal
document.getElementById('modalBuyBtn').addEventListener('click', function() {
    const title = document.getElementById('modalTitle').textContent;
    const price = document.getElementById('modalPriceNew').textContent;
    
    showNotification(`${title} adicionado por ${price}!`);
    
    // Fecha o modal após adicionar
    setTimeout(() => {
        closeModal();
    }, 500);
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', () => {
    // Remove qualquer tela de loading se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Adiciona classe de carregamento completo
    document.body.classList.add('loaded');
});

// ========================================
// PREVENÇÃO DE SCROLL HORIZONTAL
// ========================================

function preventHorizontalScroll() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.overflowX = 'hidden';
    html.style.overflowX = 'hidden';
}

preventHorizontalScroll();

// ========================================
// CONSOLE LOG - EASTER EGG
// ========================================

console.log('%c🎉 Black Friday dos Livros! 🎉', 'color: #E50914; font-size: 24px; font-weight: bold;');
console.log('%cAté 70% OFF em milhares de títulos!', 'color: #000; font-size: 16px;');
console.log('%cDesenvolvido com ❤️', 'color: #E50914; font-size: 12px;');

// ========================================
// PERFORMANCE MONITORING (OPCIONAL)
// ========================================

if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}
