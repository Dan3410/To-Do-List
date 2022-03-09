const user = { username: "user", password: "password" };

export function userNotEmpty (username: string) {
    if (username === "") throw new Error("You must enter the username");
}

export function passwordNotEmpty (password: string){
    if (password === "") throw new Error("You must enter the password");
}

export function usernameExists(username: string){
    if (username !== user.username) throw new Error("Invalid username");
}

export function correctPassword(password: string){
    if (password !== user.password) throw new Error("Incorrect password")
}