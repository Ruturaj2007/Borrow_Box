import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Box, Calendar, User } from "lucide-react";

const PORT = import.meta.env.VITE_PORT;
const API_URL = `http://localhost:${PORT}/api`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);

        if (!response.ok) {
          throw new Error("This item is no longer listed.");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading item...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-700">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 text-indigo-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to browse
        </Link>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to browse
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            {images.length > 0 ? (
              <img
                src={images[active].url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <Box className="w-16 h-16" />
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((image, i) => (
                <button
                  key={image.id}
                  onClick={() => setActive(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    i === active ? "border-indigo-600" : "border-transparent"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mt-3">
            {product.title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Condition: {product.condition}
          </p>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {product.owner?.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Up to {product.maxBorrowDays} days
            </span>
          </div>

          <p className="mt-6 text-gray-700 whitespace-pre-line">
            {product.description}
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100">
            {product.isAvailable ? (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                Available
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                Currently borrowed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
