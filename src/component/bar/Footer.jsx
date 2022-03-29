import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getCommunityAppURL } from "../../utils/env.jsx";
import { getSettingValue } from "../../utils/setting.jsx";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-4">
							<div className="Footer-title">MENU</div>

							<div className="row">
								<div className="col-md-6">
									<div>
										<Link to="/">Home</Link>
									</div>
									<br/>
									<div>
										<Link to="/ecosystem">Ecosystem</Link>
									</div>
									<div>
										<Link to="/news">News</Link>
									</div>
									<div>
										<Link to="/events">Events</Link>
									</div>
									<div>
										<Link to="/jobs">Jobs</Link>
									</div>
									<br/>
									<div>
										<Link to="/about">About</Link>
									</div>
									<div>
										<a href={getCommunityAppURL()}>
											{getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
												? getSettingValue(this.props.settings, "ADMIN_PLATFORM_NAME")
												: "Community"
											}
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6 Footer-contact">
							<div className="Footer-title">CONTACT</div>
							<br/>
							<div>Encryption Europe</div>
							<div>co/ SECURITYMADEIN.LU</div>
							<div>16, boulevard d&apos;Avranches</div>
							<div>L-1160 Luxembourg</div>
							<br/><br/>
							<div>contact@encryptioneurope.eu</div>
						</div>

						<div className="col-md-2">
							<div className="Footer-network">
								<a
									href="https://twitter.com/encrypteurope"
									rel="noreferrer"
									target="_blank"
									title="Twitter"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company/encryption-europe/"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
