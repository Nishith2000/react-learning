import imgReact from "../../assets/react-core-concepts.png"
// This should be added here to apply the styles in Header.css to this component
import "./Header.css";

export default function Header() {
    const adjective = Math.random() < 0.5 ? "Fundamental" : "Crucial";
    return (
      <header>
        <img src={imgReact} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {adjective} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
    );
  }