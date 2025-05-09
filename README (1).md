
# 🛋️ Furniture Design and Visualization Tool

An interactive web-based application for designing and visualizing interior spaces using 2D placement and 3D scene exploration. Users can drag and drop furniture, adjust properties like color, dimensions, and shading, and save or edit their layouts with ease.

---

## 🚀 Features

- **User Authentication** – Secure login system with error handling  
- **Modular Layout** – Consistent structure using reusable React components (`Layout.jsx`)  
- **2D Furniture Editor** – Drag-and-drop placement with snapping guides (`Editor2D.jsx`)  
- **3D Viewer** – Real-time 3D scene rendering using Three.js (`Viewer3D.jsx`)  
- **Furniture Catalog** – Searchable, categorized item list  
- **Furniture Controls** – Adjust rotation, dimensions, color, opacity, and shadow in real-time  
- **Design Management** – Save, edit, and delete custom layouts  

---

## 🧱 Tech Stack

### 🖥️ Frontend

- **React** (v19.1.0) – Core UI framework  
- **Vite** (v6.3.5) – Lightning-fast build tool  
- **Three.js** (v0.176.0) – 3D graphics rendering  
- **@react-three/fiber** (v9.1.2) – React renderer for Three.js  
- **@react-three/drei** (v10.0.7) – Scene building helpers  
- **Konva** (v9.3.20) – 2D canvas drawing  
- **react-konva** (v19.0.3) – React bindings for Konva  
- **Tailwind CSS** (v4.1.5) – Utility-first styling  
- **React Router** (v7.5.3) – Navigation and routing  

### 🛠️ Backend

- **Node.js** – Server-side runtime  
- **Express** – REST API server  
- **Prisma** – ORM for database handling  
- **SQLite** – Lightweight local database  
- **JWT** – Secure authentication with JSON Web Tokens  

---

## 📂 Folder Structure

```
FURNITURE-VISUALIZER/
├── client/
│   ├── public/
│   │   ├── scripts/
│   │   └── assets/
│   └── src/
│       ├── components/
│       │   ├── auth/
│       │   │   ├── Login.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   └── Register.jsx
│       │   ├── furniture/
│       │   │   ├── FurnitureCatalog.jsx
│       │   │   └── FurnitureControls.jsx
│       │   └── layout/
│       │       ├── Layout.jsx
│       │       ├── ErrorBoundary.jsx
│       │       ├── SavedDesigns.jsx
│       │       └── SaveDesign.jsx
│       ├── constants/
│       │   ├── furniture.js
│       │   ├── furnitureModels.js
│       │   └── viewer3dConfig.js
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── RoomContext.jsx
│       ├── pages/
│       │   ├── Editor2D.jsx
│       │   ├── Home.jsx
│       │   └── Viewer3D.jsx
│       ├── styles/
│       ├── utils/
│       ├── App.css
│       └── OUTLINE
├── App.jsx
├── react.svg
├── server/
│   ├── dev.db
│   └── schema.prisma
```

---

## 📸 UI Overview

- **Low-Fidelity Prototypes**: Created in Figma to validate layout and navigation structure  
- **High-Fidelity UI**: Built with React and Three.js for interactive 2D/3D interfaces with responsiveness and accessibility in mind

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/furniture-visualizer.git
cd furniture-visualizer
```

### 2. Install frontend dependencies

```bash
cd client
npm install
npm run dev
```

### 3. Set up and run the backend

```bash
cd ../server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm start
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 💾 Saving & Loading Designs

Users can save furniture layouts, which are stored locally or optionally persisted to the backend. Saved designs appear as thumbnails with “Edit” and “Delete” options for easy management.

---

## 🧩 Future Enhancements

- 👤 User profiles with cloud synchronization  
- 🧱 Multi-room layout support  
- 📱 AR integration for real-world previews  
- 🎨 Enhanced furniture customization (materials, textures, lighting)  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
