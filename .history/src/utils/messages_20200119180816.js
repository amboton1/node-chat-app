const generateNewMessage = (msg) => {
    return {
        msg,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateNewMessage
}