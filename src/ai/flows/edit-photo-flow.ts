
'use server';
/**
 * @fileOverview A Genkit flow for editing photos based on a text prompt.
 *
 * - editPhoto - The function to call to edit a photo.
 * - EditPhotoInput - The input type for the editPhoto function.
 * - EditPhotoOutput - The output type for the editPhoto function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EditPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "The original photo to edit, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('A description of the edits to make to the photo.'),
});
export type EditPhotoInput = z.infer<typeof EditPhotoInputSchema>;

const EditPhotoOutputSchema = z.object({
  editedPhotoDataUri: z
    .string()
    .describe(
      "The edited photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EditPhotoOutput = z.infer<typeof EditPhotoOutputSchema>;

export async function editPhoto(input: EditPhotoInput): Promise<EditPhotoOutput> {
  return editPhotoFlow(input);
}

const editPhotoFlow = ai.defineFlow(
  {
    name: 'editPhotoFlow',
    inputSchema: EditPhotoInputSchema,
    outputSchema: EditPhotoOutputSchema,
  },
  async ({ photoDataUri, prompt }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        { media: { url: photoDataUri } },
        { text: prompt },
      ],
      config: {
        responseModalities: ['IMAGE', 'TEXT'], // IMAGE is required for generation
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to produce an output.');
    }

    return { editedPhotoDataUri: media.url };
  }
);
