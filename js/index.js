// Game Constants ans Variables : 


let inputDir = {x : 0, y : 0};
const pointSound = new Audio('point.wav');
const gameOverSound = new Audio('gameOver.wav');
const moveSound = new Audio('move.wav');
const musicSound = new Audio('music.mp3');

let speed = 9;
let score = 0;
let lastPaintTime = 0;

let snakeArray = [
    {x : 13, y : 15}
];

food = {x : 6, y : 7};


// Game Functions :

function main(ctime)         // currentTime
{       
    window.requestAnimationFrame(main);
    
   // console.log(ctime)
    
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake){
    
    // If snake Bump into Yourself;

    for(let i = 1; i < snakeArray.length; i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // if snake Bump into the Wall/border;

    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
    {
        return true;
    } 

     return false;

}
  
function gameEngine(){

    // Part 1 : Updating the Snake Array and Food;
    
    if(isCollide(snakeArray))
    {
        musicSound.pause();
        gameOverSound.play();
        scoreBox.innerHTML = "Score : 0";
        inputDir = {x : 0, y : 0};
        
       // musicSound.play();
        alert("Game Over. Press any key to Play Again!");
        snakeArray = [{x : 13, y : 15}];
        score = 0;
    }     

    // If snake gets the food, increment the score and regenerate the food;

    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x)
    {
        pointSound.play();
        
        score += 1;
        if(score > hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "Hi Score : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;


        snakeArray.unshift({x : snakeArray[0].x + inputDir.x, y : snakeArray[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b - a) * Math.random()), y : Math.round(a + (b - a) * Math.random())}
    }

    // Moving the Snake;

    for(let i = snakeArray.length - 2; i>= 0; i--)
    {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    // Part 2 : Display/Render the Snake and Food;

    //Display the Snake;

    board.innerHTML = "";

    // .forEach(element, index)
    snakeArray.forEach((e, index) => 
    {                    
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        } 
        
        else {
            snakeElement.classList.add('snake')
        }
        
        board.appendChild(snakeElement);
    });              

    // Display the Food;

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


// Main Logic starts here : 

//musicSound.play();

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else
{
    hiscoreval = JSON.parse(hiscore)
    hiScoreBox.innerHTML = "Hi Score : " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>
{   
    inputDir = {x : 0, y : 1}     // Start the Game;
   
    moveSound.play();
   
    switch(e.key)
    {       
        case "ArrowUp":             // basically inputDirection is nothing but the velocity
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});