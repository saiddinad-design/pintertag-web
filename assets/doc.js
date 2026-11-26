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
      q: [['Bize ulaş', 'tagpinter@gmail.com'], ['Hesabımı nasıl silerim?', 'Uygulamada Ayarlar > hesap kartı (e-postan) > “Hesabımı sil”. Buluttaki planın ve fotoğrafların hemen, hesap kaydın kalıcı olarak silinir. Hesap açmadıysan verilerin sadece telefonunda durur; Ayarlar > Yedekleme > “Bu cihazdaki tüm verileri sil” ile temizlenir.'],
        ['Fotoğraflarım nerede saklanıyor?', 'Telefonunda. Ücretsiz hesap açarsan yedeğin AB’deki (İrlanda) sunucuda, yalnızca sana açık tutulur.'],
        ['Instagram hesabıma bağlanıyor mu?', 'Hayır. Pintertag Instagram şifreni istemez ve senin adına paylaşım yapmaz. Paylaşımı telefonunun paylaşım menüsüyle sen yaparsın.'],
        ['Ücretli mi?', 'Şu an tüm özellikler ücretsiz.']] } : {
      h: 'Support', p: 'Questions, ideas or a data request? Write to us. We usually reply within 2 business days.',
      q: [['Contact', 'tagpinter@gmail.com'], ['How do I delete my account?', 'In the app: Settings > account card (your email) > “Delete my account”. Your cloud plans and photos are deleted right away and your account record permanently. Without an account, your data lives only on your phone; Settings > Backup > “Delete all data on this device” clears it.'],
        ['Where are my photos stored?', 'On your phone. With a free account, your backup is kept on a server in the EU (Ireland) that only you can open.'],
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
