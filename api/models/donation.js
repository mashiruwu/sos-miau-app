class Donation {
    constructor({
      id,
      userId,
      userName,
      amount,
      date,
      area,
    } = {}) {
      this.id = id;             // optional: Firestore doc ID
      this.userId = userId;
      this.userName = userName;
      this.amount = amount;
      this.date = date;
      this.area = area;
    }
  }
  
  module.exports = Donation;