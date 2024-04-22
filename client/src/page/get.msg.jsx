import React, { useState, useEffect } from "react";
import Loading from "./loading";
import GetTime from "../hooks/getTime.jsx";

export default function GetMsg() {
  const [news, setNews] = useState([]);
  const [shuffledNews, setShuffledNews] = useState([]);
  const [nameSuggestion, setNameSuggestion] = useState("");
  const [isOpen, setIsOpen] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMessageId, setEditMessageId] = useState(null); // Track the ID of the post being edited
  const [editedMessage, setEditedMessage] = useState(""); // Track the edited message

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch("/api/post");
        const data = await res.json();
        if (data.error) {
          console.error("Error while fetching news:", data.error);
        } else {
          setNews(data);
          setShuffledNews(shuffleArray(data));
          const storedName = localStorage.getItem("savedName");
          setNameSuggestion(storedName);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error at fetching details:", error.message);
      }
    };
    fetchDetails();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleEdit = (id, message) => {
    setEditMessageId(id);
    setEditedMessage(message);
  };

  const handleSaveEdit = async (id) => {
    try {
      await fetch(`/api/post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: editedMessage }),
      });
      // Update news state with the edited message
      const updatedNews = news.map((item) =>
        item._id === id ? { ...item, message: editedMessage } : item
      );
      setNews(updatedNews);
      setShuffledNews(shuffleArray(updatedNews));
      // Reset edit state
      setEditMessageId(null);
      setEditedMessage("");
      setIsOpen({ ...isOpen, [id]: false });
    } catch (error) {
      console.error("Error editing post:", error.message);
    }
  };

  const handleCancelEdit = () => {
    // Reset edit state
    setEditMessageId(null);
    setEditedMessage("");
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      const updatedNews = news.filter((item) => item._id !== id);
      setNews(updatedNews);
      setShuffledNews(shuffleArray(updatedNews));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleOpen = (id) => {
    // Toggle isOpen state for the clicked post
    setIsOpen({ ...isOpen, [id]: !isOpen[id] });
  };

  return (
    <div className='max-w-xlmx-auto px-4'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='mb-4'>
            <label className='text-gray-600 font-semibold'>
              Name Suggestion:
            </label>
            <p className='text-gray-900'>{nameSuggestion}</p>
          </div>
          <ul>
            {shuffledNews.map((newsItem, index) => (
              <li
                key={index}
                className='bg-white border border-b rounded-lg shadow-md p-4 mb-4'>
                <div className='mb-4'>
                  <label className='text-black border border-black p-2 rounded-lg font-semibold'>
                    Posted By:
                    <span className='text-black p-2 rounded-lg font-semibold'>
                      {newsItem.name}
                    </span>
                  </label>
                </div>
                {editMessageId === newsItem._id ? ( // If editing this post
                  <div className='mb-4'>
                    <textarea
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'></textarea>
                    <div className='flex mt-2'>
                      <button
                        onClick={() => handleSaveEdit(newsItem._id)}
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'>
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='mb-4'>
                      <label className='text-black font-semibold'>Quote:</label>
                      <p className='text-black'>
                        <b>{newsItem.message}</b>
                      </p>
                    </div>
                    <div className='mb-4'>
                      <label className='text-black font-semibold'>
                        Author:{" "}
                        <span className='text-lg font-semibold text-black'>
                          {newsItem.auther}
                        </span>
                      </label>
                    </div>
                    <div className='flex items-center text-black'>
                      <span className='text-black'>
                        <GetTime sentTime={newsItem.postedAt} />
                        {/* {`Posted ${getTimeElapsed(newsItem.postedAt)}`} */}
                      </span>
                      <h3>Views: {newsItem.views}</h3>
                      {isOpen[newsItem._id] ? (
                        <>
                          <button
                            onClick={() =>
                              handleEdit(newsItem._id, newsItem.message)
                            }
                            className='p-2 md:p-3 lg:p-4 hover:bg-gray-200 rounded'>
                            <img
                              src='https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png'
                              className='w-8 md:w-10 lg:w-12 hover:w-9'
                              alt='Edit'
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(newsItem._id)}
                            className='p-2 md:p-3 lg:p-4 hover:bg-gray-200 rounded'>
                            <img
                              src='https://cdn3.iconfinder.com/data/icons/hotel-restaurant-hand-drawn-vol-5/52/trash__delete__bin__business__office__remove__garbage-512.png'
                              className='w-8 md:w-10 lg:w-12 hover:w-9'
                              alt='Delete'
                            />
                          </button>
                          <button
                            onClick={() => handleOpen(newsItem._id)} // Close the options for this post
                            className='p-2 md:p-3 lg:p-4 hover:bg-gray-200 rounded'>
                            <img
                              src='https://cdn-icons-png.freepik.com/256/130/130887.png?semt=ais_hybrid'
                              className='w-8 md:w-10 lg:w-12 hover:w-9'
                              alt='Close'
                            />
                          </button>
                        </>
                      ) : (
                        <div className='flex justify-end'>
                          <button
                            onClick={() => handleOpen(newsItem._id)}
                            className='p-2 md:p-3 lg:p-4 hover:bg-gray-200 rounded'>
                            <img
                              src='https://static.thenounproject.com/png/1380510-200.png'
                              className='w-8 md:w-10 lg:w-12 hover:size-7'
                              alt='Edit'
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
