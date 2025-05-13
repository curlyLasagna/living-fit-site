import express from 'express';
import {
    handleGetAllLocations,
    handleGetLocationById,
    handleCreateLocation,
    handleUpdateLocation,
    handleDeleteLocation
} from '../controllers/locations-controller';

const router = express.Router();

// GET /locations - Get all locations
router.get('/', handleGetAllLocations);

// GET /locations/:id - Get location by ID
router.get('/:id', handleGetLocationById);

// POST /locations - Create a new location
router.post('/', handleCreateLocation);

// PUT /locations/:id - Update a location
router.put('/:id', handleUpdateLocation);

// DELETE /locations/:id - Delete a location
router.delete('/:id', handleDeleteLocation);

export default router;