export class Cat{
  name: string
  description: string
  photo_url: string
  behaviour: string
  coat: string
  birthday: string
  fivfelv: string
  gender: string
  neutered: string
  race: string
  rescued: string

  constructor(
    name: string,
    description: string,
    photo_url: string,
    behaviour: string,
    coat: string,
    birthday: string,
    fivfelv: string,
    gender: string,
    neutered: string,
    race: string,
    rescued: string
  ) {
    this.name = name
    this.description = description
    this.photo_url = photo_url
    this.behaviour = behaviour
    this.coat = coat
    this.birthday = birthday
    this.fivfelv = fivfelv
    this.gender = gender
    this.neutered = neutered
    this.race = race
    this.rescued = rescued
  }
}

const catList:Array<Cat> = [
    // new Cat("Brabo", "Brabo", "./src/components/Slider/mock/angry.png"),
    // new Cat("pequeno", "pequeno", "./src/components/Slider/mock/kitten.png"),
    // new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png"),
    // new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png"),
    // new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png"),
    // new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png")
]

export default catList;
