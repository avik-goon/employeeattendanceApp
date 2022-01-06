import dbh from "../config/db.config";

export default async function getUserDetails(email, password) {
    const employeeRef = dbh.collection('employee');
    let tempUser = {}
    const user = [];
    const snapshot = await employeeRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {

        return -1;
    }
    let locId = '';
    snapshot.forEach((doc) => {
        locId = doc.data().locationID;
        tempUser = { ...doc.data(), id: doc.id }
    });

    const locationRef = dbh.collection('locations').doc(locId);
    const doc = await locationRef.get();
    if (!doc.exists) {
        // console.log('No such document!');
        return -1;
    } else {
        user.push({ ...tempUser, locationData: { ...doc.data() } })
    }

    if (user.length > 0) {
        return user
    } else return -1;
}