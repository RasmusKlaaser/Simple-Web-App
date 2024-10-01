// auth.test.js
const { checkPassword } = require('./auth.js');  // Import auth.js-st

test('Õige parooli sisestamine tagastab true', () => {
  expect(checkPassword('qwerty', 'qwerty')).toBe(true);
});

test('Vale parooli sisestamine tagastab false', () => {
  expect(checkPassword('valeparool', 'qwerty')).toBe(false);
});
