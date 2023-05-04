import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import productsData from "../constants/productsData";
import "../style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

const ProductsMenu = () => {
  const [data, setData] = useState(productsData);
  const dispatch = useDispatch();
  function addToCart(item) {
    dispatch(ADD(item));
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">Food Cart Menu</h2>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((item, index) => {
          return (
            <>
              <Card
                key={index}
                className="mx-2 mt-4 card_style"
                style={{ width: "18rem", border: "none" }}
              >
                <Card.Img
                  variant="top"
                  src={item.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{item.rname}</Card.Title>
                  <Card.Text>Price : ₹ {item.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="col-lg-12"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsMenu;
