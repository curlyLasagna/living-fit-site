import express from 'express';
import {
    handleGetAllLocations,
    handleGetLocationById,
    handleCreateLocation,
    handleUpdateLocation,
    handleDeleteLocation
} from '../controllers/locations-controller';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /locations - Get all locations
router.get('/', handleGetAllLocations);

// GET /locations/:id - Get location by ID
router.get('/:id', handleGetLocationById);

// POST /locations - Create a new location
router.post('/', authenticateToken, handleCreateLocation);

// PUT /locations/:id - Update a location
router.put('/:id', authenticateToken, handleUpdateLocation);

// DELETE /locations/:id - Delete a location
router.delete('/:id', authenticateToken, handleDeleteLocation);

export default router;