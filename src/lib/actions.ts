
'use server';

import { tagPhotos, type TagPhotosInput } from '@/ai/flows/tag-photos';
import { editPhoto as editPhotoFlow, type EditPhotoInput } from '@/ai/flows/edit-photo-flow';

export async function getPhotoTags(input: TagPhotosInput) {
  try {
    const result = await tagPhotos(input);
    return { tags: result.tags, error: null };
  } catch (error) {
    console.error('Error tagging photo:', error);
    return { tags: null, error: 'An error occurred while tagging the photo. Please try again.' };
  }
}

export async function editPhoto(input: EditPhotoInput) {
  try {
    const result = await editPhotoFlow(input);
    return { editedPhotoDataUri: result.editedPhotoDataUri, error: null };
  } catch (error) {
    console.error('Error editing photo:', error);
    return { editedPhotoDataUri: null, error: 'An error occurred while editing the photo. Please try again.' };
  }
}
