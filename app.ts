// let _binaryReader : BinaryFileReader = null;
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

// A binary file reader/writer
// All byte and bit stuff is little endian
class BinaryFileReader {
    private _fileBytes: Uint8Array;
    private _bytePosition: number;
    private _bitPosition: number;

    constructor (public fileBytes: Uint8Array) {
        this._fileBytes = fileBytes;
        this._bytePosition = 0;
        this._bitPosition = 0;
    }

    // Download the file (contents of _fileBytes) in its current state
    public download = (filename = '') => {
        let a = document.createElement('a');
        a.hidden = true;
        document.body.appendChild(a);

        let blob = new Blob([this._fileBytes]);
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    public setBytePosition = (position) => {
        this._bytePosition = position;
    };
    public getBytePosition = (): number => {
        return this._bytePosition;
    };
    public setBitPosition = (position) => {
        this._bitPosition = position % 8;
    };
    public getBitPosition = (): number => {
        return this._bitPosition;
    };

    // Advance the byte+bit positions by the given number of bits (roll over to next bytes if needed)
    public advancePositionByBits = (numberOfBits) => {
        this._bitPosition += numberOfBits;
        if (this._bitPosition >= 8) {
            this._bytePosition += Math.floor(this._bitPosition / 8);
            this._bitPosition = this._bitPosition % 8;
        }
    };
   
    public readBytes = (numberOfBytes: number, advancePosition: boolean = true): Uint8Array => {
        if (numberOfBytes < 0) {
            throw 'Cannot read a negative number of bytes';
        } else if (numberOfBytes === 0) {
            return new Uint8Array(0);
        } else if (this._bitPosition > 0 && (numberOfBytes + 1 > this._fileBytes.length - this._bytePosition)) {
            throw `Cannot read ${numberOfBytes} bytes because fewer than that many bytes plus one remain in the array`;
        } else if (numberOfBytes > this._fileBytes.length - this._bytePosition) {
            throw `Cannot read ${numberOfBytes} bytes because fewer than that many bytes remain in the array`;
        }

        if (this._bitPosition > 0) {
            // Do fancy bit splitting since our boundary is in the middle of a byte
            let bytes = new Uint8Array(numberOfBytes);
            let bytePosition = this._bytePosition;
            for (let i = 0; i < numberOfBytes; i++) {
                let lowerByte = this._fileBytes[bytePosition];
                let upperByte = this._fileBytes[bytePosition + 1];
                
                // Bottom of new byte: Top (8 - bitPosition) bits of first byte
                // Top of new byte: Bottom (bitPosition) bits of second byte
                bytes[i] = (lowerByte >> this._bitPosition) + ((upperByte << (8 - this._bitPosition)) & 0xFF);

                bytePosition++;
                if (advancePosition) this._bytePosition++;
            }
            return bytes;
        } else {
            // The math is much easier on the happy path
            let bytes = this._fileBytes.slice(this._bytePosition, this._bytePosition + numberOfBytes);
            if (advancePosition) this._bytePosition += numberOfBytes;
            return bytes;
        }
    };

    public readBit = (advancePosition: boolean = true) : boolean => {
        let mask = Math.pow(2, this._bitPosition);
        let value = (this._fileBytes[this._bytePosition] & mask) === mask;
        if (advancePosition) this.advancePositionByBits(1);
        return value;
    };

    public writeBit = (value: boolean, advancePosition: boolean = true) => {
        let mask = Math.pow(2, this._bitPosition);

        if (value) this._fileBytes[this._bytePosition] = this._fileBytes[this._bytePosition] | mask;
        else this._fileBytes[this._bytePosition] = this._fileBytes[this._bytePosition] & ~ mask;

        if (advancePosition) this.advancePositionByBits(1);
    };

    public writeByte = (value, advancePosition: boolean = true) => {
        if (value > 0xFF) throw 'writeByte cannot write values greater than one byte (0xFF)';

        if (this._bitPosition > 0) {
            let offset = this._bitPosition;
            let remainder = 8 - this._bitPosition;

            // Maintain lower part of file byte
            // Replace higher part of file byte with lower part of value byte
            // input value: abcdefgh
            // oldLowerByteValue: ijklmnop
            // offset: 3
            // expected new value: defghnop
            let oldLowerByteValue = this._fileBytes[this._bytePosition];
            this._fileBytes[this._bytePosition] = (((oldLowerByteValue << remainder) & 0xFF) >> remainder) + ((value << offset) & 0xFF);

            // Maintain higher part of file byte
            // Replace lower part of file byte with higher part of value byte
            // input value: abcdefgh
            // oldUpperByteValue: qrstuvwx
            // offset: 3
            // expected new value: qrstuabc
            let oldUpperByteValue = this._fileBytes[this._bytePosition + 1];
            this._fileBytes[this._bytePosition + 1] = (oldUpperByteValue >> offset << offset) + (value >> remainder);
        } else {
            // Why can't life always be this simple?
            this._fileBytes[this._bytePosition] = value;
        }

        if (advancePosition) this._bytePosition++;
    };

    public readUInt8 = (advancePosition: boolean = true): number => {
        return this.readBytes(1, advancePosition)[0];
    };

    public readUInt16 = (advancePosition: boolean = true): number => {
        let arr = this.readBytes(2, advancePosition);
        return arr[0] + (arr[1] << 8);
    };

    public readUInt32 = (advancePosition: boolean = true): number => {
        let arr = this.readBytes(4, advancePosition);
        return arr[0] + (arr[1] << 8) + (arr[2] << 16) + (arr[3] << 24);
    };

    // Overwrites the value at the current position
    public writeUInt8 = (value, advancePosition: boolean = true) => {
        this.writeByte(value & 0xFF, advancePosition);
    };

    // Overwrites the value at the current position
    public writeUInt16 = (value, advancePosition: boolean = true) => {
        this.writeByte(value & 0xFF, advancePosition);
        this.writeByte((value >> 8) & 0xFF, advancePosition);
    };

    // Overwrites the value at the current position
    public writeUInt32 = (value, advancePosition: boolean = true) => {
        this.writeByte(value & 0xFF, advancePosition);
        this.writeByte((value >> 8) & 0xFF, advancePosition);
        this.writeByte((value >> 16) & 0xFF, advancePosition);
        this.writeByte((value >> 24) & 0xFF, advancePosition);
    };
}

class BravelySecondSave {
    private _binaryFileReader: BinaryFileReader;

