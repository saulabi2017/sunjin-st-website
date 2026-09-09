(() => {
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.product-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  }));
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('#main-nav');
  if (button && nav) {
    const close = () => { button.setAttribute('aria-expanded','false'); nav.classList.remove('open'); };
    button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded',String(open)); nav.classList.toggle('open',open); });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click',close));
    document.addEventListener('keydown', event => { if(event.key === 'Escape' && nav.classList.contains('open')) { close(); button.focus(); } });
    matchMedia('(min-width: 901px)').addEventListener('change', event => { if(event.matches) { if(nav.contains(document.activeElement)) document.activeElement.blur(); close(); } });
  }
  const output = document.querySelector('[data-requested-series]');
  const series = new URLSearchParams(location.search).get('series');
  if(output && series) { output.textContent = series.slice(0,100); output.closest('[hidden]').hidden = false; }
  const mapPanel = document.querySelector('.map-panel > div');
  if(mapPanel) {
    const address = '서울특별시 구로구 경인로53길 15 중앙유통단지 A동 608호';
    const encodedAddress = encodeURIComponent(address);
    mapPanel.className = 'map-card';
    mapPanel.innerHTML = `<div class="map-preview" aria-hidden="true"><span class="map-pin"></span><span class="map-road horizontal"></span><span class="map-road vertical"></span><span class="map-label">Guro<br>Distribution Complex</span></div><b>중앙유통단지 업무동</b><p id="company-address-text">서울특별시 구로구 경인로53길 15<br>중앙유통단지 A동 608호</p><div class="map-actions"><a class="button primary" href="https://map.naver.com/p/search/${encodedAddress}" rel="noreferrer" target="_blank">네이버지도</a><a class="button secondary" href="https://map.kakao.com/link/search/${encodedAddress}" rel="noreferrer" target="_blank">카카오맵</a><button class="button light" type="button" data-copy-address="${address}">주소 복사</button></div><small class="map-note">새 창에서 지도 검색 결과로 이동합니다.</small>`;
  }
  document.querySelectorAll('[data-copy-address]').forEach(copyButton => {
    copyButton.addEventListener('click', async () => {
      const address = copyButton.dataset.copyAddress || '';
      try {
        await navigator.clipboard.writeText(address);
        copyButton.textContent = '복사 완료';
      } catch {
        copyButton.textContent = address;
      }
      setTimeout(() => { copyButton.textContent = '주소 복사'; }, 1800);
    });
  });
  const productRoutes = {mlcc:'/products/mlcc/', connector:'/products/connectors/', crystal:'/products/crystal-devices/'};
  document.querySelectorAll('.product-card[data-category]').forEach(card => { const link = card.querySelector('.text-link'); if(link) link.href = productRoutes[card.dataset.category]; });
  const specimen = document.querySelector('.specimen-main'); if(specimen) specimen.href = productRoutes.connector;
  document.querySelectorAll('.result-item[data-type]').forEach(item => { const link = [...item.querySelectorAll('.result-actions a')].find(a => a.textContent.includes('제품군')); if(link) { link.href = productRoutes[item.dataset.type]; link.textContent = '제품 상세'; } });
  document.querySelectorAll('.category-nav a').forEach(link => { const key = link.textContent.includes('MLCC') ? 'mlcc' : link.textContent.includes('커넥터') ? 'connector' : link.textContent.includes('수정') ? 'crystal' : null; if(key) link.href = productRoutes[key]; });
  const stage = document.querySelector('[data-tilt]');
  if(stage && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.addEventListener('pointermove', event => { const r = stage.getBoundingClientRect(); const x = (event.clientX-r.left)/r.width-.5; const y = (event.clientY-r.top)/r.height-.5; stage.querySelector('.specimen-stage').style.transform = `rotateX(${y*-5}deg) rotateY(${x*7}deg)`; });
    stage.addEventListener('pointerleave', () => { stage.querySelector('.specimen-stage').style.transform = ''; });
  }
})();
