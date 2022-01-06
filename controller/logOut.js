import db from "../config/db.config";
import calculateDistance from "../GeoApi/CalculateDistance";
export default async function logOut(docID, date, time, attendanceDocID, allLocations, presentLocation) {

    var locationObject = calculateDistance("", presentLocation, allLocations)
    let logOutLocation = "Unknown"
    let logOutLocationID = "Unknown";
    if (locationObject.length > 0) {
        logOutLocation = locationObject[0].plot,
            logOutLocationID = locationObject[0].id
    }
    const batch = db.batch();
    const recordStatus = await isLogOutRecordExist(docID)

    try {
        if (!recordStatus) {
            const employeeRef = db.collection('employee').doc(docID);
            const attendanceRecRef = db.collection('attendanceDetails').doc(attendanceDocID);
            batch.update(employeeRef, { logOutDate: date, logOutTime: time });
            batch.update(attendanceRecRef, { logOutDate: date, logOutTime: time, logOutLocationID: logOutLocationID, logOutLocation: logOutLocation });
            await batch.commit();
            return 1;
        } else return 200;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

async function isLogOutRecordExist(docID) {
    const employeeRef = db.collection('employee').doc(docID);
    const doc = await employeeRef.get();
    if (doc.data().logOutTime === "") {
        return false
    } else return true
}