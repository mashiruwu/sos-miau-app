export interface Gato {
    id?: string;
    owner_id?: string;
    name?: string;
    gender?: string;
    breed?: string;
    color?: string;
    birthday?: string;
    photo_url?: string;
    weight?: number;
    height?: number;
    description?: string;
    behavior?: string;
    neutered?: boolean;
    fiv?: boolean;
    felv?: boolean;
    adopted?: boolean;
    adoption_date?: string | null;
}

type Adopter = {
    id?: string;
    name?: string;
    surname?: string;
    cpf?: string;
    email?: string;
    password?: string;
    photo_url?: string;
    address?: string;
    apartment?: string;
    birthday?: string;
    phone?: string;
    adoptions?: Gato[];
    has_protection_net?: boolean;
    likes?: Gato[];
    dislikes?: Gato[];
};

type DonorOng = {
    id?: string;
    name?: string;
    cnpj?: string;
    adress?: string;
    phone?: string;
    email?: string;
    website?: string;
    foundation_date?: string;
    description?: string;
    socials?: string[];
    cats_available?: Gato[];
    cats_adopted?: Gato[];
};

export type User = Adopter | DonorOng;
