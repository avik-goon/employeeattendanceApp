import React from 'react';
import { Box, Text, HStack as Row, VStack as Col, Icon, Heading } from 'native-base';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import logoutFromExternalLocation from '../controller/LogoutFromExternalLocation';
import date from 'date-and-time';
const VisitedLocationLoginRecordView = ({ data }) => {

    const now = new Date();
    const logOutDate = (date.format(now, 'DD/MM/YYYY'));
    const logOutTime = (date.format(now, 'hh:mm:ss A'));
    return (
        <Box my={5} p={3} borderWidth={1 / 2} borderColor={'muted.300'} w={'90%'} alignSelf={'center'} borderRadius={5} >
            <Row alignItems={'center'} pb={4} pt={1} borderBottomWidth={1 / 2} borderBottomColor={'muted.500'}>
                <Col w={"8%"}>
                    <Icon
                        as={MaterialCommunityIcons}
                        name="office-building"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                        size={'sm'}
                    />
                </Col>
                <Col w={"42%"}>
                    <Heading size={'sm'}>{data.plot}</Heading>
                </Col>
                <Col w={"25%"} alignItems={'flex-end'} pr={1} >
                    <Icon
                        as={MaterialCommunityIcons}
                        name="calendar-arrow-right"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                        size={'sm'}
                    />
                </Col>
                <Col w={"25%"}>
                    <Heading size={'xs'}>{data.loginDate}</Heading>
                </Col>
            </Row>
            <Row py={5}>
                <Col w={"10%"}>
                    <Icon
                        as={Entypo}
                        name="address"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                        size={'sm'}
                    />
                </Col>
                <Col w={"90%"}>
                    <Heading size={'xs'}>{data.locationDescription}</Heading>
                </Col>
            </Row>
            <Row alignItems={'center'} mb={5} >
                <Col w={"10%"}>
                    <Icon
                        as={Entypo}
                        name="pin"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                        size={'xs'}
                    />
                </Col>
                <Col w={"40%"}>
                    <Text><Text>{data.postal_code}</Text></Text>
                </Col>
                <Col w={"50%"} alignItems={'flex-end'}>
                    <Row alignItems={'center'} space={2} >
                        <Col>
                            <Icon
                                as={MaterialCommunityIcons}
                                name="city"
                                color="coolGray.800"
                                _dark={{
                                    color: "warmGray.50",
                                }}
                                size={'xs'}
                            />
                        </Col>
                        <Col>
                            <Text><Text>{data.city}</Text></Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row alignItems={'center'} pt={2} pb={2} borderTopWidth={1 / 2} borderTopColor={'muted.500'} >
                <Col w={"10%"}>
                    <Icon
                        as={AntDesign}
                        name="login"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                        size={5}
                    />
                </Col>
                <Col w={"40%"}>
                    <Text><Text>{data.loginTime}</Text></Text>
                </Col>
                {data.logOutTime === "" ?
                    <Col w={"50%"} alignItems={'flex-end'} >
                        <TouchableOpacity
                            onPress={() => {
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
                                            onPress: () => logoutFromExternalLocation(data.userID, data.recordID, logOutDate, logOutTime),
                                            style: "OK",
                                        }
                                    ]
                                )
                            }}
                        >
                            <Icon
                                as={AntDesign}
                                name="logout"
                                color="coolGray.800"
                                _dark={{
                                    color: "warmGray.50",
                                }}
                                size={5}
                            />
                        </TouchableOpacity>
                    </Col> :

                    <Col w={"50%"} alignItems={'flex-end'}>
                        <Row alignItems={'center'} space={2} >
                            <Col>
                                <Icon
                                    as={AntDesign}
                                    name="logout"
                                    color="coolGray.800"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    size={5}
                                />
                            </Col>
                            <Col>
                                <Text><Text>{data.logOutTime}</Text></Text>
                            </Col>
                        </Row>
                    </Col>
                }
            </Row>
        </Box>
    );
}
export default VisitedLocationLoginRecordView;