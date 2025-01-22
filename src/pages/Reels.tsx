import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection

const reels = [
  {
    id: 1,
    author: 'Mr Beast',
    handle: '@sarahwilson',
    price: '₹9',
    subscriptions: 10000000000,
    status: 'top 10',
    avatar: 'images/image1.jpeg',
    video: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    isShort: false, // Added field to differentiate shorts
  },
  {
    id: 2,
    author: 'Mike Johnson',
    handle: '@mikejohnson',
    price: '₹10',
    subscriptions: 10000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    video: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    isShort: true, // Indicates this is a short
  },
  {
    id: 3,
    author: 'Vinesh',
    handle: '@mikejohnson',
    price: '₹10',
    subscriptions: 10000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    video: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    isShort: false, // Indicates this is a regular video
  },
];

const Reels = () => {
  const [subscriptions, setSubscriptions] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubscribe = (id: number) => {
    setSubscriptions((prev) => ({ ...prev, [id]: true }));
    navigate(`/creator/${id}`); 
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Reels</h2>

      {/* Section for Videos */}
      <h3 className="text-xl font-semibold mb-4">Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reels
          .filter((reel) => !reel.isShort) // Filter to show only regular videos
          .map((reel) => (
            <div key={reel.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {!subscriptions[reel.id] ? (
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={reel.avatar}
                      alt={reel.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{reel.author}</h3>
                      <p className="text-gray-500 text-sm">{reel.handle}</p>
                      <p className="text-gray-900 font-bold text-sm">{reel.price}</p>
                      <p className="text-green-500 text-sm mt-1">
                        ↑ {reel.status}. {reel.subscriptions.toLocaleString()} subscriptions
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSubscribe(reel.id)}
                    className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Thank you for subscribing, {reel.author}!
                  </h3>
                  <iframe
                    className="w-full h-64 rounded-lg"
                    src={reel.video}
                    title={`Video by ${reel.author}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Section for Shorts */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Shorts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reels
          .filter((reel) => reel.isShort) // Filter to show only shorts
          .map((reel) => (
            <div key={reel.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {!subscriptions[reel.id] ? (
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={reel.avatar}
                      alt={reel.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{reel.author}</h3>
                      <p className="text-gray-500 text-sm">{reel.handle}</p>
                      <p className="text-gray-900 font-bold text-sm">{reel.price}</p>
                      <p className="text-green-500 text-sm mt-1">
                        ↑ {reel.status}. {reel.subscriptions.toLocaleString()} subscriptions
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSubscribe(reel.id)}
                    className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Thank you for subscribing, {reel.author}!
                  </h3>
                  <iframe
                    className="w-full h-64 rounded-lg"
                    src={reel.video}
                    title={`Short by ${reel.author}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reels;
