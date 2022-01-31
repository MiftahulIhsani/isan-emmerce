import React from "react";
import "../assets/styles/productCard.css";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  render() {
    return (
      <>
        <div className="card product-card">
          <img src={this.props.productData.productImage} alt="" />

          <div className="mt-2">
            <div>
              <Link
                to={`/product-detail?${this.props.productData.id}`} //pake substring
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h6>{this.props.productData.productName}</h6>
              </Link>
              <span className="text-muted">
                Rp. {this.props.productData.price}
              </span>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-primary mt-2">Add to cart</button>
          </div>
        </div>
      </>
    );
  }
}

export default ProductCard;
