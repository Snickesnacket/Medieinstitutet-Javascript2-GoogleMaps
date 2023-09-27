export interface LoginCredentials {
  email: string;
  password: string;
}


export type UpdateProfileFormData = {
  name: string;
  photoUrl: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type AdminData = {
  _id: string;
  Namn: string;
  photoURL?: string;
};