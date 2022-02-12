import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue, HStack as Row, VStack as Col, Icon, Heading, ScrollView, Spinner } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getExtraLoginLocation } from '../controller/RegisterExtraLoginLocation';
import { useSelector } from 'react-redux';
import date from 'date-and-time';
import { Calendar } from 'react-native-calendars';
import getAttendanceById from '../controller/getAttendanceById';
import AttendanceDetailsView from '../components/AttendanceDetailsView';
import VisitedLocationLoginRecordView from '../components/VisitedLocationLoginRecordView';
const VisitHistory = () => {
    const userData = useSelector(state => state.loggedInUser.user)
    const [attendanceRecord, setAttendanceRecord] = useState([]);
    const [loggedInLocations, setLoggedInLocations] = useState([]);
    const [attendanceView, setAttendanceView] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (userData[0].id !== undefined) {
                getAttendanceById(userData[0].id, setAttendanceRecord)
            }
        }
        return () => {
            isMounted = false;
        }
    }, [userData[0].id]);
    var attendanceMarker = {};
    if (attendanceRecord.length > 0) {
        attendanceRecord.forEach((record) => {
            attendanceMarker = { ...attendanceMarker, [date.transform(record.logIndate, 'DD/MM/YYYY', 'YYYY-MM-DD')]: { selected: true, marked: true, selectedColor: '#0c4a6e' } }
        })
        //setAttendenceCount(getAttendanceCountByMonth(date.transform(date.format(now, 'DD/MM/YYYY'), 'DD/MM/YYYY', 'MM'), attendanceRecord), setAttendanceCountByMonth)
    }
    //console.log(loggedInLocations);
    const brdrCLR = useColorModeValue('#06b6d4', '#cffafe');
    const RenderItem = ({ item }) => (
        <VisitedLocationLoginRecordView data={item} />
    );
    return (
        <Box Box flex={1} _dark={{ bg: "blueGray.900" }
        } _light={{ bg: "blueGray.50" }}>
            <Box pb={2} borderBottomWidth={1 / 2} borderBottomColor={useColorModeValue('cyan.900', 'cyan.100')} h={320} >
                <Calendar
                    horizontal={true}
                    enableSwipeMonths={true}
                    // Enable paging on horizontal, default = false
                    pagingEnabled={true}
                    style={{
                        height: 250
                    }}

                    onDayPress={(day) => {
                        setLoading(true)
                        var convertedDate = date.transform(day.dateString, 'YYYY-MM-DD', 'DD/MM/YYYY')
                        var attendanceRecordOfPressedDate = attendanceRecord.filter((record) => record.logIndate === convertedDate);
                        (attendanceRecordOfPressedDate.length > 0) ? setAttendanceView({ ...attendanceRecordOfPressedDate[0] }) : setAttendanceView({})
                        getExtraLoginLocation(setLoggedInLocations, userData[0].id, convertedDate).then(() => setLoading(false))

                    }}
                    hideExtraDays
                    markedDates={attendanceMarker}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                        backgroundColor: useColorModeValue("#f8fafc", "#0f172a"),
                        calendarBackground: useColorModeValue("#f8fafc", "#0f172a"),
                        textSectionTitleColor: '#b6c1cd',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: useColorModeValue("#0f172a", "#f8fafc"),
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: useColorModeValue("#0f172a", "#f8fafc"),
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
            </Box>
            <ScrollView flexGrow={1}>
                {
                    !loading ?
                        (Object.keys(attendanceView).length > 0) ? <AttendanceDetailsView thisEmployee={userData[0]} attendanceDetails={attendanceView} brdrCLR={brdrCLR} /> : <></>
                        :
                        <Box my={8}>
                            <Row space={5} alignItems={'center'} justifyContent={'center'}>
                                <Col>
                                    <Spinner size="sm" />
                                </Col>
                                <Col>
                                    <Heading size={"sm"} >Fetching Records Please Wait! </Heading>
                                </Col>
                            </Row>
                        </Box>
                }

                <Box mt={2} mb={5}>
                    {
                        (Object.keys(attendanceView).length > 0) ?
                            (loggedInLocations.length > 0) ?
                                loggedInLocations.map((item, index) => {
                                    return (<RenderItem item={item} key={index.toString()} />)
                                })
                                :
                                <Box my={3} ml={2}>
                                    <Row alignItems={'center'} >
                                        <Col w={"10%"}>
                                            <Icon
                                                as={MaterialCommunityIcons}
                                                name="history"
                                                color="coolGray.800"
                                                _dark={{
                                                    color: "warmGray.50",
                                                }}
                                                size={'sm'}
                                            />
                                        </Col>
                                        <Col w={"90%"}>
                                            <Heading size={'sm'}>No Login History Found For External Locations!</Heading>
                                        </Col>
                                    </Row>
                                </Box> : <></>
                    }
                </Box>
            </ScrollView>
        </Box >
    );
}
export default VisitHistory;

