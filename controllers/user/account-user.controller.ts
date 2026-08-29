import { AccountUserModel } from '../../models/account-user.model';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express'

const accountUserController = {
    accountUserRegister: async (req: Request, res: Response) => {
        try {
            const { email, fullName, password } = req.body;
            if (await AccountUserModel.findOne({ email })) {
                return res.json({ code: 'error', message: 'Đăng ký thất bại, Email đã tồn tại!' });
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await AccountUserModel.create({ fullName, password: passwordHash, email });
            res.json({ code: 'success', message: 'Đăng ký thành công!' });
        } catch (error) {    
            res.json({ code: 'error', message: 'Lỗi! Đăng ký thất bại!' });
        }
    }

}

export default accountUserController;