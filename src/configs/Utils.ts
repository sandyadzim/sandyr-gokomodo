export const getImageURL = ( pokemonId: number ) => {
	const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other';

	// Has only PNG.
	if ( Number(pokemonId) >= 650 ) {
		return `${ baseURL }/official-artwork/${ pokemonId }.png`;
	}

	// Has SVG.
	return `${ baseURL }/dream-world/${ pokemonId }.svg`;
}