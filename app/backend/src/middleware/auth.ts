import JWT from 'jsonwebtoken';

const JWT_CONFIG: JWT.SignOptions = {
    expiresIn: '10m',
};

const { JWT_SECRET } = process.env || "skrrt";

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