// postcss.config.js
module.exports = {
  plugins: {
    'postcss-prefix-selector': {
      prefix: '#efe-portfolio',
      transform: (prefix, selector, prefixedSelector) => {
        // Skip prefixing for global or special selectors
        if (
          selector.startsWith('html') ||
          selector.startsWith('body') ||
          selector.startsWith(':root') ||
          selector.includes('#dynamic-theme') ||
          selector.includes('::slotted') || // just in case you're styling slotted content
          filePath.includes('fonts')
        ) {
          return selector;
        }
        return prefixedSelector;
      },
    },
  },
};
