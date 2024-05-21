export interface IUser {
  id: string;
  login: string;
  bio?: string;
  avatarUrl: string;
  githubUrl: string;
  ratingPoints: number;
  location: string;
  createdAt: Date;
}
