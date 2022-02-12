import React, { } from 'react';
import { Box, Divider, Heading, HStack, VStack } from 'native-base';
import { Image } from 'react-native';
const AttendanceDetailsView = ({ thisEmployee, attendanceDetails, brdrCLR }) => {
    //nsole.log(attendanceDetails);
    const imageUrl = thisEmployee.image_url !== "" ? thisEmployee.image_url : 'https://static6.depositphotos.com/1007347/574/v/600/depositphotos_5749760-stock-illustration-football.jpg'
    return (
        <Box p={2} pl={'3'}>
            <Box py={3} mb={'2'}>
                <Heading size={'sm'}> Showing Record: {attendanceDetails.logIndate} </Heading>
            </Box>
            <HStack pl={'3'} alignItems={'center'} >
                <VStack pr={'2.5'}>
                    <Box>
                        {<Image source={{ uri: imageUrl }} style={{ width: 50, height: 50, borderWidth: 2, borderRadius: 75, borderColor: brdrCLR }} alt='image' />}
                    </Box>
                </VStack>
                <VStack w={"80%"} space={2} pl={2} borderLeftWidth={1 / 2} borderLeftColor={'#06b6d4'} _dark={{ borderLeftColor: '#cffafe' }}  >
                    <HStack>
                        <Heading size={'xs'}> LogIn Location: {attendanceDetails.loggedInLocation}  </Heading>
                    </HStack>
                    <HStack>
                        <Heading size={'xs'}> LogIn Time: {attendanceDetails.logInTime}  </Heading>
                    </HStack>
                    <Divider my="2" />
                    <HStack >
                        <Heading size={'xs'}> LogOut Location: {(attendanceDetails.logOutLocation === "") ? 'Not Available' : attendanceDetails.logOutLocation}  </Heading>
                    </HStack>
                    <HStack >
                        <Heading size={'xs'}> LogOut Date: {(attendanceDetails.logOutDate === "") ? 'Not Available' : attendanceDetails.logOutDate}  </Heading>
                    </HStack>
                    <HStack >
                        <Heading size={'xs'}> LogOut Time: {(attendanceDetails.logOutTime === "") ? 'Not Available' : attendanceDetails.logOutTime}  </Heading>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
}
export default AttendanceDetailsView;

