import {
    LitElement,
    html,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

import { Markmap } from 'https://cdn.jsdelivr.net/npm/markmap-view@0.17.0/+esm';
import {Transformer } from 'https://cdn.jsdelivr.net/npm/markmap-lib@0.17.0/+esm';


class MindMapElement extends LitElement {
  static properties = {
    markdown: { type: String },
    width: { type: String },
    height: { type: String},
  };

  constructor(){
    super();
    this.width = '800';
    this.height = '600';
    this.lastRenderedMarkdown = this.markdown;
  }

  firstUpdated() {
    this.renderMindMap();
    // This is added here to prevent the mindmap from being rendered twice
    this.lastRenderedMarkdown = this.markdown;
  }

  updated(changedProperties) {
    if (changedProperties.has('markdown') && this.markdown !== this.lastRenderedMarkdown) {
      this.renderMindMap();
      this.lastRenderedMarkdown = this.markdown;
    }
  }

  renderMindMap() {

    const svg = this.shadowRoot.querySelector('svg');
    const mm = Markmap.create(svg);

    // Use the Transformer
    const transformer = new Transformer();
    const { root, features } = transformer.transform(this.markdown);
    
    // Set the data and fit the mindmap
    mm.setData(root);
    mm.setOptions({ ...mm.options, ...features });
    mm.fit();
  }

  render() {
    return html`<svg width=${this.width} height=${this.height}></svg>`;
  }
}

customElements.define('markmap-component', MindMapElement);
