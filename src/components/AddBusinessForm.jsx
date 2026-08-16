import { useState } from "react";
import Icon from "./Icon.jsx";
import { categories } from "../data/categories.js";
import { getCurrentPosition } from "../services/locationService.js";
import { createBusiness } from "../lib/database.js";
import "./AddBusinessForm.css";

const REGIONS = [
  "Dar es Salaam",
  "Mwanza",
  "Shinyanga",
  "Dodoma",
  "Arusha",
  "Pwani",
  "Zanzibar",
  "Mbeya",
  "Tanga",
];

const initialForm = {
  name: "",
  categorySlug: "restaurants",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  region: "Dar es Salaam",
  district: "",
  ward: "",
  latitude: "",
  longitude: "",
  services: "",
};

export default function AddBusinessForm({ categoryIdBySlug }) {
  const [form, setForm] = useState(initialForm);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleUseLocation() {
    setLocating(true);
    setLocationError("");
    try {
      const pos = await getCurrentPosition();
      update("latitude", pos.latitude.toFixed(6));
      update("longitude", pos.longitude.toFixed(6));
    } catch (err) {
      setLocationError(err.message);
    } finally {
      setLocating(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Tafadhali jaza jina na namba ya simu ya biashara.");
      return;
    }

    setSubmitting(true);
    try {
      await createBusiness({
        name: form.name.trim(),
        categoryId: categoryIdBySlug?.[form.categorySlug] ?? null,
        description: form.description.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim() || form.phone.trim(),
        email: form.email.trim() || null,
        address: form.address.trim(),
        region: form.region,
        district: form.district.trim(),
        ward: form.ward.trim(),
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        services: form.services
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Imeshindikana kutuma. Jaribu tena.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="add-business-success card">
        <div className="empty-state__icon" style={{ margin: "0 auto 12px" }}>
          <Icon name="check-circle" size={28} color="var(--green-primary)" />
        </div>
        <h3>Biashara imetumwa!</h3>
        <p className="text-muted">
          Biashara yako sasa ina hadhi ya <strong>"Inasubiri Uthibitisho"</strong>. Timu yetu itaipitia kabla
          haijaonekana hadharani.
        </p>
        <span className="badge badge-pending" style={{ marginTop: 10 }}>
          Pending Verification
        </span>
        <button type="button" className="btn btn-secondary btn-block" style={{ marginTop: 18 }} onClick={() => setSuccess(false)}>
          Ongeza biashara nyingine
        </button>
      </div>
    );
  }

  return (
    <form className="add-business-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Jina la biashara *</label>
        <input
          id="name"
          className="input"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="mfano: Tinde Highway Restaurant"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="category">Aina ya biashara *</label>
        <select
          id="category"
          className="input"
          value={form.categorySlug}
          onChange={(e) => update("categorySlug", e.target.value)}
        >
          {categories
            .filter((c) => c.slug !== "all")
            .map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="description">Maelezo mafupi</label>
        <textarea
          id="description"
          className="input"
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Eleza huduma unazotoa..."
        />
      </div>

      <div className="add-business-form__grid">
        <div className="field">
          <label htmlFor="phone">Namba ya simu *</label>
          <input
            id="phone"
            className="input"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+255 7XX XXX XXX"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            id="whatsapp"
            className="input"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="Kama ni tofauti na simu"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Barua pepe</label>
        <input
          id="email"
          type="email"
          className="input"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="biashara@mfano.co.tz"
        />
      </div>

      <div className="field">
        <label htmlFor="address">Anwani</label>
        <input
          id="address"
          className="input"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Mtaa, jengo au eneo maarufu"
        />
      </div>

      <div className="add-business-form__grid add-business-form__grid--three">
        <div className="field">
          <label htmlFor="region">Mkoa *</label>
          <select id="region" className="input" value={form.region} onChange={(e) => update("region", e.target.value)}>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="district">Wilaya</label>
          <input id="district" className="input" value={form.district} onChange={(e) => update("district", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ward">Kata</label>
          <input id="ward" className="input" value={form.ward} onChange={(e) => update("ward", e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label>Eneo la GPS</label>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={handleUseLocation}
          disabled={locating}
        >
          <Icon name="navigation" size={16} />
          {locating ? "Tunatafuta eneo lako…" : "Tumia eneo langu la sasa"}
        </button>
        {form.latitude && form.longitude && (
          <p className="field-hint">Lat {form.latitude}, Lng {form.longitude}</p>
        )}
        {locationError && <p className="field-hint" style={{ color: "var(--danger)" }}>{locationError}</p>}
      </div>

      <div className="field">
        <label htmlFor="services">Huduma (tenganisha kwa mkato)</label>
        <input
          id="services"
          className="input"
          value={form.services}
          onChange={(e) => update("services", e.target.value)}
          placeholder="mfano: Nyama choma, Vinywaji, Sehemu ya mikutano"
        />
      </div>

      {error && <p className="field-hint" style={{ color: "var(--danger)" }}>{error}</p>}

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? "Inatuma..." : "Wasilisha kwa Uthibitisho"}
      </button>
      <p className="field-hint" style={{ textAlign: "center", marginTop: 10 }}>
        Baada ya kuwasilisha, biashara yako itakuwa na hadhi ya "Inasubiri Uthibitisho" hadi itakapokaguliwa.
      </p>
    </form>
  );
}
