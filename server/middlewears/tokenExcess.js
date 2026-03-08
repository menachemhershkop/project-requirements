import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function authToken(req, res, next){
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    
    next();
  });

}