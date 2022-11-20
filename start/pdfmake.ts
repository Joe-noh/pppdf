import pdfmake from 'pdfmake'

function fontPath(name) {
  return `/usr/local/share/fonts/${name}`
}

pdfmake.addFonts({
  Roboto: {
    normal: fontPath('Roboto-Regular.ttf'),
    bold: fontPath('Roboto-Bold.ttf'),
    italics: fontPath('Roboto-Italic.ttf'),
    bolditalics: fontPath('Roboto-BoldItalic.ttf'),
  },
  NotoSerifJP: {
    normal: fontPath('NotoSerifJP-Regular.otf'),
    bold: fontPath('NotoSerifJP-Bold.otf'),
    italics: fontPath('NotoSerifJP-Regular.otf'),
    bolditalics: fontPath('NotoSerifJP-Bold.otf'),
  },
})
