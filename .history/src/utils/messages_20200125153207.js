const generateNewMessage = (msg) => {
    return {
        msg,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessages = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateNewMessage,
    generateLocationMessages
}