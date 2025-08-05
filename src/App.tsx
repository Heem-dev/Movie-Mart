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
          <div className="footerContainer p-4 text-center  mt-auto ">
            <p className="text-sm text-gray-500">© 2025 MovieMart</p>
            <p className="text-sm text-gray-500">
              Developed by
              <a
                className="hover:underline text-primary text-center"
                href="https://github.com/Heem-dev"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github inline-block ml-2 align-middle mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>{" "}
                Heem
              </a>
            </p>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
