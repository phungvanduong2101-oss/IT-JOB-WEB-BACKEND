import accountUserRouter from "./account-user.route"; 
import express from "express"; 
const Router = express.Router(); 

Router.use('/account', accountUserRouter); 

export default Router;
