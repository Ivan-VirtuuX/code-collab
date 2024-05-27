import { AxiosInstance } from "axios";

export const Cloudinary = (instance: AxiosInstance) => ({
  async add(imageFormData: FormData[]) {
    const { data } = await instance.post("/upload", imageFormData);

    return data;
  },
});
