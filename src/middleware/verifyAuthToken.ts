import { RequestHandler } from 'express';
import { getTokenData } from '@/utils'
import { models as accessTokenModels } from '@/resources/accessTokens'

const verifyToken: RequestHandler = async (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  const bearerHeader = req.headers['authorization'];
  
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const user: accessTokenModels.Data = getTokenData(bearerToken);
    req.user = user;
    next();
  } else {
    // Forbidden
    res.status(401).json({ message: 'Authentication token is required' });
  }
}

export default verifyToken;
