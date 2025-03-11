import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import './index.css';

type ChickenPart = { part: string; quantity: number };
type Order = {
  id: string;
  customerName: string;
  chickenParts: ChickenPart[];
  totalPrice: number;
  status: string;
};

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [chickenParts, setChickenParts] = useState<ChickenPart[]>([]);
  const [status, setStatus] = useState("Pending");

  const chickenPartPrices: Record<string, number> = {
    Ala: 8,
    Pierna: 10,
    Encuentro: 10,
    Pecho: 10,
    Mostrito: 13,
    Aguadito: 4,
    Caldo_de_Gallina: 8,
    Cebada_Litro: 4,
    CebadaChica: 1.5,
    Chicha: 4,
    Chicha_Chica: 1.5,
    Agua_Mineral: 2,
    Gaseosa: 3,
    InkaKola: 4,
    CocaCola: 4,
    Fanta: 4,
    Sprite: 4,
  };

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || chickenParts.length === 0) return;

    const newOrder: Order = {
      id: uuidv4(),
      customerName,
      chickenParts,
      totalPrice: chickenParts.reduce(
        (total, part) => total + chickenPartPrices[part.part] * part.quantity,
        0
      ),
      status,
    };

    setOrders([...orders, newOrder]);
    setCustomerName("");
    setChickenParts([]);
    setStatus("Pending");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 bg-red-700">Pedidos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Nombre o mesa</label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Productos</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(chickenPartPrices).map((part) => (
              <div key={part} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={chickenParts.some((p) => p.part === part)}
                  onChange={() =>
                    setChickenParts((prev) => {
                      const exists = prev.some((p) => p.part === part);
                      return exists
                        ? prev.filter((p) => p.part !== part)
                        : [...prev, { part, quantity: 1 }];
                    })
                  }
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">{part} (S/{chickenPartPrices[part]})</span>
                {chickenParts.some((p) => p.part === part) && (
                  <input
                    type="number"
                    value={
                      chickenParts.find((p) => p.part === part)?.quantity || 1
                    }
                    onChange={(e) =>
                      setChickenParts((prev) =>
                        prev.map((p) =>
                          p.part === part
                            ? { ...p, quantity: Number(e.target.value) }
                            : p
                        )
                      )
                    }
                    min={1}
                    className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md">Add Order</button>
        </div>
      </form>
      <h2 className="text-xl font-bold mb-2">Lista de pedidos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Nombre o Mesa</th>
              <th className="py-2">Producto</th>
              <th className="py-2">Precio Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">
                  {order.chickenParts
                    .map((p) => `${p.part} x ${p.quantity}`)
                    .join(", ")}
                </td>
                <td className="border px-4 py-2">S/{order.totalPrice}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      setOrders((prev) =>
                        prev.map((o) =>
                          o.id === order.id ? { ...o, status: e.target.value } : o
                        )
                      )
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {["Pendiente", "Llevar", "Cancelado"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}