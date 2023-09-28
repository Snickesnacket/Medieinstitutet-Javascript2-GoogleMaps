export interface InfoWindowData {
  id: string;
  Namn: string;
  Gatuadress: string;
  Ort: string;
  Kategori: string;
  Utbud: string;
  lat: number;
  lng: number;
}
export interface LatLng {
  lat: number;
  lng: number;
}

export type DefaultLocation = { lat: number; lng: number; city: string };

export type Item = {
  id: string;
  name: string;
};

export interface KategoriData {
  Café: string;
  Restaurang: string;
  Snabbmat: string;
  Foodtruck: string;
}
export interface UtbudData {
  Fika: string;
  Lunch: string;
  After_Work: string;
  Middag: string;
}

export interface KbuttonData {
  value: KategoriData[];
}
export interface UbuttonData {
  value: UtbudData[];
}
export type DefaultLocation = {
  lat: 55.604981;
  lng: 13.003822;
  city: "Malmo";
};