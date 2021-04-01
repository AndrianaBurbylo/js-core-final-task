$(function(){
    sort();
    $(`.timer h1`).text(`01:00`);
    let result = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
    let check = true;
    let startClick = false;
    let checkDone = false;
    $(`.modal-body span`).text(`${$(`.timer h1`).text()}`);

    // Кнопка Start game
    $(`.start-game`).on('click', function(){
        $(`.start-game`).attr('disabled', true);
        $(`.check-result`).attr('disabled', false);
        startClick = true;
        timer(1,60);
    });

    // Кнопка New game
    $(`.new-game`).on('click', function(){
        if(!startClick){
            sort();
            $(`.start-game`).attr('disabled', false);
            $(`.check-result`).attr('disabled', true);
        }
        else{
            location.reload();
        }
    });

    // Кнопка Check в модальному вікні
    $(`.modal-check`).on('click', function(){
        if(!checkDone){
            checkResult();
            checkDone = true;
        }
        else{
            location.reload();
        }
    });
    // Кнопка Close в модальному вікні
    $(`.modal-close`).on('click', function(){
        if(checkDone){
            location.reload();
        }
    });

    // SORTABLE
    $(`#left-block, #right-block`).sortable({
        connectWith: '.block',
        containment: 'window'
    });
    $(`#left-block`).one('mouseup', function(){
        if(!startClick){
            $(`#left-block, #right-block`).sortable("option", "change", timer(1,60));
            $(`.start-game`).attr('disabled', true);
            $(`.check-result`).attr('disabled', false);
            startClick = true;
        }
    })
    // SORTABLE

    // Початок функції сортування
    function sort(){
        let parent = $("#left-block");
        let divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    }
    // Кінець функції сортування

    // Початок функції таймеру
    function timer(minutes, seconds){
        setTimeout(() => {
            minutes--;
        }, 1000);
        setInterval(() => {
            if(seconds>0){
                seconds--;
                $(`.timer h1`).text((minutes > 9 ? minutes: '0' + minutes) + 
                    ':' + (seconds > 9 ? seconds : '0' + seconds));
                $(`.modal-body span`).text((minutes > 9 ? minutes: '0' + minutes) + 
                ':' + (seconds > 9 ? seconds : '0' + seconds));
            }
            else if(seconds==0){
                $(`.start-game`).attr('disabled', false);
                $(`.check-result`).attr('disabled', true);
                checkResult();
                $(`#exampleModal`).modal('show');
            }
        }, 1000);
    }
    // Кінець функції таймеру

    // Початок функції перевірки результату
    function checkResult(){
        for(let i=0; i<16; i++){
            if($('#right-block div').eq(i).attr('id') != result[i]){
                check = false;
                break;
            }
        }
        if(check){
            $(`.modal-body p:nth-child(2)`).removeClass(`hide`);
            $(`.modal-body p:nth-child(1)`).addClass(`hide`);
            checkDone = true;
        }
        else{
            $(`.modal-body p:nth-child(3)`).removeClass(`hide`);
            $(`.modal-body p:nth-child(1)`).addClass(`hide`);
            checkDone = true;
        }
        check = true;
    }
    // Кінець функції перевірки результату

})