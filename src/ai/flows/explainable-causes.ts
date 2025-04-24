'use server';
/**
 * @fileOverview Generates a list of potential causes based on symptoms and conditions.
 *
 * - explainableCauses - A function that handles the generation of potential causes.
 * - ExplainableCausesInput - The input type for the explainableCauses function.
 * - ExplainableCausesOutput - The return type for the explainableCauses function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getMedicalConditions, MedicalCondition} from '@/services/medical-conditions';

const ExplainableCausesInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
  selectedConditions: z
    .array(z.string())
    .describe('A list of names of medical conditions the user has selected.'),
});
export type ExplainableCausesInput = z.infer<typeof ExplainableCausesInputSchema>;

const ExplainableCausesOutputSchema = z.object({
  potentialCauses: z
    .string()
    .describe('A list of potential causes based on the symptoms and selected conditions.'),
});
export type ExplainableCausesOutput = z.infer<typeof ExplainableCausesOutputSchema>;

export async function explainableCauses(input: ExplainableCausesInput): Promise<ExplainableCausesOutput> {
  return explainableCausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainableCausesPrompt',
  input: {
    schema: z.object({
      symptoms: z
        .string()
        .describe('A description of the symptoms the user is experiencing.'),
      selectedConditions: z
        .string()
        .describe('A comma separated list of medical conditions the user has selected.'),
    }),
  },
  output: {
    schema: z.object({
      potentialCauses: z
        .string()
        .describe('A list of potential causes based on the symptoms and selected conditions.'),
    }),
  },
  prompt: `You are an AI assistant designed to provide potential causes for a user's symptoms, given their selected medical conditions.

  It is crucial to emphasize that this is NOT a diagnosis and the information provided should be used for discussion with a healthcare professional.

  Symptoms: {{{symptoms}}}
  Selected Conditions: {{{selectedConditions}}}

  Provide a list of potential causes, explaining each in a way that is understandable to a layperson.
`,
});

const explainableCausesFlow = ai.defineFlow<
  typeof ExplainableCausesInputSchema,
  typeof ExplainableCausesOutputSchema
>({
  name: 'explainableCausesFlow',
  inputSchema: ExplainableCausesInputSchema,
  outputSchema: ExplainableCausesOutputSchema,
}, async input => {
  const {symptoms, selectedConditions} = input;
  const selectedConditionsString = selectedConditions.join(', ');

  const {output} = await prompt({
    symptoms: symptoms,
    selectedConditions: selectedConditionsString,
  });
  return output!;
});
