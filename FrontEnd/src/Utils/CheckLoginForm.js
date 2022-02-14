const user = { username: "user", password: "password" };

export function userNotEmpty (username) {
    if (username === "") throw new Error("You must enter the username");
}

export function passwordNotEmpty (password){
    if (password === "") throw new Error("You must enter the password");
}

export function usernameExists(username){
    if (username !== user.username) throw new Error("Invalid username");
}

export function correctPassword(password){
    if (password !== user.password) throw new Error("Incorrect password")
}