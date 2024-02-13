export interface BenchmarkData {
  id: number;
  name: string;
  introduction: IntroductionData;
  definition: DefinitionData;
  results: ResultsData;
  referenceData: ReferenceData;
}

export interface IntroductionData {
  // Define properties specific to the introduction section
}

export interface DefinitionData {
  // Define properties specific to the definition section
}

export interface ResultsData {
  // Define properties specific to the results section
}

export interface ReferenceData {
  // Define properties specific to the reference data section
}