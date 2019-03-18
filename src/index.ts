/// <reference path="../node_modules/qrlite/src/qrlite.ts" />
/// <reference path="../node_modules/qrlite/docs/qrlite.d.ts" />

/*
<script src="./qr-code.js" tagname="TAG-NAME"></script>
TAG-NAME ... default: qr-code

<qr-code value="VALUE" level="LEVEL" mask="MASK" version="VERSION" scale="SCALE" margin="MARGIN" style="--back:BACK;--front:FRONT"></qr-code>
VALUE   ... QRCode value.
LEVEL   ... QRCode level. 'L', 'M', 'Q', 'H'
MASK    ... QRCode mask number. 0 ... 7
VERSION ... QRCode version. 1 ... 40
SCALE   ... QRCode scale.
MARGIN  ... QRCode frame margin.
BACK    ... QRCode back color.
FRONT   ... QRCode front color.

element.value   ... VALUE.
element.level   ... LEVEL.
element.mask    ... MASK.
element.version ... VERSION.
element.scale   ... SCALE.
element.margin  ... MARGIN.
*/


interface QRCodeElement extends HTMLElement
{
	value: string,
	level: QRLiteLevel | '',
	mask: QRLiteMask,
	version: QRLiteVersion,
	scale: number,
	margin: number,
}

( ( script ) =>
{
	const tagname = ( script ? script.dataset.tagname : '' ) || 'qr-code';
	if ( customElements.get( tagname ) ) { return; }

	class SVGRect
	{
		public x: number;
		public y: number;
		public w: number;
		public h: number;
		public f: string;

		constructor( x: number, y: number, w: number, h: number, fill: string )
		{
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.f = fill;
		}

		public toString() { return '<rect x="' + this.x + '" y="' + this.y + '" width="' + this.w + '" height="' + this.h + '" style="fill:' + this.f + '" />'; }
	}

	class SVG
	{
		private r: SVGRect[];

		constructor( width: number, height: number )
		{
			this.setSize( width, height );
		}

		public setSize( width: number, height: number )
		{
			this.r = [];
			this.r.push( new SVGRect( 0, 0, width, height, 'var(--back)' ) );
		}

		public draw( x: number, y: number )
		{
			this.r.push( new SVGRect( x, y, 1.1, 1.1, 'var(--front)' ) );
		}

		public update( svg: SVGElement )
		{
			const rect = this.r[ 0 ];
			svg.setAttribute( 'width', rect.w + 'px' );
			svg.setAttribute( 'height', rect.h + 'px' );
			svg.setAttribute( 'viewBox', '0 0 ' + rect.w + ' ' + rect.h );
			svg.innerHTML = this.r.join( '' );
		}
	}

	class QRCodeComponent extends HTMLElement implements QRCodeElement
	{
		private shadow: ShadowRoot;

		private updatenow = false;

		constructor()
		{
			super();

			const template = document.createElement( 'template' );
			template.innerHTML = `<style>:host{display:inline-block;--back:#fff;--front:#000;}div{position:relative}canvas,svg{width:100%;display:block}svg{position:absolute;top:0;left:0;height:100%;pointer-events:none}</style><div><canvas id="qr"></canvas><svg id="svg" width="29px" height="29px" viewBox="0 0 29 29"></svg></div>`;

			this.shadow = this.attachShadow( { mode: 'open' } );
			this.shadow.appendChild( document.importNode( template.content, true ) );

			this.update();
		}

		static get observedAttributes()
		{
			return [ 'value', 'level', 'mask', 'version', 'scale', 'margin', 'style' ];
		}

		private positiveNumber( num: string, def: number = 1 )
		{
			const value = parseInt( num || '' ) || 0;
			return value <= 0 ? def : value;
		}

		private numberInRange( num: string, min: number, max: number )
		{
			const value = parseInt( num || '' ) || 0;
			if ( min <= value && value <= max ) { return value; }
			return -1;
		}

		private setOrRemove( name: string, value: string | number )
		{
			if ( value || value === 0 )
			{
				this.setAttribute( name, value + '' );
			} else
			{
				this.removeAttribute( name );
			}
		}

		get value() { return this.getAttribute( 'value' ) || ''; }
		set value( value ) { this.setAttribute( 'value', value || '' ); }

		get level() { return <QRLiteLevel | ''>this.getAttribute( 'level' ) || ''; }
		set level( value ) { this.setOrRemove( 'level', value ); }

		get mask() { return <QRLiteMask>this.numberInRange( this.getAttribute( 'mask' ) || '', 0, 7 ); }
		set mask( value ) { this.setOrRemove( 'mask', value ); }

		get version() { return <QRLiteVersion>this.numberInRange( this.getAttribute( 'version' ) || '', 1, 40 ); }
		set version( value ) { this.setOrRemove( 'version', value ); }

		get scale() { return this.positiveNumber( this.getAttribute( 'scale' ) || '' ); }
		set scale( value ) { this.setOrRemove( 'scale', value ); }

		get margin() { return this.positiveNumber( this.getAttribute( 'margin' ) || '', 4 ); }
		set margin( value ) { this.setOrRemove( 'margin', value ); }

		public attributeChangedCallback( name: string, oldValue: string, newValue: string )
		{
			if ( oldValue === newValue ) { return; }
			this.update();
		}

		private getLevel()
		{
			const level = this.getAttribute( 'level' );
			if ( level === 'L' || level === 'M' || level === 'Q' || level === 'H' ) { return <QRLiteLevel>level; }
			return 'H';
		}

		private update()
		{
			if ( this.updatenow ) { return; }
			this.updatenow = true;
			const text = this.getAttribute( 'value' ) || '';
			const level = this.getLevel();
			const margin = Math.floor( this.positiveNumber( this.getAttribute( 'margin' ) || '', 4 ) );
			const scale = this.positiveNumber( this.getAttribute( 'scale' ) || '' );
			const back = this.style.getPropertyValue('--back') || '#fff';
			const front = this.style.getPropertyValue('--front') || '#000';

			const option: QRLiteConvertOption = { level: level };
			const version = this.version;
			if ( 0 < version ) { option.version = version; }
			const mask = this.mask;
			if ( 0 <= mask ) { option.mask = mask; }
			const qr = new QRLite.Generator();
			const bc = qr.convert( text, option );
			this.setAttribute( 'level', qr.getLevel() );
			this.setAttribute( 'version', qr.getVersion() + '' );

			const canvas = <HTMLCanvasElement>this.shadow.getElementById( 'qr' );
			canvas.width = bc.width + margin * 2;
			canvas.height = bc.height + margin * 2;

			const svg = new SVG( canvas.width, canvas.height );

			const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );
			canvas.width *= scale;
			canvas.height *= scale;
			context.imageSmoothingEnabled = false;
			context.fillStyle = back;
			context.fillRect( 0, 0, canvas.width, canvas.height );
			context.fillStyle = front;

			for ( let y = 0 ; y < bc.height ; ++y )
			{
				for ( let x = 0 ; x < bc.width ; ++x )
				{
					if ( !bc.getPixel( x, y ) ) { continue; }
					context.fillRect( ( x + margin ) * scale, ( y + margin ) * scale, scale, scale );
					svg.draw( x + margin, y + margin );
				}
			}

			svg.update( <any>this.shadow.getElementById( 'svg' ) );
			this.updatenow = false;
		}
	}

	function Init()
	{
		customElements.define( tagname, QRCodeComponent );
	}

	if ( document.readyState === 'loading' )
	{
		document.addEventListener( 'DOMContentLoaded', Init );
	} else { Init(); }
} )( document.currentScript );
