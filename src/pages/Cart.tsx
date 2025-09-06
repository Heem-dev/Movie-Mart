import { useCart } from "@/hooks/useCart";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (movieId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(movieId);
    } else {
      updateQuantity(movieId, newQuantity);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="font-semibold mb-4 text-destructive text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2">
          Your Cart
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2">
          Your cart is empty. Go to the shop to add some movies!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="font-semibold mb-4 text-destructive text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2">
          Your Cart
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2">
          Review and checkout your selected movies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-20 h-28 flex-shrink-0">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {item.year} • {item.genre || "Action"}
                  </CardDescription>
                  <div className="text-lg font-semibold mt-2">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Subtotal: {item.quantity} × ${item.price.toFixed(2)}
                </span>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}