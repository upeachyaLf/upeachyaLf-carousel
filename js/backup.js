
var wrapper = document.getElementsByClassName('wrapper')[0];
var imageLength = wrapper.children.length;
var imageWidth = wrapper.children[0].offsetWidth;
var imageCount = 0;
var marginLeft = 0;
var container = document.getElementsByClassName('container')[0];

function goNext() {
    if (imageCount == imageLength-1){
        imageCount = 0;
    }else{
        imageCount++;
    } 
    handleIndicator(imageCount)
    marginLeft = -(imageWidth * imageCount)
    wrapper.style.marginLeft = `${marginLeft}px`;
}

function goPrev(){
    if (imageCount !== 0){
        marginLeft = marginLeft + imageWidth;
        wrapper.style.marginLeft = `${marginLeft}px`;
        imageCount--;
    }else{
        imageCount = imageLength - 1;
        marginLeft = -(imageWidth * imageCount)
        wrapper.style.marginLeft = `${marginLeft}px`;
    }
    handleIndicator(imageCount)
}

var myTimer = setInterval(() => goNext(), 5000);
myTimer


// for controls
var prevButton = document.createElement('div')
prevButton.setAttribute('id', 'prev-button' )
prevButton.innerHTML='&lt;'

var nextButton = document.createElement('div')
nextButton.setAttribute('id', 'next-button')
nextButton.innerHTML='>'

container.append(prevButton);
container.append(nextButton);

nextButton.addEventListener('click', ()=>goNext())
prevButton.addEventListener('click', ()=>goPrev())



// for indicators
var indicators = document.createElement('ul')
indicators.setAttribute('id', 'indicators')

var indicatorsLi = ''

for (i=0; i<imageLength; i++){
    let index = i
    if (index == imageCount){
        indicatorsLi += `<li class="active" onclick="changeSlide(${index})"> </li>`
    }else{
        indicatorsLi += `<li onclick="changeSlide(${index})"> </li>`
    }
}
indicators.innerHTML=indicatorsLi
container.append(indicators)

function changeSlide(i){
    handleIndicator(i)
    imageCount=i
    marginLeft = -(imageWidth * i)
    wrapper.style.marginLeft = `${marginLeft}px`;
}

function handleIndicator(i){
    for (var j=0; j<imageLength; j++){
        indicators.children[j].classList.remove('active')
    }   
    indicators.children[i].setAttribute('class', 'active')
    clearInterval(myTimer);
    myTimer = setInterval(()=>goNext(), 2000);
}

function animate(){
    var FPS = 60;
    var frameLimit = 1000 / FPS
    setInterval(function(){
        
    }, frameLimit)
}