import Cat from "../../assets/gato_about.png";

interface ExpandingCardProps {
    title: string;
    description: string;
}

export default function ExpandingCard({
    title,
    description,
}: ExpandingCardProps) {
    return (
        <div className="relative overflow-hidden h-[300px] rounded-lg shadow-md group">
            <div className="relative h-full">
                <img src={Cat} alt={title} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 transition-all duration-300 ease-in-out h-[100px] group-hover:h-[70%] overflow-hidden">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <div className="transition-all duration-300 ease-in-out max-h-[40px] group-hover:max-h-[calc(100%-40px)] overflow-hidden">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
