export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'informational'
export type Priority = 'P1' | 'P2' | 'P3' | 'P4'
export type Verdict = 'true-positive' | 'false-positive' | 'uncertain'

export type Entity = {
  kind: 'user' | 'device' | 'mail' | 'address' | 'token' | 'app'
  name: string
  meta: string
}

export type TimelineEvent = {
  time: string
  kind: 'signal' | 'system' | 'owlsoc' | 'user'
  label: string
  evidence?: string
}

export type Mitre = { id: string; tactic: string; technique: string }

export type EvidenceItem = {
  ref: string
  tool: string
  sourceRef: string | null
  summary: string
}

export type Action = {
  action: string
  target: string
  rationale: string
  requires_approval: boolean
  reversible: boolean
}

export type SampleAlert = {
  id: string
  alertId: string
  source: string
  fired: string
  severity: Severity
  priority: Priority
  title: string
  oneLiner: string
  verdict: Verdict
  confidence: number
  confidenceRationale: string
  investigatedIn: string
  summary: string
  rootCauseHypothesis: string
  timeline: TimelineEvent[]
  mitre: Mitre[]
  evidenceChain: EvidenceItem[]
  entities: Entity[]
  actions: Action[]
  unresolvedQuestions: string[]
}

export const SAMPLE_ALERTS: SampleAlert[] = [
  {
    id: 'impossible-travel',
    alertId: 'A-49281',
    source: 'Microsoft Sentinel · Identity Protection',
    fired: '2026-06-05 11:42 UTC',
    severity: 'medium',
    priority: 'P2',
    title: 'Impossible travel for privileged account',
    oneLiner: 'admin@constellation: London → Singapore in 86 min',
    verdict: 'true-positive',
    confidence: 94,
    confidenceRationale: 'Multiple independent signals converge: the phishing click, the token issuance, and the geographically impossible replay form a coherent AiTM chain with no plausible benign explanation.',
    investigatedIn: '01:47',
    summary:
      'A privileged admin account signed in from London at 11:42 UTC and from Singapore at 13:08 UTC. That journey isn\'t physically possible in 86 minutes. The second session reuses a refresh token issued earlier the same day and bypassed MFA via the existing token. The pattern matches recent adversary-in-the-middle (AiTM) phishing campaigns targeting the Microsoft 365 admin role. Containment recommended.',
    rootCauseHypothesis: 'Adversary-in-the-middle phishing campaign captured a refresh token, which was then replayed from a different geography to access the admin account without triggering MFA.',
    timeline: [
      { time: '08:14', kind: 'signal', label: 'Sign-in from London office (10.0.4.22) — MFA satisfied', evidence: 'SigninLogs · CorrelationId 7f3a…' },
      { time: '11:42', kind: 'signal', label: 'Sign-in from London (10.0.4.22) — refresh token issued', evidence: 'SigninLogs · TokenIssuerType=AzureAD' },
      { time: '13:01', kind: 'signal', label: 'Phishing landing page resolved by user (m365-admln.co)', evidence: 'Defender for Office · UrlClickEvents' },
      { time: '13:08', kind: 'signal', label: 'Sign-in from Singapore (45.77.x.x) — same refresh token replayed', evidence: 'SigninLogs · IPAddress=45.77.214.108' },
      { time: '13:08', kind: 'owlsoc', label: 'OwlSOC picked up the alert · investigation started' },
      { time: '13:09', kind: 'owlsoc', label: 'Correlated phishing click → token issuance → token replay' },
      { time: '13:10', kind: 'owlsoc', label: 'Verdict: likely true positive · containment recommended' },
    ],
    mitre: [
      { id: 'T1566.002', tactic: 'Initial Access', technique: 'Phishing — Spearphishing Link' },
      { id: 'T1539', tactic: 'Credential Access', technique: 'Steal Web Session Cookie' },
      { id: 'T1078.004', tactic: 'Persistence', technique: 'Valid Accounts — Cloud Accounts' },
    ],
    evidenceChain: [
      { ref: 'E1', tool: 'SigninLogs', sourceRef: 'CorrelationId 7f3a…', summary: 'Refresh token issued from London office IP 10.0.4.22 at 11:42 UTC' },
      { ref: 'E2', tool: 'UrlClickEvents', sourceRef: null, summary: 'User resolved phishing landing page m365-admln.co at 13:01 UTC' },
      { ref: 'E3', tool: 'SigninLogs', sourceRef: 'IPAddress 45.77.214.108', summary: 'Same refresh token replayed from Singapore IP at 13:08 UTC, bypassing MFA' },
    ],
    entities: [
      { kind: 'user', name: 'admin@constellation.io', meta: 'Global Administrator · Tier-0' },
      { kind: 'token', name: 'refresh_token · 0xA31F…', meta: 'Issued 11:42 · replayed 13:08' },
      { kind: 'address', name: '45.77.214.108', meta: 'Singapore · DigitalOcean · first-seen tenant' },
      { kind: 'app', name: 'm365-admln.co', meta: 'Lookalike domain · registered 4 days ago' },
    ],
    actions: [
      { action: 'Revoke all sessions', target: 'admin@constellation.io', rationale: 'Forces every active token to re-authenticate. Recommended first.', requires_approval: true, reversible: true },
      { action: 'Block domain', target: 'm365-admln.co', rationale: 'Block the AiTM landing-page domain at the mail and proxy layer.', requires_approval: true, reversible: true },
      { action: 'Disable account', target: 'admin@constellation.io', rationale: 'Stronger response if you can\'t reach the user in the next 15 minutes.', requires_approval: true, reversible: false },
    ],
    unresolvedQuestions: ['Whether other accounts in the tenant received the same phishing lure'],
  },
  {
    id: 'encoded-powershell',
    alertId: 'A-49283',
    source: 'Microsoft Defender for Endpoint',
    fired: '2026-06-05 14:22 UTC',
    severity: 'high',
    priority: 'P1',
    title: 'Encoded PowerShell spawned from Word',
    oneLiner: 'WS-2104 (sarah.kane): base64 PS → credential harvester pattern',
    verdict: 'true-positive',
    confidence: 96,
    confidenceRationale: 'The decoded payload matches the Atlas-7 TTP cluster with high structural similarity. The execution chain (email → macro → encoded PowerShell → credential harvester) is a well-documented pattern with minimal false-positive surface.',
    investigatedIn: '01:32',
    summary:
      'Encoded PowerShell was launched by winword.exe on finance workstation WS-2104. The decoded payload is a known credential-harvester pattern that drops a Mimikatz-style helper into %APPDATA% and exfiltrates LSASS-derived material to a hard-coded URL. The user opened a macro-enabled attachment four minutes earlier from a sender impersonating a known supplier. Network containment recommended now; the device can be restored from snapshot afterwards.',
    rootCauseHypothesis: 'A macro-enabled document from a spoofed supplier spawned encoded PowerShell that matches the Atlas-7 credential-harvesting family. The payload drops a Mimikatz-style helper and exfiltrates LSASS-derived material.',
    timeline: [
      { time: '14:09', kind: 'signal', label: 'Inbound mail — "Invoice overdue — PDF.docm" from supplier-billings@flowsystems.co', evidence: 'Defender for Office · NetworkMessageId b3d…' },
      { time: '14:18', kind: 'user',   label: 'User opened the attachment · macros enabled' },
      { time: '14:22', kind: 'signal', label: 'powershell.exe -enc … spawned by winword.exe', evidence: 'DeviceProcessEvents · ProcessId 7812' },
      { time: '14:22', kind: 'owlsoc', label: 'OwlSOC picked up the alert · investigation started' },
      { time: '14:23', kind: 'owlsoc', label: 'Decoded payload matched harvester family Atlas-7 (TTP cluster)' },
      { time: '14:23', kind: 'owlsoc', label: 'Verdict: likely true positive · isolate now' },
    ],
    mitre: [
      { id: 'T1566.001', tactic: 'Initial Access', technique: 'Phishing — Spearphishing Attachment' },
      { id: 'T1059.001', tactic: 'Execution', technique: 'Command and Scripting — PowerShell' },
      { id: 'T1027',     tactic: 'Defense Evasion', technique: 'Obfuscated Files or Information' },
      { id: 'T1003.001', tactic: 'Credential Access', technique: 'OS Credential Dumping — LSASS' },
    ],
    evidenceChain: [
      { ref: 'E1', tool: 'Defender for Office', sourceRef: 'NetworkMessageId b3d…', summary: 'Inbound mail with macro-enabled .docm attachment from spoofed supplier domain' },
      { ref: 'E2', tool: 'DeviceProcessEvents', sourceRef: 'ProcessId 7812', summary: 'powershell.exe -enc spawned by winword.exe on WS-2104' },
      { ref: 'E3', tool: 'ThreatIntelligence', sourceRef: null, summary: 'Decoded payload structural match to Atlas-7 credential harvester family' },
    ],
    entities: [
      { kind: 'user',   name: 'sarah.kane@constellation.io', meta: 'Finance · Senior · last sign-in 13:54' },
      { kind: 'device', name: 'WS-2104', meta: 'Windows 11 23H2 · last patched 4 days ago' },
      { kind: 'mail',   name: 'msg-id 0x9F3…', meta: 'From supplier-billings@flowsystems.co · subject: Invoice overdue' },
      { kind: 'address', name: '193.27.x.x', meta: 'Exfil target · seen across 11 unrelated incidents' },
    ],
    actions: [
      { action: 'Isolate device', target: 'WS-2104', rationale: 'Defender for Endpoint network isolation. Reversible in one click.', requires_approval: true, reversible: true },
      { action: 'Force password reset', target: 'sarah.kane@constellation.io', rationale: 'LSASS may be compromised. Reset before bringing the device back online.', requires_approval: true, reversible: true },
      { action: 'Block sender domain', target: 'flowsystems.co (tenant-wide)', rationale: 'Registered lookalike of flowsystems.com. Block at the mail gateway.', requires_approval: true, reversible: true },
    ],
    unresolvedQuestions: ['Whether the exfiltration target 193.27.x.x received any data before containment'],
  },
  {
    id: 'mass-download',
    alertId: 'A-49285',
    source: 'Microsoft Sentinel · M365 Activity',
    fired: '2026-06-05 09:11 UTC',
    severity: 'medium',
    priority: 'P3',
    title: 'Mass file download in SharePoint',
    oneLiner: 'sarah.kane: 1,247 files in 3 min from "Vendor Contracts"',
    verdict: 'false-positive',
    confidence: 91,
    confidenceRationale: 'The ITSM change ticket independently corroborates the download activity. No outbound traffic anomalies observed during or after the window.',
    investigatedIn: '01:18',
    summary:
      'The activity is explained by an approved compliance audit. A ticket in the customer\'s ITSM (CHG-2026-0418) authorised an audit team to bulk-export the Vendor Contracts library this week. The user, the time window, the library, and the destination all match the change record. No exfil-grade outbound traffic was observed during or after the download. No action required; we\'ve added the context to the alert so future bulk-downloads tied to this change won\'t page anyone.',
    rootCauseHypothesis: 'Approved compliance audit (CHG-2026-0418) authorised bulk export of the Vendor Contracts library. All signals match the change record.',
    timeline: [
      { time: '09:02', kind: 'signal', label: 'User signed in from London office IP · MFA satisfied' },
      { time: '09:11', kind: 'signal', label: '1,247 file downloads from "Vendor Contracts" library', evidence: 'SharePoint · UnifiedAuditLog' },
      { time: '09:11', kind: 'owlsoc', label: 'OwlSOC picked up the alert · investigation started' },
      { time: '09:11', kind: 'system', label: 'Matched against change ticket CHG-2026-0418 (Compliance audit · approved)', evidence: 'ITSM webhook · status=approved' },
      { time: '09:12', kind: 'owlsoc', label: 'No abnormal outbound traffic from this device in the window' },
      { time: '09:12', kind: 'owlsoc', label: 'Verdict: likely false positive · no action required' },
    ],
    mitre: [
      { id: 'T1530', tactic: 'Collection', technique: 'Data from Cloud Storage (assessed and ruled out)' },
    ],
    evidenceChain: [
      { ref: 'E1', tool: 'UnifiedAuditLog', sourceRef: null, summary: '1,247 file download events from Vendor Contracts library in 3-minute window' },
      { ref: 'E2', tool: 'ITSM webhook', sourceRef: 'CHG-2026-0418', summary: 'Approved change ticket authorising compliance audit team to bulk-export this library' },
    ],
    entities: [
      { kind: 'user',   name: 'sarah.kane@constellation.io', meta: 'Finance · Senior · part of audit team this week' },
      { kind: 'app',    name: 'SharePoint · Vendor Contracts', meta: '1,247 files · approved bulk export' },
      { kind: 'device', name: 'WS-2104', meta: 'Same device used yesterday for the same library' },
    ],
    actions: [
      { action: 'Close as false positive', target: 'Sentinel incident', rationale: 'Suppress future bulk-downloads tied to CHG-2026-0418 for the next 5 days.', requires_approval: false, reversible: true },
    ],
    unresolvedQuestions: [],
  },
]
