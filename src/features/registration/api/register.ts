import { http } from "@shared/api/http";

export interface RegisterRequest {
  nameEn?: string;
  nameNp?: string;
  contact?: string;
  email?: string;
  password?: string;
  role?: string;
}

export async function registerUser(data: RegisterRequest) {try{

  const response = await http.post("/Auth/register", data);
  return response.data;

}
catch (error) {
  console.error("Error registering user:", error);
  throw error;
}
}