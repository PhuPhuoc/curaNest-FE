import http from "@/lib/http";
import { CreateRes, CreateTechnique, TechniqueRes } from "@/types/technique";

const techniqueApiRequest = {
  getTechnique: () => http.get<TechniqueRes>("/techniques"),
  createTechnique: (body: CreateTechnique) =>
    http.post<CreateRes>("/techniques", body),
};

export default techniqueApiRequest;
