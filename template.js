const Fs = require('fs');
const Handlebars = require('handlebars');

const handlerBarsExtension = '.hbs';
const templatesDir = './templates';
const partialsDir = templatesDir + '/partials';
const distDir = './dist';
const defaultLayoutFile = templatesDir + '/layout/default.hbs';
const templateDataDir = templatesDir + '/data';

function registerPartialFiles() {
  const partialFiles = Fs.readdirSync(partialsDir);

  partialFiles.forEach((file) => {
    const fileName = getFileName(file, handlerBarsExtension);
    registerPartial(fileName, partialsDir + '/' + file)
  });
  console.log('[OK] Partials registered');
}

function generateTemplates() {
  let files = Fs.readdirSync(templatesDir);
  files = filterDirectoryAndJunk(files);
  files.forEach((file) => {
    const fileName = getFileName(file, handlerBarsExtension);
    registerPartial('content', templatesDir + '/' + file)

    const layoutContent = layoutTemplateContent();
    const template = Handlebars.compile(layoutContent);
    const data = contentData(file);
    const result = (!data) ? template() : template(JSON.parse(data));
    Fs.writeFileSync(distDir + '/' + fileName + '.html',
                     result,
                     { encoding: 'utf8' });
  });
  console.log('[OK] Templates generated');
}

function filterDirectoryAndJunk(files) {
  return files.filter((file) => {
    const notDirectory = !Fs.statSync(templatesDir + '/' + file).isDirectory();
    const notJunk = (file[0] != '.');
    return notDirectory && notJunk;
  });
}

function getFileName(file, extension) {
  return file.split(extension)[0];
}

function registerPartial(name, filePath) {
  const content = Fs.readFileSync(filePath, 'utf8');
  Handlebars.registerPartial(name, content);
}

function layoutTemplateContent() {
  return Fs.readFileSync(defaultLayoutFile, { encoding: 'utf8' });
}

function contentData(file) {
  const fileName = getFileName(file, handlerBarsExtension);
  const fileExists = Fs.existsSync(templateDataDir + '/' + fileName + '.json');
  if (fileExists) {
    return Fs.readFileSync(templateDataDir + '/' + fileName + '.json', 'utf8');
  }
  return undefined;
}

registerPartialFiles();
generateTemplates();
