import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import customerdata from './modules/Customer.js';
import productdata from './modules/Product.js';
import farmerdata from './modules/Farmers.js';
import purchasedata from './modules/Purchase.js';
import chargesdata from './modules/Charges.js';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID; // From .env file
const authToken = process.env.TWILIO_AUTH_TOKEN;

var app = express();  
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())

 
// Create a Twilio client
 
 


mongoose.connect('mongodb+srv://21a91a6152:i1SlsdfXXTQ52UhB@cluster0.ywaxf.mongodb.net/Lemon?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  })
  .then(() => console.log("Connected to Database & Listening on localhost:5000"))
  .catch(err => console.error("Database connection error:", err));
  
 
 
var server = app.listen(5000) 

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  //Admin Signup

app.post('/signup',async(req,res,next)=>{
    console.log(req.body)
    const {username,email,password,phone}=req.body;
    let users
    try{
      users = await  customerdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
     
    if(!users){
        const stud =new customerdata({
            username,
            email,
            password,
            phone,
          })
          stud.save();
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'manojmaridi666@gmail.com',
          pass: 'twws ipfi pavo frie'
        }
      });
       
      const emailBody = ` 
      <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     
    <style>
        /* Add your styles here */
        body {
          font-family: 'Arial', sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
        }
        .header {
          background-color: #4CAF50;
          color: #fff;
          padding: 15px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 10px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Registration Successful</h2>
        </div>
        <div class="content">
          <p>Hello ${username},</p>
          <p>Congratulations! Your registration was successful.</p>
          <p>Your account has been created with the following details:</p>
          <ul>
            <li>Email: ${email}</li>
            <li>Phone no:${phone}</li>
          </ul>
          <p>Thank you for joining our community.</p>
        </div>
        <div class="footer">
          <p>© 2024 manojkumar. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
       `;
  
      
      var mailOptions = {
        from: 'manojmaridi666@gmail.com',
        to: email,
        subject: 'Registration Successful',
        html:  emailBody};
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.send({msg:"Account registered successfully"}) 
    }
    else{
      return res.status(200).json({msg:"email exists!.."})
    }
  });
  


  // Admin LOGIN

 
