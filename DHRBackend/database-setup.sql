
-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    specialization TEXT,
    qualification TEXT,
    registration_number TEXT,
    registration_council TEXT,
    hospital_name TEXT,
    hospital_address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    is_verified BOOLEAN DEFAULT true,
    verification_status TEXT DEFAULT 'verified',
    verified_by TEXT,
    verification_date TIMESTAMP,
    avatar_url TEXT,
    experience_years INTEGER,
    password_hash TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    health_id TEXT UNIQUE NOT NULL,
    aadhaar TEXT,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    date_of_birth DATE,
    phone TEXT,
    email TEXT,
    origin_state TEXT,
    origin_city TEXT,
    current_state TEXT,
    current_city TEXT,
    current_address TEXT,
    workplace TEXT,
    avatar_url TEXT,
    blood_group TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    is_verified BOOLEAN DEFAULT true,
    verification_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    visit_date TIMESTAMP DEFAULT NOW(),
    visit_type TEXT,
    symptoms TEXT,
    diagnosis TEXT,
    diagnosis_code TEXT,
    disease_status TEXT,
    clinical_notes TEXT,
    treatment_plan TEXT,
    patient_progress TEXT,
    test_results JSONB,
    uploaded_files JSONB,
    health_education_sent BOOLEAN DEFAULT false,
    preferred_language TEXT,
    communication_method JSONB,
    is_active BOOLEAN DEFAULT true,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    medical_record_id UUID REFERENCES medical_records(id) ON DELETE CASCADE,
    medicine_name TEXT NOT NULL,
    dosage TEXT,
    frequency TEXT,
    duration TEXT,
    instructions TEXT,
    status TEXT DEFAULT 'active',
    prescribed_date TIMESTAMP DEFAULT NOW(),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Vitals Table
CREATE TABLE IF NOT EXISTS vitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    medical_record_id UUID REFERENCES medical_records(id) ON DELETE CASCADE,
    blood_pressure_systolic INTEGER,
    blood_pressure_diastolic INTEGER,
    temperature DECIMAL(4,1),
    blood_sugar INTEGER,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    bmi DECIMAL(4,1),
    heart_rate INTEGER,
    oxygen_saturation INTEGER,
    respiratory_rate INTEGER,
    pulse INTEGER,
    notes TEXT,
    recorded_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    medical_record_id UUID REFERENCES medical_records(id) ON DELETE SET NULL,
    appointment_date TIMESTAMP NOT NULL,
    appointment_type TEXT,
    duration_minutes INTEGER DEFAULT 30,
    status TEXT DEFAULT 'scheduled',
    reason TEXT,
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    reminder_sent_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP,
    cancelled_by TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================================================
-- STEP 2: INSERT SAMPLE DATA
-- ==================================================

-- Sample Doctors
INSERT INTO doctors (doctor_id, name, email, phone, specialization, qualification, hospital_name, city, state, password_hash, experience_years) VALUES
('DOC-2024-001234', 'Dr. Ramesh Kumar', 'ramesh.kumar@hospital.com', '+91-9876543210', 'General Physician', 'MBBS, MD', 'City General Hospital', 'Mumbai', 'Maharashtra', 'password123', 15),
('DOC-2024-001235', 'Dr. Priya Sharma', 'priya.sharma@hospital.com', '+91-9876543211', 'Pediatrician', 'MBBS, MD (Pediatrics)', 'City General Hospital', 'Mumbai', 'Maharashtra', 'password123', 10),
('DOC-2024-001236', 'Dr. Amit Patel', 'amit.patel@hospital.com', '+91-9876543212', 'Cardiologist', 'MBBS, MD, DM (Cardiology)', 'Heart Care Center', 'Delhi', 'Delhi', 'password123', 20);

-- Sample Patients
INSERT INTO patients (health_id, aadhaar, name, age, gender, phone, origin_state, origin_city, current_state, current_city, workplace, blood_group) VALUES
('14-1234-5678-9012', '123456789012', 'Rajesh Kumar Singh', 32, 'Male', '+91-9123456789', 'Bihar', 'Patna', 'Maharashtra', 'Mumbai', 'Construction Site A-23', 'O+'),
('14-1234-5678-9013', '123456789013', 'Sunita Devi', 28, 'Female', '+91-9123456790', 'Uttar Pradesh', 'Lucknow', 'Maharashtra', 'Mumbai', 'Textile Factory B-12', 'A+'),
('14-1234-5678-9014', '123456789014', 'Rahul Verma', 35, 'Male', '+91-9123456791', 'Madhya Pradesh', 'Bhopal', 'Delhi', 'Delhi', 'Construction Site D-45', 'B+');

