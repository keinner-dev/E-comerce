import { Link } from 'react-router-dom';

export const Banner = () => {
	return (
		<div className='relative text-white bg-gray-900'>
			{/* IMAGEN DE FONDO */}
			<div
				className='absolute inset-0 h-full bg-center bg-cover opacity-70'
				style={{ backgroundImage: 'url(/img/img-banner.jpg)' }}
			/>

			{/* OVERLAY */}
			<div className='absolute inset-0 bg-black opacity-50' />

			{/* CONTENIDO */}
			<div className='relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center lg:py-40 lg:px-8'>
				<h1 className='mb-4 text-4xl font-bold lg:text-6xl'>
					Los mejores celulares del 2024
				</h1>

				<p className='mb-8 text-lg lg:text-2xl'>
					Descubre las ofertas exclusivas y las últimas novedades en
					celulares
				</p>

				<Link
					to='/celulares'
					className='px-6 py-3 font-semibold text-white transition duration-300 ease-in-out bg-gray-900 rounded-lg shadow-lg hover:bg-gray-950'
				>
					Ver celulares
				</Link>
			</div>
		</div>
	);
};
