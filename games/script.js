// =====================
// DADOS DOS JOGOS
// =====================

const gamesDatabase = [
    // Jogos de Carro
    {
        id: 1,
        title: 'Speed Racer Pro',
        category: 'cars',
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200/0066ff/ffffff?text=Speed+Racer',
        description: 'Corrida de alta velocidade em pistas futuristas com física realista.',
        popular: true,
        recent: true
    },
    {
        id: 2,
        title: 'Drift Master',
        category: 'cars',
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200/00ff66/000000?text=Drift+Master',
        description: 'Domine a arte do drift em circuitos icônicos mundiais.',
        popular: true,
        recommended: true
    },
    {
        id: 3,
        title: 'Off-Road Legends',
        category: 'cars',
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200/ff0066/ffffff?text=Off-Road',
        description: 'Dirija em terrenos selvagens e desafiadores.',
        recent: true
    },
    {
        id: 4,
        title: 'City Taxi Driver',
        category: 'cars',
        rating: 4.3,
        image: 'https://via.placeholder.com/300x200/ff1493/ffffff?text=Taxi+Driver',
        description: 'Navegue pelas ruas da cidade como um taxista experiente.',
        recommended: true
    },
    // Jogos de Cozinhar
    {
        id: 5,
        title: 'Cooking Quest',
        category: 'cooking',
        rating: 4.7,
        image: 'https://via.placeholder.com/300x200/0066ff/ffffff?text=Cooking+Quest',
        description: 'Prepare pratos incríveis em um ritmo frenético.',
        popular: true,
        recent: true
    },
    {
        id: 6,
        title: 'Chef Master',
        category: 'cooking',
        rating: 4.9,
        image: 'https://via.placeholder.com/300x200/00ff66/000000?text=Chef+Master',
        description: 'Torne-se o melhor chef do mundo culinário.',
        popular: true,
        recommended: true
    },
    {
        id: 7,
        title: 'Bakery Tycoon',
        category: 'cooking',
        rating: 4.4,
        image: 'https://via.placeholder.com/300x200/ff0066/ffffff?text=Bakery+Tycoon',
        description: 'Gerencie sua própria padaria e faça sucesso.',
        recent: true
    },
    {
        id: 8,
        title: 'Pizza Maker Pro',
        category: 'cooking',
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200/ff1493/ffffff?text=Pizza+Maker',
        description: 'Prepare as melhores pizzas da cidade.',
        recommended: true
    },
    // Jogos de Moda
    {
        id: 9,
        title: 'Fashion Designer',
        category: 'fashion',
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200/0066ff/ffffff?text=Fashion+Designer',
        description: 'Crie e customize roupas e acessórios únicos.',
        popular: true,
        recent: true
    },
    {
        id: 10,
        title: 'Makeup Artistry',
        category: 'fashion',
        rating: 4.7,
        image: 'https://via.placeholder.com/300x200/00ff66/000000?text=Makeup+Art',
        description: 'Aplique maquiagem profissional e transforme looks.',
        popular: true,
        recommended: true
    },
    {
        id: 11,
        title: 'Styling Studio',
        category: 'fashion',
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200/ff0066/ffffff?text=Styling+Studio',
        description: 'Combine estilos e crie looks incríveis.',
        recent: true
    },
    {
        id: 12,
        title: 'Dress Up Challenge',
        category: 'fashion',
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200/ff1493/ffffff?text=Dress+Up',
        description: 'Participe de desafios de moda e conquiste troféus.',
        recommended: true
    }
];

// =====================
// GERENCIAMENTO DE ESTADO
// =====================

const state = {
    currentTheme: localStorage.getItem('biano-theme') || 'blue',
    darkMode: localStorage.getItem('biano-darkMode') !== 'false',
    favorites: JSON.parse(localStorage.getItem('biano-favorites')) || [],
    selectedGame: null,
    currentCategory: 'all'
};

// =====================
// INICIALIZAÇÃO
// =====================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    applyTheme(state.currentTheme);
    applyDarkMode();
    renderGames();
    setupEventListeners();
}

// =====================
// SISTEMA DE TEMAS
// =====================

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    state.currentTheme = theme;
    localStorage.setItem('biano-theme', theme);
    
    // Atualizar botões ativos
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

function applyDarkMode() {
    if (state.darkMode) {
        document.body.classList.remove('light-mode');
        updateModeToggleIcon(true);
    } else {
        document.body.classList.add('light-mode');
        updateModeToggleIcon(false);
    }
    localStorage.setItem('biano-darkMode', state.darkMode);
}

