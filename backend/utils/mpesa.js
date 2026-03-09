import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_PASSKEY,
  MPESA_SHORTCODE,
  MPESA_ENVIRONMENT,
} = process.env;

const BASE_URL =
  MPESA_ENVIRONMENT === "live"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

// 1. Generate Access Token
export const getMpesaAccessToken = async () => {
  const auth = Buffer.from(
    `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(
      `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("M-Pesa Auth Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with M-Pesa");
  }
};

// 2. Initiate STK Push (Lipa Na M-Pesa)
export const initiateStkPush = async (phoneNumber, amount, orderId) => {
  const accessToken = await getMpesaAccessToken();
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  
  // Password is Shortcode + Passkey + Timestamp encoded in Base64
  const password = Buffer.from(
    `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const callbackUrl = `https://your-ngrok-url.com/api/payments/mpesa/callback`; // Replace with your actual public URL (Ngrok)

  const payload = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl,
    AccountReference: `BookStore Order ${orderId}`,
    TransactionDesc: "Payment for books",
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Returns CheckoutRequestID
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    throw new Error("Failed to initiate M-Pesa payment");
  }
};