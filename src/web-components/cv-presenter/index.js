import {
  generateMedia,
  generatePreview
} from './utils.js';

const CSS_PATH = '"src/web-components/cv-presenter/cv-presenter.css"';

customElements.define('cv-presenter', class extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({
      mode: 'closed'
    });

    const detailsNode = document.createElement('details');
    const styleNode = document.createElement('style');
    
    styleNode.textContent = `@import ${CSS_PATH}`;
    
    if (this.hasAttribute('summary')) {
      const summaryNode = document.createElement('summary');
      summaryNode.textContent = this.getAttribute('summary');
      detailsNode.append(summaryNode);
    }

    if (this.hasAttribute('media')) {
      generateMedia(this, detailsNode);
    }

    Array.from(this.children).forEach(it => detailsNode.append(it));

    if (this.hasAttribute('preview')) {
      generatePreview(this, detailsNode);
    }

    shadow.append(styleNode, detailsNode)
  }
})