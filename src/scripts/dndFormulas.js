export default {
    calcAttributeModifier,
}

function calcAttributeModifier(attributeVal) {
    return Math.floor((attributeVal - 10) / 2);
}