function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">MT.</h2>
            <ul>
                <li><a href="#home" className="active">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;