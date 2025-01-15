import React from 'react';
import { Users, Globe, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SocialHub</h1>
          <p className="text-xl text-gray-600">Connecting people, sharing moments, creating memories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community First</h3>
            <p className="text-gray-600">Join millions of users sharing their stories and connecting with others.</p>
          </div>
          <div className="text-center p-6">
            <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">Connect with people from all around the world and share your experiences.</p>
          </div>
          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">Your privacy and security are our top priorities. Share with confidence.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, SocialHub was created with a simple mission: to bring people closer together. We believe in the power of shared experiences and authentic connections.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve millions of users worldwide, providing a platform where everyone can share their stories, connect with like-minded individuals, and build meaningful relationships.
          </p>
        </div>

        <div className="text-center pb-16">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">Be part of something bigger. Share your story with the world.</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;