import React, { useEffect, useState } from "react";

export default function Search({ username }) {
  const [comments, setComments] = useState([]);
  const [searchedComments, setSearchedComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/post/${name}`); // Use `username` instead of `name`
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await res.json();
        setComments(data);
        setSearchedComments(data); // Initialize searchedComments with all comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [username]);

  const handleSearch = () => {
    const filteredComments = comments.filter(
      (comment) =>
        comment.auther.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedComments(filteredComments);
    setSearchSubmitted(true);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4'>
        Search for Comments by Author Name
      </h2>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder='Search here like John Eliah'
        className='border border-gray-300 rounded-md px-4 py-2 mr-4 focus:outline-none focus:border-bblack'
      />
      <button
        onClick={handleSearch}
        className='bg-black text-white font-semibold px-6 py-2 rounded-md hover:bg-white hover:text-black border'>
        Search
      </button>
      {searchSubmitted && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>
            Search Results for "{searchTerm}"
          </h2>
          <ul className='space-y-4'>
            {searchedComments.map((comment) => (
              <li key={comment._id} className='border-b pb-2'>
                <span className='font-semibold'>{comment.auther}</span> -{" "}
                {comment.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
