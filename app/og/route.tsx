// import { ImageResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { logToHub } from '@/utils/hub-log';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const postTitle = searchParams.get('title');
	const font = fetch(new URL('../../public/fonts/kaisei-tokumin-bold.ttf', import.meta.url)).then(
		(res) => res.arrayBuffer()
	);
	let fontData: ArrayBuffer;
	try {
		fontData = await font;
	} catch (err) {
		await logToHub({
			level: 'error',
			event: 'api.error',
			fields: {
				route: '/og',
				message: err instanceof Error ? err.message : String(err)
			}
		});
		throw err;
	}

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundImage: 'url(https://einargudni.com/og-bg.png)'
				}}
			>
				<div
					style={{
						marginLeft: 190,
						marginRight: 190,
						display: 'flex',
						fontSize: 130,
						fontFamily: 'Kaisei Tokumin',
						letterSpacing: '-0.05em',
						fontStyle: 'normal',
						color: 'white',
						lineHeight: '120px',
						whiteSpace: 'pre-wrap'
					}}
				>
					{postTitle}
				</div>
			</div>
		),
		{
			width: 1920,
			height: 1080,
			fonts: [
				{
					name: 'Kaisei Tokumin',
					data: fontData,
					style: 'normal'
				}
			]
		}
	);
}
