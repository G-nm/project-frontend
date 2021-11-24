import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink, Navigate, Route, Routes, useMatch } from "react-router-dom";
import { ProtectedMerchantRoute } from "../auth/ProtectedMerchantRoute";
import { useAuth } from "../auth/ProvideAuth";
import ErrorComponent from "../dashboard/ErrorComponent";
import { Notification } from "../dashboard/Notification";
import { History } from "./History";
import { Home } from "./Home";
import { MerchantTopBar } from "./MerchantTopBar";
import { Redeem } from "./Redeem";
import { Transactions } from "./Transactions/Transactions";

export const MerchantDash = (props) => {
	const myroutes = [
		// {
		//   path: "/merchant/home",
		//   exact: true,
		//   main: () => <Home />,
		// },
		{
			path: "/merchant/transactions",
			exact: true,
			main: () => <Transactions />,
		},
		{
			path: "/merchant/history",
			exact: true,
			main: () => <History />,
		},
		{
			path: "/merchant/redeem",
			exact: true,
			main: () => <Redeem />,
		},
	];
	const { notifications } = useSelector((state) => state.notifications);
	let { url } = useMatch();
	const styles = {
		activelink: "block bg-yellow-300 rounded mx-4 ",
		link: "block mx-4 py-1",
	};
	const auth = useAuth();
	return (
		<React.Fragment>
			<div className="h-screen bg-gray-100 overflow-auto">
				<ErrorComponent />

				<section className=" w-1/4 h-full absolute flex flex-col-reverse pb-14  ">
					{notifications.length > 0 &&
						notifications.map((notification) => {
							return (
								<Notification
									notification={notification}
									key={notification.id}
								/>
							);
						})}
				</section>

				<div className=" rounded-2xl w-72  ml-4  bg-white fixed h-full">
					<div className="relative top-2 mb-2 h-full  pt-8 rounded">
						<div className="text-5xl pb-5 font-semibold text-center">MTOG</div>
						<div className="flex flex-col gap-2 text-center">
							<div>
								{/* <NavLink
                  to={`${url}/home`}
                style={({ isActive }) => {
										isActive ? styles.activelink : undefined;
									}}
                  className={styles.link}
                >
                  Dashboard
                </NavLink> */}
							</div>
							<div>
								<NavLink
									to={`${url}/transactions`}
									className={({ isActive }) =>
										isActive ? styles.activelink : styles.link
									}
								>
									Transactions
								</NavLink>
							</div>

							<div>
								<NavLink
									to={`${url}/history`}
									className={({ isActive }) =>
										isActive ? styles.activelink : styles.link
									}
								>
									History
								</NavLink>
							</div>
							<div>
								<NavLink
									to={`${url}/redeem`}
									className={({ isActive }) =>
										isActive ? styles.activelink : styles.link
									}
								>
									Redeem
								</NavLink>
							</div>
						</div>
						<div className=" absolute bottom-6  w-full  flex justify-center">
							<button
								className="py-1 rounded-lg border-2 w-full mx-4  hover:bg-red-500 hover:text-white z-0"
								onClick={() => {
									auth.signout(() => {
										props.history.push("/");
									});
								}}
							>
								<BiLogOutCircle className="inline" />
								Sign out
							</button>
						</div>
					</div>
				</div>

				<div className=" ml-80  flex flex-col pr-5 relative h-full gap-10">
					<MerchantTopBar />
					<div className=" bottom-4 relative rounded-2xl border bg-white w-full h-full">
						<Routes>
							{myroutes.map((route, index) => (
								<ProtectedMerchantRoute
									key={index}
									path={route.path}
									exact={route.exact}
									component={route.main}
								/>
							))}
							<Route path="*">
								<Navigate to="/merchant/home" />
							</Route>
						</Routes>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
