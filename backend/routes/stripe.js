import express from "express";
import Stripe from "stripe";
import { config } from "dotenv";
import Order from "../models/Order.js";
import Item from "../models/Item.js";

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// checkout api
router.post("/create-checkout-session", async (req, res) => {
  const { userId, id, title, itemPic, price } = req.body;

  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
      cart: JSON.stringify({ id, title, itemPic, price }),
    },
  });

  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: title,
        images: [itemPic],
        metadata: {
          id: id,
        },
      },
      unit_amount: price * 100,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",

          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    line_items: [lineItem],
    mode: "payment",
    customer: customer.id,
    success_url: `https://bidit-blue.vercel.app/orders/${userId}`,
    cancel_url: `https://bidit-blue.vercel.app/auction/${id}`,
  });

  res.json({ id: session.id });
});

const createOrder = async (customer, data) => {
  const item = JSON.parse(customer.metadata.cart);
  const userId = customer.metadata.userId;

  let newOrder = new Order({
    user: userId,
    title: item.title,
    itemPic: item.itemPic,
    price: item.price,
    address: data.customer_details.address,
  });

  await Item.findByIdAndUpdate(
    item.id, // Auction ID
    { $set: { redeem: true } },
    { new: true }
  );

  try {
    await newOrder.save();
  } catch (err) {
    console.log(err);
  }
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (webhookSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          webhookSecret
        );
        console.log("Webhook Verified:)");
      } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            createOrder(customer, data);
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

export default router;
