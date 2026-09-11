import mongoose from "mongoose"; 
 
export interface AccountCompany {
    companyName: string;
    password: string;
    email: string;
} 

const accountCompanySchema = new mongoose.Schema<AccountCompany>({
    companyName: {
        type: String,
        required: true,
        unique: false, 
    },
    password: {
        type: String, 
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true, 
    } 
},{
    timestamps: true // Thoi gian tao va cap nhat
}); 

export const AccountCompanyModel = mongoose.model<AccountCompany>('AccountCompany', accountCompanySchema, 'account-company');
