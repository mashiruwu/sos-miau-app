import "./Card.css"

import {Cat} from "../../mock/mock"

interface CardProps {
    cat: Cat;
}

export function Card({ cat }: CardProps){

    return (
        <>
            <div className="Card">
                <div className="Cat">
                    <img src={cat.imgPath}></img>
                </div>
                <div className="Description">
                    <p>{cat.description}</p>
                </div>
            </div>
        </>
    )
}