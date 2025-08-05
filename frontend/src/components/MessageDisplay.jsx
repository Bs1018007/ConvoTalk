import React, { useState } from 'react';
import { Download, Play, Pause, FileText, Image, Video, Music, File } from 'lucide-react';
import { AuthStore } from '../store/AuthStore';

const MessageDisplay = ({ message, isOwnMessage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const authUser = AuthStore.getState().authUser;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderAttachment = (attachment, index) => {
    const { type, url, filename, size, thumbnail, duration: fileDuration } = attachment;

    switch (type) {
      case 'image':
        return (
          <div key={index} className="max-w-xs">
            <img
              src={url}
              alt={filename}
              className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(url, '_blank')}
            />
            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
              <span className="truncate">{filename}</span>
              <span>{formatFileSize(size)}</span>
            </div>
          </div>
        );

      case 'video':
        return (
          <div key={index} className="max-w-xs">
            <div className="relative">
              <video
                ref={videoRef}
                src={url}
                poster={thumbnail}
                className="rounded-lg max-w-full h-auto"
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                  }
                }}
                onEnded={() => setIsPlaying(false)}
              />
              <button
                onClick={handleVideoPlay}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all rounded-lg"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
              <span className="truncate">{filename}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => handleDownload(url, filename)}
                className="btn btn-xs btn-outline"
              >
                <Download className="w-3 h-3" />
                Download
              </button>
            </div>
          </div>
        );

      case 'audio':
        return (
          <div key={index} className="max-w-xs bg-base-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAudioPlay}
                className="btn btn-circle btn-sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <div className="flex-1">
                <div className="text-sm font-medium">{filename}</div>
                <div className="text-xs text-gray-500">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              <button
                onClick={() => handleDownload(url, filename)}
                className="btn btn-xs btn-outline"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
            <audio
              ref={audioRef}
              src={url}
              onTimeUpdate={handleAudioTimeUpdate}
              onLoadedMetadata={() => {
                if (audioRef.current) {
                  setDuration(audioRef.current.duration);
                }
              }}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        );

      case 'document':
        return (
          <div key={index} className="max-w-xs bg-base-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{filename}</div>
                <div className="text-xs text-gray-500">{formatFileSize(size)}</div>
              </div>
              <button
                onClick={() => handleDownload(url, filename)}
                className="btn btn-xs btn-outline"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="max-w-xs bg-base-200 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <File className="w-8 h-8 text-gray-500" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{filename}</div>
                <div className="text-xs text-gray-500">{formatFileSize(size)}</div>
              </div>
              <button
                onClick={() => handleDownload(url, filename)}
                className="btn btn-xs btn-outline"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={message.senderId?.profilePic || 'https://via.placeholder.com/40'}
            alt="avatar"
          />
        </div>
      </div>
      <div className="chat-header">
        {message.senderId?.fullName || 'Unknown User'}
        <time className="text-xs opacity-50 ml-2">
          {new Date(message.createdAt).toLocaleTimeString()}
        </time>
      </div>
      <div className={`chat-bubble ${isOwnMessage ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
        {message.text && (
          <p className="mb-2">{message.text}</p>
        )}
        
        {/* Legacy image support */}
        {message.image && (
          <div className="mb-2">
            <img
              src={message.image}
              alt="Image"
              className="rounded-lg max-w-xs cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(message.image, '_blank')}
            />
          </div>
        )}
        
        {/* New attachments support */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="space-y-2">
            {message.attachments.map((attachment, index) => 
              renderAttachment(attachment, index)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDisplay;