import { CardProduct } from '../components/products/CardProduct';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { allCelulares } from '../data/initialData';
import { prepareProducts } from '../helpers';

export const CellPhonesPage = () => {
	const preparedProducts = prepareProducts(allCelulares);

	return (
		<>
			<h1 className='mb-12 text-5xl font-semibold text-center'>
				Celulares
			</h1>

			<div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
				{/* FILTROS */}
				<ContainerFilter />

				<div className='flex flex-col col-span-2 gap-12 lg:col-span-2 xl:col-span-4'>
					<div className='grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4'>
						{preparedProducts.map(product => (
							<CardProduct
								key={product.id}
								name={product.name}
								price={product.price}
								colors={product.colors}
								img={product.images[0]}
								slug={product.slug}
								variants={product.variants}
							/>
						))}
					</div>

					{/* TODO: Paginación */}
				</div>
			</div>
		</>
	);
};