    private CHARACTER_BLOCK_SIZE_BYTES = 0x142;
    private CHARACTER_BLOCK_SIZE_BITS = 3;

    constructor (public binaryFileReader: BinaryFileReader) {
        this._binaryFileReader = binaryFileReader;
        this.initialize();
    }

    // Writes the contents of properties to _binaryFileReader
    public commit = () => {
        this.writeJobUnlocks();
        // TODO: Offsets may need adjusted as more data is found on the contents of the save
        this.writeCharacter(0xF88, 5, this.characters.tiz);
        this.writeCharacter(0x10CB, 0, this.characters.magnolia);
        this.writeCharacter(0x120D, 3, this.characters.yew);
        this.writeCharacter(0x134F, 6, this.characters.edea);
    }

    // Downloads the file
    public download = (filename = '') => {
        this._binaryFileReader.download(filename);
    }

    // Reads the contents of _binaryFileReader to properties
    private initialize = () => {
        this.readJobUnlocks();
        // TODO: Offsets may need adjusted as more data is found on the contents of the save
        this.characters.tiz = this.readCharacter(0xF88, 5);
        this.characters.magnolia = this.readCharacter(0x10CB, 0);
        this.characters.yew = this.readCharacter(0x120D, 3);
        this.characters.edea = this.readCharacter(0x134F, 6);
    }

