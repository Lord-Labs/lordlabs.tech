import { ar } from '../public/ar.js';

export const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const decode = value => value.replace(/&(amp|lt|gt|quot|#39);/g, (_, entity) => ({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"}[entity]));
export const bilingual = (en, arabic) => `<bdi data-locale="en" lang="en" dir="ltr">${escape(en)}</bdi><bdi data-locale="ar" lang="ar" dir="rtl">${escape(arabic)}</bdi>`;

export function localizeMarkup(html) {
  // bdi children make repeated builds idempotent without parsing nested span tags.
  html = html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g, (whole, tag, attrs, key, content) => {
    if (!ar[key]) throw new Error(`Missing Arabic copy: ${key}`);
    const saved = attrs.match(/data-i18n-en="([^"]*)"/);
    const en = decode(saved ? saved[1] : content);
    if (!saved) attrs += ` data-i18n-en="${escape(en)}"`;
    if (tag === 'option') {
      attrs = attrs.replace(/ data-i18n-ar="[^"]*"/g, '');
      return `<${tag}${attrs} data-i18n-ar="${escape(ar[key])}">${escape(en)}</${tag}>`;
    }
    return `<${tag}${attrs}>${bilingual(en, ar[key])}</${tag}>`;
  });
  html = html.replace(/<input\b([^>]*\bdata-placeholder="([^"]+)"[^>]*)>/g, (_, attrs, key) => {
    const en = attrs.match(/\splaceholder="([^"]*)"/)?.[1] || '';
    attrs = attrs.replace(/ data-placeholder-(?:en|ar)="[^"]*"/g, '');
    return `<input${attrs} data-placeholder-en="${en}" data-placeholder-ar="${escape(ar[key])}">`;
  });
  return html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-copy-en="([^"]*)"[^>]*\bdata-copy-ar="([^"]*)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (_, tag, attrs, en, arabic) => `<${tag}${attrs}>${bilingual(decode(en), decode(arabic))}</${tag}>`);
}
