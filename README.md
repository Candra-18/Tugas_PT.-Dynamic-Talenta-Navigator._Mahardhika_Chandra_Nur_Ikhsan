# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


--------------------------------------
Fitur
Multiple Mode Tampilan: Beralih antara tampilan Table dan Kanban

Drag & Drop: Manajemen tugas intuitif menggunakan @dnd-kit

Manajemen Tugas: Buat, dan organisir tugas

Filter & Sorting: Kemampuan filtering dan sorting yang advanced

Desain Responsif: Dibangun dengan Tailwind CSS

UI Modern: Antarmuka bersih dengan komponen React

-----------------------------------------------------------

Tech Stack
Frontend Framework: React 19.1.1

Build Tool: Vite

Styling: Tailwind CSS

Drag & Drop: @dnd-kit

UI Components: Headless UI, Lucide React, React Icons

Routing: React Router DOM

Icons: Font Awesome, Lucide React

Date Picker: React Datepicker

------------------------------------------------------

Struktur Project
text
src/
├── components/
│   ├── Table/
│   │   ├── TableView.jsx
│   │   ├── TableRow.jsx
│   │   └── TableCell.jsx
│   ├── Kanban/
│   │   ├── KanbanView.jsx
│   │   ├── KanbanColumn.jsx
│   │   └── KanbanCard.jsx
│   ├── Modal/
│   │   └── TaskModal.jsx
│   ├── SearchBar.jsx
│   ├── PersonFilter.jsx
│   └── SortMenu.jsx
├── pages/
│   ├── TablePage.jsx
│   └── KanbanPage.jsx
├── api/
│   └── taskService.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx

-------------------------------------------
Instalasi
Clone repository

bash
git clone <repository-url>
cd latihan
Install dependencies

bash
npm install
Jalankan development server

bash
npm run dev
Build untuk production

bash
npm run build

-----------------------------------------------------------
 Scripts yang Tersedia
npm run dev - Menjalankan development server

npm run build - Build untuk production

npm run preview - Preview production build

npm run lint - Menjalankan ESLint

------------------------------------------------------------------

 Overview Komponen
Komponen Utama
TableView: Representasi tugas dalam bentuk tabel

KanbanView: Papan kanban dengan drag-and-drop

TaskModal: Form untuk membuat

SearchBar: Fungsi pencarian global

PersonFilter: Filter tugas berdasarkan assignee

SortMenu: Sortir tugas berdasarkan berbagai kriteria

Halaman
TablePage: Halaman tampilan tabel

KanbanPage: Halaman papan kanban

-----------------------------------------------------

Dependencies Penting
Dependencies Core
react & react-dom: Framework React

react-router-dom: Client-side routing

@dnd-kit/*: Fungsi drag-and-drop

UI & Styling
`tailwindcss**: Utility-first CSS framework

@headlessui/react: Komponen UI unstyled

lucide-react & react-icons: Library icon

@fortawesome/react-fontawesome: Integrasi Font Awesome

Utilities
react-datepicker: Komponen pemilih tanggal

autoprefixer: Post-processing CSS

------------------------------------------------------------

Styling
Project ini menggunakan Tailwind CSS untuk styling dengan konfigurasi custom di:

tailwind.config.js

postcss.config.js

Style custom di src/styles/index.css

-----------------------------------------------------

Detail Fitur
Tampilan Table
Kolom yang bisa di-sort

Desain tabel responsif

Tampilan Kanban
Drag-and-drop antar kolom

Pelacakan status visual

Representasi tugas berbasis kartu

Manajemen Tugas
Buat tugas baru

Assign ke anggota tim

Set due date dan prioritas

🔄 Development
Project ini menggunakan:

ESLint untuk code linting

Vite untuk build development yang cepat

Hot Module Replacement untuk pengalaman development yang smooth
