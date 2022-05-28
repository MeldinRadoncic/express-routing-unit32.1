
class ExpressError extends Error {
        constructor(msg,status) {
        super()
            this.msg = msg
            this.status = status
            console.error(this.stack);
            console.error('THIS IS FROM ERROR CLASS in expressError.js')
        }
}


module.exports = ExpressError
