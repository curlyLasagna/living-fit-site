import express from 'express';
const router = express.Router();

import {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} from '../services/fees-services';

// Get all locations
router.get('/locations', async (req, res) => {
    try {
        const locations = await getAllLocations();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

// Get a single location by ID
router.get('/locations/:id', async (req, res) => {
    try {
        const location = await getLocationById(Number(req.params.id));
        if (!location) return res.status(404).json({ error: 'Location not found' });
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch location' });
    }
});

// Create a new location
router.post('/locations', async (req, res) => {
    try {
        const created = await createLocation(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create location' });
    }
});

// Update a location
router.put('/locations/:id', async (req, res) => {
    try {
        const updated = await updateLocation(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ error: 'Location not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update location' });
    }
});

// Delete a location
router.delete('/locations/:id', async (req, res) => {
    try {
        const deleted = await deleteLocation(Number(req.params.id));
        if (!deleted) return res.status(404).json({ error: 'Location not found' });
        res.json({ message: 'Location deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete location' });
    }
});

export default router;