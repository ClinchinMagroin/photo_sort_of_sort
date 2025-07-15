'use client';

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { UploadCloud, Sparkles, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getPhotoTags } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export function AITagger() {
  const [file, setFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    resetState();
    setFile(selectedFile);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setImageDataUrl(dataUrl);

      const result = await getPhotoTags({ photoDataUri: dataUrl });
      setIsLoading(false);
      if (result.error) {
        setError(result.error);
        toast({
            variant: "destructive",
            title: "Tagging Failed",
            description: result.error,
        });
      } else {
        setTags(result.tags);
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      setError('Failed to read file.');
      toast({
            variant: "destructive",
            title: "File Error",
            description: "There was an error reading the selected file.",
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const resetState = () => {
    setFile(null);
    setImageDataUrl(null);
    setTags(null);
    setError(null);
    setIsLoading(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            <CardTitle>AI-Powered Tagging</CardTitle>
        </div>
        <CardDescription>Upload a photo to automatically identify objects and faces, making it easier to sort and find your memories.</CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors ${isDragging ? 'border-primary bg-accent' : 'border-border'}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="h-10 w-10" />
                <p className="font-semibold">Click to upload or drag & drop</p>
                <p className="text-sm">PNG, JPG, or WEBP</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              {imageDataUrl && (
                <Image
                  src={imageDataUrl}
                  alt="Uploaded photo"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover aspect-video w-full"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">Generated Tags</h3>
                <p className="text-sm text-muted-foreground">AI-identified tags for your photo.</p>
              </div>
              {isLoading && (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-1/4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-16 rounded-full" />
                  </div>
                </div>
              )}
              {error && (
                 <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p>{error}</p>
                 </div>
              )}
              {tags && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-base py-1 px-3 capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Button onClick={resetState} variant="outline" className="mt-4 self-start">
                Upload Another Photo
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