-- Get IDs for relationships (you'll need to run this and use the returned IDs)
DO $$
DECLARE
    doctor1_id UUID;
    doctor2_id UUID;
    patient1_id UUID;
    patient2_id UUID;
    record1_id UUID;
    record2_id UUID;
BEGIN
    -- Get Doctor IDs
    SELECT id INTO doctor1_id FROM doctors WHERE doctor_id = 'DOC-2024-001234';
    SELECT id INTO doctor2_id FROM doctors WHERE doctor_id = 'DOC-2024-001235';
    
    -- Get Patient IDs
    SELECT id INTO patient1_id FROM patients WHERE health_id = '14-1234-5678-9012';
    SELECT id INTO patient2_id FROM patients WHERE health_id = '14-1234-5678-9013';

    -- Sample Medical Records
    INSERT INTO medical_records (patient_id, doctor_id, visit_type, symptoms, diagnosis, disease_status, clinical_notes, treatment_plan, patient_progress, preferred_language)
    VALUES 
    (patient1_id, doctor1_id, 'consultation', 'Persistent cough for 3 weeks, mild fever, chest pain, fatigue', 'Respiratory Infection', 'ongoing', 'Patient shows signs of respiratory infection. Prescribed antibiotics and advised complete rest.', 'Antibiotics course, rest, follow-up in 2 weeks', 'stable', 'hindi')
    RETURNING id INTO record1_id;

    INSERT INTO medical_records (patient_id, doctor_id, visit_type, symptoms, diagnosis, disease_status, clinical_notes, preferred_language)
    VALUES 
    (patient2_id, doctor2_id, 'consultation', 'Common cold, runny nose', 'Upper Respiratory Tract Infection', 'improving', 'Mild URTI, prescribed basic medication', 'english')
    RETURNING id INTO record2_id;

    -- Sample Prescriptions for Rajesh
    INSERT INTO prescriptions (patient_id, doctor_id, medical_record_id, medicine_name, dosage, frequency, duration, instructions, status)
    VALUES 
    (patient1_id, doctor1_id, record1_id, 'Azithromycin 500mg', '1 Tablet', 'Once Daily', '5 Days', 'After Food', 'active'),
    (patient1_id, doctor1_id, record1_id, 'Paracetamol 650mg', '1 Tablet', 'Twice Daily', '3 Days', 'For Fever', 'active'),
    (patient1_id, doctor1_id, record1_id, 'Cough Syrup 10ml', '2 tsp', 'Three Times', '7 Days', 'Before Sleep', 'active');

    -- Sample Vitals for Rajesh
    INSERT INTO vitals (patient_id, doctor_id, medical_record_id, blood_pressure_systolic, blood_pressure_diastolic, temperature, blood_sugar, weight, height, bmi, heart_rate, oxygen_saturation)
    VALUES 
    (patient1_id, doctor1_id, record1_id, 120, 80, 98.6, 110, 65.5, 170, 22.7, 72, 98);

    -- Sample Appointments
    INSERT INTO appointments (patient_id, doctor_id, medical_record_id, appointment_date, appointment_type, reason, status)
    VALUES 
    (patient1_id, doctor1_id, record1_id, NOW() + INTERVAL '14 days', 'follow-up', 'Follow-up checkup after treatment', 'scheduled'),
    (patient2_id, doctor2_id, record2_id, NOW() + INTERVAL '7 days', 'follow-up', 'Routine check', 'scheduled');

END $$;

-- ==================================================
-- STEP 3: VERIFY DATA
-- ==================================================

-- Check all tables have data
SELECT 'Doctors' as table_name, COUNT(*) as count FROM doctors
UNION ALL
SELECT 'Patients', COUNT(*) FROM patients
UNION ALL
SELECT 'Medical Records', COUNT(*) FROM medical_records
UNION ALL
SELECT 'Prescriptions', COUNT(*) FROM prescriptions
UNION ALL
SELECT 'Vitals', COUNT(*) FROM vitals
UNION ALL
SELECT 'Appointments', COUNT(*) FROM appointments;

-- View sample patient with all related data
SELECT 
    p.name as patient_name,
    p.health_id,
    d.name as doctor_name,
    mr.diagnosis,
    COUNT(DISTINCT pr.id) as prescription_count,
    v.blood_pressure_systolic || '/' || v.blood_pressure_diastolic as bp
FROM patients p
LEFT JOIN medical_records mr ON p.id = mr.patient_id
LEFT JOIN doctors d ON mr.doctor_id = d.id
LEFT JOIN prescriptions pr ON mr.id = pr.medical_record_id
LEFT JOIN vitals v ON mr.id = v.medical_record_id
GROUP BY p.name, p.health_id, d.name, mr.diagnosis, v.blood_pressure_systolic, v.blood_pressure_diastolic
LIMIT 5;
