import AccountCompanyRouter from "./account-company.route";
import express from "express"; 
const Router = express.Router(); 
Router.use('/account', AccountCompanyRouter); 
export default Router;