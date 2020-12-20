const getComponentTpl = ({
	componentName,
	namespace,
} = {}) => `import React from 'react';
import styles from './${componentName}.module.scss';

const ${componentName} = () => {
    return (
        <div className={styles.${namespace}}>
        </div>
    );
};

export default ${componentName};`;

const getStyleTpl = ({namespace} = {}) => `@import '~Styles/base';

$namespace: '${namespace}';

.#{$namespace} {
}`;

module.exports = {
	getComponentTpl,
	getStyleTpl,
};
