export class Cat{
    name:string = "";
    description:string = "";
    photo_url:string= "";

    constructor(name: string, description:string, photo_url:string){
        this.name = name;
        this.description = description
        this.photo_url = photo_url
    }
}

const catList:Array<Cat> = [
    new Cat("Brabo", "Brabo", "./src/components/Slider/mock/angry.png"),
    new Cat("pequeno", "pequeno", "./src/components/Slider/mock/kitten.png"),
    new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png"),
    new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png"),
    new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png"),
    new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png")
]

export default catList;
