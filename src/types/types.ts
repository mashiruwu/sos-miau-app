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
    neutered?: boolean;
    fivfelv?: boolean;
    adopted?: boolean;
    adoption_date?: string | null;
}
