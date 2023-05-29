import { gql } from '../../__generated__/gql';

export const getPostsQuery = gql(`query GetPosts {
  posts{
    id,
    body,
    authorId,
    title,
    user{
      id,
      userName
    }
  }
}`);
export const createPostMutation =
      gql(`mutation CreatePost($title: String!,$body: String!) { 
        createPost(createPostInput:{body:$body,title:$title}) {
          id
        }
  }`);