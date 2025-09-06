import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";
import { useCart } from "@/hooks/useCart";

interface NavBarProps {
  responsiveFonts: string;
}

export function NavBar({ responsiveFonts }: NavBarProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="navBarContainer pt-4">
      <NavigationMenu className="w-full max-w-[980px] text-center mx-auto mt-3">
        <NavigationMenuList className="justify-center flex flex-row gap-4 sm:gap-6 md:gap-8">
          <NavigationMenuItem className="rounded-md">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${responsiveFonts} inline-flex items-center justify-center text-center w-20 sm:w-24 md:w-28 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isActive ? "bg-primary text-background font-semibold" : "text-primary hover:bg-primary/10"
                }`
              }
            >
              Home
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="rounded-md">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${responsiveFonts} inline-flex items-center justify-center text-center w-20 sm:w-24 md:w-28 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isActive ? "bg-primary text-background font-semibold" : "text-primary hover:bg-primary/10"
                }`
              }
            >
              Shop
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="rounded-md">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${responsiveFonts} inline-flex items-center justify-center text-center w-20 sm:w-24 md:w-28 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isActive ? "bg-primary text-background font-semibold" : "text-primary hover:bg-primary/10"
                }`
              }
            >
              Cart{totalItems > 0 && (
                <span className="ml-1 bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
