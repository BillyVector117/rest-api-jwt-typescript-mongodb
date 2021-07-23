import { Router } from "express";
import { TokenValidation } from "../middlewares/verifyToken";
const router: Router = Router();
import { signup, signin, profile } from "../controllers/auth.controller";
router.post("/signup", signup)
router.post("/signin", signin)
// Applying TokenValidation() (Middleware)
router.get("/profile", TokenValidation, profile)

export default router;

