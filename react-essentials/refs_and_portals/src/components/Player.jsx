import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef(null);
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  const handleClick = () => {
    // The actual attributes of html elements can be accessed
    // using {ref_name}.current.{element_attribute}
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  };
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? ""} !!</h2>
      <p>
        {/* ref attribute needs to be used along with usRef() hook*/}
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
