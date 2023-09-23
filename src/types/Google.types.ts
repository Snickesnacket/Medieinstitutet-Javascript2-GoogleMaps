export interface InfoWindowData {
  id: number;
  Namn: string;
  Gatuadress: string;
  Ort: string;
  Kategori: string;
  Utbud: string;
  lat: number;
  lng: number;
}
export interface Prediction {
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}
export interface TransformedPrediction {
  id: string;
  name: string;
  address: string;
}

export interface TransformedSearchData {
  predictions: TransformedPrediction[];
  status: string;
}

export interface AutocompleteSearchData {
  predictions: Prediction[];
  status: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}
