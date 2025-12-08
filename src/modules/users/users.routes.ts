import { Router } from "express";
import { usersControllers } from "./users.controller";
import auth from "../../middleware/auth";
import { roleAuth } from "../../middleware/role";


const router = Router()

router.get("/", auth(), roleAuth("admin"), usersControllers.getUsers);
router.put("/:userId", auth(), usersControllers.updateUser);
router.delete("/:userId", auth(), roleAuth("admin"), usersControllers.deleteUser);




export const userRoutes = router