import TeachersTableHeader from "./components/TeachersTableHeader";
import TeacherTableSkeleton from "./components/TeachersTableSkeleton";

export default function MarketLoading() {
  return (
    <>
      <TeachersTableHeader />
      <TeacherTableSkeleton>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="d-skeleton bg-base-200 lg:d-card-lg md:d-card-md d-card-md shadow-sm p-0 "
            key={index}
          >
            <div className="d-card-body">
              <div className="flex gap-3 flex-row items-center">
                <div className="d-avatar rounded-full size-max d-skeleton bg-base-200">
                  <span className="lg:size-32 md:size-28 size-24 flex items-center justify-center bg-base-300 rounded-full lg:text-5xl text-4xl invisible">
                    {"<icon>"}
                  </span>
                </div>

                <div className="flex flex-col justify-between flex-1 max-w-full d-skeleton bg-base-200">
                  <div className="h-min">
                    <h2 className="font-bold lg:text-3xl text-2xl invisible ">
                      {`<name-surname>`}
                    </h2>
                  </div>

                  <h4 className="opacity-70 invisible">
                    Costo: {"<price>"} crediti
                  </h4>
                </div>
              </div>
              <div className="flex flex-col items-end d-skeleton bg-base-200">
                <p
                  className={`opacity-70 lg:text-2xl w-full text-xl break-words line-clamp-2 invisible`}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Necessitatibus voluptates ducimus reprehenderit repudiandae
                  velit obcaecati animi facilis quis voluptatibus! Fugiat
                  voluptatibus at dolorum? Inventore hic, sint dolor doloremque
                  blanditiis adipisci.
                </p>
              </div>
              <div className="mt-6 flex gap-1.5">
                <button className="d-btn d-btn-primary d-skeleton bg-base-200 border-0 shadow-none flex-1">
                  <p className="invisible">Compra</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </TeacherTableSkeleton>
    </>
  );
}
