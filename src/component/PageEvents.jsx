import React from "react";
import "./PageEvents.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import EventHorizontal from "./item/EventHorizontal.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import EventSearch from "./form/EventSearch.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getSettingValue } from "../utils/setting.jsx";
import { dateToString } from "../utils/date.jsx";

const localizer = momentLocalizer(moment);

export default class PageCalendar extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			articles: null,
			filters: {
				type: "EVENT",
				title: null,
				include_tags: "true",
				order_by: "start_date",
				order: "asc",
			},
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles() {
		this.setState({
			articles: null,
		});

		this.requestArticles(1);
	}

	requestArticles(p) {
		const page = Number.isInteger(p) ? p : 1;

		const params = dictToURI({
			...this.state.filters,
			page,
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			const pagesToQuery = [...Array(data.pagination.pages + 1).keys()]
				.filter((i) => i > 1);

			if (pagesToQuery.length > 0) {
				this.setState({
					articles: (this.state.articles === null ? [] : this.state.articles).concat(data.items),
				}, () => {
					if (data.pagination.page < data.pagination.pages) {
						this.requestArticles(page + 1);
					}
				});
			}

			if (pagesToQuery.length === 0 && page === 1) {
				this.setState({
					articles: data.items,
				});
			}
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		filters.page = 1;
		this.setState({ filters });
	}

	render() {
		const ColoredDateCellWrapper = ({ children }) => React.cloneElement(
			React.Children.only(children),
			{
				style: {
					backgroundColor: "lightblue",
				},
			},
		);

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
							onSearch={this.getArticles}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Coming events</h1>
					</div>
				</div>

				{this.state.articles && this.state.articles.length === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No coming event found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.articles && this.state.articles.length > 0
					&& <SimpleTable
						numberDisplayed={3}
						elements={this.state.articles.filter((a) => a.end_date > dateToString(new Date()))}
						buildElement={(a) => <div className="col-md-12">
							<EventHorizontal
								info={a}
								analytics={this.props.analytics}
							/>
						</div>
						}
					/>
				}

				{!this.state.articles
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12 row-spaced">
						<h1>Calendar</h1>
					</div>

					{this.state.articles !== null && this.state.articles !== undefined
						? <div className="col-md-12">
							<Calendar
								events={this.state.articles.map((e) => (
									{
										title: e.title,
										start: new Date(e.start_date),
										end: new Date(e.end_date),
										handle: e.handle,
										link: e.link,
									}
								))}
								step={60}
								showMultiDayTimes
								defaultDate={new Date()}
								components={{
									timeSlotWrapper: ColoredDateCellWrapper,
								}}
								localizer={localizer}
								style={{
									height: 700,
									backgroundColor: "white",
								}}
								onSelectEvent={(event) => {
									if (event.link !== undefined && event.link !== null
										&& event.link.length > 0) {
										window.open(event.link);
									} else {
										this.props.history.push("/calendar/" + event.handle);
									}
								}}
							/>
						</div>
						: <Loading
							height={200}
						/>
					}
				</div>
			</div>
		);
	}
}
