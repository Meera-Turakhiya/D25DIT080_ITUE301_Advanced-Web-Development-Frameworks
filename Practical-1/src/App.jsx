import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

function App() {
  const name = "Meera Turakhiya";
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "Git",
    "Machine Learning"
  ];
  return (
    <><Navbar />
    <Header
      name={name}
      themeColor="#2563eb"
  />
  <About  name={name}/>
  <Skills skillList={skills}/>
   <Footer /></>
  );
}

export default App;