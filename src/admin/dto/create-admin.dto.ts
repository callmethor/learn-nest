export class CreateAdminDto {
  id: number;
  name: string;
  birthday?: string;
  email: string;
  password: string;
  gender?: string;
  role?: string;
}
