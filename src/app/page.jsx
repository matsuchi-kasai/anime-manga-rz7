"use client";

import { useEffect, useState } from "react";

export default function AnimeMangaRz7() {
  const [mangaList, setMangaList] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedManga, setSelectedManga] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Manga Genre Romance Fantasy & Update Terbaru
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Mengambil manga terpopuler/terbaru (Bisa diganti endpoint Consumet API)
        const resManga = await fetch(
          "https://api.jikan.moe/v4/manga?genres=22,10&order_by=popularity&limit=20"
        );
        const dataManga = await resManga.json();

        // Mengambil jadwal update anime/manga
        const resSchedule = await fetch("https://api.jikan.moe/v4/schedules");
        const dataSchedule = await resSchedule.json();

        setMangaList(dataManga.data || []);
        setSchedule(dataSchedule.data || []);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <header className="border-b border-slate-800 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-500 tracking-wider">
          ANIME MANGA RZ7
        </h1>
        <p className="text-slate-400 text-sm">
          Baca Manga Romance Fantasy & Cek Jadwal Update Otomatis
        </p>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Kolom Kiri & Tengah: Daftar Manga */}
        <section className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-4 text-indigo-400">
            📚 Rekomendasi Manga Romance & Fantasy
          </h2>

          {loading ? (
            <div className="text-center py-10 text-slate-500">Memuat data...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mangaList.map((manga) => (
                <div
                  key={manga.mal_id}
                  onClick={() => setSelectedManga(manga)}
                  className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-indigo-500 transition duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <img
                    src={manga.images.jpg.image_url}
                    alt={manga.title}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {manga.title}
                    </h3>
                    <span className="text-xs text-indigo-400 mt-1 inline-block">
                      ★ {manga.score || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Kolom Kanan: Jadwal Update Otomatis */}
        <aside className="bg-slate-900 p-4 rounded-xl border border-slate-800 h-fit">
          <h2 className="text-lg font-bold mb-4 text-indigo-400 border-b border-slate-800 pb-2">
            📅 Jadwal Rilis & Update
          </h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {schedule.slice(0, 10).map((item) => (
              <div
                key={item.mal_id}
                className="bg-slate-950 p-3 rounded-md border border-slate-800/60"
              >
                <p className="font-semibold text-sm line-clamp-1">{item.title}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Hari: {item.broadcast?.day || "Harian"}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Modal Detail Manga & Karakter */}
      {selectedManga && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 p-6 rounded-2xl max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-indigo-400">
                {selectedManga.title}
              </h3>
              <button
                onClick={() => setSelectedManga(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={selectedManga.images.jpg.image_url}
                alt={selectedManga.title}
                className="w-40 rounded-lg object-cover mx-auto md:mx-0"
              />
              <div className="flex-1">
                <p className="text-xs text-slate-300 mb-2">
                  <span className="font-bold">Status:</span> {selectedManga.status}
                </p>
                <p className="text-xs text-slate-300 mb-2">
                  <span className="font-bold">Genre:</span>{" "}
                  {selectedManga.genres.map((g) => g.name).join(", ")}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {selectedManga.synopsis || "Tidak ada sinopsis."}
                </p>
                <a
                  href={`https://mangadex.org/title/${selectedManga.mal_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                  📖 Baca Manga Ini Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
            }
