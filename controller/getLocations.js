import db from "../config/db.config";

export default async function getAllLocations(setState) {
    const locationsRef = db.collection('locations');
    const snapshot = await locationsRef.get();
    if (snapshot.empty) {
        // console.log('No matching documents.');
        return;
    }
    const loc = [];
    snapshot.forEach(doc => {
        loc.push({ ...doc.data(), id: doc.id });
    });
    setState([...loc])
}