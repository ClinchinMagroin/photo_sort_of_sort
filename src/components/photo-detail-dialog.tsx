
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand2, AlertTriangle } from 'lucide-react';
import type { Photo } from '@/lib/types';
import { editPhoto } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface PhotoDetailDialogProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoDetailDialog({ photo, isOpen, onClose }: PhotoDetailDialogProps) {
  const [prompt, setPrompt] = useState('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    const result = await editPhoto({ photoDataUri: photo.src, prompt });

    setIsLoading(false);
    if (result.error) {
      setError(result.error);
      toast({
        variant: 'destructive',
        title: 'Editing Failed',
        description: result.error,
      });
    } else if (result.editedPhotoDataUri) {
      setEditedImage(result.editedPhotoDataUri);
    }
  };

  const handleClose = () => {
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{photo.title}</DialogTitle>
          <DialogDescription>
            {photo.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">AI Magic Edit</h3>
                <div className="space-y-2">
                    <Textarea
                        placeholder="e.g., 'Add a birthday hat to the person' or 'Change the background to a beach'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                    />
                    <Button onClick={handleGenerate} disabled={isLoading || !prompt}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isLoading ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Result</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-center text-muted-foreground">Original</p>
                        <Image
                            src={photo.src}
                            alt="Original photo"
                            width={400}
                            height={300}
                            className="rounded-lg object-cover aspect-video w-full"
                        />
                    </div>
                     <div className="space-y-2">
                        <p className="text-sm font-medium text-center text-muted-foreground">Edited</p>
                        <div className="rounded-lg object-cover aspect-video w-full bg-muted flex items-center justify-center">
                        {isLoading ? (
                            <Skeleton className="w-full h-full" />
                        ) : editedImage ? (
                            <Image
                                src={editedImage}
                                alt="Edited photo"
                                width={400}
                                height={300}
                                className="rounded-lg object-cover aspect-video w-full"
                            />
                        ) : (
                            <div className="text-center text-muted-foreground p-4">
                                <Wand2 className="mx-auto h-8 w-8 mb-2" />
                                <p className="text-sm">Your edited image will appear here.</p>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Close</Button>
          {editedImage && <Button>Save Changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
