import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Photo } from '@/lib/types';
import { Calendar } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <Card 
      className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={photo.src}
            alt={photo.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={photo.aiHint}
          />
        </div>
        <div className="p-4 space-y-3">
            <h3 className="font-semibold truncate">{photo.title}</h3>
            <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
            </div>
            {photo.tags && photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 h-14 overflow-y-auto">
                {photo.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                </Badge>
                ))}
            </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
