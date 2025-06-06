import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, FileText, Image, Settings } from 'lucide-react';
import AdminColorConfig from '@/components/admin/AdminColorConfig';
import AdminContentManager from '@/components/admin/AdminContentManager';
import AdminMediaManager from '@/components/admin/AdminMediaManager';
import AdminSettings from '@/components/admin/AdminSettings';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-divine-purple">
                Website Management
              </h1>
              <p className="text-sm text-gray-600">Content Management System</p>
            </div>
            <a 
              href="/" 
              className="text-divine-purple hover:text-divine-purple-dark transition-colors"
            >
              Return to Website
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText size={16} />
              Content
            </TabsTrigger>
            <TabsTrigger value="styling" className="flex items-center gap-2">
              <Palette size={16} />
              Styling
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image size={16} />
              Media
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <AdminContentManager />
          </TabsContent>

          <TabsContent value="styling">
            <AdminColorConfig />
          </TabsContent>

          <TabsContent value="media">
            <AdminMediaManager />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;