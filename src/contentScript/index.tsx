import React from 'react';
import { createRoot } from 'react-dom/client';
import ContentScript from './contentScript';

function init() {
  const domElement = document.getElementById(
    'gws-output-pages-elements-homepage_additional_languages__als'
  );
  const domParentElement = domElement.parentNode;
  const appContainer = document.createElement('div');
  domParentElement.appendChild(appContainer);

  if (!domElement) throw new Error('Can not find Dom Element');

  const root = createRoot(appContainer);
  root.render(<ContentScript />);
}

init();
