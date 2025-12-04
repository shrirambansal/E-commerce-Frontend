import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">₹{product.price}</p>
        <div className="mt-auto">
          <Link to={`/product/${product._id}`} className="btn btn-primary w-100">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
