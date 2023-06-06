function generateUniqueHash() {
    const timestamp = Date.now().toString();
    const randomValue = Math.random().toString(36).substr(2);
    const hash = timestamp + randomValue;
    return hash;
}

module.exports = generateUniqueHash;
