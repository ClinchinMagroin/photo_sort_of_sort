'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FolderUp, Wand2 } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Provider</CardTitle>
          <CardDescription>Configure which AI service to use for tagging and other features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-provider">AI Service</Label>
            <Select defaultValue="google">
              <SelectTrigger id="api-provider">
                <SelectValue placeholder="Select an AI provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google AI</SelectItem>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="huggingface">Hugging Face</SelectItem>
              </SelectContent>
            </Select>
             <p className="text-sm text-muted-foreground">
              Select your preferred AI service. Full integration for some providers may not be available yet.
            </p>
          </div>
           <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" placeholder="Enter your API key" />
            <p className="text-sm text-muted-foreground">
              Your API key for the selected service.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Batch Processing</CardTitle>
          <CardDescription>Upload and process entire folders of photos with your custom rules.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col items-start gap-4">
                 <Button>
                    <FolderUp className="mr-2 h-4 w-4" />
                    Select Folder to Process
                    <input type="file" webkitdirectory="true" className="hidden" />
                </Button>
                <p className="text-sm text-muted-foreground">
                    Your selected folder will be processed using the AI provider and rules configured above.
                </p>
            </div>
             <div className="space-y-2">
                <Label htmlFor="custom-rules">Custom Rules</Label>
                <Input id="custom-rules" placeholder="e.g., if tag is 'beach', move to 'Vacation' album" />
                <p className="text-sm text-muted-foreground">
                Define rules for automatic organization. (Coming soon)
                </p>
            </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
