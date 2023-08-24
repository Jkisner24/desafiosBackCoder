class TicketRepository {
    constructor(dao){
        this.dao = dao
    }

    getTickets = async() => {
        try {
            return await this.dao.get()
        } catch (error) {
            throw error
        }
    }

    getTicket = async(tid) => {
        try {
            return await this.dao.getById(tid)
        } catch (error) {
            throw error
        }
    }

    createTicket = async(ticket) => {
        try {
            return await this.dao.create(ticket)
        } catch (error) {
            throw error
        }
    }
}

module.exports = TicketRepository
