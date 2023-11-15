import { generateNewId } from '../utils/generateNewId';

// Test for generateNewId function
test('test if it generates a new id', () => {
    const newId = generateNewId();

    // Expect the newId to be defined and a string
    expect(newId).toBeDefined();
    expect(typeof newId).toBe('string');

    // Convert the newId back to a number
    const parsedId = parseInt(newId, 10);

    // Expect the parsedId to be a number and not NaN
    expect(typeof parsedId).toBe('number');
    expect(!isNaN(parsedId)).toBe(true);
});