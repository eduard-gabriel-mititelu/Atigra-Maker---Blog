function initStorage() {

    if (!localStorage.getItem('users')) {

        const defaultAdmin = {
            users : [
                {
                    id: "u1",
                    username: "atigra_admin",
                    email: "admin@atigra.com",
                    password: hashPassword("admin123"),
                    role: "admin"
                }
            ]
        };
        localStorage.setItem('users', JSON.stringify(defaultAdmin));
    }

    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify({ posts: [] }));
    }

    if (!localStorage.getItem('comments')) {
        localStorage.setItem('comments', JSON.stringify({ comments: [] }));
    }
}

function hashPassword(password) {
    let hash = 5381;

    for (let i = 0; i < password.length; i++) {
        hash = (hash * 33) ^ password.charCodeAt(i);
    }

    return (hash >>> 0).toString(16);
}

function register(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users'));

    if (data.users.find(u => u.email === email.toLowerCase())) {
        return {success: false, message: "This email is aleady registered"};
    }

    if (data.users.find(u => u.username === username.toLowerCase())) {
        return {success: false, message: "This username is already taken"};
    }

    const newUser = {
        id: "u" + (Date.now()),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashPassword(password),
        role: "user"
    };

    data.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(data));
    const session = {...newUser};
    delete session.password;

    localStorage.setItem('session', JSON.stringify(session));
    return {success: true, user: session};
}

function login(email, password) {

    const data = JSON.parse(localStorage.getItem('users'));
    const user = data.users.find(u => u.email === email.toLowerCase().trim());

    if (!user) {
        return {success: false, message: "No user found with this email"};
    }

    if (user.password !== hashPassword(password)) {
        return {success: false, message: "Incorrect password"};
    }

    const session = {...user};
    delete session.password;
    localStorage.setItem('session', JSON.stringify(session));

    const session = {...user};
    delete session.password;
    localStorage.setItem('session', JSON.stringify(session));
    return {success: true, user: session};
}

function logout() {
    localStorage.removeItem('session');
    window.location.href = "../index.html";
}

function getCurrentUser() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
}

function logedIn() {
    return getCurrentUser() !== null;
}

function isAdmin() {
    const user = getCurrentUser();
    return user !== null && user.role === "admin";
}

