// Function to generate the an unique id for the postit notes
//* Endre til uuid(?)
export const getNewId = () => {
    const newId = Date.now();
    return newId.toString();
};