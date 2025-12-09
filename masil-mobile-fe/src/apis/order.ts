import api from "@/apis/axiosInstance";

// 옵션 정보
export interface OrderItemOption {
  optionId: number;
  optionClass: string;
  optionName: string;
  extraPrice: number;
  quantity: number;
}

// 메뉴 1개 정보
export interface OrderMenuItem {
  menuId: number;
  menuName: string;
  quantity: number;      // 개수
  price: number;         // 메뉴 총 가격
  options: OrderItemOption[]; // 옵션 여러 개
}

// 주문 전체 정보
export interface OrderData {
  orderId: number;
  userId: number;
  storeId: number;
  storeName: string;
  orderDatetime: string;
  representativeMenuName: string;
  totalQuantity: number;
  waitingNum: number;
  totalPrice: number;
  orderStatus: string;
  items: OrderMenuItem[]; // 메뉴 여러 개 (영수증 핵심)
}

// 주문 전체 조회
export const getUserOrders = async (userId: number) => {
  try {
    const res = await api.get(`/t-age/users/${userId}/orders`);

    return {
      success: true,
      data: res.data.data as OrderData[],
    };
  } catch (error) {
    console.error("주문내역 조회 실패:", error);
    return {
      success: false,
      data: [],
    };
  }
};

// 주문 상세 조회 (영수증 전용)
export const getOrderDetail = async (userId: number, orderId: number) => {
  try {
    const res = await api.get(`/t-age/users/${userId}/orders/${orderId}`);

    return {
      success: true,
      data: res.data.data as OrderData, // 단일 주문 상세
    };
  } catch (error) {
    console.error("주문 상세 조회 실패:", error);
    return {
      success: false,
      data: null,
    };
  }
};
