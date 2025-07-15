
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import type { Photo } from '@/lib/types';

const duplicatePhotos: { set: Photo[] }[] = [
  {
    set: [
      { id: '1a', src: 'https://placehold.co/600x400.png', title: 'Mountain Vista', date: '2023-08-15', tags: ['mountain', 'nature', 'sky', 'landscape'], aiHint: 'mountain landscape' },
      { id: '1b', src: 'https://placehold.co/600x400.png', title: 'Mountain Vista (copy)', date: '2023-08-16', tags: ['mountain', 'nature', 'sky'], aiHint: 'mountain landscape' },
      { id: '1c', src: 'https://placehold.co/600x400.png', title: 'IMG_1234.JPG', date: '2023-08-15', tags: ['mountain', 'landscape'], aiHint: 'mountain landscape' },
    ]
  },
  {
    set: [
        { id: '2a', src: 'https://placehold.co/600x400.png', title: 'Beach Sunset', date: '2023-07-04', tags: ['beach', 'sunset', 'ocean', 'summer'], aiHint: 'beach sunset' },
        { id: '2b', src: 'https://placehold.co/600x400.png', title: 'Sunset at the Beach', date: '2023-07-04', tags: ['beach', 'sunset', 'ocean', 'summer', 'vacation'], aiHint: 'beach sunset' },
    ]
  },
  {
    set: [
        { id: '3a', src: 'https://placehold.co/600x400.png', title: 'City Lights', date: '2024-01-20', tags: ['city', 'night', 'lights', 'urban'], aiHint: 'city night' },
        { id: '3b', src: 'https://placehold.co/600x400.png', title: 'Downtown at Night', date: '2024-01-20', tags: ['city', 'night', 'urban'], aiHint: 'city night' },
    ]
  },
];

interface DuplicatePhotoCardProps {
    photo: Photo;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

function DuplicatePhotoCard({ photo, isSelected, onSelect }: DuplicatePhotoCardProps) {
    return (
        <Card className={`overflow-hidden relative ${isSelected ? 'border-primary ring-2 ring-primary' : ''}`}>
            <CardContent className="p-0">
                <div className="relative aspect-video">
                    <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover"
                        data-ai-hint={photo.aiHint}
                    />
                    <div className="absolute top-2 left-2">
                        <Checkbox
                            id={`select-${photo.id}`}
                            checked={isSelected}
                            onCheckedChange={() => onSelect(photo.id)}
                            className="bg-background/80 border-white/80 data-[state=checked]:bg-primary"
                        />
                    </div>
                </div>
                <div className="p-3 space-y-2">
                    <p className="font-semibold text-sm truncate" title={photo.title}>{photo.title}</p>
                    <p className="text-xs text-muted-foreground">{photo.date}</p>
                    <div className="flex flex-wrap gap-1 h-10 overflow-y-auto">
                        {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="capitalize text-xs">
                            {tag}
                        </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function DuplicateSet({ photoSet, setNumber }: { photoSet: Photo[], setNumber: number }) {
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    const handleSelect = (id: string) => {
        setSelectedPhotos(prev => 
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    return (
        <AccordionItem value={`item-${setNumber}`}>
            <AccordionTrigger>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                        {photoSet.slice(0, 3).map((photo, index) => (
                            <Image key={photo.id} src={photo.src} alt={photo.title} width={40} height={40} className="rounded-full border-2 border-background" data-ai-hint={photo.aiHint} />
                        ))}
                    </div>
                    <div>
                        <h3 className="font-semibold">{`Duplicate Set ${setNumber}`}</h3>
                        <p className="text-sm text-muted-foreground">{photoSet.length} similar photos found</p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg">
                    {photoSet.map(photo => (
                        <DuplicatePhotoCard 
                            key={photo.id} 
                            photo={photo}
                            isSelected={selectedPhotos.includes(photo.id)}
                            onSelect={handleSelect} 
                        />
                    ))}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedPhotos([])}>Deselect All</Button>
                    <Button 
                        variant="destructive"
                        size="sm"
                        disabled={selectedPhotos.length === 0}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Selected ({selectedPhotos.length})
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}


export function DuplicatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Duplicate Finder</h1>
        <p className="text-muted-foreground">Review and delete duplicate photos to clean up your library.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Found {duplicatePhotos.length} Duplicate Sets</CardTitle>
          <CardDescription>Expand each set to see the similar photos. Select the ones you want to delete.</CardDescription>
        </CardHeader>
        <CardContent>
            {duplicatePhotos.length > 0 ? (
                <Accordion type="multiple" className="space-y-4">
                    {duplicatePhotos.map((dup, index) => (
                        <DuplicateSet key={index} photoSet={dup.set} setNumber={index + 1} />
                    ))}
                </Accordion>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-lg">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">No Duplicates Found</h3>
                    <p className="text-muted-foreground">Your library is clean! Run the finder again to re-scan.</p>
                    <Button>Scan for Duplicates</Button>
                </div>
            )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="destructive" size="lg">
            <Trash2 className="mr-2" />
            Delete All Selected Photos
        </Button>
      </div>
    </div>
  );
}
