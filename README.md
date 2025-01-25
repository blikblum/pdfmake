# pdfmake-lite

A fork of pdfmake that is a lighter version of the original library. It uses forked versions of the `fontkit` and `pdfkit` and `line-break` libraries that are smaller in size.

It also implements "pageMetadata" feature. See [example](./examples/pageMetadata.js).


### Features

* line-wrapping,
* text-alignments (left, right, centered, justified),
* numbered and bulleted lists,
* tables and columns
  * auto/fixed/star-sized widths,
  * col-spans and row-spans,
  * headers automatically repeated in case of a page-break,
* images and vector graphics,
* convenient styling and style inheritance,
* page headers and footers:
  * static or dynamic content,
  * access to current page number and page count,
* background-layer,
* page dimensions and orientations,
* margins,
* custom page breaks,
* font embedding,
* support for complex, multi-level (nested) structures,
* table of contents,
* helper methods for opening/printing/downloading the generated PDF,
* setting of PDF metadata (e.g. author, subject).

## Documentation

Documentation URL: https://pdfmake.github.io/docs/

## Building from sources version 0.1.x

using npm:
```
git clone --branch 0.1 https://github.com/blikblum/pdfmake.git
cd pdfmake
npm install
npm run build
```

using yarn:
```
git clone --branch 0.1 https://github.com/blikblum/pdfmake.git
cd pdfmake
yarn
yarn run build
```

## License
MIT

## Authors
* [@bpampuch](https://github.com/bpampuch) (founder)
* [@liborm85](https://github.com/liborm85)

pdfmake is based on a truly amazing library [pdfkit](https://github.com/devongovett/pdfkit) (credits to [@devongovett](https://github.com/devongovett)).

Thanks to all contributors.
