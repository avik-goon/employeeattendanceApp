import { getDistance } from 'geolib';

export default function calculateDistance(_, presentLocationData, allLocations) {
    const presentLat = presentLocationData.coords.latitude;
    const presentLng = presentLocationData.coords.longitude;
    const userLocation = []
    allLocations.forEach(location => {
        var dis = getDistance(
            { latitude: presentLat, longitude: presentLng },
            { latitude: location.latitude, longitude: location.longitude },
        )
        if (dis < 1000) {
            userLocation.push({ ...location, distance: dis });
            return userLocation;
        }
    });

    return userLocation;
}

export const calculateSingleDistance = (userData, presentLocationData) => {
    const presentLat = presentLocationData.coords.latitude;
    const presentLng = presentLocationData.coords.longitude;

    const officeLat = userData[0].locationData.latitude;
    const officeLng = userData[0].locationData.longitude;
    var dis = getDistance(
        { latitude: presentLat, longitude: presentLng },
        { latitude: officeLat, longitude: officeLng },
    );
    // let distance = dis / 1000;
    return dis;
}