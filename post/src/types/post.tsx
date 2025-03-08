export interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  view: number;
  comments: Comment[];
}

export interface Comment {
  postId: number;
  id: number;
  parentId: number | null;
  author: string;
  content: string;
  createdAt: string;
}
