// Test script for file upload functionality
import { uploadBase64File, getFileType, validateFile } from '../backend/lib/fileUpload.js';

// Mock file object for testing
const mockFile = {
  mimetype: 'image/jpeg',
  originalname: 'test-image.jpg',
  size: 1024 * 1024, // 1MB
  path: '/tmp/test.jpg'
};

// Test file type detection
console.log('Testing file type detection:');
console.log('JPEG image:', getFileType('image/jpeg', 'test.jpg'));
console.log('MP4 video:', getFileType('video/mp4', 'video.mp4'));
console.log('PDF document:', getFileType('application/pdf', 'document.pdf'));
console.log('MP3 audio:', getFileType('audio/mpeg', 'audio.mp3'));
console.log('Unknown file:', getFileType('application/unknown', 'unknown.xyz'));

// Test file validation
console.log('\nTesting file validation:');
try {
  const validation = validateFile(mockFile);
  console.log('Valid file:', validation);
} catch (error) {
  console.log('Validation error:', error.message);
}

// Test with oversized file
const oversizedFile = {
  ...mockFile,
  size: 200 * 1024 * 1024 // 200MB
};

try {
  const validation = validateFile(oversizedFile);
  console.log('Oversized file validation:', validation);
} catch (error) {
  console.log('Oversized file error:', error.message);
}

console.log('\nFile upload test completed!');
console.log('Note: Actual upload tests require Cloudinary credentials'); 