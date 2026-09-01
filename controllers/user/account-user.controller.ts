import { AccountUserModel } from '../../models/account-user.model';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';
dotenv.config();
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
    },

    accountUserLogin: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await AccountUserModel.findOne({ email });
            if (!user) {
                return res.json({ code: 'error', message: 'Email hoặc mật khẩu không đúng!' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json({ code: 'error', message: 'Email hoặc mật khẩu không đúng!' });
            }

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'strict' });

            return res.json({ code: 'success', message: 'Đăng nhập thành công!' });
        } catch (error) {
            return res.json({ code: 'error', message: 'Lỗi! Đăng nhập thất bại!' });
        }
    },

    accountUserAuth: async (req: Request, res: Response) => {
        try { 
            const token = req.cookies.token;
            if (!token) {
                return res.json({ code: 'error', message: 'Vui lòng đăng nhập!' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const { id, email } = decoded;
            const user = await AccountUserModel.findOne({_id: id, email: email}).select('-password');
            if (!user) {
                res.clearCookie('token');
                return res.json({ code: 'error', message: 'Token không hợp lệ!' });
            }
            res.json({ code: 'success', message: 'Token hợp lệ!', inforUser: { id: user._id, email: user.email, fullName: user.fullName } });
        }
        catch (error) {
            res.json({ code: 'error', message: 'Lỗi! Không thể xác thực!' });
        }
    }, 

    accountUserLogout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('token');
            res.json({ code: 'success', message: 'Đăng xuất thành công!' });
        } catch (error) {
            res.json({ code: 'error', message: 'Lỗi! Đăng xuất thất bại!' });
        }
    }
}

export default accountUserController;