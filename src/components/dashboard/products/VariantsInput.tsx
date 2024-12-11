import {
	Control,
	useFieldArray,
	FieldErrors,
	UseFormRegister,
	useWatch,
} from 'react-hook-form';
import { ProductFormValues } from '../../../lib/validators';
import {
	IoIosAddCircleOutline,
	IoIosCloseCircleOutline,
} from 'react-icons/io';
import { useEffect, useState } from 'react';

interface Props {
	control: Control<ProductFormValues>;
	errors: FieldErrors<ProductFormValues>;
	register: UseFormRegister<ProductFormValues>;
}

const headersVariants = ['Stock', 'Precio', 'Capacidad', 'Color', ''];

export const VariantsInput = ({
	control,
	errors,
	register,
}: Props) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: 'variants',
	});

	const [colorActive, setColorActive] = useState<boolean[]>([]);

	const addVariant = () => {
		append({
			stock: 0,
			price: 0,
			storage: '',
			color: '',
			colorName: '',
		});
	};

	const removeVariant = (index: number) => {
		remove(index);
	};

	const toggleColorActive = (index: number) => {
		setColorActive(prev =>
			prev.map((item, i) => (i === index ? !item : item))
		);
	};

	// Usar useWatch una sola vez para observar todos los valores del color y del colorName
	const colorValues = useWatch({
		control,
		name: fields.map(
			(_, index) => `variants.${index}.color` as const
		),
	});

	const colorNameValues = useWatch({
		control,
		name: fields.map(
			(_, index) => `variants.${index}.colorName` as const
		),
	});

	const getFirstError = (
		variantErros: FieldErrors<ProductFormValues['variants'][number]>
	) => {
		if (variantErros) {
			const keys = Object.keys(
				variantErros
			) as (keyof typeof variantErros)[];
			if (keys.length > 0) {
				return variantErros[keys[0]]?.message;
			}
		}
	};

	useEffect(() => {
		setColorActive(prev =>
			fields.map((_, index) => prev[index] || false)
		);
	}, [fields]);

	return (
		<div className='flex flex-col gap-3'>
			<div className='pb-6 space-y-4 border-b border-slate-200'>
				<div className='grid justify-start grid-cols-5 gap-4'>
					{headersVariants.map((header, index) => (
						<p
							key={index}
							className='text-xs font-semibold text-slate-800'
						>
							{header}
						</p>
					))}
				</div>
				{fields.map((field, index) => (
					<div key={field.id}>
						<div className='grid items-center grid-cols-5 gap-4'>
							<input
								type='number'
								placeholder='Stock'
								{...register(`variants.${index}.stock`, {
									valueAsNumber: true,
								})}
								className='border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none'
							/>

							<input
								type='number'
								step='0.01'
								placeholder='Precio'
								{...register(`variants.${index}.price`, {
									valueAsNumber: true,
								})}
								className='border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none'
							/>

							<input
								type='text'
								placeholder='64 GB'
								{...register(`variants.${index}.storage`)}
								className='border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none'
							/>

							<div className='relative flex'>
								{colorActive[index] && (
									<div className='absolute bg-stone-100 rounded-md bottom-8 left-[40px] p-1 w-[100px] h-fit space-y-2'>
										<input
											type='color'
											{...register(`variants.${index}.color`)}
											className='rounded-md px-3 py-1.5 w-full'
										/>

										<input
											type='text'
											placeholder='Azul Marino'
											{...register(`variants.${index}.colorName`)}
											className='rounded-md px-3 py-1.5 w-full text-xs focus:outline-none font-semibold placeholder:font-normal'
										/>
									</div>
								)}
								<button
									className='flex items-center justify-center w-full h-8 text-xs font-medium border rounded cursor-pointer'
									type='button'
									onClick={() => toggleColorActive(index)}
								>
									{colorValues[index] && colorNameValues[index] ? (
										<span
											className={`inline-block w-4 h-4 rounded-full bg-block`}
											style={{
												backgroundColor: colorValues[index],
											}}
										/>
									) : (
										'Añadir'
									)}
								</button>
							</div>

							<div className='flex justify-end'>
								<button
									type='button'
									onClick={() => removeVariant(index)}
									className='p-1'
								>
									<IoIosCloseCircleOutline size={20} />
								</button>
							</div>
						</div>

						{errors.variants && errors.variants[index] && (
							<p className='mt-1 text-xs text-red-500'>
								{getFirstError(errors.variants[index])}
							</p>
						)}
					</div>
				))}
			</div>

			<button
				type='button'
				onClick={addVariant}
				className='flex items-center self-center gap-1 px-4 py-2 text-sm font-semibold tracking-tight rounded-md text-slate-800 hover:bg-slate-100'
			>
				<IoIosAddCircleOutline size={16} />
				Añadir Variante
			</button>

			{fields.length === 0 && errors.variants && (
				<p className='mt-1 text-xs text-red-500'>
					Debes añadir al menos una variante
				</p>
			)}
		</div>
	);
};
