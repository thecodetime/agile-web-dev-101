const Fs = require('fs');
const Handlebars = require('handlebars');

const handlerBarsExtension = '.hbs';
const templatesDir = './templates';
const partialsDir = templatesDir + '/partials';
const distDir = './dist';

function registerPartialFiles() {
  const partialFiles = Fs.readdirSync(partialsDir);

  partialFiles.forEach((file) => {
    const fileName = file.split(handlerBarsExtension)[0];
    const content = Fs.readFileSync(partialsDir + '/' + file, 'utf8');
    Handlebars.registerPartial(fileName, content);
  });
  console.log('[OK] Partials registered');
}

function generateTemplates() {
  let files = Fs.readdirSync(templatesDir);
  files = filterDirectoryAndJunk(files);
  files.forEach((file) => {
    const fileName = file.split(handlerBarsExtension)[0];
    const content = Fs.readFileSync(templatesDir + '/' + file,
                                    { encoding: 'utf8' });
    const template = Handlebars.compile(content);
    const result = template();
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

registerPartialFiles();
generateTemplates();