    public characters : {
        tiz: BravelySecondSaveCharacter,
        magnolia: BravelySecondSaveCharacter,
        yew: BravelySecondSaveCharacter,
        edea: BravelySecondSaveCharacter,
    } = {
        tiz: null,
        magnolia: null,
        yew: null,
        edea: null,
    };

    public jobUnlocks : {
        freelancer: boolean,
        knight: boolean,
        blackmage: boolean,
        whitemage: boolean,
        monk: boolean,
        ranger: boolean,
        ninja: boolean,
        timemage: boolean,
        swordmaster: boolean,
        pirate: boolean,
        darkknight: boolean,
        templar: boolean,
        summoner: boolean,
        valkyrie: boolean,
        redmage: boolean,
        thief: boolean,
        merchant: boolean,
        performer: boolean,
        fencer: boolean,
        bishop: boolean,
        wizard: boolean,
        charioteer: boolean,
        catmancer: boolean,
        astrologian: boolean,
        hawkeye: boolean,
        patissier: boolean,
        exorcist: boolean,
        guardian: boolean,
        kaiser: boolean,
        yokai: boolean,
    } = {
        freelancer: false,
        knight: false,
        blackmage: false,
        whitemage: false,
        monk: false,
        ranger: false,
        ninja: false,
        timemage: false,
        swordmaster: false,
        pirate: false,
        darkknight: false,
        templar: false,
        summoner: false,
        valkyrie: false,
        redmage: false,
        thief: false,
        merchant: false,
        performer: false,
        fencer: false,
        bishop: false,
        wizard: false,
        charioteer: false,
        catmancer: false,
        astrologian: false,
        hawkeye: false,
        patissier: false,
        exorcist: false,
        guardian: false,
        kaiser: false,
        yokai: false,
    }

    private readCharacter = (byteOffset, bitOffset) : BravelySecondSaveCharacter => {
        let character = new BravelySecondSaveCharacter();

        this._binaryFileReader.setBytePosition(byteOffset);
        this._binaryFileReader.setBitPosition(bitOffset);
        let startingBytePosition = this._binaryFileReader.getBytePosition();
        let startingBitPosition = this._binaryFileReader.getBitPosition();

        // Unknown data
        this._binaryFileReader.readBytes(0xE1);
        this._binaryFileReader.advancePositionByBits(5);

        // Job mastery: 0x3F bytes and 5 bits
        // Templar, Kaiser, Yokai positions are guesses (I haven't unlocked them yet)
        character.jobMastery.freelancer = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.knight = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.blackmage = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.whitemage = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.monk = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.ranger = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.ninja = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.timemage = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.swordmaster = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.pirate = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.darkknight = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.templar = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.summoner = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.valkyrie = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.redmage = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.thief = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.merchant = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.performer = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.fencer = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.bishop = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.wizard = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.charioteer = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.catmancer = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.astrologian = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.hawkeye = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.patissier = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.exorcist = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.guardian = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.kaiser = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.yokai = this._binaryFileReader.readUInt16();

        // Unknown data
        this._binaryFileReader.readBytes(0x21);
        this._binaryFileReader.advancePositionByBits(1);

        return character;
    }

