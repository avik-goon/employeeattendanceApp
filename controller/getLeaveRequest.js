import db from "../config/db.config";

export default async function getLeaveRequest(setRecords, id) {
    const query = await db.collection('leaveRecords').where('userID', '==', id).where('empShowFlag', '==', true);
    const observer = query.onSnapshot(querySnapshot => {
        const records = [];
        setRecords([]);
        querySnapshot.forEach(record => {
            records.push({ ...record.data(), recordID: record.id });
        });
        setRecords([...records]);

    }, err => {
        console.log(`Encountered error: ${err}`);
    });
    return observer;
}