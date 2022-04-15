/* Coded By https://github.com/msfpt */

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

var game_options = document.querySelectorAll('input[type="button"][game-option]');
var btn_reset = document.querySelector('#btn-reset');

chSetSession('user_x', 'User X');
chSetSession('user_o', 'User O');
chSetSession('turn', newTuen());
setRounder();

for (let i = 0; i < game_options.length; i++) {
    const game_option = game_options[i];
    game_option.addEventListener('click', (event) => {
        var this_option = event.srcElement;
        this_option.value = sessionStorage.getItem('turn');
        sessionStorage.setItem('turn', (sessionStorage.getItem('turn') == 'O' ? 'X' : 'O'));
        setRounder();
        btn_reset.style.display = 'inline-block';
        this_option.disabled = true;
        chGame();
    });
}

function chGame() {
    let values = [];

    for (let i = 0; i < game_options.length; i++) {
        const game_option = game_options[i];
        values[i  + 1] = game_option.value.trim().toLowerCase();
    }
    let status = values.join('').length > 8; // or ... >= 9

    const checker = (round) => {
        var round = round.toLowerCase();
        if (
            (values[1] == round && values[2] == round && values[3] == round) // (—) 1 = 2 = 3
         || (values[4] == round && values[5] == round && values[6] == round) // (—) 4 = 5 = 6
         || (values[7] == round && values[8] == round && values[9] == round) // (—) 7 = 8 = 9
         || (values[1] == round && values[4] == round && values[7] == round) // (|) 1 = 4 = 7
         || (values[2] == round && values[5] == round && values[8] == round) // (|) 2 = 5 = 8
         || (values[3] == round && values[6] == round && values[9] == round) // (|) 3 = 6 = 9
         || (values[1] == round && values[5] == round && values[9] == round) // (\) 1 = 5 = 9
         || (values[3] == round && values[5] == round && values[7] == round) // (/) 3 = 5 = 7
        ) { return true; }
        else { return false; }
    }

    if (checker('x')) {
        status = true
        msgBox(sessionStorage.getItem('user_x')+' is winner.', 'green');
    } else if (checker('o')) {
        status = true
        msgBox(sessionStorage.getItem('user_o')+' is winner.', 'green');
    } else {
        if (status) {
            msgBox('Severe equal.', 'blue');
        }
    }

    setTimeout(() => {
        if (status) {
            btn_reset.click();
        };
    }, 400);
}

var users_input = document.querySelectorAll('#edit-user-box input[type="text"]');

users_input[0].value = sessionStorage.getItem('user_x');
users_input[1].value = sessionStorage.getItem('user_o');

document.querySelector('#btn-edit-user').addEventListener('click', (event) => {
    users_input[0].value = sessionStorage.getItem('user_x');
    users_input[1].value = sessionStorage.getItem('user_o');
    document.querySelector('#edit-user-box').style.display = 'flex';
});

document.querySelector('#edit-user-box div input[type="button"]').addEventListener('click', (event) => {
    if (!(users_input[0].value.trim() == '' || users_input[1].value.trim() == '')) {
        sessionStorage.setItem('user_x', users_input[0].value);
        sessionStorage.setItem('user_o', users_input[1].value);
        setRounder()
        document.getElementById('edit-user-box').style.display = 'none';
    }
});

function setRounder () {
    var round_user = sessionStorage.getItem('turn') == 'O' ? 'user_o' : 'user_x';
    document.querySelector('#round span').innerText = sessionStorage.getItem(round_user)
}

function chSetSession(session, data) {
    if (!sessionStorage.getItem(session)) {
        sessionStorage.setItem(session, data);
    }
}

function newTuen() {
    var users_turn = ['X', 'O']
    var first_turn = users_turn[random(0, 2)]
    return first_turn
}

function msgBox(text,color) {
    let elmBox = document.createElement('section');
    elmBox.setAttribute('id', 'alert');
    elmBox.classList.add(color);
    elmBox.innerHTML = '<div><h2>' + text +'<h2><button class="btn" onclick="(event.srcElement.parentNode.parentNode.parentNode).remove()">OK</button></div>'
    document.body.appendChild(elmBox);

}

document.querySelector('#edit-user-box div .close').addEventListener('click', (event) => {
    document.getElementById('edit-user-box').style.display = 'none';
});

btn_reset.addEventListener('click', (event) => {
    for (let i = 0; i < game_options.length; i++) {
        const game_option = game_options[i];
        game_option.disabled = false;
        game_option.value = '';
        sessionStorage.setItem('turn', newTuen());
        setRounder()
    }
    event.srcElement.style.display = 'none';
});