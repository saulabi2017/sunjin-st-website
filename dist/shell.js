(() => {
  const page = document.body.dataset.page;
  const links = [['company','회사소개'],['products','취급제품'],['product-search','제품검색'],['resources','기술자료'],['careers','인재채용'],['contact','문의하기']];
  const brand = '<img class="brand-logo" src="/assets/sunjin-st-logo.png" width="1740" height="390" alt="선진에스티 SUNJIN ST 로고">';
  document.querySelector('#site-header').innerHTML = `<header class="site-header"><a class="brand" href="/" aria-label="선진에스티 홈">${brand}</a><button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav">메뉴</button><nav id="main-nav" aria-label="주요 메뉴">${links.map(([path,label])=>`<a href="/${path}/" ${page===path?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="header-cta" href="/contact/">제품 문의</a></header>`;
  document.querySelector('#site-footer').innerHTML = `<footer><a class="brand footer-brand" href="/">${brand}</a><address>서울특별시 구로구 경인로53길 15 A동 608호<br>구로동 · 중앙유통단지 업무동</address><div class="footer-links"><a href="/company/">회사소개</a><a href="/contact/">문의하기</a></div><p>© 2026 SUNJIN ST.</p></footer>`;
})();
