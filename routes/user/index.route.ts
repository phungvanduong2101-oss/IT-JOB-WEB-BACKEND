import accountUserRouter from "./account-user.route"; 
import express from "express"; 
const Router = express.Router(); 
import authRouter from "./auth.route";
Router.use('/account', accountUserRouter); 
Router.use('/auth', authRouter);
export default Router;
