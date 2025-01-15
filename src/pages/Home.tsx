import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

const YOUTUBE_API_KEY = 'AIzaSyBaNmDlvX28bLa3sehFEIjciIoPOwWR7H4';

interface Tweet {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  likes: number;
  comments: { id: number; text: string; replies: { id: number; text: string }[] }[];
  shares: number;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const Home: React.FC = () => {
  const [view, setView] = useState<'tweets' | 'reels'>('tweets');
  const [tweetsData, setTweetsData] = useState<Tweet[]>([
    {
      id: 1,
      author: 'John Doe',
      handle: '@johndoe',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'Just launched my new website! Check it out! 🚀',
      likes: 42,
      comments: [
        {
          id: 1,
          text: 'Amazing!',
          replies: [{ id: 1, text: 'Thanks!' }],
        },
        {
          id: 2,
          text: 'Congrats!',
          replies: [{ id: 2, text: 'Appreciate it!' }],
        },
      ],
      shares: 5,
    },
  ]);
  const [reelsData, setReelsData] = useState<Video[]>([]);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: number]: boolean }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

  const handleToggleView = () => {
    setView(view === 'tweets' ? 'reels' : 'tweets');
  };

  const handleLike = (id: number) => {
    setTweetsData((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  const handleAddComment = (id: number) => {
    if (newComment[id]?.trim()) {
      setTweetsData((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === id
            ? {
                ...tweet,
                comments: [
                  ...tweet.comments,
                  { id: Date.now(), text: newComment[id], replies: [] },
                ],
              }
            : tweet
        )
      );
      setNewComment((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleShowReplyInput = (commentId: number) => {
    setShowReplyInput((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleAddReply = (tweetId: number, commentId: number) => {
    if (newReply[commentId]?.trim()) {
      setTweetsData((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet.id === tweetId
            ? {
                ...tweet,
                comments: tweet.comments.map((comment) =>
                  comment.id === commentId
                    ? {
                        ...comment,
                        replies: [
                          ...comment.replies,
                          { id: Date.now(), text: newReply[commentId] },
                        ],
                      }
                    : comment
                ),
              }
            : tweet
        )
      );
      setNewReply((prev) => ({ ...prev, [commentId]: '' }));
      setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleToggleComments = (tweetId: number) => {
    setShowComments((prev) => ({ ...prev, [tweetId]: !prev[tweetId] }));
  };

  useEffect(() => {
    if (view === 'reels') {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=random&maxResults=10&key=${YOUTUBE_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const videos: Video[] = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
          }));
          setReelsData(videos);
        })
        .catch((error) => console.error('Error fetching YouTube videos:', error));
    }
  }, [view]);

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <span className={`text-sm ${view === 'tweets' ? 'text-blue-500' : 'text-gray-500'}`}>
          Tweets
        </span>
        <Switch
          checked={view === 'reels'}
          onChange={handleToggleView}
          className={`${
            view === 'reels' ? 'bg-blue-500' : 'bg-gray-300'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out`}
        >
          <span
            className={`${
              view === 'reels' ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
          />
        </Switch>
        <span className={`text-sm ${view === 'reels' ? 'text-blue-500' : 'text-gray-500'}`}>
          Reels
        </span>
      </div>
      <div className="space-y-6">
        {view === 'tweets' &&
          tweetsData.map((tweet) => (
            <div key={tweet.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={tweet.avatar}
                  alt={tweet.author}
                />
                <div>
                  <h4 className="font-semibold">{tweet.author}</h4>
                  <p className="text-sm text-gray-500">{tweet.handle}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{tweet.content}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleLike(tweet.id)}
                  className="text-blue-500 font-medium"
                >
                  Like {tweet.likes}
                </button>
                <button
                  onClick={() => handleToggleComments(tweet.id)}
                  className="text-gray-500 font-medium"
                >
                  Comments
                </button>
              </div>
              {showComments[tweet.id] && (
                <div className="mt-4 space-y-4">
                  {tweet.comments.map((comment) => (
                    <div key={comment.id}>
                      <p className="text-gray-700">{comment.text}</p>
                      {showReplyInput[comment.id] && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Reply..."
                            value={newReply[comment.id] || ''}
                            onChange={(e) =>
                              setNewReply((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                            className="border rounded px-2 py-1 text-sm w-full"
                          />
                          <button
                            onClick={() => handleAddReply(tweet.id, comment.id)}
                            className="mt-2 text-blue-500 text-sm"
                          >
                            Add Reply
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => handleShowReplyInput(comment.id)}
                        className="text-sm text-gray-500 mt-2"
                      >
                        {showReplyInput[comment.id] ? 'Cancel' : 'Reply'}
                      </button>
                      <div className="ml-4 mt-2">
                        {comment.replies.map((reply) => (
                          <p key={reply.id} className="text-gray-600 text-sm">
                            {reply.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[tweet.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [tweet.id]: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                    <button
                      onClick={() => handleAddComment(tweet.id)}
                      className="mt-2 text-blue-500 text-sm"
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        {view === 'reels' &&
          reelsData.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900">{video.title}</h3>
              <iframe
                className="w-full mt-4 aspect-video"
                src={`https://www.youtube.com/embed/${video.id}`}
                allowFullScreen
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
