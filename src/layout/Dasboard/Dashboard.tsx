import { imageUrl } from "@/redux/api/apiSlice";
import { useGetProfileQuery } from "@/redux/apiSlices/authApi";
import { deleteFromLocalStorage, isLoginUser } from "@/util/local-storage";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import {
  Bell,
  Boxes,
  CalendarCheck2,
  CircleAlert,
  Container,
  Database,
  Image,
  LayoutDashboard,
  Lock,
  LogOut,
  MessageCircle,
  Notebook,
  NotebookPen,
  Settings,
  ShieldPlus,
  ShieldQuestion,
  SquareMenu,
  User2,
  User2Icon,
} from "lucide-react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGetNotificationsQuery } from "@/redux/apiSlices/notificationApi";
const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    path: "/user-details",
    title: "User Details",
    icon: <User2 size={18} />,
  },
  {
    path: "/schedule-record",
    title: "Schedule Record",
    icon: <User2 size={18} />,
  },
  {
    path: "/manages",
    title: "Promo/Package",
    icon: <SquareMenu size={18} color="#fff" />,
    subMenu: [
      {
        path: "/promo-code",
        title: "Manage Promo",
        icon: <Container size={18} color="#fff" />,
      },
      {
        path: "/packages",
        title: "Manage Package",
        icon: <Boxes size={18} color="#fff" />,
      },
    ],
  },
  {
    path: "/training-program",
    title: "Add Programs",
    icon: <CalendarCheck2 size={18} />,
  },
  {
    path: "/training-articles",
    title: "Training Articles",
    icon: <Notebook size={18} />,
  },
  {
    path: "/chat",
    title: "Chat",
    icon: <MessageCircle size={18} />,
  },

  {
    path: "/settings",
    title: "Settings",
    icon: <Settings size={18} color="#fff" />,
    subMenu: [
      {
        path: "/slider",
        title: "Sliders",
        icon: <Image size={18} color="#fff" />,
      },
      {
        path: "/terms-and-conditions",
        title: "Terms and Conditions",
        icon: <NotebookPen size={18} color="#fff" />,
      },
      {
        path: "/privacy-policy",
        title: "Privacy Policy",
        icon: <Database size={18} color="#fff" />,
      },
      {
        path: "/about",
        title: "About",
        icon: <CircleAlert size={18} color="#fff" />,
      },
      {
        path: "/faq",
        title: "FAQ",
        icon: <ShieldQuestion size={18} color="#fff" />,
      },
    ],
  },
  {
    path: "/make-admin",
    title: "Make Admin",
    icon: <ShieldPlus size={18} />,
  },
];

const content = (
  <div className="w-40">
    <p className="mb-2">
      {" "}
      <Link to="/profile" className="flex items-center gap-2">
        {" "}
        <User2Icon size={18} /> <span className="text-md">Profile</span>
      </Link>
    </p>
    <p className="mb-3">
      {" "}
      <Link to="/change-password" className="flex items-center gap-2">
        {" "}
        <Lock size={18} /> <span className="text-md">Change password</span>
      </Link>
    </p>
  </div>
);
const { SubMenu } = Menu;
const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedUser = isLoginUser();
  const { data, isLoading } = useGetProfileQuery(undefined);
  const {data: notification} = useGetNotificationsQuery(undefined)
  useEffect(() => {
    if (!isLoggedUser) {
      navigate("/auth/login");
    }
  }, [navigate, isLoggedUser]);

  if (isLoading) {
    return null;
  }
  const handleLogout = () => {
    deleteFromLocalStorage("dentistAuthToken");
    navigate("/auth/login");
  };

  return (
    <Layout>
      <Sider
        width={300}
        className="sidebar-menu"
        style={{
          overflow: "auto",
          height: "100vh",
          zIndex: 2,
          backgroundColor: "#1E1E1E",
        }}
        trigger={null}
      >
        <img src={logo} alt="" className="mx-auto mb-8 mt-5 w-[150px]" />
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "white" }}
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item, index) =>
            item.subMenu ? (
              <SubMenu
                key={`sub-${index}`}
                icon={item.icon}
                style={{ color: "#fff", fontSize: "16px" }}
                title={item.title}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <Menu.Item
                    key={`sub-${index}-${subIndex}`}
                    icon={subItem.icon}
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    <Link to={`${item.path}${subItem.path}`}>
                      {subItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={`item-${index}`}
                icon={item.icon}
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  marginBottom: "10px",
                  display: data?.data?.role === "ADMIN" &&  item?.path === "/make-admin" ? "none" : "block"              
                  // background: pathname === "/" ? "#DD1122" : "",
                }}
              >
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )
          )}
          <Menu.Item
            key="500"
            className=""
            icon={<LogOut size={20} />}
            style={{ color: "#fff", fontSize: "16px" }}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#1E1E1E",
            height: "80px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="flex items-center gap-5">
            <Badge count={notification?.data?.unreadNotification} className="cursor-pointer">
              <Link to="/notifications">
                {" "}
                <Bell size={30} color="#fff" />
              </Link>
            </Badge>

            <Popover
              className="cursor-pointer"
              placement="bottom"
              content={content}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#DD1122",
                  }}
                  icon={
                    <img src={  data?.data?.profile_image?.startsWith("https") ? data?.data?.profile_image  : `${imageUrl}/${data?.data?.profile_image}`} />
                  }
                />
              </div>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            background: "#1e1e1ef7",
            height: `calc(100vh - 80px)`,
          }}
          
        >
          <div className="bg-[#404141] bg-opacity-[10%] h-[calc(100vh-130px)] m-6 rounded overflow-y-scroll">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
