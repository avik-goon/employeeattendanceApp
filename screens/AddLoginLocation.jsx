import React, { useState, useEffect } from 'react';
import { Box, HStack as Row, VStack as Col, FormControl, Select, Container, CheckIcon, Button, useColorModeValue, WarningOutlineIcon, FlatList } from 'native-base';
import getLocations from '../controller/getLocations';
import * as Location from 'expo-location';
import calculateDistance, { calculateSingleDistance } from '../GeoApi/CalculateDistance';
import Alert from '../components/Alert';
import date from 'date-and-time';
import { useSelector } from 'react-redux';
import registerExtraLoginLocation, { getExtraLoginLocation } from '../controller/RegisterExtraLoginLocation';
import VisitedLocationLoginRecordView from '../components/VisitedLocationLoginRecordView';



const AddLoginLocation = () => {
    class locationData {
        constructor(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }
    const now = new Date();
    const loginDate = (date.format(now, 'DD/MM/YYYY'));
    const loginTime = (date.format(now, 'hh:mm:ss A'));
    const [locationDataState, setLocationDataState] = useState([]);
    const [location, setLocation] = useState(null);
    const [loggedInLocations, setLoggedInLocations] = useState([]);
    //console.log(loggedInLocations);
    const [notify, setNotify] = React.useState({
        status: "",
        variant: "",
        msg: null
    })
    const userData = useSelector(state => state.loggedInUser.user)
    useEffect(() => {
        if (userData[0].id !== undefined) {
            getLocations(setLocationDataState)
            getExtraLoginLocation(setLoggedInLocations, userData[0].id, loginDate);
        }
    }, [userData[0].id]);
    useEffect(() => {
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
    // console.log(loggedInLocations);
    const [error, setError] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("")
    function validate() {
        if (selectedLocation === "") {
            setError({ ...error, locationDataState: "Please make a selection!" })
            return false;
        }
        return true;
    }
    function onSubmit() {
        if (validate()) {
            setError({})
            const dataOfSelectedLocation = locationDataState.filter((loc) => loc.id === selectedLocation)

            let locArr = []
            locArr.push({ locationData: new locationData(dataOfSelectedLocation[0].latitude, dataOfSelectedLocation[0].longitude) })
            const distance = calculateSingleDistance(locArr, location);
            if (distance < 1000) {
                const entryObject = {
                    ...dataOfSelectedLocation[0],
                    userID: userData[0].id,
                    emp_id: userData[0].emp_id,
                    full_name: userData[0].name,
                    avatarURL: userData[0].image_url,
                    loginDate,
                    loginTime,
                    logOutDate: "",
                    logOutTime: ""
                }
                registerExtraLoginLocation(entryObject).then(status => {
                    if (status !== undefined) {
                        if (status === -1) {
                            setIsUploading(false);
                            setNotify({ ...notify, msg: `You're already loggedIn to a location, logout first!`, status: "error", variant: "solid" })
                            setTimeout(() => {
                                setNotify({ ...notify, status: "", variant: "", msg: null })
                            }, 5000);
                        } else {
                            setIsUploading(false);
                            setNotify({ ...notify, msg: `You're only ${distance}m. away, Login Successful!`, status: "success", variant: "solid" })
                            setTimeout(() => {
                                setNotify({ ...notify, status: "", variant: "", msg: null })
                            }, 5000);
                        }

                    } else {
                        setIsUploading(false);
                        setNotify({ ...notify, msg: `Unable to login! DB Error Occured`, status: "error", variant: "solid" })
                        setTimeout(() => {
                            setNotify({ ...notify, status: "", variant: "", msg: null })
                        }, 5000);
                    }
                })
            } else {
                //not allow
                setIsUploading(false);
                setNotify({ ...notify, msg: `You're far away from office(${distance}m. away), you can't login right now!`, status: "error", variant: "solid" })
                setTimeout(() => {
                    setNotify({ ...notify, status: "", variant: "", msg: null })
                }, 5000);
            }
        }
    }
    const renderItem = ({ item }) => (
        <VisitedLocationLoginRecordView data={item} />
    );
    return (
        <Box flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}>
            <Box>
                <Row alignItems="center" mt="4" justifyContent={"center"}>
                    <Col w="96%" alignSelf={"center"}>
                        <Container alignSelf={"center"}>
                            <FormControl.Label>Choose Location: </FormControl.Label>
                            <FormControl isInvalid={'locationDataState' in error}>
                                <Select
                                    minW={"full"}
                                    accessibilityLabel="Choose Location"
                                    placeholder="Choose Location"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size={5} />,
                                    }}
                                    mt="1"
                                    selectedValue={selectedLocation}
                                    onValueChange={(val) => setSelectedLocation(val)}
                                >
                                    <Select.Item label={"Choose Location"} value={""} />
                                    {
                                        locationDataState.map((item, i) => {

                                            return (
                                                <Select.Item key={i.toString()} label={item.plot} value={item.id} />
                                            )
                                        })
                                    }
                                </Select>
                                {
                                    'locationDataState' in error ?
                                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                            Please make a selection!
                                        </FormControl.ErrorMessage> : <></>
                                }
                            </FormControl>
                        </Container>
                    </Col>
                </Row>
                <Row alignItems="center" mt="4" justifyContent={"center"}>
                    <Col w="full" alignSelf={"center"}>
                        <Container alignSelf={"center"}>
                            {!isUploading ?
                                <Button onPress={() => onSubmit()} colorScheme={useColorModeValue("primary", "amber")} size={"lg"}> LOGIN HERE </Button>
                                :
                                <Button isLoading
                                    size={"lg"} alignSelf={"center"}
                                    _loading={{
                                        bg: "muted.700",
                                        _text: {
                                            color: "muted.50",
                                        },
                                    }}
                                    _spinner={{
                                        color: "white",
                                    }}
                                    isLoadingText="Please Wait"
                                >
                                    Please Wait
                                </Button>
                            }
                        </Container>
                    </Col>
                </Row>
                <Row alignItems="center" mt="4" justifyContent={"center"}>
                    <Col w="full" alignSelf={"center"}>
                        {
                            notify.msg !== null ? <Alert status={notify.status} variant={notify.variant} msg={notify.msg} /> : <></>
                        }
                    </Col>
                </Row>
            </Box>
            <FlatList
                data={loggedInLocations}
                renderItem={renderItem}
                keyExtractor={item => item.recordID}
            />
        </Box>
    );
}
export default AddLoginLocation;

