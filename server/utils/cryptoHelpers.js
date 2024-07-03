import crypto from 'crypto';

export function hashPassword(plainTextPassword) {
   const salt = crypto.randomBytes(16).toString('hex');
   const hash = crypto.createHmac('sha256', salt).update(plainTextPassword).digest('hex')
   return { salt, hash };
}


export function checkPasswordHash(pass, hash, salt) {
   const hashedPass = crypto.createHmac('sha256', salt).update(pass).digest('hex');
   return hash === hashedPass;
}