/**
 * Represents a medical condition.
 */
export interface MedicalCondition {
  /**
   * The name of the medical condition.
   */
  name: string;
  /**
   * A description of the medical condition.
   */
  description: string;
}

/**
 * Asynchronously retrieves a list of known medical conditions.
 *
 * @returns A promise that resolves to an array of MedicalCondition objects.
 */
export async function getMedicalConditions(): Promise<MedicalCondition[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Diabetes',
      description: 'A metabolic disorder characterized by high blood sugar levels.',
    },
    {
      name: 'PCOS',
      description: 'A hormonal disorder common among women of reproductive age.',
    },
    {
      name: 'Asthma',
      description: 'A chronic respiratory disease that inflames and narrows the airways.',
    },
    {
      name: 'Hypertension',
      description: 'A condition in which the force of the blood against the artery walls is too high.',
    },
    {
      name: 'Hypothyroidism',
      description: 'A condition in which the thyroid gland doesn\'t produce enough thyroid hormone.',
    },
    {
      name: 'Anxiety',
      description: 'A mental health disorder characterized by excessive worry and unease.',
    },
    {
      name: 'Depression',
      description: 'A mood disorder that causes a persistent feeling of sadness and loss of interest.',
    },
    {
      name: 'Tuberculosis',
      description: 'An infectious disease caused by bacteria that mainly affects the lungs.',
    },
    {
      name: 'Malaria',
      description: 'A mosquito-borne infectious disease affecting humans and other animals.',
    },
    {
      name: 'Typhoid Fever',
      description: 'A bacterial infection caused by Salmonella typhi, spread through contaminated food and water.',
    },
    {
      name: 'Dengue Fever',
      description: 'A mosquito-borne viral infection causing fever, rash, and muscle and joint pain.',
    },
    {
      name: 'Chronic Kidney Disease',
      description: 'A condition characterized by a gradual loss of kidney function over time.',
    },
    {
      name: 'Coronary Artery Disease',
      description: 'A condition in which the heart muscle doesn\'t receive enough blood.',
    },
    {
      name: 'Osteoarthritis',
      description: 'A degenerative joint disease that causes pain and stiffness.',
    },
    {
      name: 'Vitamin D Deficiency',
      description: 'A condition in which the body doesn\'t have enough vitamin D.',
    },
    {
      name: 'Anemia',
      description: 'A condition in which the blood doesn\'t have enough healthy red blood cells.',
    },
  ];
}


