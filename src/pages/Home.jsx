import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">
          <h2 className="h4">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-1 fw-bold text-primary">Discover Quality Products</h1>
          <p className="fs-5 text-muted col-md-8 mx-auto">
            Explore our curated selection of top-rated items. Find exactly what
            you need with guaranteed satisfaction and fast shipping.
          </p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() =>
              productsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop All Collections
          </button>
        </div>
      </div>

      <div className="container my-5" ref={productsRef}>
        <h2 className="text-center mb-5 display-4 fw-bold">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center fs-4 text-muted">No products found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((p) => (
              <div className="col" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="text-center p-4 mt-5 bg-light">
        <p>Copyright SRB© 2025 - All rights reserved by E-Commerce Inc.</p>
      </footer>
    </div>
  );
};

export default Home;
