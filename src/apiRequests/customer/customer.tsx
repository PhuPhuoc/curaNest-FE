import {
  RegisterBodyType, RegisterResType, createProfileProfileBodyType, createProfileProfileResType
} from "@/schemaValidations/customer.schema";
import http from "@/lib/http";
import { infoCustomerRes, infoPatientRes } from "@/types/customer";

const authApi = {
  register: (user_id: string, body: RegisterBodyType) =>
    http.post<RegisterResType>(
      `/users/${user_id}/create-customer-profile`,
      body
    ),

  infoCustomer: (customer_id: string) =>
    http.get<infoCustomerRes>(`/customers/${customer_id}`),

  profilePatient: (customer_id: string) =>
    http.get<infoPatientRes>(`/customers/${customer_id}/patients`),

  createProfilePatient: (customer_id: string, body: createProfileProfileBodyType) =>
    http.post<createProfileProfileResType>(
      `/customers/${customer_id}/create-patient-profile`,
      body
    ),
};

export default authApi;
