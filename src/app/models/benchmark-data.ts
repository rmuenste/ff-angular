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
  innerHTML: string;
}

export interface DefinitionData {
  // Define properties specific to the definition section
  innerHTML: string;
}

export interface ResultsData {
  // Define properties specific to the results section
  innerHTML: string;
}

export interface ReferenceData {
  // Define properties specific to the reference data section
  innerHTML: string;
}

// Example data for IntroductionData
const introductionData1: IntroductionData = {
  innerHTML: '<p>This is the introduction for benchmark 1.</p>'
};

const introductionData2: IntroductionData = {
  innerHTML: '<p>This is the introduction for benchmark 2.</p>'
};

const introductionData3: IntroductionData = {
  innerHTML: '<p>This is the introduction for benchmark 3.</p>'
};

// Example data for DefinitionData
const definitionData1: DefinitionData = {
  innerHTML: '<p>This is the definition for benchmark 1.</p>'
};

const definitionData2: DefinitionData = {
  innerHTML: '<p>This is the definition for benchmark 2.</p>'
};

const definitionData3: DefinitionData = {
  innerHTML: '<p>This is the definition for benchmark 3.</p>'
};

// Example data for ResultsData
const resultsData1: ResultsData = {
  innerHTML: '<p>These are the results for benchmark 1.</p>'
};

const resultsData2: ResultsData = {
  innerHTML: '<p>These are the results for benchmark 2.</p>'
};

const resultsData3: ResultsData = {
  innerHTML: '<p>These are the results for benchmark 3.</p>'
};

// Example data for ReferenceData
const referenceData1: ReferenceData = {
  innerHTML: '<p>Here is some reference data for benchmark 1.</p>'
};

const referenceData2: ReferenceData = {
  innerHTML: '<p>Here is some reference data for benchmark 2.</p>'
};

const referenceData3: ReferenceData = {
  innerHTML: '<p>Here is some reference data for benchmark 3.</p>'
};

// Array of example BenchmarkData instances
export const exampleBenchmarkData: BenchmarkData[] = [
  {
    id: 1,
    name: 'Benchmark 1',
    introduction: introductionData1,
    definition: definitionData1,
    results: resultsData1,
    referenceData: referenceData1
  },
  {
    id: 2,
    name: 'Benchmark 2',
    introduction: introductionData2,
    definition: definitionData2,
    results: resultsData2,
    referenceData: referenceData2
  },
  {
    id: 3,
    name: 'Benchmark 3',
    introduction: introductionData3,
    definition: definitionData3,
    results: resultsData3,
    referenceData: referenceData3
  }
];
