interface QRCodeElement extends HTMLElement {
    value: string;
    level: QRLiteLevel | '';
    mask: QRLiteMask;
    version: QRLiteVersion;
    scale: number;
    margin: number;
    copyToClipboard(): boolean;
}
