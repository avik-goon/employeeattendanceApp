import db from "../config/db.config";

export default async function updatePassword(docID, details, setIsSpinnerVisible, setChangeDetails) {

    const employeeRef = db.collection('employee').doc(docID);
    let doc = null;
    try {
        doc = await employeeRef.get();
    } catch (err) {
        setIsSpinnerVisible(false);
        setChangeDetails({})
    }
    if (doc === null || !doc.exists) {
        // console.log('No such document!');
        return -1;
    } else {
        if (doc.data().password === details.old_password && doc.data().emp_id === details.emp_id) {
            await employeeRef.update({ password: details.new_password });
            return 1;
        } else return -2;
    }

}