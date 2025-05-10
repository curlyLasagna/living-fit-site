import {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} from "../services/locations-services";

export const handleGetAllLocations = async (req, res) => {
    try {
        const locations = await getAllLocations();
        return res.json(locations);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const handleGetLocationById = async (req, res) => {
    try {
        const location = await getLocationById(Number(req.params.id));
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        return res.json(location);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const handleCreateLocation = async (req, res) => {
    try {
        const newLocation = await createLocation(req.body);
        return res.status(201).json(newLocation);
    } catch (error) {
        return res.status(400).json({ message: "Failed to create location", error: error.message });
    }
};

export const handleUpdateLocation = async (req, res) => {
    try {
        const updated = await updateLocation(Number(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({ message: "Location not found" });
        }
        return res.json(updated);
    } catch (error) {
        return res.status(400).json({ message: "Failed to update location", error: error.message });
    }
};

export const handleDeleteLocation = async (req, res) => {
    try {
        const deleted = await deleteLocation(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: "Location not found" });
        }
        return res.json(deleted);
    } catch (error) {
        return res.status(400).json({ message: "Failed to delete location", error: error.message });
    }
};
