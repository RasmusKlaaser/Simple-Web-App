

const { hashPassword } = require('./auth');


function validateUsername(username) {
  return username.length >= 3 && /^[a-zA-Z0-9]+$/.test(username);
}


function createUser(username, password) {
  if (!validateUsername(username)) {
    throw new Error('Kasutajanimi ei vasta nõuetele');
  }
  if (password.length < 6) {
    throw new Error('Parool on liiga lühike');
  }
  return { username, passwordHash: hashPassword(password) };
}


function getUserById(id, db) {
  return db.find(user => user.id === id);
}


function countUsers(db) {
  return db.length;
}


function deleteUser(id, db) {
  const index = db.findIndex(user => user.id === id);
  if (index !== -1) {
    db.splice(index, 1);
    return true;
  }
  return false;
}


function isUsernameUnique(username, db) {
  return !db.some(user => user.username === username);
}

module.exports = { validateUsername, createUser, getUserById, countUsers, deleteUser, isUsernameUnique };
