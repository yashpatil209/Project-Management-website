import React, { useRef, useState } from 'react';
import { Play, ChevronRight, Star, Users, Trophy } from 'lucide-react';

function VedioSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className=" bg-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center py-20  gap-8 lg:gap-12">
          {/* Left Side - Video Section */}
          <div className="w-full ml-0 lg:ml-20 lg:w-1/2">
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-slate-900" 
              onClick={handleVideoPlay}
            >
              <video ref={videoRef} src="/vedios/home_vedio.mp4" className="w-full h-full"></video>
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900 ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Content Section */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-xl">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  New Release 2024
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Transform Your Workspace Experience
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600">
                  Discover a new way to collaborate and boost productivity with our innovative platform. Join thousands of teams already revolutionizing their workflow.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                  {/* <button className="flex items-center justify-center px-6 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Watch Demo
                  </button> */}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200">
                  {/* <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900">50K+</div>
                      <div className="text-xs sm:text-sm text-slate-600">Active Users</div>
                    </div>
                  </div> */}
                  {/* <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900">98%</div>
                      <div className="text-xs sm:text-sm text-slate-600">Success Rate</div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VedioSection;
