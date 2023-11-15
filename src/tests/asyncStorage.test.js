// Import AsyncStorage from 'react-native' (you may need to adjust this path)
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateNotesFunction, getAllNotes } from '../utils/asyncStorage';

// Mock AsyncStorage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn()
}));

// Test updateNotesFunction function
test('test if it updates and saves notes in AsyncStorage', async () => {
  // Define a sample array for testing
  const sampleNotesArray = [{ id: 1, content: 'Note 1' }, { id: 2, content: 'Note 2' }];

  // Call the function to update notes
  await updateNotesFunction(sampleNotesArray);

  // Expect AsyncStorage.setItem to have been called with the correct arguments
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('notes', JSON.stringify(sampleNotesArray));
});

// Test getAllNotes function
test('test if it retrieves all notes from AsyncStorage', async () => {
    // Define a sample array of notes for testing
    const sampleNotesArray = [{ id: 1, content: 'Note 1' }, { id: 2, content: 'Note 2' }];
  
    // Mock the AsyncStorage.getItem method to return the sample array
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(sampleNotesArray));
  
    // Call the function to get all notes
    const retrievedNotes = await getAllNotes();
  
    // Expect AsyncStorage.getItem to have been called with the correct argument
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('notes');
  
    // Expect the retrievedNotes to match the sample array
    expect(retrievedNotes).toEqual(sampleNotesArray);
  });
