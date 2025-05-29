# KT Intelligence 웹 퍼블리싱 가이드라인

## 1. 프로젝트 구조
```
project/
├── css/
│   ├── common.css      # 공통 스타일
│   ├── reset.css       # 리셋 스타일
│   ├── style.css       # 메인 스타일
│   └── swiper-bundle.min.css  # 슬라이더 스타일
├── js/
│   └── main.js         # 메인 스크립트
├── resource/
│   └── images/         # 이미지 리소스
└── index.html          # 메인 페이지
```

## 2. HTML 작성 규칙

### 2.1 기본 구조
- DOCTYPE 선언: HTML5 사용
- 언어 설정: `lang="ko"`
- 메타 태그 필수 포함:
  - charset: UTF-8
  - viewport: width=device-width, initial-scale=1.0

### 2.2 클래스 네이밍 규칙
- BEM 방식 사용 (Block__Element--Modifier)
- 섹션별 접두어 사용:
  - 헤더: `header-`
  - 히어로: `hero-`
  - 섹션: `section-`
  - 컴포넌트: `component-`

### 2.3 섹션 구조
```html
<section id="section-name" class="section-name">
    <div class="section-inner">
        <div class="section-content">
            <!-- 콘텐츠 -->
        </div>
    </div>
</section>
```

## 3. CSS 작성 규칙

### 3.1 파일 구조
- common.css: 공통 스타일 및 디자인 시스템(컬러, 타이포그래피, 유틸리티 등) 포함
- reset.css: 브라우저 기본 스타일 초기화
- style.css: 페이지별 스타일

### 3.2 스타일 작성 순서
1. 레이아웃 속성 (display, position, float)
2. 박스 모델 (width, height, margin, padding)
3. 시각적 스타일 (background, border)
4. 타이포그래피 (font, text)
5. 기타 (animation, transition)

### 3.3 반응형 디자인
- PC 퍼스트 접근
- 브레이크포인트: 아직 정해지지 않았음
- 태블릿 디자인 없음

### 3.4 디자인 시스템 적용
- 컬러, 폰트, 타이포그래피, 유틸리티 클래스 등은 반드시 css/common.css에 정의된 CSS 변수(:root)와 클래스를 우선 사용
- px 단위 직접 사용은 최소화하고, rem, 변수, 유틸리티 클래스(.fw-bold, .text-center, .mt-2 등) 적극 활용
- 공통 디자인 토큰(컬러, 폰트, 여백 등)은 common.css에서만 관리
- 접근성용 숨김 텍스트는 `.sr-only` 클래스 사용

#### 예시
```html
<h1 class="fw-bold">타이틀</h1>
<p class="mt-2 mb-2">설명 텍스트</p>
<div class="bg-primary text-white">포인트 배경</div>
<span class="sr-only">스크린리더 전용 텍스트</span>
```

#### 커스텀 CSS 클래스에서 common.css 변수 사용 예시
```css
.eco-section {
    background: var(--white-color);
}

.eco-partner-desc p {
    color: var(--gray-900-color);
}

.news-meta {
    font-size: var(--font-size-md);
    line-height: var(--line-height-172);
}
```

### 3.5 디자인 시스템 추가/수정 원칙
- 디자인 시스템(컬러, 폰트, 유틸리티 등) 추가/수정은 반드시 common.css에 반영
- 개별 파일에서 임의로 변수/유틸리티를 추가하지 않음
- 디자인 시스템 변경 시 전체 프로젝트에 즉시 반영

## 4. JavaScript 작성 규칙

### 4.1 이벤트 핸들링
- 이벤트 위임 사용
- 이벤트 리스너는 DOMContentLoaded 이후 등록

### 4.2 애니메이션
- AOS(Animate On Scroll) 라이브러리 활용
- CSS 트랜지션 우선 사용
- 복잡한 애니메이션은 GSAP 사용

## 5. 이미지 최적화

### 5.1 이미지 포맷
- SVG: 아이콘, 로고
- WebP: 사진, 배경
- PNG: 투명도가 필요한 이미지

### 5.2 이미지 크기
- width, height 속성 필수 지정
- alt 속성 필수 입력

## 6. 성능 최적화

### 6.1 리소스 로딩
- CSS: head 태그 내 로드
- JavaScript: body 태그 끝부분에 로드
- 이미지: lazy loading 적용

### 6.2 코드 최적화
- 불필요한 주석 제거
- CSS 미디어 쿼리 최적화
- JavaScript 번들 사이즈 최소화

## 7. 접근성

### 7.1 필수 요소
- 시맨틱 태그 사용
- ARIA 레이블 적용
- 키보드 네비게이션 지원

### 7.2 색상 대비
- WCAG 2.1 기준 준수
- 텍스트 가독성 확보

### 7.3 키보드 접근성
- 모든 상호작용 요소는 키보드로 접근 가능해야 함
- 포커스 표시기(아웃라인) 명확하게 표시
- Tab 순서 논리적으로 구성
- 포커스 트랩 방지

### 7.4 스크린 리더 지원
- 의미있는 대체 텍스트 제공
- 데코레이션 이미지는 alt="" 처리
- 아이콘 버튼에 적절한 aria-label 제공

### 7.5 동적 콘텐츠
- AJAX 콘텐츠 변경 시 aria-live 영역 사용
- 모달/팝업은 적절한 role과 aria-modal 속성 사용
- 동적 UI 상태 변경 시 aria-expanded, aria-selected 등 상태 속성 사용

### 7.6 폼 접근성
- 모든 입력 필드에 연결된 label 제공
- 필수 입력 필드는 aria-required 사용
- 오류 메시지는 aria-invalid와 aria-describedby 연결
- 자동완성 기능 지원

### 7.7 멀티미디어 접근성
- 동영상에 자막/자막 제공
- 자동 재생 방지
- 배경 음악은 사용자 제어 가능하도록 구현
- 이미지 맵 사용 시 대체 텍스트 제공

### 7.8 반응형 접근성
- 모바일에서 터치 영역 최소 44x44px 확보
- 줌 기능 제한하지 않음
- 가로 스크롤 방지
- 터치 제스처에 키보드 대체 수단 제공

### 7.9 테스트 및 검증
- WAVE, aXe 등 접근성 검사 도구 활용
- 실제 스크린 리더로 테스트
- 키보드만으로 모든 기능 테스트
- 색상 대비 검사기로 검증

## 8. 브라우저 호환성

### 8.1 지원 브라우저
- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

### 8.2 폴리필
- 필요한 경우만 사용
- 최신 브라우저 기능 사용 시 주의 