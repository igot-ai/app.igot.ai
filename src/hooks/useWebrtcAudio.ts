// import { useRef, useState } from "react";

// import {
//   mediaDevices,
//   RTCPeerConnection,
//   RTCSessionDescription,
// } from "react-native-webrtc";

// export const useAudioWebRTC = () => {
//   const [isStreaming, setIsStreaming] = useState(false);
//   const socketRef = useRef<WebSocket | null>(null);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const startStream = async () => {
//     try {
//       console.log("Started streaming...");
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: false,
//       });

//       const peerConnection = new RTCPeerConnection();

//       stream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, stream);
//       });

//       peerConnection.addEventListener("icecandidate", (event) => {
//         if (event.candidate) {
//             socketRef.current?.send(JSON.stringify({
//         }
//       });
//     } catch (error) {}
//   };

//   return {};
// };
