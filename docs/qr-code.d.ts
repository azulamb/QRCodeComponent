declare module QRLite {
    const version = "0.1.1";
    const White = false;
    const Black = true;
    type Level = 'L' | 'M' | 'Q' | 'H';
    interface QRLiteRSBlock {
        count: number;
        block: number[];
    }
    interface LevelData {
        DataCode: number;
        ECCode: number;
        Size: number;
        RS: QRLiteRSBlock[];
    }
    interface QRInfo {
        Data: {
            [key: number]: {
                L: LevelData;
                M: LevelData;
                Q: LevelData;
                H: LevelData;
                Alignment: {
                    x: number;
                    y: number;
                }[];
            };
        };
        ItoE: number[];
        G: {
            [key: number]: {
                a: number;
                x: number;
            }[];
        };
        Mask: {
            [key: number]: (i: number, j: number) => boolean;
        };
    }
    interface Rating {
        calc: (canvas: BitCanvas) => number;
    }
    interface ConvertOption {
        level?: Level;
        version?: number;
        mask?: number;
    }
    class BitCanvas {
        width: number;
        height: number;
        private bitarray;
        constructor(w: number, h: number);
        clone(): BitCanvas;
        reverse(func: (i: number, j: number) => boolean, mask: boolean[]): this;
        getPixel(x: number, y: number): boolean;
        getPixels(): boolean[];
        drawPixel(x: number, y: number, black: boolean): this | undefined;
        drawFromBitarray(bitarray: boolean[]): this;
        isTransparentPixel(x: number, y: number): boolean;
        drawTimingPattern(): this;
        drawQRInfo(level?: Level, mask?: number): this;
        drawFinderPattern(x: number, y: number): this;
        drawAlignmentPattern(x: number, y: number): this;
        drawPattern(pattern: (number | boolean)[], x: number, y: number, w: number, h: number): this;
        drawQRByte(byte: Uint8Array, cursor?: {
            x: number;
            y: number;
            up: boolean;
            right: boolean;
        }): {
            x: number;
            y: number;
            up: boolean;
            right: boolean;
        };
        fillEmpty(color?: boolean): number;
        private existsEmpty;
        private noEmptyLine;
        sprint(option?: {
            white?: string;
            black?: string;
            none?: string;
            newline?: string;
        }): string;
        print(white?: string, black?: string, none?: string): void;
        outputBitmapByte(frame?: number): number[];
    }
    class Generator {
        private level;
        private version;
        private lastmask;
        private rawdata;
        private canvas;
        private mask;
        private rating;
        constructor();
        get(): BitCanvas;
        getLevel(): Level;
        setLevel(level: Level): Level;
        getVersion(): number;
        setVersion(version?: number): number;
        getLastMask(): number;
        setRating(rating?: Rating): void;
        setData(data: string | Uint8Array): Uint8Array | null;
        createDataCode(): Uint8Array[];
        drawData(data: Uint8Array, ec: Uint8Array): void;
        createMaskedQRCode(): BitCanvas[];
        evaluateQRCode(qrcodes: BitCanvas[]): number[];
        selectQRCode(qrcodes: BitCanvas[]): number;
        convert(datastr: string, option?: ConvertOption): BitCanvas;
        private createDataBlock;
        private createECBlock;
        private convertStringByte;
        private searchVersion;
        private calcLengthBitarray;
        private spritDataBlock;
        private countErrorCode;
        private interleaveArrays;
        private convertMask;
    }
    function convert(data: string, option: ConvertOption): BitCanvas;
    const INFO: QRInfo;
}
interface QRCodeElement extends HTMLElement {
    value: string;
    level: QRLite.Level | '';
    mask: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    version: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
    scale: number;
    margin: number;
}
