(function(){
  const path = window.location.pathname;
  const isEnglishPage = path.includes('/en/');
  const saved = localStorage.getItem('carole_language');
  const browser = navigator.language || 'fr-FR';
  let region = '';
  try { region = new Intl.Locale(browser).region || ''; } catch(e) {}
  const frenchRegions = ['FR','BE','CH','LU','MC','CA'];
  const frenchLocale = browser.toLowerCase().startsWith('fr') || frenchRegions.includes(region);
  const preferred = saved || (frenchLocale ? 'fr' : 'en');

  function toEnglish(){
    localStorage.setItem('carole_language','en');
    const p = window.location.pathname;
    if (p.includes('/en/')) return;
    const baseIndex = p.indexOf('/caroleescaliere-site/');
    const rel = baseIndex >= 0 ? p.substring(baseIndex + '/caroleescaliere-site/'.length) : p.replace(/^\//,'');
    const target = rel ? 'en/' + rel : 'en/';
    window.location.href = (baseIndex >= 0 ? '/caroleescaliere-site/' : '/') + target;
  }

  function toFrench(){
    localStorage.setItem('carole_language','fr');
    const p = window.location.pathname.replace('/en/','/');
    window.location.href = p;
  }

  if (!saved) {
    if (preferred === 'en' && !isEnglishPage) {
      const baseIndex = path.indexOf('/caroleescaliere-site/');
      const rel = baseIndex >= 0 ? path.substring(baseIndex + '/caroleescaliere-site/'.length) : path.replace(/^\//,'');
      const target = rel ? 'en/' + rel : 'en/';
      window.location.replace((baseIndex >= 0 ? '/caroleescaliere-site/' : '/') + target);
      return;
    }
    if (preferred === 'fr' && isEnglishPage) {
      window.location.replace(path.replace('/en/','/'));
      return;
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-lang="fr"]').forEach(el => el.addEventListener('click', function(e){e.preventDefault();toFrench();}));
    document.querySelectorAll('[data-lang="en"]').forEach(el => el.addEventListener('click', function(e){e.preventDefault();toEnglish();}));
  });
})();