import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DELETE, ADD, DELETE_ONE } from "../redux/actions/action";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const reloadHomePage = useNavigate();

  const { id } = useParams();
  const prodcutsInCart = useSelector((state) => state.cartReducer.cartProducts);

  const compareProducts = () => {
    let comparedata = prodcutsInCart.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };
  useEffect(() => {
    compareProducts();
  }, [id]);

  const addToCart = (item) => {
    dispatch(ADD(item));
  };
  const deleteProduct = (id) => {
    reloadHomePage("/");
    dispatch(DELETE(id));
  };
  const deleteOne = (item) => {
    if (item.id === 1) reloadHomePage("/");
    dispatch(DELETE_ONE(item));
  };
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Product Details Page</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((item) => {
              return (
                <>
                  <div className="items_img" key={item.id}>
                    <img
                      src={item.imgdata}
                      style={{ height: "15rem", width: "15rem" }}
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {item.rname}
                          </p>
                          <p>
                            <strong>Price</strong> :₹ {item.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {item.address}
                          </p>
                          <p>
                            <strong>Total</strong> :₹ {item.price * item.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                item.qnty <= 1
                                  ? () => deleteProduct(item.id)
                                  : () => deleteOne(item)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{item.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => addToCart(item)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating :</strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {item.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>
                            {item.somedata}
                          </p>
                          <p>
                            <strong>Remove :</strong>
                            <span
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => deleteProduct(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetails;
