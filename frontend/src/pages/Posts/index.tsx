import { useApolloClient, useQuery } from '@apollo/client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { createPostMutation, getPostsQuery } from './operations';

interface NewPostInputs {
  title: string;
  body: string;
}

const Posts = () => {
  const { data, loading, refetch } = useQuery(getPostsQuery);
  const client = useApolloClient();
  const { register, handleSubmit } = useForm<NewPostInputs>();

  const onSubmit: SubmitHandler<NewPostInputs> = async (data) => {
    const response = await client.mutate({
      mutation: createPostMutation,
      variables: { body: data.body, title: data.title },
      errorPolicy: 'all'
    });
    console.log(response);
    refetch();
  };

  if (loading) return <div>Loading....</div>;
  return (
    <>
      <div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
            New Post
          </div>
          <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <input
              className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              placeholder="Title"
              {...register('title', {
                required: true,
                maxLength: 30
              })}
            />
            <textarea
              className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
              placeholder="Describe everything about this post here"
              {...register('body', {
                required: true
              })}
            ></textarea>
            <div className="buttons flex justify-center">
              <button
                type="submit"
                className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Posts
        </div>
        <div className="flex gap-x-4 px-4">
          {data?.posts.map((post) => (
            <div
              key={post.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
              <h3>{post.title}</h3>
              <p>Author: {post.user.userName}</p>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
