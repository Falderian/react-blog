import React, { ChangeEvent, useState } from "react";
import { IPost } from "@/app/store/posts/postsSlice";
import Post from "@/components/blog/post";

interface Props {
  posts: IPost[];
}

const Posts = ({ posts }: Props) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="text-white">No posts available</div>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePostsPerPageChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPostsPerPage(Number(e.target!.value));
  };

  const postsPerPageOptions = [8, 12, 16];

  return (
    <div className="posts-container bg-black text-white p-4 overflow-auto">
      <h1 className="text-center mb-4">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="pagination-container mt-4 flex justify-between items-center">
        <div>
          <label htmlFor="postsPerPage" className="mr-2">
            Posts per page:
          </label>
          <select
            id="postsPerPage"
            value={postsPerPage}
            onChange={handlePostsPerPageChange}
            className="bg-white text-black px-2 py-1 rounded"
          >
            {postsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <ul className="flex">
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
            (_, index) => (
              <li key={index} className="mx-2">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`py-2 px-4 rounded ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-400 text-black hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
