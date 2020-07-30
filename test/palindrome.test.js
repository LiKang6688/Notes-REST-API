// the test file imports the function to be tested and assigns it to a variable called palindrome
const palindrome = require("../utils/for_testing").palindrome;

// Individual test cases are defined with the test function.
// The first parameter of the function is the test description as a string.
// The second parameter is a function,
// that defines the functionality for the test case.
test("palindrome of a", () => {
  const result = palindrome("a");

  expect(result).toBe("a");
});

test("palindrome of react", () => {
  // First we execute the code to be tested,
  // meaning that we generate a palindrome for the string react.
  const result = palindrome("react");

  // Next we verify the results with the expect function
  expect(result).toBe("tcaer");
});

test("palindrome of releveler", () => {
  const result = palindrome("releveler");

  expect(result).toBe("releveler");
});

// Jest expects by default that the names of test files contain .test.
