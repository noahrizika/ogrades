function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }


function animateCount(target, duration) {
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

document.getElementById('startButton').addEventListener('click', function() {
    console.log('clicked');
    const targetSpan = document.getElementById('count');
    animateCount(targetSpan, 5000); // 5000 milliseconds = 5 seconds
});


// Create and initialize the O-Grades HashMap
function createHashMap() {
    var oGrades = new Map();
    // Populate the hashmap with initial data
    // (climb name, [oGrade, comment])
    oGrades.set('myKey', ['myValue1', '2', '3',]);
    
    // Store the hashmap in sessionStorage
    sessionStorage.setItem('oGradesHashMap', JSON.stringify(Array.from(oGrades.entries())));
    return oGrades;
}

// Function to retrieve the hashmap from sessionStorage
function getHashMap() {
    var storedHashMap = sessionStorage.getItem('oGradesHashMap');
    if (storedHashMap) {
        return new Map(JSON.parse(storedHashMap));
    } else {
        // If hashmap doesn't exist in sessionStorage, create and return a new one
        return createHashMap();
    }
}

// create hashmap on load
var oGrades = getHashMap();

function getGrade() {
    let grade = document.getElementById('climbGradeInput').value;
    switch (grade) {
        case grade < 4: // but its gotta be for font grading
            document.getElementById("oGradeOutput").innerHTML = 'O0-3';
            break;
        case grade < 6: // but its gotta be for font grading
            document.getElementById("oGradeOutput").innerHTML = 'O0-2';
            break;
        case grade < 11: // but its gotta be for font grading
            document.getElementById("oGradeOutput").innerHTML = 'O0-1';
            break;
        default:
            let climbName = document.getElementById('climbNameInput').value;
            document.getElementById("oGradeOutput").innerHTML = oGrades.get(climbName)[0];
            document.getElementById("fGradeOutput").innerHTML = oGrades.get(climbName)[1];
            document.getElementById("commentOutput").innerHTML = oGrades.get(climbName)[2];
            // if climb name not a key, base value off of grade
    }
}
