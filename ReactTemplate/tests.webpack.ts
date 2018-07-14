import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


// require all `/test/**/.spec.ts(x)`
const testsContext = require.context('./test/', true, /^\.\/.*\.(ts|tsx)$/);
testsContext.keys().forEach(testsContext);

// require all `/src/components/**/index.js`
const componentsContext = require.context('./src/', true, /\.(ts|tsx)$/);
componentsContext.keys().forEach(componentsContext);