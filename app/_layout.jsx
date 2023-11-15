import React from "react";
import { Stack} from "expo-router";
import "expo-router/entry";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="NewNote" 
                options={{presentation: "fullScreenModal", headerShown: false}}
            />
        </Stack>
    );
};

export default StackLayout;