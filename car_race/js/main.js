class CarRacing {
    constructor() {
        this.FPS = 200;
        this.frameLimit = 1000 / this.FPS;

        this.backgroundWrapper = document.getElementById('background-wrapper');
        this.backgroundPosition = -1038;

        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.cars = [];
        this.yPos = [];
        this.xPos = [];
        this.carCount = 0;

        this.score = 0;
        this.scoreBoard = document.getElementById('score');

        this.carPositionCordinate = {
            laneOne: 30,
            laneTwo:110,
            laneThree:190
        }

        this.playerPosition = this.carPositionCordinate.laneTwo;
        this.playerCar;
        this.removeIndex = null;
        this.playerPositionY = this.canvas.height - 62;
        this.collision = false;

        this.thumbImg = document.createElement('img');
        this.thumbImg.src = './images/other-car.png';
        this.thumbImg2 = document.createElement('img');
        this.thumbImg2.src = './images/player-car.png';
    }

    _movingCarSetup = () =>{
        // this._generatePlayerCar();
        if (this.collision == false){
            this._moveCar();
            this._checkScore();
            this._checkCollision();
            this._removeCar();
        }
        this._generatePlayerCar();
    }

    _init = () =>{
        this._moveBackground();
        this.thumbImg.onload = () =>{
            this.thumbImg2.onload = () =>{
                var buttonStart = document.getElementById('start-button')
                buttonStart.addEventListener('click', ()=> {
                    buttonStart.style.display = 'none';
                    this._generateCars();
                    this._generatePlayerCar();
                    this._movePlayerPosition();
                    setInterval(this._generateCars, 1000);
                    setInterval(this._movingCarSetup, this.frameLimit);
                });
            }
        }
    }

    _removeCar = ( ) =>{
        if (this.removeIndex !== null){
            this.carCount -= 1;
            this.xPos.splice(this.removeIndex, 1);
            this.yPos.splice(this.removeIndex, 1);
            this.cars.splice(this.removeIndex, 1);
            this.removeIndex = null;
        }
    }

    _generateCars = () =>{
        this.xPos[this.carCount] = this._generateCarPosition();
        this.yPos[this.carCount] = -70;
        this._drawCar(this.xPos[this.carCount], this.yPos[this.carCount]);
        this.carCount += 1;
    }

    _moveBackground = () => {
        var _moveAniCode = () => {
            this.backgroundPosition += 1;
            this.backgroundWrapper.style.backgroundPositionY = `${this.backgroundPosition}px`;
        }
        var _moveAni = () => {
            if (this.collision == false) _moveAniCode();
        }

        var _checkEnd = () => {
            if (this.backgroundPosition < 0 ){
                _moveAni
            }else{
                this.backgroundPosition = -1038;
                this.backgroundWrapper.style.backgroundPositionY = `${this.backgroundPosition}px`;
            }
        }
        setInterval(function(){
            _checkEnd();
            _moveAni();
        }, this.frameLimit) 
    }

    _getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.ceil(Math.random() * (max - min)) + min; 
    }

    _generateCarPosition = () =>{
        var rand = this._getRandomInt(0, 3);
        if (rand == 1) return this.carPositionCordinate.laneOne;
        if (rand == 2) return this.carPositionCordinate.laneTwo;
        if (rand == 3) return this.carPositionCordinate.laneThree;
    }

    _drawCar = (x, y, i) => {
        this.cars[i] = this.ctx.drawImage(this.thumbImg, x, y, 40, 60);
        this.cars[i];
    }

    _moveCar = () =>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i=0; i<this.carCount; i++){
            this.yPos[i] += 1;
            this._drawCar(this.xPos[i], this.yPos[i], 0);
        }
    }

    _checkScore = () =>{
        for (var i=0; i<this.carCount; i++){
            if (this.yPos[i] > 400) {
                this.score += 1;
                this.scoreBoard.innerHTML = 'Your Score: ' + this.score;
                this.removeIndex = i;
            }
        }
    }

    _generatePlayerCar = () =>{
        this.playerCar = this.ctx.drawImage(this.thumbImg2, this.playerPosition, this.playerPositionY, 40, 60);
        this.playerCar;
    }

    _movePlayerPosition = () =>{
        document.onkeydown = (e) => {
            if (this.collision == false) {
                switch (e.keyCode) {
                    case 37:
                        if (this.playerPosition == this.carPositionCordinate.laneTwo) this.playerPosition = this.carPositionCordinate.laneOne;
                        if (this.playerPosition == this.carPositionCordinate.laneThree) this.playerPosition = this.carPositionCordinate.laneTwo;
                        break;

                    case 39:
                        if (this.playerPosition == this.carPositionCordinate.laneTwo) this.playerPosition = this.carPositionCordinate.laneThree;
                        if (this.playerPosition == this.carPositionCordinate.laneOne) this.playerPosition = this.carPositionCordinate.laneTwo;
                        break;
                }
            }
        };
    }

    _checkCollision = () =>{
        for (var i=0; i<this.carCount; i++){
            if (this.xPos[i] < this.playerPosition + 40 &&
                this.xPos[i] + 40 > this.playerPosition &&
                this.yPos[i] < this.playerPositionY + 60 &&
                this.yPos[i] + 60 > this.playerPositionY) {
                this.collision = true;
                var overText = document.getElementById('game-over');
                overText.append(this.scoreBoard);
                overText.style.display = 'block';

                return true;
            }

            return false;
        }
    }

}


var game = new CarRacing();
game._init();







