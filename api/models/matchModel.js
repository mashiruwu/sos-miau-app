class Match {
    constructor({
      id,
      adopter_id,
      cat_id,
      date,
    } = {}) {
      this.id = id;
      this.adopter_id = adopter_id;
      this.cat_id = cat_id;
      this.date = date;
    }
  }
  
  module.exports = Match;
  