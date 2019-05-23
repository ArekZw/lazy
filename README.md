[![Version](https://img.shields.io/github/release/style-tools/lazy.svg)](https://github.com/style-tools/lazy/releases) [![npm version](https://badge.fury.io/js/%40style.tools%2Flazy.svg)](http://badge.fury.io/js/%40style.tools%2Flazy) [![Latest Stable Version](https://poser.pugx.org/styletools/async/v/stable.png)](https://packagist.org/packages/styletools/lazy)

# Lazy Image and Iframe Loader

A lightweight lazy loader based on `window.IntersectionObserver` with tiny fallback for old browsers.

```javascript
$lazy(
   selector, /* null, string or config: { selector = '[data-src]', threshold=0.006, rootMargin = '0px'} */
   callback /* optional: custom in-view callback for manual lazy loading */
);	
```

#### Documentation is available on [docs.style.tools/](https://docs.style.tools/lazy).

### Install via npm

```bash
npm install @style.tools/lazy --save
```

### Install via PHP Composer

```bash
composer require styletools/lazy
```
