import { useState } from 'react';

interface Props {
	images: string[];
}

export const GridImages = ({ images }: Props) => {
	const [activeImage, setActiveImage] = useState(images[0]);

	const handleImageClick = (image: string) => {
		setActiveImage(image);
	};

	return (
		<div className='relative flex flex-col flex-1 gap-3'>
			<div className='bg-[#f2f2f2] h-[500px] p-4'>
				<img
					src={activeImage}
					alt='Imagen de Producto'
					className='object-contain w-full h-full'
				/>
			</div>

			{/* Miniaturas */}
			<div className='flex gap-2 mt-4'>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => handleImageClick(image)}
						className={`w-16 h-16 p-1 border ${
							activeImage === image
								? 'border-black'
								: 'border-transparent'
						} rounded-lg hover:border-black focus:outline-none`}
					>
						<img
							src={image}
							alt={`Thumbnail ${index + 1}`}
							className='object-cover w-full rounded-lg h-ful'
						/>
					</button>
				))}
			</div>
		</div>
	);
};