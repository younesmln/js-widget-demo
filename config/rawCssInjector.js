const cssContentVarName = 'injected_styleContent_never_change_me';

function rawCssInjector({ widgetName }) {
  const jsOutputFilename = 'index.js';
  const cssOutputFilename = 'index.css';

  return {
    name: 'rawCssInjector',
    generateBundle(_opts, bundle) {
      const jsBundle = bundle[jsOutputFilename];
      const styleSource = bundle[cssOutputFilename].source.toString();

      // replace our magic variable with the raw css content 
      jsBundle.code = jsBundle.code.replace(
        cssContentVarName,
        JSON.stringify(styleSource)
      );

      delete bundle[cssOutputFilename];
    },
  };
}

export { rawCssInjector };
