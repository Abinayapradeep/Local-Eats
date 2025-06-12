// Global variables
let currentPage = 'home';
let filteredMarkets = [...markets];
let selectedCategories = [];
let mapInstance = null;
let selectedMarketId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load initial page
    showPage('home');
    
    // Populate categories
    populateCategories();
    populateFeaturedMarkets();
    populateAllMarkets();
    populateAllCategories();
    populateCategoryFilters();
    
    // Initialize maps
    initializeHomeMap();
    
    // Add event listeners
    addEventListeners();
}

// Navigation functions
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    updateNavigation(pageName);
    
    // Update current page
    currentPage = pageName;
    
    // Initialize page-specific functionality
    switch(pageName) {
        case 'home':
            initializeHomeMap();
            break;
        case 'markets':
            updateMarketsPage();
            break;
        case 'map':
            setTimeout(() => initializeInteractiveMap(), 100);
            break;
    }
}

function updateNavigation(activePage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.onclick && link.onclick.toString().includes(activePage)) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    // Mobile menu functionality can be added here
    console.log('Mobile menu toggled');
}

// Category functions
function populateCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    productCategories.slice(0, 10).forEach(category => {
        const categoryElement = createCategoryElement(category);
        container.appendChild(categoryElement);
    });
}

function populateAllCategories() {
    const container = document.getElementById('all-categories');
    if (!container) return;
    
    container.innerHTML = '';
    
    productCategories.forEach(category => {
        const categoryElement = createCategoryElement(category, true);
        container.appendChild(categoryElement);
    });
}

function createCategoryElement(category, showCount = false) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-card';
    categoryDiv.onclick = () => filterByCategory(category.name);
    
    const marketsCount = showCount ? 
        ` (${markets.filter(m => m.categories.includes(category.name)).length})` : '';
    
    categoryDiv.innerHTML = `
        <div class="icon">${category.icon}</div>
        <div class="name">${category.name}${marketsCount}</div>
    `;
    
    return categoryDiv;
}

function filterByCategory(categoryName) {
    selectedCategories = [categoryName];
    showPage('markets');
    updateMarketsPage();
}

// Market functions
function populateFeaturedMarkets() {
    const container = document.getElementById('featured-markets');
    if (!container) return;
    
    container.innerHTML = '';
    
    const featuredMarkets = markets.slice(0, 3);
    featuredMarkets.forEach(market => {
        const marketElement = createMarketCard(market);
        container.appendChild(marketElement);
    });
}

function populateAllMarkets() {
    const container = document.getElementById('all-markets');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredMarkets.length === 0) {
        container.innerHTML = `
            <div class="card" style="grid-column: 1 / -1; padding: 40px; text-align: center;">
                <h3>No markets found</h3>
                <p style="color: var(--text-light); margin-top: 10px;">
                    Try adjusting your search criteria or filters.
                </p>
            </div>
        `;
        return;
    }
    
    filteredMarkets.forEach(market => {
        const marketElement = createMarketCard(market);
        container.appendChild(marketElement);
    });
}

function createMarketCard(market) {
    const marketDiv = document.createElement('div');
    marketDiv.className = 'card market-card';
    marketDiv.onclick = () => viewMarketDetails(market.id);
    
    marketDiv.innerHTML = `
        <img src="${market.imageUrl}" alt="${market.name}" onerror="this.src='https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400'">
        <div class="market-card-content">
            <h3>${market.name}</h3>
            <div class="location">${market.city}, ${market.state}</div>
            <div class="description">${market.description.substring(0, 100)}...</div>
            <div class="rating">
                <span class="star">⭐</span>
                <span>${market.averageRating.toFixed(1)}</span>
            </div>
            <div class="categories-tags">
                ${market.categories.slice(0, 3).map(cat => 
                    `<span class="category-tag">${cat}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return marketDiv;
}

function viewMarketDetails(marketId) {
    // In a real app, this would navigate to a details page
    const market = markets.find(m => m.id === marketId);
    if (market) {
        alert(`Viewing details for ${market.name}\n\nAddress: ${market.address}, ${market.city}\nRating: ${market.averageRating}/5\n\nDescription: ${market.description}`);
    }
}