    private writeCharacter = (byteOffset, bitOffset, character: BravelySecondSaveCharacter) => {
        this._binaryFileReader.setBytePosition(byteOffset);
        this._binaryFileReader.setBitPosition(bitOffset);

        // Unknown data
        this._binaryFileReader.readBytes(0xE1);
        this._binaryFileReader.advancePositionByBits(5);

        // Job mastery: 0x3F bytes and 5 bits
        // Templar, Kaiser, Yokai positions are guesses (I haven't unlocked them yet)
        this._binaryFileReader.writeUInt16(character.jobMastery.freelancer);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.knight);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.blackmage);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.whitemage);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.monk);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.ranger);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.ninja);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.timemage);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.swordmaster);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.pirate);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.darkknight);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.templar);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.summoner);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.valkyrie);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.redmage);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.thief);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.merchant);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.performer);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.fencer);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.bishop);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.wizard);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.charioteer);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.catmancer);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.astrologian);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.hawkeye);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.patissier);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.exorcist);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.guardian);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.kaiser);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.yokai);

        // Unknown data
        this._binaryFileReader.readBytes(0x21);
        this._binaryFileReader.advancePositionByBits(1);
    }

    public unlockAllJobs = () => {
        let unlocked = true; // In case you wanna easily toggle all these to false or something

        this.jobUnlocks.freelancer = true; // Probably always have freelancer unlocked though... just a hunch
        this.jobUnlocks.knight = unlocked;
        this.jobUnlocks.blackmage = unlocked;
        this.jobUnlocks.whitemage = unlocked;
        this.jobUnlocks.monk = unlocked;
        this.jobUnlocks.ranger = unlocked;
        this.jobUnlocks.ninja = unlocked;
        this.jobUnlocks.timemage = unlocked;
        this.jobUnlocks.swordmaster = unlocked;
        this.jobUnlocks.pirate = unlocked;
        this.jobUnlocks.darkknight = unlocked;
        this.jobUnlocks.templar = unlocked;
        this.jobUnlocks.summoner = unlocked;
        this.jobUnlocks.valkyrie = unlocked;
        this.jobUnlocks.redmage = unlocked;
        this.jobUnlocks.thief = unlocked;
        this.jobUnlocks.merchant = unlocked;
        this.jobUnlocks.performer = unlocked;
        this.jobUnlocks.fencer = unlocked;
        this.jobUnlocks.bishop = unlocked;
        this.jobUnlocks.wizard = unlocked;
        this.jobUnlocks.charioteer = unlocked;
        this.jobUnlocks.catmancer = unlocked;
        this.jobUnlocks.astrologian = unlocked;
        this.jobUnlocks.hawkeye = unlocked;
        this.jobUnlocks.patissier = unlocked;
        this.jobUnlocks.exorcist = unlocked;
        this.jobUnlocks.guardian = unlocked;
        this.jobUnlocks.kaiser = unlocked;
        this.jobUnlocks.yokai = unlocked;
    };

    private readJobUnlocks = () => {
        this._binaryFileReader.setBytePosition(0x278E);
        this._binaryFileReader.setBitPosition(2);

        this.jobUnlocks.freelancer = this._binaryFileReader.readBit();
        this.jobUnlocks.knight = this._binaryFileReader.readBit();
        this.jobUnlocks.blackmage = this._binaryFileReader.readBit();
        this.jobUnlocks.whitemage = this._binaryFileReader.readBit();
        this.jobUnlocks.monk = this._binaryFileReader.readBit();
        this.jobUnlocks.ranger = this._binaryFileReader.readBit();
        this.jobUnlocks.ninja = this._binaryFileReader.readBit();
        this.jobUnlocks.timemage = this._binaryFileReader.readBit();
        this.jobUnlocks.swordmaster = this._binaryFileReader.readBit();
        this.jobUnlocks.pirate = this._binaryFileReader.readBit();
        this.jobUnlocks.darkknight = this._binaryFileReader.readBit();
        this.jobUnlocks.templar = this._binaryFileReader.readBit(); // byte 0x278F, bit 0x20
        this.jobUnlocks.summoner = this._binaryFileReader.readBit();
        this.jobUnlocks.valkyrie = this._binaryFileReader.readBit();
        this.jobUnlocks.redmage = this._binaryFileReader.readBit();
        this.jobUnlocks.thief = this._binaryFileReader.readBit();
        this.jobUnlocks.merchant = this._binaryFileReader.readBit();
        this.jobUnlocks.performer = this._binaryFileReader.readBit();
        this.jobUnlocks.fencer = this._binaryFileReader.readBit();
        this.jobUnlocks.bishop = this._binaryFileReader.readBit();
        this.jobUnlocks.wizard = this._binaryFileReader.readBit();
        this.jobUnlocks.charioteer = this._binaryFileReader.readBit();
        this.jobUnlocks.catmancer = this._binaryFileReader.readBit();
        this.jobUnlocks.astrologian = this._binaryFileReader.readBit();
        this.jobUnlocks.hawkeye = this._binaryFileReader.readBit();
        this.jobUnlocks.patissier = this._binaryFileReader.readBit();
        this.jobUnlocks.exorcist = this._binaryFileReader.readBit();
        this.jobUnlocks.guardian = this._binaryFileReader.readBit();
        this.jobUnlocks.kaiser = this._binaryFileReader.readBit();
        this.jobUnlocks.yokai = this._binaryFileReader.readBit();
    };

    private writeJobUnlocks = () => {
        this._binaryFileReader.setBytePosition(0x278E);
        this._binaryFileReader.setBitPosition(2);

        this._binaryFileReader.writeBit(this.jobUnlocks.freelancer);
        this._binaryFileReader.writeBit(this.jobUnlocks.knight);
        this._binaryFileReader.writeBit(this.jobUnlocks.blackmage);
        this._binaryFileReader.writeBit(this.jobUnlocks.whitemage);
        this._binaryFileReader.writeBit(this.jobUnlocks.monk);
        this._binaryFileReader.writeBit(this.jobUnlocks.ranger);
        this._binaryFileReader.writeBit(this.jobUnlocks.ninja);
        this._binaryFileReader.writeBit(this.jobUnlocks.timemage);
        this._binaryFileReader.writeBit(this.jobUnlocks.swordmaster);
        this._binaryFileReader.writeBit(this.jobUnlocks.pirate);
        this._binaryFileReader.writeBit(this.jobUnlocks.darkknight);
        this._binaryFileReader.writeBit(this.jobUnlocks.templar);
        this._binaryFileReader.writeBit(this.jobUnlocks.summoner);
        this._binaryFileReader.writeBit(this.jobUnlocks.valkyrie);
        this._binaryFileReader.writeBit(this.jobUnlocks.redmage);
        this._binaryFileReader.writeBit(this.jobUnlocks.thief);
        this._binaryFileReader.writeBit(this.jobUnlocks.merchant);
        this._binaryFileReader.writeBit(this.jobUnlocks.performer);
        this._binaryFileReader.writeBit(this.jobUnlocks.fencer);
        this._binaryFileReader.writeBit(this.jobUnlocks.bishop);
        this._binaryFileReader.writeBit(this.jobUnlocks.wizard);
        this._binaryFileReader.writeBit(this.jobUnlocks.charioteer);
        this._binaryFileReader.writeBit(this.jobUnlocks.catmancer);
        this._binaryFileReader.writeBit(this.jobUnlocks.astrologian);
        this._binaryFileReader.writeBit(this.jobUnlocks.hawkeye);
        this._binaryFileReader.writeBit(this.jobUnlocks.patissier);
        this._binaryFileReader.writeBit(this.jobUnlocks.exorcist);
        this._binaryFileReader.writeBit(this.jobUnlocks.guardian);
        this._binaryFileReader.writeBit(this.jobUnlocks.kaiser);
        this._binaryFileReader.writeBit(this.jobUnlocks.yokai);
    };

    public getTizJobMastery = () => {
        return this.getJobMastery(0x106A, 2);
    }

    public getMagnoliaJobMastery = () => {
        return this.getJobMastery(0x11AC, 5);
    }

    public getYewJobMastery = () => {
        return this.getJobMastery(0x12EF, 0);
    }

    public getEdeaJobMastery = () => {
        return this.getJobMastery(0x1431, 3);
    }

    private getJobMastery = (byteOffset, bitOffset) : Uint16Array => {
        this._binaryFileReader.setBytePosition(byteOffset);
        this._binaryFileReader.setBitPosition(bitOffset);

        let jobMastery = new Uint16Array(30);

        for (let i = 0; i < 30; i++) {
            if (i > 0) this._binaryFileReader.advancePositionByBits(1);
            jobMastery[i] = this._binaryFileReader.readUInt16();
        }

        return jobMastery;
    }
}

