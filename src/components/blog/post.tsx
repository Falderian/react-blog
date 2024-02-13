import React, { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { IPost, deletePost, updatePost } from "@/app/store/posts/postsSlice";
import { Action } from "redux";

interface PostProps {
  post: IPost;
}

interface IComment {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch: Dispatch<Action<any>> = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      updatePost({
        id: post.id,
        title: editedTitle,
        content: editedContent,
      }) as any
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id) as any);
  };

  const openCommentsWindow = () => {
    const commentsWindow = window.open(
      "",
      "Comments",
      "width=600,height=400,scrollbars=yes"
    );
    if (commentsWindow) {
      commentsWindow.document.title = "Comments";
      const commentsContainer = commentsWindow.document.createElement("div");
      commentsContainer.classList.add("comments-container");
      commentsContainer.style.overflowY = "auto";
      commentsWindow.document.body.appendChild(commentsContainer);

      fetchComments().then((comments) => {
        renderComments(comments, commentsContainer);
      });
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${post.id}`);
      const data = await response.json();
      setComments(data);
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const renderComments = (comments: IComment[], container: HTMLElement) => {
    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
        <p>${comment.content}</p>
        <p class="text-sm text-gray-500">
          Posted by User ${comment.user_id} on ${new Date(
        comment.created_at
      ).toLocaleString()}
        </p>
      `;
      container.appendChild(commentElement);
    });
  };

  return (
    <div className="flex flex-col gap-1 border p-3 rounded bg-white text-black overflow-y-auto transition duration-300 ease-in-out transform hover:shadow-lg">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="mb-2 p-1 border rounded"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="mb-2 p-1 border rounded"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-110"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-110"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Created at: {new Date(post.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Updated at: {new Date(post.updated_at).toLocaleString()}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-110"
            >
              Delete
            </button>
            <button
              onClick={openCommentsWindow}
              className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-110"
            >
              Open Comments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
