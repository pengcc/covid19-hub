const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);

const {getComponentTpl, getStyleTpl} = require('./config/template');

function strCapitalize(s) {
	if (typeof s !== 'string') return '';
	return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
}

function lowerFirstLetter(s) {
	if (typeof s !== 'string') return '';
	return `${s.charAt(0).toLowerCase()}${s.slice(1)}`;
}

const shouldInitializeFile = (file) =>
	!(fs.existsSync(file) && fs.statSync(file).size > 0);

let [, , componentName, type] = process.argv;

if (!type) {
	const {INIT_CWD} = process.env;
	type = INIT_CWD.split(path.sep).pop().toLowerCase().slice(0, -1);
	console.log(
		chalk.keyword('orange')(
			`[WARN]: No given type found extracting "${type}" from the current direct parent directory instead.`
		)
	);
}

const isValidComponentName = (name) =>
	name.length > 0 && /[A-Z]/.test(name.charAt(0));
const isValidType = (type) => ['element', 'page'].includes(type);

if (!isValidComponentName(componentName)) {
	console.log(
		chalk.red('[ERROR]: Component name must be given and be capitalized!')
	);
	return;
}

if (!isValidType(type)) {
	console.log(
		chalk.red('[ERROR]: Component type must be one of (element, page)!')
	);
	return;
}

const componentNames = componentName.split(' ');

const getAbsoluteFilePath = (extension) => (filePath) =>
	path.resolve(__dirname, '..', `${filePath}.${extension}`);
const getScssFile = getAbsoluteFilePath('module.scss');
const getJsxFile = getAbsoluteFilePath('jsx');

const promptInfo = (file) =>
	void console.log(
		`${chalk.green(
			`[INFO]: ${chalk.hex('#c5d1b5')(file)} has been initialized!`
		)}`
	);
const promptWarning = (file) =>
	void console.log(
		`${chalk.keyword('orange')('[WARN]: ')}${file} exists! ${chalk.yellow(
			'Skip this file!'
		)}`
	);
const initComponentAsync = async ({componentName, type} = {}) => {
	const relativePath = `src/components/${strCapitalize(
		type
	)}s/${componentName}`;
	const scssFile = getScssFile(relativePath);
	const jsxFile = getJsxFile(relativePath);
	const namespace = `${lowerFirstLetter(componentName)}`;

	try {
		if (shouldInitializeFile(jsxFile)) {
			await writeFileAsync(
				jsxFile,
				getComponentTpl({componentName, namespace})
			);
			promptInfo(jsxFile);
		} else {
			promptWarning(jsxFile);
		}

		if (shouldInitializeFile(scssFile)) {
			await writeFileAsync(scssFile, getStyleTpl({namespace}));
			promptInfo(scssFile);
		} else {
			promptWarning(scssFile);
		}
	} catch (err) {
		console.error(err);
	}
};

for (const name of componentNames) {
	initComponentAsync({componentName: name, type});
}
