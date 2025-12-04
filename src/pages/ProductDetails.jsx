import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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

  if (!product) return null;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img src={product.image} className="img-fluid rounded shadow-lg" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h1 className="display-4 fw-bold">{product.name}</h1>
          <p className="fs-5 my-4">{product.description}</p>
          <p className="display-5 fw-bold">₹{product.price}</p>
          <button className="btn btn-primary btn-lg mt-4">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
