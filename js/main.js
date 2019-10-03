
var wrapper = document.getElementsByClassName('wrapper')[0];
var imageLength = wrapper.children.length;
var imageWidth = wrapper.children[0].offsetWidth;
var imageCount = 0;
var marginLeft = 0;
var container = document.getElementsByClassName('container')[0];
var FPS = 60;
var frameLimit = 1000 / FPS

function goNext() {
    if (imageCount == imageLength-1){
        imageCount = 0;
        animatePrev(0, 50)
    }else{
        imageCount++;
        var passMargin = -(imageWidth * imageCount);
        animateNext(passMargin, 20)
    } 
    handleIndicator(imageCount);
}

function animateNext(margin, pix){
    var nextAni =  
    setInterval(function(){
        marginLeft -= pix;
        wrapper.style.marginLeft = `${marginLeft}px`;
    }, frameLimit)

    setInterval(function(){
        if (marginLeft > margin){
            nextAni
        }else{
            clearInterval(nextAni)
        }
    }, frameLimit) 
}


function goPrev(){
    if (imageCount !== 0){
        var passMargin = marginLeft + imageWidth;
        animatePrev(passMargin, 20)
        imageCount--;
    }else{
        imageCount = imageLength - 1;
        var passMargin = -(imageWidth * imageCount);
        animateNext(passMargin, 50)
    }
    handleIndicator(imageCount)
}

function animatePrev(margin, pix){
    var prevAni =  
    setInterval(function(){
        marginLeft += pix;
        wrapper.style.marginLeft = `${marginLeft}px`;
    }, frameLimit)

    setInterval(function(){
        if (marginLeft < margin){
            prevAni
        }else{
            clearInterval(prevAni)
        }
    }, frameLimit) 
}

// for autoplay
var myTimer = setInterval(() => goNext(), 3000);
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
    myTimer = setInterval(()=>goNext(), 3000);
}
