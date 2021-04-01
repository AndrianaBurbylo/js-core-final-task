$(function(){
    sort();
    $(`.new-game`).on('click', function(){
        sort();
    })
    // function sort(){
    //     let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], rand, l = numbers.length;
    //     for(let i=1; i<=l; i++){
    //         rand = numbers[Math.floor(Math.random()*numbers.length)];
    //         $(`#left-block>div:nth-child(${i})`).css(`order`, rand);
    //         numbers.splice(numbers.indexOf(rand),1);
    //     }
    // };
    function sort(){
        let position = [
            [0,0], [0,75], [0,150], [0,225],
            [75,0], [75,75], [75,150], [75,225],
            [150,0], [150,75], [150,150], [150,225],
            [225,0], [225,75], [225,150], [225,225],
        ];
        let randomPosition, numberOfEl = 16;
        for(let i=1; i<=numberOfEl; i++){
            randomPosition = position[Math.floor(Math.random()*position.length)];
            $(`#left-block>div:nth-child(${i})`).css(`top`, `${randomPosition[0]}px`);
            $(`#left-block>div:nth-child(${i})`).css(`left`, `${randomPosition[1]}px`);
            position.splice(position.indexOf(randomPosition),1);
            // console.log(`top: ${randomPosition[0]}px, left: ${randomPosition[1]}px`);
        }
    };

    $(`.block`).sortable({
        connectWith: '#left-block, #right-block'
    });

    function timer(){
        let minutes = 1, seconds = 60, startTime;
        setTimeout(() => {
            minutes--;
        }, 1000);
        setInterval(() => {
            if(seconds>0){
                seconds--;
                startTime = $(`.timer h1`).text((minutes > 9 ? minutes: '0' + minutes) + 
                    ':' + (seconds > 9 ? seconds : '0' + seconds));
            }
        }, 1000);
    }
    $(`.start-game`).on('click', function(){
        $(`.start-game`).attr('disabled', true);
        $(`.check-result`).attr('disabled', false);
        timer();
    });
    
})