import { DemoFormPreset } from '../types';

// Visual SVG generator for realistic official forms
function createSvgDataUrl(svgContent: string): string {
  const base64 = btoa(unescape(encodeURIComponent(svgContent)));
  return `data:image/svg+xml;base64,${base64}`;
}

const medicalFormSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <!-- Header Bar -->
  <rect x="0" y="0" width="800" height="110" fill="#1e293b"/>
  <rect x="40" y="25" width="60" height="60" rx="8" fill="#3b82f6"/>
  <text x="70" y="62" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
  <text x="120" y="52" font-size="22" font-weight="bold" fill="#ffffff">STATE BOARD OF MEDICAL EXAMINERS</text>
  <text x="120" y="76" font-size="13" fill="#94a3b8" letter-spacing="1">PHYSICIAN CREDENTIALING &amp; HOSPITAL PRIVILEGES APPLICATION (FORM MD-402)</text>

  <!-- Notice -->
  <rect x="40" y="125" width="720" height="38" rx="4" fill="#fef2f2" stroke="#fecaca"/>
  <text x="55" y="148" font-size="12" fill="#991b1b" font-weight="bold">WARNING: ALL ENTRIES MUST MATCH OFFICIAL REPOSITORY. FALSE STATEMENTS SUBJECT TO PENAL REVOCATION.</text>

  <!-- Section 1: Personal & License -->
  <rect x="40" y="175" width="720" height="28" fill="#f1f5f9"/>
  <text x="50" y="194" font-size="13" font-weight="bold" fill="#334155">SECTION I: PRACTITIONER DEMOGRAPHICS &amp; REGISTRATION</text>

  <!-- Row 1 -->
  <rect x="40" y="210" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="228" font-size="11" fill="#64748b" font-weight="bold">1. FULL LEGAL NAME (SURNAME, FIRST, MIDDLE)</text>
  <text x="50" y="252" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">VANCE, KATHERINE M.</text>

  <rect x="410" y="210" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="420" y="228" font-size="11" fill="#64748b" font-weight="bold">2. STATE MEDICAL LICENSE NUMBER</text>
  <text x="420" y="252" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">MD-0982O-TX</text>
  <text x="660" y="252" font-size="10" fill="#94a3b8">(Note letter 'O')</text>

  <!-- Row 2 -->
  <rect x="40" y="275" width="230" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="293" font-size="11" fill="#64748b" font-weight="bold">3. DATE OF BIRTH</text>
  <text x="50" y="317" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">04/18/1986</text>

  <rect x="285" y="275" width="230" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="295" y="293" font-size="11" fill="#64748b" font-weight="bold">4. SOCIAL SECURITY NO. (SSN)</text>
  <text x="295" y="317" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">XXX-42-8801</text>

  <rect x="530" y="275" width="230" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="540" y="293" font-size="11" fill="#64748b" font-weight="bold">5. DEA CONTROLLED SUBSTANCE #</text>
  <text x="540" y="317" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">BV-7193254</text>

  <!-- Section 2: Contact Details -->
  <rect x="40" y="345" width="720" height="28" fill="#f1f5f9"/>
  <text x="50" y="364" font-size="13" font-weight="bold" fill="#334155">SECTION II: PRIMARY CLINIC PRACTICE &amp; CONTACT</text>

  <rect x="40" y="380" width="450" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="398" font-size="11" fill="#64748b" font-weight="bold">6. CLINIC MAILING ADDRESS</text>
  <text x="50" y="422" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">742 HEALTH PARKWAY, SUITE 300, AUSTIN, TX 78701</text>

  <rect x="510" y="380" width="250" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="520" y="398" font-size="11" fill="#64748b" font-weight="bold">7. CLINIC DIRECT PHONE</text>
  <text x="520" y="422" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">(512) 555-0194</text>

  <!-- Row 4: Email & Secondary Phone -->
  <rect x="40" y="445" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="463" font-size="11" fill="#64748b" font-weight="bold">8. CONTACT EMAIL ADDRESS</text>
  <text x="50" y="487" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">k.vance.md@austinmed.org</text>

  <rect x="410" y="445" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="420" y="463" font-size="11" fill="#64748b" font-weight="bold">9. HOSPITAL AFFILIATION</text>
  <text x="420" y="487" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">ST. DAVID'S MEDICAL CENTER</text>

  <!-- Section 3: Education & Experience Contradiction -->
  <rect x="40" y="515" width="720" height="28" fill="#f1f5f9"/>
  <text x="50" y="534" font-size="13" font-weight="bold" fill="#334155">SECTION III: POST-GRADUATE TRAINING &amp; CLINICAL RESIDENCY</text>

  <rect x="40" y="550" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="568" font-size="11" fill="#64748b" font-weight="bold">10. MEDICAL SCHOOL ATTENDED</text>
  <text x="50" y="592" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">BAYLOR COLLEGE OF MEDICINE</text>

  <rect x="410" y="550" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="420" y="568" font-size="11" fill="#64748b" font-weight="bold">11. GRADUATION YEAR (M.D.)</text>
  <text x="420" y="592" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">2012</text>

  <!-- Contradiction block -->
  <rect x="40" y="615" width="720" height="70" fill="#fffbeb" stroke="#fcd34d"/>
  <text x="50" y="635" font-size="11" fill="#92400e" font-weight="bold">12. YEARS OF LICENSED ATTENDING EXPERIENCE CLAIMED:</text>
  <text x="50" y="662" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#b45309">18 YEARS IN ACTIVE SURGICAL PRACTICE</text>
  <text x="50" y="678" font-size="10" fill="#b45309">[Conflict: MD graduation was 2012; at max 14 years elapsed since graduation]</text>

  <!-- Section 4: Declaration -->
  <rect x="40" y="700" width="720" height="28" fill="#f1f5f9"/>
  <text x="50" y="719" font-size="13" font-weight="bold" fill="#334155">SECTION IV: APPLICANT ATTESTATION &amp; JURAT</text>

  <text x="50" y="750" font-size="11" fill="#475569">I certify under penalty of perjury that the foregoing is true, accurate, and complete.</text>

  <line x1="50" y1="810" x2="350" y2="810" stroke="#0f172a" stroke-width="1.5"/>
  <text x="50" y="802" font-family="'Brush Script MT', cursive, sans-serif" font-size="24" fill="#1e3a8a">Dr. Katherine M. Vance</text>
  <text x="50" y="825" font-size="11" fill="#64748b">APPLICANT SIGNATURE</text>

  <line x1="410" y1="810" x2="600" y2="810" stroke="#0f172a" stroke-width="1.5"/>
  <text x="410" y="804" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">09/14/2026</text>
  <text x="410" y="825" font-size="11" fill="#64748b">DATE OF ATTESTATION</text>

  <!-- Stamp -->
  <circle cx="680" cy="795" r="38" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="680" y="792" font-size="9" font-weight="bold" fill="#2563eb" text-anchor="middle">OFFICIAL</text>
  <text x="680" y="804" font-size="9" font-weight="bold" fill="#2563eb" text-anchor="middle">SEAL - TX</text>
