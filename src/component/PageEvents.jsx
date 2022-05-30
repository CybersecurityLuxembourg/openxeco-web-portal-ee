import React from "react";
import "./PageEvents.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import EventHorizontal from "./item/EventHorizontal.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import EventSearch from "./form/EventSearch.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import { getSettingValue } from "../utils/setting.jsx";
import { dateToString } from "../utils/date.jsx";

export default class PageCalendar extends React.Component {
	constructor(props) {
		super(props);

		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			comingEvents: null,
			pastEvents: null,
			filters: {
				title: null,
			},
		};
	}

	componentDidMount() {
		this.getComingEvents();
		this.getPastEvents();
	}

	onSearch() {
		this.getComingEvents();
		this.getPastEvents();
	}

	getComingEvents(page) {
		const params = {
			type: "EVENT",
			include_tags: "true",
			per_page: 3,
			page: page || 1,
			order_by: "start_date",
			min_start_date: dateToString(new Date()),
			order: "asc",
			...this.state.filters,
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				comingEvents: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getPastEvents(page) {
		const params = {
			type: "EVENT",
			include_tags: "true",
			per_page: 3,
			page: page || 1,
			order_by: "start_date",
			order: "desc",
			...this.state.filters,
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				pastEvents: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	render() {
		return (
			<div id={"PageCalendar"} className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/events">Events</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<EventSearch
							analytics={this.props.analytics}
							filters={this.state.filters}
							onChange={this.modifyFilters}
							onSearch={() => this.onSearch()}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Coming events</h1>
					</div>
				</div>

				{this.state.comingEvents
					&& this.state.comingEvents.pagination.total === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No coming event found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.comingEvents
					&& this.state.comingEvents.pagination.total > 0
					&& <DynamicTable
						items={this.state.comingEvents.items}
						pagination={this.state.comingEvents.pagination}
						changePage={(page) => this.getComingEvents(page)}
						buildElement={(a) => <div className="col-md-12">
							<EventHorizontal
								info={a}
								analytics={this.props.analytics}
							/>
						</div>}
					/>
				}

				{!this.state.comingEvents
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>All events</h1>
					</div>
				</div>

				{this.state.pastEvents
					&& this.state.pastEvents.pagination.total === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No past event found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.pastEvents
					&& this.state.pastEvents.pagination.total > 0
					&& <DynamicTable
						items={this.state.pastEvents.items}
						pagination={this.state.pastEvents.pagination}
						changePage={(page) => this.getPastEvents(page)}
						buildElement={(a) => <div className="col-md-12">
							<EventHorizontal
								info={a}
								analytics={this.props.analytics}
							/>
						</div>}
					/>
				}

				{!this.state.pastEvents
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
