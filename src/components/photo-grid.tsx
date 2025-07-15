import { PhotoCard } from './photo-card';
import type { Photo } from '@/lib/types';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </div>
  );
}
