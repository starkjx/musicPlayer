var currentIndex = 0
var musicList = []
var clock
var audioObj = new Audio()
audioObj.autoplay = true

getMusicList(function(list){
  musicList = list
  loadMusic(musicList[currentIndex])
  gengeateList(list)
})

audioObj.ontimeupdate = function(){
  console.log(this.currentTime)
  $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
}

audioObj.onplay = function(){
  clock = setInterval(function(){
    var min = Math.floor(audioObj.currentTime/60)
    var sec = Math.floor(audioObj.currentTime%60) + ''
    sec = sec.length ===2? sec : '0' + sec
    $('.musicbox .current-time').innerText = min + ':' + sec
  },1000)
}

$('.music-panel .play').onclick = function(){
  console.log(this.querySelector('.iconfont').classList)
  if(audioObj.paused){
    audioObj.play()
    this.querySelector('.iconfont').classList.remove('icon-play')
    this.querySelector('.iconfont').classList.add('icon-pause')
  }else{
  audioObj.pause()
  this.querySelector('.iconfont').classList.remove('icon-pause')
  this.querySelector('.iconfont').classList.add('icon-play')
  }
}

$('.music-panel .forward').onclick = function(){
  currentIndex = (++currentIndex)%musicList.length
  loadMusic(musicList[currentIndex])
}

$('.music-panel .back').onclick = function(){
  currentIndex = (musicList.length + --currentIndex)%musicList.length
  loadMusic(musicList[currentIndex])
}

$('.music-panel .timebar').onclick = function(e){
  var percent = e.offsetX / parseInt(getComputedStyle(this).width)
  audioObj.currentTime = audioObj.duration * percent
}


audioObj.onpause = function(){
  clearInterval(clock)
}


audioObj.onended = function(){
  currentIndex = (++currentIndex)%musicList.length
  loadMusic(musicList[currentIndex])
}


$('.list-panel').addEventListener('click',function(e){
  e.stopPropagation()
  var listItems = $('.list-panel').getElementsByTagName('li')
  var listIndex = [].indexOf.call(listItems,e.target)
  loadMusic(musicList[listIndex])
})



function $(selector){
  return document.querySelector(selector)
}

function getMusicList(callback){
  var xhr =new XMLHttpRequest()
  xhr.open('GET', 'https://starkjx.github.io/musicPlayer/music.json', true)
  xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status <300) || xhr.status === 304){
      callback(JSON.parse(this.responseText))
    }else{
      console.log('获取失败')
    }
  }
  xhr.onerror = function(){
    console.log('网络异常')
  }
  xhr.send()
}

function loadMusic(musicObj){
  console.log('playing', musicObj)
  $('.musicbox .title').innerText = musicObj.title
  $('.musicbox .author').innerText = musicObj.author
  $('.cover').style.backgroundImage = 'url(' + musicObj.img +')'
  audioObj.src = musicObj.src
}

function gengeateList(list){
  list.forEach(function(elem){
    var li = document.createElement('li')
    li.innerText = elem.title
    $('.list-panel').appendChild(li)
  })
}