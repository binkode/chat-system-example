import Loader from "./Loader.jsx";

function ThemedSuspense() {
  return (
    <div className="w-full h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <Loader />
    </div>
  );
}

export default ThemedSuspense;
