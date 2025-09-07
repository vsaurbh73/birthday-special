// Romantic Spotify-style player logic

const audio = document.getElementById('audio');
const trackListEl = document.getElementById('trackList');
const coverEl = document.getElementById('cover');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeEl = document.getElementById('volume');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

const tracks = [
  {
    id: 'r1',
    title: 'Sanam Re',
    artist: 'Arijit Singh',
    src: 'Music/01 - Sanam Re_320(wapking.fm) - Copy.mp3',
    cover: 'Music Cover/sanam re.jpg',
    length: '5:08'
  },
  {
    id: 'r2',
    title: 'Shiddat Title Track',
    artist: 'Manan Bhardwaj',
    src: 'Music/01 - Shiddat Title Track.mp3',
    cover: 'Music Cover/shiddat.jpg',
    length: '3:50'
  },
  {
    id: 'r3',
    title: 'Tere Hoke Rehengay',
    artist: 'Arijit Singh',
    src: 'Music/01-tere-hoke-rehengay-raja-natwarlal-arijit-singh-320kbps-(djamanin.wapkiz.com).mp3',
    cover: 'Music Cover/tere hoke rehege.jpg',
    length: '4:03'
  },
  {
    id: 'r4',
    title: 'Tu Har Lamha',
    artist: 'Arijit Singh',
    src: 'Music/02 Tu Har Lamha - Khamoshiyan (Arijit Singh) 320Kbps.mp3',
    cover: 'Music Cover/Tu-Har-Lamha-.jpg',
    length: '4:32'
  },
  {
    id: 'r5',
    title: 'Hamdard',
    artist: 'Arijit Singh',
    src: 'Music/05 Hamdard - Ek Villain ( PagalWorld.com ).mp3',
    cover: 'Music Cover/humdarad.jpg',
    length: '4:20'
  },
  {
    id: 'r6',
    title: 'Jug Jug Jeeve',
    artist: 'Sachet–Parampara',
    src: 'Music/06 - Jug Jug Jeeve.mp3',
    cover: 'Music Cover/jug jug jeeve.jpg',
    length: '3:19'
  },
  {
    id: 'r7',
    title: 'Deewana Kar Raha Hai',
    artist: 'Javed Ali',
    src: 'Music/Deewana Kar Raha Hai - Raaz 3 320Kbps.mp3',
    cover: 'Music Cover/deewana kar rha.jpg',
    length: '5:38'
  },
  {
    id: 'r8',
    title: 'Dhun Saiyaara',
    artist: 'Mithoon & Arijit Singh',
    src: 'Music/Dhun Saiyaara 320 Kbps.mp3',
    cover: 'Music Cover/dhun.jpg',
    length: '4:36'
  },
  {
    id: 'r9',
    title: 'Dil Ibaadat',
    artist: 'KK',
    src: 'Music/Dil Ibaadat - Tum Mile.mp3',
    cover: 'Music Cover/dil ibadat.jpg',
    length: '5:29'
  },
  {
    id: 'r10',
    title: 'Dil Sambhal Ja Zara',
    artist: 'Arijit Singh',
    src: 'Music/Dil_Sambhal_ja_Zara_Murder_2,Full_HD_Song_by_Imran_Hasmi_Exclosive.m4a',
    cover: 'Music Cover/dil smbhal ja jra.jpg',
    length: '5:31'
  },
  {
    id: 'r11',
    title: 'Haan Tu Hain',
    artist: 'KK',
    src: 'Music/Haan Tu Hain - Jannat 320Kbps.mp3',
    cover: 'Music Cover/haan tu hai.jpg',
    length: '5:24'
  },
  {
    id: 'r12',
    title: 'Hale Dil',
    artist: 'Harshit Saxena',
    src: 'Music/Hale Dil - Muder 2 320Kbps.mp3',
    cover: 'Music Cover/hale dil.jpg',
    length: '5:48'
  },
  {
    id: 'r13',
    title: 'Tumhe Apna Banane Ka ',
    artist: 'Armaan Malik',
    src: 'Music/Tumhe Apna Banane Ka Hate Story 3 320 Kbps.mp3',
    cover: 'Music Cover/tumhe apna bnane ka.jpg',
    length: '5:10'
  },
  {
    id: 'r14',
    title: 'Humraah',
    artist: 'Sachet Tandon',
    src: 'Music/Humraah - Malang.mp3',
    cover: 'Music Cover/humraah.jpg',
    length: '4:59'
  },
  {
    id: 'r15',
    title: 'Ijazat',
    artist: 'Arijit Singh',
    src: 'Music/IJAZAT_Video_Song___ONE_NIGHT_STAND___Sunny_Leone,_Tanuj_Virwani___Arijit_Singh,_Meet_Bros.m4a',
    cover: 'Music Cover/izazat.jpg',
    length: '4:49'
  },
  
  {
    id: 'r17',
    title: 'Jutti Meri',
    artist: 'Neha Bhasin',
    src: 'Music/Jutti Meri - (Raag.Fm).mp3',
    cover: 'Music Cover/jutti meri.jpg',
    length: '3:28'
  },
  {
    id: 'r18',
    title: 'Khaab',
    artist: 'Akhil',
    src: 'Music/Khaab - Akhil - 320Kbps.mp3',
    cover: 'Music Cover/khaab.jpg',
    length: '3:21'
  },
  {
    id: 'r19',
    title: 'Makhna',
    artist: 'Asees Kaur, Tanishk Bagchi, Yasser Desai',
    src: 'Music/Makhna_-_Drive_Sushant_Singh_Rajput,_Jacqueline_Fernandez_Tanishk_Bagchi,_Yasser_Desai,_Asees_Kaur(256k).mp3',
    cover: 'Music Cover/makhna.jpg',
    length: '3:13'
  },
  {
    id: 'r20',
    title: 'Mat Aazma Re',
    artist: 'K.K',
    src: 'Music/Mat Aazma Re (Murder ) - K.K - 320Kbps.mp3',
    cover: 'Music Cover/mat azzma re.jpg',
    length: '4:11'
  },
  {
    id: 'r21',
    title: 'Mere Sohneya',
    artist: 'Sachet Tandon, Parampara Thakur',
    src: 'Music/Mere_sohneya_(_Kabir_Singh)__Remix__[Tropical_mix]__Dj_Abhi(256k).mp3',
    cover: 'Music Cover/mere sohneya.jpg',
    length: '4:01'
  },
  {
    id: 'r22',
    title: 'Mujhko Barsaat Bana Lo',
    artist: 'Armaan Malik',
    src: 'Music/Mujhko Barsaat Bana Lo - Junooniyat - 190Kbps.mp3',
    cover: 'Music Cover/mujhko barsaat bna lo.jpg',
    length: '4:25'
  },
  {
    id: 'r23',
    title: 'Pal',
    artist: 'Arijit Singh',
    src: 'Music/Pal Monsoon Shootout 320 Kbps.mp3',
    cover: 'Music Cover/pal.webp',
    length: '4:48'
  },
  
  {
    id: 'r25',
    title: 'Pyaar De',
    artist: 'Ankit Tiwari',
    src: 'Music/Pyaar_De___Sunny_Leone___Rajniesh_Duggall___Ankit_Tiwari___Beiimaan_Love.m4a',
    cover: 'Music Cover/pyaar de.webp',
    length: '5:24'
  },
 
  {
    id: 'r27',
    title: 'Suno Na Sangemarmar',
    artist: 'Arijit Singh',
    src: 'Music/Suno_Na_Sangemarmar_Arijit_singh_1080p_HD_blu-ray.m4a',
    cover: 'Music Cover/suno na sangmarmar.jpg',
    length: '3:19'
  },
  {
    id: 'r28',
    title: 'Tainu Khabar Nahi',
    artist: 'Arijit Singh',
    src: 'Music/Tainu-Khabar-Nahi(Pagal-World.Com.In).mp3',
    cover: 'Music Cover/tainu khabar nahi.jpg',
    length: '2:38'
  },
  {
    id: 'r29',
    title: 'Tera Hone Laga Hoon',
    artist: 'Alisha Chinai, Atif Aslam',
    src: 'Music/Tera-Hone-Laga-Hoon (SongsMp3.Com).mp3',
    cover: 'Music Cover/tera hone lga hu.jpg',
    length: '5:00'
  },
  {
    id: 'r30',
    title: 'Teri Jhuki Nazar',
    artist: 'Shafqat Amanat Ali, Pritam Chakraborty',
    src: 'Music/Teri-Jhuki-Nazar-Film-Version (SongsMp3.Com).mp3',
    cover: 'Music Cover/teri jhuki najar.jpg',
    length: '4:38'
  },
  {
    id: 'r31',
    title: 'Tu Hi Hai Aashiqui',
    artist: 'Arijit Singh',
    src: 'Music/Tu Hi Hai Aashiqui - Arijit Singh - 320Kbps.mp3',
    cover: 'Music Cover/Tu-Har-Lamha-.jpg',
    length: '4:57'
  },
  {
    id: 'r32',
    title: 'Tu Hi Mera',
    artist: 'Pritam Chakraborty, Shafqat Amanat Ali',
    src: 'Music/Tu Hi Mera - Jannat 2 320Kbps.mp3',
    cover: 'Music Cover/tu he mera.jpg',
    length: '4:32'
  },
  {
    id: 'r33',
    title: 'Tu Hi Meri Shab Hai',
    artist: 'KK, Pritam Chakraborty',
    src: 'Music/Tu Hi Meri Shab Hai - Gangster 320Kbps.mp3',
    cover: 'Music Cover/tu he meri shaab hai.webp',
    length: '6:29'
  },
  {
    id: 'r34',
    title: 'Tujhe Sochta Hoon',
    artist: 'KK, Pritam Chakraborty',
    src: 'Music/Tujhe Sochta Hoon - Jannat 2.mp3',
    cover: 'Music Cover/tujhe sochta hu.jpg',
    length: '5:13'
  },
  {
    id: 'r35',
    title: 'Tum Kya Mile',
    artist: 'Arijit Singh',
    src: 'Music/Tum Kya Mile Rocky Aur Rani Kii Prem Kahaani 320 Kbps.mp3',
    cover: 'Music Cover/tum kya mile.jpg',
    length: '4:37'
  },
  {
    id: 'r36',
    title: 'Tum Se Hi',
    artist: 'Ankit Tiwari',
    src: 'Music/Tum-Se-Hi_320(PaglaSongs).mp3',
    cover: 'Music Cover/tum se he.jpg',
    length: '2:41'
  },
  {
    id: 'r37',
    title: 'Wajah Tum Ho',
    artist: 'Armaan Malik',
    src: 'Music/Wajah Tum Ho - Hate Story 3 (Armaan Malik) 320Kbps.mp3',
    cover: 'Music Cover/wajah tum ho.jpg',
    length: '5:57'
  },
  {
    id: 'r38',
    title: 'Zara Sa',
    artist: 'KK',
    src: 'Music/Zara_Sa_-_Official_Full_Song___Jannat___KK__Pritam___Emraan_Hashmi___Sonal_Chauh.m4a',
    cover: 'Music Cover/zara sa.jpg',
    length: '3:43'
  },
  {
    id: 'r39',
    title: 'Zaroor',
    artist: 'Aparshakti Khurana',
    src: 'Music/Zaroor Aparshakti Khurana 320 Kbps.mp3',
    cover: 'Music Cover/zaroor.jpg',
    length: '2:55'
  },
  {
    id: 'r40',
    title: 'Sawan Aaya Hai',
    artist: 'Arijit Singh',
    src: 'Music/_Sawan_Aaya_Hai__FULL_VIDEO_Song___Arijit_Singh___Bipasha_Basu___Imran_Abbas_Naq.m4a',
    cover: 'Music Cover/sawan aya hai.jpg',
    length: '3:16'
  },
  {
    id: 'r41',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    src: 'Music/_Tum_Hi_Ho_Aashiqui_2__Full_Video_Song_HD___Aditya_Roy_Kapur,_Shraddha_Kapoor___.m4a',
    cover: 'Music Cover/tum he ho.jpg',
    length: '5:09'
  },
 
  {
    id: 'r42',
    title: 'Love Me Like You Do',
    artist: 'Ellie Goulding',
    src: 'Music/ssvid.net--Ellie-Goulding-Love-Me-Like-You-Do-Lyrics-Best_128kbps.m4a.mp3',
    cover: 'Music Cover/love me like you do.jpg',
    length: '4:32'
  }
];

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function formatTime(seconds) {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderPlaylist() {
  trackListEl.innerHTML = '';
  tracks.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'track' + (idx === currentIndex ? ' active' : '');
    li.dataset.index = idx;
    li.innerHTML = `
      <img class="cover-sm" src="${t.cover}" alt="${t.title}">
      <div class="info">
        <span class="title">${t.title}</span>
        <span class="artist">${t.artist}</span>
      </div>
      <span class="len">${t.length}</span>
    `;
    li.addEventListener('click', () => {
      if (idx !== currentIndex) {
        currentIndex = idx;
        loadTrack(currentIndex);
        play();
      } else {
        togglePlay();
      }
    });
    trackListEl.appendChild(li);
  });
}

