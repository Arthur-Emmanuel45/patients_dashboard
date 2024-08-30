//get respiration element from the DOM
const respRate = document.getElementById("resp-rate");
const respStatus = document.getElementById("resp-status");

//get temperauture element from the DOM
const tempValue = document.getElementById("temp-value");
const tempStatus = document.getElementById("temp-status");

//get Heart element from the DOM
const heartRate = document.getElementById("heart-rate");
const heartStatus = document.getElementById("heart-status");

//get element for the legends blood pressure chart
const systolicValue = document.getElementById("systolic-value");
const systolicStatus = document.getElementById("systolic-status");
const diasystolicValue = document.getElementById("diastolic-value");
const diasystolicStatus = document.getElementById("diastolic-status");

//get element for the patient profile detiles
let pName = document.getElementById("profile-name");
let pImage = document.getElementById("profile-image");
let pDateOfBirth = document.getElementById("profile-date");
let gender = document.getElementById("gender");
let contactInfo = document.getElementById("contact-info");
let emergencyContact = document.getElementById("emergency-contact");
let insuranceProvider = document.getElementById("insurance-provider");

let username = 'coalition';
let password = 'skills-test';
//authentication of the api url
let auth = btoa(`${username}:${password}`);

//fetchinng patients data
async function loadData() {
    try {
        const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        if(!response.ok) {
            throw new Error("Could not load data");
        }
        const data =  await response.json();
        displayData(data)
    }
    catch(error) {
        console.log(error);
    }
}
loadData();

//display data on the screen
const displayData = (data) => {
    //display respiration rate detiles
    respRate.innerHTML = data[3].diagnosis_history[0].respiratory_rate.value + " " + "bpm";
    respStatus.innerHTML= data[3].diagnosis_history[0].respiratory_rate.levels;

    //display temperature detiles
    tempValue.innerHTML = data[3].diagnosis_history[0].temperature.value + " " + "\u00B0" + "F";
    tempStatus.innerHTML= data[3].diagnosis_history[0].temperature.levels;

    //display heart rate detiles
    heartRate.innerHTML = data[3].diagnosis_history[0].heart_rate.value + " " + "bpm";
    heartStatus.innerHTML= data[3].diagnosis_history[0].heart_rate.levels;
    console.log(data[3]);

    //display legends detiles
    systolicValue.innerHTML = data[3].diagnosis_history[0].blood_pressure.systolic.value;
    systolicStatus.innerHTML = data[3].diagnosis_history[0].blood_pressure.systolic.levels;
    diasystolicValue.innerHTML = data[3].diagnosis_history[0].blood_pressure.diastolic.value;
    diasystolicStatus.innerHTML = data[3].diagnosis_history[0].blood_pressure.diastolic.levels;

    //display patients profle detiles
    pImage.src = data[3].profile_picture;
    pName.innerHTML = data[3].name;
    pDateOfBirth.innerHTML = data[3].date_of_birth;
    gender.innerHTML = data[3].gender;
    contactInfo.innerHTML = data[3].phone_number;
    emergencyContact.innerHTML = data[3].emergency_contact;
    insuranceProvider.innerHTML = data[3].insurance_type;
}