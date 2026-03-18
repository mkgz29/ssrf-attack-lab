# SSRF Attack Lab

![MITRE ATT&CK](https://img.shields.io/badge/MITRE_ATT%26CK-Security-red?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Security Lab](https://img.shields.io/badge/Security-Lab-black?style=for-the-badge)

Educational security lab demonstrating a vulnerable Node.js API affected by SSRF.

## Architecture

<p align="center">
  <img src="./cyberlab_architecture.svg" width="900">
</p>


## Goals

- Demonstrate reconnaissance techniques
- Exploit an Information Disclosure vulnerability
- Perform SSRF exploitation
- Map the attack chain to MITRE ATT&CK
- Implement mitigation strategies

## Attack Chain — MITRE ATT&CK Mapping

| Step | Technique ID | Tactic | Vulnerability | Detection Rule | Status |
|------|-------------|--------|---------------|----------------|--------|
| 1 | T1595 / T1592 | Reconnaissance | Debug endpoint exposed in production | Alert on `/api/debug` access | ✅ Implemented |
| 2 | T1190 / T1110 | Initial Access | NoSQL Injection on login endpoint | Block `$gt`, `$regex` in body | ✅ Implemented |
| 3 | T1090.001 | Lateral Movement | SSRF via URL import to internal network | Reject RFC 1918 IP ranges | ✅ Implemented |
| 4 | T1552.001 | Credential Access | `process.env` leaked via internal API | Alert on `/admin/config` access | ✅ Implemented |
| 5 | T1078 / T1136 | Persistence | Forged JWT + backdoor admin account | Audit log on user creation | 🔄 In progress |
| 6 | T1041 | Exfiltration | Bulk user export via compromised token | Rate limit + anomaly detection | 🔄 In progress |



## Status

| Component | Status |
|-----------|--------|
| Lab infrastructure (Docker Compose) | ✅ Complete |
| API Gateway — vulnerable service | ✅ Complete |
| Internal API — no-auth service | ✅ Complete |
| Attack scripts 1–4 | ✅ Complete |
| Attack scripts 5–6 | 🔄 In progress |
| SIEM Logger + detectors | 🔄 In progress |
| Defender Dashboard | 🔄 In progress |
| Defense patches | 🔄 In progress |
