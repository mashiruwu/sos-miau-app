class Adopter {
    constructor({
      id,
      name,
      surname,
      cpf,
      email,
      password,
      photo_url,
      address,
      apartment,
      birthday,
      phone,
      adoptions,
      has_protection_net,
      likes,
      dislikes,
    }) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.cpf = cpf;
      this.email = email;
      this.password = password;
      this.photo_url = photo_url;
      this.address = address;
      this.apartment = apartment;
      this.birthday = birthday;
      this.phone = phone;
      this.adoptions = adoptions;
      this.has_protection_net = has_protection_net;
      this.likes = likes;
      this.dislikes = dislikes;
    }
  }
  
  module.exports = Adopter;
  