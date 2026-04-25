import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all portfolio items
export const getPortfolioItems = async (req, res) => {
  try {
    const items = await prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper: convert uploaded file buffer to Base64 data URL
const toBase64 = (file) => {
  if (!file) return null;
  const base64 = file.buffer.toString('base64');
  return `data:${file.mimetype};base64,${base64}`;
};

// Create a new portfolio item
export const createPortfolioItem = async (req, res) => {
  try {
    const { partName, printTime, price, material } = req.body;

    const imageUrl = toBase64(req.file) || '';

    const newItem = await prisma.portfolioItem.create({
      data: {
        partName,
        material: material || '',
        printTime,
        price,
        imageUrl
      }
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a portfolio item
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { partName, printTime, price, material } = req.body;

    const updateData = {
      partName,
      material: material || '',
      printTime,
      price
    };

    // Only update image if a new file was uploaded
    if (req.file) {
      updateData.imageUrl = toBase64(req.file);
    }

    const updatedItem = await prisma.portfolioItem.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a portfolio item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.portfolioItem.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
