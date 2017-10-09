let _bsSave : BravelySecondSave = null;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('importedSave').addEventListener('change', function () {
        let fileInput = <HTMLInputElement>this;

        let reader = new FileReader();
        reader.onload = function () {
            let buffer = this.result;
            let array = new Uint8Array(buffer);
            let binaryReader = new BinaryFileReader(array);
            _bsSave = new BravelySecondSave(binaryReader);
            writeInspirationalSpeech();
        };

        if (fileInput.files && fileInput.files.length > 0) {
            reader.readAsArrayBuffer(fileInput.files[0]);
        } else {
            alert('No file is selected');
        }
    });

    document.getElementById('allJobsLv10').addEventListener('click', function () {
        _bsSave.characters.tiz.masterAllJobs();
        _bsSave.characters.magnolia.masterAllJobs();
        _bsSave.characters.yew.masterAllJobs();
        _bsSave.characters.edea.masterAllJobs();
        writeInspirationalSpeech();
    });

    document.getElementById('allJobsLv11').addEventListener('click', function () {
        _bsSave.characters.tiz.legendaryAllJobs();
        _bsSave.characters.magnolia.legendaryAllJobs();
        _bsSave.characters.yew.legendaryAllJobs();
        _bsSave.characters.edea.legendaryAllJobs();
        writeInspirationalSpeech();
    });

    document.getElementById('unlockAllJobs').addEventListener('click', function () {
        _bsSave.unlockAllJobs();
        alert('All jobs unlocked!');
    });

    document.getElementById('saveChanges').addEventListener('click', function () {
        _bsSave.commit();
        let fileInput = <HTMLInputElement>document.getElementById('importedSave');
        let filename = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0].name : '';
        _bsSave.download(filename);
    });

});

function writeInspirationalSpeech() {
    let speech = '';

    speech += 'TIZ: ' + formatCharacterJp(_bsSave.characters.tiz);
    speech += '<br /><br />';
    speech += 'MAGNOLIA: ' + formatCharacterJp(_bsSave.characters.magnolia);
    speech += '<br /><br />';
    speech += 'YEW: ' + formatCharacterJp(_bsSave.characters.yew);
    speech += '<br /><br />';
    speech += 'EDEA: ' + formatCharacterJp(_bsSave.characters.edea);

    document.getElementById('inspiresConfidenceDoesntIt').innerHTML = speech;
}

function formatCharacterJp(character: BravelySecondSaveCharacter) {
    // Ordered by position on in-game menu
    let list = [
        `<b>freelancer:</b> ${formatJobJp(character.jobMastery.freelancer)}`,
        `<b>wizard:</b> ${formatJobJp(character.jobMastery.wizard)}`,
        `<b>charioteer:</b> ${formatJobJp(character.jobMastery.charioteer)}`,
        `<b>fencer:</b> ${formatJobJp(character.jobMastery.fencer)}`,
        `<b>bishop:</b> ${formatJobJp(character.jobMastery.bishop)}`,
        `<b>astrologian:</b> ${formatJobJp(character.jobMastery.astrologian)}`,
        `<b>catmancer:</b> ${formatJobJp(character.jobMastery.catmancer)}`,
        `<b>redmage:</b> ${formatJobJp(character.jobMastery.redmage)}`,
        `<b>thief:</b> ${formatJobJp(character.jobMastery.thief)}`,
        `<b>swordmaster:</b> ${formatJobJp(character.jobMastery.swordmaster)}`,
        `<b>summoner:</b> ${formatJobJp(character.jobMastery.summoner)}`,
        `<b>hawkeye:</b> ${formatJobJp(character.jobMastery.hawkeye)}`,
        `<b>patissier:</b> ${formatJobJp(character.jobMastery.patissier)}`,
        `<b>whitemage:</b> ${formatJobJp(character.jobMastery.whitemage)}`,
        `<b>merchant:</b> ${formatJobJp(character.jobMastery.merchant)}`,
        `<b>blackmage:</b> ${formatJobJp(character.jobMastery.blackmage)}`,
        `<b>ranger:</b> ${formatJobJp(character.jobMastery.ranger)}`,
        `<b>knight:</b> ${formatJobJp(character.jobMastery.knight)}`,
        `<b>ninja:</b> ${formatJobJp(character.jobMastery.ninja)}`,
        `<b>exorcist:</b> ${formatJobJp(character.jobMastery.exorcist)}`,
        `<b>monk:</b> ${formatJobJp(character.jobMastery.monk)}`,
        `<b>valkyrie:</b> ${formatJobJp(character.jobMastery.valkyrie)}`,
        `<b>pirate:</b> ${formatJobJp(character.jobMastery.pirate)}`,
        `<b>performer:</b> ${formatJobJp(character.jobMastery.performer)}`,
        `<b>timemage:</b> ${formatJobJp(character.jobMastery.timemage)}`,
        `<b>darkknight:</b> ${formatJobJp(character.jobMastery.darkknight)}`,
        `<b>guardian:</b> ${formatJobJp(character.jobMastery.guardian)}`,
        `<b>templar:</b> ${formatJobJp(character.jobMastery.templar)}`,
        `<b>kaiser:</b> ${formatJobJp(character.jobMastery.kaiser)}`,
        `<b>yokai:</b> ${formatJobJp(character.jobMastery.yokai)}`,
    ];
    return list.join(' / ');
}

function formatJobJp(jp) {
    let level = 0;
    let curJp = 0;
    let needJp = 0;

    if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level11) {
        level = 11;
        curJp = jp;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level11;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level10) {
        level = 10;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level10;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level11 - BravelySecondSaveCharacter.JP_LEVELS.level10;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level9) {
        level = 9;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level9;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level10 - BravelySecondSaveCharacter.JP_LEVELS.level9;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level8) {
        level = 8;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level8;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level9 - BravelySecondSaveCharacter.JP_LEVELS.level8;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level7) {
        level = 7;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level7;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level8 - BravelySecondSaveCharacter.JP_LEVELS.level7;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level6) {
        level = 6;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level6;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level7 - BravelySecondSaveCharacter.JP_LEVELS.level6;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level5) {
        level = 5;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level5;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level6 - BravelySecondSaveCharacter.JP_LEVELS.level5;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level4) {
        level = 4;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level4;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level5 - BravelySecondSaveCharacter.JP_LEVELS.level4;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level3) {
        level = 3;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level3;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level4 - BravelySecondSaveCharacter.JP_LEVELS.level3;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level2) {
        level = 2;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level2;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level3 - BravelySecondSaveCharacter.JP_LEVELS.level2;
    } else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level1) {
        level = 1;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level1;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level2 - BravelySecondSaveCharacter.JP_LEVELS.level1;
    }

    return `Lv ${level} - ${curJp}/${needJp}`;
}



