import TemplateCard from './TemplateCard';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  thumbnailUrl?: string;
}

interface TemplateGridProps {
  templates?: Template[];
  onSelectTemplate?: (id: string) => void;
  onPreviewTemplate?: (id: string) => void;
  columns?: 2 | 3 | 4;
}

const defaultTemplates: Template[] = [
  {
    id: 'endless-runner',
    title: 'Endless Runner',
    description: 'Run through construction sites avoiding obstacles and collecting power-ups.',
    category: 'Action',
    difficulty: 'Medium',
  },
  {
    id: 'match-3',
    title: 'Diamond Match',
    description: 'Match diamond tools and construction elements in this puzzle game.',
    category: 'Puzzle',
    difficulty: 'Easy',
  },
  {
    id: 'stacking-tower',
    title: 'Concrete Stack',
    description: 'Stack concrete blocks as high as you can without toppling.',
    category: 'Arcade',
    difficulty: 'Medium',
  },
  {
    id: 'timing-rhythm',
    title: 'Blade Beat',
    description: 'Time your cuts perfectly in this rhythm-based cutting game.',
    category: 'Arcade',
    difficulty: 'Hard',
  },
  {
    id: 'idle-clicker',
    title: 'Factory Builder',
    description: 'Build your own diamond tool factory in this idle game.',
    category: 'Strategy',
    difficulty: 'Easy',
  },
  {
    id: 'blade-master',
    title: 'Blade Master',
    description: 'Slice through materials with precision using DMI blades.',
    category: 'Action',
    difficulty: 'Medium',
  },
];

export default function TemplateGrid({
  templates = defaultTemplates,
  onSelectTemplate,
  onPreviewTemplate,
  columns = 3,
}: TemplateGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          description={template.description}
          category={template.category}
          difficulty={template.difficulty}
          thumbnailUrl={template.thumbnailUrl}
          onSelect={onSelectTemplate}
          onPreview={onPreviewTemplate}
        />
      ))}
    </div>
  );
}
