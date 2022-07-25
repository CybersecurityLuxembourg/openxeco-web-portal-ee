import React from "react";
import "./PageMember.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import CompanySearch from "./form/CompanySearch.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageMember extends React.Component {
	constructor(props) {
		super(props);

		this.getPublicMembers = this.getPublicMembers.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			members: null,
			taxonomy: null,
			filters: {
				name: getUrlParameter("name"),
			},
		};
	}

	componentDidMount() {
		this.getPublicTaxonomy();
	}

	getPublicTaxonomy() {
		this.setState({
			taxonomy: null,
		}, () => {
			getRequest.call(this, "public/get_public_taxonomy", (data) => {
				this.setState({
					taxonomy: data,
				}, () => {
					this.getPublicMembers();
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		});
	}

	getPublicMembers() {
		this.setState({
			members: null,
		}, () => {
			const values = this.state.taxonomy.values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "MEMBER");

			if (values.length > 0) {
				const params = {
					...this.state.filters,
					taxonomy_values: values[0].id,
				};

				getRequest.call(this, "public/get_public_companies?" + dictToURI(params), (data) => {
					this.setState({
						members: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					members: [],
				});
			}
		});
	}

	onSearch() {
		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + dictToURI(this.state.filters));

		this.getPublicMembers();
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	render() {
		return (
			<div className={"PageMember page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/members">Members</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<CompanySearch
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.onSearch}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>Members</h1>
					</div>
				</div>

				<div className="row row-spaced">
					{this.state.members && this.state.members.length > 0
						&& this.state.members.map((m) => (
							<div
								className="col-md-6"
								key={m.id}>
								<Company
									info={m}
								/>
							</div>
						))
					}

					{this.state.members && this.state.members.length === 0
						&& <div className="col-md-12">
							<Message
								text={"No member found"}
								height={300}
							/>
						</div>
					}

					{!this.state.members
						&& <div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					}
				</div>
			</div>
		);
	}
}
