import { useEffect, useState } from "react";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="admin-page">
      <h1>ShopEase Admin Panel</h1>

      <p className="admin-subtitle">
        Manage and view customer orders
      </p>

      <h2>Customer Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>

            <p>
              <strong>Customer:</strong>{" "}
              {order.customer.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customer.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.customer.address}
            </p>

            <hr />

            <h4>Ordered Products</h4>

            {order.items.map((item, index) => (
              <div className="admin-product" key={index}>
                <span>{item.title}</span>

                <span>
                  Rs.{" "}
                  {Number(item.price).toLocaleString(
                    "en-PK"
                  )}
                </span>
              </div>
            ))}

            <h3 className="order-total">
              Total: Rs.{" "}
              {Number(order.total).toLocaleString(
                "en-PK"
              )}
            </h3>

            <p className="order-date">
              Order Date:{" "}
              {new Date(order.date).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;