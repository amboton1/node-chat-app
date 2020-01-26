const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate the user
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store the user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

addUser({
    id: 23,
    username: 'Ammar',
    room: 'Pula'
})

console.log(users)

const test = addUser({
    id: 23,
    username: '',
    room: ''
})

console.log(test)