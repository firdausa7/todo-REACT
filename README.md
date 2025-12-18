# Todo List 📝

A clean, modern todo list application built with React and Vite featuring dark/light mode, background photo integration, and local storage persistence.

## ✨ Features

- ✅ **Add, edit, and delete** todos
- ✅ **Dark/Light mode** toggle with automatic system preference detection
- ✅ **Background photo** integration from Unsplash
- ✅ **Search and filter** (All/Active/Completed)
- ✅ **Real-time statistics** display
- ✅ **Local storage** persistence
- ✅ **Responsive design** for all devices
- ✅ **Smooth animations** and transitions
- ✅ **Clean, modern UI** with intuitive controls

<img width="3024" height="1652" alt="image" src="https://github.com/user-attachments/assets/35a77731-cc5e-48da-b3c1-858f3a933e3c" />

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list


1. Install dependencies

bash
npm install
# or
yarn install


1. Start the development server

bash
npm run dev
# or
yarn dev


1. Open your browser
   Navigate to http://localhost:5173

Building for Production

bash
npm run build
# or
yarn build


To preview the production build:

bash
npm run preview
# or
yarn preview


📁 Project Structure


todo-list/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styles with dark/light mode
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── README.md           # This file


🎨 Customization

Changing the Background Photo

Replace the Unsplash URL in src/App.css:

css
body {
  background-image: url('YOUR_NEW_UNSPLASH_URL');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}


Color Theme

Modify the CSS variables in src/App.css:

css
:root {
  --primary: #3b82f6;      /* Change primary color */
  --success: #10b981;      /* Change success color */
  --danger: #ef4444;       /* Change danger color */
  /* ... other variables */
}


Adding New Features

1. New todo properties: Add fields to the todo object in App.jsx
2. Additional filters: Extend the filter logic in the filteredTodos calculation
3. Keyboard shortcuts: Add event listeners for keyboard navigation

🎮 Usage Guide

Basic Operations

· Add task: Type in the input field and press Enter or click "Add"
· Complete task: Click the checkbox or the task text
· Edit task: Click the edit icon (pencil)
· Delete task: Click the delete icon (trash)
· Search: Use the search bar to filter tasks
· Filter: Click filter buttons (All/Active/Completed)

Theme Control

· Toggle theme: Click the moon/sun icon in the header
· The app remembers your preference and applies it on next visit

Statistics

The header shows real-time statistics:

· Total: All tasks in your list
· Active: Tasks not yet completed
· Completed: Finished tasks

🔧 Troubleshooting

Background Photo Not Showing

1. Check that the Unsplash URL in App.css is correct
2. Ensure you're using the direct image URL (not the page URL)
3. Try a different Unsplash photo URL

Theme Not Persisting

1. Check browser console for localStorage errors
2. Ensure cookies are enabled in your browser
3. Try clearing browser cache and reloading

Todos Not Saving

1. Verify localStorage is available in your browser
2. Check console for any JavaScript errors
3. Try in a different browser

📱 Responsive Design

The app is fully responsive and works on:

· Mobile phones (320px and up)
· Tablets (768px and up)
· Desktop computers (1024px and up)

🛠️ Development Scripts

Script Description
npm run dev Start development server
npm run build Build for production
npm run preview Preview production build
npm run lint Run ESLint for code quality

📦 Dependencies

Main Dependencies

· React 18 - UI library
· Vite - Build tool and dev server
· Lucide React - Icon library

Development Dependencies

· @vitejs/plugin-react - React plugin for Vite
· ESLint - Code linting

🔒 Browser Support

· Chrome 90+
· Firefox 88+
· Safari 14+
· Edge 90+

📄 License

MIT License - see LICENSE file for details

🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

🙏 Acknowledgments

· Unsplash for the beautiful background photos
· Lucide for the excellent icon set
· Vite team for the amazing build tool

Made with ❤️ using React & Vite by FIRDAUSA SALAT
