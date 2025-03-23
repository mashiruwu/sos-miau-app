class DonorOng {
    constructor({
      name,
      cnpj,
      adress,
      phone,
      email,
      website,
      foundation_date,
      description,
      socials,
      cats_available,
      cats_adopted,
    } = {}) {
      this.name = name;
      this.cnpj = cnpj;
      this.adress = adress;
      this.phone = phone;
      this.email = email;
      this.website = website;
      this.foundation_date = foundation_date;
      this.description = description;
      this.socials = socials;
      this.cats_available = cats_available;
      this.cats_adopted = cats_adopted;
    }
  }
  
  module.exports = DonorOng;
  