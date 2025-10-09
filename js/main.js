// Main utilities for navigation and simulated state
// In-memory mock state; in real app, replaced by API/localStorage
const EduVerseState = {
	currentUser: null, // { id, role, name }
	enrollmentsByStudentId: {}, // { [studentId]: Set(courseId) }
};

/**
 * setUser sets the current user session (simulated)
 * @param {{id:number, role:'Student'|'Teacher'|'Admin', name:string}} user
 */
function setUser(user) {
	EduVerseState.currentUser = user;
	try {
		localStorage.setItem('eduverse_user', JSON.stringify(user));
	} catch (_) {}
}

/**
 * getUser reads the simulated session from memory or localStorage
 * @returns user or null
 */
function getUser() {
	if (EduVerseState.currentUser) return EduVerseState.currentUser;
	try {
		const raw = localStorage.getItem('eduverse_user');
		if (raw) {
			EduVerseState.currentUser = JSON.parse(raw);
			return EduVerseState.currentUser;
		}
	} catch (_) {}
	return null;
}

/**
 * routeTo navigates to a page while preserving simple session
 */
function routeTo(path) {
	window.location.href = path;
}

/**
 * ensureRole guards pages by role; redirects to login if mismatch
 * @param {('Student'|'Teacher'|'Admin')} role
 */
function ensureRole(role) {
	const user = getUser();
	if (!user || user.role !== role) {
		// Use root-absolute path to avoid relative path issues
		window.location.replace('/pages/login.html');
	}
	return user;
}

/**
 * helper: render simple list into container
 */
function renderList(container, items, renderItem) {
	container.innerHTML = '';
	for (const item of items) {
		container.appendChild(renderItem(item));
	}
}

/**
 * showToast shows a transient message to the user
 */
function showToast(message, variant = 'info') {
	let toast = document.createElement('div');
	toast.textContent = message;
	toast.className = `toast badge ${variant}`;
	Object.assign(toast.style, { position: 'fixed', bottom: '16px', right: '16px', zIndex: 1000 });
	document.body.appendChild(toast);
	setTimeout(() => toast.remove(), 1800);
}

// Expose for inline handlers
window.EduVerse = { setUser, getUser, routeTo, ensureRole, renderList, showToast };

