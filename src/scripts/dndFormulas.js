export default {
    calcAttributeModifier,
    rollAttack,
    rollDamage
}

function calcAttributeModifier(attributeVal) {
    return Math.floor((attributeVal - 10) / 2);
}

function rollAttack(attackModifier) {
    let roll =  _rollDie(20);
    let rollTotal = roll + attackModifier

    return {
        roll,
        rollTotal
    }
}

function rollDamage(dieValue, dieAmount, modifier, isCrit = false) {
    let damageCount = 0;
    let rolls = [];

    if (isCrit) {
        dieAmount = dieAmount * 2
    }

    for (let i = 1; i <= dieAmount; i++) {
        let rollResult = _rollDie(dieValue);
        damageCount += rollResult;
        rolls.push(rollResult);
    }

    return {
        rolls,
        damageCount, 
        total : damageCount + modifier
    }
}

function _rollDie(dieMaxValue) {
    return Math.floor(1 + Math.random() * dieMaxValue);
}