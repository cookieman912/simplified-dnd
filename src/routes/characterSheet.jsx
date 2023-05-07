import React from "react";
import { useParams } from "react-router-dom";

import playerCharacters from "../data/playerCharacters.json";
import dndFormulas from "../scripts/dndFormulas";

import Header from "../cmps/header";

export default function CharacterSheet() {

    let charId = useParams().id;
    let characterSheet = playerCharacters[charId];


    return (
        <>
        <Header></Header>
        <main>
        <grid className="character-cards">
        <section className = 'character-general-info'>
           <h1>{characterSheet.name}</h1>
        </section>

        <section className="character-attributes">
            <ul>
            {Object.keys(characterSheet.attributes).map(attributeName => {
                return <li>
                    <div className="attribute-name">{attributeName}</div>
                    {console.log(characterSheet.attributes[attributeName])}
                    <div className="attribute-value">{characterSheet.attributes[attributeName]}</div>
                    <div className="attribute-mod">{ dndFormulas.calcAttributeModifier(characterSheet.attributes[attributeName])}</div>
                </li>
            })}
            </ul>   

        </section>

        </grid>
        
        </main>
        </>
    );
  }