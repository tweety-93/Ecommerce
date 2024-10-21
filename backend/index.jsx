/*const express=require('express');
const cors=require('cors');
const stripe = require("stripe")(
  "sk_test_51NdQMoSGvhaHUVO2ufyRmSF8s8OwTpaObw9pAIkx8rdNGN4701eERgs90RE4eplMRlfdRl9mjqpPjqmSakITkQ9n003flavSlv"
);

const app=express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())

app.post("/api/create-checkout-sessions",async(req,res)=>{
  
    const {products,customer}=req.body

 const stripeCustomer = await stripe.customers.create({
   name: customer.name,
   address: {
     line1: customer.address.line1,
     city: customer.address.city,
     postal_code: customer.address.postal_code,
     country: customer.address.country,
   },
 });

 const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: products.map((product) => ({
          price_data: {
            currency: "inr",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        })),
        mode: "payment",
        success_url: "http://localhost:5173/Payment",
        cancel_url: "http://localhost:5173/Cancel",
        customer:stripeCustomer.id,
       
      });
     res.json({ id: session.id });
    });
app.listen(4000, ()=>{console.log('listening server running')})*/

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NdQMoSGvhaHUVO2ufyRmSF8s8OwTpaObw9pAIkx8rdNGN4701eERgs90RE4eplMRlfdRl9mjqpPjqmSakITkQ9n003flavSlv"
);

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-99rbku1it-tweety-93s-projects.vercel.app",
];


app.use(
  cors({
    origin: function (origin, callback) {
    
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.post("/api/create-checkout-sessions", async (req, res) => {
  const { products, customer } = req.body;

  try {
    const stripeCustomer = await stripe.customers.create({
      name: customer.name,
      address: {
        line1: customer.address.line1,
        city: customer.address.city,
        postal_code: customer.address.postal_code,
        country: customer.address.country,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url:
        "https://ecommerce-99rbku1it-tweety-93s-projects.vercel.app/Payment", // Static success URL
      cancel_url:
        "https://ecommerce-99rbku1it-tweety-93s-projects.vercel.app/Cancel", // Static cancel URL
      customer: stripeCustomer.id,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(4000, () => {
  console.log("Server running on port");
});
