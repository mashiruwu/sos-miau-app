
export class Cat{
    name:string = "";
    description:string = "";
    imgPath:string= "";

    constructor(name: string, description:string, imgPath:string){
        this.name = name;
        this.description = description
        this.imgPath = imgPath
    }
}

let lista:Array<Cat> = [
    new Cat("Brabo", "Brabo", "./src/components/Slider/mock/angry.png"),
    new Cat("pequeno", "pequeno", "./src/components/Slider/mock/kitten.png"),
    new Cat("chumbinho", "chumbinho", "./src/components/Slider/mock/chumbinho.png")
]

export default lista;