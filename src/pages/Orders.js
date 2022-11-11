import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const loadOrderList = () => {
    orderService.list().then((res) => {
      setOrders(res.data);
    });
  };

  useEffect(() => {
    loadOrderList();
  }, []);

  const handleOrderStatus = (e, order) => {
    const data = {
      ...order,
      status: "success",
    };

    orderService.update(order.id, data).then((res) => {
      loadOrderList();
    });
  };

  return (
    <div>
      <div className="m-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">Danh sách sản phẩm</h3>
              </div>
              <div className="col-auto">
                <button
                  variant="primary"
                  // onClick={(e) => showModalHandle(e, 0)}
                  type="button"
                  className="btn btn-primary"
                >
                  <i className="bi-plus-lg" /> Add
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered border-primary table-hover table-striped">
                <thead>
                  <tr className="table-primary border-primary text-center align-middle">
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "5%" }}>ID</th>
                    <th style={{ width: "10%" }}>Người nhận hàng</th>
                    <th style={{ width: "10%" }}>Số điện thoại</th>
                    <th style={{ width: "15%" }}>Địa chỉ</th>
                    <th style={{ width: "5%" }}>Tổng tiền</th>
                    <th style={{ width: "10%" }}>Trạng thái</th>
                    <th style={{ width: "10%" }}>Thanh toán</th>
                    <th>Chi tiết đơn hàng</th>
                    <th style={{ width: "8%" }} />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id}>
                      <td className="align-middle text-center">{index + 1}</td>
                      <td className="align-middle text-center">{order.id}</td>
                      <td className="align-middle text-center">
                        {order.fullName}
                      </td>
                      <td className="align-middle text-center fs-5">
                        {order.phoneNumber}
                      </td>
                      <td className="align-middle text-center">
                        {order.address}
                      </td>
                      <td className="align-middle text-center">
                        {order.totalPrice}
                      </td>
                      <td className="align-middle text-center">
                        {order.status === "pending" ? (
                          <button
                            onClick={(e) => {
                              handleOrderStatus(e, order);
                            }}
                            className="btn btn-primary"
                          >
                            Xác nhận
                          </button>
                        ) : (
                          order.status
                        )}
                      </td>
                      <td className="align-middle text-center">
                        {order.isPaid === false ? "Ship COD" : "Đã thanh toán"}
                      </td>
                      <td className="align-middle text-center"></td>
                      <td className="align-middle text-center">
                        <a
                          href="/#"
                          // onClick={(e) => showModalHandle(e, product.id)}
                        >
                          <i className="bi-pencil-square text-primary me-3" />
                        </a>
                        <a
                          href="/#"
                          // onClick={(e) => handleDelete(e, product.id)}
                        >
                          <i className="bi-trash text-danger" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