app.post('/login',async (req,res,next)=>{
     
   
    const {email,password}=req.body;
    let users;
    try{
      users = await customerdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    console.log(users)
    if(!users){
      return res.status(200).json({msg:"Not registered"})
    }
    else{
      if(users.password===password){
        return res.status(200).json({msg:"login successful",email:users})
      }
      else{
        return res.status(200).json({msg:"password incorrect"})
      }
    }
     
  })
  
  //Password change

  app.put('/forgot', async (req, res, next)=>{
    console.log(req.body.formDataF)
    const {email,password,confirmpassword}=req.body.formDataF;
    let users;
    let stud;
    try{
      users = await customerdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    console.log(users)
    if(!users){
      return res.status(200).json({msg:"email incorrect"})
    }
    else if(password!=confirmpassword){
      return res.status(200).json({msg:"please enter correct password"})
    }
    else{
        stud = await customerdata.findByIdAndUpdate(users._id,{
          email,
          password, 
        });
        return res.status(200).json({msg:"password updated successfully"})
    }
  })


  //product Add

  app.post('/api/addproducts', async (req, res, next) => {
    try {
      const { admin, date, description, name, uom } = req.body;
      const newPost = new productdata({ admin, date, description, name, uom });
      await newPost.save();
      res.status(201).json({ msg: "Product added successfully!", product: newPost });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ msg: "An error occurred while adding the product." });
    }
  });
  

  //get products

  app.get('/api/products', async (req, res) => {
    try {
      const adminid = req.query.userId; // Get user ID from query parameters
      console.log(adminid)
      const products = await productdata.find({ admin: adminid }); // Fetch posts for the specific user
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

     // API to delete a products
     app.delete('/api/productsd/:id', async (req, res) => {
      const { id } = req.params;
      await productdata.findByIdAndDelete(id);
      res.status(204).send();
    });
  
  
  //Add Farmers

  app.post('/api/addfarmers', async (req, res,next) => {
    console.log(req.body)
    try {
      const {firstName,surName,phoneNumber,village,city,state,country,pincode,admin } = req.body;
      let farmerName=surName+" "+firstName
      const newPost = new farmerdata({ farmerName,phoneNumber,village,city,state,country,pincode,admin});
      await newPost.save();
      res.status(201).json({ msg: "Farmer added successfully!", product: newPost });
    } catch (error) {
      console.error("Error saving farmer:", error);
      res.status(500).json({ msg: "An error occurred while adding the farmer." });
    }
     
  });

  //get farmers

  app.get('/api/farmers', async (req, res) => {
    try {
      const adminid = req.query.userId; // Get user ID from query parameters
      console.log(adminid)
      const posts = await farmerdata.find({ admin: adminid }); // Fetch posts for the specific user
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

   // API to delete a farmer
   app.delete('/api/farmersd/:id', async (req, res) => {
    const { id } = req.params;
    await farmerdata.findByIdAndDelete(id);
    res.status(204).send();
  });


  //add purchase

  app.post('/api/addpurchases', async (req, res, next) => {
    console.log(req.body)
    try {
      const { farmerName, qty,bags,grade,transportationcost,loadingcost,commisionfee, costPrice, date, product, admin, phone } = req.body;
              // Ensure numeric calculations are robust
          const quantity = Number(qty) || 0;
          const unitCost = Number(costPrice) || 0;
          const numBags = Number(bags) || 0;
          const transportCost = Number(transportationcost) || 0;
          const loadCost = Number(loadingcost) || 0;
          const commissionRate = Number(commisionfee) || 0;
          const gradeValue = Number(grade) || 0;

          // Calculate Amount
          const Amount = quantity * unitCost;
       
          // Calculate Commission Fees as a percentage of Amount
          const commissionFees = (commissionRate / 100) * Amount;
        
          // Calculate Total Amount
          const TotalAmount =
            Amount -
            numBags * transportCost -
            commissionFees -
            numBags * loadCost +
            gradeValue;
 
      // Save the new purchase data
      const newPost = new purchasedata({ farmerName , qty,bags,grade,transportationcost, loadingcost,commisionfee,costPrice,TotalAmount, date, product, admin });
      await newPost.save();
  
      // Twilio credentials
 
      const client = twilio(accountSid, authToken);
      //const messageBody = `Dear ${farmerName},\n\nWe have received your ${product} with the following details:\n\n- Quantity: ${qty} kilos\n- Bags: ${bags}\n- Cost Price: ₹${costPrice}\n- Total Amount: ₹\u0332${[...TotalAmount.toString()].join("\u0332")}\n- Date: ${date}\n\nThank you for visiting UMA Lemon Market!`;
      const messageBody=`ప్రియమైన ${farmerName}, \n\n మీ ${product} కిందివివరాలతో మేము స్వీకరించాము:\n\n- పరిమాణం: ${qty} కిలోలు\n- సంచులు: ${bags}\n-ధర: ₹${costPrice}\n-మొత్తం: ₹\u0332${[...TotalAmount.toString()].join("\u0332")}\n-తేదీ: ${date}\n\n ఉమా నిమ్మకాయ మార్కెట్‌ను ఎంచుకున్నందుకు మీకు ప్రత్యేక ధన్యవాదాలు.!`;

      // Send the SMS
      client.messages
      
        .create({
          body:  messageBody,
          from: '+16814774634',  // Your Twilio number
          to: phone  // Use the phone number from the request body
        })
        .then(message => {
          console.log('Message SID:', message.sid);  // Log message SID for debugging
        })
        .catch(error => {
          console.error('Error sending SMS:', error.message);  // Log error if sending fails
        });
  
      res.status(201).json({ msg: "Farmer added successfully!", product: newPost });
      console.log(phone);  // Debugging: log the phone number
  
    } catch (error) {
      console.error("Error saving farmer:", error);
      res.status(500).json({ msg: "An error occurred while adding the sales." });
    }
  });
  

   //get purchases

   app.get('/api/purchases', async (req, res) => {
    try {
      const adminid = req.query.userId; // Get user ID from query parameters
      console.log(adminid)
      const posts = await purchasedata.find({ admin: adminid }); // Fetch posts for the specific user
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // API to delete a purchase
  app.delete('/api/purchased/:id', async (req, res) => {
    const { id } = req.params;
    await purchasedata.findByIdAndDelete(id);
    res.status(204).send();
  });


  // add or update charges

 
app.post("/addcosts", async (req, res) => {
  const { admin, type, code, value } = req.body;

  try {
    // Find if the record already exists for the user and type
    let existingCost = await chargesdata.findOne({ admin, type });

    if (existingCost) {
      // Update the record
      existingCost.value = value;
      existingCost.code = code;
      await existingCost.save();
      return res.status(200).json({ message: "Cost updated successfully!", data: existingCost });
    } else {
      // Create a new record
      const newCost = new chargesdata({ admin, type, code, value });
      await newCost.save();
      return res.status(201).json({ message: "Cost added successfully!", data: newCost });
    }
  } catch (error) {
    console.error("Error handling cost record:", error);
    return res.status(500).json({ message: "An error occurred while saving the cost." });
  }
});

// get charges


app.get('/costs', async (req, res) => {
  try {
    const adminid = req.query.userId; // Get user ID from query parameters
   
    const posts = await chargesdata.find({ admin: adminid }); // Fetch posts for the specific user
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


//get report purchases
app.get('/api/reportpurchases', async (req, res) => {
  const adminId = req.query.userId; // admin email
  const farmerName = req.query.farmerName; // farmer name

  if (!adminId || !farmerName) {
    return res.status(400).json({ error: 'Missing adminId or farmerName' });
  }

  try {
    

    const posts = await purchasedata.find({
      admin: adminId,
      farmerName: farmerName.trim() // Ensures match without trailing spaces
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No matching purchases found' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get report farmer
app.get('/api/reportfarmers', async (req, res) => {
  const adminId = req.query.userId; // admin email
  const farmerName = req.query.farmerName; // farmer name

  if (!adminId || !farmerName) {
    return res.status(400).json({ error: 'Missing adminId or farmerName' });
  }

  try {
  
    const posts = await farmerdata.find({
      admin: adminId,
      farmerName: farmerName.trim() // Ensures match without trailing spaces
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No matching purchases found' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

