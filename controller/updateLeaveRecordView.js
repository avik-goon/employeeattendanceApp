import db from "../config/db.config";

export default async function updateLeaveRecordView(docID) {
    const leaveRecordsRef = db.collection('leaveRecords').doc(docID);

    await leaveRecordsRef.update({ empShowFlag: false });

}