import React, { useState } from 'react';
import { Box, TextArea, ScrollView, FormControl, Input, WarningOutlineIcon, HStack as Row, VStack as Col, Icon, Heading, Button, useColorModeValue, Text, Pressable } from 'native-base';
import { MaterialIcons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector } from 'react-redux';
import updatePassword from '../controller/updatePassword';
import { Alert } from 'react-native';
const Settings = ({ navigation }) => {
    const [errors, setErrors] = useState({});
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [changeDetails, setChangeDetails] = useState({});
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    const userData = useSelector(state => state.loggedInUser.user);

    const validate = () => {

        if (changeDetails.emp_id === undefined) {
            setErrors({ ...errors, emp_id: "Employee ID is required!" })
            return false;
        }
        if (changeDetails.emp_id.length < 3) {
            setErrors({ ...errors, emp_id: "Employee ID is too small!" })
            return false;
        }
        if (changeDetails.old_password === undefined || changeDetails.old_password.length < 4) {
            setErrors({ ...errors, old_password: "Old Password is required!" })
            return false;
        }
        if (changeDetails.new_password === undefined || changeDetails.new_password.length < 4) {
            setErrors({ ...errors, new_password: "New Password is required! [Min: 4 charecters]" })
            return false;
        }
        return true;
    }
    function onSubmit() {
        if (validate()) {
            setErrors({})
            setIsSpinnerVisible(true);
            updatePassword(userData[0].id, changeDetails, setIsSpinnerVisible, setChangeDetails).then(status => {
                if (status === 1) {
                    setIsSpinnerVisible(false)
                    Alert.alert("Successfully Changed!")
                    setChangeDetails({})
                } else if (status === -2) {
                    setIsSpinnerVisible(false)
                    Alert.alert("Credentials Mismatch!")
                } else {
                    setIsSpinnerVisible(false)
                    Alert.alert("User not found!")
                }
            })

        }
    }
    return (
        <Box flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}>
            <Box borderWidth={1 / 2} borderColor={'gray.100'} mx={5} pt={5} pb={10} borderRadius={25} my={10}>
                <Row w={'90%'} alignSelf={'center'}>
                    <Col w={'100%'}>
                        <FormControl isInvalid={'emp_id' in errors}>
                            <FormControl.Label>Enter Employee ID</FormControl.Label>
                            <Input
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                autoCapitalize='none'
                                value={changeDetails.emp_id || userData[0].emp_id}
                                onChangeText={(val) => setChangeDetails({ ...changeDetails, emp_id: val })}

                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="idcard" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                }
                                placeholder="Employee ID"
                            />
                            {
                                'emp_id' in errors ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.emp_id}
                                    </FormControl.ErrorMessage> : <></>
                            }
                        </FormControl>
                    </Col>
                </Row>
                <Row w={'90%'} alignSelf={'center'} my={3}>
                    <Col w={'100%'}>
                        <FormControl isInvalid={'old_password' in errors}>
                            <FormControl.Label>Enter Old Password</FormControl.Label>
                            <Input
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                type={show ? "text" : "password"}
                                value={changeDetails.old_password}
                                onChangeText={(val) => setChangeDetails({ ...changeDetails, old_password: val })}
                                InputRightElement={
                                    <Pressable _pressed={{ opacity: 0.3 }} onPress={handleClick}>
                                        <Icon
                                            as={<MaterialIcons name="visibility-off" />}
                                            size={5}
                                            mr="2"
                                            color="muted.400"
                                        />
                                    </Pressable>
                                }
                                placeholder="Old Password"
                            />
                            {
                                'old_password' in errors ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.old_password}
                                    </FormControl.ErrorMessage> : <></>
                            }
                        </FormControl>
                    </Col>
                </Row>
                <Row w={'90%'} alignSelf={'center'} my={3}>
                    <Col w={'100%'}>
                        <FormControl isInvalid={'new_password' in errors}>
                            <FormControl.Label>Enter New Password</FormControl.Label>
                            <Input
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                type={show ? "text" : "password"}
                                value={changeDetails.new_password}
                                onChangeText={(val) => setChangeDetails({ ...changeDetails, new_password: val })}
                                InputRightElement={
                                    <Pressable _pressed={{ opacity: 0.3 }} onPress={handleClick}>
                                        <Icon
                                            as={<MaterialIcons name="visibility-off" />}
                                            size={5}
                                            mr="2"
                                            color="muted.400"
                                        />
                                    </Pressable>
                                }
                                placeholder="New Password"
                            />
                            {
                                'new_password' in errors ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.new_password}
                                    </FormControl.ErrorMessage> : <></>
                            }
                        </FormControl>
                    </Col>
                </Row>
                <Row w={'90%'} alignSelf={'center'} my={3}>
                    <Col w={'100%'}>
                        {!isSpinnerVisible ?
                            <Button onPress={onSubmit} colorScheme={useColorModeValue("primary", "amber")} size={'lg'}> CHANGE PASSWORD </Button>
                            :
                            <Button isLoading
                                size={"lg"}

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
                    </Col>
                </Row>
            </Box>
        </Box>
    );
}
export default Settings;