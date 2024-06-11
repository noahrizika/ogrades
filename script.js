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
            target.textContent = Math.floor(Math.random() * (99 - (-3) + 1)) - 3;
            if (current >= end) {
                clearInterval(timer);
                target.textContent = end;
            }
        }, 1000);
    }
}

document.getElementById('startButton').addEventListener('click', function() {
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
            if (grade == '9b') {
                return '3'
            }
            else if (grade == '9a+') {
                return '2'
            }
            else if (grade == '9a') {
                return '1'
            }
            else if (grade == '8c+') {
                return '0 +'
            }
            else if (grade == '8c') {
                return '0'
            }
            else if (grade == '8b+') {
                return '0'
            }
            else if (grade == '8b') {
                return '0 -'
            }
            else if (grade == '8a+') {
                return '0 -'
            }
            else if (grade == '8a') {
                return '-1 +'
            }
            else if (grade == '7c+') {
                return '-1'
            }
            else if (grade == '7c') {
                return '-1 -'
            }
            else if (grade == '7b+') {
                return '-2 +'
            }
            else if (grade == '7b') {
                return '-2'
            }
            else if (grade == '7a+') {
                return '-2 -'
            }
            else if (grade == '7a') {
                return '-2 -'
            }            
            else if (Number(grade[0]) == 6) {
                return '-3'
            }
            else {
                return '-3 -'
            }

       case ('yOsemite'):
            if (grade == '5.15b') {
                return '3'
            }
            else if (grade == '5.15a') {
                return '2'
            }
            else if (grade == '5.14d') {
                return '1'
            }
            else if (grade == '5.14c') {
                return '0 +'
            }
            else if (grade == '5.14b') {
                return '0'
            }
            else if (grade == '5.14a') {
                return '0'
            }
            else if (grade == '5.13d') {
                return '0 -'
            }
            else if (grade == '5.13c') {
                return '0 -'
            }
            else if (grade == '5.13b') {
                return '-1 +'
            }
            else if (grade == '5.13a') {
                return '-1'
            }
            else if (grade == '5.12d') {
                return '-1 -'
            }
            else if (grade == '5.12c') {
                return '-2 +'
            }
            else if (grade == '5.12b') {
                return '-2'
            }
            else if (grade == '5.12a') {
                return '-2 -'
            }
            else if (grade == '5.11d') {
                return '-2 -'
            }
            else if (grade == '5.11c') {
                return '-3 +'
            }
            else if (grade == '5.11b') {
                return '-3'
            }
            else {
                return '-3 -'
            }
    }        
}

function isAllInputGiven(grade, climbName) {
    let userInputCount = 0;
    if (isNaN(grade[0]))
    {
        document.getElementById("climb's-grade-label").innerHTML = "climb's grade - please fOrmat the climb's grade properly";
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
        document.getElementById("ograde").innerHTML = 'X';
        document.getElementById("output-climb-name").innerHTML = 'X';
        document.getElementById("output-comment").innerHTML = 'fill Out the fOrm abOve this';
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
