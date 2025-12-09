import type { OrderData } from "@/apis/order";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData;
}

const OrderDetailModal = ({
  isOpen,
  onClose,
  order,
}: OrderDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2
          className="mb-4 text-center font-semibold"
          style={{ fontSize: "7vw" }}
        >
          주문 상세
        </h2>

        <div className="font-bold text-[#4A3828]" style={{ fontSize: "5.5vw" }}>
          {order.storeName}
        </div>

        <div
          className="mb-4 text-[#4A3828] opacity-70"
          style={{ fontSize: "4vw" }}
        >
          {order.orderDatetime.replace("T", " ").slice(0, 16)}
        </div>

        {/* 메뉴 리스트 */}
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="border-b pb-3">
              <div
                className="flex justify-between font-semibold text-[#4A3828]"
                style={{ fontSize: "5.5vw" }}
              >
                <span>
                  {item.menuName} x {item.quantity}
                </span>
                <span>{item.price.toLocaleString()}원</span>
              </div>

              {/* 옵션 리스트 */}
              {item.options.length > 0 ? (
                <div className="mt-2 ml-2 space-y-2">
                  {item.options.map((opt, oIdx) => {
                    const addedPrice = opt.extraPrice * opt.quantity;

                    return (
                      <div
                        key={oIdx}
                        className="flex items-center justify-between text-[#4A3828]"
                        style={{ fontSize: "4.8vw", fontWeight: 500 }}
                      >
                        <span>• {opt.optionName}</span>

                        <div className="flex items-center gap-3">
                          <span>{opt.quantity}개</span>

                          <span className="font-semibold text-[#6B3F21]">
                            +{addedPrice.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="mt-2 ml-2 text-[#4A3828] opacity-60"
                  style={{ fontSize: "4.5vw" }}
                >
                  옵션 없음
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 총 금액 */}
        <div
          className="mx-auto mt-6 rounded-xl bg-[#F6E7B4] py-3 text-center"
          style={{ width: "90%" }}
        >
          <div
            className="font-semibold text-[#4A3828]"
            style={{ fontSize: "5vw" }}
          >
            총 결제금액
          </div>
          <div className="font-bold text-[#4A3828]" style={{ fontSize: "7vw" }}>
            {order.totalPrice.toLocaleString()}원
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#6B3F21] py-3 text-white"
          style={{ fontSize: "5.5vw", fontWeight: 600 }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
