import { MainMenu } from "./components";

export const GeneralLayout = ({ children, rightSide, rightSideClasses }) => {
  return (
    <div>
      <MainMenu />
      <div className="ml-[90px] md:ml-[250px] xl:ml-[250px]  relative flex flex-col xl:flex-row gap-5 mt-24">
        <div className="w-full xl:w-[1000px]  order-2 xl:order-1 h-[calc(100vh-190px)] ml-0   ">
          {children}
        </div>
        {rightSide && (
          <div
            className={`w-[100%] xl:w-[400px] order-1 xl:order-2 xl:sticky  h-full lg:top-0   xl:right-0 ${
              rightSideClasses ?? ""
            }`}
          >
            {rightSide}
          </div>
        )}
      </div>
    </div>
  );
};
