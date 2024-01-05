import jwt from 'jsonwebtoken';

const generateJwtToken = ({ email, role, id }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: process.env.JWT_ISSUER };
    const secret = process.env.JWT_SECRET;

    try {
        return jwt.sign({ email, role, id }, secret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
