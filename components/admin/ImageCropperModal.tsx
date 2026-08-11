/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, Maximize2, Crop, Check, Loader2, Sparkles } from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onCropSave: (croppedImageUrl: string) => void;
  title?: string;
  defaultAspectRatio?: number; // e.g. 16/9 = 1.777, 3/4 = 0.75
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
  onCropSave,
  title = "Crop & Fit Thumbnail Image",
  defaultAspectRatio = 16 / 9,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [fitMode, setFitMode] = useState<"crop" | "fit">("fit");
  const [aspectRatio, setAspectRatio] = useState<number>(defaultAspectRatio);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Reset state when imageUrl or isOpen changes
  useEffect(() => {
    if (isOpen && imageUrl) {
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setFitMode("fit");
      setImageLoaded(false);
      setAspectRatio(defaultAspectRatio);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        imageRef.current = img;
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setImageLoaded(true);
      };
      img.onerror = () => {
        // Fallback without crossOrigin if CORS issues occur
        const fallbackImg = new Image();
        fallbackImg.src = imageUrl;
        fallbackImg.onload = () => {
          imageRef.current = fallbackImg;
          setImageDimensions({ width: fallbackImg.naturalWidth, height: fallbackImg.naturalHeight });
          setImageLoaded(true);
        };
      };
    }
  }, [isOpen, imageUrl, defaultAspectRatio]);

  // Draw current canvas state
  const renderCanvas = useCallback(
    (targetCanvas: HTMLCanvasElement | null, targetWidth: number, targetHeight: number) => {
      if (!targetCanvas || !imageRef.current || !imageLoaded) return;

      const ctx = targetCanvas.getContext("2d");
      if (!ctx) return;

      targetCanvas.width = targetWidth;
      targetCanvas.height = targetHeight;

      const img = imageRef.current;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      ctx.clearRect(0, 0, targetWidth, targetHeight);

      // Background fill for fit mode letterboxing
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      ctx.save();

      if (fitMode === "fit") {
        // Calculate fit scale to show 100% of image inside canvas
        const scale = Math.min(targetWidth / imgW, targetHeight / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const offsetX = (targetWidth - drawW) / 2;
        const offsetY = (targetHeight - drawH) / 2;

        // Apply rotation if needed
        ctx.translate(targetWidth / 2, targetHeight / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      } else {
        // Crop / Pan / Zoom mode
        ctx.translate(targetWidth / 2 + position.x, targetHeight / 2 + position.y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);

        // Fill cover scale
        const coverScale = Math.max(targetWidth / imgW, targetHeight / imgH);
        const drawW = imgW * coverScale;
        const drawH = imgH * coverScale;

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      }

      ctx.restore();
    },
    [imageLoaded, fitMode, position, zoom, rotation]
  );

  // Update canvas preview whenever controls change
  useEffect(() => {
    if (!isOpen || !imageLoaded) return;

    // Render main cropper canvas (800x450 or calculated by aspect ratio)
    const baseW = 800;
    const baseH = Math.round(baseW / aspectRatio);
    renderCanvas(canvasRef.current, baseW, baseH);

    // Render live thumbnail preview (320x180 equivalent)
    renderCanvas(previewCanvasRef.current, 320, Math.round(320 / aspectRatio));
  }, [isOpen, imageLoaded, renderCanvas, aspectRatio]);

  // Drag controls
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (fitMode === "fit") return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || fitMode === "fit") return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch controls for mobile support
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (fitMode === "fit" || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || fitMode === "fit" || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Save cropped image
  const handleSave = async () => {
    if (!canvasRef.current) return;
    setIsSaving(true);

    try {
      // Export high quality canvas (1200px width based on aspect ratio)
      const exportCanvas = document.createElement("canvas");
      const exportW = 1200;
      const exportH = Math.round(exportW / aspectRatio);
      renderCanvas(exportCanvas, exportW, exportH);

      const blob = await new Promise<Blob | null>((resolve) =>
        exportCanvas.toBlob((b) => resolve(b), "image/jpeg", 0.92)
      );

      if (!blob) {
        throw new Error("Failed to generate image blob");
      }

      // Try uploading to backend /api/upload
      const formData = new FormData();
      formData.append("file", blob, "cropped-thumbnail.jpg");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const uploadedUrl = data?.result?.secure_url || data?.url;
        if (uploadedUrl) {
          onCropSave(uploadedUrl);
          onClose();
          return;
        }
      }

      // Fallback to data URL if upload route fails or returns no URL
      const dataUrl = exportCanvas.toDataURL("image/jpeg", 0.9);
      onCropSave(dataUrl);
      onClose();
    } catch (err) {
      console.error("Error saving cropped image:", err);
      // Fallback to canvas data URL
      if (canvasRef.current) {
        const exportCanvas = document.createElement("canvas");
        const exportW = 1200;
        const exportH = Math.round(exportW / aspectRatio);
        renderCanvas(exportCanvas, exportW, exportH);
        onCropSave(exportCanvas.toDataURL("image/jpeg", 0.9));
        onClose();
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <Crop size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-xs text-slate-400">
                Adjust cropping or select &quot;Fit Whole Image&quot; to ensure entire image displays on the card.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFitMode("fit");
                setPosition({ x: 0, y: 0 });
                setZoom(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                fitMode === "fit"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Maximize2 size={16} />
              Fit Whole Image (No Cutoff)
            </button>
            <button
              onClick={() => setFitMode("crop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                fitMode === "crop"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Crop size={16} />
              Manual Crop & Zoom
            </button>
          </div>

          {/* Aspect Ratio Options */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Aspect Ratio:</span>
            <button
              onClick={() => setAspectRatio(16 / 9)}
              className={`px-2.5 py-1 rounded-md transition ${
                Math.abs(aspectRatio - 16 / 9) < 0.05
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio(16 / 10)}
              className={`px-2.5 py-1 rounded-md transition ${
                Math.abs(aspectRatio - 16 / 10) < 0.05
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              16:10
            </button>
            <button
              onClick={() => setAspectRatio(4 / 3)}
              className={`px-2.5 py-1 rounded-md transition ${
                Math.abs(aspectRatio - 4 / 3) < 0.05
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              4:3
            </button>
            <button
              onClick={() => setAspectRatio(3 / 4)}
              className={`px-2.5 py-1 rounded-md transition ${
                Math.abs(aspectRatio - 3 / 4) < 0.05
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              3:4 (Team)
            </button>
            <button
              onClick={() => setAspectRatio(1)}
              className={`px-2.5 py-1 rounded-md transition ${
                Math.abs(aspectRatio - 1) < 0.05
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              1:1
            </button>
          </div>
        </div>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Canvas Area */}
          <div className="md:col-span-2 flex flex-col items-center justify-center bg-slate-950 rounded-xl p-4 border border-slate-800 relative min-h-[300px]">
            {!imageLoaded ? (
              <div className="flex flex-col items-center gap-3 text-slate-400 py-16">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <p className="text-sm">Loading image preview...</p>
              </div>
            ) : (
              <>
                <div
                  className="relative overflow-hidden rounded-lg border border-slate-700 shadow-inner"
                  style={{
                    width: "100%",
                    maxWidth: "520px",
                    aspectRatio: `${aspectRatio}`,
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={`w-full h-full object-contain ${
                      fitMode === "crop" ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                    }`}
                  />

                  {fitMode === "crop" && (
                    <div className="absolute inset-0 pointer-events-none border border-white/40 grid grid-cols-3 grid-rows-3">
                      <div className="border-r border-b border-white/20" />
                      <div className="border-r border-b border-white/20" />
                      <div className="border-b border-white/20" />
                      <div className="border-r border-b border-white/20" />
                      <div className="border-r border-b border-white/20" />
                      <div className="border-b border-white/20" />
                      <div className="border-r border-white/20" />
                      <div className="border-r border-white/20" />
                      <div />
                    </div>
                  )}
                </div>

                {fitMode === "crop" && (
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <Sparkles size={13} className="text-blue-400" /> Click and drag on canvas to adjust image positioning.
                  </p>
                )}
              </>
            )}

            {/* Controls Toolbar for Manual Crop */}
            {fitMode === "crop" && imageLoaded && (
              <div className="flex items-center gap-4 mt-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <ZoomOut size={16} className="text-slate-400" />
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-28 accent-blue-500 cursor-pointer"
                  />
                  <ZoomIn size={16} className="text-slate-400" />
                  <span className="text-xs font-mono text-slate-300 ml-1">{Math.round(zoom * 100)}%</span>
                </div>

                <div className="h-4 w-px bg-slate-800" />

                <button
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 px-2.5 py-1.5 rounded-lg transition"
                >
                  <RotateCw size={14} /> Rotate
                </button>
              </div>
            )}
          </div>

          {/* Live Card Preview Column */}
          <div className="flex flex-col gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span>Card Live Preview</span>
            </h3>
            <p className="text-xs text-slate-400">
              This live preview shows exactly how your item thumbnail card will display on the website.
            </p>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 shadow-md">
              <div
                className="w-full bg-slate-950 relative overflow-hidden"
                style={{ aspectRatio: `${aspectRatio}` }}
              >
                <canvas ref={previewCanvasRef} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 bg-slate-900 border-t border-slate-800">
                <div className="h-3 w-3/4 bg-slate-700 rounded mb-2 animate-pulse" />
                <div className="h-2.5 w-1/2 bg-slate-800 rounded" />
              </div>
            </div>

            {imageDimensions.width > 0 && (
              <div className="text-[11px] text-slate-400 space-y-1 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between">
                  <span>Original Size:</span>
                  <span className="font-mono text-slate-300">
                    {imageDimensions.width} × {imageDimensions.height}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Target Ratio:</span>
                  <span className="font-mono text-slate-300">{aspectRatio.toFixed(2)}:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode:</span>
                  <span className="font-semibold text-blue-400 capitalize">{fitMode === "fit" ? "Whole Image Fit" : "Cropped & Scaled"}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !imageLoaded}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving Cropped Image...
              </>
            ) : (
              <>
                <Check size={18} />
                Save & Apply Thumbnail
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
