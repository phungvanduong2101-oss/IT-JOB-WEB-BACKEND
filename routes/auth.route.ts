import express from "express"; 
const Router = express.Router();
import accountController from "../controllers/user/account-user.controller"; 
import * as accountUserValidate from "../middlewares/validates/user/account-user.validate";  
Router.get('/',accountController.accountAuth);
export default Router;