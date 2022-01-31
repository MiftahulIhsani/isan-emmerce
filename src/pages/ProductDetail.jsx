import React from "react";
import Axios from 'axios';
import { API_URL } from '../constans/API';

class ProductDetail extends React.Component {
  state = {
    productData: {},
    ProductNotFound: false,
  };
  fetchProductData = () => {
    // alert(window.location.search)
    Axios.get(`${API_URL}/products`, {
      params: {
        id: window.location.search.productId,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ productData: result.data[0] });
        } else {
          this.setState({ ProductNotFound: true });
        }
      })
      .catch(() => {
        alert(`Terjadi kesalahan server`);
      });
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    return (
      <div className="container">
        {this.state.ProductNotFound ? (
          <div>
            Product with ID {this.props.match.params.productId} has not been
            found
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col-6">
              <img
                style={{ width: "100%" }}
                src={this.state.productData.productImage}
                alt=""
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <h4>{this.state.productData.productName}</h4>
              <h5>Rp.{this.state.productData.price}</h5>
              <p>{this.state.productData.description}</p>
              <div className="d-flex flex-row align-item-center">
                <button className="btn btn-primary mx-4">-</button>2
                <button className="btn btn-primary mx-4">+</button>
              </div>
              <button className="btn btn-success mt-3">Add to cart</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductDetail;