</svg>
`;

const financialAidSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <rect x="0" y="0" width="800" height="100" fill="#065f46"/>
  <text x="40" y="48" font-size="22" font-weight="bold" fill="#ffffff">DEPARTMENT OF HIGHER EDUCATION &amp; STUDENT AID</text>
  <text x="40" y="72" font-size="13" fill="#a7f3d0">UNDERGRADUATE TUITION ASSISTANCE &amp; DEPENDENCY VERIFICATION (2026–2027)</text>

  <!-- Alert -->
  <rect x="40" y="115" width="720" height="35" rx="4" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="55" y="137" font-size="12" fill="#92400e" font-weight="bold">AUDIT FLAGGED FORM: CONTAINS SUBSTANTIAL NUMERICAL INCONSISTENCIES AND MISSING JURAT</text>

  <!-- Student Info -->
  <rect x="40" y="165" width="720" height="26" fill="#ecfdf5"/>
  <text x="50" y="183" font-size="12" font-weight="bold" fill="#065f46">PART A: STUDENT APPLICANT INFORMATION</text>

  <rect x="40" y="200" width="350" height="50" fill="#fafafa" stroke="#d1d5db"/>
  <text x="50" y="217" font-size="11" fill="#6b7280" font-weight="bold">STUDENT FULL LEGAL NAME</text>
  <text x="50" y="239" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#111827">MARCUS A. THORNE</text>

  <rect x="410" y="200" width="350" height="50" fill="#fafafa" stroke="#d1d5db"/>
  <text x="420" y="217" font-size="11" fill="#6b7280" font-weight="bold">STUDENT ID (CAMPUS CWID)</text>
  <text x="420" y="239" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#111827">CWID-9081249</text>

  <!-- DOB & Age contradiction -->
  <rect x="40" y="260" width="350" height="50" fill="#fff1f2" stroke="#f43f5e"/>
  <text x="50" y="277" font-size="11" fill="#9f1239" font-weight="bold">STUDENT DATE OF BIRTH</text>
  <text x="50" y="299" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#be123c">11/14/2007 (Age 18)</text>

  <rect x="410" y="260" width="350" height="50" fill="#fff1f2" stroke="#f43f5e"/>
  <text x="420" y="277" font-size="11" fill="#9f1239" font-weight="bold">DECLARED DEPENDENT AGE ON TAX RETURN</text>
  <text x="420" y="299" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#be123c">24 YEARS OLD [CONTRADICTION]</text>

  <!-- Income Contradiction Section -->
  <rect x="40" y="325" width="720" height="26" fill="#ecfdf5"/>
  <text x="50" y="343" font-size="12" font-weight="bold" fill="#065f46">PART B: HOUSEHOLD TAXABLE INCOME DECLARATION</text>

  <rect x="40" y="360" width="350" height="55" fill="#fff1f2" stroke="#f43f5e"/>
  <text x="50" y="378" font-size="11" fill="#9f1239" font-weight="bold">ANNUAL HOUSEHOLD ADJUSTED GROSS INCOME (LINE 14)</text>
  <text x="50" y="402" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#9f1239">$45,000.00</text>

  <rect x="410" y="360" width="350" height="55" fill="#fff1f2" stroke="#f43f5e"/>
  <text x="420" y="378" font-size="11" fill="#9f1239" font-weight="bold">PARENT 1 FORM 1040 ATTACHMENT W-2 GROSS (LINE 22)</text>
  <text x="420" y="402" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#9f1239">$145,000.00 [DISCREPANCY +$100k]</text>

  <!-- Address & Contact -->
  <rect x="40" y="430" width="720" height="50" fill="#fafafa" stroke="#d1d5db"/>
  <text x="50" y="447" font-size="11" fill="#6b7280" font-weight="bold">PERMANENT RESIDENCE ADDRESS</text>
  <text x="50" y="469" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#111827">814 UNIVERSITY CRESCENT, APT 2B, COLUMBUS, OH 43210</text>

  <rect x="40" y="490" width="350" height="50" fill="#fafafa" stroke="#d1d5db"/>
  <text x="50" y="507" font-size="11" fill="#6b7280" font-weight="bold">STUDENT PHONE NUMBER</text>
  <text x="50" y="529" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#111827">(614) 555-8392</text>

  <rect x="410" y="490" width="350" height="50" fill="#fafafa" stroke="#d1d5db"/>
  <text x="420" y="507" font-size="11" fill="#6b7280" font-weight="bold">ENROLLMENT STATUS</text>
  <text x="420" y="529" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#111827">FULL-TIME UNDERGRADUATE (15 CREDITS)</text>

  <!-- Missing Field Section: Signature is blank! -->
  <rect x="40" y="555" width="720" height="26" fill="#ecfdf5"/>
  <text x="50" y="573" font-size="12" font-weight="bold" fill="#065f46">PART C: SIGNATURE AND MANDATORY DATE OF DECLARATION</text>

  <rect x="40" y="590" width="350" height="75" fill="#fff1f2" stroke="#f43f5e" stroke-dasharray="3,3"/>
  <text x="50" y="608" font-size="11" fill="#9f1239" font-weight="bold">PARENT SIGNATURE</text>
  <text x="50" y="640" font-family="'Brush Script MT', cursive, sans-serif" font-size="22" fill="#065f46">David Thorne</text>

  <rect x="410" y="590" width="350" height="75" fill="#fef2f2" stroke="#dc2626"/>
  <text x="420" y="608" font-size="11" fill="#dc2626" font-weight="bold">DATE OF PARENT DECLARATION (REQUIRED)</text>
  <text x="420" y="642" font-size="12" fill="#ef4444" font-weight="bold">[UNFILLED / BLANK FIELD]</text>
</svg>
`;

const travelVisaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <!-- Header -->
  <rect x="0" y="0" width="800" height="105" fill="#1e1b4b"/>
  <text x="40" y="45" font-size="22" font-weight="bold" fill="#ffffff">IMMIGRATION &amp; CONSULAR SERVICES AUTHORITY</text>
  <text x="40" y="70" font-size="13" fill="#c7d2fe">INTERNATIONAL VISITOR SHORT-STAY ENTRY VISA (FORM V-109)</text>

  <rect x="40" y="120" width="720" height="26" fill="#e0e7ff"/>
  <text x="50" y="138" font-size="12" font-weight="bold" fill="#312e81">1. PASSPORT &amp; APPLICANT IDENTIFICATION</text>

  <!-- Row 1 -->
  <rect x="40" y="155" width="350" height="55" fill="#fafafa" stroke="#cbd5e1"/>
  <text x="50" y="173" font-size="11" fill="#64748b" font-weight="bold">PASSPORT SURNAME</text>
  <text x="50" y="197" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">AL-MANSOOR</text>

  <rect x="410" y="155" width="350" height="55" fill="#fafafa" stroke="#cbd5e1"/>
  <text x="420" y="173" font-size="11" fill="#64748b" font-weight="bold">PASSPORT GIVEN NAMES</text>
  <text x="420" y="197" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">TARIQ FAISAL</text>

  <!-- OCR Glitch row -->
  <rect x="40" y="220" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="238" font-size="11" fill="#64748b" font-weight="bold">PASSPORT NUMBER (OCR TRAP: 5 vs S)</text>
  <text x="50" y="262" font-size="15" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">N85S3491</text>
  <text x="150" y="262" font-size="10" fill="#64748b">(Contains number 5 followed by letter S)</text>

  <rect x="410" y="220" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="420" y="238" font-size="11" fill="#64748b" font-weight="bold">NATIONALITY / CITIZENSHIP</text>
  <text x="420" y="262" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">UNITED ARAB EMIRATES</text>

  <!-- Row 3: Address with manual correction mark -->
  <rect x="40" y="285" width="720" height="60" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="50" y="303" font-size="11" fill="#64748b" font-weight="bold">RESIDENTIAL ADDRESS (NOTE OVERWRITTEN APARTMENT NUMBER)</text>
  <text x="50" y="327" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">BUILDING 14, AL-NAHDA RD, </text>
  <text x="290" y="327" font-size="13" font-family="'Courier New', monospace" text-decoration="line-through" fill="#94a3b8">APT 48</text>
  <text x="350" y="327" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#2563eb">APT 4B</text>
  <text x="410" y="327" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">, DUBAI, UAE</text>

  <!-- Contact number with missing digit -->
  <rect x="40" y="355" width="350" height="55" fill="#fff7ed" stroke="#fdba74"/>
  <text x="50" y="373" font-size="11" fill="#c2410c" font-weight="bold">PRIMARY TELEPHONE (FORMAT DISCREPANCY)</text>
  <text x="50" y="397" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#c2410c">+971 50 123456</text>
  <text x="210" y="397" font-size="10" fill="#ea580c">(9 digits - incomplete)</text>

  <rect x="410" y="355" width="350" height="55" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="420" y="373" font-size="11" fill="#64748b" font-weight="bold">EMAIL ADDRESS</text>
  <text x="420" y="397" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">t.faisal@almansoor-trade.com</text>

  <rect x="40" y="420" width="720" height="26" fill="#e0e7ff"/>
  <text x="50" y="438" font-size="12" font-weight="bold" fill="#312e81">2. TRAVEL INTENT &amp; DURATION</text>

  <rect x="40" y="455" width="350" height="50" fill="#fafafa" stroke="#cbd5e1"/>
  <text x="50" y="472" font-size="11" fill="#64748b" font-weight="bold">PURPOSE OF TRAVEL</text>
  <text x="50" y="494" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">BUSINESS &amp; TECH CONFERENCE</text>

  <rect x="410" y="455" width="350" height="50" fill="#fafafa" stroke="#cbd5e1"/>
  <text x="420" y="472" font-size="11" fill="#64748b" font-weight="bold">REQUESTED STAY LENGTH</text>
  <text x="420" y="494" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">14 DAYS</text>
</svg>
`;

const cleanApplicationSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <rect x="0" y="0" width="800" height="95" fill="#0f172a"/>
  <text x="40" y="42" font-size="20" font-weight="bold" fill="#ffffff">HORIZON GLOBAL TECHNOLOGIES INC.</text>
  <text x="40" y="68" font-size="13" fill="#cbd5e1">SENIOR PRINCIPAL SOFTWARE ARCHITECT EMPLOYMENT DOSSIER</text>

  <!-- Status Bar -->
  <rect x="40" y="110" width="720" height="30" fill="#f0fdf4" stroke="#86efac"/>
  <text x="55" y="130" font-size="12" fill="#166534" font-weight="bold">BASELINE VERIFIED CONTROL APPLICATION (ALL FIELDS GROUNDED &amp; CONSISTENT)</text>

  <rect x="40" y="150" width="720" height="24" fill="#f8fafc"/>
  <text x="50" y="167" font-size="12" font-weight="bold" fill="#475569">PERSONAL IDENTIFICATION &amp; RESIDENCE</text>

  <rect x="40" y="180" width="350" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="50" y="197" font-size="11" fill="#64748b" font-weight="bold">APPLICANT NAME</text>
  <text x="50" y="219" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">ELEANOR S. CHEN</text>

  <rect x="410" y="180" width="350" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="420" y="197" font-size="11" fill="#64748b" font-weight="bold">APPLICATION ID</text>
  <text x="420" y="219" font-size="14" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">HGT-2026-99214</text>

  <rect x="40" y="240" width="230" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="50" y="257" font-size="11" fill="#64748b" font-weight="bold">DATE OF BIRTH</text>
  <text x="50" y="279" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">03/12/1991</text>

  <rect x="285" y="240" width="230" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="295" y="257" font-size="11" fill="#64748b" font-weight="bold">PHONE NUMBER</text>
  <text x="295" y="279" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">(415) 555-0182</text>

  <rect x="530" y="240" width="230" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="540" y="257" font-size="11" fill="#64748b" font-weight="bold">WORK AUTHORIZATION</text>
  <text x="540" y="279" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">US CITIZEN</text>

  <rect x="40" y="300" width="450" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="50" y="317" font-size="11" fill="#64748b" font-weight="bold">RESIDENTIAL ADDRESS</text>
  <text x="50" y="339" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">524 MONTGOMERY ST, SAN FRANCISCO, CA 94111</text>

  <rect x="510" y="300" width="250" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="520" y="317" font-size="11" fill="#64748b" font-weight="bold">EMAIL ADDRESS</text>
  <text x="520" y="339" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">eleanor.chen@csalumni.org</text>

  <rect x="40" y="360" width="720" height="24" fill="#f8fafc"/>
  <text x="50" y="377" font-size="12" font-weight="bold" fill="#475569">EDUCATION &amp; DEGREES</text>

  <rect x="40" y="390" width="450" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="50" y="407" font-size="11" fill="#64748b" font-weight="bold">DEGREE &amp; MAJOR</text>
  <text x="50" y="429" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">M.S. COMPUTER SCIENCE - STANFORD UNIVERSITY</text>

  <rect x="510" y="390" width="250" height="50" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="520" y="407" font-size="11" fill="#64748b" font-weight="bold">GRADUATION YEAR</text>
  <text x="520" y="429" font-size="13" font-family="'Courier New', monospace" font-weight="bold" fill="#0f172a">2015</text>
</svg>
`;

