import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  // headers: { 'Content-Type': 'application/json' },
});

export const getCreator = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getPosts = async (userId: number) => {
  const response = await api.get(`/posts/user/${userId}`);
  return response.data.posts;
};

export const getComments = async (postId: number) => {
  const response = await api.get(`/comments/post/${postId}`);
  return response.data.comments;
};

// const useCreator = (id: number) => {
//   return useQuery
// }
