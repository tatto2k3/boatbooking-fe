import SearchPage from "./Components/Layouts/BookingMain/SearchPage";
import DefaultLayOut from "./Components/Layouts/DeafaultLayout/DefaultLayout";
import SearchTicket from "./Components/Pages/SearchTicket/SearchTicket";
import MainLayoutLogin from "./Components/Layouts/MainLayoutLogin/MainLayoutLogin";
import TicketReview from "./Components/Pages/TicketReview/TicketReview";
import Explore from "./Components/Pages/Explore/explore";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import LayoutAboutUs from "./Components/Layouts/LayoutAboutUs/LayoutAboutUs";
import TicketPage from "./Components/Pages/Ticket/TicketPage";
import MainLayout from "./Components/Layouts/MainLayout/MainLayOut";
import Payment from "./Components/Pages/Payment/Payment";
import Login from "./Components/Pages/Login/Login";
import SignUp from "./Components/Pages/SignUp/SignUp";
import SeatBooking from "./Components/Pages/Seat/SeatBooking";
import Sidebar from "./Components/Layouts/Sidebar/Sidebar";
import AdminLayout from "./Components/Layouts/AdminLayout/AdminLayout";
import Schedule from "./Components/Pages/Admin/Schedule/Schedule";
import ScheduleAdd from "./Components/Pages/Admin/ScheduleAdd/ScheduleAdd";
import ScheduleEdit from "./Components/Pages/Admin/ScheduleEdit/ScheduleEdit";
import Customer from "./Components/Pages/Admin/Customer/Customer";
import CustomerAdd from "./Components/Pages/Admin/CustomerAdd/CustomerAdd";
import CustomerEdit from "./Components/Pages/Admin/CustomerEdit/CustomerEdit";
import Boat from "./Components/Pages/Admin/Boat/Boat";
import BoatAdd from "./Components/Pages/Admin/BoatAdd/BoatAdd";
import BoatEdit from "./Components/Pages/Admin/BoatEdit/BoatEdit";
import Port from "./Components/Pages/Admin/Port/Port";
import PortAdd from "./Components/Pages/Admin/PortAdd/PortAdd";
import PortEdit from "./Components/Pages/Admin/PortEdit/PortEdit";
import Ticket from "./Components/Pages/Admin/Ticket/Ticket";
import TicketAdd from "./Components/Pages/Admin/TicketAdd/TicketAdd";
import TicketEdit from "./Components/Pages/Admin/TicketEdit/TicketEdit";



const AppRoutes = [
  
  {
    path: '/',
    element: SearchPage,
    layout: DefaultLayOut
  },
  {
    path: '/search-ticket',
    element: SearchTicket,
    layout: MainLayoutLogin
  },
  {
    path: '/ticket-review',
    element: TicketReview,
    layout: MainLayoutLogin
  },
  {
    path: '/explore',
    element: Explore,
    layout: MainLayoutLogin
  },
  {
    path: '/about-us',
    element: AboutUs,
    layout: LayoutAboutUs
  },
  {
    path: '/ticket',
    element: TicketPage,
    layout: MainLayout
  },
  
  {
    path: '/seat',
    element: SeatBooking,
    layout: MainLayout
  },
  {
    path: '/payment',
    element: Payment,
    layout: MainLayout
  },
  {
    path: '/sign-in',
    element: Login,
    layout: MainLayoutLogin
  },
  {
    path: '/sign-up',
    element: SignUp,
    layout: MainLayoutLogin
  },
  {
    path: '/admin/schedule',
    element: Schedule,
    layout: Sidebar
  },
  {
    path: '/admin/schedule-edit',
    element: ScheduleEdit,
    layout: AdminLayout
  },
  {
    path: '/admin/schedule-add',
    element: ScheduleAdd,
    layout: AdminLayout
  },
  {
    path: '/admin/ticket',
    element: Ticket,
    layout: Sidebar
  },
  {
    path: '/admin/ticket-edit',
    element: TicketEdit,
    layout: AdminLayout
  },
  {
    path: '/admin/ticket-add',
    element: TicketAdd,
    layout: AdminLayout
  },
  {
    path: '/admin/customer',
    element: Customer,
    layout: Sidebar
  },
  {
    path: '/admin/customer-edit',
    element: CustomerEdit,
    layout: AdminLayout
  },
  {
    path: '/admin/customer-add',
    element: CustomerAdd,
    layout: AdminLayout
  },
  {
    path: '/admin/boat',
    element: Boat,
    layout: Sidebar
  },
  {
    path: '/admin/boat-edit',
    element: BoatEdit,
    layout: AdminLayout
  },
  {
    path: '/admin/boat-add',
    element: BoatAdd,
    layout: AdminLayout
  },
  {
    path: '/admin/port',
    element: Port,
    layout: Sidebar
  },
  {
    path: '/admin/port-edit',
    element: PortEdit,
    layout: AdminLayout
  },
  {
    path: '/admin/port-add',
    element: PortAdd,
    layout: AdminLayout
  },



];

export default AppRoutes;
