import React, { useState } from 'react';
import { Box, TextArea, ScrollView, FormControl, Input, WarningOutlineIcon, HStack as Row, VStack as Col, Icon, Heading, Button, useColorModeValue, Text, Pressable } from 'native-base';
import { MaterialIcons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import dateAndTime from 'date-and-time';
import DateTimePicker from '@react-native-community/datetimepicker';
import AlertDialog from '../components/Alert';
import { useSelector } from 'react-redux';
import addLeaveRecord from '../controller/addLeaveRecord';
const LeaveModule = () => {
    const [errors, setErrors] = useState({});
    const [leaveRecord, setLeaveRecord] = useState({});
    const [date, setDate] = useState(dateAndTime.addDays(new Date(), 1));
    const [show, setShow] = useState(false);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false)
    const user = useSelector((state) => state.loggedInUser.user[0]);

    const [notify, setNotify] = useState({
        msg: null,
        status: "",
        variant: ""
    })
    const onChange = (event, selectedDate) => {
        setShow(false);
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {

        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const validate = () => {
        const today = new Date();
        const yesterday = new Date(date);

        if (leaveRecord.subject === undefined) {
            setErrors({ ...errors, subject: "Subject is required!" })
            return false;
        } else if (leaveRecord.subject.length < 3) {
            setErrors({ ...errors, subject: "Subject is too small!" })
            return false;
        } else if (leaveRecord.reason === undefined || leaveRecord.reason.length < 20) {
            setErrors({ ...errors, reason: "Reason is required (more than 20 charectars)!" })
            return false;
        }
        if (dateAndTime.subtract(today, yesterday).toDays() > 0) {
            setErrors({
                ...errors,
                date: "You can't select today or previous day(s)"
            })
            return false
        }
        return true;
    }
    let proposedLeaveDate = dateAndTime.format(date, 'DD/MM/YYYY');
    let recordCreationDate = dateAndTime.format(new Date(), 'DD/MM/YYYY hh:mm A');
    function onSubmit() {
        if (validate()) {
            setErrors({})
            setIsSpinnerVisible(true);
            let lv = leaveRecord;
            lv = { ...lv, proposedLeaveDate, recordCreationDate };

            addLeaveRecord(lv, user).then(response => {
                if (response !== -1) {
                    setNotify({
                        msg: `Submitted Successfully, You'r ID: ${response}`,
                        status: "success",
                        variant: "solid"
                    })
                    setTimeout(() => {
                        setIsSpinnerVisible(false);
                        setLeaveRecord({})
                        setNotify({
                            msg: null,
                            status: "",
                            variant: ""
                        })
                    }, 5000);
                } else {
                    setNotify({
                        msg: `Submission Failed! May be you already have pending request!`,
                        status: "error",
                        variant: "solid"
                    })
                    setTimeout(() => {
                        setIsSpinnerVisible(false);
                        setLeaveRecord({})
                        setNotify({
                            msg: null,
                            status: "",
                            variant: ""
                        })
                    }, 5000);
                }

            })
        } else {
            setNotify({
                msg: "Error While Submitting, Please Check Your Inputs",
                status: "warning",
                variant: "solid"
            })
            setTimeout(() => {
                setNotify({
                    msg: null,
                    status: "",
                    variant: ""
                })
            }, 5000);
        }
    }
    return (
        <ScrollView flexGrow={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}>
            <Box my={5}>
                <Heading textAlign={'center'} size={'md'}> Create Leave Request </Heading>
            </Box>
            <Box borderWidth={1 / 2} borderColor={'gray.100'} mx={5} pt={5} pb={10} borderRadius={25}>
                <Row w={'90%'} alignSelf={'center'}>
                    <Col w={'100%'}>
                        <FormControl isInvalid={'subject' in errors}>
                            <FormControl.Label>Leave Subject</FormControl.Label>
                            <Input
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                autoCapitalize='none'
                                value={leaveRecord.subject}
                                onChangeText={(val) => setLeaveRecord({ ...leaveRecord, subject: val })}

                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="message1" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                }
                                placeholder="Leave Subject"
                            />
                            {
                                'subject' in errors ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.subject}
                                    </FormControl.ErrorMessage> : <></>
                            }
                        </FormControl>
                    </Col>
                </Row>
                <Row w={'90%'} mt={2} alignSelf={'center'}>
                    <Col w={'100%'}>
                        <FormControl isInvalid={'date' in errors}>
                            <FormControl.Label>Select Date</FormControl.Label>
                            <Pressable _pressed={{ opacity: 0.5 }} onPress={showDatepicker} >
                                <Box borderWidth={1 / 2} borderColor={'muted.400'} borderRadius={5} py={2} flexDir={'row'} alignItems={'center'} >
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                    <Text ml={2} color={'muted.100'} > {dateAndTime.format(date, 'DD/MM/YYYY')} </Text>
                                </Box>
                            </Pressable>
                            {
                                'date' in errors ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.date}
                                    </FormControl.ErrorMessage> : <></>
                            }
                        </FormControl>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                display="default"
                                onChange={onChange}

                            />
                        )}
                    </Col>
                </Row>
                <Row w={'90%'} mt={2} alignSelf={'center'}>
                    <Col w={'100%'}>
                        <FormControl isInvalid={'reason' in errors}>
                            <FormControl.Label>Leave Reason</FormControl.Label>
                            <TextArea
                                h={100}
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                                value={leaveRecord.reason}
                                onChangeText={(val) => setLeaveRecord({ ...leaveRecord, reason: val })}

                            />
                            {
                                'reason' in errors ?
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.reason}
                                    </FormControl.ErrorMessage> : <></>
                            }
                        </FormControl>
                    </Col>
                </Row>

                <Row w={'90%'} alignSelf={'center'} mt={10}>
                    {
                        !isSpinnerVisible ? <Button onPress={() => onSubmit()} size={'full'} colorScheme={useColorModeValue('primary', 'amber')} my={2}> SUBMIT </Button> :
                            <Button isLoading
                                size={"full"} alignSelf={"center"}
                                my={2}
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
                </Row>
            </Box>
            <Box>
                <Row w={'90%'} alignSelf={'center'} mt={10}>
                    {
                        notify.msg !== null ? <AlertDialog status={notify.status} variant={notify.variant} msg={notify.msg} /> : <></>
                    }
                </Row>
            </Box>
        </ScrollView>
    );
}
export default LeaveModule;


