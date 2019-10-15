class BallGame {
    constructor(quantity, speed, radius){
        this.ballCount = quantity;
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ballRadius = radius;
        this.GAME_HEIGHT = this.canvas.height;
        this.GAME_WIDTH = this.canvas.width;
        this.ballX = [];
        this.ballY = [];
        this.ballDx = [];
        this.ballDy = [];
        this.balls = [];
        // this.FPS = 60;
        // this.frameLimit = 1000 / this.FPS;
        this.frameLimit = speed;
        this.removeIndex = null;
    }
    

    init = () =>{
        this.getBallCordinates();
        while (this.checkCollision() == true) this.getBallCordinates();
        
        for (var i=0; i<this.ballCount; i++){
            this.drawBall(this.ballX[i], this.ballY[i], i);
        }

        this.checkCollision()

        for (var i=0; i<this.ballCount; i++){
            setInterval(this.move, 100);
        }

        // var elemLeft = this.canvas.offsetLeft;
        // var elemTop = this.canvas.offsetTop;
        // this.canvas.addEventListener('click',(event)=>{
        //     var x = event.pageX - elemLeft;
        //     var y = event.pageY - elemTop;
        //     var circleAx, circleAy, difx, dify, distance;

        //     for (var i=0; i<this.ballCount; i++){
        //         circleAx = this.ballX[i];
        //         circleAy = this.ballY[i];
        //         difx = circleAx - x;
        //         dify = circleAy - y;
        //         distance = Math.sqrt(difx * difx + dify * dify);
        //         if (distance < this.ballRadius*2 ) this.removeIndex = i;
        //     }

        //     if (this.removeIndex !== null) {
        //         console.log(this.removeIndex)
        //         this.ballCount -= 1;
        //         this.ballX.splice(this.removeIndex, 1);
        //         this.ballY.splice(this.removeIndex, 1);
        //         this.ballDx.splice(this.removeIndex, 1);
        //         this.ballDy.splice(this.removeIndex, 1);
        //         this.removeIndex = null;
        //     }
        // })

    }

    
    getBallCordinates = () =>{
        for (var i=0; i<this.ballCount; i++){
            this.ballX[i] = this.getRandomInt(0, this.GAME_WIDTH);
            while (this.ballX[i] < this.ballRadius*2) this.ballX[i] = this.getRandomInt(0, this.GAME_WIDTH);

            this.ballY[i] = this.getRandomInt(0, this.GAME_HEIGHT);
            while (this.ballY[i] - this.ballRadius < 0 || this.ballY[i] + this.ballRadius > this.GAME_HEIGHT) this.ballY[i] = this.getRandomInt(0, this.GAME_HEIGHT);

            var rand1 = this.getRandomInt (0, 100);
            this.ballDx[i] = rand1 > 50 ? this.frameLimit : -1 * this.frameLimit;

            var rand2 = this.getRandomInt (0, 100);
            this.ballDy[i] = rand2 > 50 ? this.frameLimit : -1 * this.frameLimit;
        }
    }


    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }


    drawBall = (x, y, i) => {
        this.ctx.beginPath();
        this.balls[i] = this.ctx.arc(x, y, this.ballRadius, 0, Math.PI*2);
        this.balls[i]
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    move = () =>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(var i = 0; i<this.ballCount; i++){
            var x = this.ballX[i];
            var y = this.ballY[i];
            var dx = this.ballDx[i];
            var dy = this.ballDy[i];

            if (x + dx > this.canvas.width - this.ballRadius || x + dx < this.ballRadius){
                this.ballDx[i] = -1 * this.ballDx[i];
            }
            if (y + dy > this.canvas.height - this.ballRadius || y + dy < this.ballRadius){
                this.ballDy[i] = -1 * this.ballDy[i];
            }
            this.ballX[i] += this.ballDx[i];
            this.ballY[i] += this.ballDy[i];
            this.drawBall(this.ballX[i], this.ballY[i], i);
        }
        this.checkCollision();
    }


    checkCollision = () =>{
        var circleAx, circleBx, circleAy, circleBy, difx, dify, distance
        for (var i=0; i<this.ballCount; i++){
            circleAx = this.ballX[i];
            circleAy = this.ballY[i];

            for (var j=i+1; j<this.ballCount; j++){
                circleBx = this.ballX[j];
                circleBy = this.ballY[j];

                difx = circleAx - circleBx;
                dify = circleAy - circleBy;
                distance = Math.sqrt(difx * difx + dify * dify);

                if (distance < this.ballRadius*2 ){
                    this.ballDx[i] = -1 * this.ballDx[i];
                    this.ballDy[i] = -1 * this.ballDy[i];
                    this.ballDx[j] = -1 * this.ballDx[j];
                    this.ballDy[j] = -1 * this.ballDy[j];

                    return true;
                }
            }
        }
    }


}


// BallGame(ballCount, speed, radius)
// ballCount: any integer 
// speed: for better performance use a number between 0 and 1
// radius: radius of ball in pixels

var game = new BallGame(20, 1, 10)
game.init() 