class BravelySecondSaveCharacter {

    // Amount of JP needed to reach a given job level
    static JP_LEVELS = {
        level1: 0,
        level2: 30,
        level3: 130,
        level4: 430,
        level5: 830,
        level6: 1630,
        level7: 3130,
        level8: 5630,
        level9: 10630,
        level10: 18630,
        level11: 28629
    };

    // TODO: Implement, maybe
    // Not listed: level, experience, cur/max hp, cur/max mp, stats
    public primaryJob = 0;
    public secondaryJob = 0;
    public supportAbilities = {};
    public equipment = {
        rightHand: 0,
        leftHand: 0,
        head: 0,
        body: 0,
        accessory: 0,
        costume: 0,
    };
    public specialMove = {
        offensive: {
            element: 0,
            power: 0,
            enemyType: 0,
            statusEffect: 0
        },
        recovery: {
            hpRecovery: 0,
            statusCure: 0,
            mpRecovery: 0,
            bpBonus: 0
        },
        enfeebling: {
            duration: 0,
            debuff: 0,
            statusResistanceDown: 0,
            elementResistanceDown: 0
        },
        support: {
            duration: 0,
            buff: 0,
            statusResistanceUp: 0,
            elementResistanceUp: 0
        },
        triggerCondition: 0,
        catchphrases: {
            singleTarget: '',
            all: '',
            recovery: '',
            support: ''
        }
    };
    public abilink = {}; // Really not sure what format this would take. Probably a reference to data elsewhere in the save (or even another save file)