function updateActiveTrack() {
  document.querySelectorAll('.track').forEach((el, idx) => {
    el.classList.toggle('active', idx === currentIndex);
  });
}

function loadTrack(index) {
  const t = tracks[index];
  if (!t) return;
  audio.src = t.src;
  coverEl.src = t.cover;
  titleEl.textContent = t.title;
  artistEl.textContent = t.artist;
  seekBar.value = 0;
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
  updateActiveTrack();
}

function play() {
  audio.play().then(() => {
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }).catch(() => {/* ignore */});
}

function pause() {
  audio.pause();
  isPlaying = false;
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
}

function togglePlay() {
  if (isPlaying) pause(); else play();
}

function next() {
  if (isShuffle) {
    let nextIdx = Math.floor(Math.random() * tracks.length);
    if (nextIdx === currentIndex && tracks.length > 1) {
      nextIdx = (nextIdx + 1) % tracks.length;
    }
    currentIndex = nextIdx;
  } else {
    currentIndex = (currentIndex + 1) % tracks.length;
  }
  loadTrack(currentIndex);
  play();
}

function prev() {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  play();
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.setAttribute('aria-pressed', String(isShuffle));
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.setAttribute('aria-pressed', String(isRepeat));
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  if (audio.duration) {
    seekBar.value = String((audio.currentTime / audio.duration) * 100);
  }
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    play();
  } else {
    next();
  }
});

seekBar.addEventListener('input', () => {
  if (audio.duration) {
    const pct = Number(seekBar.value) / 100;
    audio.currentTime = pct * audio.duration;
  }
});

volumeEl.addEventListener('input', () => {
  audio.volume = Number(volumeEl.value);
});

// Init
renderPlaylist();
loadTrack(currentIndex);


