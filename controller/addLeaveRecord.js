import db from "../config/db.config";

export default async function addLeaveRecord(record, user) {

    const modifiedRecord = {
        ...record,
        userID: user.id,
        empID: user.emp_id,
        avatar_URL: user.image_url,
        fullname: user.name,
        officename: user.locationData.plot,
        userEmail: user.email,
        status: "pending",
        msgFromAdmin: "",
        empShowFlag: true
    }

    const leaveRef = db.collection('leaveRecords');
    const snapshot = await leaveRef.where('userID', '==', modifiedRecord.userID).where('status', '==', 'pending').get();
    if (snapshot.empty) {
        const res = await leaveRef.add({ ...modifiedRecord });
        return res.id;
    } else return -1;

}

