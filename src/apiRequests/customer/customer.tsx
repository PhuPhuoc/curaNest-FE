import {
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/customer.schema";
import http from "@/lib/http";
import { infoCustomerRes, infoPatientRes } from "@/types/customer";

const authApiRequest = {
  register: (user_id: string, body: RegisterBodyType) =>
    http.post<RegisterResType>(
      `/users/${user_id}/create-customer-profile`,
      body
    ),

  infoCustomer: (customer_id: string) =>
    http.get<infoCustomerRes>(`/customers/${customer_id}`),

  profilePatients: (customer_id: string) =>
    http.get<infoPatientRes>(`/customers/${customer_id}/patients`),
};

export default authApiRequest;
