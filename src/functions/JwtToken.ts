import jwt from "jsonwebtoken";

export const geneTokens = async (data: any) => {
    return await jwt.sign({ ...data }, process.env.JWT_PRIVATE_KEY || 'manOnline8080');
};
