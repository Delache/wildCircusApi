import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role === 'admin') {
        next();
    } else {
        res.status(401);
    }
};
