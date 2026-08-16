import { useEffect, useState } from "react";
import AddBusinessForm from "../components/AddBusinessForm.jsx";
import { fetchCategories } from "../lib/database.js";

export default function AddBusiness() {
  const [categoryIdBySlug, setCategoryIdBySlug] = useState({});

  useEffect(() => {
    fetchCategories().then((cats) => {
      const map = {};
      cats.forEach((c) => {
        map[c.slug] = c.id;
      });
      setCategoryIdBySlug(map);
    });
  }, []);

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 18, paddingBottom: 6 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Sajili Biashara Yako</h1>
        <p className="text-muted" style={{ fontSize: 13.5, marginTop: 6, lineHeight: 1.5 }}>
          Jaza taarifa za biashara yako ili wateja waweze kukupata kwenye Future Places.
        </p>
      </div>
      <AddBusinessForm categoryIdBySlug={categoryIdBySlug} />
    </div>
  );
}
