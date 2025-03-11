export interface AuthUser {
  fullName: string;
  status: string;
  token: string;
  id: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: "DEVELOPER";
  level: "junior" | "mid" | "senior";
  technologies: string;
};
