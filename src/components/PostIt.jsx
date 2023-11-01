
import { find } from 'lodash'
import { Text, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../themes/colors'
import { setColors, strokeColors } from '../../utils/colorFunctions'
import Svg, { Path } from 'react-native-svg';

export const PostIt = ({ color, title, content }) => {

    // Find correct background color for edit button svg
    const backgroundColor = setColors[color] || colors.yellow.light;

    // Find correct stroke color for edit button svg
    const findStrokeColor = strokeColors[color] || colors.yellow.medium;

    return (
        <View style={[styles.postitContainer, { backgroundColor }]}>
            <View>
                <Text style={styles.headlineTxt}>{title}</Text>
                <Text style={styles.contentTxt}>{content}</Text>
            </View>
            <TouchableOpacity style={styles.editSvg}>
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
        height: '48%',
        aspectRatio: 1,
        padding: 16,
        marginVertical: 7,
        color: colors.text,
        borderRadius: 4,
        shadowColor: '#B8AFB8',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headlineTxt: {
        fontSize: 14,
        fontFamily: 'Menlo',
        marginBottom: 12
    },
    contentTxt: {
        fontSize: 12,
        fontFamily: 'Menlo'
    },
    editSvg: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }

})