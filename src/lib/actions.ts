'use server';

import { tagPhotos, type TagPhotosInput } from '@/ai/flows/tag-photos';

export async function getPhotoTags(input: TagPhotosInput) {
  try {
    const result = await tagPhotos(input);
    return { tags: result.tags, error: null };
  } catch (error) {
    console.error('Error tagging photo:', error);
    return { tags: null, error: 'An error occurred while tagging the photo. Please try again.' };
  }
}
