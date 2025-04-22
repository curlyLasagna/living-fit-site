import type { Router } from 'express';
import { createRouter } from '../utils/create';
import { handleAddMember } from '../controllers/user-controller';

export default createRouter((router: Router) => {
    router.post('/register', handleAddMember);
})