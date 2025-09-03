import Footer from "./components/footer";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Routes, Route, Link } from "react-router"; 

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  const largeResponsiveFonts = 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl px-2';
  const normalResponsiveFonts = 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2';
  const responsiveFonts = normalResponsiveFonts;
  // const smallResponsiveFonts = 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2';

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className={`mainContainer h-screen w-screen bg-background min-h-screen flex flex-col ${responsiveFonts}`}>
          <div className="topContainer flex justify-end flex-row p-4  w-full max-w-[980px] mx-auto">
            <h1 className={`text-center font-bold text-primary absolute left-[50%] transform -translate-x-1/2 ${largeResponsiveFonts}`}>
              MovieMart
            </h1>
            <div className="themeToggle">
              <ModeToggle />
            </div>
          </div>
          <div className="navBarContainer pt-4">
            <NavigationMenu className="w-full max-w-[980px] text-center mx-auto mt-3 ">
              <NavigationMenuList className="justify-center flex flex-row gap-8  ">
                <NavigationMenuItem className="bg-secondary rounded-md px-2">
                  <Link to="/" className={`${responsiveFonts} align-middle`}>Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="bg-secondary rounded-md px-2">
                  <Link to="/shop" className={responsiveFonts}>Shop</Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="bg-secondary rounded-md px-2">
                  <Link to="/cart" className={responsiveFonts}>Cart</Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="contentContainer p-4 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <div className="footerContainer p-4 text-center mt-auto">
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
