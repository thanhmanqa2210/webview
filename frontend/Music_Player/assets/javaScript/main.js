const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PlAYER_STORAGE_KEY = "F8_PLAYER";
const nextBtn = $(".btn-next"),
    prevBtn = $(".btn-prev"),
    repeatBtn = $('.btn-repeat'),
    randomBtn = $(".btn-random");
//
const durationTime = $('.durationTime'),
    currentTIme = $(".currentTime");
//
const playlist = $(".playlist "),
    heading = $('header h2'),
    cd_thumb = $('.cd-thumb'),
    audio = $('#audio'),
    cd = $(".cd");
//
const playBtnToggle = $('.btn-toggle-play'),
    player = $('.player');
const progress = $("#progress");
let timeLeftHtml = '',
    timeRightHtml = ""
    //
    /*---------------------------------------------------- */
const app = {
    isRepeat: false,
    isRandom: false,
    isPlaying: false,
    currentIndex: 0,
    config: {},
    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [{
            name: "Hôm Nay Tôi Buồn",
            singer: "Phùng Khánh Linh",
            path: "../Music_Player/assets/songs/Hom-Nay-Toi-Buon-Phung-Khanh-Linh.mp3",
            image: "../Music_Player/assets/img/PhungKhanhLinh_HomNayToiBuon.png"
        },
        {
            name: "Sài Gòn Hôm Nay Mưa",
            singer: "JSOL & Hoàng Duyên",
            path: "../Music_Player/assets/songs/JSOL & HOÀNG DUYÊN - SÀI GÒN HÔM NAY MƯA - Official MV.mp3",
            image: "../Music_Player/assets/img/SaiGonHomNayMua.jpg"
        },
        {
            name: "Rồi Tới Luôn",
            singer: "Nal",
            path: "../Music_Player/assets/songs/Rồi Tới Luôn - Nal (MV Audio Lyric).mp3",
            image: "../Music_Player/assets/img/RoiToiLuon.jpg"
        },
        {
            name: "Sugar",
            singer: "Maroon 5",
            path: "../Music_Player/assets/songs/Maroon 5 - Sugar (Lyrics).mp3",
            image: "../Music_Player/assets/img/Sugar.jpg"
        }, {
            name: "Worth It",
            singer: "Fifth Harmony",
            path: "../Music_Player/assets/songs/Fifth Harmony - Worth It (Official Video) ft. Kid Ink.mp3",
            image: "../Music_Player/assets/img/worthIt.jpg"
        },
        {
            name: "Astronaut In The Ocean",
            singer: "Masked Wolf",
            path: "../Music_Player/assets/songs/Masked Wolf - Astronaut In The Ocean (Official Music Video).mp3",
            image: "../Music_Player/assets/img/astronaut.jpg"
        },
        {
            name: "See You Again",
            singer: "Wiz Khalifa",
            path: "../Music_Player/assets/songs/Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp3",
            image: "../Music_Player/assets/img/see-you-again.jpg"
        },
        {
            name: "Dance Monkey",
            singer: "Tones and I",
            path: "../Music_Player/assets/songs/Tones and I - Dance Monkey (Lyrics).mp3",
            image: "../Music_Player/assets/img/danceMonkey.jpg"
        },
        {
            name: "Believer",
            singer: "► Imagine Dragons",
            path: "../Music_Player/assets/songs/► Imagine Dragons - Believer (with lyrics).mp3",
            image: "../Music_Player/assets/img/Believer.jpg"
        },
        {
            name: "Maria",
            singer: "Hwa Sa",
            path: "../Music_Player/assets/songs/[MV] Hwa Sa(화사) _ Maria(마리아).mp3",
            image: "../Music_Player/assets/img/Maria.jpg"
        }, {
            name: "Perfect",
            singer: "Ed Sheeran",
            path: "../Music_Player/assets/songs/Ed Sheeran - Perfect (Official Music Video).mp3",
            image: "../Music_Player/assets/img/perfect.webp"
        }, {
            name: "The Chainsmokers & Coldplay",
            singer: "Closer ft. Halsey",
            path: "../Music_Player/assets/songs/The Chainsmokers - Closer (Lyrics) ft. Halsey.mp3",
            image: "../Music_Player/assets/img/TheChainMokers.jpg"
        },

    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        // (2/2) Uncomment the line below to use localStorage
        // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    defineProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index===this.currentIndex?"active":''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `;
        });
        playlist.innerHTML = htmls.join("");
    },
    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        //handle zooming in or out for CD
        //-------
        const cdThumbAnimate = cd_thumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 15000,
            iterations: Infinity,
        });
        cdThumbAnimate.pause();
        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCdWidth = cdWidth - scrollTop;
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            }
            //play or pause
        playBtnToggle.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();

        }
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                progress.value = audio.currentTime;
                progress.max = audio.duration;
                let newCurrent = _this.timeSong(Math.round(audio.currentTime)),
                    newDuration = _this.timeSong(Math.round(audio.duration));
                timeLeftHtml = newCurrent.m + ":" + newCurrent.s;
                timeRightHtml = newDuration.m + ":" + newDuration.s;
                setTimeout(() => {
                    currentTIme.innerHTML = timeLeftHtml;
                }, 1000);
                durationTime.innerHTML = timeRightHtml;
            }
        }
        progress.onchange = function(e) {
            audio.currentTime = e.target.value;
        }
        nextBtn.onclick = function() {
            if (!_this.isRandom)
                _this.nextSong();
            else
                _this.playRandom();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        prevBtn.onclick = function() {
            if (!_this.isRandom)
                _this.prevSong();
            else
                _this.playRandom();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRandom", _this.isRandom);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        }
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else
                nextBtn.click();
        }
        playlist.onclick = function(e) {
            const nodeSong = e.target.closest('.song:not(.active)');
            if (nodeSong || e.target.closest('.option')) {
                if (nodeSong) {
                    _this.currentIndex = Number(nodeSong.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();

                }
            }
        }

    },
    //-----------------------
    //time
    timeSong: function(newTimeSong) {
        let s = newTimeSong % 60;
        let m = Math.floor(newTimeSong / 60);

        if (s < 10 && m < 10) {
            return {
                s: '0' + String(s),
                m: "0" + String(m)
            };
        } else if (s >= 10 && m < 10) {
            return {
                s: String(s),
                m: '0' + String(m)
            }
        } else if (m >= 10 && s >= 10) {
            return {
                s: String(s),
                m: String(m)
            }
        } else {
            return {
                s: "0" + String(s),
                m: String(m)
            }
        }
    },
    //-----------------------
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandom: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.currentIndex === newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300);
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cd_thumb.style.backgroundImage = `
                            url('${this.currentSong.image}')
                            `;
        audio.src = this.currentSong.path;

    },
    start: function() {
        this.loadConfig();
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvents();
        this.render();
        // randomBtn.classList.toggle("active", this.isRandom);
        // repeatBtn.classList.toggle("active", this.isRepeat);
    }
}
app.start();