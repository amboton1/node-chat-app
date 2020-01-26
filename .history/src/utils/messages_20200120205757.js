const generateNewMessage = (msg) => {
    return {
        msg,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessages = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateNewMessage,
    generateLocationMessages
}