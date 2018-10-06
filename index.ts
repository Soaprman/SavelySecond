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

    document.getElementById('resetJobLvl').addEventListener('click', function () {
        _bsSave.characters.tiz.resetJobs();
        _bsSave.characters.magnolia.resetJobs();
        _bsSave.characters.yew.resetJobs();
        _bsSave.characters.edea.resetJobs();
        writeInspirationalSpeech();
    });
    
    document.getElementById('unlockedJobsLv10').addEventListener('click', function () {
        _bsSave.characters.tiz.masterUnlockedJobs();
        _bsSave.characters.magnolia.masterUnlockedJobs();
        _bsSave.characters.yew.masterUnlockedJobs();
        _bsSave.characters.edea.masterUnlockedJobs();
        writeInspirationalSpeech();
    });
    
    document.getElementById('unlockedJobsLv11').addEventListener('click', function () {
        _bsSave.characters.tiz.legendaryUnlockedJobs();
        _bsSave.characters.magnolia.legendaryUnlockedJobs();
        _bsSave.characters.yew.legendaryUnlockedJobs();
        _bsSave.characters.edea.legendaryUnlockedJobs();
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

    speech += `<table class="charTable"><tr><th colspan="5">Tiz</th></tr><tr><th>Job</th><th>Level</th><th>JP</th><th>Level Up!</th></tr>`;
    speech += formatCharacterJp(_bsSave.characters.tiz);
    speech += `</table>`;

    speech += `<table class="charTable"><tr><th colspan="5">Magnolia</th></tr><tr><th>Job</th><th>Level</th><th>JP</th><th>Level Up!</th></tr>`;
    speech += formatCharacterJp(_bsSave.characters.magnolia);
    speech += `</table>`;

    speech += `<table class="charTable"><tr><th colspan="5">Yew</th></tr><tr><th>Job</th><th>Level</th><th>JP</th><th>Level Up!</th></tr>`;
    speech += formatCharacterJp(_bsSave.characters.yew);
    speech += `</table>`;

    speech += `<table class="charTable"><tr><th colspan="5">Edea</th></tr><tr><th>Job</th><th>Level</th><th>JP</th><th>Level Up!</th></tr>`;
    speech += formatCharacterJp(_bsSave.characters.edea);
    speech += `</table>`;

    speech += `<table class="unlockTable"><tr><th colspan="2">Locked Jobs</th></tr>`;
    speech += formatJobs(_bsSave.jobUnlocks);
    speech += `</table>`;

    document.getElementById('inspiresConfidenceDoesntIt').innerHTML = speech;
    document.getElementById('inspiresConfidenceDoesntIt').style.display = "";
    document.getElementById('lessInpiration').style.display = "none";

    reattachEvents();
}

function formatCharacterJp(character: BravelySecondSaveCharacter) {
    // Ordered by position on in-game menu
    let list = ``;
    
    for (let job in _bsSave.jobUnlocks)
    {
        if (_bsSave.jobUnlocks[job] === true)
        {
            let jobMas = formatJobJp(character.jobMastery[job]);
            list += `<tr><td class="jobCell"><b>${job}</b></td>`
            let tinyMas;
            list += `<td class="lvlCell">${jobMas["level"]}</td><td class="jpCell">${jobMas["curJp"]}/${jobMas["needJp"]}</td><td>`;
            if (jobMas["level"] < 9)
            {
                list += `<button id="${job}_button1Up">+1</button>`;
                tinyMas = true;
            }
            if (jobMas["level"] <= 9)
            {
                if (tinyMas)
                {
                    list += `<button id="${job}_buttonMaster">Master</button>`;
                }
                else
                {
                    list += `<button id="${job}_buttonMaster" class="bigMaster">Master</button>`;
                }
            }
            if (jobMas["level"] == 10)
            {
                list += `<button id="${job}_buttonLegend">Legendary</button>`;
            }
            if (jobMas["level"] == 11)
            {
                list += `<span>Maxed Out</span>`;
            }
            list +=`</td></tr>`;
        }
    }

    return list;
}

function formatJobs(jobs) {
    let list = ``;
    
    for (let job in jobs)
    {
        if (jobs[job] === false)
        {
            list += `<tr><td>${job}</td><td><button id="${job}_buttonUnlock">Unlock?</button></td></tr>`;
        }
    }

    return list;
}

function reattachEvents() {
    // Level Up
    let buttons = document.querySelectorAll('[id$="_button1Up"]');
    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].addEventListener("click", function ()
        {
            let char = this.closest('table').querySelector('th').innerText.toLowerCase();
            let job = this.id.split("_")[0];
            _bsSave.characters[char].jobLvlUp(job, "+1");
            writeInspirationalSpeech();
        });
    }

    // Master
    buttons = document.querySelectorAll('[id$="_buttonMaster"]');
    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].addEventListener("click", function ()
        {
            let char = this.closest('table').querySelector('th').innerText.toLowerCase();
            let job = this.id.split("_")[0];
            _bsSave.characters[char].jobLvlUp(job, "master");
            writeInspirationalSpeech();
        });
    }

    // Legendary
    buttons = document.querySelectorAll('[id$="_buttonLegend"]');
    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].addEventListener("click", function ()
        {
            let char = this.closest('table').querySelector('th').innerText.toLowerCase();
            let job = this.id.split("_")[0];
            _bsSave.characters[char].jobLvlUp(job, "legend");
            writeInspirationalSpeech();
        });
    }

    // Unlock
    buttons = document.querySelectorAll('[id$="_buttonUnlock"]');
    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].addEventListener("click", function ()
        {
            let job = this.id.split("_")[0];
            _bsSave.jobUnlocks[job] = true;
            writeInspirationalSpeech();
        });
    }
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

    let result = [];
    result["level"] = level;
    result["curJp"] = curJp;
    result["needJp"] = needJp;

    return result;
}



