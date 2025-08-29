

// 나뭇잎 흩날림 애니메이션 생성
function createLeaf(x, y, delay) {
  const leaf = document.createElement('div');
  leaf.className = 'falling-leaf';
  leaf.style.left = x + 'px';
  leaf.style.top = y + 'px';
  leaf.style.animationDelay = delay + 's';
  
  // 다양한 나뭇잎 모양과 색상
  const leafTypes = [
    { color: '#66bb6a', size: 18, shape: 'ellipse' },
    { color: '#43a047', size: 16, shape: 'circle' },
    { color: '#388e3c', size: 20, shape: 'leaf' },
    { color: '#a5d6a7', size: 14, shape: 'oval' },
    { color: '#4caf50', size: 22, shape: 'maple' }
  ];
  
  const leafType = leafTypes[Math.floor(Math.random() * leafTypes.length)];
  const size = leafType.size;
  
  let svgContent;
  switch(leafType.shape) {
    case 'circle':
      svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="${leafType.color}" /></svg>`;
      break;
    case 'leaf':
      svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><path d="M${size/2} 2 Q${size-2} ${size/3} ${size/2} ${size-2} Q2 ${size/3} ${size/2} 2" fill="${leafType.color}" /></svg>`;
      break;
    case 'oval':
      svgContent = `<svg width="${size}" height="${size*0.7}" viewBox="0 0 ${size} ${size*0.7}"><ellipse cx="${size/2}" cy="${size*0.35}" rx="${size/3}" ry="${size/4}" fill="${leafType.color}" /></svg>`;
      break;
    case 'maple':
      svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><path d="M${size/2} 2 L${size-2} ${size/3} L${size*0.8} ${size-2} L${size/2} ${size*0.7} L${size*0.2} ${size-2} L2 ${size/3} Z" fill="${leafType.color}" /></svg>`;
      break;
    default:
      svgContent = `<svg width="${size}" height="${size*0.7}" viewBox="0 0 ${size} ${size*0.7}"><ellipse cx="${size/2}" cy="${size*0.35}" rx="${size/3}" ry="${size/4}" fill="${leafType.color}" /></svg>`;
  }
  
  leaf.innerHTML = svgContent;
  document.getElementById('main-bg').appendChild(leaf);
  
  // 애니 끝나면 제거
  leaf.addEventListener('animationend', () => leaf.remove());
}

// 주기적으로 나뭇잎 생성
setInterval(() => {
  // 화면 전체에서 랜덤하게 생성
  const x = Math.random() * window.innerWidth;
  const y = -20; // 화면 위에서 시작
  createLeaf(x, y, Math.random() * 3);
}, 800);

// 추가로 더 다양한 위치에서 나뭇잎 생성
setInterval(() => {
  const x = Math.random() * window.innerWidth;
  const y = -20;
  createLeaf(x, y, Math.random() * 2 + 1);
}, 1200);

// 일반 로그인 버튼은 auth.js에서 처리됨

// SNS 로그인 버튼
document.querySelector('.sns-kakao').onclick = function() {
  window.location.href = "/auth/login/kakao";
};
document.querySelector('.sns-naver').onclick = function() {
  window.location.href = "/auth/login/naver";
};
document.querySelector('.sns-google').onclick = function() {
  window.location.href = "/auth/login/google";
};