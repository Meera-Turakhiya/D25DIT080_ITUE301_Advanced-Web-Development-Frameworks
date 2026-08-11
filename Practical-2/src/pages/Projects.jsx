function Projects() {
    return (
        <section className="projects">
            <h1>My Projects</h1>
            <div className="project-card">
                <h3>🌿 Flora-Fauna Website</h3>
                <p>
                    Developed a responsive website that provides detailed information
                    about flora and fauna. The website includes four different
                    categories such as reptiles, birds, mammals, and plants, allowing
                    users to explore descriptions and information through a simple and
                    user-friendly interface.
                </p>
            </div>
            <div className="project-card">
                <h3>📱 Pokédex App</h3>
                <p>
                    Built a mobile application using React Native that displays
                    detailed information about Pokémon. Users can view Pokémon
                    abilities, attacks, types, statistics, height, weight, and
                    power through an interactive interface.
                </p>
            </div>

            <div className="project-card">
                <h3>👁️ Face Detection System</h3>
                <p>
                    Developed an AI-based face detection application using Python
                    and OpenCV. The system detects human faces in real time through
                    a webcam and highlights them with bounding boxes using computer
                    vision techniques.
                </p>
            </div>

              <div className="project-card">
                <h3>Student Portfolio</h3>
                <p>
                    Responsive portfolio website built using React and reusable components.
                </p>
            </div>

            <div className="project-card">
                <h3>Anime Recommendation</h3>
                <p>
                    Recommendation system using Python and Machine Learning.
                </p>
            </div>

            <div className="project-card">
                <h3>Air Canvas</h3>
                <p>
                    Draw on screen using hand gestures with OpenCV.
                </p>
            </div>
        </section>
    );
}

export default Projects;