// Load environment variables from .env file
require('dotenv').config();

const debug = require('debug')('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const pdf = require('html-pdf-node');
const nodemailer = require('nodemailer');
const userModel = require('./models/user');
const app = express();

// ✅ Environment variables
const KEY = process.env.KEY;
const dburi = process.env.MONGO_URI;

// ✅ Safety check for missing .env or MONGO_URI
if (!dburi) {
  console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file or dotenv setup.");
  process.exit(1);
}

// Cookie configuration
const signature = {
  signed: true,
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
};

// Escape regex helper
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// ✅ MongoDB connection
mongoose
  .connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(KEY));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage
app.get('/', async (req, res) => {
  try {
    let user = null;
    let total = 0;

    if (req.signedCookies.user) {
      user = await userModel.findOne({ phone: req.signedCookies.user });
    }

    total = await userModel.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    res.render('index', {
      user,
      totalDonated: total[0] ? total[0].totalAmount : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// ✅ Register route (GET)
app.get('/register', (req, res) => {
  if (req.signedCookies.user) return res.redirect('/donate');
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

// ✅ Register route (POST)
app.post('/register', async (req, res) => {
  try {
    debug(req.body);

    const name = req.body.name ? req.body.name.toUpperCase() : "UNKNOWN";
    const blood = req.body.blood ? req.body.blood.toUpperCase() : "";
    const rh = req.body.rh || "";
    const city = req.body.city ? req.body.city.toUpperCase() : "UNKNOWN";
    const phone = req.body.phone || "";
    const amount = req.body.amount || 0;
    const address = req.body.address || "";

    if (!phone) {
      return res.status(400).send("❌ Phone number is required. Please go back and try again.");
    }

    let user = await userModel.findOne({ phone });

    if (!user) {
      user = await new userModel({
        name,
        bloodGroup: blood + rh,
        city,
        phone,
        amount,
        address,
      }).save();
    }

    res.cookie('user', user.phone, signature);
    console.log("✅ Cookie set for user:", user.phone);

    res.redirect('/donate');
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).send("⚠️ Server Error: " + err.message + "<br><br>Please go back and try again.");
  }
});

// Donation logic
app.post('/donate', async (req, res) => {
  try {
    if (!req.body.amount || req.body.amount <= 0) {
      return res.redirect('back');
    }

    const user = await userModel.findOne({ phone: req.signedCookies.user });
    if (!user) return res.redirect('/logout');

    user.amount += parseFloat(req.body.amount);
    await user.save();

    res.redirect('/donate');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/donate', async (req, res) => {
  try {
    if (!req.signedCookies.user) return res.redirect('/register');

    const user = await userModel.findOne({ phone: req.signedCookies.user });
    if (!user) return res.redirect('/logout');

    res.render('donate', {
      user: {
        name: user.name,
        amount: user.amount,
        lastDonated:
          user.updatedAt.getTime() === user.createdAt.getTime()
            ? 'Never.'
            : user.updatedAt.toDateString(),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Bank page
app.get('/bank', async (req, res) => {
  if (!req.signedCookies.user) return res.redirect('/register');

  try {
    let bloodQuery = req.query.blood || '(A|B|O|AB)';
    if (req.query.rh) bloodQuery += escapeRegExp(req.query.rh);
    else bloodQuery += '[\\+-]';

    const bloodRegex = new RegExp(bloodQuery, 'i');
    const cityRegex = new RegExp(req.query.city || '', 'i');
    const page = parseInt(req.query.page) || 1;

    const query = {
      $and: [
        { bloodGroup: { $regex: bloodRegex } },
        { city: { $regex: cityRegex } },
      ],
    };

    const docs = await userModel
      .find(query)
      .sort({ amount: -1 })
      .limit(18)
      .skip((page - 1) * 18);

    res.render('bank', { docs, logged: req.signedCookies.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading donors');
  }
});

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
});

// Helper: Generate Certificate HTML
function generateCertificateHTML(user) {
  const certId = `GV-${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}${new Date().getDate()}-${user._id
    .toString()
    .slice(-6)
    .toUpperCase()}`;

  // ✅ Use local logo file from /public/img
  const logoPath = path.join(__dirname, 'public/img/public/img/gifted-veins-logo.jpg');

  return `
  <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Great+Vibes&display=swap');

      body {
        font-family: 'Playfair Display', serif;
        background: #fdfaf6;
        text-align: center;
        padding: 60px;
        border: 20px solid #b8860b;
        margin: 0;
      }

      .certificate-container {
        border: 5px double #b8860b;
        padding: 40px;
        background-color: #fffdf5;
      }

      .header img {
        width: 120px;
        height: auto;
        margin-bottom: 5px;
      }

      .header h2 {
        color: #b8860b;
        font-size: 26px;
        margin: 5px 0 2px;
        letter-spacing: 1px;
      }

      .header p {
        color: #555;
        font-size: 14px;
        margin: 0 0 20px;
        font-style: italic;
      }

      h1 {
        font-size: 40px;
        color: #b8860b;
        margin: 0;
        letter-spacing: 1px;
      }

      p {
        font-size: 18px;
        margin: 10px 0;
        color: #444;
      }

      .recipient {
        font-size: 28px;
        font-weight: bold;
        color: #000;
        margin: 15px 0;
        text-decoration: underline;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        padding: 0 60px;
      }

      .signature {
        font-family: 'Great Vibes', cursive;
        font-size: 26px;
        color: #333;
        border-top: 1px solid #333;
        width: 250px;
        margin: auto;
      }

      .coordinator {
        font-size: 16px;
        color: #555;
      }

      .seal {
        border: 3px solid #b8860b;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b8860b;
        font-weight: bold;
        font-size: 14px;
        margin: auto;
      }

      .cert-id {
        margin-top: 40px;
        font-size: 14px;
        color: #666;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="certificate-container">
      <div class="header">
      <img src="http://localhost:3000/img/gifted-veins-logo.jpg" alt="Gifted Veins Logo" />
        <h2>Gifted Veins</h2>
        <p>Empowering Life Through Blood Donation</p>
      </div>

      <h1>CERTIFICATE OF APPRECIATION</h1>
      <p>This certificate is proudly presented to</p>
      <div class="recipient">${user.name}</div>
      <p>in recognition of your generous act of donating blood</p>
      <p>at the <strong>Blood Donation Camp</strong> organized by <strong>Gifted Veins</strong></p>
      <p>on <strong>${new Date(user.updatedAt).toDateString()}</strong></p>
      <p>Your kindness and compassion have made a difference in saving lives.</p>

      <div class="footer">
        <div>
          <div class="signature">Udbhaw Anuj</div>
          <div class="coordinator">Bloodline Coordinator</div>
        </div>
        <div class="seal">GIFTED<br>VEINS</div>
      </div>

      <div class="cert-id">
        Certificate ID: <strong>${certId}</strong>
      </div>
    </div>
  </body>
  </html>
  `;
}

// ✅ Download PDF Route
app.get('/download-certificate/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    const file = { content: generateCertificateHTML(user) };
    const pdfBuffer = await pdf.generatePdf(file, { format: 'A4' });

    const certId = `GV-${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}${new Date().getDate()}-${user._id
      .toString()
      .slice(-6)
      .toUpperCase()}`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${user.name}_${certId}_certificate.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate certificate');
  }
});

// ✅ Email Certificate Route
app.get('/email-certificate/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.redirect('/bank?toast=User not found&type=error');

    const file = { content: generateCertificateHTML(user) };
    const emailTo = user.address;
    if (!emailTo)
      return res.redirect('/bank?toast=No email address found&type=error');

    const pdfBuffer = await pdf.generatePdf(file, { format: 'A4' });

    const certId = `GV-${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}${new Date().getDate()}-${user._id
      .toString()
      .slice(-6)
      .toUpperCase()}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Gifted Veins" <${process.env.MAIL_USER}>`,
      to: emailTo,
      subject: 'Your Blood Donation Certificate',
      text: `Dear ${user.name},

Thank you for your selfless act of donating blood. Your contribution is not just appreciated — it’s *life-saving*.

Please find attached your Certificate of Blood Donation (ID: ${certId}).

With gratitude,
Team Gifted Veins ❤️`,
      attachments: [
        {
          filename: `${user.name}_${certId}_certificate.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    res.send('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/bank?toast=Error occurred while sending email&type=error');
  }
});

// ✅ Server Start
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}

module.exports = app;
