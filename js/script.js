const music = document.querySelector('#music');
let img_room = document.querySelector('#img_room');

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

let title = document.querySelector('.title');
let artist = document.querySelector('.artist');

let fev = document.querySelector('.fev');

let progress = document.querySelector('.progress');
// console.log(progress);
let currentLog = document.querySelector('.currentTIme');

let box = document.querySelector('.box');
// console.log(box);

fev.addEventListener('click', () => {
    fev.classList.toggle('fev-set');
})


let songsIndex = 0;

let songs = [{
        name: "ms (1)",
        title: "kali range",
        artist: "jass manak"
    },
    {
        name: "ms (2)",
        title: "hum yaar hain tumhare",
        artist: "udit narayan"
    },
    {
        name: "ms (3)",
        title: "phulkari",
        artist: "karan randhawa"
    },
    {
        name: "ms (4)",
        title: "tora",
        artist: "sumit goswami"
    },
    {
        name: "ms (5)",
        title: "mashup",
        artist: "New Album"
    },
    {
        name: "ms (6)",
        title: "saiyaan",
        artist: "jass manak"
    }
];

// console.log(songs[1].title);

// const load the data from the object
const loadData = (songs) => {
    title.innerHTML = songs.title;
    artist.innerHTML = songs.artist;
    console.log(music.src = "music/" + songs.name + ".mp3");
    img_room.src = "images/" + songs.name + ".png";
}


const prevMusic = () => {
    songsIndex = (songsIndex - 1 + songs.length) % songs.length;
    loadData(songs[songsIndex]);
    playMusic();

};

const nextMusic = () => {
    songsIndex = (songsIndex + 1) % songs.length;
    loadData(songs[songsIndex]);
    playMusic();
};


next.addEventListener('click', nextMusic);
prev.addEventListener('click', prevMusic);


let played = false;

let fa_play = document.querySelector('.fa-play');

//define the play music and 
const playMusic = () => {
    played = true;
    music.play();
    fa_play.classList.replace('fa-play', 'fa-pause');
}
const pauseMusic = () => {
    played = false;
    music.pause();
    fa_play.classList.replace('fa-pause', 'fa-play');
}

const play = document.querySelector('.play');
play.addEventListener('click', () => {
    if (played) {
        pauseMusic();
    } else {
        playMusic();
    }
})

//process bar
music.addEventListener('timeupdate', (event) => {
    // console.log(event);
    let {
        currentTime,
        duration
    } = event.srcElement;
    // console.log(currentTime);
    // console.log(duration);

    let timeProg = (currentTime / duration) * 100;
    progress.style.width = timeProg + "%";

    //music current Duration and current time 

    //get the current miniut
    let currentMiniut = Math.floor(currentTime / 60);

    ///get the current seconds
    let currentSecond = Math.floor(currentTime % 60);

    //this is the conditinal statment
    if (currentSecond < 10) {
        currentSecond = `0${currentSecond}`;
    }

    let total_currentTime = currentMiniut + ":" + currentSecond;
    // console.log(total_currentTime);

    currentLog.innerHTML = total_currentTime;


    //let get the duration
    let durat = document.querySelector('.duration');

    let du_miniut = Math.floor(duration / 60);
    let du_sec = Math.floor(duration % 60);
    // console.log(du_miniut);
    // console.log(du_sec);

    if (du_sec < 10) {
        du_sec = `0${du_sec}`;
    }

    let total_durat = du_miniut + ":" + du_sec;

    if (duration) {
        // console.log(total_durat);
        durat.innerHTML = total_durat;
    }

    music.addEventListener('ended', nextMusic);

})

//clicked the progrss functality
let pro_main = document.querySelector('.pro_main');
pro_main.addEventListener('click', (task) => {
    const {
        duration
    } = music;

    let mvPrg = (task.offsetX / task.srcElement.clientWidth) * duration;

    music.currentTime = mvPrg;
});

// this is the playlist functality
let faList = document.querySelector('.fa-list');
let music_list = document.querySelector('.music_list');
let list_unorder = document.querySelector('.list_unorder');

faList.addEventListener('click', () => {
    music_list.classList.toggle('music_list_active');
});

for (let index = 0; index < songs.length; index++) {
    let lists_item = document.createElement('li');
    // console.log(lists_item);

    //list add func
    lists_item.setAttribute('class', 'list_pack');
    list_unorder.appendChild(lists_item);
    songsIndex = (songsIndex + 1) % songs.length;
    lists_item.innerText = songs[index].title;


      //music icon add func
      let iconM = document.createElement('i');
      // console.log(iconM);
      iconM.setAttribute('class', 'fa fa-music');
      // console.log(iconM);
      lists_item.appendChild(iconM);
    //   console.log(iconM);
}


//this is the settings func
let fa_cog = document.querySelector('.fa-cog');
let settings_code = document.querySelector('.settings_code');
// console.log(settings_code);

fa_cog.addEventListener('click', ()=>{
    settings_code.classList.toggle('settings_activated');
});

// let's create the input element

let inpt = document.createElement('input');
// console.log(inpt);
inpt.setAttribute('type', 'checkbox');
// console.log(inpt);
settings_code.appendChild(inpt);
inpt.addEventListener('click', ()=>{
    // console.log("this is the dark mode");
    box.classList.toggle('dark_mode');
});

//this is the volume add func
let vol = document.querySelector('.vol');
let vol_set = document.querySelector('.vol_set');
vol.addEventListener('click', ()=>{
    vol_set.classList.toggle('vol_activated');
});

let pOpt = document.createElement('p');
pOpt.setAttribute('id', 'res');
// pOpt.innerText = "00";
vol_set.appendChild(pOpt);


let set_range = document.createElement('div');
set_range.setAttribute('class', 'set_range');
vol_set.appendChild(set_range);

let inpts = document.createElement('input');
// console.log(inpts);
inpts.setAttribute('type', 'range');
inpts.setAttribute('min', '0');
inpts.setAttribute('max', '1');
inpts.setAttribute('step', '0.1');
inpts.setAttribute('id', 'slider');
// console.log(inpts);
set_range.appendChild(inpts);
// console.log(vol_set);

let slider = document.getElementById('slider');
slider.addEventListener('input',()=>{
   let optt = pOpt.innerText = slider.value;
    music.volume = optt;
})


