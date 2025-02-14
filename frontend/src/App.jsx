// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TaskForm from "./pages/taskForm";
import SplashScreen from "./pages/splash";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/home" element={<Home />} />
                <Route path="/add" element={<TaskForm />} />
                ...
            </Routes>
        </Router>
    );
}

export default App;
