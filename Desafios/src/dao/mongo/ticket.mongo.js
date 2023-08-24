const { ticketModel } = require("./model/ticket.model");

class TicketDaoMongo {
  create = async (ticket) => {
    try {
      return await ticketModel.create(ticket);
    } catch (error) {
      console.log(error);
    }
  };

  get = async () => {
    try {
      return await ticketModel.find();
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (tid) => {
    try {
      return await ticketModel.findById(tid);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = TicketDaoMongo
