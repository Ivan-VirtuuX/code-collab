import { AxiosInstance } from "axios";
import { ICollab } from "@/types/Collab";
import { IUser } from "@/types/User";
import { IPointsHistory } from "@/types/PointsHistory";
import { CloudinaryApi } from "@/api/CloudinaryApi";

export const UserApi = (instance: AxiosInstance) => ({
  async deleteComment(id?: string, commentId?: string, login?: string) {
    await instance.delete(`user/${login}/comments/${commentId}`);
  },

  async getCollabs(login: string) {
    const { data } = await instance.get<ICollab[]>(`user/${login}/collabs`);

    return data;
  },

  async getOne(login: string) {
    const { data } = await instance.get<IUser>(`user/${login}`);

    return data;
  },

  async getPointsHistory(login: string) {
    const { data } = await instance.get<IPointsHistory[]>(
      `user/${login}/points-history`
    );

    return data;
  },

  async updateAvatar(attachedImageFormData: FormData[]) {
    const response = await CloudinaryApi().images.add(attachedImageFormData);

    await instance.patch("upload-avatar", {
      avatarUrl: response.secure_url,
    });

    return response.secure_url;
  },

  async editProfile(
    login: string,
    bio?: string,
    location?: string,
    githubUrl?: string
  ) {
    await instance.patch("edit-profile", {
      login,
      githubUrl,
      location,
      bio,
    });
  },

  async search(query: string) {
    const { data } = await instance.get<IUser[]>("user/search", {
      params: { query },
    });

    return data;
  },
});
