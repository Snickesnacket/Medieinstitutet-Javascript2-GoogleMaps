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