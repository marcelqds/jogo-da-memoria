//setInterval(()=>{document.location.reload(true);},3000);
let listToMemory =  [ 'Sorte', 'Ética','Conhecimento', 'Sucesso', 'Caráter', 'Dignidade', 'Aprendizado', 'Luta', 'Humor', 'Felicidade', 'Vitória', 'Virtude', 'Humildade','Compaixão'];

let listToPlay = [];
let totalCards = 12;
let attempts = 0;
let pairs = 0;
let points = 0;
let firstCard, secondCard;


start();

function start(){
    resetGame();
    activeCards();
    selectWords();
    console.log(listToPlay);
}

function activeCards(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        unflip(card);
        card.addEventListener('click',flipCard);
        card.addEventListener('keypress',flipCard);
    });
}

function resetGame(){
    clearList();
    pairs = 0;
    points = 0;
}

function checkEndGame(){
    if(pairs == (totalCards / 2)){
        console.log("Fim do Jogo");
        alert('Final do Jogo!!');
    }
}

function resetBoard(){
    firstCard = secondCard = null;
}

function flipCard(e) {
    const {type, charCode} = e;    
    if(type != 'click' && 
    !(type == 'keypress' && 
    (charCode == 13 || charCode == 32)))return;

    if( this === firstCard || 
        this === secondCard || 
        (firstCard && secondCard)
    ) return;

    this.classList.add('flip');
    if(!firstCard){
        firstCard = this;
        return;
    }
     
    secondCard = this;
    checkForMath();
    return;
}

function checkForMath(){    
    firstIndex = parseInt(firstCard.children[0].firstChild.nodeValue) - 1;
    secondIndex = parseInt(secondCard.children[0].firstChild.nodeValue) - 1;

    if(listToPlay[firstIndex] === listToPlay[secondIndex]){
        ++pairs;
        checkEndGame();
        disableCards();
        return;
    }
    unflipCards();    
}

function unflipCards(){
    setTimeout(() => {
        //firstCard.classList.remove('flip');
        //secondCard.classList.remove('flip');
        unflip(firstCard);
        unflip(secondCard);
        resetBoard();
    },1500);
}

function unflip(card){
    card.classList.remove('flip');
}

function disableCards(){
    disabledCard(firstCard);
    disabledCard(secondCard);
    resetBoard();
}

function disabledCard(card){
    card.removeEventListener('click',flipCard);
    card.removeEventListener('keypress',flipCard);
}

function selectWords(){
   let listSelect = [];
    while(listSelect.length < 6){
       let numberSelect = Math.ceil(Math.random() * listToMemory.length)-1;
       if(listSelect.includes(numberSelect))continue;

       listSelect.push(numberSelect);
       mountListToPlay(numberSelect);
    } 
}

function mountListToPlay(indexWord){
    let word = listToMemory[indexWord];
    let i = 0;
    while(i < 2){
        let numberGenerate = Math.ceil(Math.random() * totalCards) -1;
        if(!(listToPlay[numberGenerate] === null))continue;

        listToPlay[numberGenerate] = word;
        ++i;
    }    
}

function clearList(){
    Array.from({length: 12},(_,key)=>{
        listToPlay[key] = null;
    });
}

