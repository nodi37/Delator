const createObjectFromStrings = (keysArr, valuesArr) => {
    const entries = new Map();
    keysArr.forEach((key, index) => entries.set(key, valuesArr[index]));
    return Object.fromEntries(entries);
}

module.exports = { createObjectFromStrings }