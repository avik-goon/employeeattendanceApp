import db from "../config/db.config";

export default async function logoutFromExternalLocation(userID, docID, date, time) {
    const employeeLoginLocationsRef = db.collection('employeeLoginLocations').doc(docID);
    await employeeLoginLocationsRef.update({ logOutDate: date, logOutTime: time });
}