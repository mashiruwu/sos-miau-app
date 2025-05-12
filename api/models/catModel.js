class Cat {
    constructor({
      id,
      owner_id,
      name,
      gender,
      breed,
      color,
      birthday,
      photo_url,
      weight,
      height,
      description,
      behavior,
      neutered,
      fiv,
      felv,
      adopted = false,
      adoption_date = null,
    } = {}) {
      this.id = id;
      this.owner_id = owner_id
      this.name = name;
      this.gender = gender;
      this.breed = breed;
      this.color = color;
      this.birthday = birthday;
      this.photo_url = photo_url;
      this.weight = weight;
      this.height = height;
      this.description = description;
      this.behavior = behavior;
      this.neutered = neutered;
      this.fiv = fiv;
      this.felv = felv;
      this.adopted = adopted;
      this.adoption_date = adoption_date;
    }
  }
  
  module.exports = Cat;
  