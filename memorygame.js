let savedquestion = [];
for(let z = 0; z<2;z++){
    for(let a = 1; a < 13; a++){
        savedquestion.push(a)
    }
}

const content = document.querySelector('.content')
for(let column = 1; column <= 4; column++ ){
    const createconatiner = document.createElement("div")
    createconatiner.classList.add('container')
    createconatiner.style.display = 'flex'
    content.appendChild(createconatiner)
    const containerresult = document.querySelectorAll('.container')[column-1]
    for(let rows = 1; rows <=6; rows++){
        const div = document.createElement('div');
        div.style.display = 'flex'
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'
        div.style.backgroundColor = 'beige'
        div.style.width = '100px'
        div.style.height = '100px'
        containerresult.appendChild(div)
    }
}

const question = savedquestion.sort(()=> 0.5 - Math.random());
for(let randomindex = 0; randomindex < question.length;randomindex++){
    const getdiv = document.querySelectorAll('div.container div')[randomindex];
    const textfordiv = document.createTextNode(question[randomindex])
    getdiv.appendChild(textfordiv)
}

const buttonforstart = document.createElement('button')
const textforbuttontostart = document.createTextNode('Start!')
buttonforstart.appendChild(textforbuttontostart)
content.appendChild(buttonforstart)
buttonforstart.style.width = '100px'
buttonforstart.style.height = '100px'

const resultfromthegame = document.createElement('h1')
const textresultfromthegame = document.createTextNode('Congratulations You Win!')
const gametitle = document.getElementsByClassName('gametitle')[0]
resultfromthegame.appendChild(textresultfromthegame)
const getresultfromthegame = document.getElementById('resultfromthegame')
const divincontainer = document.querySelectorAll('div.container div');
const getminutes = document.getElementById('minutes')
const getsecond = document.getElementById('second')
const buttonpalyagain = document.createElement('button')
const textforbuttonplayagain = document.createTextNode('Try again?')
buttonpalyagain.appendChild(textforbuttonplayagain)
let second = 00;
let minutes = 00;
let interval;
function TimerStart(){
    second++
    if(second <= 9){
        getsecond.innerHTML = "0" + second
    }
    if(second > 9){
        getsecond.innerHTML = second
    }
    if(second > 59){
        second = 0
        getsecond.innerHTML = "0"+second
        minutes++
        getminutes.innerHTML = "0" + minutes
    }
    if(minutes == 1){
        clearInterval(interval)
        for(let i = 0; i < divincontainer.length;i++){
            divincontainer[i].innerHTML = divincontainer[i].getAttribute('id')
        }
        resultfromthegame.innerHTML = 'You Lose!'
        getresultfromthegame.appendChild(resultfromthegame)
        gametitle.style.display='none'
        getresultfromthegame.appendChild(buttonpalyagain)
    }
}
buttonforstart.addEventListener('click',function(){
    for(let q = 0; q < divincontainer.length; q++){
        divincontainer[q].setAttribute('id',divincontainer[q].innerHTML)
        divincontainer[q].setAttribute('class','unpress')
        divincontainer[q].innerHTML = ''
        divincontainer[q].setAttribute('data-id','datake-'+q)
    }
    buttonforstart.style.display = 'none'
    var saved = []
    const unpressdiv = document.querySelectorAll('div.container div.unpress')
    for(let i = 0; i < unpressdiv.length; i++){
        divincontainer[i].addEventListener('click',function(e){
            e.target.classList.toggle('kepencet')
            if(e.target.classList.contains('pressed') == false){
                if(e.target.classList.contains('kepencet') == true){
                    e.target.innerHTML = e.target.getAttribute('id')
                }
                else{
                    e.target.innerHTML = ''
                }
                saved.push(e.target)
                console.log(saved)
                if(saved.length == 2){
                    if(saved[0].getAttribute('id') == saved[1].getAttribute('id')){
                        if(saved[0].getAttribute('data-id') != saved[1].getAttribute('data-id')){
                            console.log('kamu benar')
                            saved[0].classList.replace('unpress','pressed')
                            saved[1].classList.replace('unpress','pressed')
                            saved = []
                            console.log(saved)
                            scoreresult += 10
                            score.innerHTML = 'Score : ' + scoreresult
                            stepresult += 1
                            step.innerHTML = 'Step : ' + stepresult
                            if(scoreresult == 120){
                                getresultfromthegame.appendChild(resultfromthegame)
                                clearInterval(interval)
                                gametitle.style.display = 'none'
                                getresultfromthegame.appendChild(buttonpalyagain)
                            }
                        }
                        else{
                            console.log('kamu memencet tombol yang sama')
                            saved = []
                            console.log(saved)
                        }
                    }
                    else{
                        console.log('beda')
                        console.log(saved)
                        setTimeout(function(){
                            saved[0].innerHTML =''
                            saved[1].innerHTML = ''
                            saved[0].classList.remove('kepencet')
                            saved[1].classList.remove('kepencet')
                            saved = []
                            console.log(saved)
                        },200)
                        stepresult += 1
                        step.innerHTML = 'Step : ' + stepresult
                    }
                }
            }
        })
    }
    interval = setInterval(TimerStart,1000)
})

const score = document.createElement('h1');
const textforscore = document.createTextNode('Score : 0')
score.appendChild(textforscore);
content.appendChild(score);
let scoreresult = 0;

const step = document.createElement('h1');
const steptext = document.createTextNode('Step : 0')
step.appendChild(steptext);
content.appendChild(step);
let stepresult = 0;

buttonpalyagain.addEventListener('click',function(){
    window.location.href = "memorygame.html";  
})