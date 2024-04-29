function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

// function isNumber(evt) {
//     evt = (evt) ? evt : window.event;
//     var charCode = (evt.which) ? evt.which : evt.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//         return false;
//     }
//     return true;
// }

function animateCount(target, duration) {
    if (!isNaN(target))
    {
    
        const start = 0;
        const end = parseInt(target.textContent);
        const range = end - start;
        const increment = range / (duration / 1000);
        let current = start;
        const timer = setInterval(function() {
            current += increment;
            target.textContent = Math.round(current);
            if (current >= end) {
                clearInterval(timer);
                target.textContent = end;
            }
        }, 1000);
    }
}

document.getElementById('startButton').addEventListener('click', function() {
    console.log('clicked');
    const targetSpan = document.getElementById('ograde');
    animateCount(targetSpan, 5000); // 5000 milliseconds = 5 seconds
});

// Function to parse CSV data
var content_length = 0;
function parseCSV(csvContent) {
    const rows = csvContent.trim().split('\n');
    const hashmap = {};

    rows.forEach(row => {
        const columns = row.split(',');
        const key = columns[0];
        const values = columns.slice(1);
        hashmap[key] = values;
        content_length += 1
    });

    return hashmap;
}

// Fetch the CSV file
var filepath = 'ogrades_final.csv'
var content;
var content_length;
fetch(filepath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(csvContent => {
        // Parse the CSV data
        content = parseCSV(csvContent);

        // name = 0
        // grade = 1
        // comment = 2
        // location = 3
    })
    .catch(error => {
        console.error('Error fetching the CSV file:', error);
    });
    
function getKeyByClimbName(content, content_length, name) {
    // var keys = [];
    for (let i = 0; i <= 10; i++) {
        if (name == content[i][0]) {
            // keys.push(i);
            
            return i;
        }
    }
    // if there is more than one climb with the same name... determine based on grade? location?
    // if (keys.length >= 1) {
    // }
    return (-1);
}

function getAverageGrade(grade_type, grade) {
    console.log(grade);
    switch (grade_type) {
        case ('huecO/v'):
            let int_grade_h = Number(grade)
            if (int_grade_h < 4) {
                return '-3';
            }
            else if (int_grade_h < 6) {
                return '-2';
            }
            else if (int_grade_h < 11) {
                return '-1';
            }
            else {
                return 0
            }
        case ('fOnt/bleau'):
            let int_grade_fo = Number(grade[0])
            if (int_grade_fo < 5) {
                return '-3'
            }
            else if (int_grade_fo < 6) {
                return '-2'
            }
            else if (int_grade_fo < 8) {
                return '-1'
            }
            else {
                return '0'
            }
        case ('french'):
            let int_grade_fr = Number(grade[0])
            if (int_grade_fr < 6) {
                return '-3'
            }
            else if (int_grade_fr < 7) {
                return '-2'
            }
            else if (int_grade_fr < 8) {
                return '-1'
            }
            else {
                return '0'
            }     
       case ('yOsemite'):
        let int_grade_y = Number(grade[3])
            if (grade.length < 4) {
                return '-3 -'
            }
            if (int_grade_y < 1) {
                return '-3'
            }
            else if (int_grade_y < 2) {
                return '-2'
            }
            else if (int_grade_y < 3) {
                return '-1'
            }
            else {
                return '0'
            } 
        default:
            return 'fill out'
    }        
}

function isAllInputGiven(grade, climbName) {
    let userInputCount = 0;
    if (isNaN(grade[0]))
    {
        document.getElementById("climb's-grade-label").innerHTML = "climb's grade - please format the climb's grade properly";
    }
    else {
        document.getElementById("climb's-grade-label").innerHTML = "climb's grade";
        userInputCount = userInputCount + 1;
    }

    if (climbName == '')
    {
        document.getElementById("climb-name-label").innerHTML = "climb's name - please input the climb's name";
    }
    else {
        document.getElementById("climb-name-label").innerHTML = "climb's name";
        userInputCount = userInputCount + 1;
    }

    if (userInputCount < 2) {
        document.getElementById("output-climb-name").innerHTML = 'fill out';
        document.getElementById("ograde").innerHTML = 'the form';
        document.getElementById("output-comment").innerHTML = 'above this';
        return false;
    }
    else {
        document.getElementById("climb's-grade-label").innerHTML = "climb's grade";
        document.getElementById("climbNameInput").innerHTML = "climb's name";
        return true;
    }
}

function getGrade() {
    let grade = document.getElementById('climbGradeInput').value;
    let climbName = document.getElementById('climbNameInput').value.toLowerCase();

    if (!isAllInputGiven(grade, climbName)) {
        return
    }
    console.log('here');
    let index = getKeyByClimbName(content, content_length, climbName);
    
    // if climb name not in database, determine the grade based on its "official" grade
    if (index == -1) {
        let grade_type = document.getElementById('gradeSystemInput').value;
        document.getElementById("ograde").innerHTML = getAverageGrade(grade_type, grade);
        document.getElementById("output-comment").innerHTML = '';
    }
    // else use the csv file to determine the grade
    else {
        document.getElementById("ograde").innerHTML = content[index][1];
        document.getElementById("output-comment").innerHTML = content[index][2];
    }
    document.getElementById("output-climb-name").innerHTML = climbName;
}
