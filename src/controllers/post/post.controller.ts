import { Request, Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../../services/post/post.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { search = "" } = req.query;
    const post = await getAllPosts({
      search: search.toString(),
    });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getPost(Number(id));

    if (!post) {
      res.status(404).json({ message: "Post does not exist" });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = (req as any).user?.userId;

    const post = await getPost(Number(id));
    if (!post) {
      res.status(404).json({ message: "Post does not exist" });
      return;
    }

    if (post.userId !== userId) {
      res.status(403).json({ message: "No access to this post" });
      return;
    }

    const updatedPost = await updatePost(Number(id), { title, content });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = (req as any).user?.userId;

    const post = await createPost({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getPost(Number(id));

    if (!post) {
      res.status(404).json({ message: "Post does not exist" });
      return;
    }

    const userId = (req as any).user?.userId;
    if (post.userId !== userId) {
      res.status(403).json({ message: "No access to this post" });
      return;
    }

    const deletedPost = await deletePost(Number(id));
    res.status(200).json(deletedPost);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
