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
