'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

jQuery(function () {
    init()
    console.log('Let the game begin.....')
});

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // Hides the game-start section
    $('.game-start').hide();
    renderQuest();
    // Shows the quest section
    $('.quest').show();
}

function renderQuest() {
    // Selects the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(getCurrQuestTxt())
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            // Hides and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();

        }
    } else {
        // Updates the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    var newGuessTxt = $('input[name=newGuess]').val()
    var newQuestTxt = $('input[name=newQuest]').val()
    // TODO: Call the service addGuess
    addGuess(newQuestTxt, newGuessTxt, gLastRes)
    $('input[name=newGuess]').val('')
    $('input[name=newQuest]').val('')
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    init();
    gLastRes = null;
}

