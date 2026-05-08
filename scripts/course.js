const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        completed: true // Set to true if you have finished it
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more proficient...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on concepts learned in WDD 130...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of...',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience...',
        completed: false
    }
];

const courseListContainer = document.querySelector('#course-list');
const totalCreditsDisplay = document.querySelector('#total-credits');

function displayCourses(filteredCourses) {
    courseListContainer.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.className = `course-pill ${course.completed ? 'completed' : 'not-completed'}`;
        courseCard.textContent = `${course.subject} ${course.number}`;
        
        courseListContainer.appendChild(courseCard);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `The total credits for the courses listed above is ${totalCredits}`;
}

// Event Listeners for Filters
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === 'CSE'));
});
document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === 'WDD'));
});

// Initial Load
displayCourses(courses);