import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import { dictToURI } from "../utils/url.jsx";
import { dateToString } from "../utils/date.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.getNews = this.getNews.bind(this);
		this.getEvents = this.getEvents.bind(this);

		this.state = {
			news: null,
			events: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getEvents();
	}

	getNews() {
		const params = {
			type: "NEWS",
			include_tags: "true",
			per_page: 3,
			page: 1,
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				news: data.items,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getEvents() {
		const params = {
			type: "EVENT",
			include_tags: "true",
			per_page: 3,
			page: 1,
			order_by: "start_date",
			min_start_date: dateToString(new Date()),
			order: "asc",
		};

		getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
			this.setState({
				events: data.items,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageHome"} className="page max-sized-page">
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Latest news</h1>
					</div>

					{this.state.news && this.state.news.length === 0
						&& <div className="col-md-12">
							<Message
								text={"No news found"}
								height={300}
							/>
						</div>
					}

					{this.state.news && this.state.news.length > 0
						&& this.state.news.map((e) => (
							<div className="col-md-4" key={e.id}>
								<Article
									info={e}
								/>
							</div>
						))
					}

					{this.state.news === null
						&& <div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					}
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Upcoming events</h1>
					</div>

					{this.state.events && this.state.events.length === 0
						&& <div className="col-md-12">
							<Message
								text={"No upcoming event found"}
								height={300}
							/>
						</div>
					}

					{this.state.events && this.state.events.length > 0
						&& this.state.events.map((e) => (
							<div className="col-md-4" key={e.id}>
								<Event
									info={e}
								/>
							</div>
						))
					}

					{this.state.events === null
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
