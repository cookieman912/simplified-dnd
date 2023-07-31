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

    function rollDamage(dieValue, dieAmount, modifier) {
        let damageRoll = dndFormulas.rollDamage(dieValue, dieAmount, modifier)
        let diceRollString = 'במתקפה יצא בגלגולים ';
        damageRoll.rolls.forEach(roll => {
            diceRollString += roll + ","
        });
        diceRollString = diceRollString.substring(0, diceRollString.length - 1);
        diceRollString += ' שביחד שווה ' + damageRoll.damageCount + ' ';
        diceRollString += ' בהוספה של הבונוס ' + modifier + ' ';
        diceRollString += 'הגענו לסה"כ של ' + damageRoll.total;
        setdiceRoll(diceRollString)
    }

    function getAttributeModifier(character, desiredAttribute) {
        let attributeToFind = character.attributes.find(attribute => {
            return attribute.attributeNameEn === desiredAttribute
        });
        return dndFormulas.calcAttributeModifier(attributeToFind.attributeValue)
    }

    return (
        <>
            <Header></Header>
            <main>
                <grid className="character-cards">
                    <section className='character-general-info'>
                        <h1>{characterSheet.name}</h1>
                    </section>

                    <section className="character-attributes">
                        <ul className="attribute-list">
                            {characterSheet.attributes.map(attribute => {
                                return <li>
                                    <div className="attribute-name">{attribute.attributeNameHe}</div>
                                    <div className="attribute-value">{attribute.attributeValue}</div>
                                    <div className="attribute-mod">{dndFormulas.calcAttributeModifier(attribute.attributeValue)}</div>
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

                    <section className="character-attacks">
                        {characterSheet.attacks.map(attack => {
                            return (
                                <div class="attackDamageContainer">
                                    <div className="attack-roll-container">
                                        <div className="attack-name">{attack.name}</div>
                                        <div className="attack-roll">קוביית 1ק20 בעוד {attack.attackRollBonus}</div>
                                        <button className="attack-button" onClick={() => rollAttack(attack.attackRollBonus)}>!תקוף</button>
                                    </div>

                                    <div className="attack-roll-container">
                                        <div className="attack-name">נזק</div>
                                        <div className="attack-roll">{attack.dieValue}ק{attack.dieAmount}+{getAttributeModifier(characterSheet, attack.modifierAttribute)}</div>
                                        <button className="attack-button" onClick={() => rollDamage(attack.dieValue, attack.dieAmount, getAttributeModifier(characterSheet, attack.modifierAttribute))}>!נזק</button>
                                    </div>

                                </div>);
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