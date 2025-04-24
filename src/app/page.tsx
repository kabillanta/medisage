'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {getMedicalConditions, MedicalCondition} from '@/services/medical-conditions';
import {Checkbox} from '@/components/ui/checkbox';
import {explainableCauses} from '@/ai/flows/explainable-causes';
import {useToast} from "@/hooks/use-toast"
import {Toaster} from "@/components/ui/toaster"

export default function Home() {
  const [symptoms, setSymptoms] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [medicalConditions, setMedicalConditions] = useState<MedicalCondition[]>([]);
  const [suggestedCauses, setSuggestedCauses] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()


  React.useEffect(() => {
    const fetchConditions = async () => {
      const conditions = await getMedicalConditions();
      setMedicalConditions(conditions);
    };

    fetchConditions();
  }, []);

  const handleConditionChange = (conditionName: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionName) ? prev.filter((name) => name !== conditionName) : [...prev, conditionName]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await explainableCauses({
        symptoms: symptoms,
        selectedConditions: selectedConditions,
      });
      setSuggestedCauses(result.potentialCauses);
      toast({
        title: "Causes Generated",
        description: "Explainable causes have been generated, and shown below.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
      console.error('Error generating causes:', error);
      setSuggestedCauses('An error occurred while generating suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-12 bg-background gap-4">
      <Toaster />
      <h1 className="text-4xl font-bold text-foreground mb-4">MediSage</h1>
      <div className="max-w-3xl w-full flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Symptom Input</CardTitle>
            <CardDescription>Enter your symptoms below:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="e.g., persistent cough, fatigue, fever"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Known Conditions</CardTitle>
            <CardDescription>Select any known medical conditions:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {medicalConditions.map((condition) => (
                <div key={condition.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition.name}
                    checked={selectedConditions.includes(condition.name)}
                    onCheckedChange={() => handleConditionChange(condition.name)}
                  />
                  <Label htmlFor={condition.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {condition.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSubmit} disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {loading ? 'Fetching Suggestions...' : 'Explain Cause Suggestions'}
        </Button>

        {suggestedCauses && (
          <Card>
            <CardHeader>
              <CardTitle>Explainable Cause Suggestions</CardTitle>
              <CardDescription>
                Here are some potential causes based on your symptoms and conditions.
                <br />
                <span className="font-semibold">
                  Please remember, this is NOT a diagnosis and the information provided should be used for discussion with a healthcare professional.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{suggestedCauses}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
