import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import playerCharacters from "../data/playerCharacters.json";
import dndFormulas from "../scripts/dndFormulas";

import Header from "../cmps/header";

export default function CharacterSheet() {

    let charId = useParams().id;
    let characterSheet = playerCharacters[charId];
    const [diceRoll, setdiceRoll] = useState('');

    function rollAttack(modifier) {
        let roll = dndFormulas.rollAttack(modifier)
        setdiceRoll(' מתקפה! גלגת ' + roll.roll + ' לסה"כ של ' + roll.rollTotal)
    }

    return (
        <>
        <Header></Header>
        <main>
        <grid className="character-cards">
        <section className = 'character-general-info'>
           <h1>{characterSheet.name}</h1>
        </section>

        <section className="character-attributes">
            <ul className="attribute-list">
            {Object.keys(characterSheet.attributes).map(attributeName => {
                return <li>
                    <div className="attribute-name">{attributeName}</div>
                    <div className="attribute-value">{characterSheet.attributes[attributeName]}</div>
                    <div className="attribute-mod">{ dndFormulas.calcAttributeModifier(characterSheet.attributes[attributeName])}</div>
                </li>
            })}
            </ul>   
        </section>

        <section className="character-stasuses">
            <div className="defensive-stats">
                <div className="hitpoints">
                    נקודות פגיעה: {characterSheet.hitPoints}
                </div>
                <div className="hitpoints">
                    ערך הגנתי: {characterSheet.armorClass}
                </div>
                <div className="hitpoints">
                    קוביית שיקום: 1ק{characterSheet.hitDie}
                </div>
            </div>
        </section>

        <section  className="character-attacks">
            {characterSheet.attacks.map(attack => {
                return <div class="attackRoll">
                    <div className="attack-name">{attack.name}</div>
                    <div className="attack-roll">קוביית 1ק20 בעוד {attack.attackRollBonus}</div>
                    <button className="attack-button" onClick={() => rollAttack(attack.attackRollBonus)}>!תקוף</button>
                </div>
            })}
        </section>

        <section className="dice-rolls-container">
            <h1> גלגולים!</h1>
            <div className="rolls">
                {diceRoll}
            </div>
        </section>

        </grid>
        
        </main>
        </>
    );
  }