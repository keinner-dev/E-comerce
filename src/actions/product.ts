import { supabase } from "../supabase/client"

export const getProducts = async () => {
    const {data: products, error} = await supabase.from('products').select('*, variants(*)').order('created_at', {ascending: false});

    if( error ){
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
}

export const getFilteredProducts = async ({page = 1, brands = []}: {
    page: number;
    brands: string[];
}) => {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase.from('products').select('*, variants(*)', {count: 'exact'}).order('created_at', {ascending: false}).range(from, to);

    if(brands.length > 0) {
        query = query.in('brand', brands)
    }

    const { data, error, count } =  await query;

    if( error ){
        console.log(error.message);
        throw new Error(error.message);
    }

    return { data, count };
};

export const getRecentProducts = async () => {
    const { data: products, error} = await supabase.from('products').select('*, variants(*)').order('created_at', {ascending: false}).limit(4);

    if( error ){
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
};

export const getRandomProducts = async () => {
    const { data: products, error} = await supabase.from('products').select('*, variants(*)').limit(20);

    if( error ){
        console.log(error.message);
        throw new Error(error.message);
    }

    //SELECCIONAR 4 PRODUCTOS AL AZAR//
    const randomProducts = products.sort(() => Math.random() - 0.5).slice(0, 4);

    return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
	const { data, error } = await supabase
		.from('products')
		.select('*, variants(*)')
		.eq('slug', slug)
		.single();

	if (error) {
		console.log(error.message);
		throw new Error(error.message);
	}

	return data;
};