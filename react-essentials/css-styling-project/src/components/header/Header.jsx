import logo from "../../assets/logo.png";
import styles from "styled-components";
// import styles from "./Header.module.css"; // Make use of Css module to make sure that css style are scoped to specific files

export default function Header() {
  const Header = styles.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;

    & img {
      object-fit: contain;
      margin-bottom: 2rem;
      width: 11rem;
      height: 11rem;
    }
    
    & h1 {
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.4em;
      text-align: center;
      text-transform: uppercase;
      color: #9a3412;
      font-family: 'Pacifico', cursive;
      margin: 0;
    }
    
    & p {
      text-align: center;
      color: #a39191;
      margin: 0;
    }

    @media (min-width: 768px) {

      margin-bottom: 4rem;
    
      & h1 {
        font-size: 2.25rem;
      }
    }
  `;
  return (
    <Header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p
        // Inline styling can be used to target each html tag.
        // We can also style using external css but using backticks:
        // For ex: <p className = {`${dynamic_style_name}`}>
        style={{
          color: "brown",
          textAlign: "left",
        }}
      >
        A community of artists and art-lovers.
      </p>
    </Header>
  );
}
