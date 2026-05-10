"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CarouselImage {
  id: number;
  url: string;
  filename: string;
  width: number;
  height: number;
}

export default function ImagenesPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [heroUrl, setHeroUrl] = useState("");
  const [eventsUrl, setEventsUrl] = useState("");
  const [loadingImages, setLoadingImages] = useState(true);
  const [uploadingCarousel, setUploadingCarousel] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingEvents, setUploadingEvents] = useState(false);
  const [message, setMessage] = useState("");

  const carouselInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const eventsInputRef = useRef<HTMLInputElement>(null);

  async function loadData() {
    try {
      const [imagesRes, contentRes] = await Promise.all([
        fetch("/api/admin/images"),
        fetch("/api/admin/content"),
      ]);
      const imagesData = await imagesRes.json();
      const contentData = await contentRes.json();
      setImages(imagesData);
      setHeroUrl(contentData.hero_image_url ?? "");
      setEventsUrl(contentData.events_image_url ?? "");
    } catch {
      setMessage("Error al cargar las imágenes.");
    } finally {
      setLoadingImages(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCarouselUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCarousel(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "carousel");
    formData.append("width", "400");
    formData.append("height", "500");

    try {
      const res = await fetch("/api/admin/images", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setImages((prev) => [...prev, data.image]);
      setMessage("Imagen del carrusel subida correctamente.");
    } catch {
      setMessage("Error al subir la imagen.");
    } finally {
      setUploadingCarousel(false);
      if (carouselInputRef.current) carouselInputRef.current.value = "";
    }
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "hero");

    try {
      const res = await fetch("/api/admin/images", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHeroUrl(data.url);
      setMessage("Imagen hero actualizada correctamente.");
    } catch {
      setMessage("Error al subir la imagen hero.");
    } finally {
      setUploadingHero(false);
      if (heroInputRef.current) heroInputRef.current.value = "";
    }
  }

  async function handleEventsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingEvents(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "events");

    try {
      const res = await fetch("/api/admin/images", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEventsUrl(data.url);
      setMessage("Imagen de eventos actualizada correctamente.");
    } catch {
      setMessage("Error al subir la imagen de eventos.");
    } finally {
      setUploadingEvents(false);
      if (eventsInputRef.current) eventsInputRef.current.value = "";
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar esta imagen del carrusel?")) return;
    setMessage("");

    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setImages((prev) => prev.filter((img) => img.id !== id));
      setMessage("Imagen eliminada.");
    } catch {
      setMessage("Error al eliminar la imagen.");
    }
  }

  const uploadBtnClass =
    "px-5 py-2 text-sm rounded-lg text-white transition-opacity hover:opacity-80 disabled:opacity-50 cursor-pointer";

  if (loadingImages) {
    return <p style={{ color: "#C2E1A3" }} className="text-sm opacity-60">Cargando...</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-medium mb-8" style={{ color: "#C2E1A3" }}>
        Gestionar Imágenes
      </h1>

      {message && (
        <p
          className="mb-6 text-sm"
          style={{ color: message.startsWith("Error") ? "#f87171" : "#86efac" }}
        >
          {message}
        </p>
      )}

      <section className="mb-10">
        <h2
          className="text-xs uppercase tracking-widest mb-4 pb-2 border-b"
          style={{ color: "#C2E1A3", borderColor: "#2a4012", opacity: 0.7 }}
        >
          Imágenes del Carrusel
        </h2>

        {images.length === 0 ? (
          <p className="text-sm mb-4 opacity-60" style={{ color: "#C2E1A3" }}>
            No hay imágenes en el carrusel.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 mb-4">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <div className="relative w-24 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.filename}
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized={img.url.startsWith("http")}
                  />
                </div>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "#ef4444" }}
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          className={uploadBtnClass}
          style={{ backgroundColor: "#1FA961", display: "inline-block" }}
        >
          <input
            ref={carouselInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCarouselUpload}
            disabled={uploadingCarousel}
          />
          {uploadingCarousel ? "Subiendo..." : "Subir imagen al carrusel"}
        </label>
      </section>

      <section className="mb-10">
        <h2
          className="text-xs uppercase tracking-widest mb-4 pb-2 border-b"
          style={{ color: "#C2E1A3", borderColor: "#2a4012", opacity: 0.7 }}
        >
          Imagen Principal (Hero)
        </h2>

        {heroUrl && (
          <div className="relative w-40 h-52 rounded-lg overflow-hidden mb-4">
            <Image
              src={heroUrl}
              alt="Hero actual"
              fill
              className="object-cover"
              sizes="160px"
              unoptimized={heroUrl.startsWith("http")}
            />
          </div>
        )}

        <label
          className={uploadBtnClass}
          style={{ backgroundColor: "#1FA961", display: "inline-block" }}
        >
          <input
            ref={heroInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleHeroUpload}
            disabled={uploadingHero}
          />
          {uploadingHero ? "Subiendo..." : "Cambiar imagen hero"}
        </label>
      </section>

      <section>
        <h2
          className="text-xs uppercase tracking-widest mb-4 pb-2 border-b"
          style={{ color: "#C2E1A3", borderColor: "#2a4012", opacity: 0.7 }}
        >
          Imagen Enmascarada (Eventos)
        </h2>

        {eventsUrl && (
          <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
            <Image
              src={eventsUrl}
              alt="Eventos actual"
              fill
              className="object-cover"
              sizes="160px"
              unoptimized={eventsUrl.startsWith("http")}
            />
          </div>
        )}

        <label
          className={uploadBtnClass}
          style={{ backgroundColor: "#1FA961", display: "inline-block" }}
        >
          <input
            ref={eventsInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleEventsUpload}
            disabled={uploadingEvents}
          />
          {uploadingEvents ? "Subiendo..." : "Cambiar imagen de eventos"}
        </label>
      </section>
    </div>
  );
}
