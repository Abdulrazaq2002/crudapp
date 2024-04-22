import React, { useState, useEffect, useContext } from "react";
import PostHook from "../hooks/post.hook";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/userContext.jsx";

export default function PostMsg() {
  const { sendMessage } = PostHook();
  const navigate = useNavigate();
  // const { username } = useContext(UserContext); // Get the username from the UserContext
  const [news, setNews] = useState({
    name: "", // Set the initial value of name to the username from context
    message: "",
    auther: "",
  });

  useEffect(() => {
    // Check if the name exists in local storage
    const savedName = localStorage.getItem("savedName");
    if (savedName) {
      setNews((prevNews) => ({
        ...prevNews,
        name: savedName,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNews({ message: "", auther: "" });
    navigate("/");

    try {
      await sendMessage(news);
      // Update the saved name in local storage
      localStorage.setItem("savedName", news.name);
      // username.news?.name;
      // onSend(news); // Pass the sent data to the parent component
    } catch (error) {
      console.error("Error at post-hook", error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center space-y-4'>
        <input
          placeholder='Username Here'
          type='text'
          name='name'
          onChange={handleChange}
          value={news.name}
          className='border border-gray-300 rounded-md px-3 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-black'
        />
        <textarea
          placeholder='Quote Here'
          type='text'
          name='message'
          onChange={handleChange}
          value={news.message}
          className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black'></textarea>
        <input
          placeholder='Author Name Here'
          type='text'
          name='auther'
          onChange={handleChange}
          value={news.auther}
          className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black'
        />
        <button
          type='submit'
          className='bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border-r border-l border-t border-b  border-black focus:outline-none focus:bg-black'>
          Send
        </button>
      </form>
    </>
  );
}
