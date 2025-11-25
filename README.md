<p align="center">
  <img src="https://raw.githubusercontent.com/tanmayee-satpathy/GIFTED_VEINS/main/banner.png" 
       alt="Gifted Veins Banner" width="100%" />
</p>


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

## 📌 **Overview**

GIFTED VEINS is a real-time blood donor–recipient matching system designed to reduce emergency response time.  
It lets donors register instantly, recipients request blood, and the system auto-matches based on **blood group, distance, and availability**.

It includes a certificate generator, structured data population, and a clean Express.js backend.

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

## 🛠 **Tech Stack**

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript, EJS Templates |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Security** | Cookie-session, dotenv |
| **Deployment** | (Optional) Vercel / Render |
| **Tools** | Postman, Git, GitHub, VS Code |


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
## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/tanmayee-satpathy/GIFTED_VEINS.git
cd GIFTED_VEINS
npm install
npm start
```
Create a `.env` file:
MONGO_URI=your-mongodb-url  
KEY=your-secret-key  

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


## 🤝 Contributing

Contributions are welcome!  
If you want to suggest improvements or new features:

1. Fork this repository  
2. Create a new branch  
3. Make your changes  
4. Submit a pull request  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

**Tanmayee Satpathy**  
Full Stack Developer  
🔗 LinkedIn: https://www.linkedin.com/in/tanmayee-satpathy-488369288/


