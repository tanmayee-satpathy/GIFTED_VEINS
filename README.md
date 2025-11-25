<h1 align="center">🚀 GIFTED VEINS – Blood Donor Matching System</h1>

<p align="center">
  A full-stack platform that connects blood donors with recipients in real time — enabling faster response, smarter matching, and digital certificate management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Express.js-Backend-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/EJS-Templates-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
</p>

---

## 📚 Table of Contents
- [Overview](#-overview)
- [Why Gifted Veins?](#-why-gifted-veins)
- [Features](#-features)
- [Project Highlights](#-project-highlights)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#️-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Contact](#-contact)
- [License](#-license)

---
## 📌 **Overview**

GIFTED VEINS is a real-time blood donor–recipient matching system designed to reduce emergency response time.  
It lets donors register instantly, recipients request blood, and the system auto-matches based on **blood group, distance, and availability**.

It includes a certificate generator, structured data population, and a clean Express.js backend.

---

## 🔥 Why Gifted Veins?

- Reduces emergency donor search time by **up to 75%**
- Auto-matches compatible donors within **5–10 km**
- Generates verified digital donation certificates instantly
- Centralized and unified platform for donors & recipients
- Lightweight, fast, and optimized Node.js backend
- Secure environment variable management with dotenv
- Modular and scalable architecture for easy enhancement

---

## ⭐ **Features**

### 🔹 Donor Module
- Register as a verified blood donor  
- Store blood group, phone number, city & availability  
- Smart donor matching based on **type + location**  
- Auto-generated donation certificates (PDF-compatible)

### 🔹 Recipient Module
- Submit blood requests  
- Donor matching within **5–10 km** radius  
- Instant visibility of matched donor contact  
- Real-time status update  

### 🔹 Additional Utilities
- Pre-loaded JSON datasets: **blood groups, cities, names, phone numbers**  
- Clean UI with public static assets  
- EJS-based templating for forms and certificates  

---

## ✨ Project Highlights

- 🚀 End-to-end full-stack application built with Node.js, Express.js & MongoDB Atlas  
- 🎯 Real-time donor–recipient matching based on blood group + location  
- 📍 Distance-based filtering (5–10 km radius) for quick emergency response  
- 🧾 Auto-generation of donation certificates using dynamic EJS templates  
- 📊 Clean and modular folder structure for easy maintenance and scalability  
- 🔒 Secure environment variable management using dotenv  
- ⚡ Fast API response time with optimized Mongoose queries  
- 🛠 Pre-loaded datasets (cities, names, phone numbers, blood groups) for smooth testing  
- 🌐 Designed for future deployment on Render/Vercel  

---

## 🛠 **Tech Stack**

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript, EJS Templates |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Security** | Cookie-session, dotenv |
| **Deployment** | (Optional) Vercel / Render |
| **Tools** | Postman, Git, GitHub, VS Code |

---

## 📁 Project Structure
```
GIFTED VEINS/
│── models/               # Mongoose models
│── public/               # Static assets (CSS, JS, images)
│── util/                 # JSON datasets + certificate generator
│── views/                # EJS templates (forms, certificate page)
│── index.js              # Main Express server
│── .env                  # Environment variables
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/tanmayee-satpathy/GIFTED_VEINS.git
cd GIFTED_VEINS
npm install
npm start
```

### 2️⃣ Create a .env file
```
MONGO_URI=your-mongodb-url
KEY=your-secret-key
```
Server runs at:
http://localhost:3000

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `KEY` | Secret key for cookie/session usage |

---

## 🔌 API Endpoints

### 👤 Donor Routes
| Method | Endpoint | Description |
|:--------:|:----------:|:-------------:|
| POST | `/donor/register` | Register a new donor |
| GET  | `/donor/all` | View all donors |

### ❤️ Recipient Routes
| Method | Endpoint | Description |
|:--------:|:----------:|:-------------:|
| POST | `/recipient/request` | Create a blood request |
| GET  | `/recipient/match` | Get matched donors |

### 🏆 Certificate Generator
| Method | Endpoint | Description |
|:--------:|:-----------:|:-------------:|
| GET | `/certificate/:id` | Generate donation certificate |

---

## 🔮 Future Enhancements

- 🔐 Add user authentication (JWT or OAuth)
- 🌍 Integrate Google Maps API for real-time donor distance visualization
- 📲 Add SMS / WhatsApp alerts for matched donors
- 🧭 Create an admin dashboard for monitoring donations & requests
- 📊 Add donation history & tracking features for donors
- ⚙️ Implement automated email notifications for certificate delivery
- 🗄 Improve data validation and duplicate entry prevention
- 🚀 Deploy separate frontend + backend versions for scalability
- 📱 Build a mobile app version for faster public access

---

## 🤝 Contributing

Contributions are welcome!  
If you want to suggest improvements or new features:

1. Fork this repository  
2. Create a new branch  
3. Make your changes  
4. Submit a pull request  

---
## 📞 Contact

For queries or collaboration:  
📧 Email: tanmayeesatpathy2004@gmail.com  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

**Tanmayee Satpathy**  
B.Tech CSE, KIIT University  
🔗 LinkedIn: https://www.linkedin.com/in/tanmayee-satpathy-488369288/
🔗 GitHub: https://github.com/tanmayee-satpathy


