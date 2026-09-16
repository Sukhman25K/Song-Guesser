const RING_COLORS = {
  accent: "hover:ring-accent",
  teal: "hover:ring-teal",
};

function ImageTile({ image, label, onClick, disabled = false, ringColor = "accent", size = "" }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative ${size} aspect-square rounded-lg overflow-hidden group shadow-lg shadow-black/40 ring-2 ring-transparent transition duration-300 hover:-translate-y-1 disabled:opacity-50 ${RING_COLORS[ringColor]}`}>
      <img src={image} alt={`${label} cover art`} className="w-full h-full transition-transform duration-300 group-hover:scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      <p className="absolute bottom-3 left-3 right-3 font-display text-lg text-left truncate">
        {label}
      </p>
    </button>
  );
}

export default ImageTile;