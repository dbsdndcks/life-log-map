// 로그인 폼 제출 처리
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // 간단한 유효성 검사
  if (!email || !password) {
    showMessage('이메일과 비밀번호를 모두 입력해주세요.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showMessage('올바른 이메일 형식을 입력해주세요.', 'error');
    return;
  }
  
  // 로그인 버튼 상태 변경
  const loginBtn = document.querySelector('.login-btn');
  const originalText = loginBtn.textContent;
  loginBtn.textContent = '로그인 중...';
  loginBtn.disabled = true;
  
  // 실제 로그인 API 호출
  performLogin(email, password)
    .then(response => {
      showMessage('로그인 성공!', 'success');
      // 로그인 성공 후 리다이렉트
      setTimeout(() => {
        window.location.href = '/map';
      }, 1000);
    })
    .catch(error => {
      showMessage('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.', 'error');
      loginBtn.textContent = originalText;
      loginBtn.disabled = false;
    });
});

// 이메일 유효성 검사
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 메시지 표시 함수
function showMessage(message, type) {
  // 기존 메시지 제거
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;
  
  // 스타일 적용
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.9rem;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
    ${type === 'error' ? 
      'background: #ff6b6b; color: white;' : 
      type === 'success' ?
      'background: #51cf66; color: white;' :
      'background: #339af0; color: white;'
    }
  `;
  
  document.body.appendChild(messageDiv);
  
  // 3초 후 자동 제거
  setTimeout(() => {
    messageDiv.style.animation = 'slideUp 0.3s ease-out';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

// 로그인 API 호출 함수
async function performLogin(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// SNS 로그인 버튼 이벤트
document.querySelector('.sns-kakao').addEventListener('click', function() {
  const KAKAO_CLIENT_ID = '7327acb088c400c493e11df766a8d9a6';
  const REDIRECT_URI = 'http://localhost:8080/login/oauth2/kakao';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  window.location.href = kakaoAuthUrl;
});

document.querySelector('.sns-naver').addEventListener('click', function() {
  showMessage('네이버 로그인 기능은 준비 중입니다.', 'info');
});

document.querySelector('.sns-google').addEventListener('click', function() {
  showMessage('구글 로그인 기능은 준비 중입니다.', 'info');
});

// 입력 필드 포커스 효과
document.querySelectorAll('.input-group input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// 비밀번호 표시/숨김 토글
function addPasswordToggle() {
  const passwordInput = document.getElementById('login-password');
  if (!passwordInput) return;
  
  const inputGroup = passwordInput.parentElement;
  
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'password-toggle';
  toggleBtn.innerHTML = '👁️';
  toggleBtn.style.cssText = `
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
    transition: opacity 0.3s;
  `;
  
  toggleBtn.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.innerHTML = '🙈';
    } else {
      passwordInput.type = 'password';
      this.innerHTML = '👁️';
    }
  });
  
  toggleBtn.addEventListener('mouseenter', function() {
    this.style.opacity = '1';
  });
  
  toggleBtn.addEventListener('mouseleave', function() {
    this.style.opacity = '0.6';
  });
  
  inputGroup.appendChild(toggleBtn);
}

// 비밀번호 토글 기능 추가
addPasswordToggle();

// 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style); 