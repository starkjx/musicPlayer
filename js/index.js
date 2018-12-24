function getMusicList(callback){
  var xhr =new XMLHttpRequest()
  xhr.open('GET', 'https://starkjx.github.io/musicPlayer/music.json', true)
  xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status <300) || xhr.status === 304){
      console.log(this.responseText)
      callback(JSON.parse(this.responseText))
    }
    else{
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
  audio.src = musicObj.src;
  console.log(audio.src);
  console.log(audio.autoplay);
}

var currentIndex = 0
var audio = new Audio()
audio.autoplay = true

getMusicList(function(list){
  loadMusic(list[currentIndex])
})


