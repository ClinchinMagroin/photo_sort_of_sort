// src/ai/flows/tag-photos.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for automatically tagging faces and objects in photos.
 *
 * - tagPhotos - The function to call to tag photos.
 * - TagPhotosInput - The input type for the tagPhotos function.
 * - TagPhotosOutput - The output type for the tagPhotos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TagPhotosInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to analyze, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TagPhotosInput = z.infer<typeof TagPhotosInputSchema>;

const TagPhotosOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of tags identified in the photo.'),
});
export type TagPhotosOutput = z.infer<typeof TagPhotosOutputSchema>;

export async function tagPhotos(input: TagPhotosInput): Promise<TagPhotosOutput> {
  return tagPhotosFlow(input);
}

const tagPhotosPrompt = ai.definePrompt({
  name: 'tagPhotosPrompt',
  input: {schema: TagPhotosInputSchema},
  output: {schema: TagPhotosOutputSchema},
  prompt: `You are an expert AI that identifies objects and faces in photos.

  Analyze the following photo and identify the objects and faces present.
  Return a list of tags that describe the photo.

  Photo: {{media url=photoDataUri}}
  `,
});

const tagPhotosFlow = ai.defineFlow(
  {
    name: 'tagPhotosFlow',
    inputSchema: TagPhotosInputSchema,
    outputSchema: TagPhotosOutputSchema,
  },
  async input => {
    const {output} = await tagPhotosPrompt(input);
    return output!;
  }
);
