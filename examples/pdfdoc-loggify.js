var fs = require('fs');


const methods = [
  "fillColor", "strokeColor", "opacity", "fillOpacity", "strokeOpacity", "linearGradient", "radialGradient",
  "save", "restore", "closePath", "lineWidth", "lineCap", "lineJoin", "miterLimit", "dash", "undash",
  "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "rect", "roundedRect", "ellipse", "circle", "arc", "polygon",
  "path", "fill", "stroke", "fillAndStroke", "clip", "translate", "rotate", "scale", "font",
  "fontSize", "currentLineHeight", "lineGap", "moveDown", "moveUp", "text", "list", "image", "openImage", "annotate",
  "note", "link", "highlight", "underline", "strike", "lineAnnotation", "rectAnnotation", "ellipseAnnotation",
  "textAnnotation", "addPage", "setEncoding"];

const handler = {
  apply: function(target, thisArg, argumentsList) {
    var commands = thisArg.__pkCommands || (thisArg.__pkCommands = []);

    commands.push({name: target.name || target.__name, args: argumentsList});

    return target.apply(thisArg, argumentsList);
  }
};

function valueToStr(value) {
  if (value === undefined) {
    return 'undefined'
  } else if (value === null) {
    return 'null'
  } else if (typeof value === 'string'){
    return `'${value}'`
  } else if (Array.isArray(value)) {
    return `[${getArgList(value)}]`
  } else if (typeof value === 'object') {
    var objectStr = '{'
    Object.keys(value).forEach((key, index, arr) => {
      objectStr += `${key}: ${valueToStr(value[key])}${index === arr.length - 1 ? '': ', '}`
    })
    return objectStr += '}'
  } else {
    return value
  }
}

function getArgList (args) {
  return args.map(valueToStr).join(',')
}

function loggify(doc) {
  methods.forEach(method => {
    var fn = doc[method]
    fn.name || (fn.__name = method)
    doc[method] = new Proxy(fn, handler);
  })

  doc.saveCommands = function (fileName, {images} = {images: {}}) {

    var commands = this.__pkCommands
    var lines = []


    commands.forEach(command => {
      var line
      if (command.name === 'image') {
        line = `doc.${command.name}(images[${valueToStr(command.args[0])}], ${getArgList(command.args.slice(1))});`
      } else {
        line = `doc.${command.name}(${getArgList(command.args)});`
      }      
      lines.push(line)
    })

    fs.writeFile(

      `${fileName}-commands.json`,

      JSON.stringify(commands, null, 2),

      function (err) {
        if (err) {
          console.error('Failed to save commands.json');
        }
      }
    );

    fs.writeFile(

      `${fileName}-commands.js`,

      `const images = ${valueToStr(images)}

${lines.join('\n')}
      `,

      function (err) {
        if (err) {
          console.error('Failed to save commands.js');
        }
      }
    );
  }
}

module.exports = loggify