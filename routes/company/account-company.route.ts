import express from "express"; 
const router = express.Router(); 
import * as accountCompanyController from "../../controllers/company/account-company.controller";  
import * as accountCompanyValidate from "../../middlewares/validates/company/account-company.validate"; 

router.post('/register',accountCompanyValidate.accountCompanyValidateRegister,accountCompanyController.accountCompanyRegister); 
router.post('/login',accountCompanyValidate.accountCompanyValidateLogin,accountCompanyController.accountCompanyLogin); 

export default router;