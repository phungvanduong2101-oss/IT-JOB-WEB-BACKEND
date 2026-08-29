import mongoose from "mongoose"; 
 
export interface AccountUser {
    fullName: string;
    password: string;
    email: string;
} 

const accountUserSchema = new mongoose.Schema<AccountUser>({
    fullName: {
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

export const AccountUserModel = mongoose.model<AccountUser>('AccountUser', accountUserSchema, 'account-user'); 

