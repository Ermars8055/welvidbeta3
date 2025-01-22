import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'AIzaSyBaNmDlvX28bLa3sehFEIjciIoPOwWR7H4';
const reels = [
  {
    id: 1,
    author: 'Mr Beast',
    handle: '@mrbeast',
    videoIds: ['J-nCVfm4ct4', '2Vv-BfVoq4g', 'tgbNymZ7vqY'], 
  },
  {
    id: 2,
    author: 'Mike Johnson',
    handle: '@mikejohnson',
    videoIds: ['dQw4w9WgXcQ', 'J-nCVfm4ct4'],
    shortIds: ['2Vv-BfVoq4g', 'J-nCVfm4ct4'], 
  },
];
const creators = [
  { id: 1, name: 'Mr Beast', avatar: 'https://example.com/mrbeast.jpg' },
  { id: 2, name: 'Mike Johnson', avatar: 'https://example.com/mikejohnson.jpg' },
];


const CreatorPage = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState<{ shorts: any[]; regular: any[] }>({
    shorts: [],
    regular: [],
  });
  const creator = reels.find((reel) => reel.id === parseInt(id!));

  useEffect(() => {
    const fetchVideos = async () => {
      if (!creator) return;

      try {
        const videoDetails = await Promise.all(
          creator.videoIds.map(async (videoId) => {
            const response = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoId}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              return data.items[0]; // Return video object if valid
            }
            console.error(`Invalid video ID: ${videoId}`);
            return null; // Return null if video ID is invalid
          })
        );

        // Filter out null values
        const validVideos = videoDetails.filter((video) => video !== null);

        // Debug API response
        console.log('Fetched video details:', validVideos);

        // Categorize videos into shorts and regular
        const categorizedVideos = validVideos.reduce(
          (acc, video) => {
            const duration = parseDuration(video.contentDetails.duration);
            if (duration < 90) {
              acc.shorts.push(video);
            } else {
              acc.regular.push(video);
            }
            return acc;
          },
          { shorts: [], regular: [] }
        );

        setVideos(categorizedVideos);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideos();
  }, [creator]);

  // Helper function to parse ISO 8601 duration
  const parseDuration = (isoDuration: string): number => {
    const matches = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(matches?.[1]?.replace('H', '') || '0', 10);
    const minutes = parseInt(matches?.[2]?.replace('M', '') || '0', 10);
    const seconds = parseInt(matches?.[3]?.replace('S', '') || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {creator ? (
        <>
          <h2 className="text-2xl font-bold mb-6">{creator.author}'s Videos</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Shorts</h3>
            <div className="grid grid-cols-1 gap-6">
              {videos.shorts.length > 0 ? (
                videos.shorts.map((short) => (
                  <iframe
                    key={short.id}
                    className="w-full h-64 rounded-lg"
                    src={`https://www.youtube.com/embed/${short.id}`}
                    title={short.snippet.title}
                    allowFullScreen
                  ></iframe>
                ))
              ) : (
                <p className="text-gray-500">No shorts available for this creator.</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Regular Videos</h3>
            <div className="grid grid-cols-1 gap-6">
              {videos.regular.map((video) => (
                <iframe
                  key={video.id}
                  className="w-full h-64 rounded-lg"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.snippet.title}
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h3 className="text-red-500">Creator not found</h3>
      )}
    </div>
  );
};

<div className="space-y-6">
  {/* Other Content */}
  
  {/* Top Users Section */}
  <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
    <h2 className="text-xl font-semibold mb-4">Top Users</h2>
    <div className="flex space-x-6">
      {creators.map((creator) => (
        <div key={creator.id} className="flex items-center space-x-2">
          <img
            className="w-12 h-12 rounded-full"
            src={creator.avatar}
            alt={creator.name}
          />
          <span className="font-medium">{creator.name}</span>
        </div>
      ))}
    </div>
  </div>
  
  {/* More Content */}
</div>


export default CreatorPage;
