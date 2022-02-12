import React, { useState, useEffect } from 'react';
import { Box, Text, ScrollView, HStack as Row, VStack as Col, Heading, Icon, Pressable, Factory, useColorModeValue, VStack, HStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AlertDialog from './../components/Alert';
import getLeaveRequest from '../controller/getLeaveRequest';
import updateLeaveRecordView from '../controller/updateLeaveRecordView';
import { Alert, Dimensions } from "react-native";
import RelaxSVG from '../components/RelaxSvg';
const Dashboard = () => {
    const userData = useSelector(state => state.loggedInUser.user)

    const attendanceAlert = useSelector(state => state.attendanceAlert.attendanceAlert)
    const [records, setRecords] = useState([]);

    useEffect(() => {
        let observer = null;
        let isMounted = true;
        if (isMounted) {
            observer = getLeaveRequest(setRecords, userData[0].id);
        }
        return () => {
            isMounted = false;
            observer.then((unsub) => unsub());
        };
    }, [userData]);

    let user = {};
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


    return (
        <Box flex={1} _dark={{ bg: "blueGray.900" }} _light={{ bg: "blueGray.50" }}>
            <Box >
                {
                    attendanceAlert.msg !== "" ? <AlertDialog status={attendanceAlert.status} variant={attendanceAlert.variant} msg={attendanceAlert.msg} /> : <></>
                }
            </Box>
            <ScrollView flexGrow={1} >
                <Box py={3}></Box>
                {records.length > 0 ?
                    records.map((record, index) => {
                        return (
                            <Box key={record.recordID} w={"90%"} my={3} p={3} alignSelf={"center"} borderWidth={1 / 2} borderColor={"muted.300"} borderRadius={15}  >
                                <Row alignItems={'center'} space={2} py={2} justifyContent={'flex-end'}  >
                                    <Col>
                                        <Icon as={MaterialCommunityIcons} name='calendar'
                                            color="coolGray.800"
                                            _dark={{
                                                color: "warmGray.50",
                                            }}
                                            size={'sm'}
                                        />
                                    </Col>
                                    <Col>
                                        <Heading size={'xs'}>{record.proposedLeaveDate}</Heading>
                                    </Col>
                                </Row>
                                <Row borderBottomWidth={1 / 2} borderBottomColor={'muted.700'} pb={2} >
                                    <Col py={1}>
                                        <Heading size={'xs'} >Leave ID: {record.recordID}</Heading>
                                    </Col>
                                </Row>
                                <Row py={3} justifyContent={'space-between'}>
                                    <Col>
                                        <Heading size={'xs'}>Subject: {record.subject}</Heading>
                                    </Col>

                                </Row>
                                <Row py={3}>
                                    <Col>
                                        <Heading size={'xs'}>Reason:</Heading>
                                    </Col>
                                </Row>
                                <Row pt={2} borderBottomWidth={1 / 2} borderBottomColor={'muted.700'} py={5}>
                                    <Col >
                                        <Text>
                                            <Text>{record.reason}</Text>
                                        </Text>
                                    </Col>
                                </Row>
                                <Row pt={2} justifyContent={'space-between'} >
                                    <Col>
                                        <Text>Status: <Text color={'gray.300'} >{record.status}</Text></Text>
                                    </Col>
                                    {
                                        record.status === 'pending' ? <></> :
                                            <Col>
                                                <Pressable _pressed={{ opacity: 0.5 }} onPress={() => {
                                                    Alert.alert(
                                                        "Are You Sure?",
                                                        "This record will be disappeared!",
                                                        [
                                                            {
                                                                text: "No, I want to keep this",
                                                                style: "cancel",
                                                            },
                                                            {
                                                                text: "Yes, Hide This",
                                                                onPress: () => updateLeaveRecordView(record.recordID),
                                                                style: "OK",
                                                            }
                                                        ]
                                                    )
                                                }} >
                                                    <Icon as={MaterialCommunityIcons} name='close-circle-outline'
                                                        color="coolGray.800"
                                                        _dark={{
                                                            color: "warmGray.50",
                                                        }}
                                                        size={'sm'}
                                                    />
                                                </Pressable>
                                            </Col>
                                    }
                                </Row>
                            </Box>
                        )
                    }) :
                    <VStack flex={1} flexDir={'row'} justifyContent={'center'} alignItems={'center'} h={Dimensions.get('window').height / 1.25}>
                        <Box h="200px" w="200" alignSelf={'center'} flexDirection={'row'} justifyContent={'center'} alignSelf={'center'} alignItems={'center'} marginLeft={-12} mt={-10} >
                            <BrandIcon />
                        </Box>
                    </VStack>

                }
            </ScrollView>
        </Box >
    );
}
export default Dashboard;

function BrandIcon() {
    const windowWidth = Dimensions.get('window').width;
    //console.log(windowWidth);
    const BrandIcon = Factory(RelaxSVG)
    let icon_fill_color = useColorModeValue("#333", "#fff")

    return (
        <BrandIcon style={{
            alignSelf: "center",
            height: "100%",
            width: windowWidth,
        }} fillcolor={icon_fill_color} />
    )
}