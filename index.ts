let _bsSave : BravelySecondSave = null;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('importedSave').addEventListener('change', function () {
        let fileInput = <HTMLInputElement>this;

        let reader = new FileReader();
        reader.onload = function () {
            let buffer = this.result as ArrayBuffer;
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

    document.getElementById('unlkdJobsLv10').addEventListener('click', function () {
        _bsSave.characters.tiz.masterUnlkdJobs();
        _bsSave.characters.magnolia.masterUnlkdJobs();
        _bsSave.characters.yew.masterUnlkdJobs();
        _bsSave.characters.edea.masterUnlkdJobs();
        writeInspirationalSpeech();
    });
    
    document.getElementById('unlkdJobsLv11').addEventListener('click', function () {
        _bsSave.characters.tiz.legendaryUnlkdJobs();
        _bsSave.characters.magnolia.legendaryUnlkdJobs();
        _bsSave.characters.yew.legendaryUnlkdJobs();
        _bsSave.characters.edea.legendaryUnlkdJobs();
        writeInspirationalSpeech();
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

    speech += 'TIZ: <ul>' + formatCharacterJp(_bsSave.characters.tiz) + '</ul>';
    speech += '<br/><br/>';
    speech += 'MAGNOLIA: <ul>' + formatCharacterJp(_bsSave.characters.magnolia) + '</ul>';
    speech += '<br/><br/>';
    speech += 'YEW: <ul>' + formatCharacterJp(_bsSave.characters.yew) + '</ul>';
    speech += '<br/><br/>';
    speech += 'EDEA: <ul>' + formatCharacterJp(_bsSave.characters.edea) + '</ul>';

    document.getElementById('inspiresConfidenceDoesntIt').innerHTML = speech;
    document.getElementById('inspiresConfidenceDoesntIt').style.display = "";
    document.getElementById('lessInpiration').style.display = "none";
}

function formatCharacterJp(character: BravelySecondSaveCharacter) {
    // Ordered by position on in-game menu
    let list = ``;
    
    for (let job in _bsSave.jobUnlocks)
    {
        // if (_bsSave.jobUnlocks[job] === true)
        // {
        //     list += `<li><b>${job}:</b> ${formatJobJp(character.jobMastery[job])}</li>`;
        // }
        list += `<li><b>${job}:</b> ${formatJobJp(character.jobMastery[job])}</li>`;
    }

    return list;
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



