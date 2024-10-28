// src/react-csv.d.ts
declare module 'react-csv' {
  import * as React from 'react';

  export interface CSVLinkProps {
    data: any;
    headers?: { label: string; key: string }[];
    filename?: string;
    className?: string;
    target?: string;
    children?: React.ReactNode;
  }

  export class CSVLink extends React.Component<CSVLinkProps> {}

  export const CSVDownload: React.ComponentType<any>;
}