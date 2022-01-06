import db from "../config/db.config";

export default async function registerExtraLoginLocation(data) {
    const employeeLoginLocationsRef = db.collection('employeeLoginLocations');
    const snapshot = await employeeLoginLocationsRef.where('userID', '==', data.userID).where('logOutTime', '==', "").get();
    if (snapshot.empty) {
        const res = await db.collection('employeeLoginLocations').add({ ...data });
        return res.id;

    } else {
        return -1;
    }


}

export async function getExtraLoginLocation(setState, id, date = null) {
    // Add a new document with a generated id.
    let query;
    date === null ?
        query = db.collection('employeeLoginLocations').where('userID', '==', id) : query = db.collection('employeeLoginLocations').where('userID', '==', id).where('loginDate', '==', date)
    const observer = query.onSnapshot(querySnapshot => {
        const arr = [];
        querySnapshot.forEach(rec => {
            arr.push({ ...rec.data(), recordID: rec.id })
        });
        setState([...arr]);
    }, err => {
        //console.log(`Encountered error: ${err}`);
    });
}