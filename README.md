# QRCodeComponent

Web Components to draw QRCode.

QRコードを表示するWebComponentsです。
JSファイルを1つ読み込むだけでなんとかなります。

# Sample

https://hirokimiyaoka.github.com/QRCodeComponent/

``` html
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>QRCodeComponent</title>
	<script src="./qr-code.js"></script>
</head>
<body>
	<qr-code value="test" style="width:80px"></qr-code>
</body>
</html>
```

``` js
customElements.whenDefined( 'qr-code' ).then( () => {
	const qr = document.querySelector( 'qr-code' );
	qr.value = 'test';
} );
```

# File

Download [./docs/qr-code.js](https://github.com/HirokiMiyaoka/QRCodeComponent/raw/master/docs/qr-code.js)

or

``` text
https://hirokimiyaoka.github.io/QRCodeComponent/qr-code.js
```

# How to use

## Load

``` html
<script src="./qr-code.js"></script>
```

``` html
<script src="./qr-code.js" data-tagname="TAG-NAME"></script>
```

## Set value

``` html
<qr-code value="test"></qr-code>
```

``` js
qrcodeElement.value = 'test';
```

## Set level

``` html
<qr-code level="L"></qr-code>
```

``` js
qrcodeElement.value = 'L';
```

level = `L` | `M` | `Q` | `H`

## Size

``` html
<qr-code style="width:80px"></qr-code>
```

``` js
qrcodeElement.style.width = '80px';
```

## Scale[default=1]

``` html
<qr-code scale="2"></qr-code>
```

``` js
qrcodeElement.style.scale = 2;
```

## Margin[default=4]

``` html
<qr-code margin="8"></qr-code>
```

``` js
qrcodeElement.style.margin = 8;
```

## Color

* Back color[default = #FFFFFF]
  * background-color
* Front color[default = #000000]
  * color

``` html
<qr-code style="background-color:lightgray;color:gray;"></qr-code>
```

``` js
qrcodeElement.style.backgroundColor = 'lightgray';
qrcodeElement.style.color = 'gray';
```

# Default style

``` css
qr-code { display: inline-block; }
```

# Types

`./docs/qr-code.d.ts`

* QRLite
  * In QRLite.
* QRCodeElement
  * Type of `<qr-code>`.
  * But cannot `new QRCodeElement()`.
  * `const qr = <QRCodeElement>new ( customelements.get( 'qr-code' ) )();`

# Other

## TODO

* SVGを保存したい。
  * getterだけでも用意すべきか。
* テキスト形式もいけるなら便利かもしれない。
* どこまでダイエットできるか
  * 読み込みパターン周りも計算できるならそれにしたいが、なかなか面倒。
  * G(x)も計算はできるがコード量とかも考えてどうしようか考え中。

## Comment

* Canvasがどうしても見た目的にぼやける。
  * `imageSmoothingEnabled` 使ってもなんかだめ。
  * そのため、Canvasの上にクリックアクション無効なSVGを用意した。
  * これで見た目はきれいで、右クリックとかするとPNGで保存できるQRコードを表示できるようになった。
