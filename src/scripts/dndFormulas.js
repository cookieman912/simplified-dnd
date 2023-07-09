export default {
    calcAttributeModifier,
    rollAttack
}

function calcAttributeModifier(attributeVal) {
    return Math.floor((attributeVal - 10) / 2);
}

function rollAttack(attackModifier) {
 let roll =  _roll1d20();
 let rollTotal = roll + attackModifier
    
 return {
    roll,
    rollTotal
 }
}

function rollDamage(damageModifier) {

}

function _roll1d20() {
    Math.floor(1 + Math.random() * 20);
}