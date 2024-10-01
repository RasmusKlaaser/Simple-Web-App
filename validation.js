

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isPasswordStrong(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }
  
  module.exports = { validateEmail, isPasswordStrong };
  