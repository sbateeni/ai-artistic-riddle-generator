

import React from 'react';

export interface Concept {
  id: number;
  title: string;
  description: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve the 'Cannot find namespace JSX' error.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface ArtisticRiddle {
  riddleNumber: number;
  title: string;
  description: string; // The rich, visual description of the artwork/riddle
  solution: string; // The solution to the hidden riddle in the description
}

export type StoredData = Record<string, ArtisticRiddle[]>;