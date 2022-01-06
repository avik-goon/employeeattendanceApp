import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    FormControl,
    Input,
    useColorModeValue,
    Box,
    Heading,
    Icon,
    Stack,
    Pressable,

} from "native-base"
import { FontAwesome, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import getUserDetails from '../controller/GetUser';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/reducers/CreateUserDetails';
// import { Alert } from 'react-native';
import * as Location from 'expo-location';
import calculateDistance from '../GeoApi/CalculateDistance';
import date from 'date-and-time';
import AttendenceDetails from '../Class/AttendanceDetails';
import updateAttendanceDetails from '../controller/UpdateAttendance';
import { createattendanceAlert } from '../store/reducers/AttendanceAlertGenerator';
import { StackActions } from '@react-navigation/native';
import fetchLocationData from '../controller/FetchAllLocation';

const UserIcon = () => {
    return (
        <Box flexDir="row" justifyContent="center" alignItems="center" W="90%" >
            <FontAwesome name="user-circle-o" size={32} color={useColorModeValue("#333", "#fff")} />
            <Box px="1"></Box>
            <Heading fontSize={"2xl"}>LOGIN</Heading>
        </Box>
    )
}
const Login = ({ showModal, setShowModal, navigation, setErrorMesssage, errorMesssage, setIsSpinnerVisible }) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [user, setUser] = useState({ email: "", password: "" })
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        fetchLocationData();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            setLocation(location);
        })();
    }, []);
    const allLocations = useSelector(state => state.locations.locations);

    let text = 'Waiting..';
    if (errorMsg) {
        Alert.alert(errorMsg)
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg"  >
                <Modal.Content _dark={{ backgroundColor: "blueGray.800" }} _light={{ backgroundColor: "blueGray.100" }}   >
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Heading >
                            <UserIcon />
                        </Heading>
                    </Modal.Header>
                    <Modal.Body py="5">
                        <FormControl>
                            <FormControl.Label>Username/E-Mail</FormControl.Label>
                            <Stack w="100%">
                                <Input
                                    w={{
                                        base: "100%",
                                        md: "25%",
                                    }}
                                    value={user.email}
                                    onChangeText={(val) => setUser({ ...user, email: val })}
                                    autoCapitalize='none'
                                    autoComplete='email'
                                    onBlur={() => {
                                        setUser({ ...user, email: user.email.toLowerCase().trim() })
                                    }}
                                    InputLeftElement={
                                        <Icon
                                            as={<MaterialIcons name="person" />}
                                            size={5}
                                            ml="2"
                                            color="muted.400"
                                        />
                                    }
                                    placeholder="Username/E-Mail"
                                />
                            </Stack>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Password</FormControl.Label>
                            <Stack w="100%">
                                <Input
                                    w={{
                                        base: "100%",
                                        md: "25%",
                                    }}
                                    value={user.password}
                                    onChangeText={(val) => setUser({ ...user, password: val })}
                                    type={show ? "text" : "password"}
                                    overflow="visible"
                                    InputRightElement={
                                        <Pressable onPress={handleClick}>
                                            {
                                                !show ? <Icon
                                                    as={<MaterialIcons name="visibility-off" />}
                                                    size={5}
                                                    mr="2"
                                                    color="muted.400"
                                                /> : <Icon
                                                    as={<MaterialIcons name="visibility" />}
                                                    size={5}
                                                    mr="2"
                                                    color="muted.400"
                                                />
                                            }
                                        </Pressable>
                                    }
                                    placeholder="Password"
                                />
                            </Stack>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer _dark={{ backgroundColor: "blueGray.800" }} _light={{ backgroundColor: "blueGray.100" }} >
                        <Button.Group space={2}>
                            <Button
                                size="lg"
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                colorScheme={"blueGray"}
                                onPress={() => {
                                    setShowModal(false)
                                    setIsSpinnerVisible(true)
                                    getUserDetails(user.email, user.password).then(data => {
                                        const now = new Date();
                                        const loginDate = (date.format(now, 'DD/MM/YYYY'));
                                        const loginTime = (date.format(now, 'hh:mm:ss A'));
                                        if (data !== -1) {
                                            const attendanceDetails = new AttendenceDetails(data[0].id, data[0].name, loginDate, loginTime, "", "", data[0].emp_id);
                                            dispatch(createUser(data));
                                            let userLocation = calculateDistance(data, location, allLocations)
                                            if (userLocation.length > 0) {
                                                updateAttendanceDetails(attendanceDetails, userLocation[0]).then((status) => {
                                                    if (status !== -1) {
                                                        if (status === 200) // already record present
                                                        {
                                                            var attendanceAlertObj = {
                                                                msg: "Attendance record present for " + loginDate,
                                                                status: "success",
                                                                variant: "outline"
                                                            }
                                                            dispatch(createattendanceAlert(attendanceAlertObj))
                                                            setTimeout(() => {
                                                                setIsSpinnerVisible(false)
                                                                setErrorMesssage({ ...errorMesssage, status: "", variant: "", msg: null })
                                                                navigation.dispatch(
                                                                    StackActions.replace('DrawerRoutes', { screen: 'Dashboard' })
                                                                );

                                                            }, 5000);
                                                        } else {
                                                            setErrorMesssage({ ...errorMesssage, msg: `You're only ${userLocation[0].distance}m. away, Login Successful!`, status: "success", variant: "solid" });
                                                            var attendanceAlertObj = {
                                                                msg: 'Your attendance is recorded, ID: ' + status,
                                                                status: "success",
                                                                variant: "outline"
                                                            }
                                                            dispatch(createattendanceAlert(attendanceAlertObj))

                                                            setTimeout(() => {
                                                                setIsSpinnerVisible(false)
                                                                setErrorMesssage({ ...errorMesssage, status: "", variant: "", msg: null })
                                                                navigation.dispatch(
                                                                    StackActions.replace('DrawerRoutes', { screen: 'Dashboard' })
                                                                );
                                                            }, 5000);
                                                        }
                                                    } else {
                                                        setErrorMesssage({ ...errorMesssage, msg: `You're far away from office(${userLocation[0].distance}m. away), you can't login right now!`, status: "error", variant: "outline" });
                                                        setTimeout(() => {
                                                            setIsSpinnerVisible(false)
                                                            setErrorMesssage({ ...errorMesssage, status: "", variant: "", msg: null })
                                                        }, 5000);
                                                    }
                                                })
                                            }

                                        } else {
                                            setErrorMesssage({ ...errorMesssage, msg: "Login Failed, User Not Found!", status: "error", variant: "outline" });
                                            setTimeout(() => {
                                                setIsSpinnerVisible(false)
                                                setErrorMesssage({ ...errorMesssage, status: "", variant: "", msg: null })
                                            }, 5000);
                                        }
                                    })

                                }}
                            >
                                Login
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal >
        </>
    )
}
export default Login;





