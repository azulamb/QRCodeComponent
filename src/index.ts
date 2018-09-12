/// <reference path="../node_modules/qrlite/src/qrlite.ts" />

(() =>
{
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
		private back: string;
		private front: string;

		constructor( width: number, height: number, back: string, front: string )
		{
			this.back = back;
			this.front = front;
			this.setSize( width, height );
		}

		public setSize( width: number, height: number )
		{
			this.r = [];
			this.r.push( new SVGRect( 0, 0, width, height, this.back ) );
		}

		public draw( x: number, y: number )
		{
			this.r.push( new SVGRect( x, y, 1.1, 1.1, this.front ) );
		}

		public update( svg: HTMLElement )
		{
			const rect = this.r[ 0 ];
			svg.setAttribute( 'width', rect.w + 'px' );
			svg.setAttribute( 'height', rect.h + 'px' );
			svg.setAttribute( 'viewBox', '0 0 ' + rect.w + ' ' + rect.h );
			svg.innerHTML = this.r.join( '' );
		}
	}

	class CRCodeComponent extends HTMLElement
	{
		private shadow: ShadowRoot;

		constructor()
		{
			super();

			const template = document.createElement( 'template' );
			template.innerHTML = `<style>div{position:relative}canvas,svg{width:100%;display:block}svg{position:absolute;top:0;left:0;height:100%;pointer-events:none}</style><div><canvas id="qr"></canvas><svg id="svg" width="29px" height="29px" viewBox="0 0 29 29"></svg></div>`;

			this.shadow = this.attachShadow( { mode: 'open' } );
			this.shadow.appendChild( document.importNode( template.content, true ) );

			this.update();
		}

		static get observedAttributes()
		{
			return [ 'value', 'scale' ];
		}

		private positiveNumber( num: string, def: number = 1 )
		{
			const scale = parseInt( num || '' ) || 0;
			return scale <= 0 ? def : scale;
		}

		get value() { return this.getAttribute( 'value' ); }
		set value( value ) { this.setAttribute( 'value', value || '' ); }

		get scale() { return this.positiveNumber( this.getAttribute( 'scale' ) || '' ); }
		set scale( value ) { this.setAttribute( 'scale', value + '' ); }

		get margin() { return this.positiveNumber( this.getAttribute( 'margin' ) || '', 4 ); }
		set margin( value ) { this.setAttribute( 'margin', value + '' ); }

		public attributeChangedCallback( name: string, oldValue: any, newValue: any )
		{
			this.update();
		}

		private update()
		{
			const text = this.getAttribute( 'value' ) || '';
			const margin = Math.floor( this.positiveNumber( this.getAttribute( 'margin' ) || '', 4 ) );
			const scale = this.positiveNumber( this.getAttribute( 'scale' ) || '' );
			const back = this.style.getPropertyValue('background-color') || '#ffffff';
			const front = this.style.getPropertyValue('color') || '#000000';

			const qr = QRLite.convert( text );

			const canvas = <HTMLCanvasElement>this.shadow.getElementById( 'qr' );
			canvas.width = qr.width + margin * 2;
			canvas.height = qr.height + margin * 2;

			const svg = new SVG( canvas.width, canvas.height, back, front );

			const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );
			canvas.width *= scale;
			canvas.height *= scale;
			context.imageSmoothingEnabled = false;
			context.fillStyle = back;
			context.fillRect( 0, 0, canvas.width, canvas.height );
			context.fillStyle = front;

			for ( let y = 0 ; y < qr.height ; ++y )
			{
				for ( let x = 0 ; x < qr.width ; ++x )
				{
					if ( !qr.getPixel( x, y ) ) { continue; }
					context.fillRect( ( x + margin ) * scale, ( y + margin ) * scale, scale, scale );
					svg.draw( x + margin, y + margin );
				}
			}

			svg.update( <HTMLElement>this.shadow.getElementById( 'svg' ) );
		}
	}

	const style = document.createElement( 'style' );
	style.textContent = 'qr-code{display:inline-block;}';
	document.head.appendChild( style );

	customElements.define( 'qr-code', CRCodeComponent );
})();
