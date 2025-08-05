import Footer from "./components/footer"
import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="mainContainer h-screen w-screen bg-background min-h-screen flex flex-col">
          <div className="topContainer flex justify-end flex-row p-4  w-full max-w-[980px] mx-auto">
            <h1 className="text-center text-5xl font-bold text-primary absolute left-[50%] transform -translate-x-1/2">
              MovieMart
            </h1>
            <div className="themeToggle">
              <ModeToggle></ModeToggle>
            </div>
          </div>
          <div className="contentContainer p-4">
            <div className="heroSection text-center p-8 mt-2">
              <h2 className="text-2xl font-semibold mb-4 text-destructive">
                Welcome to MovieMart
              </h2>
              <p className="text-gray-600">
                Your one-stop destination for all your movie needs. Explore,
                search, and enjoy a vast collection of movies.
              </p>
            </div>
          </div>
          <div className="footerContainer p-4 text-center  mt-auto">
            <Footer></Footer>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
