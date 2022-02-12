import React, { useEffect } from "react";
import { Alert, BackHandler, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { NativeBaseProvider, Box, Text, VStack, Divider, Center } from "native-base";
import DrawerItems, { ProfileAvatar } from "../../components/DrawerItems/AdminDrwaerItems";
import { useColorModeValue } from "native-base";
import { useSelector } from "react-redux";
import date from 'date-and-time';
import logOut from "../../controller/logOut";
import { useDispatch } from 'react-redux';
import { createUser } from "../../store/reducers/CreateUserDetails";
import * as Location from 'expo-location';
const AdminDrawerContent = (props) => {
  const userData = useSelector(state => state.loggedInUser.user)
  const attendanceDocID = useSelector(state => state.attendanceId.attendanceRecID)
  let user = {};
  const now = new Date();
  const logOutDate = (date.format(now, 'DD/MM/YYYY'));
  const logOutTime = (date.format(now, 'hh:mm:ss A'));
  const dispatch = useDispatch();
  const [location, setLocation] = React.useState({});
  const allLocations = useSelector(state => state.locations.locations);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setLocation(loc);
      })();
    }
    return () => {
      isMounted = false
    }
  }, []);

  userData.forEach(element => {

    for (const data in element) {
      if (Object.hasOwnProperty.call(element, data)) {
        const userdata = element[data];
        if (typeof userdata !== 'object') {
          user[data] = userdata
        }
      }
    }
  });

  const image_extension = '';
  const image_url = user.image_url;
  const first_name = user.name !== undefined ? user.name.split(" ")[0] : '';
  const userName = user.email !== undefined ? user.email.split("@")[0] : '';

  return (
    <Box style={{ flex: 1 }} safeArea>
      <DrawerContentScrollView {...props}>

        <Box style={styles.drawerContent}>
          <ProfileAvatar
            uri={image_url}
            name={first_name}
            username={`@${userName}`}
            colorCode={useColorModeValue("#000", "#fff")}
          />
          <Center m={1} p={1}>
            <Divider my={2} w={'100%'} />
          </Center>
          <VStack>
            <Box style={styles.drawerSection}>
              <DrawerItemList {...props} />

            </Box>
          </VStack>
        </Box>
      </DrawerContentScrollView>
      <VStack divider={<Divider />} space={4}>
        <Box>
          <DrawerItems
            label={"Sign Out"}
            icon={"exit-to-app"}
            onSelect={() => {
              Alert.alert(
                "Are You Sure?",
                "You'll be logged out!",
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      logOut(userData[0].id, logOutDate, logOutTime, attendanceDocID, allLocations, location).then((r) => {

                        if (r !== -1) {
                          Alert.alert(
                            "Success",
                            "LoggedOut Successfully!",
                            [

                              {
                                text: "Okay",
                                onPress: () => {
                                  dispatch(createUser([{
                                    logOutDate: "",
                                    image_url: "",
                                    name: "",
                                    locationID: "",
                                    address: "",
                                    logOutTime: "",
                                    phone: "",
                                    email: "",
                                    password: "",
                                    emp_id: "",
                                    id: "",
                                    locationData: {
                                      postal_code: "",
                                      locationDescription: "",
                                      longitudeDelta: null,
                                      latitude: null,
                                      longitude: null,
                                      plot: "",
                                      latitudeDelta: null,
                                      city: ""
                                    }
                                  }]));
                                  props.navigation.replace("LoginScreen");
                                  BackHandler.exitApp();
                                },
                                style: "OK",
                              }
                            ]
                          )
                        }
                      })
                    },
                    style: "OK",
                  }
                ]
              )

            }}

          />
        </Box>
      </VStack>
    </Box>

  )
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  drawerSection: {
    marginTop: -10
  }
});

export default AdminDrawerContent;
