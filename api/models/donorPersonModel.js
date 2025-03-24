class DonorPerson {
    constructor({
      name,
      surname,
      cpf,
      email,
      photo_url,
      birthday,
      phone,
      cats_available,
      cats_adopted,
    } = {}) {
      this.name = name;
      this.surname = surname;
      this.cpf = cpf;
      this.email = email;
      this.photo_url = photo_url;
      this.birthday = birthday;
      this.phone = phone;
      this.cats_available = cats_available;
      this.cats_adopted = cats_adopted;
    }
  }
  
  module.exports = DonorPerson;
  