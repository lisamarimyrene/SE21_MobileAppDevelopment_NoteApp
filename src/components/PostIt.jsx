import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../themes/colors'
import { setColors, strokeColors } from '../utils/colorFunctions'
import Svg, { Path } from 'react-native-svg';
import { handleData } from '../hooks/useNotesData';

export const PostIt = () => {
    const {
        title,
        content,
        color,
        handleEditNote
    } = handleData()

    // Find correct background color for edit button svg
    const backgroundColor = setColors[color] || colors.yellow.light;

    // Find correct stroke color for edit button svg
    const findStrokeColor = strokeColors[color] || colors.yellow.medium;

    return (
        <View style={[styles.postitContainer, { backgroundColor }]}>
            <View style={styles.textContainer}>
                <Text style={styles.headlineTxt}>{title}</Text>
                <Text style={styles.contentTxt} numberOfLines={3}>{content}</Text>
            </View>
            <TouchableOpacity style={styles.editSvg} onPress={handleEditNote}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M12 20H21" stroke={findStrokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M16.5 3.50001C16.8978 3.10219 17.4374 2.87869 18 2.87869C18.2786 2.87869 18.5544 2.93356 18.8118 3.04017C19.0692 3.14677 19.303 3.30303 19.5 3.50001C19.697 3.697 19.8532 3.93085 19.9598 4.18822C20.0665 4.44559 20.1213 4.72144 20.1213 5.00001C20.1213 5.27859 20.0665 5.55444 19.9598 5.81181C19.8532 6.06918 19.697 6.30303 19.5 6.50001L7 19L3 20L4 16L16.5 3.50001Z" stroke={findStrokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    postitContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '48%',
        height: 200,
        aspectRatio: 1,
        padding: 16,
        marginVertical: 7,
        color: colors.text,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.00,
        elevation: 4,
    },
    textContainer: {
        height: '50%'

    },
    headlineTxt: {
        fontSize: 14,
        fontFamily: 'Menlo',
        marginBottom: 12
    },
    contentTxt: {
        fontSize: 12,
        fontFamily: 'Menlo',
        minHeight: '48%'
    },
    editSvg: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }

})