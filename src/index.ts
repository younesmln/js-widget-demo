import * as React from "react";
import reactDOM, { render } from "react-dom";
import { mountStyle } from "./utils/mountStyle";
import { Widget } from "./Widget";

export function mountWidget(renderTarget: HTMLElement, _options = {}) {
    mountStyle();
    reactDOM.render(React.createElement(Widget), renderTarget)

}

function widgetStart() {
    const renderTarget = document.querySelector("[data-widget-target]");
    if (renderTarget && renderTarget instanceof HTMLElement) {
        mountWidget(renderTarget)
    } else {
        console.warn("myWidget can't be initialized due to a missing DOM node with `data-widget-target` attribute on it")
    }
}


widgetStart();
