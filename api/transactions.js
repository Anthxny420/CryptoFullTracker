import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
};

const transactionSchema = new mongoose.Schema({
  adresse: String,
  type: String,
  date: String,
  crypto: String,
  montant: Number,
  prix: Number
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
