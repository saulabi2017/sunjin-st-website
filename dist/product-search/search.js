(() => {
  const q = document.querySelector('#series-search');
  const category = document.querySelector('#category-select');
  const items = [...document.querySelectorAll('.result-item')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#no-results');
  const aliases = {mlcc:'적층 세라믹 커패시터 콘덴서',connector:'커넥터 연결',crystal:'수정 디바이스 진동자 발진기'};
  function readLocation() { const p = new URLSearchParams(location.search); q.value = p.get('q') || ''; const value = p.get('category'); category.value = ['mlcc','connector','crystal'].includes(value) ? value : 'all'; }
  function update(writeUrl = true) {
    const query = q.value.trim().toLowerCase();
    let total = 0;
    items.forEach(item => { const haystack = item.dataset.search + ' ' + aliases[item.dataset.type]; const visible = (!query || haystack.includes(query)) && (category.value === 'all' || item.dataset.type === category.value); item.hidden = !visible; if(visible) total++; });
    count.textContent = `등록된 ${items.length}개 대표 시리즈 중 ${total}개`;
    empty.hidden = total !== 0;
    if(writeUrl) { const p = new URLSearchParams(); if(query) p.set('q',query); if(category.value !== 'all') p.set('category',category.value); history.replaceState(null,'',location.pathname + (p.size ? '?' + p.toString() : '')); }
  }
  q.addEventListener('input',()=>update());
  category.addEventListener('change',()=>update());
  document.querySelectorAll('[data-reset-search]').forEach(button=>button.addEventListener('click',()=>{q.value='';category.value='all';update();q.focus();}));
  window.addEventListener('popstate',()=>{readLocation();update(false);});
  readLocation();update(false);
})();
