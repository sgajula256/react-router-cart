import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DELETE } from "../redux/actions/action";

const Header = () => {
  const prodcutsInCart = useSelector((state) => state.cartReducer.cartProducts);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [price, setPrice] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteProduct = (id) => {
    dispatch(DELETE(id));
  };
  const totalAmount = () => {
    let price = 0;
    prodcutsInCart.map((item, index) => {
      price = price + item.qnty * item.price;
    });
    setPrice(price);
  };

  useEffect(() => {
    totalAmount();
  }, [totalAmount]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">FoodCart</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={prodcutsInCart.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {prodcutsInCart.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {prodcutsInCart.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td>
                          <NavLink
                            to={`/cart/${element.id}`}
                            onClick={handleClose}
                          >
                            <img
                              src={element.imgdata}
                              style={{ width: "5rem", height: "5rem" }}
                              alt=""
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>{element.rname}</p>
                          <p>Price : ₹{element.price}</p>
                          <p>Quantity : {element.qnty}</p>
                          <p
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => deleteProduct(element.id)}
                          >
                            <i className="fas fa-trash smalltrash"></i>
                          </p>
                        </td>
                        <td
                          className="mt-5"
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => deleteProduct(element.id)}
                        >
                          <i className="fas fa-trash largetrash"></i>
                        </td>
                      </tr>
                    );
                  })}
                  <p className="text-center">Total: ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="card_details d-flex justify-content-center">
              <i
                className="fas fa-close small-close"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  right: 5,
                  top: 1,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 16 }}>Your cart is empty</p>
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
