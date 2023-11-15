// Function to generate the an unique id for the postit notes
export const generateNewId = () => {
    const newId = Date.now();
    return newId.toString();
};