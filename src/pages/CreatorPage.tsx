import React from 'react';
import { useParams } from 'react-router-dom';

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
    video1: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    video2: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    video3: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video4: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video5: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video6: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video8: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video9: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list'
    
  },
  {
    id: 2,
    author: 'Mike Johnson',
    handle: '@mikejohnson',
    price: '₹10',
    subscriptions: 10000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    video: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    video1: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    video2: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    video3: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video4: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video5: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video7: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video8: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list',
    video9: 'https://www.youtube.com/embed/GG4l5hW8kuQ&list'
  },
];

const CreatorPage = () => {
  const { id } = useParams(); // Get the creator's ID from the URL

  // Find the creator based on ID
  const creator = reels.find((reel) => reel.id === parseInt(id!));

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      {creator ? (
        <>
          <h2 className="text-2xl font-bold mb-6">{creator.author}'s Videos</h2>
          <div className="grid grid-cols-1 gap-6">
            <iframe
              className="w-full h-64 rounded-lg"
              src={creator.video}
              title={`Video by ${creator.author}`}
              allowFullScreen
            ></iframe>
            <iframe
               className="w-full h-64 rounded-lg"
               src={creator.video1}
              title={`Video by ${creator.author}`}
              allowFullScreen
            ></iframe>
            <iframe
               className= "w-full h-64 round-lg" 
               src={creator.video2}
               title={`Video by ${creator.author}`}
               allowFullScreen>
             </iframe>
            <iframe
              className= "w-full h-64 round-lg" 
              src={creator.video3}
              title={`Video by ${creator.author}`}
               allowFullScreen>
             </iframe>
             <iframe 
               className="w-full h-64 round-lg"
               src={creator.video4}
               title={`Video by ${creator.author}`}
               allowFullScreen> 
             </iframe>
             <iframe 
             className="w-full h-64 round-lg"
             src={creator.video5}
             title={`Video by ${creator.author}`}
             allowFullScreen> 
             </iframe>
             <iframe
               className="w-full h-64 round-lg"
               src={creator.video6}
               title={`Video by ${creator.author}`}
               allowFullScreen>
             </iframe>
             <iframe
               className="w-full h-64 round-lg"
               src={creator.video7}
               title={`Video by ${creator.author}`}
               allowFullScreen>
             </iframe>
             <iframe
               className="w-full h-64 round-lg"
               src={creator.video8}
               title={`Video by ${creator.author}`}
               allowFullScreen>
             </iframe>
             <iframe
               className="w-full h-64 round-lg"
               src={creator.video9}
               title={`Video by ${creator.author}`}
               allowFullScreen>
             </iframe>
             <iframe
                 className="w-full h-64 round-lg"
                 src={creator.video9}
                 title={`Video by ${creator.author}`}
                 allowFullScreen>

             </iframe>
             <iframe
                 className="w-full h-64 round-lg"
                 src={creator.video9}
                 title={`Video by ${creator.author}`}
                 allowFullScreen>

             </iframe>
             <iframe
                 className="w-full h-64 round-lg"
                 src={creator.video9}
                 title={`Video by ${creator.author}`}
                 allowFullScreen>

             </iframe>
             <iframe
                 className="w-full h-64 round-lg"
                 src={creator.video9}
                 title={`Video by ${creator.author}`}
                 allowFullScreen>

             </iframe>

          </div>
        </>
      ) : (
        <h3 className="text-red-500">Creator not found</h3>
      )}
    </div>
  );
};

export default CreatorPage;
