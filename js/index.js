var currentIndex = 1
var audioObj = new Audio()
audioObj.autoplay = true
audioObj.shoudUpdate = true

getMusicList(function(list){
  loadMusic(list[currentIndex])
})

audioObj.ontimeupdate = function(){
  var _this = this
  if(_this.shoudUpdate){
    console.log(_this.currentTime)
    $('.musicbox .progress-now').style.width = (_this.currentTime/_this.duration) *100 + '%'
    var min = Math.floor(_this.currentTime/60)
    var sec = Math.floor(_this.currentTime%60) + ''
    sec = sec.length ===2? sec : '0' + sec
    $('.musicbox .current-time').innerText = min + ':' + sec
    _this.shoudUpdate = false
    setTimeout(function(){
      _this.shoudUpdate = true
    },1000)
  }
}


function $(selector){
  return document.querySelector(selector)
}

function getMusicList(callback){
  var xhr =new XMLHttpRequest()
  xhr.open('GET', 'https://starkjx.github.io/musicPlayer/music.json', true)
  xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status <300) || xhr.status === 304){
      console.log(JSON.parse(this.responseText))
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
  audioObj.src = musicObj.src
}