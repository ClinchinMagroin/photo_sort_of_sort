'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>General application settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Enable or disable dark mode for the application.
              </span>
            </Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive email notifications for important events.
              </span>
            </Label>
            <Switch id="notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Tagger</CardTitle>
          <CardDescription>Configure the AI-powered photo tagging feature.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-tagging" className="flex flex-col space-y-1">
              <span>Automatic Tagging</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Automatically tag new photos upon upload.
              </span>
            </Label>
            <Switch id="auto-tagging" defaultChecked />
          </div>
           <div className="space-y-2">
            <Label htmlFor="api-key">Custom API Key (Optional)</Label>
            <Input id="api-key" placeholder="Enter your API key" />
            <p className="text-sm text-muted-foreground">
              Use your own AI model API key for tagging.
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
