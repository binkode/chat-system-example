export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-gray-900"
            : "relative") + " pb-1 pt-1"
        }
      >
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © {new Date().getFullYear()} Tailwind Starter Kit by{" "}
              <a
                href="https://www.creative-tim.com"
                className="text-gray-600 hover:text-gray-900"
              >
                Creative Tim
              </a>
              .
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
