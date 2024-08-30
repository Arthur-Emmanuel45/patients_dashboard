//get element for navigation selected display
const navLists = document.querySelectorAll("li");

//on active navigation display
navLists.forEach(navList => {
    navList.addEventListener("click", () => {
        navLists.forEach(navLink => {
            navLink.classList.remove("nav-background-color");
        });
        navList.classList.add("nav-background-color");
    });
})

//get element for patients list selected display
const patientsSelection = document.querySelectorAll(".user-identity-container");

//on active for patients display
patientsSelection.forEach(patientSelectionList => {
    patientSelectionList.addEventListener("click", () => {
        patientsSelection.forEach(patientSelection => {
            patientSelection.classList.remove("user-identity-active-on");
        });
        patientSelectionList.classList.add("user-identity-active-on");
    });
})
//get element for moblie display patient Info
const patientsList = document.querySelector(".patients-list");
const patientsInfo = document.querySelector(".patients-info");
const leftPanel = document.querySelector(".left-panel");
const rightPanel = document.querySelector(".right-panel");

//display patients list on moblie
patientsList.addEventListener("click", () => {
    leftPanel.classList.toggle("left-panel-on");
});

//display patients information on moblie
patientsInfo.addEventListener("click", () => {
    rightPanel.classList.toggle("right-panel-on");
})

//get left panel patients elements from the DOM
const patientNames = document.querySelectorAll("h1");
const patientImages = document.querySelectorAll(".user-identity-image");
const patientsGender = document.querySelectorAll(".patients-gender");
const patientsAge = document.querySelectorAll(".patients-age");

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
const pName = document.getElementById("profile-name");
const pImage = document.getElementById("profile-image");
const pDateOfBirth = document.getElementById("profile-date");
const gender = document.getElementById("gender");
const contactInfo = document.getElementById("contact-info");
const emergencyContact = document.getElementById("emergency-contact");
const insuranceProvider = document.getElementById("insurance-provider");

//get element for the graph
const graph = document.getElementById("graph");

const username = 'coalition';
const password = 'skills-test';
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
        return data;
    }
    catch(error) {
        console.log(error);
    }
}

//display data on the screen
const displayProfilesData = (data) => {

    //display left panel patients info
    for(let i = 0; i < patientNames.length - 1 ; i++) {
        patientNames[i + 1].innerHTML = data[i].name;
    }
    for(let i = 0; i < patientImages.length - 1 ; i++) {
        patientImages[i + 1].src = data[i].profile_picture;
    }
    for(let i = 0; i < patientsGender.length; i++) {
        patientsGender[i].innerHTML = data[i].gender + ",";
    }
    for(let i = 0; i < patientsAge.length; i++) {
        patientsAge[i].innerHTML = " " + data[i].age;
    }

    //display respiration rate detiles
    respRate.innerHTML = data[3].diagnosis_history[0].respiratory_rate.value + " " + "bpm";
    respStatus.innerHTML= data[3].diagnosis_history[0].respiratory_rate.levels;

    //display temperature detiles
    tempValue.innerHTML = data[3].diagnosis_history[0].temperature.value + " " + "\u00B0" + "F";
    tempStatus.innerHTML= data[3].diagnosis_history[0].temperature.levels;

    //display heart rate detiles
    heartRate.innerHTML = data[3].diagnosis_history[0].heart_rate.value + " " + "bpm";
    heartStatus.innerHTML= data[3].diagnosis_history[0].heart_rate.levels;

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
//the chart function

const bpchart = (data) => {

    // logic for the lablels
    const months = data[3].diagnosis_history.slice(0, 6).map(month => month.month);
    const years = data[3].diagnosis_history.slice(0, 6).map(year => year.year);
    const labels = [];

    for( let v = 0; v <= 5; v++) {
        let label = months[v] + "," + years[v];
        labels.push(label);
    }

    //data for systolic values
    const systolicData = data[3].diagnosis_history.slice(0, 6).map(bloodPressure => bloodPressure.blood_pressure.systolic.value);

    //data for diastolic values
    const diastolicData = data[3].diagnosis_history.slice(0, 6).map(bloodPressure => bloodPressure.blood_pressure.diastolic.value);

    new Chart(graph,
        {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                {
                    label: 'Systolic',
                    fill: 'false',
                    lineTension: 0.5,
                    backgroundColor: '#C26EB4',
                    borderColor: '#C26EB4',
                    borderCapStyle: 'round',
                    borderJoinStyle: 'round',
                    borderWidth: 2,
                    pointBorderWidth: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    pointBackgroundColor: '#E66FD2',
                    data: systolicData,
                },
                {
                label: 'Diastolic',
                fill: 'false',
                lineTension: 0.5,
                backgroundColor: '#7E6CAB',
                borderColor: '#7E6CAB',
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                borderWidth: 2,
                pointBorderWidth: 5,
                pointRadius: 1,
                pointHitRadius: 10,
                pointBackgroundColor: '#7E6CAB',
                data: diastolicData,
                }
                ]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            maxTicksLimit: 6,
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0,
                            align: 'center',
                            font: {
                                size: 9,
                            }
                        }
                    }
                }
            }
        }
    );
}


// fatch data from the api and display data
loadData()
  .then(data => {
    displayProfilesData(data);
    bpchart(data);
  })
  .catch(error => {
    console.error(error);
});