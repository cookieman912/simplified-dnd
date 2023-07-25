import React from "react";
import playerCharacters from "../data/playerCharacters.json"
import CharacterPreview from "../cmps/characterPreview";
import Header from "../cmps/header";
import "../styles/main.scss"

export default function Root() {
    return (
        <>
        <Header></Header>
        <main>
        <grid className="character-cards">
            {playerCharacters.map(playerCharacter => {
            return <CharacterPreview character={playerCharacter}></CharacterPreview>
            })}
        </grid>
        
        </main>
        </>
    );
  }