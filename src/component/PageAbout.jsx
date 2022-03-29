import React from "react";
import "./PageAbout.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getSettingValue } from "../utils/setting.jsx";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageAbout page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							{getSettingValue(this.props.settings, "PROJECT_NAME") !== null
								&& <Breadcrumb.Item>
									<Link to="/">{getSettingValue(this.props.settings, "PROJECT_NAME")}</Link>
								</Breadcrumb.Item>
							}
							<Breadcrumb.Item><Link to="/about">About</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>ENCRYPTION EUROPE</h1>
						<h2>FORMATION AGREEMENT</h2>

						<h3>Article 1. ENCRYPTION EUROPE</h3>
						<p>
							Encryption Europe is an unincorporated association with a
							not-for-profit purpose. This alliance is called “Encryption
							Europe” (hereafter “EE”). This name will appear on all the acts
							and documents issued by EE. EE is set up for an unspecified period.
						</p>

						<h3>Article 2. PURPOSE</h3>
						<p>
							Our purpose is to represent the interests of European SMEs, which
							offer products, solutions and services in the field of
							encryption, encrypted services and related technologies.
						</p>

						<p>
							Specifically, we have three objectives:
						</p>

						<ul>
							<li>
								ENCRYTION BY DEFAULT: Encryption is too often an option
								chosen by advanced users who want to protect their privacy
								or their business. Everyone should protect themselves and
								encryption should be provided by default in tools and apps.
							</li>
							<li>
								RESPONSIBLE PRACTICES: The alliance engages in a dialogue
								with authorities confronted with the need of decrypting
								communications and devices, so that encryption is not perceived
								as a threat to but as an element of security.
							</li>
							<li>
								CONTRIBUTE TO UNIFY EUROPE: Encryption Europe contributes to
								a more united and safer Europe, by developing a common vision
								on the value and the pragmatic benefit of encryption.
							</li>
						</ul>

						<h3>Article 3. BENEFITS</h3>
						<p>EE benefits are fourfold:</p>

						<ul>
							<li>
								GATHER: Bring together the encryption sector, provide
								a place where members can join forces to exchange
								information, best practices and build new business
								opportunities, in the respect of competition rules.
							</li>
							<li>
								PROMOTE: Enable business development among its members, by
								helping them to connect with potential technology partners
								and build the reputation of this new industry sector
							</li>
							<li>
								STAY AHEAD: Know the challenges and opportunities that lie
								ahead of the sector, may it be innovation, security, regulation
								etc.
							</li>
							<li>
								ENGAGE: Provide outreach opportunities to its members in EU
								circles, for direct (meet potential customers or influencers)
								or indirect sales purposes (policy, reputation and educational
								purposes)
							</li>
						</ul>

						<h3>Article 4. PRINCIPLES</h3>
						<p>
							In our work and in our interaction with our partners and all
							the stakeholders of a safer society, we are guided by four
							principles:
						</p>

						<ul>
							<li>
								ZERO BACKDOOR: The members of the alliance have a zero
								backdoor policy and they support the work of regulators
								against any possible weakening of encryption.
							</li>
							<li>
								OBJECTIVITY: Members of the alliance are committed to
								developing the use of encryption technologies, but they
								do understand that the implementation of their technologies
								can have consequences on the work of law enforcement, and
								therefore their adoption requires to engage with other
								stake-holders in this area and provide them with the relevant
								information that they need to do their work effectively.
							</li>
							<li>
								SIMPLICITY: Encryption is a complex technique and
								non-technical decision makers can be easily lost when
								they try to understand how to best protect their assets
								and their privacy with encryption. It is therefore of
								utmost importance that the members of the alliance are
								committed to simplicity when they explain their solutions
								to third parties.
							</li>
							<li>
								COMMUNITY SPIRIT: The members of Encryption Europe believe
								that they are stronger together than alone. Stronger to build
								the reputation of their industry. More credible to develop
								trust with other stakeholders. More effective to share
								information, but also listen and learn, so the technologies
								they develop are used to make a positive impact on our societies.
							</li>
						</ul>

						<h3>Article 5. MANAGEMENT</h3>
						<p>
							The secretariat and accounting of EE shall be carried out by
							SECURITY MADE IN LËTZEBUERG (SMILE).
						</p>

						<p>
							The coordinator of EE is Jean-Christophe Le Toquin.
						</p>

						<p>
							The activities to achieve the objectives of EE include the
							following, in particular:
						</p>

						<ul>
							<li>
								Facilitating exchanges between members, i.e. mailing list,
								monthly reports, etc.;
							</li>
							<li>
								Providing members with communication services;
							</li>
							<li>
								Providing services in the common interest of the Members of EE;
							</li>
							<li>
								Promoting and defending members’ interests on relevant
								EU regulation matters;
							</li>
							<li>
								Legislative and technical monitoring of European and
								international initiatives impacting the digital sector;
							</li>
						</ul>

						<h3>Article 6. MEMBERS</h3>
						<p>
							The members of EE are the signatories who have signed a
							contract, accompanied with this document, indicating their
							support with this Formation Agreement and which are in line
							with EE’s objectives:
						</p>

						<ul>
							<li>
								SMEs (up to 250 employees and 50M€ annual turnover);
							</li>
							<li>
								Agile and innovative;
							</li>
							<li>
								Based in the EU;
							</li>
							<li>
								Represented actively by their CEO, CTO or business developer;
							</li>
							<li>
								Provide products and solutions (including services) in the
								field of encryption, encrypted services and related technologies, and
							</li>
							<li>
								Whose solutions are sold or can be sold globally (or
								at least internationally).
							</li>
						</ul>

						<p>
							Any admission of new members must be agreed to by a general
							consensus, explicit or implied, from the existing membership body.
						</p>

						<p>
							Members may withdraw from EE at any stage they choose. Membership
							fees cannot be refunded.
						</p>

						<h3>Article 7. MEMBERSHIP FEES</h3>
						<p>
							Please contact us for more
							information : contact@encryptioneurope.eu
						</p>
					</div>
				</div>
			</div>
		);
	}
}
