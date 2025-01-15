import React, { useState } from 'react';
import { Image, Film, Send } from 'lucide-react';

const Create = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission here
    setContent('');
  };

  return (
    <div className="pt-20 px-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <button type="button" className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                <Image className="h-5 w-5" />
                <span>Photo</span>
              </button>
              <button type="button" className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                <Film className="h-5 w-5" />
                <span>Video</span>
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;