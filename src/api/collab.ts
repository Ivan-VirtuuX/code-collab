import { AxiosInstance } from "axios";
import { ICollab } from "@/types/Collab";
import { IComment } from "@/types/Comment";
import { ICommentReply } from "@/types/CommentReply";
import { OutputData } from "@editorjs/editorjs";

export const CollabApi = (instance: AxiosInstance) => ({
  async create(
    stack: string[],
    title: string,
    body: OutputData["blocks"],
    tags: string[]
  ) {
    const { data } = await instance.post("collab", {
      stack,
      title,
      body,
      tags,
    });

    return data.collab as ICollab;
  },

  async getOne(id: string) {
    const { data } = await instance.get(`collab/${id}`);

    return data.collab as ICollab;
  },

  async delete(id: string) {
    await instance.delete(`collab/${id}`);
  },

  async getInitialComments(id: string, limit: number) {
    const { data } = await instance.get(`collab/${id}/comments`, {
      params: { page: 1, limit },
    });

    return {
      comments: data.comments as IComment[],
      totalComments: data.totalComments as number,
    };
  },

  async getManyCommentsByPage(id: string, limit: number, page: number) {
    const { data } = await instance.get(`collab/${id}/comments`, {
      params: { page, limit },
    });

    return data.comments as IComment[];
  },

  async getManyByTag(tag: string) {
    const { data } = await instance.get<ICollab[]>(`collab/tags`, {
      params: { tag },
    });

    return data;
  },

  async getAll() {
    const { data } = await instance.get("collab");

    return data as ICollab[];
  },

  async getPopular() {
    const { data } = await instance.get("collab/popular");

    return data as ICollab[];
  },

  async addReply(collabId: string, replyCommentId: string, text: string) {
    const { data } = await instance.post(
      `collab/${collabId}/comments/${replyCommentId}/replies`,
      {
        text,
      }
    );

    return data.comment as ICommentReply;
  },

  async addComment(collabId: string, text: string) {
    const { data } = await instance.post(`collab/${collabId}/comments`, {
      text,
    });

    return data.comment as ICommentReply;
  },

  async removeCommentLike(
    replyCommentId: string,
    isReply: boolean,
    likeId?: string,
    collabId?: string,
    commentId?: string
  ) {
    if (isReply)
      await instance.delete(
        `collab/${collabId}/comments/${commentId}/replies/${replyCommentId}/likes/${likeId}`
      );
    else
      await instance.delete(
        `collab/${collabId}/comments/${commentId}/likes/${likeId}`
      );
  },

  async addCommentLike(
    replyCommentId: string,
    isReply: boolean,
    authorId?: string,
    collabId?: string,
    commentId?: string
  ) {
    if (isReply)
      await instance.post(
        `collab/${collabId}/comments/${commentId}/replies/${replyCommentId}/likes`
      );
    else
      await instance.post(
        `collab/${collabId}/comments/${replyCommentId}/likes`,
        {
          userId: authorId,
        }
      );
  },

  async incrementViews(id: string, login: string) {
    const { data } = await instance.post(`collab/${id}/incrementViews`, {
      login,
    });

    return data;
  },

  async search(query: string) {
    const { data } = await instance.get<ICollab[]>("collab/search", {
      params: { query },
    });

    return data;
  },
});
