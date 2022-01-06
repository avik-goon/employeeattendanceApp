import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/SimpleLineIcons";
import { Text } from "native-base";
import AdminDrawerContent from "./MainDrawerContent";
import Dashboard from "../../screens/Dashboard";
import LeaveModule from "../../screens/LeaveModule";
const Drawer = createDrawerNavigator();
import { useColorModeValue, MoonIcon, SunIcon, Pressable, useColorMode } from "native-base";
import AddLoginLocation from "../../screens/AddLoginLocation";
import VisitHistory from '../../screens/VisitHistory';
import Settings from "../../screens/Settings";
export default function DrawerRoutes() {
    const { colorMode, toggleColorMode } = useColorMode();
    function GetIcon() {
        if (useColorModeValue("light", "dark") === "dark") {
            return (<SunIcon size="5" mt="0.5" color="primary.50" />)
        } else return (<MoonIcon size="5" mt="0.5" color="primary.50" />)
    }

    return (
        <Drawer.Navigator drawerContent={(props) => <AdminDrawerContent {...props} />}
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: "Oswald_600SemiBold",
                    color: "#fff"
                },
                headerStyle: {
                    backgroundColor: useColorModeValue("#3e3d70", "#0f172a")
                },
                headerTintColor: '#fff',
                drawerActiveBackgroundColor: "#cdcce1",
                headerBackgroundContainerStyle: {
                    borderBottomColor: "#94a3b8",
                    borderBottomWidth: 0.5
                },
                drawerStyle: {
                    backgroundColor: useColorModeValue("#fff", "#0f172a"),
                    width: 240,
                },
                headerRight: () => (
                    <Pressable mr="1" px="1" onPress={() => toggleColorMode()} >
                        <GetIcon />
                    </Pressable>
                )
            }}
        >
            <Drawer.Screen name="DashBoard" component={Dashboard} options={{
                title: "DashBoard",
                drawerIcon: ({ focused, size }) => {
                    if (colorMode === "light")
                        return <Icon name="home-outline" size={size} color={focused ? "#3e3d70" : "#433d70"} />
                    else return <Icon name="home-outline" size={size} color={focused ? "#3e3d70" : "#fff"} />
                },
                drawerLabel: ({ focused }) => {
                    if (colorMode === 'light') {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#433d70"}  >
                            DashBoard
                        </Text>)
                    } else {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#fff"}  >
                            DashBoard
                        </Text>)
                    }

                },
                unmountOnBlur: true
            }} />

            <Drawer.Screen name="LeaveModule" component={LeaveModule} options={{
                title: "Leave Request",
                drawerIcon: ({ focused, size }) => {
                    if (colorMode === "light")
                        return <Icon name="door-open" size={size} color={focused ? "#3e3d70" : "#433d70"} />
                    else return <Icon name="door-open" size={size} color={focused ? "#3e3d70" : "#fff"} />
                },
                drawerLabel: ({ focused }) => {
                    if (colorMode === 'light') {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#433d70"}  >
                            Leave Request
                        </Text>)
                    } else {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#fff"}  >
                            Leave Request
                        </Text>)
                    }

                },

            }} />
            <Drawer.Screen name="AddLoginLocation" component={AddLoginLocation} options={{
                title: "Register New Location",
                drawerIcon: ({ focused, size }) => {
                    if (colorMode === "light")
                        return <Icon name="crosshairs-gps" size={size} color={focused ? "#3e3d70" : "#433d70"} />
                    else return <Icon name="crosshairs-gps" size={size} color={focused ? "#3e3d70" : "#fff"} />
                },
                drawerLabel: ({ focused }) => {
                    if (colorMode === 'light') {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#433d70"}  >
                            Register Visit
                        </Text>)
                    } else {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#fff"}  >
                            Register Visit
                        </Text>)
                    }

                },

            }} />
            <Drawer.Screen name="VisitHistory" component={VisitHistory} options={{
                title: "LogIn History",
                drawerIcon: ({ focused, size }) => {
                    if (colorMode === "light")
                        return <Icon name="history" size={size} color={focused ? "#3e3d70" : "#433d70"} />
                    else return <Icon name="history" size={size} color={focused ? "#3e3d70" : "#fff"} />
                },
                drawerLabel: ({ focused }) => {
                    if (colorMode === 'light') {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#433d70"}  >
                            LogIn History
                        </Text>)
                    } else {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#fff"}  >
                            LogIn History
                        </Text>)
                    }

                },

            }} />
            <Drawer.Screen name="Settings" component={Settings} options={{
                title: "Settings",
                drawerIcon: ({ focused, size }) => {
                    if (colorMode === "light")
                        return <EvilIcons name="settings" size={size} color={focused ? "#3e3d70" : "#433d70"} />
                    else return <EvilIcons name="settings" size={size} color={focused ? "#3e3d70" : "#fff"} />
                },
                drawerLabel: ({ focused }) => {
                    if (colorMode === 'light') {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#433d70"}  >
                            Settings
                        </Text>)
                    } else {
                        return (<Text style={{ fontFamily: "Oswald_600SemiBold" }} color={focused ? "#3e3d70" : "#fff"}  >
                            Settings
                        </Text>)
                    }

                },

            }} />


        </Drawer.Navigator >
    );
}