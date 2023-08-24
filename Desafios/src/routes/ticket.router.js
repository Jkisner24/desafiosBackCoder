const TicketController = require("../controllers/tickets.controller");
const { RouterClass } = require("./routerClass");
/* const { passportAuth } = require('../passport-JWT/passportAuth')
 */

const ticket = new TicketController()

class TicketRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], /* passportAuth('jwt'), */ ticket.getTickets )
        this.get('/:tid', ['PUBLIC'], /* passportAuth('jwt'), */ ticket.getTicket)
    }
}
module.exports = TicketRouter