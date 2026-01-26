/**
 * Bookmark Modal Component
 * Shows a confirmation popup when a bookmark button is clicked
 */

class BookmarkModal {
    static show(eventTitle, eventImage) {
        // Remove existing modal if any
        const existingModal = document.getElementById('bookmark-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal HTML
        const modalHTML = `
            <div id="bookmark-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                <div class="bg-white rounded-[20px] shadow-lg p-8 max-w-2xl w-full mx-4 animate-slideUp" onclick="event.stopPropagation()">
                    <!-- Event Image -->
                    <div class="w-full h-72 rounded-[20px] overflow-hidden mb-6">
                        <img src="${eventImage}" alt="${eventTitle}" class="w-full h-full object-cover">
                    </div>

                    <!-- Confirmation Checkmark -->
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 bg-stone-50 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(58,43,46,0.15)] flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                    </div>

                    <!-- Title -->
                    <h3 class="text-center text-lg font-bold text-gray-900 mb-2">Event in deinem Bereich gespeichert!</h3>
                    <p class="text-center text-sm text-gray-600 mb-6">${eventTitle}</p>

                    <!-- Close Button -->
                    <div class="flex justify-center px-6">
                        <button onclick="document.getElementById('bookmark-modal').remove()" class="btn-auth">
                            Schließen
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insert modal into DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Close modal on overlay click
        document.getElementById('bookmark-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });

        // Auto-close after 3 seconds
        setTimeout(() => {
            const modal = document.getElementById('bookmark-modal');
            if (modal) {
                modal.classList.add('animate-fadeOut');
                setTimeout(() => modal.remove(), 300);
            }
        }, 3000);
    }
}
