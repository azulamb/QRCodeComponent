# QRCodeComponent

Web Components to draw QRCode.

QRコードを表示するWebComponentsです。
JSファイルを1つ読み込むだけでなんとかなります。

# Sample

https://hirokimiyaoka.github.com/QRCodeComponent/

```
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>QRCodeComponent</title>
	<script type="text/javascript" src="./qr-code.js"></script>
</head>
<body>
	<qr-code value="test" style="width:80px"></qr-code>
</body>
</html>
```

# File

Download [./docs/qr-code.js](https://github.com/HirokiMiyaoka/QRCodeComponent/raw/master/docs/qr-code.js)

or

```
https://hirokimiyaoka.github.io/QRCodeComponent/qr-code.js
```

# How to use

## Load

```
<script type="text/javascript" src="./qr-code.js"></script>
```

## Set value

```
<qr-code value="test"></qr-code>
```

```
qrcodeElement.value = 'test';
```

## Set level

```
<qr-code level="L"></qr-code>
```

```
qrcodeElement.value = 'L';
```

level = `L` | `M` | `Q` | `H`

## Size

```
<qr-code style="width:80px"></qr-code>
```

```
qrcodeElement.style.width = '80px';
```

## Scale[default=1]

```
<qr-code scale="2"></qr-code>
```

```
qrcodeElement.style.scale = 2;
```

## Margin[default=4]

```
<qr-code margin="8"></qr-code>
```

```
qrcodeElement.style.margin = 8;
```

## Color

* Back color[default = #FFFFFF]
    * background-color
* Front color[default = #000000]
    * color

```
<qr-code style="background-color:lightgray;color:gray;"></qr-code>
```

```
qrcodeElement.style.backgroundColor = 'lightgray';
qrcodeElement.style.color = 'gray';
```

# Default style

Add default style in `<head>`.

```
qr-code { display: inline-block; }
```

# Other

## TODO

* SVGを保存したい。
    * getterだけでも用意すべきか。
* Styleを`<head>`の先頭に。
* どこまでダイエットできるか
    * 読み込みパターン周りも計算できるならそれにしたいが、なかなか面倒。
    ＊G(x)も計算はできるがコード量とかも考えてどうしようか考え中。

## Comment

* Canvasがどうしても見た目的にぼやける。
    * `imageSmoothingEnabled` 使ってもなんかだめ。
    * そのため、Canvasの上にクリックアクション無効なSVGを用意した。
    * これで見た目はきれいで、右クリックとかするとPNGで保存できるQRコードを表示できるようになった。
