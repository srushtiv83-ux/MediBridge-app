# MediBridge Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o| PATIENT_PROFILES : has
    USERS ||--o| CARETAKER_PROFILES : has
    USERS ||--o{ REFRESH_SESSIONS : owns
    USERS ||--o{ EMAIL_VERIFICATION_TOKENS : verifies
    USERS ||--o{ PASSWORD_RESET_TOKENS : resets
    USERS ||--o{ CARETAKER_RELATIONSHIPS : caretaker
    PATIENT_PROFILES ||--o{ CARETAKER_RELATIONSHIPS : patient
    PATIENT_PROFILES ||--o{ CARE_LINK_CODES : issues
    PATIENT_PROFILES ||--o{ MEDICINES : owns
    PATIENT_PROFILES ||--o{ PRESCRIPTIONS : has
    MEDICINES o|--o{ PRESCRIPTIONS : referenced_by
    MEDICINES ||--o{ MEDICATION_SCHEDULES : scheduled
    PATIENT_PROFILES ||--o{ MEDICATION_SCHEDULES : owns
    MEDICATION_SCHEDULES ||--|{ MEDICATION_SCHEDULE_TIMES : has
    MEDICATION_SCHEDULES ||--o{ MEDICATION_LOGS : records
    MEDICINES ||--o{ MEDICATION_LOGS : records
    PATIENT_PROFILES ||--o{ MEDICATION_LOGS : owns
    PATIENT_PROFILES ||--o{ APPOINTMENTS : attends
    USERS ||--o{ APPOINTMENTS : creates
    PATIENT_PROFILES ||--o{ MEDICAL_REPORTS : owns
    USERS ||--o{ MEDICAL_REPORTS : uploads
    USERS ||--o{ AI_CONVERSATIONS : starts
    AI_CONVERSATIONS ||--o{ AI_MESSAGES : contains
    USERS ||--o| NOTIFICATION_PREFERENCES : configures
    PATIENT_PROFILES ||--o{ NOTIFICATIONS : subject
    CARETAKER_PROFILES o|--o{ NOTIFICATIONS : receives
    NOTIFICATIONS ||--o| NOTIFICATION_OUTBOX : queues
    NOTIFICATIONS ||--o{ NOTIFICATION_LOGS : attempts
    USERS o|--o{ AUDIT_LOGS : acts
```

`o|--o{` on prescription/notification relationships represents an optional reference from each child row. Authorization is enforced in application services in addition to the relational constraints.
