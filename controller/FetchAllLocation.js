import dbh from "../config/db.config";
import store from "../store/store";
import { locationsHandler } from "../store/reducers/CreateLocationState";
export default async function fetchLocationData() {
    const locationArray = new Array();
    const locationsRef = dbh.collection('locations');
    const snapshot = await locationsRef.get();
    snapshot.forEach(doc => {
        var temp = {
            ...doc.data(),
            id: doc.id
        }
        locationArray.push(temp)
    });

    store.dispatch(locationsHandler(locationArray));
}