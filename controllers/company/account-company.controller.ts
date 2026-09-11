import { AccountCompanyModel } from "../../models/account-company.model"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv"; 
dotenv.config(); 
import { Request, Response } from "express";

export const accountCompanyRegister = async (req: Request, res: Response) => {  
  try { 
    const { companyName, email, password } = req.body; 
    const existingCompany = await AccountCompanyModel.findOne({ email }); 
    if (existingCompany) { 
        return res.json({ code: 'error', message: 'Email đã tồn tại!' }); 
    } 
    const passwordHash = await bcrypt.hash(password, 10); 
    const newCompany = new AccountCompanyModel({
      companyName, 
      email, 
      password: passwordHash, 
    }); 
    await newCompany.save(); 
    res.json({ code: 'success', message: 'Đăng ký thành công!' }); 
  } catch (error) {
    res.json({ code: 'error', message: 'Lỗi! Đăng ký thất bại!' });
  }
} 

export const accountCompanyLogin = async (req: Request, res: Response) => {  
    try {  
        const { email, password } = req.body;  
        const company = await AccountCompanyModel.findOne({ email });
        if (!company) { 
            return res.json({ code: 'error', message: 'Email hoặc mật khẩu không đúng!' }); 
        } 
        const isMatch = await bcrypt.compare(password, company.password); 
        if (!isMatch) { 
            return res.json({ code: 'error', message: 'Email hoặc mật khẩu không đúng!' }); 
        } 
        const token = jwt.sign({ id: company._id, email: company.email }, process.env.JWT_SECRET!, { expiresIn: '1d' }); 
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'strict' }); 
        res.json({ code: 'success', message: 'Đăng nhập thành công!' });
    } catch (error) {
        res.json({ code: 'error', message: 'Lỗi! Đăng nhập thất bại!' });
    }
}