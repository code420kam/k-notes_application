import { Router } from "express";
import UserCtrl from "./controller";

export default Router()
.post("/create", UserCtrl.create)
.post("/login", UserCtrl.userLogin)