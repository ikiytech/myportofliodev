"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ImageOff } from "lucide-react";
import { galleryAlbums, galleryCategories } from "@/data/content";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [activeAlbum, setActiveAlbum] = useState<(typeof galleryAlbums)[number] | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => setMounted(true), []);

  const filtered = activeCategory === "Semua"
    ? galleryAlbums
    : galleryAlbums.filter((a) => a.category === activeCategory);

  function openAlbum(album: (typeof galleryAlbums)[number]) {
    setActiveAlbum(album);
    setPhotoIndex(0);
    document.body.style.overflow = "hidden";
  }
  function closeAlbum() {
    setActiveAlbum(null);
    document.body.style.overflow = "";
  }
  function nextPhoto() {
    if (!activeAlbum) return;
    setPhotoIndex((prev) => (prev + 1) % activeAlbum.images.length);
  }
  function prevPhoto() {
    if (!activeAlbum) return;
    setPhotoIndex((prev) => (prev - 1 + activeAlbum.images.length) % activeAlbum.images.length);
  }

  // keyboard nav saat modal terbuka
  useEffect(() => {
    if (!activeAlbum) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") closeAlbum();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeAlbum, photoIndex]);

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-semibold mb-2">Galeri Hasil Kerja</h2>
        <p className="text-charcoal-400 mb-8">Bukti visual dari pekerjaan dan project yang sudah dikerjakan</p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                activeCategory === cat
                  ? "bg-amber-400 text-charcoal-950 border-amber-400 font-medium"
                  : "border-charcoal-700 text-charcoal-400 hover:border-charcoal-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid CARD ALBUM — cuma cover, bukan semua foto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((album) => (
            <button
              key={album.id}
              onClick={() => openAlbum(album)}
              className="relative aspect-video rounded-lg overflow-hidden border border-charcoal-800 group isolate text-left bg-charcoal-900"
            >
              {failedImages.has(album.cover) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal-900 text-charcoal-600 gap-2 border border-charcoal-800 border-dashed">
                  <ImageOff size={22} />
                  <span className="text-xs">Belum tersedia</span>
                </div>
              ) : (
                <Image
                  src={album.cover}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: (album as any).objectPosition || "center" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={() => setFailedImages((prev) => new Set(prev).add(album.cover))}
                />
              )}
              {/* Badge jumlah foto kalau album ini punya lebih dari 1 foto */}
              {album.images.length > 1 && (
                <span className="absolute top-2 right-2 bg-charcoal-950/80 text-charcoal-50 text-xs px-2.5 py-1 rounded-full border border-charcoal-700 z-10 backdrop-blur-sm">
                  {album.images.length} foto
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent flex items-end p-4 z-20">
                <p className="text-sm font-medium text-charcoal-50 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{album.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal detail album — pakai portal, isi carousel foto-foto dalam album ini */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeAlbum && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-charcoal-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={closeAlbum}
            >
              <button
                onClick={closeAlbum}
                aria-label="Tutup"
                className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-charcoal-900 border border-charcoal-700 hover:text-charcoal-50 hover:border-charcoal-500 transition-colors z-50 text-charcoal-400"
              >
                <X size={24} />
              </button>

              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="max-w-4xl w-full" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-lg overflow-hidden mb-6 bg-charcoal-900 border border-charcoal-800 shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photoIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, info) => {
                        if (info.offset.x < -50) nextPhoto();
                        else if (info.offset.x > 50) prevPhoto();
                      }}
                      className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    >
                      {failedImages.has(activeAlbum.images[photoIndex]) ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal-900 text-charcoal-600 gap-2 pointer-events-none">
                          <ImageOff size={48} />
                          <span className="text-sm">Gambar belum tersedia</span>
                        </div>
                      ) : (
                        <Image
                          src={activeAlbum.images[photoIndex]}
                          alt={`${activeAlbum.title} - ${photoIndex + 1}`}
                          fill
                          className="object-contain pointer-events-none"
                          sizes="1024px"
                          onError={() => setFailedImages((prev) => new Set(prev).add(activeAlbum.images[photoIndex]))}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {activeAlbum.images.length > 1 && (
                    <>
                      <button
                        onClick={prevPhoto}
                        aria-label="Foto sebelumnya"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-charcoal-950/80 border border-charcoal-700 hover:border-amber-400 hover:text-amber-400 z-10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextPhoto}
                        aria-label="Foto berikutnya"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-charcoal-950/80 border border-charcoal-700 hover:border-amber-400 hover:text-amber-400 z-10"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Info album */}
                <div className="mt-4 text-center px-12">
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal-50 mb-2">{activeAlbum.title}</h3>
                  <p className="text-sm md:text-base text-charcoal-300 leading-relaxed">{activeAlbum.description}</p>
                </div>

                {/* Dot indicator antar foto dalam album ini */}
                {activeAlbum.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {activeAlbum.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIndex(i)}
                        aria-label={`Lihat foto ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === photoIndex ? "w-6 bg-amber-400" : "w-1.5 bg-charcoal-700"
                        }`}
                      />
                    ))}
                  </div>
                )}
                {activeAlbum.images.length > 1 && (
                  <p className="text-center text-xs text-charcoal-500 mt-2">
                    {photoIndex + 1} / {activeAlbum.images.length}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
