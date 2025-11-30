// ===== GOMAP.AZ MODULE WRAPPER =====
// This module provides easy-to-use functions for GoMap.az integration

class CommunityMap {
    constructor(containerId = 'map-container') {
        this.containerId = containerId;
        this.map = null;
        this.markers = [];
        this.init();
    }

    /**
     * Initialize the GoMap.az map
     */
    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with ID "${this.containerId}" not found`);
            return;
        }

        try {
            // Initialize GoMap with default settings for Azerbaijan/Baku
            this.map = new gomap.Map({
                element: container,
                center: [40.3855, 49.8671], // Baku coordinates
                zoom: 12,
                draggable: true,
                zoomable: true,
                rotatable: false,
                scalable: true
            });

            console.log('GoMap.az initialized successfully');
            this.setupDefaultMarkers();
        } catch (error) {
            console.error('Error initializing GoMap:', error);
            this.showFallbackMap();
        }
    }

    /**
     * Add a marker to the map
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @param {string} title - Marker title
     * @param {string} description - Marker description
     * @param {string} type - Marker type (event, garden, recycling, user)
     */
    addMarker(lat, lng, title, description, type = 'event') {
        if (!this.map) {
            console.warn('Map not initialized');
            return null;
        }

        const marker = new gomap.Marker({
            position: [lat, lng],
            title: title,
            description: description,
            type: type
        });

        marker.addTo(this.map);
        this.markers.push(marker);

        return marker;
    }

    /**
     * Remove a marker from the map
     * @param {number} index - Marker index
     */
    removeMarker(index) {
        if (index >= 0 && index < this.markers.length) {
            this.markers[index].remove();
            this.markers.splice(index, 1);
        }
    }

    /**
     * Clear all markers
     */
    clearMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }

    /**
     * Set map center
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @param {number} zoom - Zoom level
     */
    setCenter(lat, lng, zoom = 12) {
        if (this.map) {
            this.map.setCenter([lat, lng]);
            if (zoom) {
                this.map.setZoom(zoom);
            }
        }
    }

    /**
     * Setup default community markers
     */
    setupDefaultMarkers() {
        // Recycling Center
        this.addMarker(40.3960, 49.8671, 'Central Recycling Center', 'Drop-off point for recyclables', 'recycling');

        // Community Garden
        this.addMarker(40.4000, 49.8500, 'Green Community Garden', 'Urban gardening project', 'garden');

        // Eco-Event
        this.addMarker(40.3850, 49.8800, 'Beach Cleanup Event', 'Monthly community cleanup', 'event');

        // User Activity
        this.addMarker(40.3900, 49.8650, 'Active Community Members', 'Join local eco-warriors', 'user');
    }

    /**
     * Filter markers by type
     * @param {string} type - Marker type to show
     */
    filterByType(type) {
        if (!this.map) return;

        this.markers.forEach(marker => {
            if (type === 'all' || marker.type === type) {
                marker.show();
            } else {
                marker.hide();
            }
        });
    }

    /**
     * Show fallback message if GoMap fails to load
     */
    showFallbackMap() {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; color: white; font-size: 18px; text-align: center;">
                    <div>
                        <p>📍 GoMap service temporarily unavailable</p>
                        <p style="font-size: 14px; margin-top: 10px;">Map features will be available shortly</p>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gomap !== 'undefined') {
        window.communityMap = new CommunityMap('map-container');
    } else {
        console.warn('GoMap.az not loaded. Ensure the library is properly loaded.');
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommunityMap;
}
