"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReaderPage({ params }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchChapterPages() {
      try {
        setLoading(true);
        // Mengambil daftar gambar per halaman dari chapter
        const res = await fetch(
          `https://api.mangadex.org/at-home/server/${params.chapterId}`
        );
        const data = await res.json();
        
        const baseUrl = data.baseUrl;
        const hash = data.chapter.hash;
        // Menyusun URL gambar lengkap
        const pageImages = data.chapter.data.map(
          (file) => `${baseUrl}/data/${hash}/${file}`
        );

        setPages(pageImages);
      } catch (err) {
        console.error("Gagal memuat gambar komik:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (params.chapterId) {
      fetchChapterPages();
    }
  }, [params.chapterId]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-6 px-2">
      {/* Tombol Kembali & Navigasi */}
      <div className="max-w-3xl w-full flex justify-between items-center mb-6 px-4">
        <Link
          href="/"
          className="bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-lg transition"
        >
          ← Kembali ke Beranda
        </Link>
        <span className="text-xs text-indigo-400 font-semibold">
          ANIME MANGA RZ7 READER
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-slate-400 text-sm animate-pulse">
          Memuat halaman komik...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-20 text-red-400 text-sm">
          Gagal memuat chapter ini. Coba refresh halaman.
        </div>
      )}

      {/* List Gambar Halaman Manga */}
      {!loading && !error && (
        <div className="max-w-3xl w-full flex flex-col items-center space-y-2">
          {pages.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Halaman ${index + 1}`}
              className="w-full h-auto object-contain rounded-sm"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </div>
  );
          }
