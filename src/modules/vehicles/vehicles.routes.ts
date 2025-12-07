import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";
import auth from "../../middleware/auth";
import { roleAuth } from "../../middleware/role";


const router = Router()

router.post("/",auth(), roleAuth("admin"), vehiclesControllers.createVehicle)
router.get("/", vehiclesControllers.getAllVehicles)
router.get("/:id", vehiclesControllers.getSingleVehicle)
router.delete("/:vehicleId",auth(), roleAuth("admin"), vehiclesControllers.deleteVehicle)


export const vehiclesRoutes = router