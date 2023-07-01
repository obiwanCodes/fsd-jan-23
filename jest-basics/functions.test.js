const functions = require("./functions");

test('Adds 5 and 5 to equal to 10', () => {
  expect(functions.add(5,5)).toBe(10);
})

test("Adds 5 and 5 to NOT equal to 11", () => {
  expect(functions.add(5, 5)).not.toBe(11);
});