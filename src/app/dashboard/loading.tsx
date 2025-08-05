import ClassesTableSkeleton from "./components/ClassTable/ClassesTableSkeleton";

export default function Loading() {
  return (
    <main className="w-full md:h-dvh flex flex-col justify-between">
      <div className="md:w-auto w-full">
        <>
          <nav
            className={`fixed z-50 lg:px-10 md:px-8 sm:px-5 px-2.5 d-navbar bg-base-100 border-0 border-base-300 border-b`}
          >
            <div className="w-full text-primary lg:text-3xl md:text-2xl sm:text-2xl text-2xl flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="bi bi-book me-1.5" aria-hidden></i>
                FantaProf
              </div>
            </div>
          </nav>
          <nav
            className={`lg:px-10 md:px-8 sm:px-5 px-2.5 invisible d-navbar bg-base-100 border-0 border-base-300 border-b`}
          >
            <div className="w-full text-primary lg:text-3xl md:text-2xl sm:text-2xl text-2xl flex items-center justify-between">
              <div className="flex items-center justify-center">
                <i className="bi bi-book me-1.5" aria-hidden></i>
                FantaProf
              </div>
            </div>
          </nav>
        </>
        <div className="lg:px-10 lg:pt-10 md:px-8 md:pt-8 sm:px-5 sm:pt-2.5 p-2.5 max-h-full">
          <h1 className="text-3xl mb-2.5 font-extrabold">Bentornato!</h1>
          {/**Stats */}

          <div className="sm:mb-3.5 mb-2.5 lg:space-x-5 space-x-2.5 grid grid-cols-2 ">
            <section
              className={`d-card space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 shadow-lg border border-base-content/10 grow-1 d-skeleton`}
            >
              <div className="lg:text-2xl md:text-xl sm:text-md text-md d-skeleton">
                <p className="invisible">{"<headingStat>"}</p>
              </div>
              <div className="text-primary lg:text-4xl md:text-3xl text-2xl d-skeleton">
                <p className="invisible">{"<mainStat>"}</p>
              </div>
              <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 d-skeleton">
                <p className="invisible">{"<footerStat>"}</p>
              </div>
            </section>
            <section
              className={`d-card space-y-2.5 sm:px-5 sm:py-6 px-3 py-4 shadow-lg border border-base-content/10 grow-1 d-skeleton`}
            >
              <div className="lg:text-2xl md:text-xl sm:text-md text-md d-skeleton">
                <p className="invisible">{"<headingStat>"}</p>
              </div>
              <div className="text-primary lg:text-4xl md:text-3xl text-2xl d-skeleton">
                <p className="invisible">{"<mainStat>"}</p>
              </div>
              <div className="lg:text-xl md:text-lg sm:text-lg text-sm opacity-70 d-skeleton">
                <p className="invisible">{"<footerStat>"}</p>
              </div>
            </section>
          </div>
          {/**Classes */}
          <ClassesTableSkeleton />
        </div>
      </div>
    </main>
  );
}
