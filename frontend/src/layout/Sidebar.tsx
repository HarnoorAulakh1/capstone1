import {
  LayoutDashboard,
  Stethoscope,
  ClipboardList,
  Trash2,
  Coffee,
  GraduationCap,
  LogOut,

} from "lucide-react";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineInventory,MdEventAvailable } from "react-icons/md";

import { useContext } from "react";
import { userContext } from "@/store/userContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const links = [
  {
    role: "receptionist",
    links: [
      {
        name: "Dashboard",
        href:"/app",
        logo: <LayoutDashboard className="mr-3 h-5 w-5" />,
      },
      {
        name: "OPD",
        href:"/app/opd",
        logo: <Stethoscope className="mr-3 h-5 w-5" />,
      },
      {
        name: "OPD Log",
        href:"/app/opdLog",
        logo: <ClipboardList className="mr-3 h-5 w-5" />,
      },
      {
        name: "Medical Waste",
        href:"/app",
        logo: <Trash2 className="mr-3 h-5 w-5" />,
      },
      {
        name: "Rest",
        href:"/app",
        logo: <Coffee className="mr-3 h-5 w-5" />,
      },
      {
        name: "Training",
        href:"/app",
        logo: <GraduationCap className="mr-3 h-5 w-5" />,
      },
    ],
  },
  {
    role: "paramedic",
    links: [
      {
        name: "Dashboard",
        href:"/app",
        logo: <LayoutDashboard className="mr-3 h-5 w-5" />,
      },
      {
        name:"Inventory",
        href:"/app/inventory",
        logo:<MdOutlineInventory className="mr-3 h-5 w-5" />
      },
      {
        name: "Patient Queue",
        href:"/app/opdLog",
        logo: <ClipboardList className="mr-3 h-5 w-5" />,
      },
      {
        name: "Available",
        href:"/app",
        logo: <MdEventAvailable className="mr-3 h-5 w-5" />,
      },
      {
        name: "Rest",
        href:"/href",
        logo: <Coffee className="mr-3 h-5 w-5" />,
      },
      {
        name: "Training",
        href:"/app",
        logo: <GraduationCap className="mr-3 h-5 w-5" />,
      },
    ],
  },
  {
    role: "doctor",
    links:[
      {
        name: "Dashboard",
        href:"/app",
        logo: <LayoutDashboard className="mr-3 h-5 w-5" />,
      },
      {
        name: "Prescribe",
        href:"/app/prescribe",
        logo: <LuNotebookPen className="mr-3 h-5 w-5" />,
      },
      {
        name: "OPD Log",
        href:"/app/opdLog",
        logo: <ClipboardList className="mr-3 h-5 w-5" />,
      },
      {
        name: "Training",
        href:"/app",
        logo: <GraduationCap className="mr-3 h-5 w-5" />,
      },

    ]
  }
];

export default function Sidebar() {
  const {user}=useContext(userContext);
  const links1=links.find((link)=>link.role===user.role)?.links;
  const navigate=useNavigate();
  async function logout(){
    const response=await axios.get("/api/user/logout");
    console.log(response.status);
    navigate("/auth");
  }
  return (
    <div className="fixed left-0 top-0 h-full w-[15%] bg-darkBlue text-white">
      <div className="flex gap-2 items-center text-xl font-semibold p-4">
        <div className="size-12 rounded-full overflow-hidden">
          <img src="/tiet_logo.jpg" className="w-full h-full object-cover" />
        </div>
        <h1>TIET MediHub</h1>
      </div>

      <div className="px-4">
        <nav className="space-y-2">
          {links1?.map((link, i) => (
            <Link
              to={link.href || "/href"}
              key={i}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg group transition-colors duration-200"
            >
              {link.logo}
              <p className="group-hover:ml-1.5 transition-all duration-300">
                {link.name}
              </p>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <button onClick={()=>logout()} className="flex w-full items-center px-4 py-3 text-gray-300 group hover:bg-gray-700 rounded-lg">
          <LogOut className="mr-3 h-5 w-5" />
          <p className="group-hover:ml-1.5 transition-all duration-300">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
}
