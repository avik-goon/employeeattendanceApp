export default class AttendenceDetails {
    constructor(userID = "", name = "", logIndate = "", logInTime = "", logOutDate = "", logOutTime = "", empId = "") {
        this.userID = userID;
        this.name = name;
        this.logIndate = logIndate;
        this.logInTime = logInTime;
        this.logOutDate = logOutDate;
        this.logOutTime = logOutTime;
        this.empId = empId;
    }
}