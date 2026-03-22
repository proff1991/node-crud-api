import { Product } from "../models/product.model";

type ClusterMessage =
  | { type: "CREATE_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: { id: string } };
var products = new Map<string, Product>();
var sendMessage = (message: ClusterMessage) => {
  if (process.send) {
    process.send(message);
  }
};

export var productStore = {
  getAll: (): Product[] => {
    return Array.from(products.values());
  },

  getById: (id: string): Product | undefined => {
    return products.get(id);
  },

  create: (product: Product, silent = false): void => {
    products.set(product.id, product);

    if (!silent) {
      sendMessage({
        type: "CREATE_PRODUCT",
        payload: product,
      });
    }
  },

  update: (id: string, product: Product, silent = false): void => {
    products.set(id, product);
    if (!silent) {
      sendMessage({
        type: "UPDATE_PRODUCT",
        payload: product,
      });
    }
  },

  delete: (id: string, silent = false): boolean => {
    var result = products.delete(id);
    if (!silent) {
      if (result) {
        sendMessage({
          type: "DELETE_PRODUCT",
          payload: { id },
        });
      }
    }
    return result;
  },

};

export var handleClusterMessage = (message: ClusterMessage) => {

  if (message.type === "CREATE_PRODUCT") {
    productStore.create(message.payload, true);
  } else if (message.type === "UPDATE_PRODUCT") {
    productStore.update(message.payload.id, message.payload, true);
  } else if (message.type === "DELETE_PRODUCT") {
    productStore.delete(message.payload.id, true);
  }

};
export var isClusterMessage = (message: unknown): message is ClusterMessage => {
  if (!message || typeof message !== "object") {
    return false
  };

  var innerMessage = message as any;

  if (!("type" in innerMessage)) {
    return false
  };

  return (
    innerMessage.type === "CREATE_PRODUCT"
    || innerMessage.type === "UPDATE_PRODUCT"
    || innerMessage.type === "DELETE_PRODUCT"
  );
};