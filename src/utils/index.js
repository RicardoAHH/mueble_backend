export const hashPassword = async (password) => {
    const bcrypt = await import('bcrypt');
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const generateToken = async (user) => {
    const jwt = await import('jsonwebtoken');
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
};

export const validateSchema =  async (schema, data) => {
    const Joi = await import('joi');
    return schema.validate(data);
};