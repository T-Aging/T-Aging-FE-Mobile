import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserOrders, type OrderData } from "@/apis/order";
import OrderDetailModal from "@/components/OrderDetailModal";

import orderMoney from "@/assets/images/order_money.png";
import orderGlass from "@/assets/images/order_glass.png";

const OrderHistory = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const handleBack = () => navigate(-1);
  const openDetail = (order: OrderData) => setSelectedOrder(order);
  const closeDetail = () => setSelectedOrder(null);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const result = await getUserOrders(userId);
        setOrders(result.data);
      } catch (err) {
        console.error("주문 내역 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-[#F5EEDC]">
      <div className="bg-[#F6E7B4] px-4 py-3">
        <button
          onClick={handleBack}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0DFA8] py-3"
          style={{ fontSize: "5.5vw", fontWeight: 600, color: "#4A3828" }}
        >
          ← 뒤로가기
        </button>

        <div className="mt-4 flex items-center gap-3">
          <img
            src={orderMoney}
            alt="order icon"
            className="h-[7vw] w-[7vw] object-contain"
          />
          <span style={{ fontSize: "8vw", fontWeight: 700, color: "#4A3828" }}>
            주문 내역
          </span>
        </div>
      </div>

      {loading && (
        <div className="mt-10 text-center" style={{ fontSize: "4vw" }}>
          불러오는 중...
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 px-4 pb-10">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="rounded-2xl bg-white p-4 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span style={{ fontSize: "4.5vw", color: "#4A3828" }}>
                {order.storeName}
              </span>

              <button
                onClick={() => openDetail(order)}
                className="flex items-center gap-1"
                style={{ fontSize: "5.5vw", color: "#a95914", fontWeight: 500 }}
              >
                자세히
                <img
                  src={orderGlass}
                  alt="detail"
                  className="h-[7vw] w-[7vw] object-contain"
                />
              </button>
            </div>

            <div
              className="mt-1 font-semibold text-[#4A3828]"
              style={{ fontSize: "8vw" }}
            >
              {order.representativeMenuName}
            </div>

            <div
              className="mt-1 text-[#4A3828] opacity-70"
              style={{ fontSize: "3.8vw" }}
            >
              {order.orderDatetime.replace("T", " ").slice(0, 16)}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="font-bold text-[#4A3828] opacity-90"
                style={{ fontSize: "5vw" }}
              >
                대기번호 {order.waitingNum}
              </span>

              <span
                className="font-semibold text-[#4A3828]"
                style={{ fontSize: "8vw" }}
              >
                {order.totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          isOpen={true}
          onClose={closeDetail}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrderHistory;
