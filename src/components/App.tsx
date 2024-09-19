import {MainPage} from './Pages/MainPage.tsx';
import React from 'react';

interface AppProps {
  placeCount: number;
}

export function App({placeCount}: AppProps): React.JSX.Element {
  return (
    <MainPage placeCount={placeCount}/>
  );
}
