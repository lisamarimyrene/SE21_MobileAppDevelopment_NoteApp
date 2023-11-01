import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native'
import { PostIt } from '../compontents/PostIt'
import { colors } from '../../themes/colors'

const testPosts = [
    {
        id: 1,
        color: "yellow",
        title: "Mitt første notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 2,
        color: "pink",
        title: "Mitt andre notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 3,
        color: "blue",
        title: "Mitt tredje notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 4,
        color: "green",
        title: "Mitt fjerde notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 5,
        color: "yellow",
        title: "Mitt første notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 6,
        color: "pink",
        title: "Mitt andre notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 7,
        color: "blue",
        title: "Mitt tredje notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 8,
        color: "green",
        title: "Mitt fjerde notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 9,
        color: "green",
        title: "Mitt fjerde notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 10,
        color: "yellow",
        title: "Mitt første notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 11,
        color: "pink",
        title: "Mitt andre notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 12,
        color: "blue",
        title: "Mitt tredje notat",
        content: "Heihei! Jeg tester den nye appen her..."
    },
    {
        id: 13,
        color: "green",
        title: "Mitt fjerde notat",
        content: "Heihei! Jeg tester den nye appen her..."
    }
]

export const Index = () => {
    return (
        <View style={styles.main}>
            <ScrollView style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.postitSection}>
                    {testPosts.map((post) => (
                        <PostIt
                            key={post.id}
                            // color={post.color}
                            title={post.title}
                            content={post.content}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Text>Hello</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    },
    scrollContainer: {
        flex: 0.7,
    },
    postitSection: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow the PostIt components to wrap
        justifyContent: 'space-between',
        padding: 5
    },
    buttonContainer: {
        flex: 0.3, // Set to 20% of the available height
        justifyContent: 'center',
        alignItems: 'center',
    },
})