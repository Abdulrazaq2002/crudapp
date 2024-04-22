import React, { useEffect, useState } from "react";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [authorizedUser, setAuthorizedUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/post/${name}`);
        const data = await response.json();
        setPosts(data);

        // Check if fetched username matches the username stored in local storage
        const storedUserName = localStorage.getItem("savedName");
        if (storedUserName === userName) {
          setAuthorizedUser(true);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set empty array in case of error
      }
    };

    fetchData();

    const storedUserName = localStorage.getItem("savedName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [userName]);

  const handleDelete = async (postId) => {
    try {
      await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1>Welcome, {userName}</h1>
      {authorizedUser ? (
        <>
          <h2>Your Posts:</h2>
          <ul>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <li key={post._id}>
                  {post.message}
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </li>
              ))
            ) : (
              <li>No posts found.</li>
            )}
          </ul>
        </>
      ) : (
        <p>You are not authorized to view this data.</p>
      )}
    </div>
  );
}
