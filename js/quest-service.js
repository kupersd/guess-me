const KEY = 'questDB'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    var questsTree = loadFromStorage(KEY)
    if (!questsTree) {

        questsTree = createQuest('Male?');

        questsTree.yes = createQuest('Gandhi');
        questsTree.no = createQuest('Rita');

    }

    gQuestsTree = questsTree;
    saveToStorage(KEY, gQuestsTree);
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function getCurrQuestTxt() {
    return gCurrQuest.txt;
}


function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // Updates the prev, curr global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Creates and Connects the 2 Quests to the quetsions tree
    gPrevQuest[lastRes] = {
        txt: newQuestTxt,
        yes: createQuest(newGuessTxt),
        no: gCurrQuest
    };
    saveToStorage(KEY, gQuestsTree)
}


