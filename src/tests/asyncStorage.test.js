import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateNotesFunction, getAllNotes } from '../utils/asyncStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn()
}));

// Test updateNotesFunction function
test('test if it updates and saves notes in AsyncStorage', async () => {
  const sampleNotesArray = [{ id: 1, content: 'Note 1' }, { id: 2, content: 'Note 2' }];

  await updateNotesFunction(sampleNotesArray);

  expect(AsyncStorage.setItem).toHaveBeenCalledWith('notes', JSON.stringify(sampleNotesArray));
});

// Test getAllNotes function
test('test if it retrieves all notes from AsyncStorage', async () => {
    const sampleNotesArray = [{ id: 1, content: 'Note 1' }, { id: 2, content: 'Note 2' }];
  
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(sampleNotesArray));
    
    const retrievedNotes = await getAllNotes();
  
    // Expect AsyncStorage.getItem to have been called with the correct argument
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('notes');
  
    // Expect the retrievedNotes to match the sample array
    expect(retrievedNotes).toEqual(sampleNotesArray);
  });
