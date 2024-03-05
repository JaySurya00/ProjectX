import * as jose from 'jose';
const secret = new TextEncoder().encode(
    process.env.SECRET_KEY
  )
export const generateToken= async (userData)=>{
    const {_id:id, firstName, lastName }=   userData;
    const jwt= await new jose.SignJWT({userData:{id: id.toString(), name: firstName+' '+lastName}})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secret);
    
    return jwt;
}