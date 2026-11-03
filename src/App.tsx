import { useState } from "react";
import { ShoppingCart, ClipboardList, ArrowLeft, Package } from "lucide-react";
import { QuickSell } from "./pages/QuickSell";
import { Orders } from "./pages/Orders";
import { OrderDetailView } from "./pages/OrderDetailView";
import { ModifyOrderReceipt } from "./pages/ModifyOrderReceipt";
import { Inventory } from "./pages/Inventory";
import { AddProduct } from "./pages/AddProduct";
import { EditProduct } from "./pages/EditProduct";
import { ProductDetails } from "./pages/ProductDetails";
import { ProductReceipts } from "./pages/ProductReceipts";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

type View =
  | "quick-sale"
  | "sales-orders"
  | "inventory"
  | "add-product"
  | "edit-product"
  | "product-details"
  | "product-receipts"
  | "order-detail"
  | "edit-order";

export default function App() {
  const [view, setView] = useState<View>("quick-sale");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const showOrders = () => setView("sales-orders");
  const openOrder = (order: any) => {
    setSelectedOrder(order);
    setView("order-detail");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-lg font-black tracking-tight">Sales Counter</p>
            <p className="text-xs text-slate-500">Quick Sale &amp; Sales Order</p>
          </div>
          <nav className="flex shrink-0 flex-wrap justify-end gap-2" aria-label="Sales pages">
            <Button variant={view === "quick-sale" ? "default" : "outline"} onClick={() => setView("quick-sale")}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Quick Sale
            </Button>
            <Button variant={view === "sales-orders" ? "default" : "outline"} onClick={showOrders}>
              <ClipboardList className="mr-2 h-4 w-4" /> Sales Order
            </Button>
            <Button
              variant={
                ["inventory", "add-product", "edit-product", "product-details", "product-receipts"].includes(view)
                  ? "default"
                  : "outline"
              }
              onClick={() => setView("inventory")}
            >
              <Package className="mr-2 h-4 w-4" /> Inventory
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-3 py-5 sm:px-6">
        {view === "quick-sale" && <QuickSell onFinalizeSale={showOrders} />}
        {view === "inventory" && (
          <Inventory
            onNavigateToAddProduct={() => setView("add-product")}
            onNavigateToEditProduct={(productId) => {
              setSelectedProductId(productId);
              setView("edit-product");
            }}
            onNavigateToProductDetails={(productId) => {
              setSelectedProductId(productId);
              setView("product-details");
            }}
          />
        )}
        {view === "add-product" && (
          <AddProduct
            onBack={() => setView("inventory")}
            onCreated={(productId) => {
              setSelectedProductId(productId);
              setView("product-details");
            }}
          />
        )}
        {view === "edit-product" && (
          <EditProduct
            productId={selectedProductId}
            onBack={() => setView("inventory")}
            onUpdated={() => setView("product-details")}
          />
        )}
        {view === "product-details" && (
          <ProductDetails
            productId={selectedProductId}
            onBack={() => setView("inventory")}
            onNavigateToEdit={(productId) => {
              setSelectedProductId(productId);
              setView("edit-product");
            }}
            onSelectProduct={setSelectedProductId}
            onNavigateToSell={() => setView("quick-sale")}
            onViewOrderDetail={(order) => {
              setSelectedOrder(order);
              setView("order-detail");
            }}
            onNavigateToReceipts={(productId) => {
              setSelectedProductId(productId);
              setView("product-receipts");
            }}
          />
        )}
        {view === "product-receipts" && (
          <ProductReceipts
            productId={selectedProductId}
            onBack={() => setView("product-details")}
          />
        )}
        {view === "sales-orders" && (
          <Orders onNavigateToSell={() => setView("quick-sale")} onViewOrderDetail={openOrder}
            onEditOrder={(order) => { setEditingOrder(order); setView("edit-order"); }} />
        )}
        {view === "order-detail" && (
          <OrderDetailView order={selectedOrder} onBack={showOrders}
            onNavigateToEditOrder={(order) => { setEditingOrder(order); setView("edit-order"); }} />
        )}
        {view === "edit-order" && (
          <ModifyOrderReceipt initialOrder={editingOrder || selectedOrder}
            orderId={editingOrder?._id || editingOrder?.id || selectedOrder?._id || selectedOrder?.id}
            onBack={() => setView(selectedOrder ? "order-detail" : "sales-orders")}
            onOrderUpdated={(order) => { setSelectedOrder(order); setEditingOrder(order); setView("order-detail"); }} />
        )}
        {(view === "order-detail" || view === "edit-order") && (
          <Button variant="ghost" className="mt-4" onClick={() => setView(view === "edit-order" && selectedOrder ? "order-detail" : "sales-orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        )}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
