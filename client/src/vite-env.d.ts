/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

declare module '*.svg?react' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

  export default ReactComponent;
}
