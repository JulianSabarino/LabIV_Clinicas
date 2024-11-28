import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase: SupabaseClient;

  constructor() {     // Replace these values with your Supabase URL and Key
    const SUPABASE_URL = 'https://zrjjbcppqqnckuqwgexi.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyampiY3BwcXFuY2t1cXdnZXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDI3OTQsImV4cCI6MjA0ODM3ODc5NH0.Uj9F9LmSEP5ruqlkAVBQQuX3lnq10U5NAj0680z42R8';

    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const { data, error } = await this.supabase.storage
        .from('clinicasab')  // 'images' is the name of your storage bucket
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Correctly access the public URL after upload
      const { data: publicUrlData } = this.supabase.storage
        .from('clinicasab')
        .getPublicUrl(data.path);

      // Return the correct public URL
      return publicUrlData.publicUrl; // Use 'publicUrl' instead of 'publicURL'
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
  
}
