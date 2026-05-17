document.addEventListener('DOMContentLoaded', () => {
    const gradeForm = document.getElementById('gradeForm');
    const gradeTableBody = document.getElementById('gradeTableBody');
    const averageGradeDisplay = document.getElementById('averageGrade');
    const deleteBtn = document.getElementById('deleteBtn');

    let grades = JSON.parse(localStorage.getItem('grades')) || [];

    gradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const studentGrade = parseFloat(document.getElementById('grade').value);

        if (studentName && !isNaN(studentGrade)) {
            addGrade(studentName, studentGrade);
            gradeForm.reset();
        }
    });

    updateGradeTable();
    updateAverageGrade();

    function addGrade(name, grade) {
        // grades.push({ name, grade, id: Date.now() });
        const newGrade = { name, grade, id: Date.now() };
        const storedGrades = JSON.parse(localStorage.getItem('grades')) || [];
        storedGrades.push(newGrade);
        localStorage.setItem('grades', JSON.stringify(storedGrades));
        updateGradeTable();
        updateAverageGrade();
    }

    function updateGradeTable() {
        const storedGrades = JSON.parse(localStorage.getItem('grades')) || [];
        gradeTableBody.innerHTML = '';
        let _this = this;

        storedGrades.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${entry.name}</td><td>${entry.grade.toFixed(2)}</td>`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('data-id', entry.id);
            deleteBtn.addEventListener('click', () => {
                deleteGrade(entry.id);
            });
            row.appendChild(deleteBtn);
            gradeTableBody.appendChild(row);
        });
    }

    function deleteGrade(id) {
        const storedGrades = JSON.parse(localStorage.getItem('grades')) || [];
        grades = storedGrades.filter(entry => entry.id !== id);
        localStorage.setItem('grades', JSON.stringify(grades));
        console.log(grades);
        updateGradeTable();
        updateAverageGrade();
    }

    function updateAverageGrade() {
        const storedGrades = JSON.parse(localStorage.getItem('grades')) || [];
        if (storedGrades.length === 0) {
            averageGradeDisplay.textContent = 'N/A';
            return;
        }
        const total = storedGrades.reduce((sum, entry) => sum + entry.grade, 0);
        const average = total / storedGrades.length;
        averageGradeDisplay.textContent = average.toFixed(2);
    }
});
