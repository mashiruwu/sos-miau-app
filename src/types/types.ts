export interface Gato {
    id?: string;
    owner_id?: string;
    name?: string;
    gender?: string;
    race?: string;
    coat?: string;
    birthday?: string;
    photo_url?: string;
    description?: string;
    behaviour?: string;
    neutered?: string;
    fivfelv?: boolean;
    adopted?: string;
    adoption_date?: string | null;
    interest_count?: number;
}

export interface Adotante {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    address?: string;
    state?: string;
    cpf?: string;
    birthday?: string;
    hasProtectionScreen?: string;
}
