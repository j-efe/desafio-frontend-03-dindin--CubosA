function setItem(key, value) {
    localStorage.setItem(key, value);
}

function getItem(key) {
    return localStorage.getItem(key);
}

function removeItem(key) {
    localStorage.removeItem(key);
}

function clearAll() {
    localStorage.clear();
}

module.exports = {
    setItem,
    getItem,
    removeItem,
    clearAll
}
