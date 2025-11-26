export function renderMedia(url: string) {
  if (!url) return null;

  const isVideo = /youtube\.com|youtu\.be|dailymotion\.com|vimeo\.com/.test(
    url
  );

  if (isVideo) {
    return (
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl w-full"
      ></iframe>
    );
  }

  return (
    <img
      src={url}
      alt="media"
      className="w-full rounded-xl object-cover"
      loading="lazy"
    />
  );
}
