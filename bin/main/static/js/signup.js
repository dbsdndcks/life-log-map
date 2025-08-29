// 회원가입 폼 제출 처리
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const passwordConfirm = document.getElementById('signup-password-confirm').value;
  
  // 유효성 검사
  if (!name || !email || !password || !passwordConfirm) {
    showMessage('모든 필드를 입력해주세요.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showMessage('올바른 이메일 형식을 입력해주세요.', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('비밀번호는 6자 이상이어야 합니다.', 'error');
    return;
  }
  
  if (password !== passwordConfirm) {
    showMessage('비밀번호가 일치하지 않습니다.', 'error');
    return;
  }
  
  // 회원가입 버튼 상태 변경
  const signupBtn = document.querySelector('.signup-btn');
  const originalText = signupBtn.textContent;
  signupBtn.textContent = '회원가입 중...';
  signupBtn.disabled = true;
  
  // 실제 회원가입 API 호출
  performSignup(name, email, password)
    .then(response => {
      showMessage('회원가입 성공! 로그인 페이지로 이동합니다.', 'success');
      // 회원가입 성공 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    })
    .catch(error => {
      showMessage('회원가입에 실패했습니다. 다시 시도해주세요.', 'error');
      signupBtn.textContent = originalText;
      signupBtn.disabled = false;
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

// 회원가입 API 호출 함수
async function performSignup(name, email, password) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

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
  const passwordInputs = [
    document.getElementById('signup-password'),
    document.getElementById('signup-password-confirm')
  ];
  
  passwordInputs.forEach(passwordInput => {
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
  });
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