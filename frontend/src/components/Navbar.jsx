/* This example requires Tailwind CSS v2.0+ */

import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LoginTemplate } from "../components/LoginForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { NotificationContext } from "../contexts/NotificationContext";
import { socket } from "../socket";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const history = useHistory();

  const { currentUser,setCurrentUser } = useContext(UserContext);
  const { notifications, setNotifications, deleteNotification, deleteNotifications } = useContext(NotificationContext)

  const logout = async () => {
    await fetch("/logout");
    setCurrentUser("")
    history.push("/");
  };

  const pathTo = (e) => {
    history.push(`/${e.target.name}`);
  }
    
  const handleNotification = async (n) => {
    await deleteNotification(n.id)
    history.push(`/auction-details/${n.itemId}`)
  }

  const clearAll = async () => {
    await deleteNotifications(notifications.map(n => n.id))
  }

  socket.on("notification", (n, t) => {
    if(n.userId == currentUser.id) {
      let list = []
      for(let i = 0; i < notifications.length; i++) {
        list.push(notifications[i])
      }
      n.title = t
      list.push(n)
      setNotifications(list)
    }
  })

  const pagesArray = ["Buying", "Selling", "Messages"];


  return (
    <Disclosure as="nav" className="bg-myGr-dark fixed w-screen -mt-16 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-white ">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={pathTo}
                    id="logo"
                    className="block lg:hidden h-8 w-auto"
                  >
                    logo
                  </button>
                </div>
                <div className="hidden sm:block sm:ml-6"></div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {currentUser ? (
                  <Menu as="div" className="ml-3 relative">
                    <div className="relative">
                      <Menu.Button>
                        <BellIcon
                          className="h-8 w-8 text-white"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      {notifications.length > 0 && (
                        <span className="text-xs text-center absolute h-4 w-4 rounded-full bg-red-600 left-5">
                          {notifications.length}
                        </span>
                      )}
                    </div>
                    <Menu.Items className="fixed bg-gray-700 w-44 right-0 top-16">
                      <div>
                        {notifications &&
                          notifications.map((n) => (
                            <Menu.Item
                              key={n.id}
                              onClick={() => handleNotification(n)}
                            >
                              <div
                                className="bg-white px-2 py-2 text-sm text-gray-700"
                                href="/myPage"
                              >
                                <div className="font-semibold">{n?.title}</div>
                                <div className="text-red-600">
                                  {n.highestBid ? (
                                    <span>New bid: {n.highestBid}</span>
                                  ) : (
                                    <span>New bid!</span>
                                  )}
                                </div>
                              </div>
                            </Menu.Item>
                          ))}
                        {notifications.length > 0 && (
                          <div
                            className=" bg-white py-2 text-xs text-myGr-dark text-center"
                            onClick={() => {
                              clearAll();
                            }}
                          >
                            clear all
                          </div>
                        )}
                      </div>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <div></div>
                )}

                {/* Profile dropdown */}
                <Menu  as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full ">
                      <UserCircleIcon
                        className="h-11 w-11"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="fixed bg-white border-l-2 border-b-2 border-myGr-dark   w-44 right-0 top-16">
                    {currentUser ? (
                      <div>
                        <Menu.Item>
                          <div
                            className="block px-4 py-2 text-sm text-myGr-dark text-center"
                            href="/myPage"
                          >
                            {currentUser.email}
                          </div>
                        </Menu.Item>
                        {pagesArray.map((page, i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <a name={page} onClick={pathTo} className={classNames("block px-4 py-2 text-sm text-gray-700 text-center")} > {page}</a> )}
                          </Menu.Item>
                        ))}          
                        <Menu.Item>
                          {({ active }) => (
                              <a onClick={logout} className={classNames("block px-4 py-2 text-sm text-gray-700 text-center" )}>Log out</a>)}
                        </Menu.Item>
                      </div>
                    ) : (
                      <Menu.Item>
                    <LoginTemplate setCurrentUser={setCurrentUser} />
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
