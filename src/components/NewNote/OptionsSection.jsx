import { View, TouchableOpacity, StyleSheet } from "react-native/types"
import { useContext } from "react";
import Svg, { Path, Rect } from 'react-native-svg';
import { NoteContext } from "../../context/useContext";
import { colorOptions } from '../src/utils/colorFunctions';

export const OptionsSection = () => {

    const { color, setColor, setImageOptionsModalVisible } = useContext(NoteContext)

    // Handle color change of the post-it note
    const handleColorChange = (color) => {
        setColor(color);
    };

    return (
        <View style={styles.optionsContainer}>
            <View style={styles.chooseColorSection}>
                {colorOptions.map((colorOption) => (
                    <TouchableOpacity
                        key={colorOption.name}
                        onPress={() => handleColorChange(colorOption.name)}
                    >
                        <Svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Rect
                                width="41"
                                height="41"
                                rx="3"
                                fill={color === colorOption.name ? colorOption.activeFill : colorOption.fill}
                                stroke={colorOption.stroke}
                                strokeWidth="7"
                            />
                        </Svg>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.takePhotoBtn} onPress={() => setImageOptionsModalVisible(true)}>
                <Svg width="40" height="40" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M23 17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H7L9 1H15L17 4H21C21.5304 4 22.0391 4.21071 22.4142 4.58579C22.7893 4.96086 23 5.46957 23 6V17Z" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z" stroke="#707070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    optionsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    chooseColorSection: {
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    takePhotoBtn: {
        width: '15%',
    }
})

