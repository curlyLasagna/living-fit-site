import {
    getAllFees,
    getFeeById,
    createFee,
    updateFee,
    deleteFee,
    getFeesByLocation
} from '../services/fees-services';

export const handleGetAllFees = async (req, res) => {
    try {
        const allFees = await getAllFees();
        res.json(allFees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch fees', error: error.message });
    }
};

export const handleGetFeeById = async (req, res) => {
    try {
        const fee = await getFeeById(Number(req.params.id));
        if (!fee) return res.status(404).json({ message: 'Fee not found' });
        res.json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch fee', error: error.message });
    }
};

export const handleCreateFee = async (req, res) => {
    try {
        const created = await createFee(req.body);
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create fee', error: error.message });
    }
};

export const handleUpdateFee = async (req, res) => {
    try {
        const updated = await updateFee(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: 'Fee not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update fee', error: error.message });
    }
};

export const handleDeleteFee = async (req, res) => {
    try {
        const deleted = await deleteFee(Number(req.params.id));
        if (!deleted) return res.status(404).json({ message: 'Fee not found' });
        res.json({ message: 'Fee deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete fee', error: error.message });
    }
};

export const handleGetFeesByLocation = async (req, res) => {
    try {
        const fees = await getFeesByLocation(Number(req.params.locationId));
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch fees for location', error: error.message });
    }
};
