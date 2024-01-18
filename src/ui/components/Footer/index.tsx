import { Col, Divider, Image, Row, Typography, Menu } from "antd";
import React from "react";
import Logo from "@/assets/Icon/Logo.svg";
import Link from "antd/es/typography/Link";
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

export function Footer() {
	return (
		<div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
			<Row className="py-[60px]">
				<Col
					span={12}
					xs={24}
					sm={24}
					md={12}
					lg={12}
					xl={12}
					className="text-center sm:text-start"
				>
					<Image src={Logo} alt="logo" preview={false}></Image>
				</Col>
				<Col span={12} xs={24} sm={24} md={12} lg={12} xl={12} className="mt-3 sm:mt-0">
					<Row>
						<Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
							<Typography.Title level={5} className="ms-4">
								About
							</Typography.Title>
							<Menu
								mode="vertical"
								style={{
									backgroundColor: "transparent",
								}}
								triggerSubMenuAction="click"
								rootClassName="!border-0"
							>
								<Menu.Item>
									<Link className="!text-gray-500" href="/sign-in">
										Blog
									</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Recipes</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Categories</Link>
								</Menu.Item>
							</Menu>
						</Col>
						<Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
							<Typography.Title className="ms-4" level={5}>
								Legal
							</Typography.Title>
							<Menu
								mode="vertical"
								style={{
									backgroundColor: "transparent",
								}}
								triggerSubMenuAction="click"
								rootClassName="!border-0"
							>
								<Menu.Item>
									<Link className="!text-gray-500">Terms</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Condition</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Cookies</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Copyright</Link>
								</Menu.Item>
							</Menu>
						</Col>

						<Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
							<Typography.Title className="ms-4" level={5}>
								Follow
							</Typography.Title>
							<Menu
								mode="vertical"
								style={{
									backgroundColor: "transparent",
								}}
								triggerSubMenuAction="click"
								rootClassName="!border-0"
							>
								<Menu.Item>
									<Link className="!text-gray-500">Facebook</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Twiiter</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Instagram</Link>
								</Menu.Item>
								<Menu.Item>
									<Link className="!text-gray-500">Youtube</Link>
								</Menu.Item>
							</Menu>
						</Col>
					</Row>
				</Col>
			</Row>
			<Divider></Divider>
			<div className="flex items-center justify-between pb-[20px]">
				<div className="">
					<Typography>© 2021 Copyright by DevSlayers</Typography>
				</div>
				<div className="space-x-4">
					<InstagramOutlined className="h-8 w-8 text-[30px]" />
					<YoutubeOutlined className="h-8 w-8 text-[30px]" />
					<FacebookOutlined className="h-8 w-8 text-[30px]" />
				</div>
			</div>
		</div>
	);
}
