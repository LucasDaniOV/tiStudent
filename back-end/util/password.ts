import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12);
};

const comparePasswordWithHash = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export { hashPassword, comparePasswordWithHash };
