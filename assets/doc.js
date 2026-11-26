/* public copies of the in-app legal texts (privacy, terms) and the support page. one source: app/legal.js */
(function(){
  const q = new URLSearchParams(location.search), tr = q.get('lang') === 'tr' || (!q.get('lang') && /^tr/i.test(navigator.language) && false);
  const doc = document.body.dataset.doc, el = document.getElementById('doc'), esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
  document.documentElement.lang = tr ? 'tr' : 'en';
  document.querySelectorAll('.lang a').forEach(a => a.classList.toggle('on', (a.dataset.l === 'tr') === tr));
  const link = (href, en, t) => `<a href="${href}${tr ? '?lang=tr' : ''}">${tr ? t : en}</a>`;
  document.getElementById('foot').innerHTML = link('/', 'Pintertag', 'Pintertag') + link('/privacy/', 'Privacy', 'Gizlilik') + link('/terms/', 'Terms', 'Koşullar') + link('/support/', 'Support', 'Destek');
  if (doc === 'support'){
    const S = tr ? {
      h: 'Destek', p: 'Bir sorun, öneri ya da veri talebin varsa yaz. Genelde 2 iş günü içinde yanıtlarız.',
      q: [['Bize ulaş', 'support@pintertag.com'], ['Hesap gerekiyor mu?', 'Hayır. Şu anki sürümde hesap ve giriş yok; her özellik hemen çalışır.'],
        ['Verilerimi nasıl silerim?', 'Uygulamada Ayarlar > Verilerin > “Bu cihazdaki tüm verileri sil”. Aynı ekrandan önce “Verilerimi indir” ile yedek alabilirsin.'],
        ['Fotoğraflarım nerede saklanıyor?', 'Sadece telefonunda. Fotoğrafların ve planların bize gönderilmez.'],
        ['Instagram hesabıma bağlanıyor mu?', 'Hayır. Pintertag Instagram şifreni istemez ve senin adına paylaşım yapmaz. Paylaşımı telefonunun paylaşım menüsüyle sen yaparsın.'],
        ['Ücretli mi?', 'Şu an tüm özellikler ücretsiz.']] } : {
      h: 'Support', p: 'Questions, ideas or a data request? Write to us. We usually reply within 2 business days.',
      q: [['Contact', 'support@pintertag.com'], ['Do I need an account?', 'No. The current version has no account or sign-in; every feature works right away.'],
        ['How do I delete my data?', 'In the app: Settings > Your data > “Delete all data on this device”. You can save a copy first with “Download my data” on the same screen.'],
        ['Where are my photos stored?', 'Only on your phone. Your photos and plans are never sent to us.'],
        ['Does it connect to my Instagram account?', 'No. Pintertag never asks for your Instagram password and never posts for you. You share through your phone’s share menu.'],
        ['Is it free?', 'Every feature is free right now.']] };
    document.title = (tr ? 'Destek' : 'Support') + ' — Pintertag';
    el.innerHTML = `<h1>${S.h}</h1><p class="upd">${S.p}</p>` + S.q.map(([h, t]) => `<h2>${esc(h)}</h2><p>${/@/.test(t) && !/ /.test(t) ? `<a href="mailto:${t}">${t}</a>` : esc(t)}</p>`).join('');
    return; }
  const L = window.PTLegal && PTLegal[doc]; if (!L){ el.textContent = 'Not found.'; return; }
  const title = tr ? L.tr : L.en, secs = tr ? L.sections : (L.enSections || L.sections);
  document.title = title + ' — Pintertag';
  el.innerHTML = `<h1>${esc(title)}</h1><p class="upd">${tr ? 'Son güncelleme' : 'Updated'}: ${esc(PTLegal.updated)}</p>` + secs.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t)}</p>`).join('');
})();
