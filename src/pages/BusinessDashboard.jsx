import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import "./BusinessDashboard.css";

export default function BusinessDashboard() {
  return (
    <div className="page business-dashboard">
      <div className="container" style={{ paddingTop: 18 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Business</h1>
        <p className="text-muted" style={{ fontSize: 13.5, marginTop: 6, lineHeight: 1.5 }}>
          Dashibodi ya wamiliki wa biashara — fuatilia hadhi ya uthibitisho na wasimamie taarifa za biashara yako.
        </p>
      </div>

      <div className="container business-dashboard__card card">
        <div className="empty-state__icon" style={{ margin: "0 auto 10px" }}>
          <Icon name="briefcase" size={26} color="var(--green-primary)" />
        </div>
        <h3>Uandikishaji wa wamiliki wa biashara unakuja hivi karibuni</h3>
        <p className="text-muted">
          Kwa sasa unaweza kusajili biashara yako moja kwa moja. Uwezo wa kuingia kwenye akaunti na kufuatilia
          biashara zako zote unatengenezwa.
        </p>
        <Link to="/add-business" className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
          Sajili biashara mpya
        </Link>
      </div>

      <div className="container business-dashboard__status">
        <h3 className="section-title">Hadhi za uthibitisho</h3>
        <ul className="business-dashboard__status-list">
          <li>
            <span className="badge badge-pending">Pending</span> Inasubiri ukaguzi wa timu yetu
          </li>
          <li>
            <span className="badge badge-verified">Verified</span> Imethibitishwa na inaonekana hadharani
          </li>
          <li>
            <span className="badge" style={{ background: "#fdeee9", color: "var(--danger)" }}>Rejected</span> Haikukubaliwa
          </li>
          <li>
            <span className="badge" style={{ background: "#f1f3f5", color: "#495057" }}>Suspended</span> Imesimamishwa muda
          </li>
        </ul>
      </div>
    </div>
  );
}
