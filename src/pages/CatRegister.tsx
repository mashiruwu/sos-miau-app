import { useState } from "react";
import { useTranslation } from "react-i18next";
import DefaultPic from "../assets/profile_pic.png";
import InputField from "../components/InputField/InputField";
import RadioButton from "../components/RadioButton/RadioButton";
import Label from "../components/Label/Label";

const CatRegister = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        race: "",
        coat: "",
        birthday: "",
        description: "",
        behaviour: "",
        neutered: "",
        fivfelv: "",
        adopted: "",
        rescued: "",
        adoptionDate: "",
    });

    const [catImage, setCatImage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCatImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white py-10 px-4 sm:px-10">
            <h1 className="text-2xl text-[#153151] mb-4 pb-10 text-center lg:text-left">
                {t("cat_register.title")}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                    <div>
                        <Label>{t("cat_register.name")}</Label>
                        <InputField name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>{t("cat_register.birthday")}</Label>
                        <InputField
                            name="birthday"
                            type="text"
                            value={formData.birthday}
                            onChange={handleChange}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            placeholder="    /    /    "
                            required
                        />
                    </div>

                    <div>
                        <Label>{t("cat_register.gender")}</Label>
                        <div className="flex gap-4 mt-1">
                            <Label>
                                <RadioButton type="radio" name="gender" value="Macho" onChange={handleChange} />
                                {t("cat_register.male")}
                            </Label>
                            <Label>
                                <RadioButton type="radio" name="gender" value="Fêmea" onChange={handleChange} />
                                {t("cat_register.female")}
                            </Label>
                        </div>
                    </div>

                    <div>
                        <Label>{t("cat_register.description")}</Label>
                        <InputField name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div>
                        <Label>{t("cat_register.race")}</Label>
                        <InputField name="race" value={formData.race} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>{t("cat_register.behaviour")}</Label>
                        <InputField name="behaviour" value={formData.behaviour} onChange={handleChange} required />
                    </div>

                    <div>
                        <Label>{t("cat_register.coat")}</Label>
                        <InputField name="coat" value={formData.coat} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>{t("cat_register.adoptiondate")}</Label>
                        <InputField
                            name="adoptionDate"
                            type="text"
                            value={formData.adoptionDate}
                            onChange={handleChange}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            placeholder="    /    /    "
                        />
                    </div>

                    <div className="col-span-2">
                        <div className="flex flex-wrap gap-x-27 gap-y-6 mt-6">
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="neutered"
                                    value="Sim"
                                    checked={formData.neutered === "Sim"}
                                    onChange={handleChange}
                                />
                                {t("cat_register.neutered")}
                            </Label>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="fivfelv"
                                    value="Sim"
                                    checked={formData.fivfelv === "Sim"}
                                    onChange={handleChange}
                                />
                                {t("cat_register.fivfelv")}
                                </Label>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="adopted"
                                    value="Sim"
                                    checked={formData.adopted === "Sim"}
                                    onChange={handleChange}
                                />
                                {t("cat_register.adopted")}
                            </Label>
                            <Label>
                                <RadioButton
                                    type="radio"
                                    name="rescued"
                                    value="Sim"
                                    checked={formData.rescued === "Sim"}
                                    onChange={handleChange}
                                />
                                {t("cat_register.rescued")}
                            </Label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start gap-4">
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={catImage || DefaultPic}
                            alt="Imagem do gato"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <input
                        id="catImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="catImageUpload"
                        className="bg-gray-200 text-gray-500 py-2 px-6 rounded-full text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#153151] hover:text-white"
                        >
                        {t("cat_register.add_image") || "Adicionar imagem"}
                    </label>
                </div>

                <div className="lg:col-span-3 flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-[#A1D6B2] text-white py-4 px-13 rounded-full text-lg font-semibold transition duration-300 hover:bg-[#153151] hover:text-white hover:shadow-2xl"
                    >
                        {t("cat_register.register") || "Cadastrar"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CatRegister;
