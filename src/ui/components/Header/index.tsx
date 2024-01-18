import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	BellIcon,
	XMarkIcon,
	ArrowRightOnRectangleIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import userStore from "@/zustand/user.store";
import router from "@/routes";
import Logo from "@/assets/Icon/Logo.svg";

const navigation = [
	{ name: "Home", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

function classNames(...classes: unknown[]) {
	return classes.filter(Boolean).join(" ");
}

export function Header() {
	const { user, updateUser } = userStore();

	return (
		<Disclosure as="nav" className="">
			{({ open }) => (
				<>
					<div className="sticky">
						<div className="relative flex  h-20 items-center justify-between md:h-28">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-primary-400 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
								<div className="flex flex-shrink-0 items-center">
									<a href="/">
										<img className="h-8 w-auto" src={Logo} alt="Your Company" />
									</a>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex justify-between space-x-20">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current ? "text-gray-500" : "hover:text-gray-500",
													"text-medium rounded-md px-3 py-2 font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center justify-between space-x-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:space-x-10 sm:pr-0">
									<a
										href="/search"
										type="button"
										className="text-medium relative flex hidden rounded-full p-1 hover:ring-offset-gray-700 sm:block"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">Search recipes</span>
										<MagnifyingGlassIcon
											className="h-6 w-6"
											aria-hidden="true"
										></MagnifyingGlassIcon>
									</a>
									<button
										type="button"
										className="text-medium relative flex rounded-full p-1 hover:ring-offset-gray-700"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>

									{/* Profile dropdown */}
									{user != null ? (
										<Menu as="div" className="relative ml-3">
											<div>
												<Menu.Button className="relative flex rounded-full hover:ring-offset-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Item>
														{({ active }) => (
															<a
																href="#"
																className={classNames(
																	active ? "bg-primary-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Your Profile
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href="#"
																className={classNames(
																	active ? "bg-primary-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Settings
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href="#"
																onClick={() => updateUser(null)}
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Sign out
															</a>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									) : (
										<a
											type="button"
											href="/sign-in"
											className="text-medium relative me-3 flex rounded-full p-1 hover:ring-offset-gray-700"
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">View notifications</span>
											<ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
										</a>
									)}
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-primary-900 text-white"
											: "text-primary-300 hover:bg-primary-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
