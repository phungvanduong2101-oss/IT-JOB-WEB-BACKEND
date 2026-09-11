import joi from 'joi';
import { Request, Response, NextFunction } from 'express'; 

export const accountCompanyValidateRegister = (req: Request, res: Response, next: NextFunction) => { 
    const { companyName, email, password } = req.body;
    const schema= joi.object({
        companyName: joi.string().min(1).max(50).required().messages({
            "string.empty": "Vui lòng nhập tên công ty!", 
            "string.min": "Tên công ty phải ít nhất có 1 ký tự", 
            "string.max": "Tên công ty tối đa 50 ký tự",
        }),

        email: joi.string().email().required().messages({
            "string.email": "Email không hợp lệ!",
            "string.empty": "Vui lòng nhập email!",
        }),
        password: joi
            .string()
            .min(8).max(32)
            .pattern(/[a-z]/)
            .pattern(/[A-Z]/)
            .pattern(/[0-9]/)
            .pattern(/[^a-zA-Z0-9]/)
            .required().messages({
                "string.min": "Mật khóa phải ít nhất có 8 ký tự",
                "string.pattern.base": "Mật khẩu phải chứa chữ thường, chữ hoa, chữ số và ký tự đặc biệt!", 
                "string.max": "Mật khóa tối đa 32 ký tự",
            })
    }) 

    const { error } = schema.validate({ companyName, email, password });
    if (error) {
        const errorMessage = error.details[0].message;
        res.json({
            code: "error",
            message: errorMessage
        })
        return;
    }
    next();
} 

export const accountCompanyValidateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const schema = joi.object({
        email: joi.string().email().required().messages({
            "string.email": "Email không hợp lệ!",
            "string.empty": "Vui lòng nhập email!",
        }),
        password: joi
            .string()
            .min(8).max(32)
            .pattern(/[a-z]/)
            .pattern(/[A-Z]/)
            .pattern(/[0-9]/)
            .pattern(/[^a-zA-Z0-9]/)
            .required().messages({
                "string.min": "Mật khóa phải ít nhất có 8 ký tự",
                "string.pattern.base": "Mật khóa phải chứa chữ thường, chữ hoa, chữ số và ký tự đặc biệt!", 
                "string.max": "Mật khóa tối đa 32 ký tự",
            })
    }) 
    const { error } = schema.validate({ email, password });
    if (error) {
        const errorMessage = error.details[0].message;
        res.json({
            code: "error",
            message: errorMessage
        })
        return;
    }
    next();
}
