(function(){
  const path = window.location.pathname;
  const projectPrefix = '/caroleescaliere-site/';
  const usesProjectPrefix = path.includes(projectPrefix);
  const base = usesProjectPrefix ? projectPrefix : '/';
  let rel = usesProjectPrefix ? path.substring(path.indexOf(projectPrefix) + projectPrefix.length) : path.replace(/^\//,'');
  if (!rel) rel = 'index.html';

  const frToEn = {
    'index.html':'en/index.html',
    'blog.html':'en/blog.html',
    'projets.html':'en/projects.html',
    'a-propos.html':'en/about.html',
    'contact.html':'en/contact.html',
    'catherine.html':'en/catherine.html',
    'articles/ia-assistantes-direction.html':'en/articles/ai-executive-assistants.html',
    'articles/automatiser-sans-deshumaniser.html':'en/articles/automate-without-dehumanising.html'
  };
  const enToFr = Object.fromEntries(Object.entries(frToEn).map(([fr,en]) => [en,fr]));
  const isEnglishPage = rel.startsWith('en/');
  const saved = localStorage.getItem('carole_language');
  const browser = navigator.language || 'fr-FR';
  let region = '';
  try { region = new Intl.Locale(browser).region || ''; } catch(e) {}
  const frenchRegions = ['FR','BE','CH','LU','MC','CA'];
  const frenchLocale = browser.toLowerCase().startsWith('fr') || frenchRegions.includes(region);
  const preferred = saved || (frenchLocale ? 'fr' : 'en');

  function englishTarget(){ return base + (frToEn[rel] || 'en/index.html'); }
  function frenchTarget(){ return base + (enToFr[rel] || 'index.html'); }

  function toEnglish(){
    localStorage.setItem('carole_language','en');
    if (!isEnglishPage) window.location.href = englishTarget();
  }
  function toFrench(){
    localStorage.setItem('carole_language','fr');
    if (isEnglishPage) window.location.href = frenchTarget();
  }

  if (!saved) {
    if (preferred === 'en' && !isEnglishPage) { window.location.replace(englishTarget()); return; }
    if (preferred === 'fr' && isEnglishPage) { window.location.replace(frenchTarget()); return; }
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-lang="fr"]').forEach(el => el.addEventListener('click', function(e){e.preventDefault();toFrench();}));
    document.querySelectorAll('[data-lang="en"]').forEach(el => el.addEventListener('click', function(e){e.preventDefault();toEnglish();}));
  });
})();