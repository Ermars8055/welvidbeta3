import React, { useState, useEffect } from 'react';

const BACKEND_URL = 'https://your-backend-service.onrender.com'; // Replace with your actual backend URL

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
  const [loadingReels, setLoadingReels] = useState(false);
  const [reelsError, setReelsError] = useState<string | null>(null);

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
      setLoadingReels(true);
      setReelsError(null);
  
      fetch('https://welvidbeta3-1.onrender.com/api/reels') // Correct URL
        .then((response) => {
          if (!response.ok) {
            console.error('HTTP error', response.status);
            throw new Error(`Failed to fetch reels, status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('API response:', data); // Debugging
  
          if (data.items) {
            // Filter videos based on the title or description
            const filteredVideos = data.items
              .filter((item: any) => {
                const title = item.snippet?.title?.toLowerCase();
                const description = item.snippet?.description?.toLowerCase();
                return (
                  title?.includes('football') ||
                  title?.includes('math') ||
                  description?.includes('football') ||
                  description?.includes('math')
                );
              })
              .map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
              }));
  
            setReelsData(filteredVideos || []);
          } else {
            setReelsError('No reels found or unexpected API response format.');
          }
        })
        .catch((error) => {
          console.error('Error fetching reels:', error);
          setReelsError('Failed to load reels. Please try again later.');
        })
        .finally(() => setLoadingReels(false));
    }
  }, [view]);
  

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <div className="bg-gray-500 p-6 text-white rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold">Top User</h2>
        <p className="mt-2">Content creators featured here:</p>
        <div className="flex space-x-4 mt-4">
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src="images/image1.jpeg"
            alt="Creator 1"
          />
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src="images/image12.jpeg"
            alt="Creator 2"
          />
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src="images/user3.png"
            alt="Creator 3"
          />
          <img
            className="w-12 h-12 rounded-full border-2 border-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Creator 4"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => setView('tweets')}
          className={`w-full px-4 py-2 rounded-lg ${
            view === 'tweets' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          }`}
        >
          Tweets
        </button>
        <button
          onClick={() => setView('reels')}
          className={`w-full px-4 py-2 rounded-lg ${
            view === 'reels' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          }`}
        >
          Reels
        </button>
      </div>

      <div className="space-y-6">
        {view === 'tweets' &&
          tweetsData.map((tweet) => (
            <div key={tweet.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={tweet.avatar}
                  alt={tweet.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{tweet.author}</h3>
                  <p className="text-gray-500">{tweet.handle}</p>
                </div>
              </div>
              <p className="mt-4">{tweet.content}</p>
              <div className="mt-4 flex space-x-6">
                <button onClick={() => handleLike(tweet.id)}>
                  👍 {tweet.likes}
                </button>
                <button onClick={() => handleToggleComments(tweet.id)}>
                  💬 {tweet.comments.length}
                </button>
                <button>🔄 {tweet.shares}</button>
              </div>

              {showComments[tweet.id] && (
                <div className="mt-4 space-y-4">
                  {tweet.comments.map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.text}</p>
                      <button
                        onClick={() => handleShowReplyInput(comment.id)}
                        className="text-blue-500"
                      >
                        Reply
                      </button>
                      {showReplyInput[comment.id] && (
                        <div className="mt-2 space-x-2">
                          <input
                            type="text"
                            placeholder="Write a reply"
                            value={newReply[comment.id] || ''}
                            onChange={(e) =>
                              setNewReply((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                            className="px-4 py-2 border rounded"
                          />
                          <button
                            onClick={() => handleAddReply(tweet.id, comment.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Post Reply
                          </button>
                        </div>
                      )}
                      {comment.replies.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2">
                          {comment.replies.map((reply) => (
                            <p key={reply.id} className="text-gray-500">
                              {reply.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={newComment[tweet.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [tweet.id]: e.target.value,
                        }))
                      }
                      className="px-4 py-2 border rounded"
                    />
                    <button
                      onClick={() => handleAddComment(tweet.id)}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

        {view === 'reels' && loadingReels && (
          <div className="text-center py-6">Loading reels...</div>
        )}

        {view === 'reels' && reelsError && (
          <div className="text-center py-6 text-red-500">{reelsError}</div>
        )}

        {view === 'reels' && !loadingReels && !reelsError && reelsData.length > 0 && (
          <div className="space-y-6">
            {reelsData.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-center">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{video.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
