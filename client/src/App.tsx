import AppRoutes from "./routes";
// import {useState} from "react";
// import BellIcon from "./components/ui/BellIcon";


function App() {
  // const [showNotifications, setShowNotifications] = useState(false);
  // const [hasNotification] = useState(true); // Set to true to show the red dot for demo

  return (
    <>
     {/* <div className="fixed top-4 right-8 z-[9999]">
  <BellIcon onClick={() => setShowNotifications((v) => !v)} hasNotification={hasNotification}/>
  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-[9999] animate-fade-in border">
      <h3 className="font-semibold mb-2">Notifications</h3>
      <div className="text-gray-600 text-sm">No new notifications</div>
    </div>
  )}
</div> */}
    <AppRoutes />
    </>
  );
}

export default App;
