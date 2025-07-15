
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { PhotoGrid } from '@/components/photo-grid';
import { AITagger } from '@/components/ai-tagger';
import { SettingsPage } from '@/components/settings-page';
import { DuplicatesPage } from '@/components/duplicates-page';
import type { Photo } from '@/lib/types';

const samplePhotos: Photo[] = [
  { id: '1', src: 'https://placehold.co/600x400.png', title: 'Mountain Vista', date: '2023-08-15', tags: ['mountain', 'nature', 'sky', 'landscape'], aiHint: 'mountain landscape' },
  { id: '2', src: 'https://placehold.co/600x400.png', title: 'City at Night', date: '2024-01-20', tags: ['city', 'night', 'lights', 'urban'], aiHint: 'city night' },
  { id: '3', src: 'https://placehold.co/600x400.png', title: 'Beach Sunset', date: '2023-07-04', tags: ['beach', 'sunset', 'ocean', 'summer'], aiHint: 'beach sunset' },
  { id: '4', src: 'https://placehold.co/600x400.png', title: 'Forest Path', date: '2023-10-01', tags: ['forest', 'path', 'trees', 'autumn'], aiHint: 'forest path' },
  { id: '5', src: 'https://placehold.co/600x400.png', title: 'Family Gathering', date: '2024-03-12', tags: ['family', 'people', 'celebration'], aiHint: 'family gathering' },
  { id: '6', src: 'https://placehold.co/600x400.png', title: 'Street Art', date: '2023-11-25', tags: ['art', 'graffiti', 'urban', 'wall'], aiHint: 'street art' },
];

function LibraryPage() {
  return (
    <div className="flex flex-col gap-8">
      <AITagger />
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Your Library</h2>
        <PhotoGrid photos={samplePhotos} />
      </div>
    </div>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState('Library');

  const renderContent = () => {
    switch (activePage) {
      case 'Library':
        return <LibraryPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Duplicates':
        return <DuplicatesPage />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl text-muted-foreground">This page is not yet available.</h1>
          </div>
        );
    }
  };

  return (
    <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
      {renderContent()}
    </DashboardLayout>
  );
}
