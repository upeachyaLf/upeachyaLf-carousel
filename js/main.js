var FPS = 60;
var frameLimit = 1000 / FPS;

var elementCount = document.getElementsByClassName('carousel-container').length;

for (var j=0; j<elementCount; j++){
    var element = document.getElementsByClassName('carousel-container')[j];
    createCarousel (element, 2000)
}

function createCarousel (container, timer) {
    console.log(container)
    var wrapper = container.children[0];
    var imageLength = wrapper.children.length;
    var imageWidth = wrapper.children[0].offsetWidth;
    var imageCount = 0;
    var marginLeft = 0;
    
    // for autoplay
    var myTimer = setInterval(() => goNext(), timer);
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

    for (i=0; i<imageLength; i++){
        let index = i
        var newLi = document.createElement('li');
        newLi.addEventListener('click', ()=> changeSlide(index));
        if (index == imageCount) newLi.setAttribute('class', 'active');
        indicators.appendChild(newLi)
    }
    container.append(indicators)


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
        myTimer = setInterval(()=>goNext(), timer);
    }

}

