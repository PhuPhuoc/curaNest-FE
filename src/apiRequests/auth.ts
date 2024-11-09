import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import http from "../lib/http";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/users/authentication", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/users/sign-up", body),
};

export default authApiRequest;
