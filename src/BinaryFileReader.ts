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