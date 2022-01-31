import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constans/API";
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    fullName: "",
    username: "",
    email: "",
    password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value; // untuk menyimpan data yang sudah diinput
    const name = event.target.name; //fullName

    this.setState({ [name]: value }); //Bracket ([]) name untuk mengambil data dari input
  };

  registerHandler = () => {
    const { fullName, username, email, password } = this.state; //Destructor
    Axios.post(`${API_URL}/users`, {
      fullName,
      username,
      email,
      password,
      role: "user",
    })
      .then(() => {
        alert("Berhasil Mendapatkan User!");
      })
      .catch(() => {
        alert("Gagal Mendaftarkan User!");
      });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>Register Now!</h1>
              <p className="lead">
                Register now and start shopping in the most affordable ecommerce
                platform
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3"> Register</h5>
                <input
                  name="fullName"
                  onChange={this.inputHandler}
                  type="text"
                  placeholder="Full Name"
                  className="form-control my-2"
                />
                <input
                  name="username"
                  onChange={this.inputHandler}
                  type="text"
                  placeholder="Username"
                  className="form-control my-2"
                />
                <input
                  name="email"
                  onChange={this.inputHandler}
                  type="text"
                  placeholder="Email"
                  className="form-control my-2"
                />
                <input
                  name="password"
                  onChange={this.inputHandler}
                  type="password"
                  placeholder="Password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-item-center">
                  <button
                    onClick={() => this.props.registerUser(this.state)}
                    className="btn btn-primary mt-2"
                  >
                    Register
                  </button>
                  <Link to="/login">Or login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
