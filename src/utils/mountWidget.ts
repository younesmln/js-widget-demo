import * as React from 'react';
import reactDOM, { render } from 'react-dom';
import { mountStyle } from './mountStyle';

const widgetName = process.env.WIDGET_NAME;

type ComponentType = Parameters<typeof React.createElement>[0];

export function mountWidgetWithCssContent(cssContent: string) {
  return (renderTarget: HTMLElement, Widget: ComponentType, _options = {}) => {
    mountStyle(cssContent);
    reactDOM.render(React.createElement(Widget), renderTarget);
  };
}


const targetHostSelector = `[data-widget-${widgetName}]`;
console.log(`mouting ${widgetName} under the node with data attribute ${targetHostSelector}`)

export function startWidget(Widget: ComponentType, cssContent: string) {
  const renderTarget = document.querySelector(targetHostSelector);
  const mountWidget = mountWidgetWithCssContent(cssContent);

  // for now we can't rely on rendering directly to a dom node 
  // unless each widget specifies a different attribute to 
  // select the dom element based on otherwise widgets will race
  // and override themselves
  if (renderTarget && renderTarget instanceof HTMLElement) {
    mountWidget(renderTarget, Widget);
  } else {
    console.warn(
      "myWidget can't be initialized due to a missing DOM node with `data-widget-target` attribute on it"
    );
    return (domRenderTarget: HTMLElement) => mountWidget(domRenderTarget, Widget);
  }
}
