import axios from "axios";
import { Cloudinary } from "@/api/cloudinary";

export type ApiReturnType = {
  images: ReturnType<typeof Cloudinary>;
};

export const CloudinaryApi = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/virtuux/image",
  });

  const apis = {
    images: Cloudinary,
  };

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);
};
