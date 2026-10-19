import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Contact from "./pages/Contact";
import Register from "./pages/Register";


function App() {
    return (
        <>
            <NavBar />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                
            </Routes>
        </>
    );
}

export default App;