// routes/auth.routes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { initPrisma } from "../utils/prisma.js";

const router = express.Router();
const prisma = initPrisma();

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    res.status(201).json({ ok: true, message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Check password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid password" });

    // Create JWT Token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret");

    // Return user info (excluding password)
    const { password: _, ...userData } = user;
    
    res.json({ 
      ok: true, 
      token, 
      user: userData 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;