// Filter functions
function populateCategoryFilters() {
    const containers = [
        document.getElementById('category-filters'),
        document.getElementById('map-category-filters')
    ];
    
    containers.forEach(container => {
        if (!container) return;
        
        container.innerHTML = '';
        
        // Add "All" filter
        const allFilter = document.createElement('div');
        allFilter.className = 'category-filter';
        allFilter.textContent = 'All';
        allFilter.onclick = () => toggleCategoryFilter('all', container);
        if (selectedCategories.length === 0) {
            allFilter.classList.add('active');
        }
        container.appendChild(allFilter);
        
        // Add category filters
        productCategories.forEach(category => {
            const filterDiv = document.createElement('div');
            filterDiv.className = 'category-filter';
            filterDiv.textContent = category.name;
            filterDiv.onclick = () => toggleCategoryFilter(category.name, container);
            
            if (selectedCategories.includes(category.name)) {
                filterDiv.classList.add('active');
            }
            
            container.appendChild(filterDiv);
        });
    });
}

function toggleCategoryFilter(categoryName, container) {
    if (categoryName === 'all') {
        selectedCategories = [];
    } else {
        const index = selectedCategories.indexOf(categoryName);
        if (index > -1) {
            selectedCategories.splice(index, 1);
        } else {
            selectedCategories.push(categoryName);
        }
    }
    
    // Update filter appearance
    const filters = container.querySelectorAll('.category-filter');
    filters.forEach(filter => {
        filter.classList.remove('active');
        if ((filter.textContent === 'All' && selectedCategories.length === 0) ||
            selectedCategories.includes(filter.textContent)) {
            filter.classList.add('active');
        }
    });
    
    // Update filtered markets
    updateFilteredMarkets();
    
    // Update page based on current context
    if (currentPage === 'markets') {
        updateMarketsPage();
    } else if (currentPage === 'map') {
        updateMapMarkers();
    }
}

function updateFilteredMarkets() {
    if (selectedCategories.length === 0) {
        filteredMarkets = [...markets];
    } else {
        filteredMarkets = markets.filter(market => 
            market.categories.some(cat => selectedCategories.includes(cat))
        );
    }
}

function updateMarketsPage() {
    updateFilteredMarkets();
    populateAllMarkets();
    
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const count = filteredMarkets.length;
        resultsCount.textContent = `${count} ${count === 1 ? 'Market' : 'Markets'} Found`;
    }
}

// Search functions
function searchMarkets() {
    const locationInput = document.getElementById('location-search');
    const location = locationInput ? locationInput.value : '';
    
    if (location.trim()) {
        // In a real app, this would perform geolocation search
        alert(`Searching for markets near: ${location}`);
        showPage('markets');
    }
}

function addEventListeners() {
    // Search input for markets page
    const marketSearch = document.getElementById('market-search');
    if (marketSearch) {
        marketSearch.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query === '') {
                updateFilteredMarkets();
            } else {
                filteredMarkets = markets.filter(market => 
                    market.name.toLowerCase().includes(query) ||
                    market.description.toLowerCase().includes(query) ||
                    market.city.toLowerCase().includes(query)
                );
            }
            populateAllMarkets();
            updateResultsCount();
        });
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            sortMarkets(e.target.value);
        });
    }
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const count = filteredMarkets.length;
        resultsCount.textContent = `${count} ${count === 1 ? 'Market' : 'Markets'} Found`;
    }
}

function sortMarkets(sortBy) {
    switch(sortBy) {
        case 'name':
            filteredMarkets.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filteredMarkets.sort((a, b) => b.averageRating - a.averageRating);
            break;
        case 'distance':
        default:
            // Default sorting (distance would require user location)
            break;
    }
    populateAllMarkets();
}

