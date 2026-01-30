interface TemplateCardProps {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  thumbnailUrl?: string;
  onSelect?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export default function TemplateCard({
  id = 'template-1',
  title = 'Game Template',
  description = 'A professional arcade game template with DMI branding.',
  category = 'Arcade',
  difficulty = 'Medium',
  thumbnailUrl,
  onSelect,
  onPreview,
}: TemplateCardProps) {
  const handleSelect = () => {
    onSelect?.(id);
  };

  const handlePreview = () => {
    onPreview?.(id);
  };

  return (
    <article className="card-dmi group flex flex-col">
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-dmi-gray relative overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-ui text-gray-400">Game Preview</span>
          </div>
        )}
        
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-dmi-red/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={handlePreview}
            className="font-ui text-sm font-medium px-4 py-2 bg-white text-dmi-red rounded hover:bg-transparent hover:text-white transition-colors border-2 border-white"
          >
            Preview
          </button>
          <button
            onClick={handleSelect}
            className="font-ui text-sm font-medium px-4 py-2 bg-dmi-red text-white rounded hover:bg-white hover:text-dmi-red transition-colors border-2 border-white"
          >
            Use
          </button>
        </div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 font-ui text-xs px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-dmi-black">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-ui font-semibold text-dmi-black text-lg mb-1 group-hover:text-dmi-red transition-colors">
          {title}
        </h3>
        
        <p className="font-body text-sm text-dmi-gray line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="font-ui text-xs text-dmi-gray">
            Difficulty: {difficulty}
          </span>
          <button
            onClick={handleSelect}
            className="font-ui text-sm font-medium text-dmi-red hover:underline"
          >
            Select →
          </button>
        </div>
      </div>
    </article>
  );
}
