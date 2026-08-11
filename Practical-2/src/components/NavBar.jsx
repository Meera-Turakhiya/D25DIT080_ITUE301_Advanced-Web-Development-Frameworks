import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
    return (
        <nav className="navbar">

            <h2 className="logo">MT.</h2>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/projects">Projects</Link>
                </li>

                <li>
                    <Link to="/contact">Contact</Link>
                </li>

                <li>
                    <button
                        className="theme-btn"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </li>

            </ul>

        </nav>
    );
}

export default Navbar;