import { readdirSync } from 'fs';
import { isDevMode, pluginsDef } from './config/index';
import path from 'path';

const widgetsPath = path.join(__dirname, 'src', 'widgets');

const getWidgetsList = () =>
  readdirSync(widgetsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// an Array representing the list of widgets based on the fs structure (src/widgets/widgetName)
const widgetsList = getWidgetsList();

const singleWidgetConfig = ({ widgetName }) => ({
  input: `./src/widgets/${widgetName}/index.ts`,
  output: {
    file: `${isDevMode ? 'dist-dev' : 'dist'}/${widgetName}/index.js`,
    format: 'iife',
    name: widgetName,
  },
  plugins: pluginsDef({ widgetName }),
});

const multiWidgetConfig = widgetsList.map((widgetName) =>
  singleWidgetConfig({ widgetName })
);

export default multiWidgetConfig;