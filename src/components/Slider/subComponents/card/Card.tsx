import "./Card.css"

import {Cat} from "../../mock/mock"

interface CardProps {
    cat: Cat;
}

export function Card({ cat }: CardProps){
    console.log("🔗  cat.photo_url:", cat.photo_url);

    return (
        <>
            <div className="Card">
                <div className="Cat">
                    <p>{cat.name}</p>
                    <img src={cat.photo_url}></img>
                </div>
                <div className="Description">
                    <p>{cat.description}</p>
                </div>
            </div>
        </>
    )
}