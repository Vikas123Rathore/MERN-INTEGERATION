import { createContext, useContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const API = "http://localhost:5000/api/post";

  // Get All Posts
  const getPosts = async () => {
    try {
      const res = await axios.get(API);
      setPosts(res.data.posts);
      console.log("result",res.data)
    } catch (error) {
      console.log(error);
    }
  };

  // Create Post
  const createPost = async (formData) => {
    try {
      const res = await axios.post(API, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPosts((prev) => [res.data.post, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        withCredentials: true,
      });

      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
