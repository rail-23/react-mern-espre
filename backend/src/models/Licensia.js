import mongoose from 'mongoose';

const LicenseSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    licenseType: { type: String, enum: ['Enfermedad', 'Vacaciones', 'Otros'], required: true },
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    reason: { type: String, required: true },
    durationDays: { type: Number, required: true },
    phoneReference: { type: String, required: true },
    licenseDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'completed'], default: 'pending' },
  
});

export default mongoose.model('Licensia.js', LicenseSchema);
