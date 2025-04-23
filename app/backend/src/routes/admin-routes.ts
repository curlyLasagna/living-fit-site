import type { Router } from 'express';
import { createRouter } from '../utils/create';

export default createRouter((router: Router) => {
    router.post('/register');
})