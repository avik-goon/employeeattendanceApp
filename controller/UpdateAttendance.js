import dbh from "../config/db.config";
import store from "../store/store";
import { createAttendanceRecordID } from "../store/reducers/AttendanceIDSetter";
export default async function updateAttendanceDetails(attendenceDetails, userLocation) {
    var attendanceDetailsRef = dbh.collection('attendanceDetails');
    let x = 0;
    try {
        const snapshot = await attendanceDetailsRef.where('userID', '==', attendenceDetails.userID).where('logIndate', '==', attendenceDetails.logIndate).get();
        if (snapshot.empty) {
            // console.log('creating details');
            const res = await dbh.collection('attendanceDetails').add({ ...attendenceDetails, loggedInLocation: userLocation.plot, logOutLocation: "", loggedInLocationID: userLocation.id, logOutLocationID: "" });
            store.dispatch(createAttendanceRecordID(res.id))
            return res.id;
        } else {
            snapshot.forEach(element => {
                store.dispatch(createAttendanceRecordID(element.id))
                if (element.data().logInTime !== "") {
                    x = 1;
                    //console.log('details exist');
                }
            });
            if (x === 1) return 200; else throw 'Unknown Error Occured'
        }
    } catch (error) {
        console.error(error);
        return -1;
    }
} 