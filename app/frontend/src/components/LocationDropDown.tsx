import type React from "react"
import { useEffect, useState } from "react"
import { selected_location } from "@/store";
import { useStore } from "@nanostores/react";


export const LocationDropDown = () => {
    const selectedLocation = useStore(selected_location);
    const [locations, setLocation] = useState<{
        locationId: number;
        name: string;
        address: string;
    }[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3000/api/locations");
            const data = await res.json();
            setLocation(data);
        })()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        const selectedLocation = locations.find((location) => location.name === selectedName);
        if (selectedLocation) {
            // Store the entire location object in the atom
            selected_location.set(selectedLocation);
        }
    }

    return (
        < select
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-dark-text leading-tight focus:outline-none focus:shadow-outline"
            name="location"
            value={selectedLocation.name || ""}
            onChange={handleChange}
        >
            <option value="">Select a location</option>
            {
                locations.map(location => (
                    <option key={location.locationId} value={location.name}>{location.name}</option>
                ))}
        </select >
    )
}