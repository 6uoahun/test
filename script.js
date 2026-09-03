// ==========================================
// 노래를 추가할 때 youtube 값을 넣어주세요.
// YouTube 영상 URL을 그대로 넣어도 됩니다.
// 예: https://www.youtube.com/watch?v=영상ID
// 또는 영상 ID만 넣어도 됩니다.
// ==========================================
const songs = [
  {
    title: "한 페이지가 될 수 있게",
    artist: "DAY6",
    message: "지금 이 순간이 다시 넘겨볼 수 있는 한 페이지가 될 수 있게",
    youtube: "https://www.youtube.com/watch?v=vnS_jn2uibs"
  },
  {
    title: "주저하는 연인들을 위해",
    artist: "잔나비",
    message: "망설이고 있다면, 오늘은 조금 더 용기 내어봐요.",
    youtube: "https://www.youtube.com/watch?v=Gs2M3qD0vYQ"
  },
  {
    title: "여행",
    artist: "볼빨간사춘기",
    message: "오늘은 잠깐 일상에서 벗어나 가볍게 떠나볼까요?",
    youtube: "https://www.youtube.com/watch?v=xRbPAVnqtcs"
  },
  {
    title: "소녀",
    artist: "이문세",
    message: "풋풋했던 순간의 마음을 잠시 떠올려보세요.",
    youtube: "https://www.youtube.com/watch?v=Y8J9W9j3l5I"
  },
  {
    title: "에잇",
    artist: "아이유",
    message: "좋았던 기억은 오래도록 마음 한편에 남아 있어요.",
    youtube: "https://www.youtube.com/watch?v=TgOu00Mf3kI"
  },
  {
    title: "청춘",
    artist: "김필",
    message: "지금 이 순간, 당신의 청춘은 계속되고 있어요.",
    youtube: "https://www.youtube.com/watch?v=Z6Qq8M8vK3A"
  }
];

const title = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const message = document.getElementById("message");
const playerWrap = document.getElementById("playerWrap");
const youtubePlayer = document.getElementById("youtubePlayer");
const drawButton = document.getElementById("drawButton");
const againButton = document.getElementById("againButton");
const count = document.getElementById("count");

let lastIndex = -1;

count.textContent = `총 ${songs.length}곡이 준비되어 있어요.`;

function getYoutubeId(urlOrId) {
  if (!urlOrId) return "";
  if (/^[A-Za-z0-9_-]{11}$/.test(urlOrId)) return urlOrId;

  try {
    const url = new URL(urlOrId);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1).split("/")[0];
    }
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") return url.searchParams.get("v") || "";
      const parts = url.pathname.split("/");
      const embedIndex = parts.indexOf("embed");
      if (embedIndex >= 0) return parts[embedIndex + 1] || "";
      const shortsIndex = parts.indexOf("shorts");
      if (shortsIndex >= 0) return parts[shortsIndex + 1] || "";
    }
  } catch (e) {}
  return "";
}

function drawSong() {
  if (!songs.length) return;

  let index;
  do {
    index = Math.floor(Math.random() * songs.length);
  } while (songs.length > 1 && index === lastIndex);

  lastIndex = index;
  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;
  message.textContent = song.message || "오늘의 청춘을 위한 한 곡입니다.";

  const videoId = getYoutubeId(song.youtube);

  if (videoId) {
    youtubePlayer.src =
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    playerWrap.hidden = false;
  } else {
    youtubePlayer.src = "";
    playerWrap.hidden = true;
  }

  drawButton.hidden = true;
  againButton.hidden = false;
}

drawButton.addEventListener("click", drawSong);
againButton.addEventListener("click", drawSong);
