import express from "express";
import {
  googleLogin,
  registerUser,
  loginUser,
  getUsers,
  getUser,
  editUser,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/google", googleLogin);
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

router.get("/", getUsers);
router.get("/:email", getUser);
router.put("/:email", editUser);
router.delete("/:email", removeUser);

export default router;
