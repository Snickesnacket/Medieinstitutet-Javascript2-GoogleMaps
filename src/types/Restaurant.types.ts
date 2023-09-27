export interface Restaurant {
  _id: string;
  Namn: string;
  Gatuadress: string;
  Ort: string;
  Latitude: number;
  Longitude: number;
  Beskrivning: string;
  Kategori: string;
  Utbud: string;
  epost?: string;
  tel?: number;
  hemsida?: string;
  facebook?: string;
  instagram?: string;
}

export interface RestaurantFormData {
  Namn: string;
  Gatuadress: string;
  Ort: string;
  Latitude: number;
  Longitude: number;
  Beskrivning: string;
  Kategori: string;
  Utbud: string;
  epost?: string;
  tel?: number;
  hemsida?: string;
  facebook?: string;
  instagram?: string;
}

export type NewRestaurant = Omit<Restaurant, "_id">;
export type Restaurants = Restaurant[];
