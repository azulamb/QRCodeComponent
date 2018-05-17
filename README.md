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

# How to use

## Load

```
<script type="text/javascript" src="./qr-code.js"></script>
```

## Set value

```
<qr-code value="test""></qr-code>
```

```
qrcodeElement.value = 'test';
```

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

# Other

## TODO

* SVGを保存したい。
    * getterだけでも用意すべきか。

## Comment

* Canvasがどうしても見た目的にぼやける。
    * `imageSmoothingEnabled` 使ってもなんかだめ。
    * そのため、Canvasの上にクリックアクション無効なSVGを用意した。
    * これで見た目はきれいで、右クリックとかするとPNGで保存できるQRコードを表示できるようになった。
