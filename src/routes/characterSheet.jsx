import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import playerCharacters from "../data/playerCharacters.json";
import dndFormulas from "../scripts/dndFormulas";

import Header from "../cmps/header";

export default function CharacterSheet() {

    let charId = useParams().id;
    const [characterSheet, setCharacterSheet] = useState(playerCharacters[charId])
    const [diceRoll, setdiceRoll] = useState('');
    const [currHitPoints, setCurrHitPoints] = useState(5)

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

    function onGeneralInfoChange(event) {
        console.log(event);
        let value = event.target.value;
        let attributeToChange = event.target.className.substring(10);
        let newSheet = JSON.parse(JSON.stringify(characterSheet))

        for (const property in characterSheet) {
            if (property == attributeToChange) {
                newSheet[property] = value
            }
        }
        setCharacterSheet(newSheet)
    }

    console.log(characterSheet);
    return (
        <>
            <Header></Header>
            <main>
                <grid className="character-cards">
                    <section className='character-general-info'>
                        <div className="character-general-info-node">
                            <p>שם דמות</p>
                            <input type="text" className="character-name" value={characterSheet.name} onChange={onGeneralInfoChange}></input>
                        </div>
                        <div className="character-general-info-node">
                            <p>מקצוע</p>
                            <input type="text" className="character-class" value={characterSheet.class} onChange={onGeneralInfoChange}></input>
                        </div>
                        <div className="character-general-info-node">
                            <p>רקע</p>
                            <input type="text" className="character-class" value={characterSheet.background} onChange={onGeneralInfoChange}></input>
                        </div>
                        <div className="character-general-info-node">
                            <p>רמה</p>
                            <input type="number" className="character-level" value={characterSheet.level} onChange={onGeneralInfoChange}></input>
                        </div>
                    </section>

                    <section className="character-attributes">
                        <ul className="attribute-list">
                            {characterSheet.attributes.map(attribute => {
                                return <li>
                                    <div class='shield-top'>
                                        <div className="attribute-name">{attribute.attributeNameHe}</div>
                                    </div>
                                    <div class='shield-middle'>
                                        <div className="attribute-value">{attribute.attributeValue}</div>
                                        <div className="attribute-mod">{dndFormulas.calcAttributeModifier(attribute.attributeValue)}</div>
                                    </div>
                                        <div className='shield-bottom'>
                                    </div>

                                </li>
                            })}
                        </ul>
                    </section>

                    <section className="character-stasuses">
                        <div className="defensive-stats">
                            <div className="hitpoints">
                                <div className="hitpoint-title">
                                    נקודות פגיעה: 
                                </div>
                                <div className="hitpoint-number">
                                {currHitPoints}/{characterSheet.hitPoints}
                                </div>
                                <div className="hitPoint-bar">
                                    {/* {characterSheet.hitPoints.forEach(hitPoint => {
                                    })} */}
                                </div>
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