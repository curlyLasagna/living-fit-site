import { atom } from 'nanostores';

interface location {
    name: string;
    locationId: number;
}

// Fetch the default location from the API
let defaultLocation: location = { name: "", locationId: 0 };
(async () => {
    try {
        const response = await fetch("http://localhost:3000/api/locations");
        const locations = await response.json();
        if (locations.length > 0) {
            defaultLocation = {
                name: locations[0].name,
                locationId: locations[0].locationId,
            };
        }
    } catch (error) {
        console.error("Failed to fetch default location:", error);
    }
})();

export const selected_location = atom<location>(defaultLocation);