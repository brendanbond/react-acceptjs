/* eslint-disable no-console */
import fs from 'fs';

const args = process.argv.slice(2);
const componentName = args[0];

const directory = `${__dirname}/../src/components/${componentName}`;
fs.mkdirSync(directory);
const compBoilerPlate = `import React from 'react';\n\nimport { ${componentName}Container } from './styles';\n\nconst ${componentName} = () => {\nreturn <${componentName}Container />\n};\nexport default ${componentName}`;
const indexBoilerPlate = `import ${componentName} from './${componentName}';\n\nexport default ${componentName};`;
const stylesBoilerPlate = `import styled from 'styled-components';\n\nexport const ${componentName}Container = styled.div\`\`;`;

fs.writeFile(`${directory}/${componentName}.tsx`, compBoilerPlate, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully created component tsx file');
  }
});

fs.writeFile(`${directory}/styles.ts`, stylesBoilerPlate, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully created component styles file');
  }
});

fs.writeFile(`${directory}/index.ts`, indexBoilerPlate, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully created component index file');
  }
});
