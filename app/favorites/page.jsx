'use client';
import { useCartFav } from '../context/CartFavContext';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useCartFav();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite items yet.</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b py-4">
            <img src={item.img} alt={item.name} className="w-20 h-20 object-contain" />
            <div className="flex-grow">
              <h2 className="font-semibold">{item.name}</h2>
              <p>{item.price}</p>
            </div>
            <button
              onClick={() => toggleFavorite(item)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove ${item.name} from favorites`}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