export const DEMO_FORMS: DemoFormPreset[] = [
  {
    id: 'demo-medical-ocr',
    title: 'Physician Board Credentialing Form (MD-402)',
    subtitle: 'Contains character confusion (0 vs O) and timeline experience contradiction',
    badge: 'OCR Confusion & Experience Contradiction',
    category: 'Healthcare & Licensure',
    difficultyTag: 'Moderate OCR Noise',
    description: 'Demonstrates how Stage 1 naive OCR misreads the letter "O" in license number "MD-0982O" as zero "0", and fails to notice that 18 years experience contradicts a 2012 medical graduation. Stage 2 self-verification successfully catches both.',
    knownFlaws: [
      'License MD-0982O misread as MD-09820',
      'Name Katherine M. Vance misread as Katherine N. Vance in Stage 1',
      '18-Year Attending Experience contradicts 2012 graduation year'
    ],
    mockDataUrl: createSvgDataUrl(medicalFormSvg),
    sampleDocumentData: {
      stage1Fields: [
        { fieldKey: 'full_name', label: 'Full Legal Name', category: 'personal', extractedValue: 'VANCE, KATHERINE N.', confidence: 84, rawLocationHint: 'Box 1, row 1' },
        { fieldKey: 'license_num', label: 'Medical License #', category: 'identification', extractedValue: 'MD-09820-TX', confidence: 78, rawLocationHint: 'Box 2' },
        { fieldKey: 'dob', label: 'Date of Birth', category: 'personal', extractedValue: '04/18/1986', confidence: 96, rawLocationHint: 'Box 3' },
        { fieldKey: 'ssn_last4', label: 'SSN (Masked)', category: 'identification', extractedValue: 'XXX-42-8801', confidence: 95, rawLocationHint: 'Box 4' },
        { fieldKey: 'dea_number', label: 'DEA Registration #', category: 'identification', extractedValue: 'BV-7193254', confidence: 93, rawLocationHint: 'Box 5' },
        { fieldKey: 'clinic_address', label: 'Mailing Address', category: 'contact', extractedValue: '742 HEALTH PARKWAY, SUITE 300, AUSTIN, TX 78701', confidence: 94, rawLocationHint: 'Box 6' },
        { fieldKey: 'clinic_phone', label: 'Clinic Direct Phone', category: 'contact', extractedValue: '(512) 555-0194', confidence: 96, rawLocationHint: 'Box 7' },
        { fieldKey: 'email', label: 'Email Address', category: 'contact', extractedValue: 'k.vance.md@austinmed.org', confidence: 97, rawLocationHint: 'Box 8' },
        { fieldKey: 'hospital_affiliation', label: 'Hospital Affiliation', category: 'employment', extractedValue: "ST. DAVID'S MEDICAL CENTER", confidence: 94, rawLocationHint: 'Box 9' },
        { fieldKey: 'medical_school', label: 'Medical School Attended', category: 'education', extractedValue: 'BAYLOR COLLEGE OF MEDICINE', confidence: 96, rawLocationHint: 'Box 10' },
        { fieldKey: 'grad_year', label: 'Graduation Year', category: 'education', extractedValue: '2012', confidence: 96, rawLocationHint: 'Box 11' },
        { fieldKey: 'years_experience', label: 'Attending Experience Claimed', category: 'employment', extractedValue: '18 YEARS IN ACTIVE SURGICAL PRACTICE', confidence: 91, rawLocationHint: 'Box 12' },
        { fieldKey: 'signature', label: 'Applicant Jurat Signature', category: 'declaration', extractedValue: 'Dr. Katherine M. Vance', confidence: 90, rawLocationHint: 'Signature line' },
        { fieldKey: 'attestation_date', label: 'Date of Attestation', category: 'declaration', extractedValue: '09/14/2026', confidence: 94, rawLocationHint: 'Date line' }
      ],
      stage2Fields: [
        {
          fieldKey: 'full_name',
          label: 'Full Legal Name',
          category: 'personal',
          extractedValue: 'VANCE, KATHERINE N.',
          status: 'Needs Review',
          errorDetected: true,
          errorType: 'ocr_misread',
          evidence: "Document clearly shows 'VANCE, KATHERINE M.' with middle initial M, not N.",
          correctedValue: 'VANCE, KATHERINE M.',
          verificationNotes: "Stage 1 OCR misinterpreted the middle initial 'M.' as 'N.' due to serif font spacing.",
          confidence: 96
        },
        {
          fieldKey: 'license_num',
          label: 'Medical License #',
          category: 'identification',
          extractedValue: 'MD-09820-TX',
          status: 'Needs Review',
          errorDetected: true,
          errorType: 'ocr_misread',
          evidence: "Text prints 'MD-0982O-TX' with explicit footnote '(Note letter 'O')'.",
          correctedValue: 'MD-0982O-TX',
          verificationNotes: "Stage 1 misread the letter 'O' as digit '0'. Verified against character note.",
          confidence: 98
        },
        {
          fieldKey: 'dob',
          label: 'Date of Birth',
          category: 'personal',
          extractedValue: '04/18/1986',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 3 reads '04/18/1986'.",
          correctedValue: null,
          verificationNotes: 'Exact character match confirmed.',
          confidence: 99
        },
        {
          fieldKey: 'ssn_last4',
          label: 'SSN (Masked)',
          category: 'identification',
          extractedValue: 'XXX-42-8801',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 4 reads 'XXX-42-8801'.",
          correctedValue: null,
          verificationNotes: 'Standard compliant masked SSN format verified.',
          confidence: 99
        },
        {
          fieldKey: 'dea_number',
          label: 'DEA Registration #',
          category: 'identification',
          extractedValue: 'BV-7193254',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 5 reads 'BV-7193254'.",
          correctedValue: null,
          verificationNotes: 'Verified DEA checksum format pattern.',
          confidence: 97
        },
        {
          fieldKey: 'clinic_address',
          label: 'Mailing Address',
          category: 'contact',
          extractedValue: '742 HEALTH PARKWAY, SUITE 300, AUSTIN, TX 78701',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 6 reads '742 HEALTH PARKWAY, SUITE 300, AUSTIN, TX 78701'.",
          correctedValue: null,
          verificationNotes: 'Complete and legible address match.',
          confidence: 98
        },
        {
          fieldKey: 'clinic_phone',
          label: 'Clinic Direct Phone',
          category: 'contact',
          extractedValue: '(512) 555-0194',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 7 reads '(512) 555-0194'.",
          correctedValue: null,
          verificationNotes: 'Standard 10-digit North American phone verified.',
          confidence: 99
        },
        {
          fieldKey: 'email',
          label: 'Email Address',
          category: 'contact',
          extractedValue: 'k.vance.md@austinmed.org',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 8 reads 'k.vance.md@austinmed.org'.",
          correctedValue: null,
          verificationNotes: 'Domain matches healthcare provider affiliation.',
          confidence: 98
        },
        {
          fieldKey: 'hospital_affiliation',
          label: 'Hospital Affiliation',
          category: 'employment',
          extractedValue: "ST. DAVID'S MEDICAL CENTER",
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 9 reads 'ST. DAVID'S MEDICAL CENTER'.",
          correctedValue: null,
          verificationNotes: 'Facility name exact match.',
          confidence: 97
        },
        {
          fieldKey: 'medical_school',
          label: 'Medical School Attended',
          category: 'education',
          extractedValue: 'BAYLOR COLLEGE OF MEDICINE',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 10 reads 'BAYLOR COLLEGE OF MEDICINE'.",
          correctedValue: null,
          verificationNotes: 'Accredited institution confirmed.',
          confidence: 98
        },
        {
          fieldKey: 'grad_year',
          label: 'Graduation Year',
          category: 'education',
          extractedValue: '2012',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Box 11 reads '2012'.",
          correctedValue: null,
          verificationNotes: 'Document explicitly states 2012.',
          confidence: 99
        },
        {
          fieldKey: 'years_experience',
          label: 'Attending Experience Claimed',
          category: 'employment',
          extractedValue: '18 YEARS IN ACTIVE SURGICAL PRACTICE',
          status: 'Contradiction Detected',
          errorDetected: true,
          errorType: 'contradiction',
          evidence: "Box 12 claims '18 YEARS' while Box 11 proves M.D. was conferred in '2012' (max 14 years elapsed between 2012 and 2026).",
          correctedValue: 'Max 14 Years Post-MD',
          verificationNotes: "Chronological impossibility detected: An applicant graduating in 2012 cannot have 18 years of licensed attending practice in 2026.",
          confidence: 95
        },
        {
          fieldKey: 'signature',
          label: 'Applicant Jurat Signature',
          category: 'declaration',
          extractedValue: 'Dr. Katherine M. Vance',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Cursive signature matches 'Dr. Katherine M. Vance'.",
          correctedValue: null,
          verificationNotes: 'Signature present and legible.',
          confidence: 93
        },
        {
          fieldKey: 'attestation_date',
          label: 'Date of Attestation',
          category: 'declaration',
          extractedValue: '09/14/2026',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Attestation line reads '09/14/2026'.",
          correctedValue: null,
          verificationNotes: 'Current date stamp validated.',
          confidence: 98
        }
      ],
      summary: 'Stage 2 Self-Verification detected 2 critical OCR misreads in identity tokens and 1 chronological contradiction regarding clinical experience.',
      contradictions: [
        'Chronological conflict: 18 years experience claimed vs 2012 Medical School graduation.'
      ]
    }
  },
  {
    id: 'demo-financial-aid',
    title: 'University Financial Aid Assistance & Tax Jurat',
    subtitle: 'Flagrant income contradiction ($45k vs $145k), age mismatch, and missing required signature date',
    badge: 'Severe Contradictions & Omission',
    category: 'Higher Education & Finance',
    difficultyTag: 'Severe Contradictions',
    description: 'A classic high-risk submission where the applicant reports low income on Line 14 ($45,000) to qualify for subsidies, but attached tax line 22 states $145,000. Additionally, declared age 24 contradicts DOB 2007 (Age 18), and the mandatory parent declaration date was left completely blank.',
    knownFlaws: [
      'Line 14 reported income $45,000 contradicts Line 22 W-2 gross $145,000',
      'Student DOB 11/14/2007 (Age 18) contradicts declared tax age 24',
      'Mandatory parent signature date is missing / omitted'
    ],
    mockDataUrl: createSvgDataUrl(financialAidSvg),
    sampleDocumentData: {
      stage1Fields: [
        { fieldKey: 'student_name', label: 'Student Legal Name', category: 'personal', extractedValue: 'MARCUS A. THORNE', confidence: 97, rawLocationHint: 'Part A, row 1' },
        { fieldKey: 'cwid', label: 'Campus Student CWID', category: 'identification', extractedValue: 'CWID-9081249', confidence: 95, rawLocationHint: 'Part A, row 1' },
        { fieldKey: 'student_dob', label: 'Student Date of Birth', category: 'personal', extractedValue: '11/14/2007', confidence: 94, rawLocationHint: 'Part A, row 2' },
        { fieldKey: 'declared_age', label: 'Declared Tax Dependent Age', category: 'personal', extractedValue: '24 YEARS OLD', confidence: 89, rawLocationHint: 'Part A, row 2' },
        { fieldKey: 'reported_income', label: 'Reported AGI (Line 14)', category: 'financial', extractedValue: '$45,000.00', confidence: 96, rawLocationHint: 'Part B, line 14' },
        { fieldKey: 'tax_w2_income', label: 'W-2 Parent Gross (Line 22)', category: 'financial', extractedValue: '$145,000.00', confidence: 95, rawLocationHint: 'Part B, line 22' },
        { fieldKey: 'residence_addr', label: 'Permanent Address', category: 'contact', extractedValue: '814 UNIVERSITY CRESCENT, APT 2B, COLUMBUS, OH 43210', confidence: 97, rawLocationHint: 'Part B, address' },
        { fieldKey: 'student_phone', label: 'Student Phone', category: 'contact', extractedValue: '(614) 555-8392', confidence: 96, rawLocationHint: 'Part B, phone' },
        { fieldKey: 'enrollment_status', label: 'Enrollment Status', category: 'education', extractedValue: 'FULL-TIME UNDERGRADUATE (15 CREDITS)', confidence: 94, rawLocationHint: 'Part B' },
        { fieldKey: 'parent_signature', label: 'Parent Signature', category: 'declaration', extractedValue: 'David Thorne', confidence: 91, rawLocationHint: 'Part C signature' },
        { fieldKey: 'declaration_date', label: 'Parent Declaration Date', category: 'declaration', extractedValue: null, confidence: 0, rawLocationHint: 'Part C date' }
      ],
      stage2Fields: [
        {
          fieldKey: 'student_name',
          label: 'Student Legal Name',
          category: 'personal',
          extractedValue: 'MARCUS A. THORNE',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Part A Box 1 shows 'MARCUS A. THORNE'.",
          correctedValue: null,
          verificationNotes: 'Clean match.',
          confidence: 98
        },
        {
          fieldKey: 'cwid',
          label: 'Campus Student CWID',
          category: 'identification',
          extractedValue: 'CWID-9081249',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Part A CWID Box shows 'CWID-9081249'.",
          correctedValue: null,
          verificationNotes: 'Legible alphanumeric ID.',
          confidence: 97
        },
        {
          fieldKey: 'student_dob',
          label: 'Student Date of Birth',
          category: 'personal',
          extractedValue: '11/14/2007',
          status: 'Contradiction Detected',
          errorDetected: true,
          errorType: 'contradiction',
          evidence: "DOB indicates '11/14/2007' (applicant is 18 years old) whereas the adjacent tax dependency box declares '24 YEARS OLD'.",
          correctedValue: 'DOB Indicates 18, Conflicts with Age 24',
          verificationNotes: "Severe internal conflict between applicant birthdate and declared age.",
          confidence: 97
        },
        {
          fieldKey: 'declared_age',
          label: 'Declared Tax Dependent Age',
          category: 'personal',
          extractedValue: '24 YEARS OLD',
          status: 'Contradiction Detected',
          errorDetected: true,
          errorType: 'contradiction',
          evidence: "Adjacent field states '24 YEARS OLD', conflicting with 2007 birth year.",
          correctedValue: 'Conflict: 18 vs 24',
          verificationNotes: "6-year age discrepancy undermines dependency formula.",
          confidence: 95
        },
        {
          fieldKey: 'reported_income',
          label: 'Reported AGI (Line 14)',
          category: 'financial',
          extractedValue: '$45,000.00',
          status: 'Contradiction Detected',
          errorDetected: true,
          errorType: 'contradiction',
          evidence: "Line 14 self-reports '$45,000.00' but Line 22 official W-2 excerpt states '$145,000.00'.",
          correctedValue: '$145,000.00 (W-2 Source)',
          verificationNotes: "Critical financial discrepancy: $100,000 difference between self-reported AGI and attached W-2 documentation.",
          confidence: 99
        },
        {
          fieldKey: 'tax_w2_income',
          label: 'W-2 Parent Gross (Line 22)',
          category: 'financial',
          extractedValue: '$145,000.00',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Line 22 clearly displays '$145,000.00'.",
          correctedValue: null,
          verificationNotes: 'Source value verified against document text.',
          confidence: 98
        },
        {
          fieldKey: 'residence_addr',
          label: 'Permanent Address',
          category: 'contact',
          extractedValue: '814 UNIVERSITY CRESCENT, APT 2B, COLUMBUS, OH 43210',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Address box reads '814 UNIVERSITY CRESCENT, APT 2B, COLUMBUS, OH 43210'.",
          correctedValue: null,
          verificationNotes: 'Standard address formatting matches.',
          confidence: 98
        },
        {
          fieldKey: 'student_phone',
          label: 'Student Phone',
          category: 'contact',
          extractedValue: '(614) 555-8392',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Phone box reads '(614) 555-8392'.",
          correctedValue: null,
          verificationNotes: '10-digit number confirmed.',
          confidence: 99
        },
        {
          fieldKey: 'enrollment_status',
          label: 'Enrollment Status',
          category: 'education',
          extractedValue: 'FULL-TIME UNDERGRADUATE (15 CREDITS)',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Enrollment box states 'FULL-TIME UNDERGRADUATE (15 CREDITS)'.",
          correctedValue: null,
          verificationNotes: 'Status verified.',
          confidence: 97
        },
        {
          fieldKey: 'parent_signature',
          label: 'Parent Signature',
          category: 'declaration',
          extractedValue: 'David Thorne',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Signature line shows cursive signature 'David Thorne'.",
          correctedValue: null,
          verificationNotes: 'Signature visual present.',
          confidence: 92
        },
        {
          fieldKey: 'declaration_date',
          label: 'Parent Declaration Date',
          category: 'declaration',
          extractedValue: null,
          status: 'Missing',
          errorDetected: true,
          errorType: 'omission',
          evidence: "Mandatory date box is completely empty; red outline shows '[UNFILLED / BLANK FIELD]'.",
          correctedValue: null,
          verificationNotes: "Mandatory date field was left uncompleted by applicant. Application legally incomplete without date stamp.",
          confidence: 99
        }
      ],
      summary: 'Stage 2 Self-Verification uncovered $100,000 income disparity, a 6-year age/DOB paradox, and an uncompleted mandatory declaration date.',
      contradictions: [
        'Line 14 reported income ($45,000) directly contradicts Line 22 W-2 ($145,000).',
        'Student birthdate 2007 (Age 18) directly contradicts declared dependent age 24.'
      ]
    }
  },
  {
    id: 'demo-travel-visa',
    title: 'International Travel Visa & Border Entry (V-109)',
    subtitle: 'Handwriting corrections (Apt 48 struck out for Apt 4B), 5 vs S OCR trap, incomplete phone digits',
    badge: 'Ambiguity & Handwritten Corrections',
    category: 'Government & Border Control',
    difficultyTag: 'Complex Ambiguities',
    description: 'Demonstrates manual edits and character ambiguities: passport number N85S3491 contains adjacent 5 and S; the street address contains a strikethrough correction (Apt 48 crossed out, corrected to Apt 4B); and the telephone number is missing its final digit.',
    knownFlaws: [
      'Passport number N85S3491 confused as N8553491 or N8SS3491 in raw OCR',
      'Address Apt 48 struck out with Apt 4B written above it',
      'Phone number +971 50 123456 truncated to 9 digits'
    ],
    mockDataUrl: createSvgDataUrl(travelVisaSvg),
    sampleDocumentData: {
      stage1Fields: [
        { fieldKey: 'surname', label: 'Passport Surname', category: 'personal', extractedValue: 'AL-MANSOOR', confidence: 98, rawLocationHint: 'Section 1' },
        { fieldKey: 'given_name', label: 'Given Names', category: 'personal', extractedValue: 'TARIQ FAISAL', confidence: 97, rawLocationHint: 'Section 1' },
        { fieldKey: 'passport_num', label: 'Passport Number', category: 'identification', extractedValue: 'N8553491', confidence: 73, rawLocationHint: 'Section 1, passport box' },
        { fieldKey: 'nationality', label: 'Nationality', category: 'personal', extractedValue: 'UNITED ARAB EMIRATES', confidence: 98, rawLocationHint: 'Section 1' },
        { fieldKey: 'address', label: 'Residential Address', category: 'contact', extractedValue: 'BUILDING 14, AL-NAHDA RD, APT 48, DUBAI, UAE', confidence: 76, rawLocationHint: 'Section 1, address' },
        { fieldKey: 'phone', label: 'Primary Telephone', category: 'contact', extractedValue: '+971 50 123456', confidence: 79, rawLocationHint: 'Section 1, phone' },
        { fieldKey: 'email', label: 'Email Address', category: 'contact', extractedValue: 't.faisal@almansoor-trade.com', confidence: 96, rawLocationHint: 'Section 1, email' },
        { fieldKey: 'travel_purpose', label: 'Purpose of Travel', category: 'other', extractedValue: 'BUSINESS & TECH CONFERENCE', confidence: 95, rawLocationHint: 'Section 2' },
        { fieldKey: 'stay_length', label: 'Requested Stay Length', category: 'other', extractedValue: '14 DAYS', confidence: 95, rawLocationHint: 'Section 2' }
      ],
      stage2Fields: [
        {
          fieldKey: 'surname',
          label: 'Passport Surname',
          category: 'personal',
          extractedValue: 'AL-MANSOOR',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'AL-MANSOOR'.",
          correctedValue: null,
          verificationNotes: 'Exact match.',
          confidence: 99
        },
        {
          fieldKey: 'given_name',
          label: 'Given Names',
          category: 'personal',
          extractedValue: 'TARIQ FAISAL',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'TARIQ FAISAL'.",
          correctedValue: null,
          verificationNotes: 'Exact match.',
          confidence: 99
        },
        {
          fieldKey: 'passport_num',
          label: 'Passport Number',
          category: 'identification',
          extractedValue: 'N8553491',
          status: 'Needs Review',
          errorDetected: true,
          errorType: 'ocr_misread',
          evidence: "Document displays 'N85S3491' with digit 5 followed by capital letter S.",
          correctedValue: 'N85S3491',
          verificationNotes: "Stage 1 extraction collapsed '5S' into duplicate '55'. Corrected based on distinct serif on the 'S'.",
          confidence: 94
        },
        {
          fieldKey: 'nationality',
          label: 'Nationality',
          category: 'personal',
          extractedValue: 'UNITED ARAB EMIRATES',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'UNITED ARAB EMIRATES'.",
          correctedValue: null,
          verificationNotes: 'Valid sovereign nation format.',
          confidence: 99
        },
        {
          fieldKey: 'address',
          label: 'Residential Address',
          category: 'contact',
          extractedValue: 'BUILDING 14, AL-NAHDA RD, APT 48, DUBAI, UAE',
          status: 'Needs Review',
          errorDetected: true,
          errorType: 'ambiguity',
          evidence: "'APT 48' is struck through with line, and 'APT 4B' is inked directly adjacent.",
          correctedValue: 'BUILDING 14, AL-NAHDA RD, APT 4B, DUBAI, UAE',
          verificationNotes: "Detected pen strikethrough correction on apartment identifier: 48 was cancelled and replaced with 4B.",
          confidence: 91
        },
        {
          fieldKey: 'phone',
          label: 'Primary Telephone',
          category: 'contact',
          extractedValue: '+971 50 123456',
          status: 'Needs Review',
          errorDetected: true,
          errorType: 'format_discrepancy',
          evidence: "Phone number string contains only 6 subscriber digits after prefix '+971 50 123456'. UAE mobile numbers require 7 subscriber digits.",
          correctedValue: null,
          verificationNotes: "Incomplete number detected (9 digits total instead of standard 10).",
          confidence: 88
        },
        {
          fieldKey: 'email',
          label: 'Email Address',
          category: 'contact',
          extractedValue: 't.faisal@almansoor-trade.com',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Email box displays 't.faisal@almansoor-trade.com'.",
          correctedValue: null,
          verificationNotes: 'RFC-compliant email syntax verified.',
          confidence: 98
        },
        {
          fieldKey: 'travel_purpose',
          label: 'Purpose of Travel',
          category: 'other',
          extractedValue: 'BUSINESS & TECH CONFERENCE',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Section 2 reads 'BUSINESS & TECH CONFERENCE'.",
          correctedValue: null,
          verificationNotes: 'Authorized category.',
          confidence: 98
        },
        {
          fieldKey: 'stay_length',
          label: 'Requested Stay Length',
          category: 'other',
          extractedValue: '14 DAYS',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Section 2 reads '14 DAYS'.",
          correctedValue: null,
          verificationNotes: 'Within 30-day short-stay limit.',
          confidence: 98
        }
      ],
      summary: 'Stage 2 Self-Verification detected an alphanumeric character swap (5 vs S), resolved a manual strikethrough amendment on apartment address, and flagged an incomplete telephone sequence.',
      contradictions: []
    }
  },
  {
    id: 'demo-clean-control',
    title: 'Horizon Tech Senior Architect Employment Dossier',
    subtitle: 'Clean control document with 100% field grounding and flawless consistency',
    badge: 'Clean Baseline (Control)',
    category: 'Corporate HR & Employment',
    difficultyTag: 'Clean Control',
    description: 'Provides a benchmark baseline with high contrast, typed typography, valid phone and address syntax, and verifiable credentials to showcase how FormVerify certifies clean, compliant applications.',
    knownFlaws: [],
    mockDataUrl: createSvgDataUrl(cleanApplicationSvg),
    sampleDocumentData: {
      stage1Fields: [
        { fieldKey: 'applicant_name', label: 'Applicant Full Name', category: 'personal', extractedValue: 'ELEANOR S. CHEN', confidence: 99, rawLocationHint: 'Box 1' },
        { fieldKey: 'application_id', label: 'Application ID', category: 'identification', extractedValue: 'HGT-2026-99214', confidence: 99, rawLocationHint: 'Box 2' },
        { fieldKey: 'dob', label: 'Date of Birth', category: 'personal', extractedValue: '03/12/1991', confidence: 98, rawLocationHint: 'Box 3' },
        { fieldKey: 'phone', label: 'Phone Number', category: 'contact', extractedValue: '(415) 555-0182', confidence: 99, rawLocationHint: 'Box 4' },
        { fieldKey: 'work_auth', label: 'Work Authorization', category: 'identification', extractedValue: 'US CITIZEN', confidence: 99, rawLocationHint: 'Box 5' },
        { fieldKey: 'address', label: 'Residential Address', category: 'contact', extractedValue: '524 MONTGOMERY ST, SAN FRANCISCO, CA 94111', confidence: 99, rawLocationHint: 'Box 6' },
        { fieldKey: 'email', label: 'Email Address', category: 'contact', extractedValue: 'eleanor.chen@csalumni.org', confidence: 99, rawLocationHint: 'Box 7' },
        { fieldKey: 'degree', label: 'Degree & Major', category: 'education', extractedValue: 'M.S. COMPUTER SCIENCE - STANFORD UNIVERSITY', confidence: 98, rawLocationHint: 'Box 8' },
        { fieldKey: 'grad_year', label: 'Graduation Year', category: 'education', extractedValue: '2015', confidence: 99, rawLocationHint: 'Box 9' }
      ],
      stage2Fields: [
        {
          fieldKey: 'applicant_name',
          label: 'Applicant Full Name',
          category: 'personal',
          extractedValue: 'ELEANOR S. CHEN',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'ELEANOR S. CHEN'.",
          correctedValue: null,
          verificationNotes: 'Exact character match confirmed.',
          confidence: 100
        },
        {
          fieldKey: 'application_id',
          label: 'Application ID',
          category: 'identification',
          extractedValue: 'HGT-2026-99214',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'HGT-2026-99214'.",
          correctedValue: null,
          verificationNotes: 'Valid corporate tracking syntax.',
          confidence: 100
        },
        {
          fieldKey: 'dob',
          label: 'Date of Birth',
          category: 'personal',
          extractedValue: '03/12/1991',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints '03/12/1991'.",
          correctedValue: null,
          verificationNotes: 'Valid date representation.',
          confidence: 99
        },
        {
          fieldKey: 'phone',
          label: 'Phone Number',
          category: 'contact',
          extractedValue: '(415) 555-0182',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints '(415) 555-0182'.",
          correctedValue: null,
          verificationNotes: 'Standard 10-digit format.',
          confidence: 99
        },
        {
          fieldKey: 'work_auth',
          label: 'Work Authorization',
          category: 'identification',
          extractedValue: 'US CITIZEN',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'US CITIZEN'.",
          correctedValue: null,
          verificationNotes: 'Legally complete.',
          confidence: 100
        },
        {
          fieldKey: 'address',
          label: 'Residential Address',
          category: 'contact',
          extractedValue: '524 MONTGOMERY ST, SAN FRANCISCO, CA 94111',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints '524 MONTGOMERY ST, SAN FRANCISCO, CA 94111'.",
          correctedValue: null,
          verificationNotes: 'Valid postal address matches city & ZIP.',
          confidence: 100
        },
        {
          fieldKey: 'email',
          label: 'Email Address',
          category: 'contact',
          extractedValue: 'eleanor.chen@csalumni.org',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'eleanor.chen@csalumni.org'.",
          correctedValue: null,
          verificationNotes: 'Valid alumni domain address.',
          confidence: 100
        },
        {
          fieldKey: 'degree',
          label: 'Degree & Major',
          category: 'education',
          extractedValue: 'M.S. COMPUTER SCIENCE - STANFORD UNIVERSITY',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints 'M.S. COMPUTER SCIENCE - STANFORD UNIVERSITY'.",
          correctedValue: null,
          verificationNotes: 'Degree confirmed.',
          confidence: 99
        },
        {
          fieldKey: 'grad_year',
          label: 'Graduation Year',
          category: 'education',
          extractedValue: '2015',
          status: 'Verified',
          errorDetected: false,
          errorType: 'none',
          evidence: "Text prints '2015'.",
          correctedValue: null,
          verificationNotes: 'Chronologically consistent with candidate DOB 1991.',
          confidence: 99
        }
      ],
      summary: 'Stage 2 Self-Verification certified all 9/9 fields with 100% confidence. No OCR anomalies, omissions, or logical contradictions detected.',
      contradictions: []
    }
  }
];
