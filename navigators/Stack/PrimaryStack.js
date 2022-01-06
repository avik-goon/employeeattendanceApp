import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/LoginScreen";
import DrawerRoutes from "../Drawers/MainDrawer";
const Primarystack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />

            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default Primarystack;
