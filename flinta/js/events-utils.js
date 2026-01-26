// Event card templates and utility functions

function createCarouselCard(event, index) {
    const displayLocation = event.location || event.organiser || '';
    const hasLocation = event.location;
    const eventId = `carousel-${index}`;
    
    return `
        <div class="flex-shrink-0 w-52 sm:w-56 md:w-60 lg:w-64 xl:w-64 min-w-52 sm:min-w-56 md:min-w-60 lg:min-w-64 xl:min-w-64 max-w-52 sm:max-w-56 md:max-w-60 lg:max-w-64 xl:max-w-64 bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col relative">
            <button onclick="event.stopPropagation(); toggleBookmark('${eventId}', '${event.title}', '${event.image}')" class="bookmark-btn absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition" data-event-id="${eventId}">
                <svg class="w-4 h-4 bookmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
            </button>
            <a href="event.html?id=${eventId}" class="flex flex-col flex-grow">
                <div class="h-32 bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src="${event.image}" alt="" class="w-full h-full object-cover">
                </div>
                <div class="p-3 space-y-1 flex flex-col flex-grow">
                    <span class="btn-tag">${event.category}</span>
                    <h3 class="font-bold text-sm">${event.title}</h3>
                    ${displayLocation ? `<p class="text-xs text-gray-500 ${hasLocation ? 'underline' : ''}">${displayLocation}</p>` : ''}
                    <p class="text-xs text-gray-400 mt-auto" data-date="${event.date}">${event.date} · ${event.time}</p>
                </div>
            </a>
        </div>
    `;
}

function createGridCard(event, index) {
    const displayLocation = event.location || event.organiser || '';
    const hasLocation = event.location;
    const eventId = `grid-${index}`;
    
    return `
        <div class="event-card w-full bg-white rounded-2xl shadow-sm overflow-hidden relative hover:shadow-lg transition-shadow duration-300${event.visible ? '' : ' hidden'}" data-event-date="${event.date}">
            <button onclick="event.stopPropagation(); toggleBookmark('${eventId}', '${event.title}', '${event.image}')" class="bookmark-btn absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition" data-event-id="${eventId}">
                <svg class="w-4 h-4 bookmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
            </button>
            <a href="event.html?id=${eventId}" class="block">
                <div class="h-32 bg-gray-200 overflow-hidden">
                    <img src="${event.image}" alt="" class="w-full h-full object-cover">
                </div>
                <div class="p-3 space-y-1">
                    <span class="btn-tag">${event.category}</span>
                    <h3 class="font-bold text-sm">${event.title}</h3>
                    ${displayLocation ? `<p class="text-xs text-gray-500 ${hasLocation ? 'underline' : ''}">${displayLocation}</p>` : ''}
                    <p class="text-xs text-gray-400">${event.date} · ${event.time}</p>
                </div>
            </a>
        </div>
    `;
}

function renderCarouselEvents(data) {
    const carousel = document.getElementById('event-carousel');
    carousel.innerHTML = data.carousel.map((event, index) => createCarouselCard(event, index)).join('');
    
    // Create dots dynamically based on number of carousel items
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = data.carousel.map((_, index) => 
        `<button class="carousel-dot w-2 h-2 rounded-full ${index === 0 ? 'bg-gray-400' : 'bg-gray-300'} transition-all duration-300 hover:scale-125" data-index="${index}"></button>`
    ).join('');
}

function renderGridEvents(data) {
    const grid = document.getElementById('event-grid');
    grid.innerHTML = data.grid.map((event, index) => createGridCard(event, index)).join('');
}

// Parse date from DD.MM.YYYY format
function parseDate(dateStr) {
    const match = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (match) {
        const [_, day, month, year] = match;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return null;
}

// Cookie utilities for bookmarks
function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

// Toggle bookmark state and show modal only on add
function toggleBookmark(eventId, eventTitle, eventImage) {
    const bookmarks = getBookmarkedEvents();
    const index = bookmarks.indexOf(eventId);
    const isAdding = index === -1;
    
    if (isAdding) {
        bookmarks.push(eventId);
    } else {
        bookmarks.splice(index, 1);
    }
    
    setCookie('bookmarked_events', JSON.stringify(bookmarks));
    updateBookmarkUI();
    
    // Show modal only when adding bookmark
    if (isAdding && typeof BookmarkModal !== 'undefined' && eventTitle && eventImage) {
        BookmarkModal.show(eventTitle, eventImage);
    }
}

// Get bookmarked events
function getBookmarkedEvents() {
    const bookmarks = getCookie('bookmarked_events');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

// Update bookmark button UI
function updateBookmarkUI() {
    const bookmarks = getBookmarkedEvents();
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    
    bookmarkBtns.forEach(btn => {
        const eventId = btn.getAttribute('data-event-id');
        const icon = btn.querySelector('.bookmark-icon');
        
        if (bookmarks.includes(eventId)) {
            icon.setAttribute('fill', 'currentColor');
        } else {
            icon.setAttribute('fill', 'none');
        }
    });
}
