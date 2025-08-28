class GradeCalculator {
    constructor() {
        this.students = [];
        this.isSorted = false;
        
        this.initializeEventListeners();
        this.loadTheme();
        this.loadStudents();
        this.updateStats();
    }

    initializeEventListeners() {
        // Form submission
        document.getElementById('student-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addStudent();
        });

        // Theme toggle
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Sort button
        document.getElementById('sort-btn').addEventListener('click', () => {
            this.toggleSort();
        });

        // Clear all button
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearAllStudents();
        });
    }

    addStudent() {
        const name = document.getElementById('student-name').value.trim();
        const age = parseInt(document.getElementById('student-age').value);
        const grade = parseFloat(document.getElementById('student-grade').value);

        if (!name || isNaN(age) || isNaN(grade)) {
            this.showNotification('Please fill in all fields correctly', 'error');
            return;
        }

        if (age < 5 || age > 100) {
            this.showNotification('Age must be between 5 and 100', 'error');
            return;
        }

        if (grade < 0 || grade > 100) {
            this.showNotification('Grade must be between 0 and 100', 'error');
            return;
        }

        const student = {
            id: Date.now(),
            name: name,
            age: age,
            grade: grade,
            letterGrade: this.calculateLetterGrade(grade),
            isPassing: this.isPassing(grade)
        };

        this.students.push(student);
        this.saveStudents();
        this.updateStats();
        this.renderStudents();
        this.resetForm();
        
        const status = student.isPassing ? 'PASSED' : 'FAILED';
        this.showNotification(`${name} got ${student.letterGrade} (${student.grade}%) - ${status}!`, 'success');
    }

    calculateLetterGrade(grade) {
        if (grade >= 95) return 'A+';
        if (grade >= 85) return 'A';
        if (grade >= 70) return 'B';
        if (grade >= 60) return 'C';
        if (grade >= 50) return 'D';
        return 'F';
    }

    isPassing(grade) {
        return grade >= 50;
    }

    getGradeClass(letterGrade) {
        return `grade-${letterGrade.toLowerCase()}`;
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.saveStudents();
        this.updateStats();
        this.renderStudents();
        this.showNotification('Student removed successfully!', 'success');
    }

    clearAllStudents() {
        if (this.students.length === 0) {
            this.showNotification('No students to clear', 'warning');
            return;
        }

        if (confirm('Are you sure you want to clear all students? This action cannot be undone.')) {
            this.students = [];
            this.saveStudents();
            this.updateStats();
            this.renderStudents();
            this.showNotification('All students cleared successfully!', 'success');
        }
    }

    toggleSort() {
        this.isSorted = !this.isSorted;
        const sortBtn = document.getElementById('sort-btn');
        
        if (this.isSorted) {
            this.students.sort((a, b) => b.grade - a.grade);
            sortBtn.innerHTML = '<i class="fas fa-sort-amount-down"></i> Sorted (High to Low)';
            sortBtn.classList.add('btn-primary');
        } else {
            this.students.sort((a, b) => a.grade - b.grade);
            sortBtn.innerHTML = '<i class="fas fa-sort-amount-up"></i> Sorted (Low to High)';
            sortBtn.classList.add('btn-primary');
        }
        
        this.renderStudents();
    }

    updateStats() {
        const totalStudents = this.students.length;
        const averageGrade = totalStudents > 0 
            ? (this.students.reduce((sum, student) => sum + student.grade, 0) / totalStudents).toFixed(1)
            : 0;
        const highestGrade = totalStudents > 0 
            ? Math.max(...this.students.map(student => student.grade))
            : 0;
        const aPlusStudents = this.students.filter(student => student.letterGrade === 'A+').length;
        const aStudents = this.students.filter(student => student.letterGrade === 'A').length;
        const passingStudents = this.students.filter(student => student.isPassing).length;
        const failingStudents = totalStudents - passingStudents;

        document.getElementById('total-students').textContent = totalStudents;
        document.getElementById('average-grade').textContent = `${averageGrade}%`;
        document.getElementById('highest-grade').textContent = `${highestGrade}%`;
        document.getElementById('a-plus-students').textContent = aPlusStudents;
        document.getElementById('a-students').textContent = aStudents;
        document.getElementById('passing-students').textContent = passingStudents;
        document.getElementById('failing-students').textContent = failingStudents;
    }

    renderStudents() {
        const studentsList = document.getElementById('students-list');
        
        if (this.students.length === 0) {
            studentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-graduate"></i>
                    <p>No students added yet. Add your first student above!</p>
                </div>
            `;
            return;
        }

        studentsList.innerHTML = this.students.map(student => `
            <div class="student-card ${student.isPassing ? 'passing' : 'failing'}" data-id="${student.id}">
                <div class="student-info">
                    <div class="grade-above-name ${this.getGradeClass(student.letterGrade)}">
                        ${student.letterGrade}
                    </div>
                    <h4>${student.name}</h4>
                    <p>Age: ${student.age} | Grade: ${student.grade}%</p>
                    <div class="pass-status ${student.isPassing ? 'pass' : 'fail'}">
                        <i class="fas fa-${student.isPassing ? 'check-circle' : 'times-circle'}"></i>
                        ${student.isPassing ? 'PASS' : 'FAIL'}
                    </div>
                </div>
                <div class="grade-display">
                    <div class="grade ${this.getGradeClass(student.letterGrade)}">
                        ${student.letterGrade}
                    </div>
                    <button class="delete-btn" onclick="gradeCalculator.deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    resetForm() {
        document.getElementById('student-form').reset();
        document.getElementById('student-name').focus();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'}-color);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    toggleTheme() {
        const body = document.body;
        const themeBtn = document.getElementById('theme-btn');
        const icon = themeBtn.querySelector('i');
        
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeBtn = document.getElementById('theme-btn');
        const icon = themeBtn.querySelector('i');
        
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            icon.className = 'fas fa-sun';
        }
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    loadStudents() {
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
            this.students = JSON.parse(savedStudents);
            this.renderStudents();
        }
    }
}

// Initialize the grade calculator when DOM is loaded
let gradeCalculator;
document.addEventListener('DOMContentLoaded', () => {
    gradeCalculator = new GradeCalculator();
});
