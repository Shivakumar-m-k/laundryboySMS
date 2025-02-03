require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(express.json());
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {
  const { phone, orderId ,pickup ,address} = req.body;
  console.log(phone)
  console.log(orderId)
  // const phoneNo=String(phone)
  const phonenumber="+91"+String(phone)
  console.log(phonenumber)

  try {
    const message = await client.messages.create({
      body: `📢 LaundryBoy Order Confirmation
 Your order #${orderId} has been successfully placed!
📅 Pickup Date: ${pickup}
📍 Address: ${address}

📌 Track your order here: https://laundryboy.aiedges.in/

Need help? 
📞 Call us at +91 98765 43210 
Chat with liveagent at https://laundryboy.aiedges.in/live-chat
Thank you for choosing LaundryBoy!`,
      from: +17753108394,
      to: phonenumber, 
    });

    res.status(200).json({ success: true, message: "SMS sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "SMS failed to send" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
