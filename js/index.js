var xhr = XMLHttpRequest()
xhr.open('GET', '/music.json', true)
xhr.onload = function(){
  if((xhr.status >= 200 && xhr.status <300) || xhr.status === 304){
    console.log(this.resposeText)
  }
  else{
    console.log('获取失败')
  }
  xhr.onerror = function(){
    console.log('网络异常')
  }
}
xhr.send();