import express from 'express';
import {
    handleGetAllFees,
    handleGetFeeById,
    handleCreateFee,
    handleUpdateFee,
    handleDeleteFee,
    handleGetFeesByLocation
} from '../controllers/fees-controller';

const router = express.Router();

// Get all fees
router.get('/', handleGetAllFees);

// Get a single fee by ID
router.get('/:id', handleGetFeeById);

// Create a new fee
router.post('/', handleCreateFee);

// Update a fee
router.put('/:id', handleUpdateFee);

// Delete a fee
router.delete('/:id', handleDeleteFee);

// Get all fees for a specific location
router.get('/location/:locationId', handleGetFeesByLocation);

export default router;