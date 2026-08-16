// Computes "open now" from business_hours rows rather than a hardcoded flag,
// so real opening-hours data drives the badge shown to users.
export function getOpenStatus(hours) {
  if (!hours || hours.length === 0) return null;
  const now = new Date();
  const day = now.getDay();
  const today = hours.find((h) => h.dayOfWeek === day);
  if (!today || today.isClosed || !today.opensAt || !today.closesAt) {
    return { open: false, label: "Imefungwa leo" };
  }
  const [oh, om] = today.opensAt.split(":").map(Number);
  const [ch, cm] = today.closesAt.split(":").map(Number);
  const minsNow = now.getHours() * 60 + now.getMinutes();
  const opens = oh * 60 + om;
  const closes = ch * 60 + cm;
  const isOpen = minsNow >= opens && minsNow <= closes;
  return {
    open: isOpen,
    label: isOpen ? `Wazi hadi ${today.closesAt}` : `Imefungwa · Fungua ${today.opensAt}`,
  };
}
