import { Router } from "express";
import { usersControllers } from "./users.controller";
import auth from "../../middleware/auth";
import { roleAuth } from "../../middleware/role";


const router = Router()

router.get("/", auth(), roleAuth("admin"), usersControllers.getUsers)



export const userRoutes = router