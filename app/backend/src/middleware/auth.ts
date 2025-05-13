import type { Request, Response } from 'express';
import type { NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });
const JWT_CONFIG: JWT.SignOptions = {
    expiresIn: '7d',
};

const JWT_SECRET = "skrrt";

export default function generateToken(userId: string): string {
    return JWT.sign({ userId }, JWT_SECRET, JWT_CONFIG);
}

export function verifyToken(token: string) {
    try {
        const data = JWT.verify(token, JWT_SECRET);

        return data as { userId: string };
    }
    catch (err) {
        if (err instanceof JWT.TokenExpiredError) {
            throw new Error('UNAUTHORIZED: Token expired');
        }
        throw new Error('UNAUTHORIZED: Invalid token');
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.living_fit_token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'UNAUTHORIZED: Missing token' });
    }

    try {
        const decoded = verifyToken(token);
        // Attach user info to the request object
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};