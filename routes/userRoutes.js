import express from "express";
import UserController from "../controllers/userController.js";
const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.createUser);
router.patch("/users/:id", UserController.updateUser);
router.patch("/usersbody", UserController.updateUserbody);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users/:id", UserController.getUser);

export default router;
