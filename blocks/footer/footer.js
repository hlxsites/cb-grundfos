import { readBlockConfig, decorateMain, loadBlocks } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  decorateMain(footer);
  await loadBlocks(footer);

  const mailto = footer.querySelector('a[href*="mailto"]');
  if (mailto) {
    mailto.classList.remove('button');
  }
  // await decorateIcons(footer);
  block.append(footer);
}
