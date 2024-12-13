// 요소 선택
const cards = document.querySelectorAll(".card");
const timerScoreContainer = document.getElementById("timer-score");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const gameStatusText = document.getElementById("game-status");
const btnsContainer = document.getElementById("btns");
const replayBtn = document.getElementById("replay");

// 변수 정의
const TIME_IN_SECONDS = 120; // 게임 제한 시간(초)
let matchedCard = 0; // 맞춘 카드 쌍의 수
let disabled = false; // 카드 뒤집기 비활성화 여부
let cardOne = ""; // 첫 번째 카드
let cardTwo = ""; // 두 번째 카드
let timer; // 타이머

function matchCards(img1, img2) {
  // 카드 이미지가 일치하는 경우
  if (img1 === img2) {
    matchedCard++; // 스코어 증가
    scoreText.innerText = matchedCard; // 스코어 업데이트

    // 카드 클릭 이벤트 제거
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);

    // 카드 커서를 기본값으로 변경
    cardOne.style.cursor = "default";
    cardTwo.style.cursor = "default";

    // 설정 초기화
    cardOne = cardTwo = "";
    disabled = false;

    // 모든 카드를 맞춘 경우, 0.3초 후 게임 종료
    if (matchedCard === 8) {
      setTimeout(() => {
        clearInterval(timer);
        finishGame("✨Mission Clear✨");
      }, 300);
    }
  } else {
    // 카드 이미지가 일치하지 않는 경우

    // 0.3초 후 카드 흔들기 효과 추가
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 300);

    // 1초 후 흔들기 및 뒤집기 효과 제거, 설정 초기화
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disabled = false;
    }, 1200);
  }
}

function flipCard(e) {
  let clickedCard = e.target;
  // 이미 선택한 첫 번째 카드를 다시 클릭한 경우 무시
  if (clickedCard === cardOne) return;

  // 카드 뒤집기가 비활성화된 경우 무시
  if (disabled) return;

  // 카드 뒤집기 효과 추가
  clickedCard.classList.add("flip");

  // 첫 번째 카드를 선택한 경우, 해당 카드를 첫 번째 카드로 지정하고 종료
  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }

  // 두 번째 카드를 선택한 경우, 해당 카드를 두 번째 카드로 지정
  cardTwo = clickedCard;
  // 추가적인 카드 뒤집기 비활성화
  disabled = true;

  // 두 카드의 이미지 비교하여 일치 여부 확인
  let cardOneImg = cardOne.querySelector(".back-view img").src;
  let cardTwoImg = cardTwo.querySelector(".back-view img").src;
  matchCards(cardOneImg, cardTwoImg);
}

function shuffleCards() {
  // 랜덤 배열 생성
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  
// 배열을 랜덤하게 섞음
arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

// 각 카드에 랜덤 이미지를 할당하고 클릭 이벤트 추가
cards.forEach((card, index) => {
let cardImg = card.querySelector(".back-view img");
cardImg.src = `../image/card-0${arr[index]}.jpg`;
card.addEventListener("click", flipCard);
});
}

function finishGame(status) {
// 게임 상태 메시지 표시 (미션 클리어 또는 게임 오버)
gameStatusText.innerText = status;
gameStatusText.style.display = "block";

// 다시하기 및 홈 버튼 표시 및 클릭 이벤트 추가
btnsContainer.style.display = "flex";
replayBtn.addEventListener("click", () => location.reload());
};

// 모든 카드의 클릭 이벤트 제거 및 커서 기본값으로 변경
cards.forEach((card) => {
card.removeEventListener("click", flipCard);
card.style.cursor = "default";
});

function initGame() {
// 타이머 설정 및 시작
timerText.innerText = TIME_IN_SECONDS;
timer = setInterval(() => {
timerText.innerText -= 1;
}, 1200);

// 제한 시간이 지나면 게임 오버 처리
setTimeout(() => {
clearInterval(timer);
finishGame(" 💣Game Over💣");
}, TIME_IN_SECONDS *1200);

// 카드 섞기 실행
shuffleCards();
}

// 게임 초기화 함수 호출하여 시작
initGame();
