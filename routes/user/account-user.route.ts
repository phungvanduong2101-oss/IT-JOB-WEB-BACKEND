import express from "express"; 
const Router = express.Router();
import accountUserController from "../../controllers/user/account-user.controller"; 
import * as accountUserValidate from "../../middlewares/validates/user/account-user.validate"; 

Router.post('/register',accountUserValidate.accountUserValidateRegister ,accountUserController.accountUserRegister); 
Router.post('/login',accountUserValidate.accountUserValidateLogin ,accountUserController.accountUserLogin);  
Router.get('/logout',accountUserController.accountUserLogout);
export default Router;