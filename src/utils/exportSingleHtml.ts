export function downloadStandaloneHtml() {
  const docClone = document.documentElement.cloneNode(true) as HTMLElement;

  // Convert live canvases into embedded data URLs so the standalone HTML file preserves all cropped IG photos
  const liveCanvases = Array.from(document.querySelectorAll('canvas'));
  const clonedCanvases = Array.from(docClone.querySelectorAll('canvas'));

  liveCanvases.forEach((liveCanvas, idx) => {
    const targetClone = clonedCanvases[idx];
    if (!targetClone) return;
    try {
      const dataUrl = liveCanvas.toDataURL('image/jpeg', 0.9);
      const img = document.createElement('img');
      img.src = dataUrl;
      img.alt = liveCanvas.getAttribute('aria-label') || 'Restaurante y Parrillada Los Hermanos';
      img.className = targetClone.className.replace('opacity-0', 'opacity-100');
      targetClone.parentNode?.replaceChild(img, targetClone);
    } catch {
      // Keep fallback if canvas is tainted
    }
  });

  // Remove Vite module script tags from the exported standalone HTML
  docClone.querySelectorAll('script[type="module"]').forEach((s) => s.remove());

  // Collect all active CSS rules from stylesheets
  let compiledCss = '';
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.href && sheet.href.includes('fonts.googleapis.com')) return;
      const rules = Array.from(sheet.cssRules || []);
      compiledCss += rules.map((r) => r.cssText).join('\n') + '\n';
    } catch {
      // Ignore cross-origin sheets
    }
  });

  const styleTag = document.createElement('style');
  styleTag.textContent = compiledCss;
  docClone.querySelector('head')?.appendChild(styleTag);

  // Add lightweight vanilla JS for the WhatsApp reservation form and category filter in standalone HTML
  const vanillaScript = document.createElement('script');
  vanillaScript.textContent = `
    document.addEventListener('DOMContentLoaded', function() {
      var form = document.getElementById('wa-simulator-form');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          var nombre = (document.getElementById('wa-nombre') || {}).value || 'Cliente';
          var comensales = (document.getElementById('wa-comensales') || {}).value || '2 personas';
          var motivo = (document.getElementById('wa-motivo') || {}).value || 'Reservar mesa en salon';
          var dia = (document.getElementById('wa-dia') || {}).value || 'Hoy';
          var turno = (document.getElementById('wa-turno') || {}).value || 'Cena (19:30 - 00:00 hs)';
          var plato = (document.getElementById('wa-plato') || {}).value || '';
          var texto = 'Hola amigos de Los Hermanos! Mi nombre es ' + nombre + '.\\n' +
            '- Motivo: ' + motivo + '\\n' +
            '- Comensales: ' + comensales + '\\n' +
            '- Dia y Turno: ' + dia + ' - ' + turno +
            (plato ? '\\n- Consulta de carta: ' + plato : '') +
            '\\nMuchas gracias!';
          window.open('https://wa.me/59894764118?text=' + encodeURIComponent(texto), '_blank');
        });
      }
    });
  `;
  docClone.querySelector('body')?.appendChild(vanillaScript);

  const htmlString = '<!doctype html>\n' + docClone.outerHTML;
  const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'los-hermanos-san-gregorio.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
