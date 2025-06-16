import "./Card.css"
import { Cat } from "../../mock/mock"
import { t } from "i18next";

interface CardProps {
    cat: Cat;
}

function formatAge(birthdate: string): string {
    const dob = new Date(birthdate);
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    const days = now.getDate() - dob.getDate();

    // if we haven’t reached the birthday this year, subtract one year
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (years >= 1) {
        return `${years} ${t("card_cat.year")}${years > 1 ? "s" : ""}`;
    } else {
        // show months (if days < 0 we already borrowed a month above)
        return `${months} ${t("card_cat.month")}${months > 1 ? "s" : ""}`;
    }
}

export function Card({ cat }: CardProps) {
    const age = formatAge(cat.birthday);

    return (
        <div className="Card">
            <div className="Cat">
                <p>{cat.name}</p>
                <img src={cat.photo_url} alt={cat.name} />
            </div>
            <div className="Description">
                <p>
                    {cat.description}
                </p>
                <p>
                    <strong>{t("card_cat.age")}:</strong> {age}
                </p>
                <p>
                    <strong>{t("card_cat.birthday")}:</strong> {cat.birthday}
                </p>
                <p>
                    <strong>{t("card_cat.gender")}:</strong> {t(`common.gender.${cat.gender}`)}
                </p>
                <p>
                    <strong>{t("card_cat.neutered")}:</strong> {t(`common.neutered.${cat.neutered}`)}
                </p>
                <p>
                    <strong>{t("card_cat.coat")}:</strong> {cat.coat}
                </p>
                <p>
                    <strong>{t("card_cat.behaviour")}:</strong> {cat.behaviour}
                </p>
                <p>
                    <strong>{t("card_cat.race")}:</strong> {cat.race}
                </p>
                <p>
                    <strong>{t("card_cat.fivfelvStatus")}:</strong> {cat.fivfelv}
                </p>
                <p>
                    <strong>{t("card_cat.rescued")}:</strong> {cat.rescued}
                </p>
            </div>
        </div>
    );
}
