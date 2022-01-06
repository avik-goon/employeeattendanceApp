import dbh from "../config/db.config";

export default getAttendenceByID = async (emp_ID, setAttendanceRecord) => {
    const attendanceDetailsRef = dbh.collection('attendanceDetails').where('userID', '==', emp_ID);
    const attendanceRecords = [];
    await attendanceDetailsRef.get().then((snapshot) => {
        snapshot.forEach(attendanceRecord => {
            attendanceRecords.push({ ...attendanceRecord.data() })
        });
        setAttendanceRecord([...attendanceRecords])
    }).catch(err => console.warn(err))
    return true;
}