// let _binaryReader : BinaryFileReader = null;
var _bsSave = null;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('importedSave').addEventListener('change', function () {
        var fileInput = this;
        var reader = new FileReader();
        reader.onload = function () {
            var buffer = this.result;
            var array = new Uint8Array(buffer);
            var binaryReader = new BinaryFileReader(array);
            _bsSave = new BravelySecondSave(binaryReader);
            writeInspirationalSpeech();
        };
        if (fileInput.files && fileInput.files.length > 0) {
            reader.readAsArrayBuffer(fileInput.files[0]);
        }
        else {
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
        var fileInput = document.getElementById('importedSave');
        var filename = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0].name : '';
        _bsSave.download(filename);
    });
});
function writeInspirationalSpeech() {
    var speech = '';
    speech += 'TIZ: ' + formatCharacterJp(_bsSave.characters.tiz);
    speech += '<br /><br />';
    speech += 'MAGNOLIA: ' + formatCharacterJp(_bsSave.characters.magnolia);
    speech += '<br /><br />';
    speech += 'YEW: ' + formatCharacterJp(_bsSave.characters.yew);
    speech += '<br /><br />';
    speech += 'EDEA: ' + formatCharacterJp(_bsSave.characters.edea);
    document.getElementById('inspiresConfidenceDoesntIt').innerHTML = speech;
}
function formatCharacterJp(character) {
    // Ordered by position on in-game menu
    var list = [
        "<b>freelancer:</b> " + formatJobJp(character.jobMastery.freelancer),
        "<b>wizard:</b> " + formatJobJp(character.jobMastery.wizard),
        "<b>charioteer:</b> " + formatJobJp(character.jobMastery.charioteer),
        "<b>fencer:</b> " + formatJobJp(character.jobMastery.fencer),
        "<b>bishop:</b> " + formatJobJp(character.jobMastery.bishop),
        "<b>astrologian:</b> " + formatJobJp(character.jobMastery.astrologian),
        "<b>catmancer:</b> " + formatJobJp(character.jobMastery.catmancer),
        "<b>redmage:</b> " + formatJobJp(character.jobMastery.redmage),
        "<b>thief:</b> " + formatJobJp(character.jobMastery.thief),
        "<b>swordmaster:</b> " + formatJobJp(character.jobMastery.swordmaster),
        "<b>summoner:</b> " + formatJobJp(character.jobMastery.summoner),
        "<b>hawkeye:</b> " + formatJobJp(character.jobMastery.hawkeye),
        "<b>patissier:</b> " + formatJobJp(character.jobMastery.patissier),
        "<b>whitemage:</b> " + formatJobJp(character.jobMastery.whitemage),
        "<b>merchant:</b> " + formatJobJp(character.jobMastery.merchant),
        "<b>blackmage:</b> " + formatJobJp(character.jobMastery.blackmage),
        "<b>ranger:</b> " + formatJobJp(character.jobMastery.ranger),
        "<b>knight:</b> " + formatJobJp(character.jobMastery.knight),
        "<b>ninja:</b> " + formatJobJp(character.jobMastery.ninja),
        "<b>exorcist:</b> " + formatJobJp(character.jobMastery.exorcist),
        "<b>monk:</b> " + formatJobJp(character.jobMastery.monk),
        "<b>valkyrie:</b> " + formatJobJp(character.jobMastery.valkyrie),
        "<b>pirate:</b> " + formatJobJp(character.jobMastery.pirate),
        "<b>performer:</b> " + formatJobJp(character.jobMastery.performer),
        "<b>timemage:</b> " + formatJobJp(character.jobMastery.timemage),
        "<b>darkknight:</b> " + formatJobJp(character.jobMastery.darkknight),
        "<b>guardian:</b> " + formatJobJp(character.jobMastery.guardian),
        "<b>templar:</b> " + formatJobJp(character.jobMastery.templar),
        "<b>kaiser:</b> " + formatJobJp(character.jobMastery.kaiser),
        "<b>yokai:</b> " + formatJobJp(character.jobMastery.yokai),
    ];
    return list.join(' / ');
}
function formatJobJp(jp) {
    var level = 0;
    var curJp = 0;
    var needJp = 0;
    if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level11) {
        level = 11;
        curJp = jp;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level11;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level10) {
        level = 10;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level10;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level11 - BravelySecondSaveCharacter.JP_LEVELS.level10;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level9) {
        level = 9;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level9;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level10 - BravelySecondSaveCharacter.JP_LEVELS.level9;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level8) {
        level = 8;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level8;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level9 - BravelySecondSaveCharacter.JP_LEVELS.level8;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level7) {
        level = 7;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level7;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level8 - BravelySecondSaveCharacter.JP_LEVELS.level7;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level6) {
        level = 6;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level6;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level7 - BravelySecondSaveCharacter.JP_LEVELS.level6;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level5) {
        level = 5;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level5;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level6 - BravelySecondSaveCharacter.JP_LEVELS.level5;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level4) {
        level = 4;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level4;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level5 - BravelySecondSaveCharacter.JP_LEVELS.level4;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level3) {
        level = 3;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level3;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level4 - BravelySecondSaveCharacter.JP_LEVELS.level3;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level2) {
        level = 2;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level2;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level3 - BravelySecondSaveCharacter.JP_LEVELS.level2;
    }
    else if (jp >= BravelySecondSaveCharacter.JP_LEVELS.level1) {
        level = 1;
        curJp = jp - BravelySecondSaveCharacter.JP_LEVELS.level1;
        needJp = BravelySecondSaveCharacter.JP_LEVELS.level2 - BravelySecondSaveCharacter.JP_LEVELS.level1;
    }
    return "Lv " + level + " - " + curJp + "/" + needJp;
}
// A binary file reader/writer
// All byte and bit stuff is little endian
var BinaryFileReader = /** @class */ (function () {
    function BinaryFileReader(fileBytes) {
        var _this = this;
        this.fileBytes = fileBytes;
        // Download the file (contents of _fileBytes) in its current state
        this.download = function (filename) {
            if (filename === void 0) { filename = ''; }
            var a = document.createElement('a');
            a.hidden = true;
            document.body.appendChild(a);
            var blob = new Blob([_this._fileBytes]);
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        };
        this.setBytePosition = function (position) {
            _this._bytePosition = position;
        };
        this.getBytePosition = function () {
            return _this._bytePosition;
        };
        this.setBitPosition = function (position) {
            _this._bitPosition = position % 8;
        };
        this.getBitPosition = function () {
            return _this._bitPosition;
        };
        // Advance the byte+bit positions by the given number of bits (roll over to next bytes if needed)
        this.advancePositionByBits = function (numberOfBits) {
            _this._bitPosition += numberOfBits;
            if (_this._bitPosition >= 8) {
                _this._bytePosition += Math.floor(_this._bitPosition / 8);
                _this._bitPosition = _this._bitPosition % 8;
            }
        };
        this.readBytes = function (numberOfBytes, advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            if (numberOfBytes < 0) {
                throw 'Cannot read a negative number of bytes';
            }
            else if (numberOfBytes === 0) {
                return new Uint8Array(0);
            }
            else if (_this._bitPosition > 0 && (numberOfBytes + 1 > _this._fileBytes.length - _this._bytePosition)) {
                throw "Cannot read " + numberOfBytes + " bytes because fewer than that many bytes plus one remain in the array";
            }
            else if (numberOfBytes > _this._fileBytes.length - _this._bytePosition) {
                throw "Cannot read " + numberOfBytes + " bytes because fewer than that many bytes remain in the array";
            }
            if (_this._bitPosition > 0) {
                // Do fancy bit splitting since our boundary is in the middle of a byte
                var bytes = new Uint8Array(numberOfBytes);
                var bytePosition = _this._bytePosition;
                for (var i = 0; i < numberOfBytes; i++) {
                    var lowerByte = _this._fileBytes[bytePosition];
                    var upperByte = _this._fileBytes[bytePosition + 1];
                    // Bottom of new byte: Top (8 - bitPosition) bits of first byte
                    // Top of new byte: Bottom (bitPosition) bits of second byte
                    bytes[i] = (lowerByte >> _this._bitPosition) + ((upperByte << (8 - _this._bitPosition)) & 0xFF);
                    bytePosition++;
                    if (advancePosition)
                        _this._bytePosition++;
                }
                return bytes;
            }
            else {
                // The math is much easier on the happy path
                var bytes = _this._fileBytes.slice(_this._bytePosition, _this._bytePosition + numberOfBytes);
                if (advancePosition)
                    _this._bytePosition += numberOfBytes;
                return bytes;
            }
        };
        this.readBit = function (advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            var mask = Math.pow(2, _this._bitPosition);
            var value = (_this._fileBytes[_this._bytePosition] & mask) === mask;
            if (advancePosition)
                _this.advancePositionByBits(1);
            return value;
        };
        this.writeBit = function (value, advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            var mask = Math.pow(2, _this._bitPosition);
            if (value)
                _this._fileBytes[_this._bytePosition] = _this._fileBytes[_this._bytePosition] | mask;
            else
                _this._fileBytes[_this._bytePosition] = _this._fileBytes[_this._bytePosition] & ~mask;
            if (advancePosition)
                _this.advancePositionByBits(1);
        };
        this.writeByte = function (value, advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            if (value > 0xFF)
                throw 'writeByte cannot write values greater than one byte (0xFF)';
            if (_this._bitPosition > 0) {
                var offset = _this._bitPosition;
                var remainder = 8 - _this._bitPosition;
                // Maintain lower part of file byte
                // Replace higher part of file byte with lower part of value byte
                // input value: abcdefgh
                // oldLowerByteValue: ijklmnop
                // offset: 3
                // expected new value: defghnop
                var oldLowerByteValue = _this._fileBytes[_this._bytePosition];
                _this._fileBytes[_this._bytePosition] = (((oldLowerByteValue << remainder) & 0xFF) >> remainder) + ((value << offset) & 0xFF);
                // Maintain higher part of file byte
                // Replace lower part of file byte with higher part of value byte
                // input value: abcdefgh
                // oldUpperByteValue: qrstuvwx
                // offset: 3
                // expected new value: qrstuabc
                var oldUpperByteValue = _this._fileBytes[_this._bytePosition + 1];
                _this._fileBytes[_this._bytePosition + 1] = (oldUpperByteValue >> offset << offset) + (value >> remainder);
            }
            else {
                // Why can't life always be this simple?
                _this._fileBytes[_this._bytePosition] = value;
            }
            if (advancePosition)
                _this._bytePosition++;
        };
        this.readUInt8 = function (advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            return _this.readBytes(1, advancePosition)[0];
        };
        this.readUInt16 = function (advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            var arr = _this.readBytes(2, advancePosition);
            return arr[0] + (arr[1] << 8);
        };
        this.readUInt32 = function (advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            var arr = _this.readBytes(4, advancePosition);
            return arr[0] + (arr[1] << 8) + (arr[2] << 16) + (arr[3] << 24);
        };
        // Overwrites the value at the current position
        this.writeUInt8 = function (value, advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            _this.writeByte(value & 0xFF, advancePosition);
        };
        // Overwrites the value at the current position
        this.writeUInt16 = function (value, advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            _this.writeByte(value & 0xFF, advancePosition);
            _this.writeByte((value >> 8) & 0xFF, advancePosition);
        };
        // Overwrites the value at the current position
        this.writeUInt32 = function (value, advancePosition) {
            if (advancePosition === void 0) { advancePosition = true; }
            _this.writeByte(value & 0xFF, advancePosition);
            _this.writeByte((value >> 8) & 0xFF, advancePosition);
            _this.writeByte((value >> 16) & 0xFF, advancePosition);
            _this.writeByte((value >> 24) & 0xFF, advancePosition);
        };
        this._fileBytes = fileBytes;
        this._bytePosition = 0;
        this._bitPosition = 0;
    }
    return BinaryFileReader;
}());
var BravelySecondSave = /** @class */ (function () {
    function BravelySecondSave(binaryFileReader) {
        var _this = this;
        this.binaryFileReader = binaryFileReader;
        this.CHARACTER_BLOCK_SIZE_BYTES = 0x142;
        this.CHARACTER_BLOCK_SIZE_BITS = 3;
        // Writes the contents of properties to _binaryFileReader
        this.commit = function () {
            _this.writeJobUnlocks();
            // TODO: Offsets may need adjusted as more data is found on the contents of the save
            _this.writeCharacter(0xF88, 5, _this.characters.tiz);
            _this.writeCharacter(0x10CB, 0, _this.characters.magnolia);
            _this.writeCharacter(0x120D, 3, _this.characters.yew);
            _this.writeCharacter(0x134F, 6, _this.characters.edea);
        };
        // Downloads the file
        this.download = function (filename) {
            if (filename === void 0) { filename = ''; }
            _this._binaryFileReader.download(filename);
        };
        // Reads the contents of _binaryFileReader to properties
        this.initialize = function () {
            _this.readJobUnlocks();
            // TODO: Offsets may need adjusted as more data is found on the contents of the save
            _this.characters.tiz = _this.readCharacter(0xF88, 5);
            _this.characters.magnolia = _this.readCharacter(0x10CB, 0);
            _this.characters.yew = _this.readCharacter(0x120D, 3);
            _this.characters.edea = _this.readCharacter(0x134F, 6);
        };
        this.characters = {
            tiz: null,
            magnolia: null,
            yew: null,
            edea: null,
        };
        this.jobUnlocks = {
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
        };
        this.readCharacter = function (byteOffset, bitOffset) {
            var character = new BravelySecondSaveCharacter();
            _this._binaryFileReader.setBytePosition(byteOffset);
            _this._binaryFileReader.setBitPosition(bitOffset);
            var startingBytePosition = _this._binaryFileReader.getBytePosition();
            var startingBitPosition = _this._binaryFileReader.getBitPosition();
            // Unknown data
            _this._binaryFileReader.readBytes(0xE1);
            _this._binaryFileReader.advancePositionByBits(5);
            // Job mastery: 0x3F bytes and 5 bits
            // Templar, Kaiser, Yokai positions are guesses (I haven't unlocked them yet)
            character.jobMastery.freelancer = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.knight = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.blackmage = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.whitemage = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.monk = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.ranger = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.ninja = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.timemage = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.swordmaster = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.pirate = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.darkknight = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.templar = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.summoner = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.valkyrie = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.redmage = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.thief = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.merchant = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.performer = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.fencer = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.bishop = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.wizard = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.charioteer = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.catmancer = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.astrologian = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.hawkeye = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.patissier = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.exorcist = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.guardian = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.kaiser = _this._binaryFileReader.readUInt16();
            _this._binaryFileReader.advancePositionByBits(1);
            character.jobMastery.yokai = _this._binaryFileReader.readUInt16();
            // Unknown data
            _this._binaryFileReader.readBytes(0x21);
            _this._binaryFileReader.advancePositionByBits(1);
            return character;
        };
        this.writeCharacter = function (byteOffset, bitOffset, character) {
            _this._binaryFileReader.setBytePosition(byteOffset);
            _this._binaryFileReader.setBitPosition(bitOffset);
            // Unknown data
            _this._binaryFileReader.readBytes(0xE1);
            _this._binaryFileReader.advancePositionByBits(5);
            // Job mastery: 0x3F bytes and 5 bits
            // Templar, Kaiser, Yokai positions are guesses (I haven't unlocked them yet)
            _this._binaryFileReader.writeUInt16(character.jobMastery.freelancer);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.knight);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.blackmage);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.whitemage);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.monk);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.ranger);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.ninja);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.timemage);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.swordmaster);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.pirate);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.darkknight);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.templar);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.summoner);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.valkyrie);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.redmage);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.thief);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.merchant);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.performer);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.fencer);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.bishop);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.wizard);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.charioteer);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.catmancer);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.astrologian);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.hawkeye);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.patissier);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.exorcist);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.guardian);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.kaiser);
            _this._binaryFileReader.advancePositionByBits(1);
            _this._binaryFileReader.writeUInt16(character.jobMastery.yokai);
            // Unknown data
            _this._binaryFileReader.readBytes(0x21);
            _this._binaryFileReader.advancePositionByBits(1);
        };
        this.unlockAllJobs = function () {
            var unlocked = true; // In case you wanna easily toggle all these to false or something
            _this.jobUnlocks.freelancer = true; // Probably always have freelancer unlocked though... just a hunch
            _this.jobUnlocks.knight = unlocked;
            _this.jobUnlocks.blackmage = unlocked;
            _this.jobUnlocks.whitemage = unlocked;
            _this.jobUnlocks.monk = unlocked;
            _this.jobUnlocks.ranger = unlocked;
            _this.jobUnlocks.ninja = unlocked;
            _this.jobUnlocks.timemage = unlocked;
            _this.jobUnlocks.swordmaster = unlocked;
            _this.jobUnlocks.pirate = unlocked;
            _this.jobUnlocks.darkknight = unlocked;
            _this.jobUnlocks.templar = unlocked;
            _this.jobUnlocks.summoner = unlocked;
            _this.jobUnlocks.valkyrie = unlocked;
            _this.jobUnlocks.redmage = unlocked;
            _this.jobUnlocks.thief = unlocked;
            _this.jobUnlocks.merchant = unlocked;
            _this.jobUnlocks.performer = unlocked;
            _this.jobUnlocks.fencer = unlocked;
            _this.jobUnlocks.bishop = unlocked;
            _this.jobUnlocks.wizard = unlocked;
            _this.jobUnlocks.charioteer = unlocked;
            _this.jobUnlocks.catmancer = unlocked;
            _this.jobUnlocks.astrologian = unlocked;
            _this.jobUnlocks.hawkeye = unlocked;
            _this.jobUnlocks.patissier = unlocked;
            _this.jobUnlocks.exorcist = unlocked;
            _this.jobUnlocks.guardian = unlocked;
            _this.jobUnlocks.kaiser = unlocked;
            _this.jobUnlocks.yokai = unlocked;
        };
        this.readJobUnlocks = function () {
            _this._binaryFileReader.setBytePosition(0x278E);
            _this._binaryFileReader.setBitPosition(2);
            _this.jobUnlocks.freelancer = _this._binaryFileReader.readBit();
            _this.jobUnlocks.knight = _this._binaryFileReader.readBit();
            _this.jobUnlocks.blackmage = _this._binaryFileReader.readBit();
            _this.jobUnlocks.whitemage = _this._binaryFileReader.readBit();
            _this.jobUnlocks.monk = _this._binaryFileReader.readBit();
            _this.jobUnlocks.ranger = _this._binaryFileReader.readBit();
            _this.jobUnlocks.ninja = _this._binaryFileReader.readBit();
            _this.jobUnlocks.timemage = _this._binaryFileReader.readBit();
            _this.jobUnlocks.swordmaster = _this._binaryFileReader.readBit();
            _this.jobUnlocks.pirate = _this._binaryFileReader.readBit();
            _this.jobUnlocks.darkknight = _this._binaryFileReader.readBit();
            _this.jobUnlocks.templar = _this._binaryFileReader.readBit(); // byte 0x278F, bit 0x20
            _this.jobUnlocks.summoner = _this._binaryFileReader.readBit();
            _this.jobUnlocks.valkyrie = _this._binaryFileReader.readBit();
            _this.jobUnlocks.redmage = _this._binaryFileReader.readBit();
            _this.jobUnlocks.thief = _this._binaryFileReader.readBit();
            _this.jobUnlocks.merchant = _this._binaryFileReader.readBit();
            _this.jobUnlocks.performer = _this._binaryFileReader.readBit();
            _this.jobUnlocks.fencer = _this._binaryFileReader.readBit();
            _this.jobUnlocks.bishop = _this._binaryFileReader.readBit();
            _this.jobUnlocks.wizard = _this._binaryFileReader.readBit();
            _this.jobUnlocks.charioteer = _this._binaryFileReader.readBit();
            _this.jobUnlocks.catmancer = _this._binaryFileReader.readBit();
            _this.jobUnlocks.astrologian = _this._binaryFileReader.readBit();
            _this.jobUnlocks.hawkeye = _this._binaryFileReader.readBit();
            _this.jobUnlocks.patissier = _this._binaryFileReader.readBit();
            _this.jobUnlocks.exorcist = _this._binaryFileReader.readBit();
            _this.jobUnlocks.guardian = _this._binaryFileReader.readBit();
            _this.jobUnlocks.kaiser = _this._binaryFileReader.readBit();
            _this.jobUnlocks.yokai = _this._binaryFileReader.readBit();
        };
        this.writeJobUnlocks = function () {
            _this._binaryFileReader.setBytePosition(0x278E);
            _this._binaryFileReader.setBitPosition(2);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.freelancer);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.knight);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.blackmage);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.whitemage);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.monk);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.ranger);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.ninja);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.timemage);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.swordmaster);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.pirate);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.darkknight);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.templar);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.summoner);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.valkyrie);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.redmage);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.thief);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.merchant);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.performer);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.fencer);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.bishop);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.wizard);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.charioteer);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.catmancer);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.astrologian);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.hawkeye);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.patissier);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.exorcist);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.guardian);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.kaiser);
            _this._binaryFileReader.writeBit(_this.jobUnlocks.yokai);
        };
        this.getTizJobMastery = function () {
            return _this.getJobMastery(0x106A, 2);
        };
        this.getMagnoliaJobMastery = function () {
            return _this.getJobMastery(0x11AC, 5);
        };
        this.getYewJobMastery = function () {
            return _this.getJobMastery(0x12EF, 0);
        };
        this.getEdeaJobMastery = function () {
            return _this.getJobMastery(0x1431, 3);
        };
        this.getJobMastery = function (byteOffset, bitOffset) {
            _this._binaryFileReader.setBytePosition(byteOffset);
            _this._binaryFileReader.setBitPosition(bitOffset);
            var jobMastery = new Uint16Array(30);
            for (var i = 0; i < 30; i++) {
                if (i > 0)
                    _this._binaryFileReader.advancePositionByBits(1);
                jobMastery[i] = _this._binaryFileReader.readUInt16();
            }
            return jobMastery;
        };
        this._binaryFileReader = binaryFileReader;
        this.initialize();
    }
    return BravelySecondSave;
}());
var BravelySecondSaveCharacter = /** @class */ (function () {
    function BravelySecondSaveCharacter() {
        var _this = this;
        // TODO: Implement, maybe
        // Not listed: level, experience, cur/max hp, cur/max mp, stats
        this.primaryJob = 0;
        this.secondaryJob = 0;
        this.supportAbilities = {};
        this.equipment = {
            rightHand: 0,
            leftHand: 0,
            head: 0,
            body: 0,
            accessory: 0,
            costume: 0,
        };
        this.specialMove = {
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
        this.abilink = {}; // Really not sure what format this would take. Probably a reference to data elsewhere in the save (or even another save file)
        this.jobMastery = {
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
            templar: 0,
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
            kaiser: 0,
            yokai: 0,
        };
        this.masterAllJobs = function () {
            _this.setAllJobMasteries(BravelySecondSaveCharacter.JP_LEVELS.level10);
        };
        this.legendaryAllJobs = function () {
            _this.setAllJobMasteries(BravelySecondSaveCharacter.JP_LEVELS.level11);
        };
        this.setAllJobMasteries = function (jp) {
            _this.jobMastery.freelancer = jp;
            _this.jobMastery.knight = jp;
            _this.jobMastery.blackmage = jp;
            _this.jobMastery.whitemage = jp;
            _this.jobMastery.monk = jp;
            _this.jobMastery.ranger = jp;
            _this.jobMastery.ninja = jp;
            _this.jobMastery.timemage = jp;
            _this.jobMastery.swordmaster = jp;
            _this.jobMastery.pirate = jp;
            _this.jobMastery.darkknight = jp;
            _this.jobMastery.templar = jp;
            _this.jobMastery.summoner = jp;
            _this.jobMastery.valkyrie = jp;
            _this.jobMastery.redmage = jp;
            _this.jobMastery.thief = jp;
            _this.jobMastery.merchant = jp;
            _this.jobMastery.performer = jp;
            _this.jobMastery.fencer = jp;
            _this.jobMastery.bishop = jp;
            _this.jobMastery.wizard = jp;
            _this.jobMastery.charioteer = jp;
            _this.jobMastery.catmancer = jp;
            _this.jobMastery.astrologian = jp;
            _this.jobMastery.hawkeye = jp;
            _this.jobMastery.patissier = jp;
            _this.jobMastery.exorcist = jp;
            _this.jobMastery.guardian = jp;
            _this.jobMastery.kaiser = jp;
            _this.jobMastery.yokai = jp;
        };
    }
    // Amount of JP needed to reach a given job level
    BravelySecondSaveCharacter.JP_LEVELS = {
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
    return BravelySecondSaveCharacter;
}());
//# sourceMappingURL=app.js.map