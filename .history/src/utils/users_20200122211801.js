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

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    const usersInRoom = users.find((user) => user.room === room)

    if (usersInRoom) {
        return users[usersInRoom]
    } else {
        return []
    }
}

addUser({
    id: 23,
    username: 'Ammar',
    room: 'Pula'
})

addUser({
    id: 33,
    username: 'Mike',
    room: 'Pula'
})

addUser({
    id: 43,
    username: 'Lily',
    room: 'Central Park'
})

const user = getUser(43)
const usersInRoom = getUsersInRoom('pula')


console.log(user)
console.log(usersInRoom)