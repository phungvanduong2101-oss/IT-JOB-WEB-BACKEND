import joi from 'joi';
import { Request, Response, NextFunction } from 'express'; 

export const accountUserValidateRegister = (req: Request, res: Response, next: NextFunction) => { 
    const { fullName, email, password } = req.body;
    const schema= joi.object({
        fullName: joi.string().min(1).max(50).required().messages({
            "string.empty": "Vui lòng nhập họ tên!", 
            "string.min": "Họ tên phải ít nhất có 1 ký tự", 
            "string.max": "Họ tên tối đa 50 ký tự",
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

    const { error } = schema.validate({ fullName, email, password });
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
 
