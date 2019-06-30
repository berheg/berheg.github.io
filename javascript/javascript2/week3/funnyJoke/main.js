function jokeCreator(shouldTellFunnyJoke,logFunnyJoke,logBadJoke){
    if(shouldTellFunnyJoke){
        logFunnyJoke();
    }else{
        logBadJoke();
    }
}
function logFunnyJoke(){
    console.log('My boss told me to have a good day.. so I went home.')
}
function logBadJoke(){
    console.log('No bad joke for today and stay good!')
}