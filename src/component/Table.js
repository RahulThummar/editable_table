import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

function Table() {
  const [productData, setProductData] = useState([
    {
      id: 1,
      name: "T-shirts",
      qty: 20,
      price: 10,
    },

    {
      id: 2,
      name: "shirts",
      qty: 20,
      price: 10,
    },

    {
      id: 3,
      name: "chocolate",
      qty: 20,
      price: 10,
    },

    {
      id: 4,
      name: "toys",
      qty: 20,
      price: 10,
    },

    {
      id: 5,
      name: "books",
      qty: 200,
      price: 10,
    },
  ]);

  const [productQty, setProductQuantity] = useState();
  const [productAmount, setProductAmount] = useState();
  const [show, setShow] = useState();

  let filteredData = [];

  const openEdit = (productData) => {
    setProductAmount(productData.price);
    setProductQuantity(productData.qty);
    setShow(productData.id);
  };

  const onSave = (data) => {
    {
      let pdata = productData.find((t) => t.id === data.id);
      pdata.qty = productQty;
      pdata.price = productAmount;

      setShow(true); 

      if (data.id) {
        toast.success(`You are updated Id : ${data.id} data successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };

  const OnDelete = (data) => {
    filteredData = productData.filter((x) => x.id !== data.id);
    setProductData(filteredData);
    console.log(filteredData);
   console.log(data) 
    if (data.id) {
      toast.error(`You are deleted Id :  ${data.id} data successfully`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div>
      <table border={1} className=" table table-striped table table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>qty</th>
            <th>price</th>
            <th>total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {productData.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                {show === item.id ? (
                  <td>
                    <input
                      value={productQty}
                      type="number"
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                  </td>
                ) : (
                  <td>{item.qty}</td>
                )}
                {show === item.id ? (
                  <td>
                    <input
                      value={productAmount}
                      type="number"
                      onChange={(e) => setProductAmount(e.target.value)}
                    />
                  </td>
                ) : (
                  <td>{item.price}</td>
                )}  

                {show === item.id ? (
                  <td>{productQty * productAmount}</td>
                ) : (
                  <td>{item.qty * item.price}</td>
                )}

                
                {show === item.id ? (
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => onSave(item)}
                    >
                      Save
                    </button>
                    {""}
                    <button
                      className="btn btn-danger"
                      onClick={() => OnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => openEdit(item)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => OnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer limit={1} autoClose={2000} />
    </div>
  );
}

export default Table;



