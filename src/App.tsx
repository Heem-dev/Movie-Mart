import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="mainContainer w-screen h-screen bg-background ">
          <div className="topContainer flex justify-end flex-row p-4  w-full max-w-[980px] mx-auto">
            <h1 className="text-center text-3xl font-bold text-primary absolute left-[50%] transform -translate-x-1/2">
              MovieMart
            </h1>
            <div className="themeToggle">
              <ModeToggle></ModeToggle>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