function updateModeToggleIcon(isDark) {
    const btn = document.getElementById('modeToggle');
    if (isDark) {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// =====================
// RENDERIZAÇÃO DE JOGOS
// =====================

function renderGames() {
    const popularGames = gamesDatabase.filter(g => g.popular);
    const recentGames = gamesDatabase.filter(g => g.recent);
    const recommendedGames = gamesDatabase.filter(g => g.recommended);
    const favoriteGames = gamesDatabase.filter(g => state.favorites.includes(g.id));
    
    renderGameGrid('popularGames', popularGames);
    renderGameGrid('recentGames', recentGames);
    renderGameGrid('recommendedGames', recommendedGames);
    renderGameGrid('favoriteGames', favoriteGames);
    
    // Mostrar/ocultar seção de favoritos
    const favSection = document.getElementById('favoritesSection');
    if (favoriteGames.length > 0) {
        favSection.style.display = 'block';
    } else {
        favSection.style.display = 'none';
    }
}

function renderGameGrid(elementId, games) {
    const grid = document.getElementById(elementId);
    if (!grid) return;
    
    grid.innerHTML = games.map(game => createGameCard(game)).join('');
    attachGameCardListeners();
}

function createGameCard(game) {
    const isFavorited = state.favorites.includes(game.id);
    const stars = '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating));
    
    return `
        <div class="game-card" data-game-id="${game.id}">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-category">${getCategoryLabel(game.category)}</p>
                <div class="game-rating">
                    <span class="stars">${stars}</span>
                    <span>${game.rating}</span>
                </div>
            </div>
            <button class="game-favorite ${isFavorited ? 'liked' : ''}" data-game-id="${game.id}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
}

function getCategoryLabel(category) {
    const labels = {
        'cars': '🚗 Carros',
        'cooking': '🍳 Cozinhar',
        'fashion': '👗 Moda'
    };
    return labels[category] || 'Geral';
}

// =====================
// EVENT LISTENERS
// =====================

function setupEventListeners() {
    // Tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
        });
    });
    
    // Modo escuro/claro
    document.getElementById('modeToggle').addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        applyDarkMode();
    });
    
    // Hambúrguer
    document.getElementById('hamburger').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarClose').addEventListener('click', toggleSidebar);
    
    // Categorias
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            state.currentCategory = link.dataset.category;
            toggleSidebar();
        });
    });
    
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            state.currentCategory = card.dataset.category;
        });
    });
    
    // Busca
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Scroll to top
    window.addEventListener('scroll', toggleScrollToTopButton);
    document.getElementById('scrollToTop').addEventListener('click', scrollToTop);
    
    // Modal
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('gameModal').addEventListener('click', (e) => {
        if (e.target.id === 'gameModal') closeModal();
    });
    
    // Jogar
    document.getElementById('playBtn').addEventListener('click', handlePlay);
    document.getElementById('favBtn').addEventListener('click', handleFavoriteModal);
}

function attachGameCardListeners() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.game-favorite')) return;
            const gameId = parseInt(card.dataset.gameId);
            const game = gamesDatabase.find(g => g.id === gameId);
            openModal(game);
        });
    });
    
    document.querySelectorAll('.game-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.gameId));
        });
    });
}

// =====================
// SIDEBAR
// =====================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// =====================
// BUSCA
// =====================

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderGames();
        return;
    }
    
    const results = gamesDatabase.filter(game => 
        game.title.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('popularGames');
    grid.innerHTML = results.length > 0 
        ? results.map(game => createGameCard(game)).join('')
        : '<p style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary);">Nenhum jogo encontrado</p>';
    
    attachGameCardListeners();
}

// =====================
// FAVORITOS
// =====================

function toggleFavorite(gameId) {
    const index = state.favorites.indexOf(gameId);
    if (index > -1) {
        state.favorites.splice(index, 1);
        showNotification('Removido dos favoritos');
    } else {
        state.favorites.push(gameId);
        showNotification('Adicionado aos favoritos!');
    }
    localStorage.setItem('biano-favorites', JSON.stringify(state.favorites));
    renderGames();
}

// =====================
// MODAL
// =====================

function openModal(game) {
    state.selectedGame = game;
    document.getElementById('modalGameImage').src = game.image;
    document.getElementById('modalGameTitle').textContent = game.title;
    document.getElementById('modalGameDescription').textContent = game.description;
    document.getElementById('modalGameCategory').textContent = getCategoryLabel(game.category);
    document.getElementById('modalGameRating').innerHTML = `${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5 - Math.floor(game.rating))} ${game.rating}`;
    
    const favBtn = document.getElementById('favBtn');
    if (state.favorites.includes(game.id)) {
        favBtn.classList.add('liked');
        favBtn.innerHTML = '<i class="fas fa-heart"></i><span>Remover dos Favoritos</span>';
    } else {
        favBtn.classList.remove('liked');
        favBtn.innerHTML = '<i class="fas fa-heart"></i><span>Adicionar aos Favoritos</span>';
    }
    
    document.getElementById('gameModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('gameModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handlePlay() {
    if (state.selectedGame) {
        showNotification(`${state.selectedGame.title} iniciou em tela cheia!`);
        closeModal();
    }
}

function handleFavoriteModal() {
    if (state.selectedGame) {
        toggleFavorite(state.selectedGame.id);
        openModal(state.selectedGame);
    }
}

// =====================
// NOTIFICAÇÕES
// =====================

function showNotification(message) {
    const notification = document.getElementById('notification');
    document.getElementById('notificationText').textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// =====================
// SCROLL TO TOP
// =====================

function toggleScrollToTopButton() {
    const button = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// =====================
// UTILIDADES
// =====================

// Animação ao carregar página
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
