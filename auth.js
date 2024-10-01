// auth.js

const crypto = require('crypto');

// Funktsioon parooli kontrollimiseks
function checkPassword(inputPassword, storedPassword) {
  return inputPassword === storedPassword;  // Lihtne kontroll (reaalses rakenduses oleks see hashitud)
}

// Funktsioon parooli hashimiseks
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

module.exports = { checkPassword, hashPassword };