    public jobMastery = {
        freelancer: 0,
        knight: 0,
        blackmage: 0,
        whitemage: 0,
        monk: 0,
        ranger: 0,
        ninja: 0,
        timemage: 0,
        swordmaster: 0,
        pirate: 0,
        darkknight: 0,
        templar: 0, // could be templar, kaiser, or yokai
        summoner: 0,
        valkyrie: 0,
        redmage: 0,
        thief: 0,
        merchant: 0,
        performer: 0,
        fencer: 0,
        bishop: 0,
        wizard: 0,
        charioteer: 0,
        catmancer: 0,
        astrologian: 0,
        hawkeye: 0,
        patissier: 0,
        exorcist: 0,
        guardian: 0,
        kaiser: 0, // could be templar, kaiser, or yokai
        yokai: 0, // could be templar, kaiser, or yokai
    };

    public masterAllJobs = () => {
        this.setAllJobMasteries(BravelySecondSaveCharacter.JP_LEVELS.level10);
    }

    public legendaryAllJobs = () => {
        this.setAllJobMasteries(BravelySecondSaveCharacter.JP_LEVELS.level11);
    }

    private setAllJobMasteries = (jp) => {
        this.jobMastery.freelancer = jp;
        this.jobMastery.knight = jp;
        this.jobMastery.blackmage = jp;
        this.jobMastery.whitemage = jp;
        this.jobMastery.monk = jp;
        this.jobMastery.ranger = jp;
        this.jobMastery.ninja = jp;
        this.jobMastery.timemage = jp;
        this.jobMastery.swordmaster = jp;
        this.jobMastery.pirate = jp;
        this.jobMastery.darkknight = jp;
        this.jobMastery.templar = jp;
        this.jobMastery.summoner = jp;
        this.jobMastery.valkyrie = jp;
        this.jobMastery.redmage = jp;
        this.jobMastery.thief = jp;
        this.jobMastery.merchant = jp;
        this.jobMastery.performer = jp;
        this.jobMastery.fencer = jp;
        this.jobMastery.bishop = jp;
        this.jobMastery.wizard = jp;
        this.jobMastery.charioteer = jp;
        this.jobMastery.catmancer = jp;
        this.jobMastery.astrologian = jp;
        this.jobMastery.hawkeye = jp;
        this.jobMastery.patissier = jp;
        this.jobMastery.exorcist = jp;
        this.jobMastery.guardian = jp;
        this.jobMastery.kaiser = jp;
        this.jobMastery.yokai = jp;
    }
}

