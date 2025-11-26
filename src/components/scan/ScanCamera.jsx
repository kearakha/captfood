"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { CameraIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function ScanCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [facing, setFacing] = useState("environment");
  const [hint, setHint] = useState("Mengaktifkan kamera…");

  /** STOP CAMERA **/
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  /** START CAMERA **/
  const startCamera = useCallback(async () => {
    try {
      stopCamera();

      if (!navigator.mediaDevices) {
        setHint("Browser tidak mendukung kamera.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setHint("Kamera aktif — arahkan ke makanan");
    } catch (err) {
      console.error(err);
      setHint("Gagal membuka kamera. Periksa izin.");
    }
  }, [facing, stopCamera]);

  /** EFFECT TANPA WARNING **/
  useEffect(() => {
    let active = true;

    // Hindari synchronous setState dalam effect
    Promise.resolve().then(() => {
      if (active) startCamera();
    });

    return () => {
      active = false;
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  /** GANTI KAMERA **/
  const flipCamera = () => {
    setFacing((prev) => (prev === "environment" ? "user" : "environment"));
  };

  /** SNAPSHOT **/
  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    sessionStorage.setItem("captfood:lastScan", dataUrl);

    window.location.href = "/scan/hasil";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 max-w-sm mx-auto">
      {/* VIDEO */}
      <div className="relative rounded-xl overflow-hidden bg-black aspect-3/4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full shadow text-xs">
          {hint}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={flipCamera}
          className="w-14 h-14 bg-white border border-gray-300 rounded-full flex items-center justify-center"
        >
          <ArrowPathIcon className="w-7 h-7 text-gray-700" />
        </button>

        <button
          onClick={capture}
          className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <CameraIcon className="w-10 h-10 text-white" />
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
