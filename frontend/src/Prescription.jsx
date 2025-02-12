import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function PrescriptionForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    // Doctor & Clinic Info
    doctor_name: '',
    doctor_qualifications: '',
    specialization: '',
    registration_number: '',
    email: '',
    phone: '',
    clinic_name: '',
    clinic_address: '',
    clinic_phone: '',

    // Patient Info
    patient_name: '',
    patient_age: '',
    patient_gender: '',
    patient_id: '',

    // Medical Data
    past_history: [''],
    physical_examination_of_patient: [
      { key: 'BP', val: '' },
      { key: 'HR', val: '' },
      { key: 'RR', val: '' },
      { key: 'Temp', val: '' },
      { key: 'GCS', val: '' }
    ],
    patient_registered_symptoms: [''],
    treatment_diagnosis: [''],
    medication: [{
      medicineName: '',
      power: '',
      eating_schedule: '',
      advice: ''
    }],
    tests_to_do: [''],
    advices_by_doctor: ['']
  });

  const handleInputChange = (e, section, index, field) => {
    const { name, value } = e.target;
    
    if (section) {
      if (Array.isArray(formData[section])) {
        const newArray = [...formData[section]];
        if (typeof newArray[index] === 'object') {
          newArray[index] = { ...newArray[index], [field]: value };
        } else {
          newArray[index] = value;
        }
        setFormData({ ...formData, [section]: newArray });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (section) => {
    const newData = { ...formData };
    if (section === 'medication') {
      newData[section].push({ medicineName: '', power: '', eating_schedule: '', advice: '' });
    } else if (section === 'physical_examination_of_patient') {
      newData[section].push({ key: '', val: '' });
    } else {
      newData[section].push('');
    }
    setFormData(newData);
  };

  const removeField = (section, index) => {
    const newData = { ...formData };
    newData[section].splice(index, 1);
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-pdf",
        formData,
        {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/json'
          }
        }
      );

      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/pdf'
      });
      
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(error.message || 'Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Doctor & Clinic Information */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Doctor & Clinic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="doctor_name"
              placeholder="Doctor Name"
              value={formData.doctor_name}
              onChange={handleInputChange}
            />
            <Input
              name="doctor_qualifications"
              placeholder="Qualifications"
              value={formData.doctor_qualifications}
              onChange={handleInputChange}
            />
            <Input
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleInputChange}
            />
            <Input
              name="registration_number"
              placeholder="Registration Number"
              value={formData.registration_number}
              onChange={handleInputChange}
            />
            <Input
              name="clinic_name"
              placeholder="Clinic Name"
              value={formData.clinic_name}
              onChange={handleInputChange}
            />
            <Input
              name="clinic_address"
              placeholder="Clinic Address"
              value={formData.clinic_address}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Patient Information */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="patient_name"
              placeholder="Patient Name"
              value={formData.patient_name}
              onChange={handleInputChange}
            />
            <Input
              name="patient_age"
              placeholder="Age"
              value={formData.patient_age}
              onChange={handleInputChange}
            />
            <Input
              name="patient_gender"
              placeholder="Gender"
              value={formData.patient_gender}
              onChange={handleInputChange}
            />
            <Input
              name="patient_id"
              placeholder="Patient ID"
              value={formData.patient_id}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Physical Examination */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Physical Examination</h2>
          {formData.physical_examination_of_patient.map((exam, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                placeholder="Parameter"
                value={exam.key}
                onChange={(e) => handleInputChange(e, 'physical_examination_of_patient', index, 'key')}
              />
              <Input
                placeholder="Value"
                value={exam.val}
                onChange={(e) => handleInputChange(e, 'physical_examination_of_patient', index, 'val')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeField('physical_examination_of_patient', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addField('physical_examination_of_patient')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Parameter
          </Button>
        </CardContent>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Symptoms</h2>
          {formData.patient_registered_symptoms.map((symptom, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                placeholder="Symptom"
                value={symptom}
                onChange={(e) => handleInputChange(e, 'patient_registered_symptoms', index)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeField('patient_registered_symptoms', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addField('patient_registered_symptoms')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Symptom
          </Button>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Diagnosis</h2>
          {formData.treatment_diagnosis.map((diagnosis, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => handleInputChange(e, 'treatment_diagnosis', index)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeField('treatment_diagnosis', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addField('treatment_diagnosis')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Diagnosis
          </Button>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Medications</h2>
          {formData.medication.map((med, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded">
              <Input
                placeholder="Medicine Name"
                value={med.medicineName}
                onChange={(e) => handleInputChange(e, 'medication', index, 'medicineName')}
              />
              <Input
                placeholder="Power/Strength"
                value={med.power}
                onChange={(e) => handleInputChange(e, 'medication', index, 'power')}
              />
              <Input
                placeholder="Schedule"
                value={med.eating_schedule}
                onChange={(e) => handleInputChange(e, 'medication', index, 'eating_schedule')}
              />
              <Input
                placeholder="Special Instructions"
                value={med.advice}
                onChange={(e) => handleInputChange(e, 'medication', index, 'advice')}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeField('medication', index)}
                className="col-span-2"
              >
                <X className="h-4 w-4 mr-2" /> Remove Medication
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addField('medication')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Medication
          </Button>
        </CardContent>
      </Card>

      {/* Tests */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Tests</h2>
          {formData.tests_to_do.map((test, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                placeholder="Test"
                value={test}
                onChange={(e) => handleInputChange(e, 'tests_to_do', index)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeField('tests_to_do', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addField('tests_to_do')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Test
          </Button>
        </CardContent>
      </Card>

      {/* Doctor's Advice */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Doctor's Advice</h2>
          {formData.advices_by_doctor.map((advice, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Textarea
                placeholder="Advice"
                value={advice}
                onChange={(e) => handleInputChange(e, 'advices_by_doctor', index)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeField('advices_by_doctor', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addField('advices_by_doctor')}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Advice
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          'Generate Prescription'
        )}
      </Button>
    </form>
  );
}