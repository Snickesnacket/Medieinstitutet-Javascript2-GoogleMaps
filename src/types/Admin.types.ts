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