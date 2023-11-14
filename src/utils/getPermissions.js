// Get media library permission
export const getCameraRollPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
    }
};

// Get camera permission
export const getCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access the camera is required!');
    }
};