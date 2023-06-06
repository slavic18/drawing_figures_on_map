import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import './assets/styles/main.scss';
import {
  deleteFigure,
  getAllFigures,
  storeFigure
} from './services/api';
const rootNode = document.getElementById('root');
if (rootNode) {
  // make the application testable by passing the functions for manipulating the data.
  createRoot(rootNode)
    .render(<App
      deleteFigure={deleteFigure}
      getAllFigures={getAllFigures}
      storeFigure={storeFigure}
    />);
}