// Map functions
function initializeHomeMap() {
    const mapContainer = document.getElementById('home-map');
    if (!mapContainer || mapInstance) return;
    
    // Center on Springfield, IL
    const center = [39.7817, -89.6501];
    
    mapInstance = L.map('home-map').setView(center, 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);
    
    // Add market markers
    markets.forEach(market => {
        const marker = L.marker([market.latitude, market.longitude]).addTo(mapInstance);
        
        const popupContent = `
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 5px 0; font-weight: bold;">${market.name}</h3>
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">
                    ${market.address}, ${market.city}, ${market.state}
                </p>
                <div style="display: flex; align-items: center; margin: 5px 0;">
                    <span style="color: #f4a261; margin-right: 5px;">⭐</span>
                    <span style="font-size: 12px;">${market.averageRating.toFixed(1)}</span>
                </div>
                <a href="#" onclick="viewMarketDetails('${market.id}')" 
                   style="font-size: 12px; color: #4a7c59; font-weight: 600;">
                    View Details
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
}

function initializeInteractiveMap() {
    const mapContainer = document.getElementById('interactive-map');
    if (!mapContainer) return;
    
    // Clear existing map
    mapContainer.innerHTML = '';
    
    // Center on Springfield, IL
    const center = [39.7817, -89.6501];
    
    const interactiveMap = L.map('interactive-map').setView(center, 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(interactiveMap);
    
    // Store map reference for updates
    window.interactiveMapInstance = interactiveMap;
    
    // Update markers and market list
    updateMapMarkers();
    updateMapMarketsList();
}

function updateMapMarkers() {
    const map = window.interactiveMapInstance;
    if (!map) return;
    
    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    // Add filtered market markers
    filteredMarkets.forEach(market => {
        const marker = L.marker([market.latitude, market.longitude]).addTo(map);
        
        const popupContent = `
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 5px 0; font-weight: bold;">${market.name}</h3>
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">
                    ${market.address}, ${market.city}, ${market.state}
                </p>
                <div style="display: flex; align-items: center; margin: 5px 0;">
                    <span style="color: #f4a261; margin-right: 5px;">⭐</span>
                    <span style="font-size: 12px;">${market.averageRating.toFixed(1)}</span>
                </div>
                <a href="#" onclick="selectMarketFromMap('${market.id}')" 
                   style="font-size: 12px; color: #4a7c59; font-weight: 600;">
                    View Details
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Add click handler for marker selection
        marker.on('click', () => selectMarketFromMap(market.id));
    });
}

function updateMapMarketsList() {
    const container = document.getElementById('map-markets-list');
    const countElement = document.getElementById('map-results-count');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (countElement) {
        countElement.textContent = `(${filteredMarkets.length})`;
    }
    
    if (filteredMarkets.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #718096;">
                No markets match your selected filters.
            </div>
        `;
        return;
    }
    
    filteredMarkets.forEach(market => {
        const marketItem = document.createElement('div');
        marketItem.className = 'market-list-item';
        marketItem.onclick = () => selectMarketFromMap(market.id);
        
        if (selectedMarketId === market.id) {
            marketItem.classList.add('selected');
        }
        
        marketItem.innerHTML = `
            <h4>${market.name}</h4>
            <div class="location">${market.city}, ${market.state}</div>
            <div class="info">
                <div class="rating">
                    <span class="star">⭐</span>
                    <span>${market.averageRating.toFixed(1)}</span>
                </div>
                <div style="font-size: 0.8rem; color: #718096;">
                    ${market.hours[0]?.day}: ${market.hours[0]?.open}-${market.hours[0]?.close}
                </div>
            </div>
        `;
        
        container.appendChild(marketItem);
    });
}

function selectMarketFromMap(marketId) {
    selectedMarketId = marketId;
    const market = markets.find(m => m.id === marketId);
    
    if (!market) return;
    
    // Update market list selection
    const listItems = document.querySelectorAll('.market-list-item');
    listItems.forEach(item => item.classList.remove('selected'));
    
    const selectedItem = Array.from(listItems).find(item => 
        item.querySelector('h4').textContent === market.name
    );
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    // Show market details
    showMarketDetails(market);
    
    // Center map on selected market
    if (window.interactiveMapInstance) {
        window.interactiveMapInstance.setView([market.latitude, market.longitude], 14);
    }
}

function showMarketDetails(market) {
    const detailsContainer = document.getElementById('selected-market-details');
    if (!detailsContainer) return;
    
    detailsContainer.classList.remove('hidden');
    detailsContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
            <div>
                <h3>${market.name}</h3>
                <div class="location">${market.address}, ${market.city}, ${market.state}</div>
            </div>
            <div style="display: flex; align-items: center;">
                <span class="star">⭐</span>
                <span style="margin-left: 5px; font-weight: 600;">${market.averageRating.toFixed(1)}</span>
            </div>
        </div>
        
        <div class="description">${market.description}</div>
        
        <div class="hours">
            <h4>Hours:</h4>
            ${market.hours.map(hour => `
                <div class="hour-item">
                    <span>${hour.day}</span>
                    <span>${hour.open} - ${hour.close}</span>
                </div>
            `).join('')}
        </div>
        
        <button class="btn btn-secondary" onclick="viewMarketDetails('${market.id}')" 
                style="width: 100%; margin-top: 15px;">
            View Full Details
        </button>
    `;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize search with debounce
document.addEventListener('DOMContentLoaded', function() {
    const marketSearch = document.getElementById('market-search');
    if (marketSearch) {
        marketSearch.addEventListener('input', debounce(function(e) {
            // Search functionality is already handled in addEventListeners
        }, 300));
    }
});
