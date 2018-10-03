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
        character.jobMastery.yokai = this._binaryFileReader.readUInt16();
        this._binaryFileReader.advancePositionByBits(1);
        character.jobMastery.kaiser = this._binaryFileReader.readUInt16();

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
        this._binaryFileReader.writeUInt16(character.jobMastery.yokai);
        this._binaryFileReader.advancePositionByBits(1);
        this._binaryFileReader.writeUInt16(character.jobMastery.kaiser);

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
        this.jobUnlocks.yokai = this._binaryFileReader.readBit();
        this.jobUnlocks.kaiser = this._binaryFileReader.readBit();
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
        this._binaryFileReader.writeBit(this.jobUnlocks.yokai);
        this._binaryFileReader.writeBit(this.jobUnlocks.kaiser);
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