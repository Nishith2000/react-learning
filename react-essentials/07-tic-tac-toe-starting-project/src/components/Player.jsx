import { useState } from "react"; 

export default function Player({initialName, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handlePlayerEdit = (event) => {
        setPlayerName(event.target.value);
    }

    const editPlayerName = (isEditing, playerName) => {
        return isEditing ? 
            (
                <input  type="text" value={playerName} onChange={handlePlayerEdit} />
            )  : (
                <span className="player-name">
                    {playerName}
                </span>
            )
    };

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editPlayerName(isEditing, playerName)}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => { setIsEditing(isEditing => !isEditing) }}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}