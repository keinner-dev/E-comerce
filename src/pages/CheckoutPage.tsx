import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart.store';
import { FormCheckout } from '../components/checkout/FormCheckout';
import { ItemsCheckout } from '../components/checkout/ItemsCheckout';
import { useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';

export const CheckoutPage = () => {
	const totalItems = useCartStore(state => state.totalItemsInCart);

	const { isLoading } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isLoading) return <Loader />;

	return (
		<div
			style={{
				minHeight: 'calc(100vh - 100px',
			}}
		>
			<header className='h-[100px] bg-white text-black flex items-center justify-center flex-col px-10 border-b border-slate-200'>
				<Link
					to='/'
					className='self-center text-4xl font-bold tracking-tighter transition-all md:text-5xl md:self-start'
				>
					<p>
						Celulares
						<span className='text-cyan-600'>Baratos</span>
					</p>
				</Link>
			</header>

			<main className='relative flex w-full h-full'>
				{totalItems === 0 ? (
					<div
						className='flex flex-col items-center justify-center w-full gap-5'
						style={{
							height: 'calc(100vh - 100px)',
						}}
					>
						<p className='text-sm font-medium tracking-tight'>
							Su carro esta vacío
						</p>
						<Link
							to='/celulares'
							className='py-4 text-xs font-semibold tracking-widest text-white uppercase bg-black rounded-full px-7'
						>
							Empezar a comprar
						</Link>
					</div>
				) : (
					<>
						<div className='w-full md:w-[50%] p-10'>
							<FormCheckout />
						</div>

						<div
							className='bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block'
							style={{
								minHeight: 'calc(100vh - 100px)',
							}}
						>
							{/* Elementos del carrito */}
							<ItemsCheckout />
						</div>
					</>
				)}
			</main>
		</div>
	);
};

