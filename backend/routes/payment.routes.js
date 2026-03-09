import express from "express";
import { initPrisma } from "../utils/prisma.js";
import { initiateStkPush } from "../utils/mpesa.js"; // Assuming you have this in utils

const router = express.Router();
const prisma = initPrisma();

// Helper to calculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// @route   POST api/payments/create-order
// @desc    Create a pending order before payment
router.post("/create-order", async (req, res) => {
  const { userId, items } = req.body;

  try {
    const total = calculateTotal(items);

    const order = await prisma.order.create({
      data: {
        userId: userId,
        total: total,
        status: "PENDING",
        items: {
          create: items.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    res.json({ orderId: order.id, total: order.total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// @route   POST api/payments/mpesa
// @desc    Initiate M-Pesa STK Push
router.post("/mpesa", async (req, res) => {
  const { phoneNumber, orderId } = req.body;

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Initiate STK Push
    const stkResponse = await initiateStkPush(
      phoneNumber,
      Math.ceil(order.total), // M-Pesa requires whole numbers
      orderId
    );

    // Save Payment Record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: "MPESA",
        transactionId: stkResponse.CheckoutRequestID,
        phone: phoneNumber,
        status: "PENDING",
      },
    });

    res.json({
      message: "STK Push initiated. Please check your phone.",
      checkoutRequestID: stkResponse.CheckoutRequestID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "M-Pesa initiation failed" });
  }
});

export default router;