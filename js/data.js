// Mock JSON-like data for EduVerse (students, teachers, courses, materials, schedules)

const students = [
	{ id: 1, name: "Kameshwar.S", class: "CSE-3B", attendance: 90, grade: "O" },
	{ id: 2, name: "Kavin Kumaran.S", class: "CSE-3B", attendance: 90, grade: "O" },
	{ id: 3, name: "Maheshvar.V", class: "CSE-3B", attendance: 89, grade: "O" },
	{ id: 4, name: "Manoj Kumar.M", class: "CSE-3B", attendance: 89, grade: "O" },
	{ id: 5, name: "Mohammed Ajaas.M", class: "CSE-3B", attendance: 92, grade: "O" },
	{ id: 6, name: "Mohammed Yahya.S", class: "CSE-3B", attendance: 89, grade: "O" },
	{ id: 7, name: "Noel Joshua Sanfred.F", class: "CSE-3B", attendance: 89, grade: "O" },
	{ id: 8, name: "Pradeep.S", class: "CSE-3B", attendance: 89, grade: "O" },
	{ id: 9, name: "Praveen Kumar.R", class: "CSE-3B", attendance: 91, grade: "O" },
	{ id: 10, name: "Rohit Prasad.M.R", class: "CSE-3B", attendance: 92, grade: "O" },
];

const teachers = [
	{ id: 1, name: "Dr. Vanitha", subject: "Database Management Systems", department: "Computer Science" },
	{ id: 2, name: "Dr. Jothi", subject: "Design and Analysis of Algorithms", department: "Computer Science" },
	{ id: 3, name: "Dr. Priyanka", subject: "Digital Principles and System of Design", department: "Electrical and Communication" },
	{ id: 4, name: "Dr. Lakshmi", subject: "Object Oriented Programming", department: "Computer Science" },
	{ id: 5, name: "Dr. Vijay Peter", subject: "Discrete Mathematics", department: "Science and Humanities" },
	{ id: 6, name: "Dr. Pavithra", subject: "Universal Human Values", department: "Computer Science" },
];

const courses = [
	{ id: 101, code: 'DBMS301', title: 'Database Management Systems', teacherId: 1, credits: 4 },
	{ id: 102, code: 'DAA302', title: 'Design and Analysis of Algorithms', teacherId: 2, credits: 4 },
	{ id: 103, code: 'DPSD205', title: 'Digital Principles and System Design', teacherId: 3, credits: 3 },
	{ id: 104, code: 'OOP204', title: 'Object Oriented Programming', teacherId: 4, credits: 4 },
	{ id: 105, code: 'DM201', title: 'Discrete Mathematics', teacherId: 5, credits: 3 },
	{ id: 106, code: 'UHV101', title: 'Universal Human Values', teacherId: 6, credits: 2 },
];

// Materials keyed by courseId
const materialsByCourse = {
	101: [
		{ id: 'm1', title: 'ER Diagrams 101', description: 'Intro to ER modeling', file: 'er-diagrams.pdf' },
		{ id: 'm2', title: 'Normalization Cheatsheet', description: '1NF to BCNF', file: 'normalization.pdf' },
	],
	102: [
		{ id: 'm3', title: 'Sorting Algorithms', description: 'Quick, Merge, Heap', file: 'sorting.pdf' },
	],
	104: [
		{ id: 'm4', title: 'OOP Basics', description: 'Classes and Objects', file: 'oop-basics.pdf' },
	]
};

// Simple class schedule
const schedule = [
	{ courseId: 101, day: 'Mon', time: '10:00 - 11:30', room: 'CS-201' },
	{ courseId: 102, day: 'Tue', time: '09:00 - 10:30', room: 'CS-105' },
	{ courseId: 103, day: 'Wed', time: '11:30 - 13:00', room: 'EC-301' },
	{ courseId: 104, day: 'Thu', time: '10:00 - 11:30', room: 'CS-204' },
	{ courseId: 105, day: 'Fri', time: '14:00 - 15:30', room: 'SH-110' },
];

/**
 * findTeacherById returns teacher object
 */
function findTeacherById(id) {
	return teachers.find(t => t.id === id) || null;
}

/**
 * listStudentEnrollments returns Set of courseIds for a student (simulated)
 */
function listStudentEnrollments(studentId) {
	const raw = localStorage.getItem(`enroll_${studentId}`);
	if (!raw) return new Set();
	try { return new Set(JSON.parse(raw)); } catch { return new Set(); }
}

/**
 * toggleEnrollment add/remove a courseId for student (simulated)
 */
function toggleEnrollment(studentId, courseId) {
	const set = listStudentEnrollments(studentId);
	if (set.has(courseId)) set.delete(courseId); else set.add(courseId);
	localStorage.setItem(`enroll_${studentId}`, JSON.stringify(Array.from(set)));
	return set;
}

// Expose for pages
window.EduData = { students, teachers, courses, materialsByCourse, schedule, findTeacherById, listStudentEnrollments, toggleEnrollment };

